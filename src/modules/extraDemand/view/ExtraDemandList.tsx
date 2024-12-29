import React from "react";
import { Breadcrumb } from "../../../components/Breadcrumb";
import ExtraDemandTableView from "../list/ExtraDemandTableView";

const ExtraDemandList = () => {
  return (
    <div>
      <Breadcrumb />

      <ExtraDemandTableView />
    </div>
  );
};

export default ExtraDemandList;
