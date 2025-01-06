import { Breadcrumb } from "../../../components/Breadcrumb";
import TestTableView from "../list/TestTableView";
import TestTableView2 from "../list/TestTableView2";
import TestTableView3 from "../list/TestTableView3";

const ReviewList = () => {
  return (
    <div>
      <Breadcrumb />

      <TestTableView3 />
      <br/>
      <TestTableView />
      <br/>
      <TestTableView2 />
    </div>
  );
};

export default ReviewList;


// npm i -D @types/leaflet @types/react-leaflet

// leaflet-routing-machine