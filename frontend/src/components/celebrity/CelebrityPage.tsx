import styled from '@emotion/styled';
import { Theme } from '../../themes';
import Button from '../common/Button';

const CelebrityWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const Bio = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.secondaryText};
  margin: 0.5rem 0;
`;

const Post = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

interface CelebrityPageProps {
  theme: Theme;
  celebrity: {
    name: string;
    photo_url: string;
    bio: string;
    posts: { user: string; content: string }[];
  };
}

const CelebrityPage: React.FC<CelebrityPageProps> = ({ theme, celebrity }) => (
  <CelebrityWrapper theme={theme}>
    <Header theme={theme}>
      <Image src={celebrity.photo_url} alt={celebrity.name} />
      <Info>
        <Name>{celebrity.name}</Name>
        <Bio theme={theme}>{celebrity.bio}</Bio>
        <Button theme={theme}>Follow</Button>
      </Info>
    </Header>
    {celebrity.posts.map((post, index) => (
      <Post key={index} theme={theme}>
        <h3>{post.user}</h3>
        <p>{post.content}</p>
      </Post>
    ))}
  </CelebrityWrapper>
);

export default CelebrityPage;
