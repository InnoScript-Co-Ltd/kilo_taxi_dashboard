import TownshipTableView from "../list/TownshipTableView";
import { Breadcrumb } from "../../../components/Breadcrumb";

const TownshipList = () => {
  return (
    <div>
      <Breadcrumb />

      <TownshipTableView />
    </div>
  );
};

export default TownshipList;
