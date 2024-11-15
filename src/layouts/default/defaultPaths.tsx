
import { FlagCircle } from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

export const navigationList = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'admin',
    title: 'Admin',
    isParent: true,
    icon: <AdminPanelSettingsIcon />,
    children: [
      {
        segment: 'list',
        title: 'List',
        icon: <FormatListBulletedIcon />,
      },
    ],
  },

  {
    segment: 'customer',
    title: 'Customer',
    isParent: true,
    icon: <RecentActorsIcon />,
    children: [
      {
        segment: 'list',
        title: 'List',
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: 'country',
    title: 'Country',
    isParent: true,
    icon: <FlagCircle />,
    children: [
      {
        segment: 'list',
        title: 'List',
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: 'state',
    title: 'State',
    isParent: true,
    icon: <PublicIcon  />,
    children: [
      {
        segment: 'list',
        title: 'List',
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
]