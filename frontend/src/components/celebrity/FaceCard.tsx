import styled from '@emotion/styled';
import { Theme } from '../../themes';
import Button from '../common/Button';
import { useState } from 'react';

const Card = styled.div<{ theme: Theme }>`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 1rem;
  margin: 0.5rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;
  max-width: 300px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Stats = styled.div<{ theme: Theme }>`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondaryText};
  margin: 0.5rem 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

interface FaceCardProps {
  theme: Theme;
  name: string;
  photo_url: string;
  onFollow: (name: string) => void;
  onCrush: (name: string) => void;
}

const FaceCard: React.FC<FaceCardProps> = ({ theme, name, photo_url, onFollow, onCrush }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [crushLevel, setCrushLevel] = useState(0);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow(name);
  };

  const handleCrush = () => {
    setCrushLevel(crushLevel + 1);
    onCrush(name);
  };

  return (
    <Card theme={theme}>
      <Image src={photo_url} alt={name} />
      <Name>{name}</Name>
      <Stats theme={theme}>
        <span>Crush: {crushLevel}</span>
        <Button theme={theme} onClick={handleCrush} style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>
          💖
        </Button>
      </Stats>
      <Button theme={theme} onClick={handleFollow}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </Card>
  );
};

export default FaceCard;