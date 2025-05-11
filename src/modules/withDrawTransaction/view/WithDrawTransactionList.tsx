import WithDrawTransactionTableView from "../list/WithDrawTransactionTableView";
import { Breadcrumb } from "../../../components/Breadcrumb";

const WithDrawTransactionList = () => {
  return (
    <div>
      <Breadcrumb />

      <WithDrawTransactionTableView />
    </div>
  );
};

export default WithDrawTransactionList;
