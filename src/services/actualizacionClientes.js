// 🔧 Función para actualizar cliente en backend
export default async function actualizarCliente(cliente) {
  try {
    const response = await fetch("http://localhost:3001/clientes/actualizarDatos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    if (response.ok) {
      return true;
    } else {
      console.log("Error en la respuesta del servidor:", response.status);
      return false;
    }

  } catch (error) {
    console.log("Error en fetch de actualizar datos cliente:", error);
    return false;
  }
}
