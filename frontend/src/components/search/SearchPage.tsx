import styled from '@emotion/styled';
import { Theme } from '../../themes';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SearchPageWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.background};
`;

const SearchHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input<{ theme: Theme }>`
  padding: 0.75rem 1rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  width: 100%;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    outline: none;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ theme: Theme; active: boolean }>`
  background: ${({ theme, active }) => (active ? theme.primary : theme.cardBg)};
  color: ${({ theme, active }) => (active ? 'white' : theme.text)};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: background 0.2s, color 0.2s;
`;

const ResultsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ResultCard = styled(motion.div)<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
`;

const ResultImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const ResultName = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
`;

const ResultBio = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Button = styled.button<{ theme: Theme }>`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
`;

interface SearchPageProps {
  theme: Theme;
  celebrities: any[];
  onFollow: (name: string) => void;
  onCrush: (name: string) => void;
  searchQuery: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ theme, celebrities, onFollow, onCrush, searchQuery }) => {
  const [query, setQuery] = useState(searchQuery);
  const [filter, setFilter] = useState('all');
  const [filteredResults, setFilteredResults] = useState(celebrities);

  useEffect(() => {
    setQuery(searchQuery);
    let results = celebrities.filter(celeb =>
      celeb.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filter !== 'all') {
      results = results.filter(celeb => {
        if (filter === 'internet_famous') return celeb.badge === 'internet_famous';
        if (filter === 'famous') return celeb.badge === 'famous';
        return true;
      });
    }
    setFilteredResults(results);
  }, [searchQuery, filter, celebrities]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/search?q=${query}`;
  };

  return (
    <SearchPageWrapper theme={theme}>
      <SearchHeader>
        <form onSubmit={handleSearch}>
          <SearchInput
            theme={theme}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search celebrities..."
          />
        </form>
        <FilterWrapper>
          <FilterButton
            theme={theme}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton
            theme={theme}
            active={filter === 'internet_famous'}
            onClick={() => setFilter('internet_famous')}
          >
            Internet Famous
          </FilterButton>
          <FilterButton
            theme={theme}
            active={filter === 'famous'}
            onClick={() => setFilter('famous')}
          >
            Famous
          </FilterButton>
        </FilterWrapper>
      </SearchHeader>
      <ResultsWrapper>
        {filteredResults.map(celeb => (
          <ResultCard
            key={celeb.name}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/celebrity/${celeb.name}`}>
              <ResultImage src={celeb.photo_url} alt={celeb.name} />
              <ResultName>{celeb.name}</ResultName>
            </Link>
            <ResultBio theme={theme}>{celeb.bio.slice(0, 100)}...</ResultBio>
            <Button theme={theme} onClick={() => onFollow(celeb.name)}>
              Follow
            </Button>
            <Button theme={theme} onClick={() => onCrush(celeb.name)}>
              Crush
            </Button>
          </ResultCard>
        ))}
      </ResultsWrapper>
    </SearchPageWrapper>
  );
};

export default SearchPage;