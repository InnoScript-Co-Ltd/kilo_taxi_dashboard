import { useEffect } from "react";
import BrandLayout from "./components/BrandLayout";
// import Notification from "../../components/Notification"

const DefaultLayout: React.FC = () => {
  useEffect(() => {
    // Add your effect logic here
  }, []);

  return (
    <>
        <BrandLayout />
    </>
  );
};

export default DefaultLayout; // Export it as default
