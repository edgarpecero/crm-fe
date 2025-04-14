'use client';

import React, { useState, useRef } from 'react';
import { Button, CircularProgress, Box, Typography, IconButton } from '@mui/material';
import { Upload, CheckCircle, Cancel } from '@mui/icons-material';
import axios, { AxiosProgressEvent } from 'axios';

interface FileUploadButtonProps {
  presignedUrl: string;
  onUploadSuccess?: (file: File) => void;
  onUploadError?: (error: unknown) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  presignedUrl,
  onUploadSuccess,
  onUploadError,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploading(true);
    setError(null);
    setProgress(0);
    setUploadComplete(false);

    try {
      const config = {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type || 'application/octet-stream',
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
          setProgress(percentCompleted);
        },
      };

      const response = await axios.put(presignedUrl, file, config);
      if (response.status === 200) {
        onUploadSuccess?.(file);
        setUploading(false);
        setUploadComplete(true);
      }
    } catch (err) {
      setError('Error al subir el archivo');
      setUploading(false);
      setUploadComplete(false);
      onUploadError?.(err);
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const handleClearFile = () => {
    setFileName(null);
    setUploadComplete(false);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept='*/*'
      />
      <Button
        type='button'
        variant='contained'
        startIcon={uploading ? <CircularProgress size={20} /> : <Upload />}
        onClick={handleButtonClick}
        disabled={uploading}
        sx={{
          minWidth: 200,
          py: 1.5,
          backgroundColor: uploading ? 'grey.400' : 'primary.main',
          '&:hover': {
            backgroundColor: uploading ? 'grey.400' : 'primary.dark',
          },
        }}
      >
        {uploading ? `Subiendo ${progress}%` : 'Subir archivo'}
      </Button>

      {/* Mostrar el nombre del archivo a la derecha */}
      {fileName && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, maxWidth: 300 }}>
          <Typography
            variant='body2'
            sx={{
              flex: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: error ? 'error.main' : uploadComplete ? 'success.main' : 'text.primary',
            }}
          >
            {fileName}
          </Typography>
          {uploadComplete && !error && <CheckCircle fontSize='small' color='success' />}
          {(fileName || error) && (
            <IconButton size='small' onClick={handleClearFile}>
              <Cancel fontSize='small' />
            </IconButton>
          )}
        </Box>
      )}

      {/* Mostrar error si no hay nombre de archivo */}
      {error && !fileName && (
        <Typography color='error' variant='body2'>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileUploadButton;
