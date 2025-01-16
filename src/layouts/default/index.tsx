import React, { useCallback, useEffect } from "react";
import BrandLayout from "./components/BrandLayout";
import { useLocation, useNavigate } from "react-router";
import { keys } from "../../constants/config";
import { getData } from "../../helpers/localStorage";
import { authService } from "../../modules/auth/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { checkRefreshToken } from "../../shares/shareSlice";

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const token = getData(keys.API_TOKEN);
  const refToken = getData(keys.REFRESH_TOKEN);
  const checkRefresh = useSelector((state: any) => state.share.refreshToken);

  const authRedirect = React.useCallback(async () => {
    if (token && location.pathname === "/") {
      navigate("/dashboard");
    }

    if (!token) {
      navigate("/auth/login");
    }
  }, [token, location, navigate]);

  React.useEffect(() => {
    console.log("Token:", token);
    console.log("Refresh Token:", refToken);
    console.log("Current Path:", location.pathname);
    authRedirect();
  }, [authRedirect]);

  const refreshToken = useCallback(() => {
    if (checkRefresh) {
      console.log("Here the refresh logic will be implemented");
      authService.refreshToken(dispatch);
    }
  }, [checkRefresh]);

  console.log("Check Refresh:", checkRefresh);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  return <>{token && <BrandLayout />}</>;
};

export default DefaultLayout;
