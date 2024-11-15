
import { FlagCircle } from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


export const navigationList = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
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
      // {
      //   segment: 'new',
      //   title: 'Create',
      //   icon: <AddCircleOutlineIcon />,
      // },
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
  {
    segment: 'driver',
    title: 'Driver',
    isParent: true,
    icon: <PersonIcon  />,
    children: [
      {
        segment: 'list',
        title: 'List',
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: 'vehicle',
    title: 'Vehicle',
    isParent: true,
    icon: <DirectionsCarIcon  />,
    children: [
      {
        segment: 'list',
        title: 'List',
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: 'wallet',
    title: 'Wallet',
    isParent: true,
    icon: <AccountBalanceWalletIcon  />,
    children: [
      {
        segment: 'list',
        title: 'List',
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
]