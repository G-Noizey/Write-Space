import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/usuarios/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si la respuesta es exitosa, almacenar los tokens y redirigir
        Swal.fire("Éxito", "Inicio de sesión exitoso", "success");
        localStorage.setItem("access", data.access); // Guarda el token de acceso
        localStorage.setItem("refresh", data.refresh); // Guarda el token de refresco
        navigate("/menu"); // Redirige al menú
      } else {
        // Si la respuesta no es exitosa, muestra el error
        Swal.fire("Error", data.detail || "Credenciales incorrectas", "error");
      }
    } catch (error) {
      // Si hay algún problema con la conexión al servidor
      Swal.fire("Error", "Hubo un problema con el servidor", "error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "22rem" }}>
        <h3 className="text-center">Write Space</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            onClick={() => navigate("/registro")}
          >
            ¿Aún no tienes cuenta? Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
