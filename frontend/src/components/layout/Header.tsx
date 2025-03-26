import styled from '@emotion/styled';
import { Theme, darkTheme } from '../../themes';
import Button from '../common/Button';

const HeaderWrapper = styled.header<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2vw;
  background: ${({ theme }) => theme.cardBg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.h1<{ theme: Theme }>`
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin: 0;
  color: ${({ theme }) => theme.accent};
`;

const Search = styled.input<{ theme: Theme }>`
  padding: 0.5rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.accent};
  width: 50%;
  max-width: 400px;
  margin: 0 1rem;
  @media (max-width: 768px) {
    width: 100%;
    margin: 0.5rem 0;
  }
`;

const Menu = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserIcon = styled.div<{ theme: Theme }>`
  width: 2rem;
  height: 2rem;
  background: ${({ theme }) => theme.accent};
  border-radius: 50%;
  cursor: pointer;
`;

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, isLoggedIn, onLoginClick }) => (
  <HeaderWrapper theme={theme}>
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
