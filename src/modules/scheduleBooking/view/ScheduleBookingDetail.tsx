import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppRootState } from "../../../stores";
import ExpandmoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { formatDate } from "../../../helpers/common";
import { scheduleBookingService } from "../scheduleBooking.service";

const ScheduleBookingDetail = () => {
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };
  const params: any = useParams();
  console.log(params.id);
  const dispatch = useDispatch();
  var { scheduleBooking } = useSelector(
    (state: AppRootState) => state.scheduleBookings
  );
  const loadingData = useCallback(async () => {
    setLoading(true);
    scheduleBookingService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);
  return (
    <>
      <h2>Booking Detail</h2>
      {scheduleBooking ? (
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
              <Typography>Scheduled Booking Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                <strong>ID:</strong> {scheduleBooking.id}
              </p>
              <p>
                <strong>Pick Up Location:</strong>{" "}
                {scheduleBooking.pickUpLocation}
              </p>
              <p>
                <strong>Drop Off Location:</strong>{" "}
                {scheduleBooking.destinationLocation}
              </p>
              <p>
                <strong>Created Date:</strong>{" "}
                {formatDate(scheduleBooking.createdDate)}
              </p>
              <p>
                <strong>Schedule Time:</strong>{" "}
                {formatDate(scheduleBooking.scheduleTime)}
              </p>
              <p>
                <strong>Status:</strong> {scheduleBooking.status}
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
              <Typography>Order Info</Typography>
            </AccordionSummary>
            {scheduleBooking.orders?.map((order: any) => (
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
              </AccordionDetails>
            ))}
          </Accordion>
        </div>
      ) : (
        <p>No schedule details available.</p>
      )}
    </>
  );
};

export default ScheduleBookingDetail;
