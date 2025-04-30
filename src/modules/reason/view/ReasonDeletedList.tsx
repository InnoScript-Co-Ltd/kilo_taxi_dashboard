import ReasonDeletedTableView from "../list/ReasonDeletedTableView";
import { Breadcrumb } from "../../../components/Breadcrumb";

const ReasonList = () => {
  return (
    <div>
      <Breadcrumb />

      <ReasonDeletedTableView />
    </div>
  );
};

export default ReasonList;
