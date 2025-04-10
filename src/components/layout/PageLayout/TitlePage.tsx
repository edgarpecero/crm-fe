import { capitalizeFirstLetter } from '@/helpers/utils';
import { PageActionsEnum } from '@/types/enums';
import { Typography, TypographyProps } from '@mui/material';

interface TitlePageProps extends TypographyProps {
  title: string;
}

function TitlePage({ title, ...rest }: TitlePageProps) {
  return (
    <>
      {title && (
        <Typography {...rest} variant={rest?.variant || 'h2'} textAlign={'center'} pb={2}>
          {(title || capitalizeFirstLetter(PageActionsEnum.CREATE)).toUpperCase()}
        </Typography>
      )}
    </>
  );
}

export default TitlePage;
