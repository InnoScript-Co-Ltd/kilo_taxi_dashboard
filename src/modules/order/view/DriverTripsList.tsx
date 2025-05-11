import React from "react";
import { Breadcrumb } from "../../../components/Breadcrumb";
import DriverTripsTableView from "../list/DriverTripsTableView";

const DriverTrips = () => {
  return (
    <div>
      <Breadcrumb />

      <DriverTripsTableView />
    </div>
  );
};

export default DriverTrips;
