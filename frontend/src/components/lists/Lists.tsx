import styled from '@emotion/styled';
import { Theme } from '../../themes';

const ListsWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const ListItem = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

interface ListsProps {
  theme: Theme;
  lists: { name: string; celebrities: string[] }[];
}

const Lists: React.FC<ListsProps> = ({ theme, lists }) => (
  <ListsWrapper theme={theme}>
    {lists.map((list, index) => (
      <ListItem key={index} theme={theme}>
        <h3>{list.name}</h3>
        <p>{list.celebrities.join(', ')}</p>
      </ListItem>
    ))}
  </ListsWrapper>
);

export default Lists;
