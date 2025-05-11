// export const env = [process.env.REACT_APP_BASE_URL];
// export const env = ["https://localhost:7181/api/v1"];
// export const env = ["http://localhost:5112/api/v1"];
export const env = ["http://4.145.92.57:81/api/v1"];

// export const hadUrl =
// process.env.REACT_APP_HAD_URL || "https://localhost:7044/dashboard";

// export const env = ["http://4.145.92.57:81/api/v1"];
export const hadUrl = "http://4.145.92.57:83/dashboard";

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
  { id: 14, status: "CASH", background: "#4CAF50", color: "#000" },
  { id: 15, status: "BANkTRANSFER", background: "#4CAF50", color: "#000" },
  { id: 16, status: "ONLINEPAYMENT", background: "#4CAF50", color: "#000" },
];

export const genderStatuslists = [
  { id: 0, value: "MALE" },
  { id: 1, value: "FEMALE" },
];

export const propertyStatusLists = [
  { id: 0, value: "CAROWNER", color: "success" },
  { id: 1, value: "RENT", color: "success" },
];
export const commissionTypeLists = [
  { id: 0, value: "PERCENTAGE", color: "success" },
  { id: 1, value: "FIXAMOUNT", color: "success" },
];

export const otpStatusLists = [
  { id: 0, value: "PENDING", color: "info" },
  { id: 1, value: "SUCCESS", color: "success" },
  { id: 2, value: "EXPIRED", color: "secondary" },
];

export const otpTypeStatusLists = [
  { id: 0, value: "ACCOUNTOPEN", color: "info" },
  { id: 1, value: "RESETPASSWORD", color: "primary" },
  { id: 2, value: "ACCOUNTCANCELLATION", color: "error" },
];

export const generalStatusLists = [
  { id: 0, value: "ACTIVE", color: "success" },
  { id: 1, value: "DISABLE", color: "secondary" },
  { id: 2, value: "DELETED", color: "error" },
];

export const paymentStatusLists = [
  { id: 0, value: "WALLET", color: "success" },
  { id: 1, value: "BANKACCOUNT", color: "secondary" },
  { id: 2, value: "MUPCARD", color: "info" },
  { id: 3, value: "VISAMASTER", color: "primary" },
];

export const paymentTypeStatusLists = [
  { id: 0, value: "CASH", color: "success" },
  { id: 1, value: "BANkTRANSFER", color: "success" },
  { id: 2, value: "ONLINEPAYMENT", color: "success" },
];

export const scheduleOrderStatusLists = [
  { id: 0, value: "ACTIVE", color: "success" },
  { id: 1, value: "APPROVED", color: "info" },
  { id: 2, value: "CANCEL", color: "secondary" },
];

export const customerStatusLists = [
  { id: 0, value: "PENDING" },
  { id: 1, value: "ACTIVE" },
  { id: 2, value: "DEACTIVE" },
  { id: 3, value: "SUSPENDED" },
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
  { id: 0, value: "CUSTOMER", color: "primary" },
  { id: 1, value: "DRIVER", color: "info" },
  { id: 2, value: "VIPCUSTOMER", color: "success" },
];
export const WithDrawStatuLists = [
  { id: 0, value: "PENDING", color: "primary" },
  { id: 1, value: "REJECTED", color: "info" },
  { id: 2, value: "COMPLETED", color: "success" },
];

export const kiloTypeLists = [
  { id: 0, value: "NORMAL", color: "primary" },
  { id: 1, value: "KILOPLUS", color: "success" },
];
export const promotionTypeLists = [
  { id: 0, value: "ALLCUSTOMER", color: "success" },
  { id: 1, value: "SPECIFICCUSTOMER", color: "success" },
];

export const promoStatusLists = [
  { id: 0, value: "ACTIVE", color: "success" },
  { id: 1, value: "USED", color: "info" },
  { id: 2, value: "EXPIRED", color: "error" },
  { id: 3, value: "REJECT", color: "error" },
];
export const applicableToLists = [
  { id: 0, value: "CUSTOMER", color: "success" },
  { id: 1, value: "DRIVER", color: "success" },
  { id: 2, value: "BOTH", color: "success" },
];

export const notiStatusLists = [
  { id: 0, value: "DELIVERED", color: "info" },
  { id: 1, value: "READ", cplor: "primary" },
  { id: 2, value: "FAIL", color: "error" },
];

export const kycStatusLists = [
  { id: 0, value: "PENDING", color: "secondary" },
  { id: 1, value: "FULLKYC", color: "success" },
  { id: 2, value: "REJECT", color: "error" },
];
export const driverModeLists = [
  { id: 0, value: "AVAILABLE", color: "success" },
  { id: 1, value: "OFFLINE", color: "danger" },
  { id: 2, value: "ENGAGED", color: "secondary" },
];
export const driverStatusLists = [
  { id: 0, value: "PENDING", color: "secondary" },
  { id: 1, value: "ACTIVE", color: "success" },
  { id: 2, value: "DEACTIVE", color: "warning" },
  { id: 3, value: "SUSPEND", color: "error" },
  { id: 4, value: "BUSY", color: "warning" },
  { id: 5, value: "OFFLINE", color: "danger" },
  { id: 6, value: "ONLINE", color: "success" },
];

export const vehicleStatusLists = [
  { id: 0, value: "ACTIVE", color: "success" },
  { id: 1, value: "SUSPEND", color: "error" },
];

export const walletStatusLists = [
  { id: 0, value: "ACTIVE", color: "success" },
  { id: 1, value: "DISABLE", color: "secondary" },
];

export const topUpTransactionStatus = [
  { id: 0, value: "PENDING", color: "secondary" },
  { id: 1, value: "SUCCESS", color: "success" },
  { id: 2, value: "REJECT", color: "error" },
];

export const orderStatusLists = [
  { id: 0, value: "PENDING", color: "success" },
  { id: 1, value: "COMPLETED", color: "error" },
  { id: 2, value: "CANCELLED", color: "info" },
  { id: 3, value: "INPROGRESS", color: "info" },
  { id: 4, value: "DRIVERACCEPTED", color: "info" },
  { id: 5, value: "WAITING", color: "info" },
];
export const orderTypeLists = [
  { id: 0, value: "INAPP", color: "success" },
  { id: 1, value: "INSTANT", color: "error" },
  { id: 2, value: "SCHEDULE", color: "info" },
];
export const roleLists = [
  { id: "SYSTEMADMIN", value: "SYSTEMADMIN", color: "success" },
  { id: "ADMIN", value: "ADMIN", color: "error" },
  { id: "ORDERADMIN", value: "ORDERADMIN", color: "info" },
  { id: "TOPUPADMIN", value: "TOPUPADMIN", color: "info" },
  { id: "WITHDRAWADMIN", value: "WITHDRAWADMIN", color: "info" },
  { id: "PROMOTIONADMIN", value: "PROMOTIONADMIN", color: "info" },
];
