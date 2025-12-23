import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ArrowRight, ShoppingBag, Lock, Truck, RotateCcw } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 200 ? 0 : 15;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="container-luxury py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <ShoppingBag size={80} className="mx-auto text-muted-foreground/30 mb-8" />
            <h1 className="font-display text-3xl font-semibold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet. 
              Explore our beautiful collection of abayas.
            </p>
            <Button asChild className="btn-luxury">
              <Link to="/shop">
                Start Shopping
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container-luxury py-8 lg:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl lg:text-4xl font-semibold mb-8"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 p-6 bg-card rounded-lg shadow-soft"
              >
                {/* Image */}
                <Link to={`/product/${item.id}`} className="shrink-0">
                  <div className="w-28 h-36 rounded-md overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-display font-medium text-lg hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.size, item.color)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-6">
                    {/* Quantity */}
                    <div className="flex items-center border border-border rounded-md">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.color, item.quantity - 1)
                        }
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Minus size={16} />
                      </motion.button>
                      <span className="px-4 font-medium min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                        }
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus size={16} />
                      </motion.button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-display text-lg font-semibold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-muted-foreground">
                          ${item.price} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Continue Shopping */}
            <div className="flex items-center justify-between pt-4">
              <Button variant="ghost" asChild>
                <Link to="/shop" className="flex items-center gap-2">
                  <ArrowRight className="rotate-180" size={16} />
                  Continue Shopping
                </Link>
              </Button>
              <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive">
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-card rounded-lg shadow-card sticky top-32"
            >
              <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(200 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between">
                    <span className="font-display text-lg font-semibold">Total</span>
                    <span className="font-display text-xl font-semibold text-primary">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button asChild className="w-full btn-luxury mb-4">
                <Link to="/checkout">
                  Proceed to Checkout
                  <Lock className="ml-2" size={16} />
                </Link>
              </Button>

              {/* Trust Indicators */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Lock size={16} className="text-primary" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck size={16} className="text-primary" />
                  <span>Free shipping on orders over $200</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <RotateCcw size={16} className="text-primary" />
                  <span>30-day hassle-free returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
