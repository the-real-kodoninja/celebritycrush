import styled from '@emotion/styled';
import { Theme } from '../../themes';
import Button from '../common/Button';

const HeaderWrapper = styled.header<{ theme: Theme }>`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: ${({ theme }) => theme.cardBg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1<{ theme: Theme }>`
  font-size: 24px;
  margin: 0;
  color: ${({ theme }) => theme.accent};
`;

const Search = styled.input<{ theme: Theme }>`
  margin-left: 20px;
  padding: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.accent};
  flex-grow: 1;
`;

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => (
  <HeaderWrapper theme={theme}>
    <Logo theme={theme}>CelebrityCrush</Logo>
    <Search theme={theme} placeholder="Search celebrities..." />
    <Button theme={theme} onClick={toggleTheme}>
      {theme === darkTheme ? 'Light' : 'Dark'}
    </Button>
  </HeaderWrapper>
);

export default Header;
