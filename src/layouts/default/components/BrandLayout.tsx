import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import type { Router } from "@toolpad/core";
import { navigationList } from "../defaultPaths";
import { Outlet, useNavigate } from "react-router";
import { green, grey, indigo, orange, red, yellow } from "@mui/material/colors";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: true,
    dark: {
      // Customize the dark theme colors
      palette: {
        mode: "dark",
        primary: {
          main: orange[400],
        },
        success: {
          main: green[500]
        },
        secondary: {
          main: grey[500],
        },
        background: {
          default: "#121212", // Dark background color
          paper: "#1D1D1D", // Darker paper color for cards
        },
        text: {
          primary: "#FFFFFF", // Main text color in dark mode
          secondary: "#B3B3B3", // Secondary text color
        },
        divider: "rgba(255, 255, 255, 0.12)", // Divider color
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: orange[400],
    },
    success: {
      main: green[500]
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red[500]
    },
    info: {
      main: indigo[500]
    },
    warning: {
      main: yellow[500]
    },
  },
});

function Main({ pathname }: { pathname: string }) {
  let list = [];
  const formatted = pathname.split("/").filter(Boolean); // Split by '/' and filter out empty values
  list.push(...formatted); // Push the elements into the array

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <NotificationsProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Outlet />
        </LocalizationProvider>
      </NotificationsProvider>
    </Box>
  );
}

const BRANDING = {
  title: "",
  logo: <img src="/logo.png" alt="Logo" />,
};

function ToolBarActions() {
  return (
    <React.Fragment>
      <Box>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
      </Box>
    </React.Fragment>
  );
}

function ToolBarAccount() {
  return (
    <React.Fragment>
      <Box>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </Box>
    </React.Fragment>
  );
}

export default function BrandLayout() {
  const [pathname, setPathname] = React.useState("/");
  const navigate = useNavigate();

  // Handler to navigate only if item is not a parent
  const handleNavigation = (path: string) => {
    // Remove leading slash from path if it exists, to normalize
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

    let item = navigationList.find((nav) => nav.segment === normalizedPath);

    if (item?.isParent) {
      // If the item is a parent, redirect to the corresponding child path
      const newPath = `${normalizedPath}/list`; // Construct new path
      setPathname(newPath); // Update the pathname to redirect to child
    } else {
      setPathname(path); // Set the pathname for non-parent items
    }
  };

  // Define router object with matching types
  const router = React.useMemo<Router>(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: any) => handleNavigation(path),
    }),
    [pathname]
  );

  React.useEffect(() => {
    navigate(pathname);
  }, [pathname, navigate]);

  return (
    // preview-start
    <AppProvider
      navigation={navigationList}
      router={router}
      theme={demoTheme}
      branding={BRANDING}
    >
      <DashboardLayout
        slots={{
          toolbarActions: ToolBarActions,
          toolbarAccount: ToolBarAccount,
        }}
      >
        <Main pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
