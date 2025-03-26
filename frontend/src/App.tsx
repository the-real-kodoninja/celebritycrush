import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { darkTheme, lightTheme, Theme } from './themes';
import Signup from './components/auth/Signup';
import TermsAndConditions from './components/legal/TermsAndConditions';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LeftSidebar from './components/layout/LeftSidebar';
import FaceCard from './components/celebrity/FaceCard';
import CelebrityPage from './components/celebrity/CelebrityPage';
import UserPage from './components/user/UserPage';
import Messages from './components/user/Messages';
import Lists from './components/lists/Lists';
import Groups from './components/groups/Groups';
import Fandom from './components/fandom/Fandom';
import SearchPage from './components/search/SearchPage';
import UserFeed from './components/user_feed/UserFeed';
import Notifications from './components/notifications/Notifications';

const GlobalStyles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Inter', sans-serif;
  }
`;

const MainContent = styled.div<{ theme: Theme; sidebarOpen: boolean }>`
  margin-left: 0;
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  min-height: calc(100vh - 60px);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

interface Celebrity {
  id: number;
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [followedCelebs, setFollowedCelebs] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/api/celebrities?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setCelebs(prev => [...prev, ...data]);
        setLoading(false);
      });
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleTheme = () => {
    const newTheme = theme === darkTheme ? lightTheme : darkTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme === lightTheme ? 'light' : 'dark');
  };

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleFollow = (name: string) => {
    setFollowedCelebs(prev => 
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  const handleCrush = (name: string) => {
    // Placeholder for crush action
  };

  const mockPosts = followedCelebs.map(celeb => ({
    user: { username: 'kodoninja' },
    content: `Obsessed with ${celeb}!`,
    celebrity: celeb,
  }));

  const mockLists = [
    { name: 'Favorites', celebrities: ['Billie Eilish', 'Zendaya'] },
    { name: 'Rising Stars', celebrities: ['Lynette Adkins'] },
  ];

  const mockGroups = [
    { name: 'Billie Eilish Fans', description: 'For all Billie lovers!' },
    { name: 'Zendaya Stans', description: 'Zendaya appreciation group.' },
  ];

  const celebrities = celebs.map(celeb => ({
    id: celeb.id,
    name: celeb.name,
    photo_url: celeb.data.sources.wiki?.photo_url || 'https://via.placeholder.com/100',
    bio: celeb.data.sources.wiki?.bio || 'No bio available.',
    posts: mockPosts.filter(post => post.celebrity === celeb.name).map(post => ({
      id: Date.now(),
      user: post.user,
      content: post.content,
      likes: [],
      comments: [],
      shares: []
    }))
  }));

  const SearchWrapper: React.FC = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('q') || '';
    return <SearchPage theme={theme} celebrities={celebrities} onFollow={handleFollow} onCrush={handleCrush} searchQuery={searchQuery} />;
  };

  return (
    <Router>
      <GlobalStyles>
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
          onLoginClick={handleLoginClick}
          onToggleSidebar={toggleSidebar}
          celebrities={celebrities}
        />
        <LeftSidebar theme={theme} isOpen={sidebarOpen} />
        <MainContent theme={theme} sidebarOpen={sidebarOpen}>
          {loading && page === 1 ? (
            <p>Loading...</p>
          ) : (
            <Routes>
              <Route
                path="/feed"
                element={<UserFeed theme={theme} userId={1} />}
              />
              <Route
                path="/explore"
                element={
                  <>
                    {celebs.map(celeb => (
                      <FaceCard
                        key={celeb.name}
                        theme={theme}
                        name={celeb.name}
                        photo_url={celeb.data.sources.wiki?.photo_url || 'https://via.placeholder.com/100'}
                        onFollow={handleFollow}
                        onCrush={handleCrush}
                      />
                    ))}
                    <button onClick={loadMore}>Load More</button>
                  </>
                }
              />
	      <Route path="/signup" element={<Signup theme={theme} />} />
              <Route path="/terms" element={<TermsAndConditions theme={theme} />} />
	      <Route path="/notifications" element={<Notifications theme={theme} />} />
              <Route path="/lists" element={<Lists theme={theme} lists={mockLists} />} />
              <Route path="/groups" element={<Groups theme={theme} groups={mockGroups} />} />
              <Route path="/fandom" element={<Fandom theme={theme} posts={mockPosts} />} />
              <Route path="/profile" element={<UserPage theme={theme} username="kodoninja" bio="Crushing it!" />} />
              <Route path="/messages" element={<Messages theme={theme} />} />
              <Route path="/search" element={<SearchWrapper />} />
              <Route
                path="/celebrity/:name"
                element={
                  <CelebrityPage
                    theme={theme}
                    celebrity={celebrities.find(c => c.name === window.location.pathname.split('/').pop()) || celebrities[0]}
                  />
                }
              />
              <Route path="/" element={<Navigate to="/feed" />} />
            </Routes>
          )}
        </MainContent>
        <Footer theme={theme} />
      </GlobalStyles>
    </Router>
  );
};

export default App;
