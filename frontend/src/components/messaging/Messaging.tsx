import styled from '@emotion/styled';
import { Theme } from '../../themes';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MessagingWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  display: flex;
  gap: 2rem;
`;

const ConversationList = styled.div<{ theme: Theme }>`
  width: 30%;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  padding: 1rem;
`;

const ConversationItem = styled.div<{ theme: Theme, selected: boolean }>`
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  background: ${({ selected, theme }) => (selected ? theme.primary : 'transparent')};
  color: ${({ selected, theme }) => (selected ? 'white' : theme.text)};
`;

const ChatWindow = styled.div<{ theme: Theme }>`
  width: 70%;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const MessageBubble = styled.div<{ theme: Theme, isSender: boolean }>`
  background: ${({ isSender, theme }) => (isSender ? theme.primary : theme.border)};
  color: ${({ isSender }) => (isSender ? 'white' : 'black')};
  padding: 0.5rem 1rem;
  border-radius: 12px;
  margin: 0.5rem 0;
  align-self: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')};
  max-width: 70%;
`;

const InputWrapper = styled.form`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Input = styled.input<{ theme: Theme }>`
  flex: 1;
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
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
`;

const StartConversationWrapper = styled.div<{ theme: Theme }>`
  margin-bottom: 1rem;
`;

interface MessagingProps {
  theme: Theme;
}

const Messaging: React.FC<MessagingProps> = ({ theme }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/api/conversations', {
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(data => setConversations(data));
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetch(`http://localhost:3000/api/conversations/${selectedConversation.id}`, {
        headers: { 'Authorization': 'Bearer your_jwt_token_here' }
      })
        .then(res => res.json())
        .then(data => setMessages(data.messages));
    }
  }, [selectedConversation]);

  const handleStartConversation = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_jwt_token_here'
      },
      body: JSON.stringify({ recipient_id: recipientId })
    })
      .then(res => res.json())
      .then(data => {
        setConversations([...conversations, data]);
        setSelectedConversation(data);
        setRecipientId("");
      });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    fetch(`http://localhost:3000/api/conversations/${selectedConversation.id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_jwt_token_here'
      },
      body: JSON.stringify({ message: { body: newMessage } })
    })
      .then(res => res.json())
      .then(data => {
        setMessages([...messages, data]);
        setNewMessage("");
      });
  };

  return (
    <MessagingWrapper theme={theme}>
      <ConversationList theme={theme}>
        <StartConversationWrapper theme={theme}>
          <form onSubmit={handleStartConversation}>
            <Input
              theme={theme}
              placeholder="Recipient User ID"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
            />
            <Button theme={theme} type="submit">Start Conversation</Button>
          </form>
        </StartConversationWrapper>
        {conversations.map(conv => (
          <ConversationItem
            key={conv.id}
            theme={theme}
            selected={selectedConversation?.id === conv.id}
            onClick={() => setSelectedConversation(conv)}
          >
            {conv.sender.id === 1 ? conv.recipient.username : conv.sender.username}
          </ConversationItem>
        ))}
      </ConversationList>
      <ChatWindow theme={theme}>
        {selectedConversation ? (
          <>
            <h3>Chat with {selectedConversation.sender.id === 1 ? selectedConversation.recipient.username : selectedConversation.sender.username}</h3>
            <MessageList>
              {messages.map(msg => (
                <MessageBubble
                  key={msg.id}
                  theme={theme}
                  isSender={msg.sender_id === 1}
                >
                  {msg.body}
                </MessageBubble>
              ))}
            </MessageList>
            <InputWrapper onSubmit={handleSendMessage}>
              <Input
                theme={theme}
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button theme={theme} type="submit">Send</Button>
            </InputWrapper>
          </>
        ) : (
          <p>Select a conversation to start chatting!</p>
        )}
      </ChatWindow>
    </MessagingWrapper>
  );
};

export default Messaging;
