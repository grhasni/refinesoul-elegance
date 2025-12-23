import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message Sent!', description: 'We\'ll get back to you within 24 hours.' });
  };

  return (
    <div className="pt-24">
      <section className="bg-card py-20">
        <div className="container-luxury text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-semibold mb-4">Get in Touch</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground max-w-xl mx-auto">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="input-floating"><input type="text" placeholder=" " required /><label>First Name</label></div>
                <div className="input-floating"><input type="text" placeholder=" " required /><label>Last Name</label></div>
              </div>
              <div className="input-floating"><input type="email" placeholder=" " required /><label>Email</label></div>
              <div className="input-floating"><input type="text" placeholder=" " /><label>Subject</label></div>
              <div className="input-floating"><textarea placeholder=" " rows={5} required className="resize-none" /><label>Message</label></div>
              <Button type="submit" className="btn-luxury w-full">Send Message</Button>
            </motion.form>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="flex items-start gap-4"><MapPin className="text-primary mt-1" /><div><h3 className="font-medium mb-1">Visit Us</h3><p className="text-muted-foreground text-sm">123 Fashion District, Dubai, UAE</p></div></div>
              <div className="flex items-start gap-4"><Phone className="text-primary mt-1" /><div><h3 className="font-medium mb-1">Call Us</h3><p className="text-muted-foreground text-sm">+971 4 123 4567</p></div></div>
              <div className="flex items-start gap-4"><Mail className="text-primary mt-1" /><div><h3 className="font-medium mb-1">Email Us</h3><p className="text-muted-foreground text-sm">hello@refinesoul.com</p></div></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
