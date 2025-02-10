'use client';

import { Typography } from '@mui/material';

export const SearchHandsSVG = ({ size }: { size?: string }) => {
  return (
    <img
      width={size || 500}
      height={size || 500}
      src='./FigmaSvgVectors/SearchHands.svg'
      alt='Search Hands'
    />
  );
};

const SearchHands = ({ text }: { text: string }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SearchHandsSVG />
      <Typography variant='h3'>{text}</Typography>
    </div>
  );
};

export default SearchHands;
