import styled from '@emotion/styled';
import { Theme } from '../../themes';

const Sidebar = styled.div<{ theme: Theme }>`
  width: 200px;
  background: ${({ theme }) => theme.cardBg};
  padding: 2vw;
  height: 100vh;
  position: fixed;
  right: 0;
  border-left: 1px solid ${({ theme }) => theme.border};
  @media (max-width: 768px) {
    display: none;
  }
`;

const Trend = styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.text};
  margin: 1rem 0;
`;

interface RightSidebarProps {
  theme: Theme;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ theme }) => (
  <Sidebar theme={theme}>
    <h3>Trending</h3>
    <Trend theme={theme}>#BillieEilish</Trend>
    <Trend theme={theme}>#Zendaya</Trend>
    <Trend theme={theme}>#LynetteAdkins</Trend>
  </Sidebar>
);

export default RightSidebar;