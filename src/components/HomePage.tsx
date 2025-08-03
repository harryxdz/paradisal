import React from 'react';
import { 
  FileText, 
  Users, 
  Building2, 
  Briefcase, 
  Shield, 
  Globe, 
  Phone, 
  ArrowRight,
  TrendingUp,
  Calendar,
  AlertCircle,
  Search
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const quickServices = [
    { icon: FileText, title: 'Apply for Documents', desc: 'Travel Card, ID, Declaration of Existence', action: 'services' },
    { icon: Users, title: 'Register to Vote', desc: 'National registration services', action: 'services' },
    { icon: Building2, title: 'Business Permits', desc: 'Start or manage your business', action: 'business' },
    { icon: Briefcase, title: 'Employment Services', desc: 'Jobs and career resources', action: 'services' },
    { icon: Shield, title: 'Public Safety', desc: 'Emergency services and alerts', action: 'departments' },
    { icon: Globe, title: 'Immigration', desc: 'Visa and residency services', action: 'services' }
  ];

  const latestNews = [
    {
      title: 'New Digital Services Portal Launched',
      date: '2025-01-15',
      category: 'Technology',
      excerpt: 'Citizens can now access 50+ government services online with enhanced security features.'
    },
    {
      title: 'Infrastructure Investment Plan Approved',
      date: '2025-01-14',
      category: 'Development',
      excerpt: '$2.5 billion investment in roads, bridges, and public transportation announced.'
    },
    {
      title: 'Healthcare System Expansion',
      date: '2025-01-13',
      category: 'Health',
      excerpt: 'New medical facilities to serve rural communities, improving healthcare access nationwide.'
    }
  ];

  const statistics = [
    { label: 'Active Nationals', value: '12.5M', trend: '+2.3%' },
    { label: 'Digital Services', value: '150+', trend: '+25%' },
    { label: 'Employment Rate', value: '94.2%', trend: '+1.8%' },
    { label: 'Government Satisfaction', value: '87%', trend: '+5.2%' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Paradisal
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Your gateway to community information, connection, and services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('services')}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Access Services
            </button>
            <button 
              onClick={() => setCurrentPage('news')}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Latest News
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services, news, and information..."
                className="w-full px-6 py-4 text-gray-900 bg-white rounded-lg shadow-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-blue-600 hover:text-blue-700">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickServices.map((service, index) => (
            <div
              key={index}
              onClick={() => setCurrentPage(service.action)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
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

      {/* Latest News */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
          <button 
            onClick={() => setCurrentPage('news')}
            className="flex items-center text-blue-600 font-medium hover:text-blue-700"
          >
            View All News
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((article, index) => (
            <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600"></div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;