import styled from '@emotion/styled';
import { Theme } from '../../themes';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DashboardWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.background};
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const ItemCard = styled(motion.div)<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1rem;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const ItemTitle = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
`;

const ItemDescription = styled.p<{ theme: Theme }>`
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
  margin-right: 0.5rem;
`;

const RejectButton = styled(Button)`
  background: #ff4444;
`;

interface ModerationDashboardProps {
  theme: Theme;
}

const ModerationDashboard: React.FC<ModerationDashboardProps> = ({ theme }) => {
  const [items, setItems] = useState([]);
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/admin/marketplace_items', {
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(data => setItems(data));

    fetch('http://localhost:3000/admin/licenses', {
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(data => setLicenses(data));
  }, []);

  const handleApproveItem = (id: number) => {
    fetch(`http://localhost:3000/admin/marketplace_items/${id}/approve`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      });
  };

  const handleRejectItem = (id: number) => {
    fetch(`http://localhost:3000/admin/marketplace_items/${id}/reject`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      });
  };

  const handleApproveLicense = (id: number) => {
    fetch(`http://localhost:3000/admin/licenses/${id}/approve`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(() => {
        setLicenses(licenses.filter(license => license.id !== id));
      });
  };

  const handleRejectLicense = (id: number) => {
    fetch(`http://localhost:3000/admin/licenses/${id}/reject`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(() => {
        setLicenses(licenses.filter(license => license.id !== id));
      });
  };

  return (
    <DashboardWrapper theme={theme}>
      <h1>Moderation Dashboard</h1>
      <Section>
        <SectionTitle>Pending Marketplace Items</SectionTitle>
        <ItemList>
          {items.map(item => (
            <ItemCard
              key={item.id}
              theme={theme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ItemImage src={item.image_url} alt={item.title} />
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription theme={theme}>{item.description}</ItemDescription>
              <Button theme={theme} onClick={() => handleApproveItem(item.id)}>
                Approve
              </Button>
              <RejectButton theme={theme} onClick={() => handleRejectItem(item.id)}>
                Reject
              </RejectButton>
            </ItemCard>
          ))}
        </ItemList>
      </Section>
      <Section>
        <SectionTitle>Pending Licenses</SectionTitle>
        <ItemList>
          {licenses.map(license => (
            <ItemCard
              key={license.id}
              theme={theme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ItemTitle>{license.celebrity_name}</ItemTitle>
              <ItemDescription theme={theme}>{license.terms}</ItemDescription>
              <Button theme={theme} onClick={() => handleApproveLicense(license.id)}>
                Approve
              </Button>
              <RejectButton theme={theme} onClick={() => handleRejectLicense(license.id)}>
                Reject
              </RejectButton>
            </ItemCard>
          ))}
        </ItemList>
      </Section>
    </DashboardWrapper>
  );
};

export default ModerationDashboard;
