import * as React from 'react';
import { styled } from '@mui/material/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

interface CustomizedAccordionProps extends AccordionProps {
  children: React.ReactNode;
  summary: string;
  defaultExpanded?: boolean;
}
export default function CustomizedAccordion({
  children,
  summary,
  defaultExpanded = true,
  ...rest // Capture other AccordionProps
}: CustomizedAccordionProps) {
  return (
    <Accordion defaultExpanded={defaultExpanded} {...rest}>
      <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
        <Typography variant='h3' pl={2}>
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} sx={{ ...props.sx, mb: 2 }} />
))(() => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandLessIcon className='custom-expand-icon' sx={{ fontSize: '1.5rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.grey[700]}`,
  borderRadius: '8px 8px 0 0',
  transition: 'border-color 0.3s ease',

  [`&:hover`]: {
    borderBottomColor: theme.palette.primary.main,

    [`& .custom-expand-icon`]: {
      color: theme.palette.primary.main,
      transform: 'scale(1.1)',
      transition: 'color 0.3s ease, transform 0.3s ease',
    },
  },

  [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.2s ease',
  },

  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(180deg)',
  },

  [`& .${accordionSummaryClasses.content}`]: {
    marginRight: theme.spacing(1),
  },

  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[300],
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '32px 0 24px 0',
}));
