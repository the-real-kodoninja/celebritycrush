export interface Theme {
  background: string;
  cardBg: string;
  text: string;
  accent: string;
  border: string;
  secondaryText: string;
  gradient: string;
  primary: string; // Add primary color
}

export const darkTheme: Theme = {
  background: '#000000',
  cardBg: '#1a1a1a',
  text: '#ffffff',
  accent: '#1a73e8',
  border: '#333333',
  secondaryText: '#b0b0b0',
  gradient: 'linear-gradient(45deg, #1a73e8, #00ddeb)',
  primary: '#1a73e8', // Add primary color
};

export const lightTheme: Theme = {
  background: '#f0f2f5',
  cardBg: '#ffffff',
  text: '#000000',
  accent: '#1a73e8',
  border: '#e0e0e0',
  secondaryText: '#606770',
  gradient: 'linear-gradient(45deg, #1a73e8, #00ddeb)',
  primary: '#1a73e8', // Add primary color
};