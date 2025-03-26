import styled from '@emotion/styled';
import { Theme } from '../../themes';
import Button from '../common/Button';
import { useState, useEffect } from 'react';

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
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.cardBg};
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  font-family: 'Inter', sans-serif;
  font-weight: 700;
`;

const Bio = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.secondaryText};
  margin: 0.5rem 0;
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
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

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button<{ theme: Theme }>`
  background: none;
  border: none;
  color: ${({ theme }) => theme.secondaryText};
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const CommentSection = styled.div`
  margin-top: 1rem;
`;

const Comment = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.background};
  padding: 0.5rem;
  border-radius: 8px;
  margin: 0.5rem 0;
`;

const Reply = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  padding: 0.5rem;
  border-radius: 8px;
  margin: 0.5rem 1rem;
`;

const CommentInput = styled.input<{ theme: Theme }>`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-family: 'Inter', sans-serif;
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    outline: none;
  }
`;

interface CelebrityPageProps {
  theme: Theme;
  celebrity: {
    id: number;
    name: string;
    photo_url: string;
    bio: string;
    posts: { id: number; user: { username: string }; content: string; media_url?: string; media_type?: string; likes: { id: number; user_id: number }[]; comments: { id: number; user: { username: string }; content: string; replies: { id: number; user: { username: string }; content: string }[] }[]; shares: { id: number; user_id: number }[] }[];
  };
}

const CelebrityPage: React.FC<CelebrityPageProps> = ({ theme, celebrity }) => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(celebrity.posts);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  const [commentingPostId, setCommentingPostId] = useState<number | null>(null);
  const [replyingCommentId, setReplyingCommentId] = useState<number | null>(null);
  const userId = 1; // Mock user ID

  useEffect(() => {
    fetch(`http://localhost:3000/api/fandom_posts?celebrity_id=${celebrity.id}`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, [celebrity.id]);

  const handlePost = () => {
    if (newPost.trim()) {
      fetch('http://localhost:3000/api/fandom_posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fandom_post: { user_id: userId, celebrity_id: celebrity.id, content: newPost } })
      })
        .then(res => res.json())
        .then(data => setPosts([...posts, data]));
      setNewPost('');
    }
  };

  const handleLike = (postId: number) => {
    const liked = posts.find(p => p.id === postId)?.likes.some(l => l.user_id === userId);
    fetch(`http://localhost:3000/api/fandom_posts/${postId}/likes`, {
      method: liked ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    }).then(() => {
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            likes: liked ? p.likes.filter(l => l.user_id !== userId) : [...p.likes, { id: Date.now(), user_id: userId }]
          };
        }
        return p;
      }));
    });
  };

  const handleComment = (postId: number) => {
    if (newComment.trim()) {
      fetch(`http://localhost:3000/api/fandom_posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: { user_id: userId, content: newComment } })
      })
        .then(res => res.json())
        .then(data => {
          setPosts(posts.map(p => {
            if (p.id === postId) {
              return { ...p, comments: [...p.comments, { ...data, user: { username: 'kodoninja' }, replies: [] }] };
            }
            return p;
          }));
          setNewComment('');
          setCommentingPostId(null);
        });
    }
  };

  const handleReply = (commentId: number) => {
    if (newReply.trim()) {
      fetch(`http://localhost:3000/api/fandom_posts/1/comments/${commentId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: { user_id: userId, content: newReply } })
      })
        .then(res => res.json())
        .then(data => {
          setPosts(posts.map(p => ({
            ...p,
            comments: p.comments.map(c => {
              if (c.id === commentId) {
                return { ...c, replies: [...c.replies, { ...data, user: { username: 'kodoninja' } }] };
              }
              return c;
            })
          })));
          setNewReply('');
          setReplyingCommentId(null);
        });
    }
  };

  const handleShare = (postId: number) => {
    const shared = posts.find(p => p.id === postId)?.shares.some(s => s.user_id === userId);
    fetch(`http://localhost:3000/api/fandom_posts/${postId}/shares`, {
      method: shared ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    }).then(() => {
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            shares: shared ? p.shares.filter(s => s.user_id !== userId) : [...p.shares, { id: Date.now(), user_id: userId }]
          };
        }
        return p;
      }));
    });
  };

  return (
    <CelebrityWrapper theme={theme}>
      <Header theme={theme}>
        <Image src={celebrity.photo_url} alt={celebrity.name} />
        <Info>
          <Name>{celebrity.name}</Name>
          <Bio theme={theme}>{celebrity.bio}</Bio>
          <Button theme={theme} style={{ background: theme.gradient }}>
            Follow
          </Button>
        </Info>
      </Header>
      <PostInput
        theme={theme}
        placeholder="Share your thoughts..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        rows={3}
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
          <Actions>
            <ActionButton theme={theme} onClick={() => handleLike(post.id)}>
              💖 {post.likes.length}
            </ActionButton>
            <ActionButton theme={theme} onClick={() => setCommentingPostId(post.id)}>
              💬 {post.comments.length}
            </ActionButton>
            <ActionButton theme={theme} onClick={() => handleShare(post.id)}>
              🔄 {post.shares.length}
            </ActionButton>
          </Actions>
          {commentingPostId === post.id && (
            <CommentSection>
              <CommentInput
                theme={theme}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
              />
              {post.comments.map(comment => (
                <Comment key={comment.id} theme={theme}>
                  <strong>{comment.user.username}</strong>: {comment.content}
                  <ActionButton theme={theme} onClick={() => setReplyingCommentId(comment.id)}>
                    Reply
                  </ActionButton>
                  {replyingCommentId === comment.id && (
                    <CommentInput
                      theme={theme}
                      placeholder="Add a reply..."
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleReply(comment.id)}
                    />
                  )}
                  {comment.replies.map(reply => (
                    <Reply key={reply.id} theme={theme}>
                      <strong>{reply.user.username}</strong>: {reply.content}
                    </Reply>
                  ))}
                </Comment>
              ))}
            </CommentSection>
          )}
        </Post>
      ))}
    </CelebrityWrapper>
  );
};

export default CelebrityPage;