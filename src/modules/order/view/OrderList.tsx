import React from "react";
import { Breadcrumb } from "../../../components/Breadcrumb";
import OrderTableView from "../list/OrderTableView";

const OrderList = () => {
  return (
    <div>
      <Breadcrumb />

      <OrderTableView />
    </div>
  );
};

export default OrderList;
