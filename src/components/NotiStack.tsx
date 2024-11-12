import { useSnackbar, VariantType } from "notistack";
import { useSelector } from "react-redux";
import { AppRootState } from "../stores";
import { useCallback, useEffect } from "react";

const NotiStack = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Destructure the notification state from Redux
  const { variant, msg } = useSelector((state: AppRootState) => state.share.notification);

  // Function to trigger the Snackbar
  const handleClickVariant = (variant: VariantType, msg: string) => {
    // Enqueue the Snackbar with the provided message and variant
    enqueueSnackbar(msg, { variant });
  };

  const loadingData = useCallback(() => {
    console.log(msg);
    
    if (variant && msg) {  // Ensure both variant and msg are available before triggering
      handleClickVariant(variant as VariantType, msg);
    }
  }, [variant, msg])

  // useEffect that triggers whenever `variant` or `msg` changes
  useEffect(() => {
    loadingData()
  }, [loadingData]);  // Depend on variant and msg, so Snackbar opens on state change

  return null; // This component doesn't render anything
};

export default NotiStack;
