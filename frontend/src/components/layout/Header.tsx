import styled from '@emotion/styled';
import { Theme, darkTheme } from '../../themes';
import Button from '../common/Button';
import { useState } from 'react';

const HeaderWrapper = styled.header<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.h1<{ theme: Theme }>`
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.accent};
  font-weight: 700;
`;

const Search = styled.input<{ theme: Theme }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  width: 300px;
  font-size: 0.9rem;
  @media (max-width: 768px) {
    width: 100%;
    margin: 0.5rem 0;
  }
`;

const Menu = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserIcon = styled.div<{ theme: Theme }>`
  width: 2rem;
  height: 2rem;
  background: ${({ theme }) => theme.accent};
  border-radius: 50%;
  cursor: pointer;
`;

const Hamburger = styled.div<{ theme: Theme }>`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, isLoggedIn, onLoginClick, onToggleSidebar }) => (
  <HeaderWrapper theme={theme}>
    <Hamburger theme={theme} onClick={onToggleSidebar}>☰</Hamburger>
    <Logo theme={theme}>CelebrityCrush</Logo>
    <Search theme={theme} placeholder="Search celebrities..." />
    <Menu theme={theme}>
      <Button theme={theme} onClick={toggleTheme}>
        {theme === darkTheme ? 'Light' : 'Dark'}
      </Button>
      <UserIcon theme={theme} onClick={onLoginClick} />
    </Menu>
  </HeaderWrapper>
);

export default Header;