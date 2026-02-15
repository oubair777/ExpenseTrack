import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Explorer from "./pages/Explorer";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import TransactionDetails from "./pages/TransactionDetails";
import Navbar from "./pages/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

        <Route path="/explorer" element={<Explorer />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/edit/:id" element={<EditTransaction />} />
        <Route path="/transaction/:id" element={<TransactionDetails />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
