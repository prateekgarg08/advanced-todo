import { createContext, useContext, useState, useEffect } from "react";
import { verifyToken } from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()


const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token')
  const navigate = useNavigate()


  useEffect(() => {
    (async () => {
      console.log(token)
      const { status } = await verifyToken(token)
      if (status) {
        setIsLoggedIn(status)
      }
      else {
        setIsLoggedIn(false);
        localStorage.removeItem('token')
      }
    })()
    // try{

    // }
  }, [token])
  useEffect(() => {
    if (isLoggedIn) {

      navigate('/app')
    }
  }, [isLoggedIn])
  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
    {children}
  </AuthContext.Provider>
}
export function useAuthContext() {
  return useContext(AuthContext)
}
export { AuthProvider }