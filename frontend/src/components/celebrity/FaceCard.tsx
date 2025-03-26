import styled from '@emotion/styled';
import { Theme } from '../../themes';
import Button from '../common/Button';

const Card = styled.div<{ theme: Theme }>`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 16px;
  margin: 8px;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  max-width: 100px;
  border-radius: 50%;
`;

interface FaceCardProps {
  theme: Theme;
  name: string;
  photo_url: string;
}

const FaceCard: React.FC<FaceCardProps> = ({ theme, name, photo_url }) => (
  <Card theme={theme}>
    <Image src={photo_url} alt={name} />
    <h3>{name}</h3>
    <Button theme={theme}>Follow</Button>
  </Card>
);

export default FaceCard;
