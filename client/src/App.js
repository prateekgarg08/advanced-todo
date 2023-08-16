import Protected from "./components/Protected";
import Task from "./components/Task";
import { useAuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import { Route, Routes } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isLoggedIn } = useAuthContext();
  return (
    <div className="App">
      <ToastContainer
        autoClose={2000}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/app" element={<Protected isLoggedIn={isLoggedIn}>
          <TaskProvider>

            <Main />
          </TaskProvider>
        </Protected>} />
      </Routes>

    </div>
  );
}

export default App;
