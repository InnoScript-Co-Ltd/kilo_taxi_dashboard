import PromotionDeletedTableView from "../list/PromotionDeletedTableView";
import { Breadcrumb } from "../../../components/Breadcrumb";

const PromotionList = () => {
  return (
    <div>
      <Breadcrumb />

      <PromotionDeletedTableView />
    </div>
  );
};

export default PromotionList;
