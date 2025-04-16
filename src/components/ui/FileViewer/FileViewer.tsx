'use client';

import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Link } from '@mui/material';
import { Description } from '@mui/icons-material';

interface FileViewerProps {
  presignedUrl: string;
  text?: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ presignedUrl, text }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    if (!presignedUrl) {
      setFileType(null);
      setLoading(false);
      return;
    }

    const determineFileType = () => {
      try {
        const extension = presignedUrl.split('.').pop()?.toLowerCase();
        switch (extension) {
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'gif':
            return 'image';
          case 'pdf':
            return 'pdf';
          case 'txt':
            return 'text';
          default:
            return 'unknown';
        }
      } catch (err) {
        console.error('Error al determinar el tipo de archivo:', err);
        setError('Error al determinar el tipo de archivo');
        return null;
      }
    };

    setLoading(true);
    const type = determineFileType();
    setFileType(type);
    setLoading(false);
  }, [presignedUrl]);

  const renderFile = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Typography color='error' variant='body2'>
          {error}
        </Typography>
      );
    }

    switch (fileType) {
      case 'image':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <img
              src={presignedUrl}
              alt='Archivo subido'
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            /> */}
          </Box>
        );
      case 'pdf':
        return (
          <Box sx={{ width: '100%', maxWidth: '800px' }}>
            <iframe
              src={presignedUrl}
              style={{ width: '100%', border: 'none', borderRadius: '8px' }}
              title='Visor de PDF'
            />
          </Box>
        );
      case 'text':
        return (
          <Box
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
              maxHeight: '500px',
              overflow: 'auto',
              bgcolor: 'grey.50',
            }}
          >
            <Typography variant='body2'>
              Visualización de texto no implementada aún.{' '}
              <Link href={presignedUrl} target='_blank' rel='noopener noreferrer'>
                Descargar archivo de texto
              </Link>
            </Typography>
          </Box>
        );
      default:
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Description color='action' />
            <Link
              href={presignedUrl}
              target='_blank'
              rel='noopener noreferrer'
              sx={{ textDecoration: 'none', color: 'primary.main' }}
            >
              {text || 'Ver archivo'}
            </Link>
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {renderFile()}
    </Box>
  );
};

export default FileViewer;
