import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'Bestsellers', path: '/shop?filter=bestseller' },
    { name: 'Formal Collection', path: '/shop?category=formal' },
    { name: 'Casual Collection', path: '/shop?category=casual' },
  ],
  support: [
    { name: 'Size Guide', path: '/size-guide' },
    { name: 'Shipping & Returns', path: '/shipping' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact Us', path: '/contact' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Our Story', path: '/about#story' },
    { name: 'Sustainability', path: '/about#sustainability' },
    { name: 'Careers', path: '/careers' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-display font-semibold">
                <span className="text-primary">Refine</span>
                <span className="text-foreground">Soul</span>
              </h2>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
              Celebrating modesty with elegance. We craft premium abayas that 
              embody sophistication, quality, and timeless beauty.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-display text-lg font-medium mb-6">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-display text-lg font-medium mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-medium mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>123 Fashion District, Dubai, UAE</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone size={18} className="shrink-0" />
                <span>+971 4 123 4567</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail size={18} className="shrink-0" />
                <span>hello@refinesoul.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 RefineSoul. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
