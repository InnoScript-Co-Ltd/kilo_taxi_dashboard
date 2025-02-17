// export const env = [process.env.REACT_APP_BASE_URL];
// export const env = ["http://localhost:5112/api/v1"];

// export const hadUrl = process.env.REACT_APP_HAD_URL || "https://localhost:7044/dashboard";

export const env = ["http://4.145.97.143:81/api/v1"];
export const hadUrl = "http://4.145.97.143:81/dashboard";

export const drawerWidth: number = 300;

export const keys = {
  API_TOKEN: "TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
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

export interface StatusOption {
  id: number;
  status: string;
  background: string;
  color: string;
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

export const statusOptions: Array<StatusOption> = [
  { id: 1, status: "ACTIVE", background: "#4CAF50", color: "#000" },
  { id: 2, status: "DISABLE", background: "secondary", color: "#000" },
  { id: 3, status: "DEACTIVE", background: "#F44336", color: "#000" },
  { id: 4, status: "DELETED", background: "error", color: "#000" },
  { id: 5, status: "PENDING", background: "#FFA726", color: "#000" },
  { id: 6, status: "BLOCK", background: "error", color: "#000" },
  { id: 7, status: "COMPLETE", background: "success", color: "#000" },
  { id: 10, status: "OTHER", background: "error", color: "#000" },
  { id: 11, status: "UNDEFINED", background: "error", color: "#000" },
  { id: 12, status: "SUSPENDED", background: "error", color: "#000" },
  { id: 13, status: "FULLKYC", background: "error", color: "#000" },
];

export const genderStatuslists = [
  { id: "male", value: "MALE" },
  { id: "female", value: "FEMALE" },
];

export const propertyStatusLists = [
  { id: 0, value: "CarOwner", color: "success" },
  { id: 1, value: "Rent", color: "success" },
];

export const otpStatusLists = [
  { id: 0, value: "Pending", color: "info" },
  { id: 1, value: "Success", color: "success" },
  { id: 2, value: "Expired", color: "secondary" },
];

export const otpTypeStatusLists = [
  { id: 0, value: "AccountOpen", color: "info" },
  { id: 1, value: "ResetPassword", color: "primary" },
  { id: 2, value: "AccountCancellation", color: "error" },
];

export const generalStatusLists = [
  { id: 0, value: "Active", color: "success" },
  { id: 1, value: "Disable", color: "secondary" },
  { id: 2, value: "Deleted", color: "error" },
];

export const paymentStatusLists = [
  { id: 0, value: "Wallet", color: "success" },
  { id: 1, value: "BankAccount", color: "secondary" },
  { id: 2, value: "MupCard", color: "info" },
  { id: 3, value: "VisaMaster", color: "primary" },
];

export const paymentTypeStatusLists = [
  { id: 0, value: "CASH", color: "success" },
  { id: 1, value: "BANkTRANSFER", color: "success" },
  { id: 2, value: "ONLINEPAYMENT", color: "success" },
];

export const scheduleOrderStatusLists = [
  { id: 0, value: "Active", color: "success" },
  { id: 1, value: "Approved", color: "info" },
  { id: 2, value: "Cancel", color: "secondary" },
];

export const customerStatusLists = [
  { id: "pending", value: "PENDING" },
  { id: "active", value: "ACTIVE" },
  { id: "deactive", value: "DEACTIVE" },
  { id: "suspended", value: "SUSPENDED" },
];

export const notiTypeStatusLists = [
  { id: 0, value: "System", color: "info" },
  { id: 1, value: "Alert", color: "warning" },
  { id: 2, value: "Promotion", color: "primary" },
  { id: 3, value: "Announcement", color: "success" },
  { id: 4, value: "Other", color: "secondary" },
];

export const smsStatusLists = [
  { id: 0, value: "Pending", color: "secondary" },
  { id: 1, value: "Delivered", color: "primary" },
  { id: 2, value: "Fail", color: "error" },
];

export const walletTypeStatusLists = [
  { id: 0, value: "Customer", color: "primary" },
  { id: 1, value: "Driver", color: "info" },
  { id: 2, value: "VipCustomer", color: "success" },
];

export const kiloTypeLists = [
  { id: 0, value: "Normal", color: "primary" },
  { id: 1, value: "KiloPlus", color: "success" },
];
export const promotionTypeLists = [
  { id: 0, value: "AllCustomer", color: "success" },
  { id: 1, value: "SpecificCustomer", color: "success" },
];

export const promoStatusLists = [
  { id: 0, value: "Expired", color: "error" },
  { id: 1, value: "Used", color: "info" },
  { id: 2, value: "Active", color: "success" },
  { id: 3, value: "Reject", color: "error" },
];
export const applicableToLists = [
  { id: 0, value: "Customer", color: "success" },
  { id: 1, value: "Driver", color: "success" },
  { id: 2, value: "Both", color: "success" },
];

export const notiStatusLists = [
  { id: 0, value: "Delivered", color: "info" },
  { id: 1, value: "Read", cplor: "primary" },
  { id: 2, value: "Fail", color: "error" },
];

export const kycStatusLists = [
  { id: "pending", value: "PENDING", color: "secondary" },
  { id: "fullkyc", value: "FULLKYC", color: "success" },
  { id: "reject", value: "REJECT", color: "error" },
];
export const driverModeLists = [
  { id: 0, value: "Available", color: "success" },
  { id: 1, value: "Offline", color: "danger" },
  { id: 2, value: "Engaged", color: "secondary" },
];
export const driverStatusLists = [
  { id: 0, value: "Pending", color: "secondary" },
  { id: 1, value: "Active", color: "success" },
  { id: 2, value: "Deactivate", color: "warning" },
  { id: 3, value: "Suspend", color: "error" },
  { id: 4, value: "Busy", color: "warning" },
  { id: 5, value: "Offline", color: "danger" },
  { id: 6, value: "Online", color: "success" },
];

export const vehicleStatusLists = [
  { id: 0, value: "Active", color: "success" },
  { id: 1, value: "Suspend", color: "error" },
];

export const walletStatusLists = [
  { id: 0, value: "Active", color: "success" },
  { id: 1, value: "Disable", color: "secondary" },
];

export const topUpTransactionStatus = [
  { id: 0, value: "Pending", color: "secondary" },
  { id: 1, value: "Success", color: "success" },
  { id: 2, value: "Reject", color: "error" },
];

export const orderStatusLists = [
  { id: 0, value: "Completed", color: "success" },
  { id: 1, value: "Cancelled", color: "error" },
  { id: 2, value: "InProgress", color: "info" },
];
