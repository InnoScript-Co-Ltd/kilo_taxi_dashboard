import PaymentChannelTableView from "../list/PaymentChannelTableView";
import { Breadcrumb } from "../../../components/Breadcrumb";

const PaymentChannelList = () => {
  return (
    <div>
      <Breadcrumb />

      <PaymentChannelTableView />
    </div>
  );
};

export default PaymentChannelList;
