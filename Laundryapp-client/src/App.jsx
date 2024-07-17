import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/Laundryopenpage'
import SplashPage from './components/SplashPage'
import AuthPage from './components/AuthPage'
import LoginPage from './components/LoginPage'
import OtpLogin from './components/OtpLogin'
import RegisterPage from './components/RegisterPage'
import HomePage from './components/HomePage'

function App() {

  return (
    
    <>

    <Routes>
  {/* <Route path='/'  element={<Home/>}/> */}
    <Route exact path="/" Component={LandingPage} />
    <Route path="/splash" Component={SplashPage} />
    <Route path="/AuthPage" Component={AuthPage} />
    <Route path="/LoginPage" Component={LoginPage} />
    <Route path="/login_otp" Component={OtpLogin} />
    <Route path="/register" Component={RegisterPage} />
    <Route path="/Home" Component={HomePage} />







    </Routes>

    

      
    </>
  )
}

export default App
