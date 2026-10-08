import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRoleType, BusinessDivisionType } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  switchDemoRole: (role: UserRoleType) => void;
  canAccessDivision: (division: BusinessDivisionType) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Preset demo users matching our Django seed database
const DEMO_USERS: Record<UserRoleType, User> = {
  super_admin: {
    id: 1,
    username: 'superadmin',
    email: 'director@quadrabiz.com',
    first_name: 'Kalyan',
    last_name: 'Enterprises',
    role: 'super_admin',
    business_division: 'general',
    phone: '+91 98480 12345',
    city: 'Hyderabad',
  },
  insurance_admin: {
    id: 2,
    username: 'tata_agent',
    email: 'insurance@quadrabiz.com',
    first_name: 'Ramesh',
    last_name: 'Verma',
    role: 'insurance_admin',
    business_division: 'insurance',
    phone: '+91 98480 23456',
    city: 'Hyderabad',
  },
  nutrition_admin: {
    id: 3,
    username: 'herbal_rep',
    email: 'wellness@quadrabiz.com',
    first_name: 'Sunita',
    last_name: 'Rao',
    role: 'nutrition_admin',
    business_division: 'nutrition',
    phone: '+91 98480 34567',
    city: 'Visakhapatnam',
  },
  kangen_admin: {
    id: 4,
    username: 'kangen_rep',
    email: 'water@quadrabiz.com',
    first_name: 'Vikram',
    last_name: 'Reddy',
    role: 'kangen_admin',
    business_division: 'kangen',
    phone: '+91 98480 45678',
    city: 'Vijayawada',
  },
  solar_admin: {
    id: 5,
    username: 'solar_expert',
    email: 'solar@quadrabiz.com',
    first_name: 'Anil',
    last_name: 'Sharma',
    role: 'solar_admin',
    business_division: 'solar',
    phone: '+91 98480 56789',
    city: 'Hyderabad',
  },
  insurance_agent: {
    id: 6,
    username: 'agent_priya',
    email: 'priya.agent@quadrabiz.com',
    first_name: 'Priya',
    last_name: 'Sharma',
    role: 'insurance_agent',
    business_division: 'insurance',
    phone: '+91 98480 67890',
    city: 'Hyderabad',
  },
  nutrition_rep: {
    id: 7,
    username: 'coach_rahul',
    email: 'rahul.coach@quadrabiz.com',
    first_name: 'Rahul',
    last_name: 'Verma',
    role: 'nutrition_rep',
    business_division: 'nutrition',
    phone: '+91 98480 78901',
    city: 'Visakhapatnam',
  },
  kangen_rep: {
    id: 8,
    username: 'rep_manish',
    email: 'manish.kangen@quadrabiz.com',
    first_name: 'Manish',
    last_name: 'Reddy',
    role: 'kangen_rep',
    business_division: 'kangen',
    phone: '+91 98480 89012',
    city: 'Vijayawada',
  },
  solar_sales: {
    id: 9,
    username: 'solar_sales_ajay',
    email: 'ajay.solar@quadrabiz.com',
    first_name: 'Ajay',
    last_name: 'Kumar',
    role: 'solar_sales',
    business_division: 'solar',
    phone: '+91 98480 90123',
    city: 'Hyderabad',
  },
  solar_installer: {
    id: 10,
    username: 'solar_tech_suresh',
    email: 'suresh.epc@quadrabiz.com',
    first_name: 'Suresh',
    last_name: 'Naidu',
    role: 'solar_installer',
    business_division: 'solar',
    phone: '+91 98480 01234',
    city: 'Hyderabad',
  },
  customer: {
    id: 11,
    username: 'john_doe',
    email: 'customer@example.com',
    first_name: 'John',
    last_name: 'Patel',
    role: 'customer',
    business_division: 'general',
    phone: '+91 98480 99999',
    city: 'Secunderabad',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.login(username, password);
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
      setUser(response.user);
    } catch (err) {
      // Check if matches demo credentials for offline resilience
      const match = Object.values(DEMO_USERS).find(u => u.username === username);
      if (match) {
        localStorage.setItem('access_token', 'mock_jwt_token_' + match.role);
        localStorage.setItem('auth_user', JSON.stringify(match));
        setUser(match);
        return;
      }
      throw err;
    }
  };

  const switchDemoRole = (role: UserRoleType) => {
    const targetUser = DEMO_USERS[role];
    localStorage.setItem('access_token', 'mock_jwt_' + role);
    localStorage.setItem('auth_user', JSON.stringify(targetUser));
    setUser(targetUser);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  const canAccessDivision = (division: BusinessDivisionType): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    const mapping: Record<string, BusinessDivisionType> = {
      insurance_admin: 'insurance',
      nutrition_admin: 'nutrition',
      kangen_admin: 'kangen',
      solar_admin: 'solar',
    };
    return mapping[user.role] === division;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchDemoRole,
        canAccessDivision,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
