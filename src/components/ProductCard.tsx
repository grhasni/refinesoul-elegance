import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, setCartOpen } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1,
    });
    setCartOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium tracking-wider uppercase rounded">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="px-3 py-1 bg-foreground text-background text-xs font-medium tracking-wider uppercase rounded">
                Bestseller
              </span>
            )}
            {product.originalPrice && (
              <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-medium tracking-wider uppercase rounded">
                Sale
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleQuickAdd}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-background/95 backdrop-blur-sm text-foreground text-sm font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ShoppingBag size={16} />
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-background/95 backdrop-blur-sm text-foreground rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Eye size={16} />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-display font-medium text-lg group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.shortDescription}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-medium text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {/* Color Options */}
          <div className="flex items-center gap-1 pt-2">
            {product.colors.slice(0, 4).map((color, i) => (
              <span
                key={color}
                className={cn(
                  'w-4 h-4 rounded-full border border-border',
                  color.toLowerCase().includes('black') && 'bg-foreground',
                  color.toLowerCase().includes('white') && 'bg-background',
                  color.toLowerCase().includes('navy') && 'bg-blue-900',
                  color.toLowerCase().includes('burgundy') && 'bg-red-900',
                  color.toLowerCase().includes('pearl') && 'bg-gray-100',
                  color.toLowerCase().includes('champagne') && 'bg-amber-100',
                  color.toLowerCase().includes('midnight') && 'bg-indigo-950',
                  color.toLowerCase().includes('emerald') && 'bg-emerald-700',
                  color.toLowerCase().includes('sand') && 'bg-amber-200',
                  color.toLowerCase().includes('sage') && 'bg-green-200',
                  color.toLowerCase().includes('plum') && 'bg-purple-900',
                  color.toLowerCase().includes('teal') && 'bg-teal-700',
                  color.toLowerCase().includes('pink') && 'bg-pink-200',
                  color.toLowerCase().includes('lavender') && 'bg-purple-200',
                  color.toLowerCase().includes('ivory') && 'bg-amber-50',
                  color.toLowerCase().includes('charcoal') && 'bg-gray-700',
                  color.toLowerCase().includes('camel') && 'bg-amber-600',
                  color.toLowerCase().includes('gray') && 'bg-gray-400',
                  color.toLowerCase().includes('maroon') && 'bg-red-800',
                  color.toLowerCase().includes('rose') && 'bg-rose-300',
                )}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
