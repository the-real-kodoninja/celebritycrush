import styled from '@emotion/styled';
import { Theme } from '../../themes';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MarketplaceWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.background};
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ItemCard = styled(motion.div)<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
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

const ItemPrice = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
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

const FormWrapper = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const Input = styled.input<{ theme: Theme }>`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const Textarea = styled.textarea<{ theme: Theme }>`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  width: 100%;
  margin-bottom: 0.5rem;
`;

interface MarketplaceProps {
  theme: Theme;
}

const Marketplace: React.FC<MarketplaceProps> = ({ theme }) => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [celebrityName, setCelebrityName] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/api/marketplace_items', {
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData = {
      marketplace_item: {
        title,
        description,
        price: parseFloat(price),
        image_url: imageUrl,
        celebrity_name: celebrityName
      }
    };
    fetch('http://localhost:3000/api/marketplace_items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_jwt_token_here'
      },
      body: JSON.stringify(itemData)
    })
      .then(res => res.json())
      .then(data => {
        setItems([...items, data]);
        setTitle("");
        setDescription("");
        setPrice("");
        setImageUrl("");
        setCelebrityName("");
      });
  };

  return (
    <MarketplaceWrapper theme={theme}>
      <h2>Marketplace</h2>
      <FormWrapper theme={theme}>
        <h3>Add New Item</h3>
        <form onSubmit={handleSubmit}>
          <Input
            theme={theme}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            theme={theme}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            theme={theme}
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            theme={theme}
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Input
            theme={theme}
            placeholder="Celebrity Name"
            value={celebrityName}
            onChange={(e) => setCelebrityName(e.target.value)}
          />
          <Button theme={theme} type="submit">Submit for Approval</Button>
        </form>
      </FormWrapper>
      <ItemGrid>
        {items.map(item => (
          <ItemCard
            key={item.id}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ItemImage src={item.image_url} alt={item.title} />
            <ItemTitle>{item.title}</ItemTitle>
            <ItemPrice theme={theme}>${item.price}</ItemPrice>
            <Button theme={theme}>Buy Now</Button>
          </ItemCard>
        ))}
      </ItemGrid>
    </MarketplaceWrapper>
  );
};

export default Marketplace;
