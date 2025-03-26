import styled from '@emotion/styled';
import { Theme } from '../../themes';

const Button = styled.button<{ theme: Theme }>`
  padding: 8px 16px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

export default Button;
