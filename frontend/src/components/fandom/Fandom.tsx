import styled from '@emotion/styled';
import { Theme } from '../../themes';

const FandomWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const Post = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

interface FandomProps {
  theme: Theme;
  posts: { user: string; content: string; celebrity: string }[];
}

const Fandom: React.FC<FandomProps> = ({ theme, posts }) => (
  <FandomWrapper theme={theme}>
    {posts.map((post, index) => (
      <Post key={index} theme={theme}>
        <h3>{post.user} on {post.celebrity}</h3>
        <p>{post.content}</p>
      </Post>
    ))}
  </FandomWrapper>
);

export default Fandom;
