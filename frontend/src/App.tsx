import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { darkTheme, lightTheme, Theme } from './themes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LeftSidebar from './components/layout/LeftSidebar';
import RightSidebar from './components/layout/RightSidebar';
import FaceCard from './components/celebrity/FaceCard';

const MainContent = styled.div<{ theme: Theme }>`
  margin-left: 200px;
  margin-right: 200px;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  min-height: calc(100vh - 60px);
`;

interface Celebrity {
  name: string;
  data: {
    sources: {
      wiki?: { bio: string; photo_url: string; url: string };
      tmz?: { news: { title: string; url: string }[]; url: string };
      social?: { twitter: { url: string }; instagram: { url: string } };
      misc?: { nft: { url: string }; dating: { url: string } };
    };
  };
}

const App: React.FC = () => {
  const [celebs, setCelebs] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? lightTheme : darkTheme;
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/celebrities')
      .then(res => res.json())
      .then(data => {
        setCelebs(data);
        setLoading(false);
      });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === darkTheme ? lightTheme : darkTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme === lightTheme ? 'light' : 'dark');
  };

  if (loading) return <MainContent theme={theme}>Loading...</MainContent>;

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <LeftSidebar theme={theme} />
      <MainContent theme={theme}>
        {celebs.map(celeb => (
          <FaceCard
            key={celeb.name}
            theme={theme}
            name={celeb.name}
            photo_url={celeb.data.sources.wiki?.photo_url || 'https://via.placeholder.com/100'}
          />
        ))}
      </MainContent>
      <RightSidebar theme={theme} />
      <Footer theme={theme} />
    </>
  );
};

export default App;