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
  Chip,
  Typography,
} from "@mui/material";
import { formatDate } from "../../../helpers/common";
import OrderDetailLocation from "../../../components/OrderDetailLocation";

const OrderDetail = () => {
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };
  const params: any = useParams();
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

  console.log(order);

  return (
    <>
      <h2>Driver Detail</h2>
      {loading === false && order ? (
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
                <strong>Estimated Amount:</strong>{" "}
                <Chip
                  label={`${order.estimatedAmount} Ks`}
                  color="secondary"
                  variant="outlined"
                />
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Chip label={order.status} color="primary" variant="outlined" />
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
              <Typography>Order Extends Info</Typography>
            </AccordionSummary>
            {order.orderExtends?.map((orderExt: any) => (
              <AccordionDetails>
                <p>
                  <strong>ID:</strong> {orderExt.id}
                </p>
                <p>
                  <strong>Destination Location:</strong>{" "}
                  {orderExt?.destinationLocation}
                </p>
                <p>
                  <strong>Destination Lat:</strong> {orderExt.destinationLat}
                </p>
                <p>
                  <strong>Destination Long:</strong> {orderExt.destinationLong}
                </p>
                <p>
                  <strong>Create Date:</strong> {orderExt.createDate}
                </p>
              </AccordionDetails>
            ))}
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={(event, isExpanded) => handleChange(isExpanded, "panel3")}
          >
            <AccordionSummary
              id="panel3-header"
              aria-controls="panel3-content"
              expandIcon={<ExpandmoreIcon />}
            >
              <Typography>Order Extends Info</Typography>
            </AccordionSummary>
            {order.orderExtraDemands?.map((orderExtD: any) => (
              <AccordionDetails>
                <p>
                  <strong>ID:</strong> {orderExtD.id}
                </p>
                <p>
                  <strong>Unit:</strong> {orderExtD.unit}
                </p>
              </AccordionDetails>
            ))}
          </Accordion>

          <OrderDetailLocation detailLocation={order.orderRouteInfo} />
        </div>
      ) : (
        <p>No order details available.</p>
      )}
    </>
  );
};

export default OrderDetail;
