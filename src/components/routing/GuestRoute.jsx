import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.context";

const GuestRoute = ({children}) => {

    const {user} = useAuth();

    return ( <>
        {!user ? children : <Navigate to={'/dashboard'} />}
    </> );
}
 
export default GuestRoute;