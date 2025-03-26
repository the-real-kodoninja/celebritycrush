import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  background: #1a0d2e;
  color: #fff;
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: #2b1a4e;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Search = styled.input`
  margin-left: 20px;
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  color: #000;
`;

const Card = styled.div`
  border: 1px solid #ff69b4;
  padding: 16px;
  margin: 8px;
  background: #2b1a4e;
`;

const CelebImage = styled.img`
  max-width: 200px;
`;

interface Celebrity {
  name: string;
  data: {
    sources: {
      wiki?: { bio: string; photo_url: string; url: string };
      tmz?: { news: { title: string; url: string }[]; url: string };
      imdb?: { url: string };
      ethnic_celebs?: { race: string; url: string };
      social?: { twitter: { url: string }; instagram: { url: string } };
      misc?: { nft: { url: string }; dating: { url: string }; nsfw: { url: string } };
    };
  };
}

const App: React.FC = () => {
  const [celebs, setCelebs] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/celebrities')
      .then(res => res.json())
      .then(data => {
        setCelebs(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <Header>
        <Logo>CelebrityCrush</Logo>
        <Search placeholder="Search celebrities..." />
      </Header>
      {celebs.map(celeb => (
        <Card key={celeb.name}>
          <h2>{celeb.name}</h2>
          {celeb.data.sources.wiki && (
            <>
              <CelebImage src={celeb.data.sources.wiki.photo_url} alt={celeb.name} />
              <p>{celeb.data.sources.wiki.bio.substring(0, 100)}... <a href={celeb.data.sources.wiki.url}>Wiki</a></p>
            </>
          )}
          {celeb.data.sources.tmz && (
            <div>
              <h3>News</h3>
              {celeb.data.sources.tmz.news.map(n => (
                <p key={n.url}><a href={n.url}>{n.title}</a></p>
              ))}
            </div>
          )}
          {celeb.data.sources.social && (
            <p>
              <a href={celeb.data.sources.social.twitter.url}>Twitter</a> | 
              <a href={celeb.data.sources.social.instagram.url}>Instagram</a>
            </p>
          )}
          {celeb.data.sources.misc && (
            <p><a href={celeb.data.sources.misc.nft.url}>NFTs</a> | <a href={celeb.data.sources.misc.dating.url}>Dating</a></p>
          )}
        </Card>
      ))}
    </Container>
  );
};

export default App;