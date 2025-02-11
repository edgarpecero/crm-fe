'use client';

import { createTheme } from '@mui/material/styles';
import Clear from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

declare module '@mui/material/styles' {
  interface Palette {
    dark: Palette['primary'];
    purple: Palette['primary'];
  }
  interface PaletteOptions {
    dark?: PaletteOptions['primary'];
    purple?: PaletteOptions['primary'];
  }
  interface Theme {
    hideShowOnHover?: {
      opacity: number;
      transition: string;
      '&:hover': {
        opacity: number;
      };
    };
  }
  interface ThemeOptions {
    hideShowOnHover?: {
      opacity: number;
      transition: string;
      '&:hover': {
        opacity: number;
      };
    };
  }
}

// Update component's color prop options
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    dark: true;
  }
  interface ChipPropsVariantOverrides {
    cellRender: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    dark: true;
  }
}
// export const theme = createTheme({});
export const theme = createTheme({
  // cssVariables: true,
  palette: {
    primary: {
      main: '#1626BA',
      dark: '#111574',
      light: '#2333CB',
    },
    secondary: {
      main: '#1EBB8C',
      light: '#D7F1E9',
    },
    error: {
      main: '#D9244F',
      light: '#e97b95',
    },
    warning: {
      main: '#D6A11C',
      // yellow
      light: '#FFF7D9',
    },
    common: {
      black: 'rgba(0, 0, 0, 0.5)',
    },
    success: {
      main: '#3E972F',
      light: '#DCEED9',
      dark: '#18D6A5',
    },
    info: {
      main: '#1EBB8C',
      contrastText: '#FFF',
      // light turquoise
      light: '#E8FBF6',
    },
    dark: {
      main: '#111574',
      dark: '#1626BA',
      contrastText: '#FFF',
      light: '#333',
    },
    purple: {
      main: '#70299B',
      light: '#F0D8FF',
      contrastText: '#FFF',
    },
    grey: {
      900: '#07071E', // black
      800: '#80809A', // Mid Grey
      700: '#A7A7C2', // Hue Grey
      600: '#CBD3EE', // Light Blue
      500: '#E4E5EE', // Light Grey
      400: '#EDEEF5', // Dividers
      300: '#F6F7FB', // Background Grey
      200: '#DFF2DC', // Light Green
      50: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontWeightRegular: 500,
    fontSize: 12,
    h1: {
      fontWeight: 700,
      fontSize: '32px',
      lineHeight: '150%',
    },
    h2: {
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '150%',
    },
    h3: {
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '150%',
    },
    h4: {
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
    },
    body1: {
      // text
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
    },
    h5: {
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '19.8px',
    },
    body2: {
      // input
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '165%',
    },
    subtitle1: {
      // small title
      fontWeight: 600,
      fontSize: '11px',
      lineHeight: '165%',
    },
    caption: {
      // subtext
      fontWeight: 400,
      fontSize: '11px',
      lineHeight: '165%',
    },
    button: {
      fontWeight: 700,
      fontSize: '11px',
      letterSpacing: '0.46',
    },
  },
  // ... other theme settings
  hideShowOnHover: {
    opacity: 0,
    transition: 'opacity 0.2s',
    '&:hover': {
      opacity: 1,
    },
  },
});

theme.components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        fontFamily: roboto.style.fontFamily,
        scrollbarColor: theme.palette.grey[500],
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          backgroundColor: theme.palette.grey[500],
          width: '6px',
          height: '10px',
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          borderRadius: 8,
          backgroundColor: theme.palette.primary.main,
          minHeight: 24,
          border: `3px solid ${theme.palette.primary.main}`,
        },
        '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
          backgroundColor: theme.palette.primary.light,
        },
        '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
          backgroundColor: theme.palette.primary.light,
        },
        '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.primary.light,
        },
        '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
          backgroundColor: theme.palette.grey[500],
        },
        '& input::-webkit-search-decoration, & input::-webkit-search-cancel-button, & input::-webkit-search-results-button, & input::-webkit-search-results-decoration':
          {
            WebkitAppearance: 'none',
          },
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderBottomWidth: 2,
      },
    },
  },
  MuiAlert: {
    defaultProps: {},
    styleOverrides: {
      standardError: {
        background: theme.palette.error.light,
        color: theme.palette.error.main,
      },
    },
  },
  MuiAutocomplete: {
    defaultProps: {
      popupIcon: <ExpandMoreIcon fontSize='large' />,
      ChipProps: {
        deleteIcon: <Clear />,
        color: 'info',
      },
      ListboxProps: {
        color: 'red',
      },
    },
    styleOverrides: {
      root: {
        fontSize: 13,
        '.MuiInputBase-root': {
          paddingRight: '40px !important',
        },
      },
      endAdornment: {
        top: 'unset',
      },
      popper: {
        '& .MuiAutocomplete-option': {
          color: theme.palette.grey[800],
          fontWeight: 500,
          lineHeight: '165%',
          fontSize: 12,
          margin: 0,
          padding: 0,
          wordBreak: 'break-word',
        },
      },
      inputRoot: {
        borderRadius: '5px',
      },
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      root: {
        fontSyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '150%',
        color: theme.palette.grey[800],
        '& .MuiTypography-body1': {
          fontSize: '14px',
          fontWeight: 600,
        },
        '& .MuiAutocomplete-endAdornment': {
          top: 0,
        },
      },
    },
  },
  // MuiButton: {
  //   variants: [
  //     {
  //       props: { variant: 'outlined' },
  //       style: {
  //         border: '2px solid ',
  //         '&:hover': {
  //           borderWidth: '2px',
  //         },
  //       },
  //     },
  //   ],
  //   defaultProps: {
  //     color: 'primary',
  //     variant: 'contained',
  //     size: 'small',
  //     disableElevation: true,
  //   },
  //   styleOverrides: {
  //     root: {
  //       alignItems: 'center',
  //       borderRadius: 8,
  //       display: 'flex',
  //       fontStyle: 'normal',
  //       fontWeight: 700,
  //       fontSize: 12,
  //       flexDirection: 'column',
  //       justifyContent: 'center',
  //       lineHeight: '22px',
  //       letterSpacing: '0.46px',
  //       margin: '0px',
  //     },
  //     sizeLarge: {
  //       height: 50,
  //       padding: '0px 14px',
  //     },
  //     sizeMedium: {
  //       height: 42,
  //       padding: '0px 11px',
  //     },
  //     sizeSmall: {
  //       height: 36,
  //       padding: '0px 16px',
  //     },
  //     colorInherit: {
  //       color: theme.palette.grey[800],
  //     },
  //   },
  // },
  MuiPaper: {
    styleOverrides: {
      root: {
        '& .MuiMenu-list': {
          padding: '0',
          '& li': {
            minHeight: '36px',
          },
        },
      },
    },
  },
  MuiChip: {
    variants: [
      {
        props: { variant: 'cellRender' },
        style: {
          color: 'black',
          fontWeight: 600,
          height: 26,
          '& .MuiSvgIcon-root': {
            width: '14px',
            height: '14px',
          },
        },
      },
    ],
    defaultProps: {
      deleteIcon: <Clear />,
    },
    styleOverrides: {
      root: {
        fontSyle: 'normal',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '165%',
      },
      colorInfo: {
        color: theme.palette.primary.main,
        background: theme.palette.grey[500],
        '& .MuiSvgIcon-root': {
          color: theme.palette.primary.main,
        },
        '&:hover': {
          backgroundColor: theme.palette.grey[600],
        },
      },
    },
  },
  // MuiDataGrid: {
  //   defaultProps: {
  //     rowHeight: 32,
  //     headerHeight: 36,
  //   },
  //   styleOverrides: {
  //     root: {
  //       height: '100% !important',
  //       fontWeight: '500',
  //       fontFamily: roboto.style.fontFamily,
  //       fontSize: '12px',
  //     },
  //     columnHeader: {
  //       fontWeight: '600',
  //     },
  //     columnHeaderTitle: {
  //       fontWeight: '600',
  //       fontSize: '12px',
  //     },
  //     cell: {
  //       '&:focus-within': {
  //         outline: 'unset',
  //       },
  //     },
  //   },
  // },
  MuiFormLabel: {
    styleOverrides: {
      asterisk: {
        color: theme.palette.error.main,
        '&$error': {
          color: theme.palette.error.main,
        },
      },
      root: {},
    },
  },
  MuiModal: {
    styleOverrides: {
      root: {
        boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.05)',
        borderRadius: '12px',
      },
    },
  },
  MuiInput: {
    styleOverrides: {
      root: {
        fontSize: '12px',
        borderColor: theme.palette.primary.main,
        '&:hover': {},
      },
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: {
        backgroundColor: 'blue',
      },
    },
  },
  MuiSnackbarContent: {
    styleOverrides: {
      root: {
        backgroundColor: 'black !important',
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      color: 'primary',
    },
    styleOverrides: {
      root: {
        fontSize: '12px',
        minHeight: 40,
        '& .MuiInputBase-input': {
          padding: '11px 15px !important',
          fontSize: 12,
          borderRadius: '5px',
        },
        '& .MuiFormHelperText-root': {
          fontSize: 12,
        },
        '& .MuiInputLabel-root': {
          fontWeight: 600,
          color: theme.palette.grey[700],
          fontSize: '11px',
          top: -3,
        },
        '& .MuiInputLabel-shrink': {
          fontSize: '14px',
          top: 0,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderWidth: 2,
            borderRadius: '8px',
            borderColor: theme.palette.grey[500],
          },
        },
        '& .MuiFormHelperText-root.Mui-error': {
          fontSize: 10,
        },
        '& .Mui-disabled': {
          color: theme.palette.grey[800],
          '-webkit-text-fill-color': theme.palette.grey[800],
          opacity: 0.75,
          cursor: 'not-allowed',
          '& fieldset, .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[500],
          },
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        background: 'rgba(7, 7, 30, 0.9)',
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginTop: 0,
        height: 0,
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      flexContainer: {
        backgroundColor: 'transparent',
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontStyle: 'normal',
        color: '#030614',
        margin: 0,
        fontFamily: roboto.style.fontFamily,
      },
    },
  },
};
