import "./App.css";
import View from "./components/View/index.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Interface from "./pages/Interface/index.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/Users/index.jsx";
import {useEffect} from "react";
import MicroModal from 'micromodal';
import Login from "./pages/Login/index.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import GuestRoute from "./routes/GuestRoute.jsx";

function App() {

  useEffect(() => {
    MicroModal.init({})
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="admin" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Interface />} />
          <Route path="users" element={<Users />} />
          <Route path="links" element={<View>Links</View>} />
        </Route>
        <Route path="auth" element={<GuestRoute />}>
          <Route path="login" element={<Login/>} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
