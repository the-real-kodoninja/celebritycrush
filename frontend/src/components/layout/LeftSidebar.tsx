import styled from '@emotion/styled';
import { Theme } from '../../themes';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SidebarWrapper = styled.div<{ theme: Theme; isOpen: boolean }>`
  width: 250px;
  height: 100vh;
  background: ${({ theme }) => theme.cardBg};
  border-right: 1px solid ${({ theme }) => theme.border};
  position: fixed;
  top: 0;
  left: 0;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 999;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 768px) {
    transform: translateX(0);
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 1rem;
`;

const NavLink = styled(Link)<{ theme: Theme }>`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.primary + '20'};
    color: ${({ theme }) => theme.accent};
  }
`;

const ThemeToggleButton = styled.button<{ theme: Theme }>`
  background: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.accent + 'cc'};
  }
`;

interface LeftSidebarProps {
  theme: Theme;
  isOpen: boolean;
  toggleTheme: () => void; // Add toggleTheme prop
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ theme, isOpen, toggleTheme }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/users/current', {
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(data => setIsAdmin(data.admin));
  }, []);

  return (
    <SidebarWrapper theme={theme} isOpen={isOpen}>
      <NavList>
        <NavItem>
          <NavLink to="/feed" theme={theme}>🏠 Feed</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/explore" theme={theme}>🌟 Explore</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/fandom" theme={theme}>💖 Fandom</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/marketplace" theme={theme}>🛒 Marketplace</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/lists" theme={theme}>📋 Lists</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/groups" theme={theme}>👥 Groups</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/messages" theme={theme}>💬 Messages</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/messaging" theme={theme}>💬 New Messaging</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/notifications" theme={theme}>🔔 Notifications</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profile" theme={theme}>👤 Profile</NavLink>
        </NavItem>
        {isAdmin && (
          <NavItem>
            <NavLink to="/admin/moderation" theme={theme}>🛠️ Moderation</NavLink>
          </NavItem>
        )}
      </NavList>
      <ThemeToggleButton theme={theme} onClick={toggleTheme}>
        {theme === lightTheme ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </ThemeToggleButton>
    </SidebarWrapper>
  );
};

export default LeftSidebar;