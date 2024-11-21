import React, { useState } from "react";

const CadastroCliente = ({ adicionarCliente }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !email) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    adicionarCliente({ nome, email });

    // Limpar campos após o cadastro
    setNome("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Clientes</h2>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Cadastrar Cliente</button>
    </form>
  );
};

export default CadastroCliente;
