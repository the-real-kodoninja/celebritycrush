import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { darkTheme, lightTheme, Theme } from './themes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LeftSidebar from './components/layout/LeftSidebar';
import RightSidebar from './components/layout/RightSidebar';
import FaceCard from './components/celebrity/FaceCard';
import UserPage from './components/user/UserPage';
import Messages from './components/user/Messages';

const MainContent = styled.div<{ theme: Theme }>`
  margin-left: 200px;
  margin-right: 200px;
  padding: 2vw;
  background: ${({ theme }) => theme.background};
  min-height: calc(100vh - 60px);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    padding: 1rem;
  }
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      window.location.href = '/login'; // Placeholder for login page
    }
  };

  return (
    <Router>
      <Header theme={theme} toggleTheme={toggleTheme} isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} />
      <LeftSidebar theme={theme} />
      <MainContent theme={theme}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route
              path="/explore"
              element={celebs.map(celeb => (
                <FaceCard
                  key={celeb.name}
                  theme={theme}
                  name={celeb.name}
                  photo_url={celeb.data.sources.wiki?.photo_url || 'https://via.placeholder.com/100'}
                />
              ))}
            />
            <Route path="/profile" element={<UserPage theme={theme} username="kodoninja" bio="Crushing it!" />} />
            <Route path="/messages" element={<Messages theme={theme} />} />
            <Route path="/" element={<div>Redirect to /explore</div>} />
          </Routes>
        )}
      </MainContent>
      <RightSidebar theme={theme} />
      <Footer theme={theme} />
    </Router>
  );
};

export default App;