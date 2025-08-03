import React from 'react';
import { 
  Building2, 
  GraduationCap, 
  Heart, 
  Shield, 
  Users, 
  Briefcase, 
  TrendingUp,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface BranchesPageProps {
  setCurrentPage: (page: string) => void;
}

const BranchesPage: React.FC<BranchesPageProps> = ({ setCurrentPage }) => {
  const branches = [
    {
      id: 'development-services',
      name: 'Branch of Development & Services',
      shortName: 'Development & Public Services',
      icon: Building2,
      description: 'Developing and caring for infrastructure, public works, essential services, and the core needs of our community.',
      color: 'blue',
      services: ['Infrastructure Planning', 'Public Works', 'Utilities Management', 'Community Development'],
      stats: { projects: '150+', budget: '$2.5B', employees: '1,200' }
    },
    {
      id: 'learning-knowledge',
      name: 'Branch of Learning & Knowledge',
      shortName: 'Learning & Knowledge',
      icon: GraduationCap,
      description: 'Guiding the growth of education, research, libraries, and the preservation of knowledge for all.',
      color: 'green',
      services: ['Public Education', 'Higher Education', 'Research Programs', 'Digital Libraries'],
      stats: { schools: '500+', students: '2.1M', teachers: '85K' }
    },
    {
      id: 'wellbeing-health',
      name: 'Branch of Wellbeing & Health',
      shortName: 'Wellbeing & Health',
      icon: Heart,
      description: 'Providing healthcare, supporting mental well-being, and promoting public health and wellness across all communities.',
      color: 'red',
      services: ['Healthcare Services', 'Public Health', 'Mental Health Support', 'Wellness Programs'],
      stats: { hospitals: '120', patients: '8.5M', staff: '95K' }
    },
    {
      id: 'peace-order',
      name: 'Branch of Peace & Order',
      shortName: 'Peace & Order',
      icon: Shield,
      description: 'Protecting peace and safety through community guardianship, emergency response, and care-based public service.',
      color: 'indigo',
      services: ['Law Enforcement', 'Emergency Services', 'Public Safety', 'Community Security'],
      stats: { officers: '15K', stations: '200+', response: '4.2min' }
    },
    {
      id: 'sovereignty-belonging',
      name: 'Branch of Sovereignty & Belonging',
      shortName: 'Sovereignty & Belonging',
      icon: Users,
      description: 'Supporting personal identity, welcoming those who choose to belong, caring for cultural heritage, and honoring the diverse roots of our community.',
      color: 'purple',
      services: ['Citizenship Services', 'Immigration', 'Cultural Programs', 'National Identity'],
      stats: { nationals: '12.5M', applications: '50K/yr', offices: '75' }
    },
    {
      id: 'creation-exchange',
      name: 'Branch of Creation & Exchange',
      shortName: 'Creation & Exchange',
      icon: Briefcase,
      description: 'Encouraging creation and invention, and guiding the free flow of knowledge, trade, and craft—both among our people and with the wider world.',
      color: 'orange',
      services: ['Innovation Support', 'Trade Facilitation', 'Creative Industries', 'Technology Development'],
      stats: { startups: '2.5K', patents: '800/yr', exports: '$15B' }
    },
    {
      id: 'livelihood-prosperity',
      name: 'Branch of Livelihood & Prosperity',
      shortName: 'Livelihood & Prosperity',
      icon: TrendingUp,
      description: 'Uplifting community wellbeing through access to purposeful work, livelihood support, shared economic growth, and care-based assistance.',
      color: 'emerald',
      services: ['Employment Services', 'Economic Development', 'Social Welfare', 'Prosperity Programs'],
      stats: { jobs: '94.2%', programs: '25+', beneficiaries: '3.2M' }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      emerald: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBorderColor = (color: string) => {
    const colors = {
      blue: 'border-blue-200',
      green: 'border-green-200',
      red: 'border-red-200',
      indigo: 'border-indigo-200',
      purple: 'border-purple-200',
      orange: 'border-orange-200',
      emerald: 'border-emerald-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Branches of Paradisal</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore the seven branches of Paradisal, each dedicated to serving the people   and advancing their prosperity and well-being.
        </p>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className={`bg-white rounded-lg shadow-md border-2 ${getBorderColor(branch.color)} hover:shadow-lg transition-all duration-300 overflow-hidden`}
          >
            {/* Branch Header */}
            <div className={`bg-gradient-to-r ${getColorClasses(branch.color)} text-white p-6`}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                  <branch.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{branch.shortName}</h3>
                  <p className="text-sm opacity-90">{branch.name}</p>
                </div>
              </div>
            </div>

            {/* Branch Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">{branch.description}</p>

              {/* Key Services */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Services</h4>
                <div className="grid grid-cols-2 gap-2">
                  {branch.services.map((service, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Stats</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {Object.entries(branch.stats).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setCurrentPage(branch.id)}
                className={`w-full bg-gradient-to-r ${getColorClasses(branch.color)} text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300`}
              >
                <span>Explore Branch</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">General Branch Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Phone className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
            <p className="text-gray-600">1-800-GOV-HELP</p>
          </div>
          <div className="flex flex-col items-center">
            <Mail className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600">info@gov.paradisal</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Main Office</h3>
            <p className="text-gray-600">Government Complex, Paradisal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchesPage;