

export function productoEnCarro(producto, carro) {
  if (carro && carro.length > 0) {
    return carro.some(item => item.producto.id === producto.id);
  }
  return false;
}