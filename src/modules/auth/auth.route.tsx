import { paths } from "../../constants/paths";
import Login from "./view/Login";


export const AuthRoute = [
    {
      id: "auth",
      path: paths.authLogin, // Ensure this is defined in your paths constant
      element: <Login />, // This is where your wallet table or list component will be rendered
    },
  ];