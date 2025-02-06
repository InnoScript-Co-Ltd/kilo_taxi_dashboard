import * as React from "react";
import {
  AuthenticationContext,
  SessionContext,
  type Session,
} from "@toolpad/core/AppProvider";
import { Account } from "@toolpad/core/Account";
import { useDispatch } from "react-redux";
import { authService } from "../../../modules/auth/auth.service";
import { getData } from "../../../helpers/localStorage";
import { keys } from "../../../constants/config";

export default function UserProfile() {
  const [session, setSession] = React.useState<Session | null>(null);
  const dispatch = useDispatch();
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(session);
      },
      signOut: () => {
        setSession(null);
        authService.logout(dispatch);
      },
    };
  }, [session, dispatch]);

  const loadUserData = React.useCallback(() => {
    const data: any = getData(keys.USER);
    if (data) {
      setSession({
        user: {
          name: data?.name,
          email: data?.email,
          image: data?.profile,
        },
      });
    }
  }, []);

  React.useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={session}>
        {/* preview-start */}
        <Account />
        {/* preview-end */}
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  );
}
