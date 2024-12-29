import React from "react";
import { Breadcrumb } from "../../../components/Breadcrumb";
import OrderExtendTableView from "../list/OrderExtendTableView";

const OrderExtendList = () => {
  return (
    <div>
      <Breadcrumb />

      <OrderExtendTableView />
    </div>
  );
};

export default OrderExtendList;
