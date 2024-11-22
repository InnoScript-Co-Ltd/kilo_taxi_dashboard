import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router"
import { driverService } from "../driver.service";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../../stores";

const DriverDetail= ()=> {
    const [loading, setLoading] = useState(false);
    const params: any =useParams();
    console.log(params.id)
    const dispatch= useDispatch();
    const { driver } = useSelector((state: AppRootState) => state.driver);
    const loadingData=useCallback(()=>{
        setLoading(true);
        driverService.show(dispatch,params.id)
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        loadingData();
      }, [loadingData]);
return (<div>Detail</div>)
}

export default DriverDetail