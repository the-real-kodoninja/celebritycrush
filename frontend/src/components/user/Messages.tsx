import styled from '@emotion/styled';
import { Theme } from '../../themes';

const MessagesWrapper = styled.div<{ theme: Theme }>`
  margin: 20px 220px;
  background: ${({ theme }) => theme.cardBg};
  padding: 20px;
  border-radius: 8px;
`;

interface MessagesProps {
  theme: Theme;
}

const Messages: React.FC<MessagesProps> = ({ theme }) => (
  <MessagesWrapper theme={theme}>
    <h2>Messages</h2>
    <p>Coming soon...</p>
  </MessagesWrapper>
);

export default Messages;
