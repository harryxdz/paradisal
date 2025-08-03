import React from 'react';
import { 
  Info, 
  Flag, 
  Landmark, 
  BookOpen, 
  CalendarDays, 
  GraduationCap, 
  HeartPulse, 
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Search
} from 'lucide-react';

interface InformationPageProps {
  setCurrentPage: (page: string) => void;
}

const InformationPage: React.FC<InformationPageProps> = ({ setCurrentPage }) => {
  const keyResources = [
    { icon: Landmark, title: 'Government Structure', desc: 'Learn about the branches of government and their functions', action: 'government' },
    { icon: Flag, title: 'National Symbols', desc: 'National flag, anthem, and other symbols', action: 'symbols' },
    { icon: BookOpen, title: 'History and Culture', desc: 'Explore our rich history and cultural heritage', action: 'culture' },
    { icon: CalendarDays, title: 'Public Holidays', desc: 'List of national holidays and observances', action: 'holidays' },
    { icon: GraduationCap, title: 'Education System', desc: 'Information about schools and educational programs', action: 'education' },
    { icon: HeartPulse, title: 'Healthcare System', desc: 'Healthcare services and facilities', action: 'healthcare' }
  ];

  const emergencyAlerts = [
    {
      title: 'Weather Advisory',
      date: '2025-08-03',
      severity: 'High',
      description: 'Heavy rainfall expected in coastal regions. Residents advised to take precautions.'
    }
  ];

  const contactInfo = [
    { icon: Phone, title: 'General Inquiries', details: 'Phone: (555) 123-4567', extra: 'Hours: 8AM-6PM Mon-Fri' },
    { icon: Mail, title: 'Email Support', details: 'info@paradisal.gov', extra: 'Response within 24 hours' },
    { icon: MapPin, title: 'Regional Offices', details: 'Find your nearest service center', extra: '10 locations nationwide' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Info className="w-8 h-8 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Information Center
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Essential resources, national information, and contact details
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search national information and resources..."
                className="w-full px-6 py-4 text-gray-900 bg-white rounded-lg shadow-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-blue-600 hover:text-blue-700">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Resources */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">National Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyResources.map((resource, index) => (
            <div
              key={index}
              onClick={() => setCurrentPage(resource.action)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <resource.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{resource.desc}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Alerts */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Emergency Alerts</h2>
        {emergencyAlerts.length > 0 ? (
          emergencyAlerts.map((alert, index) => (
            <div key={index} className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-red-800">{alert.title}</h3>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0">
                      {alert.severity} Priority
                    </span>
                  </div>
                  <p className="text-red-700 mb-3">{alert.description}</p>
                  <div className="flex items-center text-red-700 text-sm">
                    <span>Issued: {new Date(alert.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-green-500 mr-4" />
              <span className="text-green-800">There are no active emergency alerts at this time.</span>
            </div>
          </div>
        )}
      </section>

      {/* Contact Information */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((contact, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <contact.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{contact.title}</h3>
              </div>
              <p className="text-gray-800 mb-1">{contact.details}</p>
              <p className="text-gray-600 text-sm">{contact.extra}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentPage('faq')}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left border border-gray-200"
          >
            <h3 className="font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <p className="text-gray-600 text-sm mb-4">Get answers to common questions about government services</p>
            <div className="flex items-center text-blue-600 font-medium">
              <span className="mr-2">View FAQs</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
          <button 
            onClick={() => setCurrentPage('documents')}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left border border-gray-200"
          >
            <h3 className="font-semibold text-gray-900 mb-3">Official Documents</h3>
            <p className="text-gray-600 text-sm mb-4">Access government publications, forms, and reports</p>
            <div className="flex items-center text-blue-600 font-medium">
              <span className="mr-2">Browse Documents</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default InformationPage;