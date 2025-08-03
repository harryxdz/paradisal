import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  CreditCard, 
  FileText, 
  Calendar, 
  MessageCircle, 
  Shield, 
  BarChart3, 
  Users, 
  Activity,
  Download,
  Plus,
  Search,
  Filter,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Paperclip,
  Send,
  ArrowLeft,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
  Info,
  Loader,
  ChevronRight
} from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import type { 
  AccountType, 
  MockUser, 
  Ticket, 
  TicketMessage, 
  LogEvent, 
  Appointment, 
  Payment, 
  Service, 
  ServiceCategory, 
  Macro, 
  Notification, 
  SecurityEvent, 
  IntegrationStatus, 
  Collaborator, 
  WidgetPreferences, 
  AdminStats, 
  CitizenInfo 
} from './AccountPage/types';
import { mockAccounts, PREDEFINED_MACROS, serviceCategories } from './AccountPage/mockData';

const AccountPage: React.FC = () => {
  const currentUser = getCurrentUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAdmin] = useState(currentUser?.role === 'admin');
  
  // State management
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeCitizenTicketId, setActiveCitizenTicketId] = useState<string | null>(null);
  const [activeAdminTicketId, setActiveAdminTicketId] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  
  // Modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentService, setPaymentService] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  
  // Form states
  const [ticketDraft, setTicketDraft] = useState({ title: '', message: '', files: [] as File[] });
  const [newAppointment, setNewAppointment] = useState({ service: '', date: '', time: '', location: '' });
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  
  // Chat states
  const [citizenTyping, setCitizenTyping] = useState(false);
  const [adminTyping, setAdminTyping] = useState(false);
  
  // Mock data
  const paymentMethod = { type: 'Credit Card', card: '**** 4532', expires: '12/26' };
  const collaborators: Collaborator[] = [
    { id: '1', name: 'John Doe', initials: 'JD' },
    { id: '2', name: 'Jane Smith', initials: 'JS' }
  ];

  // Initialize mock data
  useEffect(() => {
    // Initialize with mock data
    const mockTickets: Ticket[] = [
      {
        id: 'TKT-001',
        title: 'Passport Application Issue',
        requesterName: 'Maria Rodriguez',
        requesterEmail: 'maria.rodriguez@email.com',
        createdAt: '2025-01-15T10:30:00Z',
        status: 'open',
        messages: [
          {
            id: 'MSG-001',
            sender: 'citizen',
            message: 'I need help with my passport application. The system is not accepting my documents.',
            timestamp: '2025-01-15T10:30:00Z',
            read: true
          }
        ]
      }
    ];

    const mockAppointments: Appointment[] = [
      {
        id: 'APT-001',
        service: 'License Renewal',
        date: '2025-01-20',
        time: '10:00',
        status: 'scheduled',
        location: 'Central Office'
      }
    ];

    const mockPayments: Payment[] = [
      {
        id: 'PAY-001',
        service: 'Passport Application',
        amount: 110,
        date: '2025-01-15',
        status: 'completed',
        invoice: 'INV-001'
      }
    ];

    const mockNotifications: Notification[] = [
      {
        id: 'NOT-001',
        title: 'Application Approved',
        message: 'Your passport application has been approved.',
        date: '2025-01-15',
        type: 'success',
        unread: true
      }
    ];

    const mockSecurityEvents: SecurityEvent[] = [
      {
        id: 'SEC-001',
        type: 'Login',
        location: 'New York, NY',
        device: 'Chrome on Windows',
        time: '2025-01-15 10:30 AM',
        status: 'Success'
      }
    ];

    setTickets(mockTickets);
    setAppointments(mockAppointments);
    setPayments(mockPayments);
    setNotifications(mockNotifications);
    setSecurityEvents(mockSecurityEvents);
  }, []);

  // Event handlers
  const handleCitizenTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = {
      id: `TKT-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      title: ticketDraft.title,
      requesterName: currentUser?.username || 'Unknown',
      requesterEmail: currentUser?.email || 'unknown@email.com',
      createdAt: new Date().toISOString(),
      status: 'open',
      messages: [
        {
          id: `MSG-${Math.random().toString(36).slice(2, 10)}`,
          sender: 'citizen',
          message: ticketDraft.message,
          timestamp: new Date().toISOString(),
          attachments: ticketDraft.files.map(f => ({ name: f.name })),
          read: false
        }
      ]
    };
    
    setTickets([newTicket, ...tickets]);
    setTicketDraft({ title: '', message: '', files: [] });
    setActiveCitizenTicketId(null);
  };

  const handleCitizenTicketMessage = (ticketId: string, message: string, files: File[]) => {
    const newMessage: TicketMessage = {
      id: `MSG-${Math.random().toString(36).slice(2, 10)}`,
      sender: 'citizen',
      message,
      timestamp: new Date().toISOString(),
      attachments: files.map(f => ({ name: f.name })),
      read: false
    };

    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, messages: [...ticket.messages, newMessage] }
        : ticket
    ));
  };

  const handleAdminSendMessage = (ticketId: string, message: string, files: File[], internal: boolean = false) => {
    const newMessage: TicketMessage = {
      id: `MSG-${Math.random().toString(36).slice(2, 10)}`,
      sender: 'admin',
      message,
      timestamp: new Date().toISOString(),
      attachments: files.map(f => ({ name: f.name })),
      read: false,
      internal
    };

    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, messages: [...ticket.messages, newMessage] }
        : ticket
    ));
  };

  const handleCloseTicket = (ticketId: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: 'closed' as const, closedAt: new Date().toISOString() }
        : ticket
    ));
  };

  const handleMakePayment = (service: string, amount: number) => {
    setPaymentService(service);
    setPaymentAmount(amount);
    setShowPaymentModal(true);
    setPaymentSuccess(false);
  };

  const processPayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      
      const newPayment: Payment = {
        id: `PAY-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
        service: paymentService,
        amount: paymentAmount,
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
        invoice: `INV-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
      };
      
      setPayments([newPayment, ...payments]);
      
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
      }, 3000);
    }, 2000);
  };

  const initiateService = (service: Service) => {
    setSelectedService(service);
    setShowServiceDetails(true);
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppt: Appointment = {
      id: `APT-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      service: newAppointment.service,
      date: newAppointment.date,
      time: newAppointment.time,
      status: 'scheduled',
      location: newAppointment.location
    };
    setAppointments([...appointments, newAppt]);
    setNewAppointment({ service: '', date: '', time: '', location: '' });
    setShowAppointmentModal(false);
    
    setNotifications(prev => [
      {
        id: Math.random().toString(36).slice(2, 10),
        title: 'Appointment Scheduled',
        message: `Your appointment for ${newAppointment.service} has been scheduled.`,
        date: new Date().toISOString().split('T')[0],
        type: 'info',
        unread: true
      },
      ...prev
    ]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments(appointments.map(a => 
      a.id === id ? {...a, status: 'cancelled' as const} : a
    ));
  };

  const rescheduleAppointment = (id: string) => {
    const appt = appointments.find(a => a.id === id);
    if (appt) {
      setNewAppointment({
        service: appt.service,
        date: appt.date,
        time: appt.time,
        location: appt.location
      });
      setAppointments(appointments.filter(a => a.id !== id));
      setShowAppointmentModal(true);
    }
  };

  // Tab configuration
  const tabs = isAdmin ? [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'tickets', label: 'Support Tickets', icon: MessageCircle },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ] : [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'services', label: 'Services', icon: FileText },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'support', label: 'Support', icon: MessageCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Render functions
  const renderOverview = () => {
    if (isAdmin) {
      const adminStats: AdminStats = {
        totalUsers: 12500,
        pendingApprovals: 45,
        flaggedContent: 3,
        systemHealth: 98
      };

      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold">{adminStats.pendingApprovals}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Flagged Content</p>
                  <p className="text-2xl font-bold">{adminStats.flaggedContent}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Health</p>
                  <p className="text-2xl font-bold">{adminStats.systemHealth}%</p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {tickets.slice(0, 5).map(ticket => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{ticket.title}</p>
                      <p className="text-sm text-gray-600">by {ticket.requesterName}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      ticket.status === 'open' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Database</span>
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" /> Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>API Services</span>
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" /> Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment Gateway</span>
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" /> Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Citizen overview
    const citizenInfo: CitizenInfo = {
      name: currentUser?.username || 'Unknown User',
      id: mockAccounts[AccountType.User].nationalId,
      status: 'Active',
      registrationDate: mockAccounts[AccountType.User].createdAt,
      address: '123 Main St, Paradisal',
      phone: mockAccounts[AccountType.User].phone,
      email: mockAccounts[AccountType.User].email,
      votingDistrict: 'District 5'
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-2">Welcome, {citizenInfo.name}</h2>
          <p className="opacity-90">National ID: {citizenInfo.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setActiveTab('services')}
                className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
              >
                <FileText className="w-5 h-5 inline mr-2 text-blue-600" />
                Apply for Documents
              </button>
              <button 
                onClick={() => setActiveTab('appointments')}
                className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition"
              >
                <Calendar className="w-5 h-5 inline mr-2 text-green-600" />
                Schedule Appointment
              </button>
              <button 
                onClick={() => setActiveTab('payments')}
                className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
              >
                <CreditCard className="w-5 h-5 inline mr-2 text-purple-600" />
                Make Payment
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {payments.slice(0, 3).map(payment => (
                <div key={payment.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{payment.service}</p>
                    <p className="text-xs text-gray-600">{payment.date}</p>
                  </div>
                  <span className="text-green-600 font-bold">${payment.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold mb-4">Notifications</h3>
            <div className="space-y-3">
              {notifications.slice(0, 3).map(notification => (
                <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-gray-600">{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <p className="font-medium">{citizenInfo.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">National ID</label>
                <p className="font-medium">{citizenInfo.id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <p className="font-medium text-green-600">{citizenInfo.status}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Registration Date</label>
                <p className="font-medium">{new Date(citizenInfo.registrationDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Address</label>
                <p className="font-medium">{citizenInfo.address}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <p className="font-medium">{citizenInfo.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium">{citizenInfo.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Voting District</label>
                <p className="font-medium">{citizenInfo.votingDistrict}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderServices = () => {
    const [serviceSearch, setServiceSearch] = useState('');
    
    const filteredCategories = serviceCategories.map(category => ({
      ...category,
      services: category.services.filter(service => 
        service.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
        service.description.toLowerCase().includes(serviceSearch.toLowerCase())
      )
    })).filter(category => category.services.length > 0);

    const serviceHistory = [
      { service: 'Passport Application', date: '2025-01-15', status: 'Completed', reference: 'REF-001' },
      { service: 'License Renewal', date: '2025-01-10', status: 'In Progress', reference: 'REF-002' }
    ];
    
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Service Catalog</h3>
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search services..."
                value={serviceSearch}
                onChange={e => setServiceSearch(e.target.value)}
                className="pl-10 p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
          
          {filteredCategories.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl">
              <Info className="w-10 h-10 mx-auto mb-4 text-blue-500" />
              <p>No services found matching your search</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredCategories.map(category => (
                <div key={category.id}>
                  <h4 className="text-lg font-bold mb-4 border-b pb-2">{category.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.services.map(service => (
                      <div 
                        key={service.id}
                        className="border rounded-xl p-5 hover:shadow-md transition cursor-pointer group"
                        onClick={() => initiateService(service)}
                      >
                        <div className="flex justify-between items-start">
                          <h5 className="font-bold text-lg group-hover:text-blue-600 transition">{service.name}</h5>
                          {service.fee > 0 ? (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              ${service.fee.toFixed(2)}
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              Free
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 mt-2">{service.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" /> {service.duration}
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                            Start Service <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Recently Used Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceHistory.map((service, i) => (
              <div key={i} className="border rounded-xl p-4 flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h5 className="font-bold">{service.service}</h5>
                  <p className="text-sm text-gray-500">Ref: {service.reference}</p>
                  <div className="mt-2 flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      service.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {service.status}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{service.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAppointments = () => {
    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'scheduled': return <Clock className="w-5 h-5 text-blue-500" />;
        case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
        case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
        default: return <Calendar className="w-5 h-5" />;
      }
    };

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">My Appointments</h3>
          <button
            onClick={() => setShowAppointmentModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4 mr-1" /> New Appointment
          </button>
        </div>
        
        {appointments.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl">
            <Calendar className="w-10 h-10 mx-auto mb-4 text-blue-500" />
            You have no upcoming appointments scheduled.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map(appt => (
              <div key={appt.id} className={`p-4 border rounded-xl hover:shadow-md transition ${
                appt.status === 'cancelled' ? 'bg-gray-100 border-gray-200' : 
                appt.status === 'completed' ? 'bg-green-50 border-green-200' : 
                'bg-white border-blue-200'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{appt.service}</h4>
                    <p className="text-sm text-gray-600">{appt.location}</p>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(appt.status)}
                    <span className={`ml-1 text-xs ${
                      appt.status === 'scheduled' ? 'text-blue-600' : 
                      appt.status === 'completed' ? 'text-green-600' : 
                      'text-gray-500'
                    }`}>
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="font-medium">{new Date(appt.date).toLocaleDateString()} at {appt.time}</span>
                </div>
                {appt.status === 'scheduled' && (
                  <div className="mt-4 flex gap-2">
                    <button 
                      onClick={() => rescheduleAppointment(appt.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Reschedule
                    </button>
                    <button 
                      onClick={() => cancelAppointment(appt.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {showAppointmentModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Schedule New Appointment
              </h3>
              <form onSubmit={handleCreateAppointment}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Service</label>
                  <select
                    value={newAppointment.service}
                    onChange={e => setNewAppointment({...newAppointment, service: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="License Renewal">License Renewal</option>
                    <option value="Passport Application">Passport Application</option>
                    <option value="Tax Consultation">Tax Consultation</option>
                    <option value="ID Card Replacement">ID Card Replacement</option>
                    <option value="Permit Application">Permit Application</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={e => setNewAppointment({...newAppointment, date: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={e => setNewAppointment({...newAppointment, time: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <select
                    value={newAppointment.location}
                    onChange={e => setNewAppointment({...newAppointment, location: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="">Select a location</option>
                    <option value="Central Office">Central Office</option>
                    <option value="District Office">District Office</option>
                    <option value="North Branch">North Branch</option>
                    <option value="South Branch">South Branch</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAppointmentModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Schedule Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPayments = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Make a Payment</h3>
            <button 
              onClick={() => handleMakePayment('Custom Payment', 0)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4 mr-1" /> Custom Payment
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceCategories.flatMap(category => 
              category.services.filter(s => s.fee > 0).map(service => (
                <div 
                  key={service.id}
                  className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => handleMakePayment(service.name, service.fee)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold">{service.name}</h4>
                    <DollarSign className="text-green-600" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{service.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold">${service.fee.toFixed(2)}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Pay Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Payment History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payments.map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">{payment.service}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{payment.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap">${payment.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 flex items-center">
                        <Download className="w-4 h-4 mr-1" /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
          <div className="flex items-center justify-between p-4 border rounded-xl">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-blue-500 mr-4" />
              <div>
                <p className="font-medium">Credit Card</p>
                <p className="text-sm text-gray-500">{paymentMethod.card} • Exp {paymentMethod.expires}</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800">Edit</button>
          </div>
          <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
            <Plus className="w-4 h-4 mr-1" /> Add Payment Method
          </button>
        </div>
      </div>
    );
  };

  const renderSupport = () => {
    const citizenInfo = {
      name: currentUser?.username || 'Unknown User',
      email: currentUser?.email || 'unknown@email.com'
    };

    const activeTicket = tickets.find(t => t.id === activeCitizenTicketId);

    return activeTicket ? (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setActiveCitizenTicketId(null)} className="text-blue-500 hover:underline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Tickets
          </button>
          <div className="font-semibold">{activeTicket.title}</div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            activeTicket.status === 'open' ? 'bg-blue-100 text-blue-600'
              : activeTicket.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-500'
          }`}>
            {activeTicket.status[0].toUpperCase() + activeTicket.status.slice(1)}
          </span>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 mb-4 h-64 overflow-y-auto">
          {activeTicket.messages.filter(m => !m.internal).map((msg, i) => (
            <div key={msg.id || i} className={`mb-4 ${msg.sender === 'citizen' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] ${msg.sender === 'citizen' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-200 text-gray-800 rounded-tl-sm'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">
                    {msg.sender === 'citizen' ? 'You' : 'Support'}
                  </span>
                  <span className="text-xs text-gray-300 ml-2">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-sm">{msg.message}</div>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {msg.attachments.map((att, j) => (
                      <span key={j} className="flex items-center px-2 py-1 bg-white/20 rounded text-xs">
                        <Paperclip className="w-3 h-3 mr-1" /> {att.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {activeTicket.status !== 'closed' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const message = formData.get('message') as string;
            if (message.trim()) {
              handleCitizenTicketMessage(activeTicket.id, message, []);
              (e.target as HTMLFormElement).reset();
            }
          }} className="flex gap-2 items-center">
            <input
              name="message"
              placeholder="Type your message..."
              className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-300"
              required
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition">
              <Send className="w-4 h-4 mr-1" /> Send
            </button>
          </form>
        )}
      </div>
    ) : (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">My Support Tickets</h3>
          <button
            onClick={() => setActiveCitizenTicketId('NEW')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4 mr-1" /> New Ticket
          </button>
        </div>
        {tickets.filter(t => t.requesterEmail === citizenInfo.email).length === 0 ? (
          <div className="text-center text-gray-400 py-10 bg-gray-50 rounded-xl">
            <MessageCircle className="w-10 h-10 mx-auto mb-4 text-blue-500" />
            You have not created any support tickets yet.
          </div>
        ) : (
          <ul className="divide-y bg-white rounded-xl shadow-sm">
            {tickets
              .filter(t => t.requesterEmail === citizenInfo.email)
              .map(t => (
                <li
                  key={t.id}
                  className="py-3 px-4 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition rounded-xl"
                  onClick={() => setActiveCitizenTicketId(t.id)}
                >
                  <div>
                    <span className="font-medium">{t.title}</span>
                    <span className="ml-2 text-xs text-gray-400">{t.id}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    t.status === 'open' ? 'bg-blue-100 text-blue-600'
                      : t.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {t.status[0].toUpperCase() + t.status.slice(1)}
                  </span>
                </li>
              ))}
          </ul>
        )}
        {activeCitizenTicketId === 'NEW' && (
          <form onSubmit={handleCitizenTicketSubmit} className="mt-6 bg-white p-6 rounded-xl shadow-md space-y-4">
            <h4 className="font-semibold text-lg">Open a New Support Ticket</h4>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Title</label>
              <input
                name="title"
                value={ticketDraft.title}
                onChange={(e) => setTicketDraft({ ...ticketDraft, title: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
                maxLength={80}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Message</label>
              <textarea
                name="message"
                value={ticketDraft.message}
                onChange={(e) => setTicketDraft({ ...ticketDraft, message: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
                rows={3}
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition"
            >
              <MessageCircle className="w-4 h-4 mr-1" /> Submit Ticket
            </button>
          </form>
        )}
      </div>
    );
  };

  const renderNotifications = () => {
    const markAsRead = (id: string) => {
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, unread: false } : n
      ));
    };

    const markAllAsRead = () => {
      setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Notifications</h3>
          <button 
            onClick={markAllAsRead}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Mark all as read
          </button>
        </div>
        
        {notifications.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl">
            <Bell className="w-10 h-10 mx-auto mb-4 text-blue-500" />
            You have no notifications.
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 border rounded-xl cursor-pointer transition ${
                  notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-semibold">{notification.title}</h4>
                      {notification.unread && (
                        <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">{notification.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    notification.type === 'success' ? 'bg-green-100 text-green-800' :
                    notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {notification.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSecurity = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Security Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                <div>
                  <p className="font-semibold">Account Secure</p>
                  <p className="text-sm text-gray-600">No security issues detected</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-6 h-6 text-blue-600 mr-2" />
                <div>
                  <p className="font-semibold">2FA Enabled</p>
                  <p className="text-sm text-gray-600">Two-factor authentication active</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
                <div>
                  <p className="font-semibold">Password Age</p>
                  <p className="text-sm text-gray-600">Last changed 90 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Recent Security Events</h3>
          <div className="space-y-3">
            {securityEvents.map(event => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{event.type}</p>
                  <p className="text-sm text-gray-600">{event.location} • {event.device}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{event.time}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    event.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Login Notifications</p>
                <p className="text-sm text-gray-600">Get notified of new logins</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">On</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Change</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input 
                type="text" 
                defaultValue={currentUser?.username || ''} 
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                defaultValue={currentUser?.email || ''} 
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input 
                type="tel" 
                defaultValue={mockAccounts[AccountType.User].phone} 
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-600">Receive updates via SMS</p>
              </div>
              <input type="checkbox" className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Communications</p>
                <p className="text-sm text-gray-600">Receive promotional content</p>
              </div>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Privacy</h3>
          <div className="space-y-4">
            <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
              Download My Data
            </button>
            <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Admin-specific renders
  const renderAdminTickets = () => {
    const activeTicket = tickets.find(t => t.id === activeAdminTicketId);

    return activeTicket ? (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setActiveAdminTicketId(null)} className="text-blue-500 hover:underline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Tickets
          </button>
          <div>
            <div className="font-semibold">{activeTicket.title}</div>
            <div className="text-xs text-gray-400">
              Ticket ID: {activeTicket.id} — Requester: {activeTicket.requesterName}
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            activeTicket.status === 'open' ? 'bg-blue-100 text-blue-600'
              : activeTicket.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-500'
          }`}>
            {activeTicket.status[0].toUpperCase() + activeTicket.status.slice(1)}
          </span>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-4 h-64 overflow-y-auto">
          {activeTicket.messages.map((msg, i) => (
            <div
              key={msg.id || i}
              className={`mb-4 ${msg.sender === 'admin'
                ? (msg.internal ? 'pr-12' : 'text-right') : 'text-left'}`}
            >
              <div className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] ${
                msg.internal
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-tl-sm'
                  : msg.sender === 'admin'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-gray-200 text-gray-800 rounded-tl-sm'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">
                    {msg.internal
                      ? <span className="flex items-center"><EyeOff className="w-3 h-3 mr-1" />Internal note</span>
                      : msg.sender === 'admin' ? 'Support' : activeTicket.requesterName}
                  </span>
                  <span className="text-xs text-gray-300 ml-2">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-sm">{msg.message}</div>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {msg.attachments.map((att, j) => (
                      <span key={j} className="flex items-center px-2 py-1 bg-white/20 rounded text-xs">
                        <Paperclip className="w-3 h-3 mr-1" /> {att.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {activeTicket.status !== 'closed' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const message = formData.get('message') as string;
            const internal = formData.get('internal') === 'on';
            if (message.trim()) {
              handleAdminSendMessage(activeTicket.id, message, [], internal);
              (e.target as HTMLFormElement).reset();
            }
          }} className="flex flex-col md:flex-row gap-2 items-center">
            <input
              name="message"
              placeholder="Type your reply..."
              className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-300"
              required
            />
            <label className="flex items-center ml-2 text-xs text-yellow-700 cursor-pointer select-none">
              <input
                name="internal"
                type="checkbox"
                className="mr-1 accent-blue-600"
              />
              Internal
            </label>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition">
              <Send className="w-4 h-4 mr-1" /> Send
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg flex items-center ml-2 hover:bg-gray-400 transition"
              onClick={() => handleCloseTicket(activeTicket.id)}
              disabled={activeTicket.status === 'closed'}
            >
              <XCircle className="w-4 h-4 mr-1" /> Close
            </button>
          </form>
        )}
      </div>
    ) : (
      <div>
        <h3 className="text-xl font-bold mb-6">Support Tickets</h3>
        <div className="space-y-3">
          {tickets.map(ticket => (
            <div 
              key={ticket.id}
              className="bg-white p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition"
              onClick={() => setActiveAdminTicketId(ticket.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{ticket.title}</h4>
                  <p className="text-sm text-gray-600">by {ticket.requesterName} • {ticket.id}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ticket.status === 'open' ? 'bg-blue-100 text-blue-600'
                    : ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {ticket.status[0].toUpperCase() + ticket.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'services': return renderServices();
      case 'appointments': return renderAppointments();
      case 'payments': return renderPayments();
      case 'support': return renderSupport();
      case 'notifications': return renderNotifications();
      case 'security': return renderSecurity();
      case 'settings': return renderSettings();
      case 'tickets': return renderAdminTickets();
      case 'users': return <div>User Management (Admin)</div>;
      case 'analytics': return <div>Analytics Dashboard (Admin)</div>;
      default: return renderOverview();
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isAdmin ? 'Admin Dashboard' : 'My Account'}
              </h1>
              <p className="text-gray-600">
                Welcome back, {currentUser.username}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  logout();
                  window.location.reload();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {paymentSuccess ? "Payment Successful" : "Confirm Payment"}
              </h3>
              {!paymentProcessing && !paymentSuccess && (
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              )}
            </div>
            
            {paymentProcessing ? (
              <div className="py-10 flex flex-col items-center justify-center">
                <Loader className="animate-spin h-12 w-12 text-blue-500 mb-4" />
                <p>Processing your payment...</p>
                <p className="text-sm text-gray-500 mt-2">Please do not close this window</p>
              </div>
            ) : paymentSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-xl font-bold mb-1">Payment Successful!</p>
                <p className="text-gray-600">Thank you for your payment</p>
                <div className="mt-6 bg-green-50 rounded-lg p-4 w-full">
                  <p className="text-center font-medium">
                    {paymentService} - ${paymentAmount.toFixed(2)}
                  </p>
                  <p className="text-center text-sm text-gray-500 mt-1">
                    Transaction ID: PAY-{Math.random().toString(36).slice(2, 10).toUpperCase()}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-blue-50 rounded-xl p-5 mb-6">
                  <div className="text-center mb-4">
                    <p className="text-3xl font-bold">${paymentAmount.toFixed(2)}</p>
                    <p className="text-gray-600">{paymentService}</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Payment Method</span>
                      <button className="text-blue-600 text-sm">Change</button>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="w-8 h-8 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium">Credit Card</p>
                        <p className="text-sm text-gray-500">{paymentMethod.card} • Exp {paymentMethod.expires}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={processPayment}
                    className="py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
                  >
                    <CreditCard className="w-5 h-5 mr-2" /> 
                    Confirm Payment of ${paymentAmount.toFixed(2)}
                  </button>
                  
                  <button 
                    onClick={() => setShowPaymentModal(false)}
                    className="py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Service Details Modal */}
      {showServiceDetails && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{selectedService.name}</h3>
              <button 
                onClick={() => setShowServiceDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-gray-600 mb-4">{selectedService.description}</p>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="font-bold mb-2">Requirements</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Government-issued photo ID</li>
                    <li>Proof of residency (utility bill, lease agreement)</li>
                    <li>Completed application form</li>
                    {selectedService.fee > 0 && <li>Payment method (credit/debit card)</li>}
                  </ul>
                </div>
                
                {selectedService.form && (
                  <div className="border rounded-xl p-4">
                    <h4 className="font-bold mb-2 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      Required Form: {selectedService.form}
                    </h4>
                    <div className="flex gap-2 mt-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition">
                        <Download className="w-4 h-4 mr-1" /> Download PDF
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        Fill Online
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-xl p-4">
                  <h4 className="font-bold mb-3">Service Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Fee:</span>
                      <span className="font-bold">
                        {selectedService.fee > 0 ? `$${selectedService.fee.toFixed(2)}` : 'Free'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Time:</span>
                      <span className="font-bold">{selectedService.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-bold">5-7 business days</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-xl p-4">
                  <h4 className="font-bold mb-3">Service Locations</h4>
                  <div className="flex items-start mb-2">
                    <MapPin className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Downtown Service Center</p>
                      <p className="text-sm text-gray-500">123 Government St, Suite 100</p>
                      <p className="text-sm text-gray-500">Mon-Fri: 8:30 AM - 4:30 PM</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm mt-2">
                    View all locations
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                    if (selectedService.fee > 0) {
                      handleMakePayment(selectedService.name, selectedService.fee);
                    }
                    setShowServiceDetails(false);
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
                >
                  {selectedService.fee > 0 ? (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" /> 
                      Pay ${selectedService.fee.toFixed(2)} & Start Service
                    </>
                  ) : (
                    "Start Service Now"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;