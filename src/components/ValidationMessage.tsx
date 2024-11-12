import { useSelector } from "react-redux";
import { AppRootState } from "../stores";

const ValidationMessage = ({field} : { field : string }) => {

    const { errors } = useSelector((state: AppRootState) => state.share);

    return (
        <>
            { errors && errors[field] && (
                <span className="error-message"> { errors[field][0] } </span>
            )}
        </>
    )
}

export default ValidationMessage;