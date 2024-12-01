import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppRootState } from "../../../stores";
import { orderService } from "../order.service";
import ExpandmoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { formatDate } from "../../../helpers/common";

const OrderDetail = () => {
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };
  const params: any = useParams();
  console.log(params.id);
  const dispatch = useDispatch();
  var { order } = useSelector((state: AppRootState) => state.order);
  const loadingData = useCallback(async () => {
    setLoading(true);
    orderService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  // const order = { id: 1, name: "Mg Mg", phone: "09457183964" };
  useEffect(() => {
    loadingData();
  }, [loadingData]);
  return (
    <>
      <h2>Driver Detail</h2>
      {order ? (
        <div>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={(event, isExpanded) => handleChange(isExpanded, "panel1")}
          >
            <AccordionSummary
              id="panel1-header"
              aria-controls="panel1-content"
              expandIcon={<ExpandmoreIcon />}
            >
              <Typography>Order Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                <strong>ID:</strong> {order.id}
              </p>
              <p>
                <strong>Total Amount:</strong> {order.totalAmount}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Created Date:</strong> {formatDate(order.createdDate)}
              </p>
              <p>
                <strong>Wallet Transaction Id:</strong>
                {order.walletTransactionId}
              </p>
              <p>
                <strong>Customer Id:</strong> {order.customerId}
              </p>
              <p>
                <strong>Driver Id:</strong> {order.driverId}
              </p>
              <p>
                <strong>Schedule Booking Id:</strong> {order.scheduleBookingId}
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={(event, isExpanded) => handleChange(isExpanded, "panel2")}
          >
            <AccordionSummary
              id="panel2-header"
              aria-controls="panel2-content"
              expandIcon={<ExpandmoreIcon />}
            >
              <Typography>Schedule Booking Info</Typography>
            </AccordionSummary>
            {order.schedule?.map((schedule: any) => (
              <AccordionDetails>
                <p>
                  <strong>ID:</strong> {schedule.id}
                </p>
                <p>
                  <strong>Customer Id:</strong> {schedule.customerId}
                </p>
                <p>
                  <strong>Deliver Id:</strong> {schedule.deliverId}
                </p>
                <p>
                  <strong>Pickup Address:</strong> {schedule.pickup_address}
                </p>
                <p>
                  <strong>Destination:</strong> {schedule.destination}
                </p>
                <p>
                  <strong>Schedule Time:</strong> {schedule.schedule_time}
                </p>
                <p>
                  <strong>Note:</strong> {schedule.note}
                </p>
                <p>
                  <strong>Kilo Type:</strong> {schedule.kilo_type}
                </p>
                <p>
                  <strong>Status:</strong> {schedule.status}
                </p>
              </AccordionDetails>
            ))}
          </Accordion>
        </div>
      ) : (
        <p>No order details available.</p>
      )}
    </>
  );
};

export default OrderDetail;
