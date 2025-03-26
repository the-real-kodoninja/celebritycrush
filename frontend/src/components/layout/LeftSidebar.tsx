import styled from '@emotion/styled';
import { Theme } from '../../themes';

const Sidebar = styled.div<{ theme: Theme; isOpen: boolean }>`
  width: 250px;
  background: ${({ theme }) => theme.cardBg};
  padding: 1rem;
  height: 100vh;
  position: fixed;
  border-right: 1px solid ${({ theme }) => theme.border};
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 999;
`;

const NavItem = styled.a<{ theme: Theme }>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  margin: 0.5rem 0;
  padding: 0.75rem 1rem;
  text-decoration: none;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.accent};
  }
`;

const Icon = styled.span`
  margin-right: 0.75rem;
  font-size: 1.2rem;
`;

interface LeftSidebarProps {
  theme: Theme;
  isOpen: boolean;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ theme, isOpen }) => (
  <Sidebar theme={theme} isOpen={isOpen}>
    <NavItem theme={theme} href="/feed"><Icon>📖</Icon>Feed</NavItem>
    <NavItem theme={theme} href="/explore"><Icon>🔍</Icon>Explore</NavItem>
    <NavItem theme={theme} href="/lists"><Icon>📋</Icon>Lists</NavItem>
    <NavItem theme={theme} href="/groups"><Icon>👥</Icon>Groups</NavItem>
    <NavItem theme={theme} href="/fandom"><Icon>🌟</Icon>Fandom</NavItem>
    <NavItem theme={theme} href="/profile"><Icon>👤</Icon>Profile</NavItem>
    <NavItem theme={theme} href="/messages"><Icon>💬</Icon>Messages</NavItem>
    <NavItem theme={theme} href="/marketplace"><Icon>🛒</Icon>Marketplace</NavItem>
  </Sidebar>
);

export default LeftSidebar;