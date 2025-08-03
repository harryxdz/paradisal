import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  Building2, 
  GraduationCap, 
  Heart, 
  Car, 
  Home, 
  CreditCard,
  Search,
  Filter,
  ArrowRight,
  Clock,
  DollarSign,
  CheckCircle
} from 'lucide-react';

const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Services', icon: FileText },
    { id: 'identity', label: 'Identity & Documents', icon: FileText },
    { id: 'shared', label: 'Shared Responsibility', icon: Users }
  ];

  const services = [
    {
      id: 1,
      title: 'Declaration of Existance',
      description: 'Declare your sovereign existence',
      category: 'identity',
      duration: '3-5 working days',
      fee: '$20.00',
      popularity: 'high',
      requirements: ['Witness 1', 'Witness 2', 'Witness 3 (Optional)']
    },
    {
      id: 2,
      title: 'Declaration of Belonging',
      description: 'Declare your belonging to the community',
      category: 'identity',
      duration: '3-5 working days',
      fee: '$20.00',
      popularity: 'high',
      requirements: ['Witness 1', 'Witness 2', 'Witness 3 (Optional)']
    },
    {
      id: 3,
      title: 'Sovereign Identity Card Application',
      description: 'Apply for or renew your sovereign identity card',
      category: 'identity',
      duration: '5-7 working days',
      fee: '$25.00',
      popularity: 'high',
      requirements: ['Declaration of Existence', 'Declaration of Belonging', 'Photo']
    },
    {
      id: 4,
      title: 'Sovereign Travel Card Application',
      description: 'Apply for or renew your sovereign travel card',
      category: 'identity',
      duration: '10-15 working days',
      fee: '$110.00',
      popularity: 'high',
      requirements: ['Sovereign Identity Card', 'Declaration of Existance', 'Photo']
    },
    {
      id: 5,
      title: 'Voice Expression',
      description: 'Sign up to take part in community decisions or update your information',
      category: 'shared',
      duration: '5-7 working days',
      fee: 'Free',
      popularity: 'medium',
      requirements: ['Sovereign Identity Card', 'Declaration of Belonging']
    }

  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const popularServices = services.filter(service => service.popularity === 'high');

  const getPopularityBadge = (popularity: string) => {
    switch (popularity) {
      case 'high':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Popular</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Regular</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Paradisal Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Apply for important documents, access community services, and take part in the shared life of Paradisal.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <category.icon className="w-4 h-4" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {selectedCategory === 'all' ? 'All Services' : categories.find(c => c.id === selectedCategory)?.label}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900 text-lg">{service.title}</h3>
                {getPopularityBadge(service.popularity)}
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {service.duration}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {service.fee}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {service.requirements.map((req, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* No Results */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FileText className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
        <p className="text-blue-800 mb-4">
          Visit the support page which offers helpful guidance for navigating our services and completing your applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Get Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;