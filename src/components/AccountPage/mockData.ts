import { AccountType, ServiceCategory, Macro } from './types';

export const mockAccounts = {
  [AccountType.User]: {
    role: 'citizen',
    nationalId: 'CIT-123456',
    createdAt: '2021-06-10',
    email: 'maria.rodriguez@gov.paradisal',
    name: 'Maria Elena Rodriguez',
    phone: '+1 (555) 123-4567'
  },
  [AccountType.Admin]: {
    role: 'admin',
    nationalId: 'ADMIN-001',
    createdAt: '2018-03-15',
    email: 'admin@gov.paradisal',
    name: 'Administrator',
    phone: '+1 (555) 000-0000'
  }
};

export const PREDEFINED_MACROS: Macro[] = [
  { label: 'Thanks for contacting us', text: 'Thank you for contacting our support team. We have received your request and will get back to you shortly.' },
  { label: 'Request more info', text: 'Could you please provide more details or attach any relevant documents/screenshots to help us assist you?' },
  { label: 'Issue resolved', text: 'We believe your issue has been resolved. Please let us know if you need further assistance.' }
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'personal',
    name: 'Personal Services',
    services: [
      { id: 'dl-renew', name: 'Driver License Renewal', description: 'Renew your driver license online', fee: 35, duration: '10-15 min', form: 'Form DL-44' },
      { id: 'id-card', name: 'ID Card Application', description: 'Apply for a state identification card', fee: 30, duration: '10 min', form: 'Form ID-1' },
      { id: 'voter-reg', name: 'Voter Registration', description: 'Register to vote or update registration', fee: 0, duration: '5 min', form: 'Form VR-1' }
    ]
  },
  {
    id: 'property',
    name: 'Property Services',
    services: [
      { id: 'prop-tax', name: 'Property Tax Payment', description: 'Pay your property taxes online', fee: 0, duration: '5 min', form: null },
      { id: 'permits', name: 'Building Permits', description: 'Apply for construction permits', fee: 85, duration: '20-30 min', form: 'Form BP-201' },
      { id: 'zoning', name: 'Zoning Information', description: 'Request zoning information', fee: 25, duration: '15 min', form: 'Form ZI-10' }
    ]
  },
  {
    id: 'business',
    name: 'Business Services',
    services: [
      { id: 'bus-license', name: 'Business License', description: 'Apply for or renew a business license', fee: 125, duration: '20 min', form: 'Form BL-100' },
      { id: 'tax-filing', name: 'Business Tax Filing', description: 'File business taxes online', fee: 0, duration: '30 min', form: null },
      { id: 'contractor', name: 'Contractor License', description: 'Apply for contractor license', fee: 250, duration: '45 min', form: 'Form CL-55' }
    ]
  }
];