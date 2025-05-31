
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useUserRole } from '@/contexts/UserRoleContext';
import { 
  Store, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const Footer = () => {
  const { userRole } = useUserRole();

  const getFooterSections = () => {
    const baseSections = [
      {
        title: 'Marketplace',
        links: [
          { name: 'Browse Products', href: '/browse-products' },
          { name: 'Vendor Directory', href: '/vendor-directory' },
          { name: 'Categories', href: '/categories' },
          { name: 'New Arrivals', href: '/new-arrivals' },
          { name: 'Best Sellers', href: '/best-sellers' },
          { name: 'Special Offers', href: '/special-offers' }
        ]
      },
      {
        title: 'Support',
        links: [
          { name: 'Help Center', href: '/help-center' },
          { name: 'Contact Us', href: '/contact-us' },
          { name: 'Shipping Info', href: '/shipping-info' },
          { name: 'Returns', href: '/returns' },
          { name: 'Payment Methods', href: '/payment-methods' },
          { name: 'Security', href: '/security' }
        ]
      },
      {
        title: 'Company',
        links: [
          { name: 'About Us', href: '/about-us' },
          { name: 'Careers', href: '/careers' },
          { name: 'Press', href: '/press' },
          { name: 'Blog', href: '/blog' },
          { name: 'Investors', href: '#' },
          { name: 'Partners', href: '#' }
        ]
      }
    ];

    // Only show vendor section if user is a vendor
    if (userRole === 'vendor') {
      baseSections.splice(1, 0, {
        title: 'For Vendors',
        links: [
          { name: 'Start Selling', href: '/start-selling' },
          { name: 'Subscription Plans', href: '/vendor-subscription-plans' },
          { name: 'Vendor Dashboard', href: '/vendor-dashboard' },
          { name: 'Analytics', href: '/vendor/analytics' },
          { name: 'Support Center', href: '/help-center' },
          { name: 'Success Stories', href: '#' }
        ]
      });
    }

    return baseSections;
  };

  const footerSections = getFooterSections();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get the latest updates on new vendors, special offers, and marketplace features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <Store className="h-8 w-8 text-marketplace-primary mr-3" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-marketplace-primary to-marketplace-secondary bg-clip-text text-transparent">
                  MarketPlace
                </h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The ultimate multi-vendor marketplace platform connecting buyers, vendors, and administrators 
                in a seamless ecosystem designed for growth and success.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-3" />
                  <span>support@marketplace.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>123 Business Street, City, State 12345</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 MarketPlace. All rights reserved. | Privacy Policy | Terms of Service
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
