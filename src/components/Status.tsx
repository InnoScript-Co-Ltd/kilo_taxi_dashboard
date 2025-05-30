import { Chip, listSubheaderClasses } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { StatusOption, statusOptions } from "../constants/config";

const Status = ({ status }: { status: string; lists?: any }) => {
  const [statusValue, setStatusValue] = useState<
    null | StatusOption | undefined
  >(null);
  // console.log(status);
  const loadData = useCallback(() => {
    if (status) {
      console.log("status :", status);
      const statusOption: StatusOption | undefined = statusOptions.find(
        (option: StatusOption) => option.status === status.toUpperCase()
      );
      setStatusValue(statusOption);
    }
  }, [status]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // console.log(statusValue);

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
