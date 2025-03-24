import React from 'react';
import { css } from '@emotion/react';

const appStyle = css`
  font-family: Arial, sans-serif;
  text-align: center;
`;

const App: React.FC = () => (
  <div css={appStyle}>
    <h1>Welcome to CelebrityCrush</h1>
  </div>
);

export default App;