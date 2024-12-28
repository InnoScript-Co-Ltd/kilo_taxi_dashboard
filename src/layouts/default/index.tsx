import React, { useEffect } from "react";
import BrandLayout from "./components/BrandLayout";
import { useLocation, useNavigate } from "react-router";
import { keys } from "../../constants/config";
import { getData } from "../../helpers/localStorage";
// import Notification from "../../components/Notification"

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = getData(keys.API_TOKEN);

  const authRedirect = React.useCallback(async () => {

    if(token && location.pathname === '/') {
      navigate('/dashboard');
    }

    if (!token) {
      navigate("/auth/login");
    }
  }, [token, location, navigate]);

  React.useEffect(() => {
    console.log("Token:", token);
    console.log("Current Path:", location.pathname);
    authRedirect();
  }, [authRedirect]);

  return (
    <>
      <BrandLayout />
    </>
  );
};

export default DefaultLayout; // Export it as default
