import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Menu from "./pages/Menu";  
import CrearDocumento from "./pages/CrearDocumento"; // Importa la nueva página
import ProtectedRoute from "./components/ProtectedRoute"; // Importa el componente ProtectedRoute

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      
      {/* Rutas protegidas */}
      <Route path="/menu" element={<ProtectedRoute element={<Menu />} />} />
      <Route path="/crear-documento" element={<ProtectedRoute element={<CrearDocumento />} />} />
    </Routes>
  );
}

export default App;
