import styled from '@emotion/styled';
import { Theme } from '../../themes';
import Button from '../common/Button';

const Card = styled.div<{ theme: Theme }>`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 1rem;
  margin: 0.5rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s;
  width: 200px;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    width: 100%;
    max-width: 200px;
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