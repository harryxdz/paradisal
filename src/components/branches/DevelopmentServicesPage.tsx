import React from 'react';
import { Building2, ArrowLeft, Users, DollarSign, Calendar, Phone, Mail, MapPin, Wrench, Zap, Home, Truck as Road, Droplets, Wifi } from 'lucide-react';

interface DevelopmentServicesPageProps {
  setCurrentPage: (page: string) => void;
}

const DevelopmentServicesPage: React.FC<DevelopmentServicesPageProps> = ({ setCurrentPage }) => {
  const services = [
    {
      icon: Road,
      title: 'Infrastructure',
      description: 'Planning and construction of roads, bridges, and transportation networks.',
      details: ['Highway construction', 'Bridge maintenance', 'Traffic management', 'Urban planning']
    },
    {
      icon: Zap,
      title: 'Essential Services',
      description: 'Care for and maintain the vital systems that support daily life across Paradisal — ensuring everyone has access to clean water, reliable energy, and open lines of connection.',
      details: ['Water flow and access', 'Energy networks (gas and electricity)', 'Communication systems']
    },
    {
      icon: Home,
      title: 'Public Buildings',
      description: 'Construction and maintenance of government and public facilities.',
      details: ['Government offices', 'Community centers', 'Public libraries', 'Recreation facilities']
    }
  ];

  const projects = [
    {
      name: 'National Highway Expansion',
      status: 'In Progress',
      completion: '75%',
      budget: '$850M',
      timeline: '2023-2026'
    },
    {
      name: 'Smart City Initiative',
      status: 'Planning',
      completion: '25%',
      budget: '$1.2B',
      timeline: '2025-2028'
    },
    {
      name: 'Water Treatment Upgrade',
      status: 'Completed',
      completion: '100%',
      budget: '$300M',
      timeline: '2022-2024'
    }
  ];

  const leadership = [
    {
      name: 'Harry of The Richardson Family',
      position: 'Branch Head Caretaker',
      email: 'harry@gov.paradisal'
    },
    {
      name: 'To Be Considered',
      position: 'To Be Considered',
      email: 'To Be Considered'
    },
    {
      name: 'To Be Considered',
      position: 'To Be Considered',
      email: 'To Be Considered'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
        <button
          onClick={() => setCurrentPage('branches')}
          className="flex items-center text-blue-100 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Branches
        </button>
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-white bg-opacity-20 rounded-lg">
            <Building2 className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Branch of Development & Services</h1>
            <p className="text-xl text-blue-100">Building the infrastructure for Paradisal's future</p>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
          <div className="text-gray-600">Active Projects</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">$2.5B</div>
          <div className="text-gray-600">Annual Budget</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">1,200</div>
          <div className="text-gray-600">Employees</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
          <div className="text-gray-600">Project Success Rate</div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Branch Purpose</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          The Branch of Development & Services exists to shape and sustain the essential foundations that support life in Paradisal. We guide the growth of shared spaces, ensure access to clean utilities, safe and connected transport, and maintain public facilities that uplift daily life and create opportunity for all who belong.
        </p>
      </div>

      {/* Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
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

      {/* Current Projects */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Developments</h2>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                    <span>Budget: {project.budget}</span>
                    <span>Timeline: {project.timeline}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{project.completion}</div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Caretaker Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((leader, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{leader.name}</h3>
              <p className="text-blue-600 font-medium mb-2">{leader.position}</p>
              <p className="text-sm text-gray-600 mb-3">{leader.experience}</p>
              <a href={`mailto:${leader.email}`} className="text-sm text-blue-600 hover:text-blue-700">
                {leader.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="text-center">
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">development@gov.paradisal</p>
          </div>
          <div className="text-center">
            <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">Development Complex, Block A<br />Government District, Paradisal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentServicesPage;