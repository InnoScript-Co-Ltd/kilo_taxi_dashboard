import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NavigateId = ({ url, value }: { url: string, value: any }) => {
  const navigate = useNavigate();

  return (
    <Link href={url} onClick={(e) => {
        e.preventDefault()
        navigate(url)
    }}>
    {value}
    </Link>
  );
};
