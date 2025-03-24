import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Breakpoint,
  DialogTitleProps,
  styled,
  IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';

export type ActionButtons = {
  children: React.ReactNode;
  id?: string;
  buttonProps: ButtonProps;
};

export type ActionModalProps = {
  title: string;
  open: boolean;
  actionButtons?: ActionButtons[];
  children: React.ReactNode;
  onClose?: () => void;
  size?: Breakpoint;
};

interface ModalTitleProps extends DialogTitleProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const ModalTitle = styled(({ children, onClose, ...other }: ModalTitleProps) => (
  <DialogTitle
    typography={'h2'}
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '32px 24px 16px 24px',
      gap: 2,
      alignItems: 'flex-start',
      whiteSpace: 'pre-line',
    }}
    {...other}
  >
    {children}
    {onClose && (
      <IconButton aria-label='close-modal' onClick={onClose}>
        <ClearIcon sx={{ width: '30px', height: '30px' }} />
      </IconButton>
    )}
  </DialogTitle>
))(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    padding: theme.spacing(2),
  },
  '& .MuiTypography-root': {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '150%',
  },
  '& .MuiButtonBase-root': {
    padding: 0,
    color: '#07071E',
  },
}));

const ModalActions = styled(DialogActions)(({ theme }) => ({
  padding: '0px 32px 32px',
  display: 'flex',
  gap: 16,
}));

const ActionModal = ({
  title,
  open,
  actionButtons = [],
  children,
  onClose,
  size = 'sm',
}: ActionModalProps) => (
  <Dialog
    open={open}
    maxWidth={size}
    fullWidth={true}
    aria-describedby='alert-dialog-slide-description'
    PaperProps={{ sx: { borderRadius: '16px' } }}
  >
    <ModalTitle onClose={onClose}>{title}</ModalTitle>
    {children ? (
      <DialogContent sx={{ p: '32px', pt: '2px !important' }}>{children}</DialogContent>
    ) : null}
    <ModalActions>
      {actionButtons.map((button, index) => (
        <Button
          key={`${title}-action-button-${index}`}
          value={index}
          fullWidth={actionButtons.length === 2 ? true : false}
          {...button.buttonProps}
        >
          {button.children}
        </Button>
      ))}
    </ModalActions>
  </Dialog>
);

export default React.memo(ActionModal);
