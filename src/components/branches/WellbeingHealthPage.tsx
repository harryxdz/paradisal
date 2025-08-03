import React from 'react';
import { Heart, ArrowLeft, Users, Activity, Shield, Phone, Mail, MapPin, Building as Hospital, Stethoscope, Brain, Smile } from 'lucide-react';

interface WellbeingHealthPageProps {
  setCurrentPage: (page: string) => void;
}

const WellbeingHealthPage: React.FC<WellbeingHealthPageProps> = ({ setCurrentPage }) => {
  const services = [
    {
      icon: Hospital,
      title: 'Healthcare Services',
      description: 'Comprehensive medical care through hospitals, clinics, and specialized centers.',
      details: ['Emergency care', 'Primary healthcare', 'Specialist services', 'Surgical procedures']
    },
    {
      icon: Stethoscope,
      title: 'Preventive Medicine',
      description: 'Proactive health programs focused on disease prevention and early detection.',
      details: ['Health screenings', 'Vaccination programs', 'Health education', 'Wellness checkups']
    },
    {
      icon: Brain,
      title: 'Mental Health Support',
      description: 'Comprehensive mental health services and psychological support programs.',
      details: ['Counseling services', 'Crisis intervention', 'Support groups', 'Therapy programs']
    },
    {
      icon: Smile,
      title: 'Community Wellness',
      description: 'Programs promoting healthy lifestyles and community wellbeing.',
      details: ['Fitness programs', 'Nutrition education', 'Health campaigns', 'Wellness workshops']
    }
  ];

  const healthStats = [
    {
      metric: '8.5M',
      label: 'Patients Served',
      description: 'Annual healthcare visits'
    },
    {
      metric: '120',
      label: 'Healthcare Facilities',
      description: 'Hospitals and clinics'
    },
    {
      metric: '95K',
      label: 'Healthcare Staff',
      description: 'Doctors, nurses, and support staff'
    },
    {
      metric: '78.5',
      label: 'Life Expectancy',
      description: 'Years (national average)'
    }
  ];

  const initiatives = [
    {
      name: 'Universal Health Coverage',
      status: 'Active',
      coverage: '99.2% of population',
      description: 'Ensuring healthcare access for all nationals'
    },
    {
      name: 'Mental Health First Aid',
      status: 'Expanding',
      coverage: '500+ trained responders',
      description: 'Community-based mental health support network'
    },
    {
      name: 'Healthy Communities Program',
      status: 'Ongoing',
      coverage: '150 communities',
      description: 'Promoting wellness and disease prevention'
    }
  ];

  const leadership = [
    {
      name: 'Dr. Patricia Williams',
      position: 'Branch Director',
      experience: '25 years in public health',
      email: 'p.williams@gov.paradisal'
    },
    {
      name: 'Dr. Ahmed Hassan',
      position: 'Chief Medical Officer',
      experience: '20 years in emergency medicine',
      email: 'a.hassan@gov.paradisal'
    },
    {
      name: 'Dr. Jennifer Lee',
      position: 'Mental Health Director',
      experience: '18 years in clinical psychology',
      email: 'j.lee@gov.paradisal'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg p-8">
        <button
          onClick={() => setCurrentPage('branches')}
          className="flex items-center text-red-100 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Branches
        </button>
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-white bg-opacity-20 rounded-lg">
            <Heart className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Branch of Wellbeing & Health</h1>
            <p className="text-xl text-red-100">Caring for the health and wellness of every national</p>
          </div>
        </div>
      </div>

      {/* Health Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {healthStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{stat.metric}</div>
            <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
            <div className="text-sm text-gray-600">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Mission Statement */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          The Branch of Wellbeing & Health is committed to ensuring the physical, mental, and social wellbeing 
          of all nationals. We provide comprehensive healthcare services, promote healthy lifestyles, and work 
          tirelessly to prevent disease and injury while supporting those in need of care and treatment.
        </p>
      </div>

      {/* Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <service.icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
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

      {/* Health Initiatives */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Health Initiatives</h2>
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
                    <span>Coverage: {initiative.coverage}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Services */}
      <div className="bg-red-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Emergency Health Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Hotline</h3>
            <p className="text-3xl font-bold text-red-600 mb-2">911</p>
            <p className="text-gray-600">24/7 emergency medical response</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Crisis Support</h3>
            <p className="text-3xl font-bold text-red-600 mb-2">988</p>
            <p className="text-gray-600">Mental health crisis intervention</p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((leader, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{leader.name}</h3>
              <p className="text-red-600 font-medium mb-2">{leader.position}</p>
              <p className="text-sm text-gray-600 mb-3">{leader.experience}</p>
              <a href={`mailto:${leader.email}`} className="text-sm text-red-600 hover:text-red-700">
                {leader.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-red-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Phone className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 345-6789</p>
          </div>
          <div className="text-center">
            <Mail className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">health@gov.paradisal</p>
          </div>
          <div className="text-center">
            <MapPin className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">Health Center, Block C<br />Government District, Paradisal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellbeingHealthPage;