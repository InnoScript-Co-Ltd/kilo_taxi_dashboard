import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts";
import { Grid2 } from "@mui/material";
import Gauge from "../../../components/GaugePointer";

const DashboardView = () => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ md: 12 }}>
        <Gauge />
      </Grid2>
      <Grid2 size={{ md: 6 }}>
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
        />
      </Grid2>
      <Grid2 size={{ md: 6 }}>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />
      </Grid2>
    </Grid2>
  );
};

export default DashboardView;
