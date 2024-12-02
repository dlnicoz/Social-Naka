import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import ContactForm from './ContactForm';


const Footer = () => {
  return (

    <>
        <footer className="relative">
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-lg text-purple-100 mb-8">
                    Have a question or want to collaborate? We'd love to hear from you.
                    Reach out and let's create something amazing together.
                  </p>
                  <div className="space-y-4">
                    <a href="mailto:contact@socialnaka.com" className="flex items-center gap-3 text-purple-200 hover:text-white transition-colors">
                      <Mail className="h-5 w-5" />
                      <span>contact@socialnaka.com</span>
                    </a>
                    <a href="tel:+1234567890" className="flex items-center gap-3 text-purple-200 hover:text-white transition-colors">
                      <Phone className="h-5 w-5" />
                      <span>+1 (234) 567-890</span>
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </div>


          <div className="bg-gray-900 text-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-white font-semibold mb-4">Company</h3>
                  <ul className="space-y-2">
                    <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                    <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                    <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Support</h3>
                  <ul className="space-y-2">
                    <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                    <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                    <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Resources</h3>
                  <ul className="space-y-2">
                    <li><Link to="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                    <li><Link to="/guides" className="hover:text-white transition-colors">Guides</Link></li>
                    <li><Link to="/examples" className="hover:text-white transition-colors">Examples</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Connect</h3>
                  <div className="flex space-x-4">
                    <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                <p>&copy; {new Date().getFullYear()} SocialNaka. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
    </>

  );
};

export default Footer;
