"use client";

import React from 'react';
import { useModalState } from '@/context/GlobalModalContext/GlobalModalContext';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const GlobalModal = () => {
  // important to extract body and title from modalProps
  const { body, title, ...rest } = useModalState();
  return (
    <Modal
      {...rest}
      aria-labelledby="modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: title ? 'space-between' : 'flex-end',
          alignItems: 'center',
          mb: 2
        }}>
          {title && (
            <Typography id="modal-title" variant="h4" component="h2">
              {title}
            </Typography>
          )}
          <IconButton
            onClick={rest.onClose}
            aria-label="cerrar"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box id="modal-description">{body}</Box>
      </Box>
    </Modal>
  );
};