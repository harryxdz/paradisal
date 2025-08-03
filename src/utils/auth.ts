// Authentication utilities and user management
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;           // ← still plain-text for demo, but we'll add warnings
  role: 'admin' | 'national' | 'guest';
  nationalId?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthSession {
  user: Omit<User, 'password'>;
  token: string;
  expiresAt: number;
}

// Security warning - only for demo purposes
const SECURITY_WARNING = process.env.NODE_ENV === 'production' 
  ? 'SECURITY WARNING: Plain-text passwords in production!'
  : 'Demo-only: Passwords stored in plain text';

console.warn(SECURITY_WARNING);

// Pre-defined users (in production, this would be in a database)
const USERS: User[] = [
  {
    id: 'admin-001',
    username: 'admin',
    email: 'admin@gov.paradisal',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date('2025-01-01').toISOString()
  },
  {
    id: 'national-001',
    username: 'maria.rodriguez',
    email: 'maria.rodriguez@email.com',
    password: 'mariaPass',
    role: 'national',
    nationalId: 'PD-2025-789456',
    createdAt: new Date('2018-03-15').toISOString()
  },
  {
    id: 'national-002',
    username: 'john.smith',
    email: 'john.smith@email.com',
    password: 'johnsPassword',
    role: 'national',
    nationalId: 'PD-2025-123789',
    createdAt: new Date('2020-07-22').toISOString()
  }
];

// More secure token generation
function generateToken(): string {
  // Combine UUID with timestamp for better uniqueness
  return `${uuidv4()}-${Date.now().toString(36)}`;
}

// Case-insensitive username/email matching
export async function validateCredentials(credentials: LoginCredentials): Promise<User | null> {
  const { username, password } = credentials;
  if (!username || !password) return null;

  const normalizedUsername = username.trim().toLowerCase();
  
  const user = USERS.find(u => 
    (u.username.toLowerCase() === normalizedUsername || 
     u.email.toLowerCase() === normalizedUsername) &&
    u.password === password
  );

  return user || null;
}

// Session management
const SESSION_KEY = 'paradisal_session';

export function createSession(user: User): AuthSession {
  const token = generateToken();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24h
  
  // Omit password and add last login timestamp
  const { password, ...userData } = user;
  const sessionUser = {
    ...userData,
    lastLogin: new Date().toISOString()
  };

  const session: AuthSession = {
    user: sessionUser,
    token,
    expiresAt
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getCurrentSession(): AuthSession | null {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;
    
    const session = JSON.parse(data) as AuthSession;
    
    // Validate session structure
    if (!session.token || !session.expiresAt || !session.user) {
      throw new Error('Invalid session structure');
    }
    
    // Check expiration
    if (Date.now() > session.expiresAt) {
      logout();
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Session parse error:', error);
    logout();
    return null;
  }
}

// Auth status checks
export function isAuthenticated(): boolean {
  return getCurrentSession() !== null;
}

export function isAdmin(): boolean {
  return getCurrentSession()?.user.role === 'admin';
}

export function getCurrentUser(): AuthSession['user'] | null {
  return getCurrentSession()?.user || null;
}

// Auth operations
export async function login(credentials: LoginCredentials): Promise<{
  success: boolean;
  session?: AuthSession;
  error?: string;
}> {
  try {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));
    
    const validation = validateLoginInput(credentials);
    if (!validation.isValid) {
      return {
        success: false,
        error: Object.values(validation.errors).join(', ')
      };
    }

    const user = await validateCredentials(credentials);
    if (!user) {
      return { success: false, error: 'Invalid username or password' };
    }

    const session = createSession(user);
    return { success: true, session };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed. Please try again.' };
  }
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

// Input validation
export function validateLoginInput(credentials: LoginCredentials): {
  isValid: boolean;
  errors: { [key: string]: string };
} {
  const errors: Record<string, string> = {};
  
  if (!credentials.username?.trim()) {
    errors.username = 'Username is required';
  }
  
  if (!credentials.password) {
    errors.password = 'Password is required';
  } else if (credentials.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else if (credentials.password.length > 50) {
    errors.password = 'Password is too long';
  }
  
  return { isValid: Object.keys(errors).length === 0, errors };
}

// Utility to find user by ID (for future use)
export function getUserById(id: string): User | undefined {
  return USERS.find(user => user.id === id);
}