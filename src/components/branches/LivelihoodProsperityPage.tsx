import React from 'react';
import { 
  TrendingUp, 
  ArrowLeft, 
  Users, 
  DollarSign, 
  Briefcase, 
  Phone, 
  Mail, 
  MapPin,
  Target,
  PieChart,
  HandHeart,
  Building
} from 'lucide-react';

interface LivelihoodProsperityPageProps {
  setCurrentPage: (page: string) => void;
}

const LivelihoodProsperityPage: React.FC<LivelihoodProsperityPageProps> = ({ setCurrentPage }) => {
  const services = [
    {
      icon: Briefcase,
      title: 'Employment Services',
      description: 'Comprehensive job placement, career counseling, and workforce development programs.',
      details: ['Job placement services', 'Career counseling', 'Skills training', 'Employment matching']
    },
    {
      icon: Building,
      title: 'Economic Development',
      description: 'Strategic initiatives to grow the economy and create sustainable opportunities.',
      details: ['Business development', 'Investment attraction', 'Economic planning', 'Industry support']
    },
    {
      icon: HandHeart,
      title: 'Social Welfare',
      description: 'Support systems ensuring basic needs are met for all nationals.',
      details: ['Financial assistance', 'Housing support', 'Food security', 'Emergency aid']
    },
    {
      icon: Target,
      title: 'Prosperity Programs',
      description: 'Long-term initiatives focused on building wealth and improving quality of life.',
      details: ['Financial literacy', 'Savings programs', 'Investment education', 'Retirement planning']
    }
  ];

  const prosperityStats = [
    {
      metric: '94.2%',
      label: 'Employment Rate',
      description: 'National employment level'
    },
    {
      metric: '25+',
      label: 'Active Programs',
      description: 'Welfare and prosperity initiatives'
    },
    {
      metric: '3.2M',
      label: 'Beneficiaries',
      description: 'Nationals receiving support'
    },
    {
      metric: '$45K',
      label: 'Median Income',
      description: 'Annual household income'
    }
  ];

  const programs = [
    {
      name: 'National Employment Initiative',
      status: 'Active',
      impact: '250K jobs created',
      description: 'Comprehensive program connecting nationals with meaningful employment'
    },
    {
      name: 'Universal Basic Support',
      status: 'Active',
      impact: '1.5M nationals supported',
      description: 'Safety net ensuring basic needs are met for all nationals'
    },
    {
      name: 'Prosperity Building Program',
      status: 'Expanding',
      impact: '500K participants',
      description: 'Financial education and wealth-building initiatives'
    }
  ];

  const leadership = [
    {
      name: 'Dr. Rachel Green',
      position: 'Branch Director',
      experience: '20 years in economic development',
      email: 'r.green@gov.paradisal'
    },
    {
      name: 'Thomas Anderson',
      position: 'Employment Services Director',
      experience: '18 years in workforce development',
      email: 't.anderson@gov.paradisal'
    },
    {
      name: 'Maria Santos',
      position: 'Social Welfare Coordinator',
      experience: '22 years in social services',
      email: 'm.santos@gov.paradisal'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg p-8">
        <button
          onClick={() => setCurrentPage('branches')}
          className="flex items-center text-emerald-100 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Branches
        </button>
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-white bg-opacity-20 rounded-lg">
            <TrendingUp className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Branch of Livelihood & Prosperity</h1>
            <p className="text-xl text-emerald-100">Building pathways to economic security and prosperity</p>
          </div>
        </div>
      </div>

      {/* Prosperity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {prosperityStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.metric}</div>
            <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
            <div className="text-sm text-gray-600">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Mission Statement */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          The Branch of Livelihood & Prosperity is dedicated to ensuring that every national has access to 
          meaningful employment, economic opportunities, and the support needed to build a prosperous life. 
          We work to create sustainable economic growth while providing safety nets and pathways to financial 
          security for all members of our community.
        </p>
      </div>

      {/* Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <service.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
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

      {/* Key Programs */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Programs</h2>
        <div className="space-y-4">
          {programs.map((program, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-3">{program.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      program.status === 'Active' ? 'bg-green-100 text-green-700' :
                      program.status === 'Expanding' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {program.status}
                    </span>
                    <span>Impact: {program.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Economic Indicators */}
      <div className="bg-emerald-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Economic Health Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">GDP Growth</h3>
            <p className="text-2xl font-bold text-emerald-600 mb-1">5.2%</p>
            <p className="text-sm text-gray-600">Annual growth rate</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <PieChart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Inflation Rate</h3>
            <p className="text-2xl font-bold text-emerald-600 mb-1">2.1%</p>
            <p className="text-sm text-gray-600">Within target range</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Poverty Rate</h3>
            <p className="text-2xl font-bold text-emerald-600 mb-1">3.8%</p>
            <p className="text-sm text-gray-600">Lowest in region</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Prosperity Index</h3>
            <p className="text-2xl font-bold text-emerald-600 mb-1">8.7/10</p>
            <p className="text-sm text-gray-600">National wellbeing score</p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((leader, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{leader.name}</h3>
              <p className="text-emerald-600 font-medium mb-2">{leader.position}</p>
              <p className="text-sm text-gray-600 mb-3">{leader.experience}</p>
              <a href={`mailto:${leader.email}`} className="text-sm text-emerald-600 hover:text-emerald-700">
                {leader.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-emerald-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Phone className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 789-0123</p>
          </div>
          <div className="text-center">
            <Mail className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">prosperity@gov.paradisal</p>
          </div>
          <div className="text-center">
            <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">Prosperity Center, Block G<br />Government District, Paradisal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivelihoodProsperityPage;