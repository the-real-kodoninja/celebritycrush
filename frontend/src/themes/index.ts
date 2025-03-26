export interface Theme {
  background: string;
  cardBg: string;
  text: string;
  accent: string;
  border: string;
}

export const darkTheme: Theme = {
  background: '#121212',
  cardBg: '#1e1e1e',
  text: '#fff',
  accent: '#bb86fc',
  border: '#03dac6',
};

export const lightTheme: Theme = {
  background: '#f5f5f5',
  cardBg: '#fff',
  text: '#333',
  accent: '#6200ea',
  border: '#03dac6',
};
