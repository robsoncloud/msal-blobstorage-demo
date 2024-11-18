import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const handleRedirect = () => {
        // Otherwise, redirect to the login page
        const queryParams = new URLSearchParams(location.search);
        const redirectTo = location.pathname + location.search; 
        console.log(`queryParams: ${queryParams} - hash: ${location.hash}`)
        console.log(redirectTo)
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