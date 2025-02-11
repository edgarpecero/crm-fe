'use client';

import { Typography } from '@mui/material';
import Image from 'next/image';

export const SearchHandsSVG = ({ size = 500 }: { size?: number }) => {
  return (
    <Image
      width={size}
      height={size}
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
