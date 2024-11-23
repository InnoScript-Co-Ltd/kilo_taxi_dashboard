import { Chip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

const Status = ({ status, lists }: { status: any, lists: any }) => {
  const [data, setData] = useState<any>(null);

  const loadData = useCallback(() => {
    // Find the matching option in statusOptions
    const dataSource = lists.find(
      (option : any) => String(option.id) === String(status) // Ensure proper comparison
    );

    setData(dataSource || null); // Fallback to null if no matching option
  }, [status, lists]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      {data ? (
        <Chip color={data.color} label={data.value} />
      ) : (
        <Chip label="Unknown" color="default" /> // Fallback for invalid status
      )}
    </div>
  );
};

export default Status;
