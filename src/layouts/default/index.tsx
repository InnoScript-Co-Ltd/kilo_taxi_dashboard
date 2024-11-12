import { useEffect } from "react";
import BrandLayout from "./components/BrandLayout";
// import Notification from "../../components/Notification";
import { SnackbarProvider } from "notistack";

const DefaultLayout: React.FC = () => {
  useEffect(() => {
    // Add your effect logic here
  }, []);

  return (
    <>
      {/* <AppSideBar /> */}
      {/* <Notification /> */}
      <SnackbarProvider maxSnack={5}>
        <BrandLayout />
      </SnackbarProvider>
    </>
  );
};

export default DefaultLayout; // Export it as default
