import { useEffect, useState } from 'react'
import SideBar from './componenets/SideBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useStore } from './store'
import './App.css'
import LoginScreen from './componenets/login'
import { Flag } from '@mui/icons-material'

const ProtectedRout = ({comp}) => {
  const {isLogin, setIsLogin} = useStore()
  const [loading, setLoding] = useState(true)

  useEffect(()=>{
    let token = localStorage.getItem("adminToken");
    if(token) setIsLogin(true);
    else setIsLogin(false);
    setLoding(false)
  }, [])

  if (loading) return <div>Loading . . .</div>;

  return isLogin ? comp : <Navigate to={"/login"} />;
};

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<ProtectedRout comp={<SideBar />}/>}/>
          <Route path='/login' element={<LoginScreen />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
