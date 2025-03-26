import styled from '@emotion/styled';
import { Theme } from '../../themes';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input<{ theme: Theme }>`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
`;

const Select = styled.select<{ theme: Theme }>`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
`;

const Button = styled.button<{ theme: Theme }>`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
`;

const AutocompleteList = styled.ul<{ theme: Theme }>`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const AutocompleteItem = styled.li<{ theme: Theme }>`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + '20'};
  }
`;

interface SignupProps {
  theme: Theme;
}

const Signup: React.FC<SignupProps> = ({ theme }) => {
  const [pageType, setPageType] = useState("fan");
  const [username, setUsername] = useState("");
  const [celebrityName, setCelebrityName] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState({ twitter: "", instagram: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (celebrityName.length > 2) {
      fetch(`http://localhost:3000/api/scraped_celebrities?search=${celebrityName}`)
        .then(res => res.json())
        .then(data => setSuggestions(data.map((c: any) => c.name)));
    } else {
      setSuggestions([]);
    }
  }, [celebrityName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      user: {
        username,
        email: `${username}@example.com`,  // Replace with actual email input
        password: "password123",  // Replace with actual password input
        page_type: pageType,
        celebrity_name: celebrityName,
        social_media_links: socialMediaLinks
      }
    };
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          navigate('/profile');
        }
      });
  };

  const handleSocialMediaLogin = (platform: string) => {
    // Redirect to OAuth flow (simplified)
    window.location.href = `https://api.${platform}.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3001/auth/${platform}/callback`;
  };

  return (
    <SignupWrapper theme={theme}>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          theme={theme}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Select theme={theme} value={pageType} onChange={(e) => setPageType(e.target.value)}>
          <option value="fan">Fan</option>
          <option value="celebrity">Celebrity</option>
        </Select>
        {pageType === "celebrity" && (
          <>
            <Input
              theme={theme}
              type="text"
              placeholder="Your Celebrity Name"
              value={celebrityName}
              onChange={(e) => setCelebrityName(e.target.value)}
            />
            {suggestions.length > 0 && (
              <AutocompleteList theme={theme}>
                {suggestions.map(suggestion => (
                  <AutocompleteItem
                    key={suggestion}
                    theme={theme}
                    onClick={() => setCelebrityName(suggestion)}
                  >
                    {suggestion}
                  </AutocompleteItem>
                ))}
              </AutocompleteList>
            )}
            <Button type="button" theme={theme} onClick={() => handleSocialMediaLogin("twitter")}>
              Verify with Twitter
            </Button>
            <Button type="button" theme={theme} onClick={() => handleSocialMediaLogin("instagram")}>
              Verify with Instagram
            </Button>
          </>
        )}
        <Input
          theme={theme}
          type="text"
          placeholder="Twitter Profile URL"
          value={socialMediaLinks.twitter}
          onChange={(e) => setSocialMediaLinks({ ...socialMediaLinks, twitter: e.target.value })}
        />
        <Input
          theme={theme}
          type="text"
          placeholder="Instagram Profile URL"
          value={socialMediaLinks.instagram}
          onChange={(e) => setSocialMediaLinks({ ...socialMediaLinks, instagram: e.target.value })}
        />
        <Button type="submit" theme={theme}>Sign Up</Button>
      </Form>
    </SignupWrapper>
  );
};

export default Signup;
