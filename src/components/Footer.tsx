import React from 'react';
import { 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink
} from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'About Paradisal', href: '#' },
    { label: 'Get Help', href: '#' },
    { label: 'Accessibility', href: '#' },
    { label: 'Site Map', href: '#' }
  ];

  const departments = [
    { label: 'Branch of Development & Public Services', href: '#' },
    { label: 'Branch of Learning & Knowledge', href: '#' },
    { label: 'Branch of Wellbeing & Health', href: '#' },
    { label: 'Branch of Peace & Order', href: '#' },
    { label: 'Branch of Sovereignty & Belonging', href: '#' },
    { label: 'Branch of Creation & Exchange', href: '#' },
    { label: 'Branch of Livelihood & Prosperity', href: '#' }
  ];

  const services = [
    { label: 'Online Services', href: '#' },
    { label: 'Document Applications', href: '#' },
    { label: 'Sovereign Support', href: '#' },
    { label: 'Emergency Services', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Government Info */}
          <div>
            <div className="flex items-center mb-4">
              <div>
                <h3 className="font-bold text-lg">Paradisal</h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">To Be Updated</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">To Be Updated</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">To Be Updated</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Branches</h4>
            <ul className="space-y-2">
              {departments.map((dept, index) => (
                <li key={index}>
                  <a 
                    href={dept.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center"
                  >
                    {dept.label}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Additional Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center mx-auto">
              <div className="flex items-center justify-center lg:justify-end mb-2">
              </div>
              <p className="text-sm text-gray-400">
                Last Updated: July 2025 - 
                <a href="#" className="hover:text-white transition-colors"> Update Log</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>Public Sovereign Rights - 2025 Paradisal. Rights held by the people.</p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Protection</a>
              <a href="#" className="hover:text-white transition-colors">Service Promise</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">Freedom of Information</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;