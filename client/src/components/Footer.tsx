import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Axis3d } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Axis3d className="text-white text-xl" />
              </div>
              <span className="font-bold text-xl text-white">Heritage<span className="text-secondary">3D</span></span>
            </Link>
            <p className="text-slate-400 mb-6">
              Bringing India's rich cultural heritage to life through immersive 3D experiences and virtual tours.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={`ri-${social}-fill text-slate-400 hover:text-white transition-colors`}></i>
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: '3D Models', href: '/models' },
                { label: 'Text to 3D', href: '/converter' },
                { label: 'Knowledge Hub', href: '/assistant' },
                { label: 'Virtual Tours', href: '/models' }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              {[
                'Documentation',
                'API Reference',
                'Heritage Database',
                'Developer Guide',
                'Educational Resources'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Subscribe</h3>
            <p className="text-slate-400 mb-4">
              Get updates on new models and features delivered to your inbox.
            </p>
            <form className="mb-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-primary"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </Button>
              </div>
            </form>
            <p className="text-slate-400 text-sm">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2023 Heritage3D. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
