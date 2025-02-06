import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { navigationList } from "../defaultPaths";
import { Outlet, useLocation, useNavigate } from "react-router";
import { green, grey, indigo, orange, red, yellow } from "@mui/material/colors";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ToolBar from "./ToolBar";

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
          main: green[500],
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
      main: green[500],
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red[500],
    },
    info: {
      main: indigo[500],
    },
    warning: {
      main: yellow[500],
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

export default function BrandLayout() {
  const [pathname, setPathname] = React.useState("/");
  const navigate = useNavigate();
  const location = useLocation();

  // Handler to navigate, supporting `string | URL`
  const handleNavigation = React.useCallback(
    (path: string | URL) => {
      const pathString = typeof path === "string" ? path : path.toString();
      const normalizedPath = pathString.startsWith("/")
        ? pathString.slice(1)
        : pathString;

      const item = navigationList.find((nav) => nav.segment === normalizedPath);

      if (item?.isParent) {
        const newPath = `/${normalizedPath}/list`;
        console.log(newPath);

        if (pathname !== newPath) {
          navigate(newPath);
          setPathname(newPath);
        }
      } else {
        if (pathname !== pathString) {
          navigate(pathString);
          setPathname(pathString);
        }
      }
    },
    [pathname, navigate] // Add dependencies here
  );

  const router = React.useMemo(
    () => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (url: string | URL) => {
        const pathString = typeof url === "string" ? url : url.toString();
        handleNavigation(pathString);
      },
    }),
    [location.pathname, location.search, handleNavigation]
  );

  const memoizedNavigationList = React.useMemo(() => navigationList, []);
  const memoizedTheme = React.useMemo(() => demoTheme, []);
  const slots = React.useMemo(
    () => ({
      toolbarActions: ToolBarActions,
      toolbarAccount: ToolBar,
    }),
    []
  );

  return (
    // preview-start
    <AppProvider
      navigation={memoizedNavigationList}
      router={router}
      theme={memoizedTheme}
      branding={BRANDING}
    >
      <DashboardLayout slots={slots}>
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
