
import { Link } from 'react-router-dom'
import { loginRequest } from '../../authConfig';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'


const Nav = () => {
    const { instance } = useMsal();

    function handleLoginRedirect() {
        instance.loginRedirect(loginRequest).catch((error) => console.log(error));
    }

    const handleLogoutRedirect = () => {
        instance.logoutRedirect().catch((error) => console.log(error));
    }

    return (
        <header className='bg-white'>
            <nav className='flex justify-between items-center w-[92%] mx-auto'>
                <div>

                    <img className='h-16' src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png" />
                </div>
                <div>
                    <ul className='flex gap-[4vw] items-center'>
                        <li>
                            <Link to="/home" className='hover:text-gray-500'>Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className='hover:text-gray-500'>Deployments</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <AuthenticatedTemplate>

                        <button onClick={handleLogoutRedirect} className='bg-[#a6c1ee] text-white px-5 py-2 rounded-md hover:bg-[#87acec]'>Logout</button>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <button onClick={handleLoginRedirect} className='bg-[#a6c1ee] text-white px-5 py-2 rounded-md hover:bg-[#87acec]'>Login</button>

                    </UnauthenticatedTemplate>
                </div>
            </nav>
        </header>
    )
}

export default Nav