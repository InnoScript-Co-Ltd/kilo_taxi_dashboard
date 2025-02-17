import { Chip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { StatusOption, statusOptions } from "../constants/config";

const Status = ({ status }: { status: string; lists?: any }) => {
  const [statusValue, setStatusValue] = useState<
    null | StatusOption | undefined
  >(null);

  const loadData = useCallback(() => {
    if (status) {
      console.log("status :", status);
      const statusOption: StatusOption | undefined = statusOptions.find(
        (option: StatusOption) => option.status === status.toUpperCase()
      );
      console.log("option status :", statusOption?.status);

      setStatusValue(statusOption);
    }
  }, [status]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      {statusValue ? (
        <Chip
          label={statusValue.status}
          style={{
            background: statusValue?.background,
            color: `${statusValue.color}!important`,
            fontWeight: "bolder",
          }}
        />
      ) : (
        <Chip label="Unknown" color="default" /> // Fallback for invalid status
      )}
    </div>
  );
};

export default Status;
