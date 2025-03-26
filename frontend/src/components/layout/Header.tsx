import styled from '@emotion/styled';
import { Theme, darkTheme } from '../../themes';
import Button from '../common/Button';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.h1<{ theme: Theme }>`
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.accent};
  font-weight: 700;
  font-family: 'Inter', sans-serif;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Search = styled.input<{ theme: Theme }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  width: 100%;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    outline: none;
  }
`;

const Dropdown = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.2s ease-in-out;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const DropdownItem = styled(Link)<{ theme: Theme }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-family: 'Inter', sans-serif;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.accent};
  }
`;

const DropdownImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
  object-fit: cover;
`;

const Menu = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserIcon = styled.div<{ theme: Theme }>`
  width: 2rem;
  height: 2rem;
  background: ${({ theme }) => theme.gradient};
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

const Hamburger = styled.div<{ theme: Theme }>`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const NotificationIcon = styled.div`
  position: relative;
  cursor: pointer;
`;

const NotificationCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
`;

const NotificationDropdown = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
`;

const NotificationItem = styled.div<{ theme: Theme; read: boolean }>`
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ read, theme }) => (read ? theme.cardBg : theme.primary + '20')};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + '40'};
  }
`;

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onToggleSidebar: () => void;
  celebrities: { name: string; photo_url: string }[];
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, isLoggedIn, onLoginClick, onToggleSidebar, celebrities }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:3000/api/notifications', {
        headers: { 'Authorization': 'Bearer your_jwt_token_here' }  // Replace with actual JWT token
      })
        .then(res => res.json())
        .then(data => setNotifications(data));
    }
  }, [isLoggedIn]);

  const markAsRead = (id: number) => {
    fetch(`http://localhost:3000/api/notifications/${id}/mark_as_read`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(updatedNotification => {
        setNotifications(notifications.map(n => n.id === id ? updatedNotification : n));
      });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredCelebs = celebrities.filter(celeb =>
    celeb.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <HeaderWrapper theme={theme}>
      <Hamburger theme={theme} onClick={onToggleSidebar}>☰</Hamburger>
      <Logo theme={theme}>CelebrityCrush</Logo>
      <SearchWrapper>
        <Search
          theme={theme}
          placeholder="Search celebrities..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
          onFocus={() => setIsDropdownOpen(true)}
        />
        {isDropdownOpen && searchQuery && (
          <Dropdown theme={theme}>
            {filteredCelebs.map(celeb => (
              <DropdownItem key={celeb.name} to={`/celebrity/${celeb.name}`} theme={theme}>
                <DropdownImage src={celeb.photo_url} alt={celeb.name} />
                <span>{celeb.name}</span>
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </SearchWrapper>
      <Menu theme={theme}>
        <NotificationIcon onClick={() => setShowNotifications(!showNotifications)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill={theme.text}/>
          </svg>
          {unreadCount > 0 && <NotificationCount>{unreadCount}</NotificationCount>}
        </NotificationIcon>
        {showNotifications && (
          <NotificationDropdown theme={theme}>
            {notifications.map((notification: any) => (
              <NotificationItem
                key={notification.id}
                theme={theme}
                read={notification.read}
                onClick={() => markAsRead(notification.id)}
              >
                {notification.message}
              </NotificationItem>
            ))}
          </NotificationDropdown>
        )}
        <Button theme={theme} onClick={toggleTheme} style={{ background: theme.gradient }}>
          {theme === darkTheme ? 'Light' : 'Dark'}
        </Button>
        <UserIcon theme={theme} onClick={onLoginClick} />
      </Menu>
    </HeaderWrapper>
  );
};

export default Header;