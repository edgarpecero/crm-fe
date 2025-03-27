'use client';

import React, { cloneElement } from 'react';
import { useModalState } from '@/context/GlobalModalContext/GlobalModalContext';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const GlobalModal = () => {
  // important to extract body and title from modalProps
  const { body, title, initialData, ...rest } = useModalState();
  const enhancedBody =
    body && React.isValidElement(body)
      ? //eslint-disable-next-line @typescript-eslint/no-explicit-any
        cloneElement(body, { initialData: initialData } as any)
      : body;
  return (
    <Modal {...rest} aria-labelledby='modal-title'>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: title ? 'space-between' : 'flex-end',
            alignItems: 'center',
            mb: 2,
          }}
        >
          {title && (
            <Typography id='modal-title' variant='h4' component='h2'>
              {title}
            </Typography>
          )}
          <IconButton onClick={rest.onClose} aria-label='cerrar'>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box id='modal-description'>{enhancedBody}</Box>
      </Box>
    </Modal>
  );
};
