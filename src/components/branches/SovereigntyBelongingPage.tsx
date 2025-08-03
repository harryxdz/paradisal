import React from 'react';
import { Users, ArrowLeft, Globe, FileText, Award, Phone, Mail, MapPin, CreditCard as Passport, UserPlus, Flag, Heart } from 'lucide-react';

interface SovereigntyBelongingPageProps {
  setCurrentPage: (page: string) => void;
}

const SovereigntyBelongingPage: React.FC<SovereigntyBelongingPageProps> = ({ setCurrentPage }) => {
  const services = [
    {
      icon: Passport,
      title: 'Citizenship Services',
      description: 'Comprehensive services for national identity documentation and citizenship matters.',
      details: ['National ID cards', 'Travel documents', 'Birth certificates', 'Citizenship certificates']
    },
    {
      icon: UserPlus,
      title: 'Immigration Services',
      description: 'Support for individuals seeking to join our national community.',
      details: ['Visa processing', 'Residency permits', 'Naturalization', 'Family reunification']
    },
    {
      icon: Flag,
      title: 'Cultural Preservation',
      description: 'Programs dedicated to preserving and celebrating our national heritage.',
      details: ['Cultural festivals', 'Heritage sites', 'Traditional arts', 'Language programs']
    },
    {
      icon: Heart,
      title: 'National Identity',
      description: 'Fostering a strong sense of belonging and national pride among all nationals.',
      details: ['Civic education', 'National ceremonies', 'Community integration', 'Cultural exchange']
    }
  ];

  const identityStats = [
    {
      metric: '12.5M',
      label: 'Active Nationals',
      description: 'Registered nationals'
    },
    {
      metric: '50K',
      label: 'Applications/Year',
      description: 'Citizenship and immigration'
    },
    {
      metric: '75',
      label: 'Service Offices',
      description: 'Nationwide locations'
    },
    {
      metric: '96%',
      label: 'Satisfaction Rate',
      description: 'Service quality rating'
    }
  ];

  const programs = [
    {
      name: 'New National Integration Program',
      status: 'Active',
      participants: '15K annually',
      description: 'Comprehensive orientation and support for new nationals'
    },
    {
      name: 'Cultural Heritage Initiative',
      status: 'Ongoing',
      participants: '500+ events/year',
      description: 'Celebrating and preserving our diverse cultural traditions'
    },
    {
      name: 'Digital Identity Platform',
      status: 'Expanding',
      participants: '10M users',
      description: 'Secure digital identity services for all nationals'
    }
  ];

  const leadership = [
    {
      name: 'Ambassador Elena Rodriguez',
      position: 'Branch Director',
      experience: '22 years in diplomatic service',
      email: 'e.rodriguez@gov.paradisal'
    },
    {
      name: 'Dr. Marcus Johnson',
      position: 'Immigration Director',
      experience: '18 years in immigration law',
      email: 'm.johnson@gov.paradisal'
    },
    {
      name: 'Prof. Amara Okafor',
      position: 'Cultural Affairs Director',
      experience: '20 years in cultural studies',
      email: 'a.okafor@gov.paradisal'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg p-8">
        <button
          onClick={() => setCurrentPage('branches')}
          className="flex items-center text-purple-100 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Branches
        </button>
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-white bg-opacity-20 rounded-lg">
            <Users className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Branch of Sovereignty & Belonging</h1>
            <p className="text-xl text-purple-100">Fostering national identity and belonging for all</p>
          </div>
        </div>
      </div>

      {/* Identity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {identityStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stat.metric}</div>
            <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
            <div className="text-sm text-gray-600">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Mission Statement */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          The Branch of Sovereignty & Belonging is dedicated to strengthening our national identity while 
          welcoming new members into our community. We manage citizenship services, support immigration 
          processes, preserve our cultural heritage, and ensure that every national feels a deep sense 
          of belonging and pride in being part of Paradisal.
        </p>
      </div>

      {/* Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <service.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
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

      {/* National Programs */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">National Programs</h2>
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
                    <span>Participants: {program.participants}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Citizenship Process */}
      <div className="bg-purple-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Path to Citizenship</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1</h3>
            <p className="text-sm text-gray-600">Submit Application</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2</h3>
            <p className="text-sm text-gray-600">Background Check</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3</h3>
            <p className="text-sm text-gray-600">Civic Test</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flag className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 4</h3>
            <p className="text-sm text-gray-600">Oath Ceremony</p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((leader, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{leader.name}</h3>
              <p className="text-purple-600 font-medium mb-2">{leader.position}</p>
              <p className="text-sm text-gray-600 mb-3">{leader.experience}</p>
              <a href={`mailto:${leader.email}`} className="text-sm text-purple-600 hover:text-purple-700">
                {leader.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-purple-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Phone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 567-8901</p>
          </div>
          <div className="text-center">
            <Mail className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">identity@gov.paradisal</p>
          </div>
          <div className="text-center">
            <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">Identity Center, Block E<br />Government District, Paradisal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SovereigntyBelongingPage;