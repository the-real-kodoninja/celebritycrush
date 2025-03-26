import styled from '@emotion/styled';
import { Theme } from '../../themes';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  border-top: 1px solid ${({ theme }) => theme.border};
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-family: 'Inter', sans-serif;
`;

const FooterLink = styled(Link)<{ theme: Theme }>`
  color: ${({ theme }) => theme.accent};
  text-decoration: none;
  margin: 0 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <FooterWrapper theme={theme}>
      <p>&copy; 2025 CelebrityCrush. All rights reserved.</p>
      <FooterLink to="/terms" theme={theme}>Terms and Conditions</FooterLink>
    </FooterWrapper>
  );
};

export default Footer;