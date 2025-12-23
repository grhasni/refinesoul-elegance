import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, CreditCard, ChevronLeft } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 200 ? 0 : 15;
  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + shipping + tax;

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Order Placed Successfully!',
      description: 'Thank you for your purchase. You will receive a confirmation email shortly.',
    });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="container-luxury py-16 text-center">
          <h1 className="font-display text-3xl font-semibold mb-4">Your cart is empty</h1>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-background">
      <div className="container-luxury py-8 lg:py-16">
        {/* Back Link */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft size={18} />
          Back to Cart
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-display text-3xl font-semibold mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact */}
              <div>
                <h2 className="font-display text-lg font-medium mb-4">Contact Information</h2>
                <div className="input-floating">
                  <input
                    type="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-card"
                  />
                  <label>Email Address</label>
                </div>
              </div>

              {/* Shipping */}
              <div>
                <h2 className="font-display text-lg font-medium mb-4">Shipping Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="input-floating">
                    <input
                      type="text"
                      placeholder=" "
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                    <label>First Name</label>
                  </div>
                  <div className="input-floating">
                    <input
                      type="text"
                      placeholder=" "
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                    <label>Last Name</label>
                  </div>
                  <div className="input-floating sm:col-span-2">
                    <input
                      type="text"
                      placeholder=" "
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                    <label>Street Address</label>
                  </div>
                  <div className="input-floating">
                    <input
                      type="text"
                      placeholder=" "
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                    <label>City</label>
                  </div>
                  <div className="input-floating">
                    <input
                      type="text"
                      placeholder=" "
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                    />
                    <label>Country</label>
                  </div>
                  <div className="input-floating">
                    <input
                      type="text"
                      placeholder=" "
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      required
                    />
                    <label>Postal Code</label>
                  </div>
                  <div className="input-floating">
                    <input
                      type="tel"
                      placeholder=" "
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                    <label>Phone</label>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="font-display text-lg font-medium mb-4">Payment</h2>
                <div className="p-4 bg-card rounded-lg border border-border mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="text-primary" size={20} />
                    <span className="font-medium">Credit Card</span>
                  </div>
                  <div className="space-y-4">
                    <div className="input-floating">
                      <input
                        type="text"
                        placeholder=" "
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        required
                      />
                      <label>Card Number</label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="input-floating">
                        <input
                          type="text"
                          placeholder=" "
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          required
                        />
                        <label>MM / YY</label>
                      </div>
                      <div className="input-floating">
                        <input
                          type="text"
                          placeholder=" "
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          required
                        />
                        <label>CVC</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full btn-luxury py-6">
                <Lock className="mr-2" size={18} />
                Complete Order — ${grandTotal.toFixed(2)}
              </Button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-6 lg:p-8 bg-card rounded-lg shadow-card sticky top-32">
              <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-4"
                  >
                    <div className="w-16 h-20 rounded-md overflow-hidden bg-muted relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <p className="font-medium text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-display text-lg font-semibold">Total</span>
                  <span className="font-display text-xl font-semibold text-primary">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
