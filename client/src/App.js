import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Register from "./features/auth/Register"
import Login from './features/auth/Login'

function App() {
  return (

    <Routes>
      <Route exact path="/" element={<Register />}> </Route>
      <Route path="/register" element={<Register />}></Route>


        <Route path="login">
        <Route index element={<Login />} />
        </Route>
        
        <Route path="dashboard">
        <Route index element={<Dashboard />} />
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />

      
    </Routes>
    
  );
}

export default App;
