import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { driverService } from "../driver.service";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../../stores";
import GetVehicle from "../../../components/GetVehicle";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandmoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from "@mui/material";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";


const DriverDetail = () => {
  const [loading, setLoading] = useState(false);
  const [vehicleList, setVehicleList] = useState<Array<any>>([]);
  const [expanded, setExpanded]=useState<string | false>(false);
  const handleChange = (isExpanded:boolean,panel:string)=>{
    setExpanded(isExpanded ? panel :false)
  }
  const params: any = useParams();
  console.log(params.id);
  const dispatch = useDispatch();
  var { driver } = useSelector((state: AppRootState) => state.driver);
  const loadingData = useCallback(async () => {
    setLoading(true);
    driverService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  // const driver = { id: 1, name: "Mg Mg", phone: "09457183964" };
console.log(driver)
  useEffect(() => {
    loadingData();
  }, [loadingData]);
  return (
    <>
    
        <h2>Driver Detail</h2>
        {driver ? (
        <div>
          <Accordion expanded={expanded === 'panel1'}
          onChange={(event,isExpanded)=>handleChange(isExpanded,'panel1')}>
            <AccordionSummary id="panel1-header" aria-controls="panel1-content" expandIcon ={<ExpandmoreIcon/>} >
            <Typography>
            Driver Info
            </Typography>
            
            </AccordionSummary>
            <AccordionDetails>
              <p><strong>ID:</strong> {driver.id}</p>
              <p><strong>Name:</strong> {driver.name}</p>
              <p><strong>Profile:</strong> {driver.profile}</p>
              <p><strong>Mobile:</strong> {driver.mobilePrefix}{driver.phone}</p>
              <p><strong>Email:</strong> {driver.email}</p>
              <p><strong>DOB:</strong> {driver.dob}</p>
              <p><strong>NRC:</strong> {driver.nrc}</p>
              <p><strong>NRC Image Front:</strong> {driver.nrcImageFront}</p>
              <p><strong>NRC Image Back:</strong> {driver.nrcImageBack}</p>
              <p><strong>Driver License:</strong> {driver.driverLicense}</p>
              <p><strong>Driver Image License Front:</strong> {driver.driverImageLicenseFront}</p>
              <p><strong>Driver Image License Back:</strong> {driver.driverImageLicenseBack}</p>
              <p><strong>Email Verified At:</strong> {driver.emailVerifiedAt}</p>
              <p><strong>Phone Verified At:</strong> {driver.phoneVerifiedAt}</p>
              <p><strong>Password:</strong> {driver.password}</p>
              <p><strong>Address:</strong> {driver.address}</p>
              <p><strong>State:</strong> {driver.state}</p>
              <p><strong>City:</strong> {driver.city}</p>
              <p><strong>Township:</strong> {driver.township}</p>
              <p><strong>Gender:</strong> {driver.gender}</p>
              <p><strong>Status:</strong> {driver.status}</p>
              <p><strong>KYC Status:</strong> {driver.kycStatus}</p>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'}
          onChange={(event,isExpanded)=>handleChange(isExpanded,'panel2')}>
            <AccordionSummary id="panel2-header" aria-controls="panel2-content" expandIcon ={<ExpandmoreIcon/>} >
            <Typography>
            Vehicle Info
            </Typography>
            
            </AccordionSummary>
            {driver.vehicle?.map((vehicle: any) => (
            <AccordionDetails>
            <p><strong>ID:</strong> {vehicle.id}</p>
          <p><strong>Vehicle No:</strong> {vehicle.vehicleNo}</p>
          <p><strong>Vehicle Type:</strong> {vehicle.vehicleType}</p>
          <p><strong>Model:</strong> {vehicle.model}</p>
          <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
          <p><strong>Business License Image:</strong> {vehicle.businessLicenseImage}</p>
          <p><strong>Vehicle License Front:</strong> {vehicle.vehicleLicenseFront}</p>
          <p><strong>Vehicle License Back:</strong> {vehicle.vehicleLicenseBack}</p>
          <p><strong>Status:</strong> {vehicle.status}</p>
            </AccordionDetails>
))}
          </Accordion>

          <Accordion expanded={expanded === 'panel3'}
          onChange={(event,isExpanded)=>handleChange(isExpanded,'panel3')}>
            <AccordionSummary id="panel3-header" aria-controls="panel3-content" expandIcon ={<ExpandmoreIcon/>} >
            <Typography>
            Wallet Info
            </Typography>
            
            </AccordionSummary>
            {driver.wallet?.map((wallet: any) => (
            <AccordionDetails>
            <p><strong>ID:</strong> {wallet.id}</p>
          <p><strong>Name:</strong> {wallet.walletName}</p>
          <p><strong>Created Date:</strong> {wallet.createdDate}</p>
          <p><strong>Update Date:</strong> {wallet.updateDate}</p>
            </AccordionDetails>
))}
          </Accordion>
          
        </div>
      ) : (
        <p>No driver details available.</p>
      )}
        <GetVehicle />
    
    </>
  )
};

export default DriverDetail;
