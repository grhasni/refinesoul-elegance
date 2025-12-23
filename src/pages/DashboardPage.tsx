import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Package, MapPin, Heart, LogOut, Edit, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  full_name: string | null;
  email: string | null;
  phone: string | null;
}

interface Order {
  id: string;
  status: string;
  total: number;
  items: any[];
  created_at: string;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'profile', label: 'Profile', icon: Edit },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    phone: '',
  });

  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchProfile();
    fetchOrders();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    if (data) {
      setProfile(data);
      setEditForm({
        full_name: data.full_name || '',
        phone: data.phone || '',
      });
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (data) {
      setOrders(data as Order[]);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: editForm.full_name,
        phone: editForm.phone,
      })
      .eq('id', user.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      fetchProfile();
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/10 text-green-500';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-500';
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Welcome, {profile?.full_name || 'Customer'}
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account, orders, and preferences
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:w-64 flex-shrink-0"
          >
            <nav className="bg-card rounded-lg p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
              
              {isAdmin && (
                <Link
                  to="/admin"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-foreground hover:bg-accent"
                >
                  <User size={20} />
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-destructive hover:bg-destructive/10"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </nav>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-card rounded-lg p-6">
                    <Package className="text-primary mb-3" size={24} />
                    <p className="text-2xl font-display font-semibold text-foreground">{orders.length}</p>
                    <p className="text-muted-foreground text-sm">Total Orders</p>
                  </div>
                  <div className="bg-card rounded-lg p-6">
                    <ShoppingBag className="text-primary mb-3" size={24} />
                    <p className="text-2xl font-display font-semibold text-foreground">
                      {orders.filter(o => o.status === 'delivered').length}
                    </p>
                    <p className="text-muted-foreground text-sm">Delivered</p>
                  </div>
                  <div className="bg-card rounded-lg p-6">
                    <Heart className="text-primary mb-3" size={24} />
                    <p className="text-2xl font-display font-semibold text-foreground">0</p>
                    <p className="text-muted-foreground text-sm">Wishlist Items</p>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-card rounded-lg p-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">Recent Orders</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="mx-auto text-muted-foreground mb-4" size={48} />
                      <p className="text-muted-foreground">No orders yet</p>
                      <Link to="/shop">
                        <Button className="mt-4">Start Shopping</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-accent/50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-foreground">
                              Order #{order.id.slice(0, 8)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <p className="text-foreground font-medium mt-1">${order.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-card rounded-lg p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="mx-auto text-muted-foreground mb-4" size={64} />
                    <h3 className="font-display text-xl text-foreground mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-6">When you place orders, they will appear here.</p>
                    <Link to="/shop">
                      <Button>Browse Collection</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border border-border rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="font-medium text-foreground">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          {(order.items as any[]).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="w-16 h-20 bg-accent rounded-md overflow-hidden">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Size: {item.size} | Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium text-foreground">${item.price}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-border flex justify-between">
                          <span className="text-muted-foreground">Total</span>
                          <span className="font-display text-lg font-semibold text-foreground">${order.total}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-card rounded-lg p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Profile Settings</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-md">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile?.email || ''}
                      disabled
                      className="mt-2 bg-accent/50"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      type="text"
                      value={editForm.full_name}
                      onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="mt-2"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
