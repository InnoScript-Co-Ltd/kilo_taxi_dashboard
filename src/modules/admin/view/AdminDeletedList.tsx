import { Breadcrumb } from "../../../components/Breadcrumb";
import AdminDeletedTableView from "../list/AdminDeletedTableView";

const AdminList = () => {
  return (
    <div>
      <Breadcrumb />

      <AdminDeletedTableView />
    </div>
  );
};

export default AdminList;
