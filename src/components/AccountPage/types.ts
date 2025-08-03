export enum AccountType {
  User = 'user',
  Admin = 'admin'
}

export type MockUser = {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'suspended';
  lastLogin: string;
};

export type TicketStatus = 'open' | 'pending' | 'closed';

export type TicketMessage = {
  id: string;
  sender: 'citizen' | 'admin';
  message: string;
  timestamp: string;
  attachments?: { name: string }[];
  read: boolean;
  internal?: boolean;
};

export type Ticket = {
  id: string;
  title: string;
  requesterName: string;
  requesterEmail: string;
  createdAt: string;
  claimedAt?: string;
  closedAt?: string;
  claimedBy?: string;
  status: TicketStatus;
  messages: TicketMessage[];
};

export type LogEvent = {
  id: string;
  type: 'ticket' | 'user';
  action: string;
  detail: string;
  timestamp: string;
};

export type Appointment = {
  id: string;
  service: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  location: string;
};

export type Payment = {
  id: string;
  service: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  invoice: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  fee: number;
  duration: string;
  form: string | null;
};

export type ServiceCategory = {
  id: string;
  name: string;
  services: Service[];
};

export type Macro = {
  label: string;
  text: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'warning' | 'info' | 'success';
  unread: boolean;
};

export type SecurityEvent = {
  id: string;
  type: string;
  location: string;
  device: string;
  time: string;
  status: string;
};

export type IntegrationStatus = {
  payment: string;
  document: string;
  notification: string;
};

export type Collaborator = {
  id: string;
  name: string;
  initials: string;
};

export type WidgetPreferences = {
  quickActions: boolean;
  documents: boolean;
  notifications: boolean;
};

export type AdminStats = {
  totalUsers: number;
  pendingApprovals: number;
  flaggedContent: number;
  systemHealth: number;
};

export type CitizenInfo = {
  name: string;
  id: string;
  status: string;
  registrationDate: string;
  address: string;
  phone: string;
  email: string;
  votingDistrict: string;
};