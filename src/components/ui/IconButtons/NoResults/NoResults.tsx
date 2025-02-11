'use client';

import { Typography } from '@mui/material';
import { noResultsWrapperStyles } from './NoResultsStyles';
import { theme } from '@/styles/Theme';
import { SearchHandsSVG } from '../../FigmaSvgVectors/SearchHands';

interface NoResultsProps {
  title?: string;
  subtitle?: string;
  iconSize?: number;
}

const NoResults = ({
  title = 'Oops, no hay resultados',
  subtitle = 'Intenta con otra búsqueda',
  iconSize = 250,
}: NoResultsProps) => {
  return (
    <div style={noResultsWrapperStyles}>
      <SearchHandsSVG size={iconSize} />
      <Typography variant='h6' fontWeight={800}>
        {title}
      </Typography>
      <Typography variant='body2' color={theme.palette.grey[800]}>
        {subtitle}
      </Typography>
    </div>
  );
};

export default NoResults;
