import { Chip } from "@mui/material";
import { statusOptions } from "../constants/config";
import { useCallback, useEffect, useState } from "react";

const Status = ({ status }: { status: any }) => {
  const [data, setData] = useState<any>(null);

  const loadData = useCallback(() => {
    // Find the matching option in statusOptions
    const dataSource = statusOptions.find(
      (option) => String(option.id) === String(status) // Ensure proper comparison
    );

    setData(dataSource || null); // Fallback to null if no matching option
  }, [status]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      {data ? (
        <Chip color={data.color} label={data.status} />
      ) : (
        <Chip label="Unknown" color="default" /> // Fallback for invalid status
      )}
    </>
  );
};

export default Status;
