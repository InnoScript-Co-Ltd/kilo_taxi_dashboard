export const env = ["https://localhost:7181/api/v1"];

export const drawerWidth: number = 300;

export const keys = {
  API_TOKEN: "TOKEN",
  USER: "USER",
  PERMISSION: "PERMISSION",
  ROLE: "ROLE",
  LANGUAGE: "LANGUAGE",
};

// export interface NotificationOptions {
//   variant: VariantType; // "success" | "error" | "warning" | "default" | "info"
//   msg: string;
//   show: false;
// }

// export const notificationOptions: NotificationOptions = {
//   variant: "info",
//   msg: "",
//   show: false,
// };

export interface HTTPResponse {
  status: number;
  statusText: string;
  data: any;
}

export interface HTTPErrorResponse {
  message: string;
  status: number;
  notification?: {
    show: boolean;
    msg: string;
    variant: string;
  };
  error?: any | null;
}

interface Paginate_Options {
  rows: number;
  rowsPerPageOptions: Array<number>;
  total: number;
}

export const paginateOptions: Paginate_Options = {
  rows: 10,
  rowsPerPageOptions: [10, 50, 100, 150, 500, 1000],
  total: 0,
  // paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
  // currentPageReportTemplate: "{first} to {last} of {totalRecords}",
  // paginatorLeft: paginatorLeft,
  // sortMode: "single",
  // resizableColumns: true,
  // lazy: true
};

export const statusOptions = [
  { id: 1, status: "Active", color: "success" },
  { id: 1, status: "Disable", color: "secondary" },
  { id: 1, status: "Deactivate", color: "secondary" },
  { id: 1, status: "Deleted", color: "error" },
  { id: 1, status: "Pending", color: "primary" },
  { id: 1, status: "BLOCK", color: "error" },
  { id: 1, status: "COMPLETE", color: "success" },
  { id: 3, status: "Male", color: "secondary" },
  { id: 1, status: "Female", color: "primary" },
  { id: 1, status: "Other", color: "error" },
];

export const genderStatuslists = [
  { id: 1, value: "Male", color: "success" },
  { id: 2, value: "Female", color: "secondary" },
  { id: 3, value: "Undefined", color: "primary" },
];

export const otpStatusLists = [
  { id: 1, value: "Pending", color: "info" },
  { id: 2, value: "Success", color: "success" },
  { id: 3, value: "Expired", color: "secondary" },
];

export const otpTypeStatusLists = [
  { id: 1, value: "AccountOpen", color: "info" },
  { id: 2, value: "ResetPassword", color: "primary" },
  { id: 3, value: "AccountCancellation", color: "error" },
];

export const generalStatusLists = [
  { id: 1, value: "ACTIVE", color: "success" },
  { id: 2, value: "Disable", color: "secondary" },
  { id: 3, value: "Deleted", color: "error" },
];

export const paymentStatusLists = [
  { id: 1, value: "Wallet", color: "success" },
  { id: 2, value: "BankAccount", color: "secondary" },
  { id: 3, value: "MupCard", color: "info" },
  { id: 4, value: "VisaMaster", color: "primary" },
];

export const paymentTypeStatusLists = [
  { id: 1, value: "Cash", color: "success" },
  { id: 2, value: "Wallet", color: "info" },
  { id: 3, value: "OnlinePayment", color: "primary" },
];

export const shceduleOrderStatusLists = [
  { id: 1, value: "Active", color: "success" },
  { id: 1, value: "Approved", color: "info" },
  { id: 1, value: "Cancel", color: "secondary" },
];

export const customerStatusLists = [
  { id: 1, value: "Pending", color: "secondary" },
  { id: 2, value: "Active", color: "success" },
  { id: 3, value: "Deactivate", color: "warning" },
  { id: 4, value: "Suspended", color: "error" },
];

export const notiTypeStatusLists = [
  { id: 1, value: "System", color: "info" },
  { id: 1, value: "Alert", color: "warning" },
  { id: 1, value: "Promotion", color: "primary" },
  { id: 1, value: "Announcement", color: "success" },
  { id: 1, value: "Other", color: "secondary" },
];

export const smsStatusLists = [
  { id: 1, value: "Pending", color: "secondary" },
  { id: 2, value: "Delivered", color: "primary" },
  { id: 3, value: "Fail", color: "error" },
];

export const walletTypeStatusLists = [
  { id: 1, value: "Customer", color: "primary" },
  { id: 2, value: "Driver", color: "info" },
  { id: 3, value: "VipCustomer", color: "success" },
];

export const kiloTypeLists = [
  { id: 1, value: "Normal", color: "primary" },
  { id: 1, value: "KiloPlus", color: "success" },
];

export const promoStatusLists = [
  { id: 1, value: "Expired", color: "error" },
  { id: 2, value: "Used", color: "info" },
  { id: 3, value: "Active", color: "success" },
  { id: 4, value: "Reject", color: "error" },
];

export const notiStatusLists = [
  { id: 1, value: "Delivered", color: "info" },
  { id: 2, value: "Read", cplor: "primary" },
  { id: 3, value: "Fail", color: "error" },
];

export const kycStatusLists = [
  { id: 1, value: "Pending", color: "secondary" },
  { id: 2, value: "FullKyc", color: "success" },
  { id: 3, value: "Reject", color: "error" },
];

export const driverStatusLists = [
  { id: 1, value: "Pending", color: "secondary" },
  { id: 2, value: "Active", color: "success" },
  { id: 3, value: "Deactivate", color: "warning" },
  { id: 4, value: "Suspend", color: "error" },
];

export const vehicleStatusLists = [
  { id: 1, value: "Active", color: "success" },
  { id: 2, value: "Suspend", color: "error" },
];

export const walletStatusLists = [
  { id: 1, value: "ACTIVE", color: "success" },
  { id: 2, value: "DISABLED", color: "secondary" },
];

export const topUpTransactionStatus = [
  { id: 1, value: "Pending", color: "secondary" },
  { id: 2, value: "Success", color: "success" },
  { id: 3, value: "Reject", color: "error" },
];

export const orderStatusLists = [
  { id: 1, value: "Active", color: "info" },
  { id: 2, value: "Success", color: "success" },
  { id: 3, value: "Reject", color: "error" },
];
