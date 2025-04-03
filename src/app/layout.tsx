import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/styles/Theme';
import ClientQueryProvider from '@/context/ClientQueryProvider/ClientQueryProvider';
import { GlobalModalProvider } from '@/context/GlobalModalContext/GlobalModalContext';
import ClientLayout from './(clientlayout)/ClientLayout';

export const metadata: Metadata = {
  title: 'Prime Car App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={`roboto.variable`}>
        <ThemeProvider theme={theme}>
          <ClientQueryProvider>
            <InitColorSchemeScript attribute='class' />
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <GlobalModalProvider>
                <CssBaseline />
                <ClientLayout>{children}</ClientLayout>
              </GlobalModalProvider>
            </AppRouterCacheProvider>
          </ClientQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
