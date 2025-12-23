import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const featuredProducts = products.filter((p) => p.isBestseller).slice(0, 4);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container-luxury text-center pt-24"
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
              Modest Luxury Collection
            </span>
            <Sparkles size={16} className="text-primary" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6"
          >
            <span className="block">Elegance</span>
            <span className="block text-gradient-gold">Refined</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-elegant text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 italic"
          >
            Discover our curated collection of premium abayas, where timeless 
            modesty meets contemporary luxury.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild className="btn-luxury text-base px-10 py-6">
              <Link to="/shop">
                Shop Now
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button variant="outline" asChild className="btn-luxury-outline text-base px-10 py-6">
              <Link to="/about">Our Story</Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-8 mt-16 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <span>4.9/5 Rating</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <span className="hidden sm:block">Free Shipping Worldwide</span>
            <div className="hidden md:block w-px h-4 bg-border" />
            <span className="hidden md:block">Premium Quality Guaranteed</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Collection */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Most Loved
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Bestsellers
            </h2>
            <p className="font-elegant text-lg text-muted-foreground max-w-xl mx-auto italic">
              Our most cherished pieces, loved by women around the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" asChild className="btn-luxury-outline">
              <Link to="/shop?filter=bestseller">
                View All Bestsellers
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Banner */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-card" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
        </div>
        
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Our Philosophy
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                Where Modesty
                <span className="block text-gradient-gold">Meets Artistry</span>
              </h2>
              <p className="font-elegant text-lg text-muted-foreground mb-6 italic leading-relaxed">
                At RefineSoul, we believe that modesty is the ultimate form of elegance. 
                Each abaya in our collection is a testament to this belief — meticulously 
                crafted using the finest fabrics, designed to celebrate your grace while 
                honoring your values.
              </p>
              <p className="text-muted-foreground mb-8">
                From the silk mills of Como to the skilled artisans in our ateliers, 
                every stitch tells a story of dedication to perfection.
              </p>
              <Button variant="outline" asChild className="btn-luxury-outline">
                <Link to="/about">
                  Discover Our Story
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800"
                  alt="Elegant abaya craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/5 rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Just Arrived
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              New Collection
            </h2>
            <p className="font-elegant text-lg text-muted-foreground max-w-xl mx-auto italic">
              Fresh designs that blend contemporary aesthetics with timeless elegance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {newProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" asChild className="btn-luxury-outline">
              <Link to="/shop?filter=new">
                Explore New Arrivals
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-card">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Join the RefineSoul Family
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to receive exclusive offers, early access to new collections, 
              and styling inspiration.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <Button type="submit" className="btn-luxury px-8">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
