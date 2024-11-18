
import './App.css'
import Nav from './components/nav/Nav'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import About from './components/about/About'
import { PublicClientApplication } from '@azure/msal-browser'
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react'
import { loginRequest } from './authConfig'
import Login from './components/login/Login'



type AppProps = {
  instance: PublicClientApplication
}


const MainContent = () => {

  return (
    <div className="App">


    </div>
  );
};

function App({ instance }: AppProps) {
  /**
     * useMsal is hook that returns the PublicClientApplication instance,
     * that tells you what msal is currently doing. For more, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
     */
  // const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: 'create',
      })
      .catch((error) => console.log("error - ", error));
  };
  return (

    <MsalProvider instance={instance}>
      <HashRouter>
        <main className='font-Poppins bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen'>
          <Nav />
          <div className='w-[92%] mx-auto mt-4'>
            <MainContent />
            <AuthenticatedTemplate>
              {activeAccount ? (
                <div>
                  {/* <IdTokenData idTokenClaims={activeAccount.idTokenClaims} /> */}
                  authenticated
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


      </HashRouter>
    </MsalProvider>

  )
}

export default App
