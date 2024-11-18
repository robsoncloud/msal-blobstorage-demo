import { useLocation, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react"; // Hook to check if user is authenticated
import { useMsal } from "@azure/msal-react"; // Hook to get MSAL instance
import { useEffect } from "react";
import { loginRequest } from "../../authConfig";

const Login = () => {
    const location = useLocation();


    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {

        if (isAuthenticated) {
            return;
        }

        // Otherwise, we need to store the current location (path + query)
        const redirectTo = location.pathname + location.search; // Full path with query parameters
        sessionStorage.setItem("redirectAfterLogin", redirectTo);

        console.log(redirectTo)


    }, [isAuthenticated, instance, location])


    const handleRedirect = () => {
        instance
            .loginRedirect({
                ...loginRequest,
                prompt: 'create',
            })
            .catch((error) => console.log("error - ", error));

    }
    return (
        <div className='flex items-center justify-center mx-auto bg-red-300 min-h-10 max-w-[1200px]'>
            <div>
                <button className="signInButton" onClick={handleRedirect} >
                    Please login, To have access to the ODJ files you need to login first.
                </button>
            </div>

        </div>
    )
}

export default Login