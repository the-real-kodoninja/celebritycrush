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

const PostUser = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
`;

const PostContent = styled.p<{ theme: Theme }>`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.text};
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
`;

interface FandomPost {
  user: { username: string }; // Updated to match mockPosts structure
  content: string;
  celebrity: string;
}

interface FandomProps {
  theme: Theme;
  posts: FandomPost[];
}

const Fandom: React.FC<FandomProps> = ({ theme, posts }) => {
  return (
    <FandomWrapper theme={theme}>
      {posts.map((post, index) => (
        <Post key={index} theme={theme}>
          <PostUser>{post.user.username}</PostUser>
          <PostContent theme={theme}>{post.content}</PostContent>
        </Post>
      ))}
    </FandomWrapper>
  );
};

export default Fandom;
