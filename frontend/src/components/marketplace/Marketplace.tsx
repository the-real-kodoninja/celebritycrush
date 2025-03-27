import styled from '@emotion/styled';
import { Theme } from '../../themes';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key');

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

const CheckoutFormWrapper = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.cardBg};
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
`;

const ReviewSection = styled.div<{ theme: Theme }>`
  margin-top: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ReviewCard = styled.div<{ theme: Theme }>`
  border-top: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem 0;
`;

interface CheckoutFormProps {
  theme: Theme;
  item: any;
  onClose: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ theme, item, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const cardElement = elements.getElement(CardElement);

    const { data } = await fetch('http://localhost:3000/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_jwt_token_here'
      },
      body: JSON.stringify({ item_id: item.id })
    }).then(res => res.json());

    const result = await stripe.redirectToCheckout({ sessionId: data.id });

    if (result.error) {
      setError(result.error.message || "Payment failed");
      setProcessing(false);
    }
  };

  return (
    <CheckoutFormWrapper theme={theme}>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button theme={theme} type="submit" disabled={!stripe || processing}>
          {processing ? "Processing..." : "Pay Now"}
        </Button>
        <Button theme={theme} onClick={onClose} style={{ background: '#888', marginLeft: '0.5rem' }}>
          Cancel
        </Button>
      </form>
    </CheckoutFormWrapper>
  );
};

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
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<any>({});

  useEffect(() => {
    fetch('http://localhost:3000/api/marketplace_items', {
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(data => {
        setItems(data);
        // Fetch reviews for each item
        data.forEach(item => {
          fetch(`http://localhost:3000/api/marketplace_items/${item.id}/reviews`, {
            headers: { 'Authorization': 'Bearer your_jwt_token_here' }
          })
            .then(res => res.json())
            .then(reviewData => {
              setReviews(prev => ({ ...prev, [item.id]: reviewData }));
            });
        });
      });
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

  const handleReviewSubmit = (itemId: number) => (e: React.FormEvent) => {
    e.preventDefault();
    const reviewData = {
      review: {
        rating: parseInt(rating),
        comment
      }
    };
    fetch(`http://localhost:3000/api/marketplace_items/${itemId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_jwt_token_here'
      },
      body: JSON.stringify(reviewData)
    })
      .then(res => res.json())
      .then(data => {
        setReviews(prev => ({
          ...prev,
          [itemId]: [...(prev[itemId] || []), data]
        }));
        setRating("");
        setComment("");
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
            <Button theme={theme} onClick={() => setSelectedItem(item)}>
              Buy Now
            </Button>
            <ReviewSection theme={theme}>
              <h4>Reviews</h4>
              {reviews[item.id]?.map(review => (
                <ReviewCard key={review.id} theme={theme}>
                  <p>Rating: {review.rating}/5</p>
                  <p>{review.comment}</p>
                </ReviewCard>
              ))}
              <ReviewForm onSubmit={handleReviewSubmit(item.id)}>
                <Input
                  theme={theme}
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Rating (1-5)"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <Textarea
                  theme={theme}
                  placeholder="Your review..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button theme={theme} type="submit">Submit Review</Button>
              </ReviewForm>
            </ReviewSection>
          </ItemCard>
        ))}
      </ItemGrid>
      {selectedItem && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            theme={theme}
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        </Elements>
      )}
    </MarketplaceWrapper>
  );
};

export default Marketplace;