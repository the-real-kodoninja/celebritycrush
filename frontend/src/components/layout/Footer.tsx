import styled from '@emotion/styled';
import { Theme } from '../../themes';

const FooterWrapper = styled.footer<{ theme: Theme }>`
  padding: 20px;
  background: ${({ theme }) => theme.cardBg};
  text-align: center;
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.border};
`;

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => (
  <FooterWrapper theme={theme}>
    <p>© 2025 CelebrityCrush. All rights reserved.</p>
  </FooterWrapper>
);

export default Footer;
