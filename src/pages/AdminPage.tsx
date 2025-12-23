import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Plus, Edit, Trash2, Eye, ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}

interface Order {
  id: string;
  user_id: string;
  status: string;
  total: number;
  items: any[];
  created_at: string;
  shipping_address: any;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Package, label: 'Products', id: 'products' },
  { icon: ShoppingCart, label: 'Orders', id: 'orders' },
  { icon: Users, label: 'Customers', id: 'customers' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [customers, setCustomers] = useState<Profile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        navigate('/dashboard');
      } else {
        fetchData();
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch customers
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (profilesData) {
      setCustomers(profilesData);
    }

    // Fetch orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (ordersData) {
      setOrders(ordersData as Order[]);
    }

    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const stats = [
    { label: 'Total Revenue', value: `$${orders.reduce((sum, o) => sum + Number(o.total), 0).toLocaleString()}` },
    { label: 'Orders', value: orders.length.toString() },
    { label: 'Products', value: products.length.toString() },
    { label: 'Customers', value: customers.length.toString() },
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-sidebar flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-sidebar-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sidebar flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border p-6 hidden lg:block">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-xl font-semibold text-sidebar-foreground">
            <span className="text-sidebar-primary">Refine</span>Soul
          </h1>
        </div>
        
        <Link
          to="/"
          className="flex items-center gap-2 text-sidebar-foreground/60 hover:text-sidebar-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to Store</span>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                activeTab === item.id
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-sidebar border-b border-sidebar-border p-4 z-50">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-lg font-semibold text-sidebar-foreground">
            <span className="text-sidebar-primary">Admin</span>
          </h1>
          <div className="flex gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  activeTab === item.id
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground'
                )}
              >
                <item.icon size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 p-8 pt-24 lg:pt-8 overflow-auto">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-semibold text-sidebar-foreground mb-6">Dashboard</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="p-6 bg-sidebar-accent rounded-lg">
                  <p className="text-sidebar-foreground/60 text-sm mb-1">{stat.label}</p>
                  <p className="font-display text-2xl font-semibold text-sidebar-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-sidebar-accent rounded-lg p-6">
              <h3 className="font-display text-lg font-semibold text-sidebar-foreground mb-4">Recent Orders</h3>
              {orders.length === 0 ? (
                <p className="text-sidebar-foreground/60">No orders yet</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-sidebar rounded-lg">
                      <div>
                        <p className="text-sidebar-foreground font-medium">#{order.id.slice(0, 8)}</p>
                        <p className="text-sidebar-foreground/60 text-sm">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <p className="text-sidebar-foreground font-medium mt-1">${order.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold text-sidebar-foreground">Products</h2>
              <Button className="bg-sidebar-primary text-sidebar-primary-foreground">
                <Plus size={18} className="mr-2" />
                Add Product
              </Button>
            </div>
            <div className="bg-sidebar-accent rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-sidebar-border">
                  <tr className="text-left text-sm text-sidebar-foreground/60">
                    <th className="p-4">Product</th>
                    <th className="p-4 hidden sm:table-cell">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-sidebar-border last:border-0">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-14 rounded object-cover" />
                        <span className="text-sidebar-foreground font-medium">{p.name}</span>
                      </td>
                      <td className="p-4 text-sidebar-foreground/60 hidden sm:table-cell">{p.category}</td>
                      <td className="p-4 text-sidebar-foreground">${p.price}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-sidebar-border rounded">
                            <Edit size={16} className="text-sidebar-foreground/60" />
                          </button>
                          <button className="p-2 hover:bg-sidebar-border rounded">
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-semibold text-sidebar-foreground mb-6">Orders</h2>
            
            {selectedOrder ? (
              <div className="bg-sidebar-accent rounded-lg p-6">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex items-center gap-2 text-sidebar-foreground/60 hover:text-sidebar-foreground mb-4"
                >
                  <ArrowLeft size={16} />
                  Back to Orders
                </button>

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-sidebar-foreground">
                      Order #{selectedOrder.id.slice(0, 8)}
                    </h3>
                    <p className="text-sidebar-foreground/60">
                      {new Date(selectedOrder.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                    className={`px-3 py-2 rounded-lg border ${getStatusColor(selectedOrder.status)} bg-transparent cursor-pointer`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-sidebar-foreground mb-3">Items</h4>
                    <div className="space-y-3">
                      {(selectedOrder.items as any[]).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 bg-sidebar rounded-lg">
                          <div className="w-12 h-16 bg-sidebar-border rounded overflow-hidden">
                            {item.image && (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sidebar-foreground font-medium">{item.name}</p>
                            <p className="text-sidebar-foreground/60 text-sm">
                              Size: {item.size} | Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="text-sidebar-foreground font-medium">${item.price}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-sidebar-border flex justify-between">
                      <span className="text-sidebar-foreground/60">Total</span>
                      <span className="font-display text-xl font-semibold text-sidebar-foreground">
                        ${selectedOrder.total}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sidebar-foreground mb-3">Shipping Address</h4>
                    {selectedOrder.shipping_address ? (
                      <div className="p-4 bg-sidebar rounded-lg text-sidebar-foreground/80">
                        <p>{selectedOrder.shipping_address.firstName} {selectedOrder.shipping_address.lastName}</p>
                        <p>{selectedOrder.shipping_address.address}</p>
                        <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.country}</p>
                        <p>{selectedOrder.shipping_address.postalCode}</p>
                      </div>
                    ) : (
                      <p className="text-sidebar-foreground/60">No shipping address</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-sidebar-accent rounded-lg overflow-hidden">
                {orders.length === 0 ? (
                  <div className="p-8 text-center">
                    <ShoppingCart className="mx-auto text-sidebar-foreground/40 mb-4" size={48} />
                    <p className="text-sidebar-foreground/60">No orders yet</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="border-b border-sidebar-border">
                      <tr className="text-left text-sm text-sidebar-foreground/60">
                        <th className="p-4">Order ID</th>
                        <th className="p-4 hidden sm:table-cell">Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-sidebar-border last:border-0">
                          <td className="p-4">
                            <span className="text-sidebar-foreground font-medium">
                              #{order.id.slice(0, 8)}
                            </span>
                          </td>
                          <td className="p-4 text-sidebar-foreground/60 hidden sm:table-cell">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-sidebar-foreground">${order.total}</td>
                          <td className="p-4">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="p-2 hover:bg-sidebar-border rounded"
                            >
                              <Eye size={16} className="text-sidebar-foreground/60" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Customers */}
        {activeTab === 'customers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-semibold text-sidebar-foreground mb-6">Customers</h2>
            <div className="bg-sidebar-accent rounded-lg overflow-hidden">
              {customers.length === 0 ? (
                <div className="p-8 text-center">
                  <Users className="mx-auto text-sidebar-foreground/40 mb-4" size={48} />
                  <p className="text-sidebar-foreground/60">No customers yet</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="border-b border-sidebar-border">
                    <tr className="text-left text-sm text-sidebar-foreground/60">
                      <th className="p-4">Customer</th>
                      <th className="p-4 hidden sm:table-cell">Email</th>
                      <th className="p-4 hidden md:table-cell">Phone</th>
                      <th className="p-4">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-sidebar-border last:border-0">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
                              <span className="text-sidebar-primary font-medium">
                                {(customer.full_name || customer.email || 'U')[0].toUpperCase()}
                              </span>
                            </div>
                            <span className="text-sidebar-foreground font-medium">
                              {customer.full_name || 'No name'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-sidebar-foreground/60 hidden sm:table-cell">
                          {customer.email}
                        </td>
                        <td className="p-4 text-sidebar-foreground/60 hidden md:table-cell">
                          {customer.phone || '—'}
                        </td>
                        <td className="p-4 text-sidebar-foreground/60">
                          {new Date(customer.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
