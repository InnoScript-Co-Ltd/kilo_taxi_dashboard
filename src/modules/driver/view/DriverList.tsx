import DriverTableView from '../list/DriverTableView'
import { Breadcrumb } from '../../../components/Breadcrumb'
import OpenMap from '../../../components/OpenMap'

const DriverList = () =>{
    return (
        <div>
    
            <Breadcrumb />
    
            <DriverTableView />

            <OpenMap />
    
        </div>
      )
    }
    
 export default DriverList