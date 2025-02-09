'use client';

import NavDrawer from "@/components/layout/NavDrawer/NavDrawer";
import { theme } from "@/styles/Theme";
import { ThemeProvider } from "@mui/material";
import { PropsWithChildren, useState } from "react";

const ClientLayout = ({ children }: PropsWithChildren) => {
  const [isNavDrawerOpen, setNavDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setNavDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setNavDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavDrawer open={isNavDrawerOpen} onClose={handleDrawerClose} onOpen={handleDrawerOpen} />
      {children}
    </ThemeProvider>
  );
}

export default ClientLayout;
