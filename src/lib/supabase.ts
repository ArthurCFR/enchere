import { createClient } from '@supabase/supabase-js';

// Fallback to hardcoded values if env vars are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://chsdotsfjbiublstyaui.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoc2RvdHNmamJpdWJsc3R5YXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1Mjk4NjYsImV4cCI6MjA4MDEwNTg2Nn0.GtaXZ2weDvKMlFSDTVDo-VunspGmSDjkcUwny8y4rSc';

console.log('🔧 Supabase Config:');
console.log('URL:', supabaseUrl);
console.log('Key present:', supabaseAnonKey ? '✅' : '❌');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour la base de données
export interface Usage {
  id?: string;
  description: string;
  category: 'quick-win' | 'structurant' | 'moonshot';
  group_number: 1 | 2 | 3;
  price: number;
  created_at?: string;
}

export interface Stack {
  id?: string;
  group_number: 1 | 2 | 3;
  usage_ids: string[];
  total_spent: number;
  validated: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GroupPoints {
  group_number: 1 | 2 | 3;
  total_points: number;
  created_at?: string;
  updated_at?: string;
}

// Helper pour calculer le prix selon la catégorie
export const getCategoryPrice = (category: Usage['category']): number => {
  switch (category) {
    case 'quick-win':
      return 10;
    case 'structurant':
      return 20;
    case 'moonshot':
      return 50;
  }
};

// Helper pour obtenir la couleur de la catégorie (neo-brutaliste)
export const getCategoryColor = (category: Usage['category']): string => {
  switch (category) {
    case 'quick-win':
      return 'bg-neo-green border-4 border-neo-black';
    case 'structurant':
      return 'bg-neo-blue border-4 border-neo-black';
    case 'moonshot':
      return 'bg-neo-pink border-4 border-neo-black';
  }
};

// Helper pour obtenir le nom du groupe
export const getGroupName = (groupNumber: 1 | 2 | 3): string => {
  switch (groupNumber) {
    case 1:
      return 'Consultants Junior';
    case 2:
      return 'Consultants Senior';
    case 3:
      return 'Managers';
  }
};

// Helper pour obtenir la consigne du groupe
export const getGroupInstruction = (groupNumber: 1 | 2 | 3): string => {
  switch (groupNumber) {
    case 1:
      return 'Construisez votre stack IA idéale pour le consultant junior';
    case 2:
      return 'Construisez votre stack IA idéale pour le consultant senior';
    case 3:
      return 'Construisez votre stack IA idéale pour le manager';
  }
};
