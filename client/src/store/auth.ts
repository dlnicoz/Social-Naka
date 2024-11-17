import { create } from 'zustand';
import { AuthStore, User } from '../types';
import { generateUUID } from '../lib/utils';

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    set({ user, isAuthenticated: true });
    localStorage.setItem('currentUser', JSON.stringify(user));
  },

  register: async (userData: Partial<User>) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((u: User) => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: generateUUID(),
      email: userData.email!,
      password: userData.password!,
      name: userData.name || '',
      profession: userData.profession || '',
      phone: userData.phone || '',
      location: userData.location || '',
      description: userData.description || '',
      profileUrl: userData.profileUrl || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
      theme: 'minimal',
      socialLinks: [],
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    set({ user: newUser, isAuthenticated: true });
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('currentUser');
  },

  updateUser: async (userData: Partial<User>) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const updatedUser = { ...currentUser, ...userData };
    const updatedUsers = users.map((u: User) => 
      u.id === updatedUser.id ? updatedUser : u
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
}));

export default useAuthStore;