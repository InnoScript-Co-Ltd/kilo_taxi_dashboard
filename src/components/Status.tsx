import { Chip } from "@mui/material";
import { statusOptions } from "../constants/config";
import { useCallback, useEffect, useState } from "react";

const Status = ({ status }: { status: any }) => {
  const [data, setData] = useState<any>();

  const loadData = useCallback(() => {
    // Find the dataSource directly in the render process
    const dataSource: any = statusOptions.find(
      (option) => option.id === status
    );
    setData(dataSource)
  }, [status]);

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <>
      {data && (
        <Chip color={data.color} label={data.status} />
      )}
    </>
  );
};

export default Status;
