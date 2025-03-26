import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Menu = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      const token = localStorage.getItem("access");
      
      if (!token) {
        Swal.fire("Error", "No estás autenticado", "error");
        navigate("/"); // Redirigir al login si no hay token
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/documentos/documentos/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        
        if (response.ok) {
          // Asegurarse de que la respuesta tenga la propiedad 'results' que contiene el array de documentos
          if (Array.isArray(data.results)) {
            setDocuments(data.results); // Actualizar los documentos con los datos correctos
          } else {
            Swal.fire("Error", "No se encontraron documentos", "error");
          }
        } else {
          Swal.fire("Error", data.detail || "No se pudieron cargar los documentos", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Hubo un problema con el servidor", "error");
      }
    };

    fetchDocuments();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/"); // Redirigir al login después de cerrar sesión
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Write Space</a>
          <button className="btn btn-outline-info" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </nav>

      {/* Crear nuevo documento */}
      <div className="container my-4">
        <button className="btn btn-outline-info" onClick={() => navigate("/crear-documento")}>
          Crear Nuevo Documento
        </button>
      </div>

      {/* Documentos */}
      <div className="container my-4">
        <h3>Tus Documentos</h3>
        <div className="row">
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={index} className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{doc.titulo}</h5>
                    <button className="btn btn-outline-info" onClick={() => navigate(`/documento/${doc.id}`)}>
                      Ver Documento
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No tienes documentos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
