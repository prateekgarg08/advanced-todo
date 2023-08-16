import Protected from "./components/Protected";
import Task from "./components/Task";
import { useAuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import { Route, Routes } from "react-router-dom";

function App() {
  const { isLoggedIn } = useAuthContext();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/app" element={<Protected isLoggedIn={isLoggedIn}>
          <Main />
        </Protected>} />
      </Routes>

    </div>
  );
}

export default App;
