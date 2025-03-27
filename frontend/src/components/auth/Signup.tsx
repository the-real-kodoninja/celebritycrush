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

const CheckboxLabel = styled.label<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
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

const OAuthButton = styled(Button)`
  background: ${({ provider }: { provider: string; theme: Theme }) => {
    switch (provider) {
      case 'twitter':
        return '#1DA1F2';
      case 'google':
        return '#DB4437';
      case 'twitch':
        return '#6441A5';
      case 'bluesky':
        return '#0085FF';
      default:
        return '#888';
    }
  }};
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
  const [isOver13, setIsOver13] = useState(false);
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
    if (!isOver13) {
      alert("You must be at least 13 years old to sign up.");
      return;
    }
    const userData = {
      user: {
        username,
        email: `${username}@example.com`,
        password: "password123",
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

  const handleOAuthLogin = (provider: string) => {
    window.location.href = `http://localhost:3000/users/auth/${provider}`;
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
          </>
        )}
        <Input
          theme={theme}
          type="text"
          placeholder="Twitter Profile URL (optional)"
          value={socialMediaLinks.twitter}
          onChange={(e) => setSocialMediaLinks({ ...socialMediaLinks, twitter: e.target.value })}
        />
        <Input
          theme={theme}
          type="text"
          placeholder="Instagram Profile URL (optional)"
          value={socialMediaLinks.instagram}
          onChange={(e) => setSocialMediaLinks({ ...socialMediaLinks, instagram: e.target.value })}
        />
        <CheckboxLabel theme={theme}>
          <input
            type="checkbox"
            checked={isOver13}
            onChange={(e) => setIsOver13(e.target.checked)}
          />
          I confirm that I am at least 13 years old (18 for NSFW content).
        </CheckboxLabel>
        <Button type="submit" theme={theme}>Sign Up</Button>
        <h3>Or Sign Up With:</h3>
        <OAuthButton provider="twitter" theme={theme} onClick={() => handleOAuthLogin("twitter")}>
          Twitter (X)
        </OAuthButton>
        <OAuthButton provider="google" theme={theme} onClick={() => handleOAuthLogin("google_oauth2")}>
          Google
        </OAuthButton>
        <OAuthButton provider="twitch" theme={theme} onClick={() => handleOAuthLogin("twitch")}>
          Twitch
        </OAuthButton>
      </Form>
    </SignupWrapper>
  );
};

export default Signup;