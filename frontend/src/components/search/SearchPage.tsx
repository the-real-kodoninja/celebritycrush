import styled from '@emotion/styled';
import { Theme } from '../../themes';
import FaceCard from '../celebrity/FaceCard';

const SearchWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const ResultItem = styled.div<{ theme: Theme }>`
  margin-bottom: 1rem;
`;

interface SearchPageProps {
  theme: Theme;
  celebrities: { name: string; photo_url: string }[];
  onFollow: (name: string) => void;
  onCrush: (name: string) => void;
  searchQuery: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ theme, celebrities, onFollow, onCrush, searchQuery }) => {
  const filteredCelebs = celebrities.filter(celeb =>
    celeb.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SearchWrapper theme={theme}>
      {filteredCelebs.map(celeb => (
        <ResultItem key={celeb.name} theme={theme}>
          <FaceCard
            theme={theme}
            name={celeb.name}
            photo_url={celeb.photo_url}
            onFollow={onFollow}
            onCrush={onCrush}
          />
        </ResultItem>
      ))}
    </SearchWrapper>
  );
};

export default SearchPage;
