import { Button } from "@mui/material";
import React from "react";
import axios from "axios";

const API_URL = "https://localhost:7181/api/v1";

const refreshToken = async (
  currentAccessToken: string,
  currentRefreshToken: string
) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/refresh-token`, {
      accessToken: currentAccessToken,
      refreshToken: currentRefreshToken,
    });
    return response.data; // { accessToken, refreshToken }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error refreshing token:",
        error.response?.data || error.message
      );
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error; // Re-throw the error for further handling
  }
};

const DashboardView = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const currentAccessToken = localStorage.getItem("TOKEN");
    const currentRefreshToken = localStorage.getItem("REFRESHTOKEN");

    if (!currentAccessToken || !currentRefreshToken) {
      console.error("No access token or refresh token found in localStorage");
      return;
    }

    try {
      const data = await refreshToken(currentAccessToken, currentRefreshToken);
      console.log("Tokens refreshed successfully:", data);

      // Update tokens in localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error) {
      console.error("Failed to refresh tokens:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>DashboardView</div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default DashboardView;
