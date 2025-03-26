import styled from '@emotion/styled';
import { Theme } from '../../themes';

const UserPageWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const ProfilePhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Username = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-family: 'Inter', sans-serif;
`;

const Bio = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.text};
  font-family: 'Inter', sans-serif;
`;

const FollowerCount = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
`;

const BadgeWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

interface UserPageProps {
  theme: Theme;
  username: string;
  bio: string;
  photo_url?: string;
  follower_count?: number;
  badge?: string;
}

const UserPage: React.FC<UserPageProps> = ({ theme, username, bio, photo_url = "https://via.placeholder.com/100", follower_count = 0, badge }) => {
  return (
    <UserPageWrapper theme={theme}>
      <ProfileHeader>
        <ProfilePhoto src={photo_url} alt={username} />
        <ProfileInfo>
          <Username>{username}</Username>
          <Bio theme={theme}>{bio}</Bio>
          <FollowerCount theme={theme}>{follower_count} followers</FollowerCount>
        </ProfileInfo>
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
      </ProfileHeader>
    </UserPageWrapper>
  );
};

export default UserPage;