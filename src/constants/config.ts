export const env = [
  "http://localhost:5112/api/v1",
];

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
  { id : 1 , status: "Active", color: "success" },
  { id : 1 , status: "Disable", color: "secondary" },
  { id : 1 , status: "Deactivate", color: "secondary" },
  { id : 1 , status: "Deleted", color: "error" },
  { id : 1 , status: "Pending", color: "primary" },
  { id : 1 , status: "BLOCK", color: "error" },
  { id : 1 , status: "COMPLETE", color: "success" },
  { id : 3 , status: "Male", color: "secondary" },
  { id : 1 , status: "Female", color: "primary" },
  { id : 1 , status: "Other", color: "error" }
];

export const generalLists = [
  { id: 1, value: "MALE" },
  { id: 2, value: "FEMALE" },
  { id: 3, value: "OTHER" },
];

export const statusLists = [
  { id: 1, value: "ACTIVE" },
  { id: 2, value: "Deactivate" },
  { id: 3, value: "DISABLED" },
];

export const kycStatusLists = [
    { id: 1, value: "ACTIVE" },
    { id: 2, value: "PENDING" },
    { id: 3, value: "DISABLED" },
  ];
