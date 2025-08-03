import React from 'react';
import { 
  GraduationCap, 
  ArrowLeft, 
  Users, 
  BookOpen, 
  Award, 
  Phone, 
  Mail, 
  MapPin,
  School,
  Library,
  Microscope,
  Globe
} from 'lucide-react';

interface LearningKnowledgePageProps {
  setCurrentPage: (page: string) => void;
}

const LearningKnowledgePage: React.FC<LearningKnowledgePageProps> = ({ setCurrentPage }) => {
  const services = [
    {
      icon: School,
      title: 'Public Education System',
      description: 'Comprehensive K-12 education with modern curricula and qualified teachers.',
      details: ['Primary education (K-6)', 'Secondary education (7-12)', 'Special needs programs', 'Vocational training']
    },
    {
      icon: GraduationCap,
      title: 'Higher Education',
      description: 'Universities, colleges, and specialized institutions for advanced learning.',
      details: ['National universities', 'Community colleges', 'Technical institutes', 'Graduate programs']
    },
    {
      icon: Library,
      title: 'Digital Libraries & Archives',
      description: 'Comprehensive digital resources and knowledge preservation systems.',
      details: ['National digital library', 'Historical archives', 'Research databases', 'Public access points']
    },
    {
      icon: Microscope,
      title: 'Research & Innovation',
      description: 'Supporting scientific research and technological advancement.',
      details: ['Research grants', 'Innovation labs', 'Academic partnerships', 'Technology transfer']
    }
  ];

  const achievements = [
    {
      metric: '98.5%',
      label: 'Literacy Rate',
      description: 'Highest in the region'
    },
    {
      metric: '2.1M',
      label: 'Students Enrolled',
      description: 'Across all education levels'
    },
    {
      metric: '85K',
      label: 'Qualified Teachers',
      description: 'Certified educators'
    },
    {
      metric: '500+',
      label: 'Educational Institutions',
      description: 'Schools and universities'
    }
  ];

  const programs = [
    {
      name: 'Digital Literacy Initiative',
      status: 'Active',
      participants: '1.5M students',
      description: 'Comprehensive digital skills training for all students'
    },
    {
      name: 'Teacher Excellence Program',
      status: 'Ongoing',
      participants: '15K teachers',
      description: 'Continuous professional development for educators'
    },
    {
      name: 'Research Innovation Fund',
      status: 'Active',
      participants: '200+ projects',
      description: 'Funding breakthrough research across disciplines'
    }
  ];

  const leadership = [
    {
      name: 'Dr. Maria Santos',
      position: 'Branch Director',
      experience: '20 years in educational leadership',
      email: 'm.santos@gov.paradisal'
    },
    {
      name: 'Prof. James Wilson',
      position: 'Higher Education Coordinator',
      experience: '18 years in university administration',
      email: 'j.wilson@gov.paradisal'
    },
    {
      name: 'Dr. Lisa Chang',
      position: 'Research & Innovation Director',
      experience: '15 years in scientific research',
      email: 'l.chang@gov.paradisal'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-8">
        <button
          onClick={() => setCurrentPage('branches')}
          className="flex items-center text-green-100 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Branches
        </button>
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-white bg-opacity-20 rounded-lg">
            <GraduationCap className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Branch of Learning & Knowledge</h1>
            <p className="text-xl text-green-100">Empowering minds and advancing knowledge for all</p>
          </div>
        </div>
      </div>

      {/* Key Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{achievement.metric}</div>
            <div className="font-semibold text-gray-900 mb-1">{achievement.label}</div>
            <div className="text-sm text-gray-600">{achievement.description}</div>
          </div>
        ))}
      </div>

      {/* Mission Statement */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          The Branch of Learning & Knowledge is dedicated to fostering a culture of lifelong learning and 
          intellectual growth throughout Paradisal. We ensure that every national has access to quality 
          education, from early childhood through advanced research opportunities, while preserving and 
          advancing human knowledge for future generations.
        </p>
      </div>

      {/* Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <service.icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
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

      {/* Active Programs */}
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
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
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

      {/* Leadership Team */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((leader, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{leader.name}</h3>
              <p className="text-green-600 font-medium mb-2">{leader.position}</p>
              <p className="text-sm text-gray-600 mb-3">{leader.experience}</p>
              <a href={`mailto:${leader.email}`} className="text-sm text-green-600 hover:text-green-700">
                {leader.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-green-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 234-5678</p>
          </div>
          <div className="text-center">
            <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">education@gov.paradisal</p>
          </div>
          <div className="text-center">
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">Education Center, Block B<br />Government District, Paradisal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningKnowledgePage;