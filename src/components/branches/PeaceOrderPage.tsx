import React from 'react';
import { 
  Shield, 
  ArrowLeft, 
  Users, 
  Clock, 
  AlertTriangle, 
  Phone, 
  Mail, 
  MapPin,
  Car,
  Radio,
  Eye,
  UserCheck
} from 'lucide-react';

interface PeaceOrderPageProps {
  setCurrentPage: (page: string) => void;
}

const PeaceOrderPage: React.FC<PeaceOrderPageProps> = ({ setCurrentPage }) => {
  const services = [
    {
      icon: Car,
      title: 'Law Enforcement',
      description: 'Professional police services ensuring public safety and law compliance.',
      details: ['Community policing', 'Crime prevention', 'Traffic enforcement', 'Criminal investigations']
    },
    {
      icon: Radio,
      title: 'Emergency Response',
      description: 'Rapid response to emergencies and crisis situations across the nation.',
      details: ['Emergency dispatch', 'First responders', 'Crisis management', 'Disaster response']
    },
    {
      icon: Eye,
      title: 'Public Safety Monitoring',
      description: 'Advanced surveillance and monitoring systems for enhanced security.',
      details: ['CCTV networks', 'Safety monitoring', 'Threat assessment', 'Security coordination']
    },
    {
      icon: UserCheck,
      title: 'Community Security',
      description: 'Collaborative programs building safer communities through partnership.',
      details: ['Neighborhood watch', 'Safety education', 'Community outreach', 'Crime prevention']
    }
  ];

  const safetyStats = [
    {
      metric: '15K',
      label: 'Officers',
      description: 'Trained law enforcement'
    },
    {
      metric: '200+',
      label: 'Stations',
      description: 'Police and emergency stations'
    },
    {
      metric: '4.2min',
      label: 'Response Time',
      description: 'Average emergency response'
    },
    {
      metric: '92%',
      label: 'Safety Rating',
      description: 'National satisfaction score'
    }
  ];

  const programs = [
    {
      name: 'Community Policing Initiative',
      status: 'Active',
      coverage: '100% of districts',
      description: 'Building trust and cooperation between police and communities'
    },
    {
      name: 'Emergency Preparedness Program',
      status: 'Ongoing',
      coverage: '500K nationals trained',
      description: 'Training nationals in emergency response and disaster preparedness'
    },
    {
      name: 'Youth Safety Education',
      status: 'Active',
      coverage: '300+ schools',
      description: 'Teaching safety awareness and crime prevention to young nationals'
    }
  ];

  const leadership = [
    {
      name: 'Commissioner Robert Taylor',
      position: 'Branch Director',
      experience: '30 years in law enforcement',
      email: 'r.taylor@gov.paradisal'
    },
    {
      name: 'Deputy Chief Maria Gonzalez',
      position: 'Operations Director',
      experience: '25 years in public safety',
      email: 'm.gonzalez@gov.paradisal'
    },
    {
      name: 'Captain David Kim',
      position: 'Emergency Services Coordinator',
      experience: '20 years in emergency response',
      email: 'd.kim@gov.paradisal'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg p-8">
        <button
          onClick={() => setCurrentPage('branches')}
          className="flex items-center text-indigo-100 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Branches
        </button>
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-white bg-opacity-20 rounded-lg">
            <Shield className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Branch of Peace & Order</h1>
            <p className="text-xl text-indigo-100">Protecting and serving our communities with integrity</p>
          </div>
        </div>
      </div>

      {/* Safety Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {safetyStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.metric}</div>
            <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
            <div className="text-sm text-gray-600">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Mission Statement */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          The Branch of Peace & Order is dedicated to maintaining public safety, enforcing laws fairly, 
          and protecting the rights and freedoms of all nationals. We work collaboratively with communities 
          to prevent crime, respond to emergencies, and ensure that Paradisal remains a safe and secure 
          place for everyone to live, work, and thrive.
        </p>
      </div>

      {/* Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <service.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
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

      {/* Safety Programs */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety Programs</h2>
        <div className="space-y-4">
          {programs.map((program, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-3">{program.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {program.status}
                    </span>
                    <span>Coverage: {program.coverage}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Information */}
      <div className="bg-indigo-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Emergency Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency</h3>
            <p className="text-3xl font-bold text-red-600 mb-2">911</p>
            <p className="text-gray-600">Police, Fire, Medical</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Non-Emergency</h3>
            <p className="text-3xl font-bold text-indigo-600 mb-2">311</p>
            <p className="text-gray-600">General police services</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Crime Tips</h3>
            <p className="text-3xl font-bold text-orange-600 mb-2">1-800-TIPS</p>
            <p className="text-gray-600">Anonymous reporting</p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((leader, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{leader.name}</h3>
              <p className="text-indigo-600 font-medium mb-2">{leader.position}</p>
              <p className="text-sm text-gray-600 mb-3">{leader.experience}</p>
              <a href={`mailto:${leader.email}`} className="text-sm text-indigo-600 hover:text-indigo-700">
                {leader.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-indigo-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Phone className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 456-7890</p>
          </div>
          <div className="text-center">
            <Mail className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">safety@gov.paradisal</p>
          </div>
          <div className="text-center">
            <MapPin className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">Safety Center, Block D<br />Government District, Paradisal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeaceOrderPage;