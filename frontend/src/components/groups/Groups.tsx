import styled from '@emotion/styled';
import { Theme } from '../../themes';

const GroupsWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const GroupItem = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

interface GroupsProps {
  theme: Theme;
  groups: { name: string; description: string }[];
}

const Groups: React.FC<GroupsProps> = ({ theme, groups }) => (
  <GroupsWrapper theme={theme}>
    {groups.map((group, index) => (
      <GroupItem key={index} theme={theme}>
        <h3>{group.name}</h3>
        <p>{group.description}</p>
      </GroupItem>
    ))}
  </GroupsWrapper>
);

export default Groups;
