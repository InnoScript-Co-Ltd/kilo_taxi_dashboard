import * as React from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid2,
  debounce,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";

import { orderCreateSchema, OrderFormInputs } from "../../order/order.payload";
import { orderService } from "../../order/order.service";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { paths } from "../../../constants/paths";

const OrderCreate = () => {
  const [loading, setLoading] = useState(false);
  const [selectingPickup, setSelectingPickup] = useState(true);
  const selectingPickupRef = useRef(true);
  const [selectedWallet, setSelectedWallet] = useState<any | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const [customerLists, setCustomerLists] = useState<any[]>([]);
  const [walletLists, setWalletLists] = useState<any[]>([]);
  const [extraDemandLists, setextraDemandLists] = useState<any[]>([]);

  const [distance, setDistance] = useState<number | null>(null);

  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [pickupMarker, setPickupMarker] = useState<L.Marker | null>(null);
  const [destinationMarker, setDestinationMarker] = useState<L.Marker | null>(
    null
  );
  const pickupMarkerRef = useRef<L.Marker | null>(null);
  const destinationMarkerRef = useRef<L.Marker | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new OpenStreetMapProvider();
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      try {
        const results = await provider.search({ query: value });
        const yangonResults = results.filter((r) =>
          r.label.toLowerCase().includes("yangon")
        );

        if (yangonResults.length > 0) {
          const { x, y, label } = yangonResults[0];
          setValue("pickUpLat", y.toString());
          setValue("pickUpLong", x.toString());
          setValue("pickUpLocation", label);

          if (pickupMarkerRef.current) {
            mapRef.current?.removeLayer(pickupMarkerRef.current);
          }

          const marker = L.marker([y, x]).addTo(mapRef.current!);
          pickupMarkerRef.current = marker;

          drawLineAndDistance();
        }
      } catch (error) {
        console.error("Search failed:", error);
        // Optionally show user feedback
      }
    }, 500),
    []
  );

  const debouncedDestinationSearch = useCallback(
    debounce(async (value: string) => {
      try {
        const results = await provider.search({ query: value });
        const yangonResults = results.filter((r) =>
          r.label.toLowerCase().includes("yangon")
        );

        if (yangonResults.length > 0) {
          const { x, y, label } = yangonResults[0];
          setValue("destinationLat", y.toString());
          setValue("destinationLong", x.toString());
          setValue("destinationLocation", label);

          if (destinationMarkerRef.current) {
            mapRef.current?.removeLayer(destinationMarkerRef.current);
          }

          const marker = L.marker([y, x]).addTo(mapRef.current!);
          destinationMarkerRef.current = marker;

          drawLineAndDistance();
        }
      } catch (error) {
        console.error("Search failed:", error);
        // Optionally show user feedback
      }
    }, 500),
    []
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormInputs>({
    resolver: zodResolver(orderCreateSchema),
  });
  const drawLineAndDistance = () => {
    if (
      pickupMarkerRef.current &&
      destinationMarkerRef.current &&
      mapRef.current
    ) {
      const pickupLatLng = pickupMarkerRef.current.getLatLng();
      const destinationLatLng = destinationMarkerRef.current.getLatLng();

      // Remove existing polylines
      mapRef.current.eachLayer((layer: any) => {
        if (layer instanceof L.Polyline) {
          mapRef.current?.removeLayer(layer);
        }
      });

      // Draw new polyline
      const polyline = L.polyline([pickupLatLng, destinationLatLng], {
        color: "blue",
      }).addTo(mapRef.current!);

      mapRef.current.fitBounds(polyline.getBounds());

      // Calculate distance
      const R = 6371e3; // Earth radius in meters
      const φ1 = pickupLatLng.lat * (Math.PI / 180);
      const φ2 = destinationLatLng.lat * (Math.PI / 180);
      const Δφ = (destinationLatLng.lat - pickupLatLng.lat) * (Math.PI / 180);
      const Δλ = (destinationLatLng.lng - pickupLatLng.lng) * (Math.PI / 180);

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;

      setDistance(d); // in meters
    }
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [customerRes, walletRes, extraDemandRes] = await Promise.all([
        getRequest(endpoints.customer + "/CustomerList", null, dispatch),
        getRequest(endpoints.wallet, null, dispatch),
        getRequest(endpoints.extraDemand, null, dispatch),
      ]);
      if (
        customerRes &&
        "status" in customerRes &&
        customerRes.status === 200 &&
        "data" in customerRes
      ) {
        setCustomerLists(customerRes.data.payload?.customers || []);
      }

      if (
        walletRes &&
        "status" in walletRes &&
        walletRes.status === 200 &&
        "data" in walletRes
      ) {
        setWalletLists(walletRes.data.payload?.wallets || []);
      }
      if (
        extraDemandRes &&
        "status" in extraDemandRes &&
        extraDemandRes.status === 200 &&
        "data" in extraDemandRes
      ) {
        setextraDemandLists(extraDemandRes.data.payload?.extraDemands || []);
      }
    } catch (error) {
      console.error("Failed to load customer or wallet data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  const toggleSelectingPickup = () => {
    selectingPickupRef.current = !selectingPickupRef.current;
    setSelectingPickup(selectingPickupRef.current);
  };

  // Map initialization
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        [16.8409, 96.1735], // Yangon
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      let polylineRef: L.Polyline | null = null;

      mapRef.current.on("click", async (e: L.LeafletMouseEvent) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        const results = await provider.search({ query: `${lat},${lng}` });
        const label = results[0]?.label || "";

        if (selectingPickupRef.current) {
          // Remove previous pickup marker if exists
          if (pickupMarkerRef.current) {
            mapRef.current?.removeLayer(pickupMarkerRef.current);
          }

          const marker = L.marker([lat, lng]).addTo(mapRef.current!);
          pickupMarkerRef.current = marker;

          setValue("pickUpLat", lat.toString());
          setValue("pickUpLong", lng.toString());
          setValue("pickUpLocation", label);
        } else {
          // Remove previous destination marker if exists
          if (destinationMarkerRef.current) {
            mapRef.current?.removeLayer(destinationMarkerRef.current);
          }

          const marker = L.marker([lat, lng]).addTo(mapRef.current!);
          destinationMarkerRef.current = marker;

          setValue("destinationLat", lat.toString());
          setValue("destinationLong", lng.toString());
          setValue("destinationLocation", label);
          setValue("status", 0);
        }

        // Draw polyline if both markers are present
        if (pickupMarkerRef.current && destinationMarkerRef.current) {
          const pickupLatLng = pickupMarkerRef.current.getLatLng();
          const destinationLatLng = destinationMarkerRef.current.getLatLng();

          // Remove old polyline
          if (polylineRef) {
            mapRef.current?.removeLayer(polylineRef);
          }

          // Draw new polyline
          polylineRef = L.polyline([pickupLatLng, destinationLatLng], {
            color: "blue",
          }).addTo(mapRef.current!);

          // Optional: Zoom to fit the line
          mapRef.current?.fitBounds(polylineRef.getBounds());

          // Optional: Calculate and log distance
          const distance = mapRef.current?.distance(
            pickupLatLng,
            destinationLatLng
          );
          const R = 6371e3; // Earth radius in meters
          const φ1 = pickupLatLng.lat * (Math.PI / 180);
          const φ2 = destinationLatLng.lat * (Math.PI / 180);
          const Δφ =
            (destinationLatLng.lat - pickupLatLng.lat) * (Math.PI / 180);
          const Δλ =
            (destinationLatLng.lng - pickupLatLng.lng) * (Math.PI / 180);

          const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const d = R * c;

          setDistance(d);
        }
      });
    }
  }, [selectingPickup, pickupMarker, destinationMarker, provider, setValue]);

  const onSubmit = async (data: OrderFormInputs) => {
    setLoading(true);
    try {
      const response = await orderService.store(data, dispatch);
      if (response?.statusCode === 201) {
        navigate(paths.orderList);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleWalletChange = (walletId: string) => {
    const wallet = walletLists.find((w) => String(w.id) == walletId);

    const configSettingList = setSelectedWallet(wallet);

    if (distance && wallet?.downTownAmount) {
      const km = distance / 1000;
      const amount = km * wallet.downTownAmount + extraDemandLists[0].amount;
      setTotalAmount(parseFloat(amount.toFixed(0))); // Round to 2 decimals
    }
  };
  useEffect(() => {
    if (distance && selectedWallet?.downTownAmount) {
      const km = distance / 1000;
      const amount =
        km * selectedWallet.downTownAmount + extraDemandLists[0].amount;

      setTotalAmount(parseFloat(amount.toFixed(0)));
    }
  }, [distance, selectedWallet]);

  return (
    <Box>
      <Card sx={{ mt: 2, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create Order
        </Typography>

        <Button
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={toggleSelectingPickup}
        >
          {selectingPickup
            ? "Switch to Destination Mode"
            : "Switch to Pickup Mode"}
        </Button>

        <Box
          ref={mapContainerRef}
          sx={{
            height: 300,
            border: "1px solid #ccc",
            borderRadius: 1,
            mb: 2,
          }}
        />
        <FormHelperText error>{errors.pickUpLocation?.message}</FormHelperText>
        <FormHelperText error>
          {errors.destinationLocation?.message}
        </FormHelperText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Controller
                name="pickUpLocation"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel shrink>Pickup Location</InputLabel>
                    <input
                      type="text"
                      placeholder="Search Pickup Location"
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);

                        if (!value.trim()) {
                          // Clear lat/long and marker
                          setValue("pickUpLat", "");
                          setValue("pickUpLong", "");
                          setValue("pickUpLocation", "");

                          if (pickupMarkerRef.current) {
                            mapRef.current?.removeLayer(
                              pickupMarkerRef.current
                            );
                            pickupMarkerRef.current = null;
                          }

                          drawLineAndDistance();
                          return;
                        }

                        debouncedSearch(value);
                      }}
                    />
                  </FormControl>
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Controller
                name="destinationLocation"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel shrink>Destination Location</InputLabel>
                    <input
                      type="text"
                      placeholder="Search Destination Location"
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value.trimStart();
                        field.onChange(value);

                        if (!value) {
                          setValue("destinationLat", "");
                          setValue("destinationLong", "");
                          setValue("destinationLocation", "");

                          if (destinationMarkerRef.current) {
                            mapRef.current?.removeLayer(
                              destinationMarkerRef.current
                            );
                            destinationMarkerRef.current = null;
                          }

                          drawLineAndDistance();
                          return;
                        }

                        debouncedDestinationSearch(value);
                      }}
                    />
                  </FormControl>
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl variant="filled" fullWidth error={!!errors.walletId}>
                <InputLabel htmlFor="walletId">Wallet</InputLabel>
                <Controller
                  name="walletId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="walletId"
                      disabled={loading}
                      label="Wallet"
                      {...field}
                      value={field.value || ""}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        handleWalletChange(event.target.value as string);
                      }}
                    >
                      {walletLists?.map((wallet: any) => (
                        <MenuItem key={wallet.id} value={wallet.id}>
                          {wallet.walletName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.walletId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.customerId}>
                <InputLabel>Customer</InputLabel>
                <Controller
                  name="customerId"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Customer">
                      <MenuItem value="">Select Customer</MenuItem>
                      {customerLists.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.customerId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.orderType}>
                <InputLabel>Order Type</InputLabel>
                <Controller
                  name="orderType"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Order Type">
                      <MenuItem value="">Select Order Type</MenuItem>
                      <MenuItem value="INAPP">INAPP</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors.orderType?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            {distance !== null && (
              <Typography variant="body1" sx={{ mb: 2 }}>
                Distance: {(distance / 1000).toFixed(2)} km
              </Typography>
            )}
            {totalAmount !== null && (
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                Estimated Cost: {totalAmount} MMK
              </Typography>
            )}

            {/* <Grid2 size={{ xs: 6, md: 3 }}>
              <Typography variant="h6">
                Total Amount:{" "}
                {totalAmount !== null ? `${totalAmount.toFixed(2)} MMK` : "N/A"}
              </Typography>
            </Grid2> */}

            <Grid2>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Creating..." : "Create Order"}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Card>
    </Box>
  );
};

export default OrderCreate;
