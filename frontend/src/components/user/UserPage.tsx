import styled from '@emotion/styled';
import { Theme } from '../../themes';

const Page = styled.div<{ theme: Theme }>`
  margin: 20px 220px;
  background: ${({ theme }) => theme.cardBg};
  padding: 20px;
  border-radius: 8px;
`;

interface UserPageProps {
  theme: Theme;
  username: string;
  bio?: string;
}

const UserPage: React.FC<UserPageProps> = ({ theme, username, bio }) => (
  <Page theme={theme}>
    <h2>{username}</h2>
    <p>{bio || 'No bio yet.'}</p>
  </Page>
);

export default UserPage;
