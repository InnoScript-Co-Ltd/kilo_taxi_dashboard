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
  const location = window.location.pathname;

  // Handler to navigate, supporting `string | URL`
  const handleNavigation = (path: string | URL) => {
    const pathString = typeof path === "string" ? path : path.toString();
    const normalizedPath = pathString.startsWith("/") ? pathString.slice(1) : pathString;

    const item = navigationList.find((nav) => nav.segment === normalizedPath);
  
    if (item?.isParent) {
      const newPath = `/${normalizedPath}/list`;
      navigate(newPath);
      setPathname(newPath);
    } else {
      navigate(pathString);
      setPathname(pathString)
    }
  };

  // Define router object with matching types
  const router = React.useMemo<Router>(
    () => ({
      pathname: location, // Sync with current URL
      searchParams: new URLSearchParams(),
      navigate: (url: string | URL) => {
        const pathString = typeof url === "string" ? url : url.toString();
        handleNavigation(pathString);
      },
    }),
    [location]
  );

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
         <Box sx={{ width: "100%", padding: "20px" }}>
          <NotificationsProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Outlet />
            </LocalizationProvider>
          </NotificationsProvider>
        </Box>
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
