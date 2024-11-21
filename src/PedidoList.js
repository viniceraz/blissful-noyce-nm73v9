// PedidoList.js
import React from "react";
import { ingredientes } from "./Pedidos"; // Importando os ingredientes

const PedidoList = ({ pedidos }) => {
  return (
    <div>
      <h2>Pedidos</h2>
      {pedidos && pedidos.length === 0 ? (
        <p>Não há pedidos registrados.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="pedido-item">
            <h3>Pedido de {pedido.cliente}</h3>
            <p>
              <strong>Itens:</strong> {pedido.itens.join(", ")}
            </p>
            <p>
              <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
            </p>
            <p>
              <strong>Avaliação:</strong> {pedido.avaliacao} estrelas
            </p>
          </div>
        ))
      )}
      <h2>Estoque</h2>
      {ingredientes && ingredientes.length > 0 ? (
        ingredientes.map((ingrediente) => (
          <p key={ingrediente.nome}>
            {ingrediente.nome}: {ingrediente.quantidade}
          </p>
        ))
      ) : (
        <p>Não há ingredientes no estoque.</p>
      )}
    </div>
  );
};

export default PedidoList;
