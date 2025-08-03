import React from 'react';
import { 
  Briefcase, 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  Lightbulb, 
  Phone, 
  Mail, 
  MapPin,
  Rocket,
  Palette,
  Globe,
  Zap
} from 'lucide-react';

interface CreationExchangePageProps {
  setCurrentPage: (page: string) => void;
}

const CreationExchangePage: React.FC<CreationExchangePageProps> = ({ setCurrentPage }) => {
  const services = [
    {
      icon: Rocket,
      title: 'Innovation Support',
      description: 'Fostering entrepreneurship and technological advancement through comprehensive support.',
      details: ['Startup incubators', 'Research grants', 'Innovation labs', 'Mentorship programs']
    },
    {
      icon: Globe,
      title: 'Trade Facilitation',
      description: 'Supporting international trade and commerce for economic growth.',
      details: ['Export assistance', 'Trade missions', 'Market research', 'Trade agreements']
    },
    {
      icon: Palette,
      title: 'Creative Industries',
      description: 'Supporting artists, designers, and creative professionals in their endeavors.',
      details: ['Arts funding', 'Creative spaces', 'Cultural events', 'Digital platforms']
    },
    {
      icon: Zap,
      title: 'Technology Development',
      description: 'Advancing technological capabilities and digital transformation initiatives.',
      details: ['Tech infrastructure', 'Digital skills training', 'Cybersecurity', 'Smart solutions']
    }
  ];

  const innovationStats = [
    {
      metric: '2.5K',
      label: 'Active Startups',
      description: 'Registered businesses'
    },
    {
      metric: '800',
      label: 'Patents/Year',
      description: 'Innovation output'
    },
    {
      metric: '$15B',
      label: 'Export Value',
      description: 'Annual trade volume'
    },
    {
      metric: '95%',
      label: 'Digital Adoption',
      description: 'Business digitalization'
    }
  ];

  const initiatives = [
    {
      name: 'National Innovation Hub',
      status: 'Active',
      impact: '500+ startups supported',
      description: 'Comprehensive ecosystem for innovation and entrepreneurship'
    },
    {
      name: 'Creative Economy Program',
      status: 'Expanding',
      impact: '1,200 artists supported',
      description: 'Supporting creative professionals and cultural industries'
    },
    {
      name: 'Digital Trade Platform',
      status: 'Active',
      impact: '$2B in transactions',
      description: 'Facilitating international trade through digital channels'
    }
  ];

  const leadership = [
    {
      name: 'Dr. Alexandra Chen',
      position: 'Branch Director',
      experience: '18 years in innovation management',
      email: 'a.chen@gov.paradisal'
    },
    {
      name: 'Marcus Thompson',
      position: 'Trade Development Director',
      experience: '22 years in international commerce',
      email: 'm.thompson@gov.paradisal'
    },
    {
      name: 'Sofia Martinez',
      position: 'Creative Industries Coordinator',
      experience: '15 years in arts administration',
      email: 's.martinez@gov.paradisal'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-lg p-8">
        <button
          onClick={() => setCurrentPage('branches')}
          className="flex items-center text-orange-100 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Branches
        </button>
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-white bg-opacity-20 rounded-lg">
            <Briefcase className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Branch of Creation & Exchange</h1>
            <p className="text-xl text-orange-100">Driving innovation, creativity, and economic exchange</p>
          </div>
        </div>
      </div>

      {/* Innovation Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {innovationStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stat.metric}</div>
            <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
            <div className="text-sm text-gray-600">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Mission Statement */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          The Branch of Creation & Exchange is committed to fostering innovation, supporting creative industries, 
          and facilitating economic exchange both domestically and internationally. We create environments where 
          entrepreneurs can thrive, artists can flourish, and businesses can connect with global markets to 
          drive Paradisal's economic growth and cultural richness.
        </p>
      </div>

      {/* Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <service.icon className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Initiatives */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Initiatives</h2>
        <div className="space-y-4">
          {initiatives.map((initiative, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{initiative.name}</h3>
                  <p className="text-gray-600 mb-3">{initiative.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      initiative.status === 'Active' ? 'bg-green-100 text-green-700' :
                      initiative.status === 'Expanding' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {initiative.status}
                    </span>
                    <span>Impact: {initiative.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Innovation Ecosystem */}
      <div className="bg-orange-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Innovation Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Ideation</h3>
            <p className="text-sm text-gray-600">Innovation labs and brainstorming spaces</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Incubation</h3>
            <p className="text-sm text-gray-600">Startup support and mentorship</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Growth</h3>
            <p className="text-sm text-gray-600">Scaling and expansion support</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
            <p className="text-sm text-gray-600">International market access</p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((leader, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{leader.name}</h3>
              <p className="text-orange-600 font-medium mb-2">{leader.position}</p>
              <p className="text-sm text-gray-600 mb-3">{leader.experience}</p>
              <a href={`mailto:${leader.email}`} className="text-sm text-orange-600 hover:text-orange-700">
                {leader.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-orange-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Phone className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 678-9012</p>
          </div>
          <div className="text-center">
            <Mail className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">innovation@gov.paradisal</p>
          </div>
          <div className="text-center">
            <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">Innovation Center, Block F<br />Government District, Paradisal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationExchangePage;