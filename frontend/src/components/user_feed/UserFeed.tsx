import styled from '@emotion/styled';
import { Theme } from '../../themes';
import Button from '../common/Button';
import { useState, useEffect } from 'react';

const FeedWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const PostInput = styled.textarea<{ theme: Theme }>`
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-family: 'Inter', sans-serif;
  resize: none;
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    outline: none;
  }
`;

const MediaInput = styled.input`
  margin: 0.5rem 0;
`;

const Post = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
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

const Media = styled.div`
  margin: 0.5rem 0;
  img, video {
    max-width: 100%;
    border-radius: 8px;
  }
`;

const Source = styled.a<{ theme: Theme }>`
  color: ${({ theme }) => theme.accent};
  font-size: 0.9rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

interface UserFeedProps {
  theme: Theme;
  userId: number;
}

const UserFeed: React.FC<UserFeedProps> = ({ theme, userId }) => {
  const [newPost, setNewPost] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // Mock feed data including news, updates, fan art, etc.
    setPosts([
      { id: 1, user: { username: 'kodoninja' }, content: 'New album out!', media_url: 'https://via.placeholder.com/300', media_type: 'image', source: 'https://tmz.com', type: 'news' },
      { id: 2, user: { username: 'kodoninja' }, content: 'Amazing fan art!', media_url: 'https://via.placeholder.com/300', media_type: 'image', source: 'https://deviantart.com', type: 'fan_art' }
    ]);
  }, []);

  const handlePost = () => {
    if (newPost.trim()) {
      const newPostData = {
        id: Date.now(),
        user: { username: 'kodoninja' },
        content: newPost,
        media_url: mediaFile ? URL.createObjectURL(mediaFile) : null,
        media_type: mediaFile ? (mediaFile.type.startsWith('image') ? 'image' : 'video') : null,
        type: 'user_post'
      };
      setPosts([newPostData, ...posts]);
      setNewPost('');
      setMediaFile(null);
    }
  };

  return (
    <FeedWrapper theme={theme}>
      <PostInput
        theme={theme}
        placeholder="What's on your mind?"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        rows={3}
      />
      <MediaInput
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setMediaFile(e.target.files ? e.target.files[0] : null)}
      />
      <Button theme={theme} onClick={handlePost} style={{ background: theme.gradient, marginBottom: '1rem' }}>
        Post
      </Button>
      {posts.map(post => (
        <Post key={post.id} theme={theme}>
          <PostUser>{post.user.username}</PostUser>
          <PostContent theme={theme}>{post.content}</PostContent>
          {post.media_url && (
            <Media>
              {post.media_type === 'image' ? (
                <img src={post.media_url} alt="Post media" />
              ) : post.media_type === 'video' ? (
                <video controls src={post.media_url} />
              ) : null}
            </Media>
          )}
          {post.source && (
            <Source href={post.source} theme={theme}>Source</Source>
          )}
        </Post>
      ))}
    </FeedWrapper>
  );
};

export default UserFeed;
