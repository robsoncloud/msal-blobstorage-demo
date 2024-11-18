
import './App.css'
import Nav from './components/nav/Nav'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/home/Home'
import About from './components/about/About'

import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react'

import Login from './components/login/Login'
import { useEffect } from 'react'



function App() {
  /**
     * useMsal is hook that returns the PublicClientApplication instance,
     * that tells you what msal is currently doing. For more, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
     */
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {

    // If the user is authenticated, redirect them to the saved location
    if (isAuthenticated) {
      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
      sessionStorage.removeItem("redirectAfterLogin");
      console.log("redirect to:", redirectPath)
      // Redirect the user to the target page
      navigate(redirectPath, { replace: true });
    }
    console.log("isAuthenticated", activeAccount)

  }, [isAuthenticated]);
  return (

    <MsalProvider instance={instance}>

      <main className='font-Poppins bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen'>
        <Nav />
        <div className='w-[92%] mx-auto mt-4'>


          <AuthenticatedTemplate>
            {activeAccount ? (
              <div>
                {/* <IdTokenData idTokenClaims={activeAccount.idTokenClaims} /> */}

              </div>
            ) : null}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Routes>

              <Route path="*" element={<Login />} />

            </Routes>
          </UnauthenticatedTemplate>
        </div>
      </main>


      {/* </HashRouter> */}
    </MsalProvider>

  )
}

export default App
