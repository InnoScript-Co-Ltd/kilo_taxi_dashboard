import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {loading && (
        <div className=" form-loading">
          <CircularProgress color={"primary"} size="3rem" />
        </div>
      )}
    </>
  );
};

export default Loading;
