import styled from '@emotion/styled';
import { Theme } from '../../themes';

const Sidebar = styled.div<{ theme: Theme }>`
  width: 200px;
  background: ${({ theme }) => theme.cardBg};
  padding: 20px;
  height: 100vh;
  position: fixed;
  border-right: 1px solid ${({ theme }) => theme.border};
`;

const NavItem = styled.a<{ theme: Theme }>`
  display: block;
  color: ${({ theme }) => theme.text};
  margin: 10px 0;
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
    <NavItem theme={theme} href="#">Explore</NavItem>
    <NavItem theme={theme} href="#">Profile</NavItem>
    <NavItem theme={theme} href="#">Messages</NavItem>
    <NavItem theme={theme} href="#">Marketplace</NavItem>
  </Sidebar>
);

export default LeftSidebar;
