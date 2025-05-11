// roleValidator.ts
import React, { useState, useEffect, useCallback } from "react";
import { getData } from "./localStorage";
import { keys } from "../constants/config";

// Define a Role interface for clarity
export interface Role {
  id: number | string;
  name: string;
}

/**
 * Custom hook to manage user roles and user data, and provide role-checking functions.
 */
const useRoleValidator = () => {
  const [userRoles, setUserRoles] = useState<Role[]>([]);

  // Load user data using your existing getData logic
  const loadUserData = useCallback(() => {
    const data: any = getData(keys.USER);
    if (data) {
      setUserRoles(data?.roleInfoDtos);
    }
  }, []);

  // Automatically load roles and user data when the hook is used
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Generic function to check if a given role is present
  const isRolePresent = (roleName: string): boolean => {
    return userRoles?.some(
      (role) => role?.name?.toLowerCase() === roleName?.toLowerCase()
    );
  };

  // Specific role checkers
  const isSuperAdmin = (): boolean => isRolePresent("systemadmin");
  const isAdmin = (): boolean => isRolePresent("admin");
  const isOrderAdmin = (): boolean => isRolePresent("orderadmin");
  const isTopUpAdmin = (): boolean => isRolePresent("topupadmin");
  const isWithdrawAdmin = (): boolean => isRolePresent("withdrawadmin");

  return {
    userRoles,
    isSuperAdmin,
    isAdmin,
    isOrderAdmin,
    isTopUpAdmin,
    isWithdrawAdmin,
  };
};

export default useRoleValidator;
