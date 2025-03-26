import styled from '@emotion/styled';
import { Theme } from '../../themes';

const Card = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1rem;
  width: 200px;
  text-align: center;
  position: relative;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
`;

const FollowerCount = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button<{ theme: Theme }>`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  margin: 0 0.25rem;
`;

const BadgeWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

interface FaceCardProps {
  theme: Theme;
  name: string;
  photo_url: string;
  follower_count: number;
  badge?: string;
  onFollow: (name: string) => void;
  onCrush: (name: string) => void;
}

const FaceCard: React.FC<FaceCardProps> = ({ theme, name, photo_url, follower_count, badge, onFollow, onCrush }) => {
  return (
    <Card theme={theme}>
      {badge && (
        <BadgeWrapper>
          {badge === "internet_famous" ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700"/>
              <path d="M12 6V9M12 9V12M12 12H15M12 12H9M9 9H6M15 9H18" stroke="#00BFFF" strokeWidth="1.5"/>
            </svg>
          ) : badge === "famous" ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L14 9H21L15 13L17 19L12 15L7 19L9 13L3 9H10L12 3Z" fill="#FFD700"/>
              <circle cx="12" cy="12" r="8" stroke="#FF4500" strokeWidth="1.5" fill="none"/>
            </svg>
          ) : null}
        </BadgeWrapper>
      )}
      <Photo src={photo_url} alt={name} />
      <Name>{name}</Name>
      <FollowerCount theme={theme}>{follower_count} followers</FollowerCount>
      <Button theme={theme} onClick={() => onFollow(name)}>Follow</Button>
      <Button theme={theme} onClick={() => onCrush(name)}>Crush</Button>
    </Card>
  );
};

export default FaceCard;
