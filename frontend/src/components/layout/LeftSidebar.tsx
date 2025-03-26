import styled from '@emotion/styled';
import { Theme } from '../../themes';

const Sidebar = styled.div<{ theme: Theme }>`
  width: 200px;
  background: ${({ theme }) => theme.cardBg};
  padding: 2vw;
  height: 100vh;
  position: fixed;
  border-right: 1px solid ${({ theme }) => theme.border};
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: static;
    padding: 1rem;
  }
`;

const NavItem = styled.a<{ theme: Theme }>`
  display: block;
  color: ${({ theme }) => theme.text};
  margin: 1rem 0;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

interface LeftSidebarProps {
  theme: Theme;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ theme }) => (
  <Sidebar theme={theme}>
    <NavItem theme={theme} href="/explore">Explore</NavItem>
    <NavItem theme={theme} href="/profile">Profile</NavItem>
    <NavItem theme={theme} href="/messages">Messages</NavItem>
    <NavItem theme={theme} href="/marketplace">Marketplace</NavItem>
  </Sidebar>
);

export default LeftSidebar;