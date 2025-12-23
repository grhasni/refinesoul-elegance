import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingCart, Users, Plus, Edit, Trash2, Search } from 'lucide-react';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Package, label: 'Products', id: 'products' },
  { icon: ShoppingCart, label: 'Orders', id: 'orders' },
  { icon: Users, label: 'Customers', id: 'customers' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-sidebar flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border p-6 hidden lg:block">
        <h1 className="font-display text-xl font-semibold text-sidebar-foreground mb-8"><span className="text-sidebar-primary">Refine</span>Soul</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn('w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left', activeTab === item.id ? 'bg-sidebar-accent text-sidebar-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent')}>
              <item.icon size={20} />{item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 pt-24 lg:pt-8 overflow-auto">
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-semibold text-sidebar-foreground mb-6">Dashboard</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[{ label: 'Total Revenue', value: '$24,580' }, { label: 'Orders', value: '156' }, { label: 'Products', value: '24' }, { label: 'Customers', value: '1,247' }].map((stat) => (
                <div key={stat.label} className="p-6 bg-sidebar-accent rounded-lg">
                  <p className="text-sidebar-foreground/60 text-sm mb-1">{stat.label}</p>
                  <p className="font-display text-2xl font-semibold text-sidebar-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold text-sidebar-foreground">Products</h2>
              <Button className="bg-sidebar-primary text-sidebar-primary-foreground"><Plus size={18} className="mr-2" />Add Product</Button>
            </div>
            <div className="bg-sidebar-accent rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-sidebar-border">
                  <tr className="text-left text-sm text-sidebar-foreground/60">
                    <th className="p-4">Product</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((p) => (
                    <tr key={p.id} className="border-b border-sidebar-border last:border-0">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-14 rounded object-cover" />
                        <span className="text-sidebar-foreground font-medium">{p.name}</span>
                      </td>
                      <td className="p-4 text-sidebar-foreground/60">{p.category}</td>
                      <td className="p-4 text-sidebar-foreground">${p.price}</td>
                      <td className="p-4"><div className="flex gap-2"><button className="p-2 hover:bg-sidebar-border rounded"><Edit size={16} className="text-sidebar-foreground/60" /></button><button className="p-2 hover:bg-sidebar-border rounded"><Trash2 size={16} className="text-red-400" /></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-semibold text-sidebar-foreground mb-6">Orders</h2>
            <p className="text-sidebar-foreground/60">Order management coming soon...</p>
          </motion.div>
        )}

        {activeTab === 'customers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-semibold text-sidebar-foreground mb-6">Customers</h2>
            <p className="text-sidebar-foreground/60">Customer management coming soon...</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
