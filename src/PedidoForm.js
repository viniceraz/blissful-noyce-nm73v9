import React, { useState } from "react";

const PedidoForm = ({ adicionarPedido }) => {
  const [cliente, setCliente] = useState("");
  const [itens, setItens] = useState(""); // Inicializa como string para input
  const [total, setTotal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Converte itens para array e valida entradas
    const itensArray = itens
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== ""); // Remove strings vazias

    if (!cliente || itensArray.length === 0 || isNaN(total)) {
      alert("Por favor, preencha todos os campos corretamente!");
      return;
    }

    adicionarPedido({ cliente, itens: itensArray, total: parseFloat(total) });

    // Reseta o formulário
    setCliente("");
    setItens("");
    setTotal("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cliente:</label>
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>
      <div>
        <label>Itens (separados por vírgula):</label>
        <input
          type="text"
          value={itens}
          onChange={(e) => setItens(e.target.value)}
        />
      </div>
      <div>
        <label>Total:</label>
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
      </div>
      <button type="submit">Adicionar Pedido</button>
    </form>
  );
};

export default PedidoForm;
