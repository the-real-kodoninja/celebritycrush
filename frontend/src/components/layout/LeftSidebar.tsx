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
  padding: 0.5rem;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 8px;
  &:hover {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.accent};
  }
`;

interface LeftSidebarProps {
  theme: Theme;
  isOpen: boolean;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ theme, isOpen }) => (
  <Sidebar theme={theme} isOpen={isOpen}>
    <NavItem theme={theme} href="/feed">Feed</NavItem>
    <NavItem theme={theme} href="/explore">Explore</NavItem>
    <NavItem theme={theme} href="/lists">Lists</NavItem>
    <NavItem theme={theme} href="/groups">Groups</NavItem>
    <NavItem theme={theme} href="/fandom">Fandom</NavItem>
    <NavItem theme={theme} href="/profile">Profile</NavItem>
    <NavItem theme={theme} href="/messages">Messages</NavItem>
    <NavItem theme={theme} href="/marketplace">Marketplace</NavItem>
  </Sidebar>
);

export default LeftSidebar;