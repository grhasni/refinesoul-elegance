import { motion } from 'framer-motion';
import { Heart, Leaf, Award, Users } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Crafted with Love', description: 'Every stitch reflects our dedication to quality and elegance.' },
  { icon: Leaf, title: 'Sustainable Luxury', description: 'Ethically sourced materials and responsible production.' },
  { icon: Award, title: 'Timeless Design', description: 'Classic silhouettes that transcend seasonal trends.' },
  { icon: Users, title: 'Community First', description: 'Celebrating modest fashion and empowering women worldwide.' },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-card py-20 lg:py-32">
        <div className="container-luxury text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-6xl font-semibold mb-6">
            Our Story
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-elegant text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Where modesty meets modern luxury, creating timeless pieces for the refined woman.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">Founded in 2019</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">A Vision of Elegant Modesty</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                RefineSoul was born from a simple belief: modest fashion should never compromise on luxury or style. Our founder, inspired by the grace of traditional abayas and the sophistication of haute couture, set out to create a brand that honors both.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we work with the finest artisans across the globe, sourcing premium silks from Italy, hand-embroidered details from skilled craftswomen, and innovative sustainable fabrics that move beautifully.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800" alt="Our atelier" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card">
        <div className="container-luxury">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Our Values</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6">
                <value.icon className="mx-auto text-primary mb-4" size={40} />
                <h3 className="font-display text-lg font-medium mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
