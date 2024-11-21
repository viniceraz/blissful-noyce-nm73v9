import React, { useState } from "react";
import PedidoForm from "./PedidoForm";
import CadastroCliente from "./CadastroCliente";

const App = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]); // Estado para clientes cadastrados
  const [ingredientes, setIngredientes] = useState([
    { nome: "Queijo", quantidade: 10 },
    { nome: "Molho", quantidade: 15 },
    { nome: "Massa", quantidade: 20 },
  ]);

  const adicionarCliente = (novoCliente) => {
    setClientes([...clientes, novoCliente]);
  };

  const adicionarPedido = (novoPedido) => {
    setPedidos([...pedidos, novoPedido]);
    atualizarEstoque(novoPedido);
  };

  const atualizarEstoque = (pedido) => {
    const itens = Array.isArray(pedido.itens) ? pedido.itens : [];
    itens.forEach((item) => {
      const ingrediente = ingredientes.find((i) => i.nome === item);
      if (ingrediente) {
        ingrediente.quantidade -= 1;
      }
    });
    setIngredientes([...ingredientes]);
  };

  const calcularTotalVendas = () => {
    return pedidos.reduce((total, pedido) => total + pedido.total, 0);
  };

  // Função para gerar o CSV de vendas
  const gerarRelatorioVendas = () => {
    const headers = ["Cliente", "Itens", "Total"];
    const rows = pedidos.map((pedido) => [
      pedido.cliente,
      pedido.itens.join(", "),
      pedido.total.toFixed(2),
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))]
      .join("\n")
      .replace(/\n/g, "\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio_vendas.csv";
    link.click();
  };

  // Função para gerar o CSV de clientes
  const gerarRelatorioClientes = () => {
    const headers = ["Nome", "Email"];
    const rows = clientes.map((cliente) => [cliente.nome, cliente.email]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))]
      .join("\n")
      .replace(/\n/g, "\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio_clientes.csv";
    link.click();
  };

  // Função para gerar o CSV de estoque
  const gerarRelatorioEstoque = () => {
    const headers = ["Produto", "Quantidade"];
    const rows = ingredientes.map((ingrediente) => [
      ingrediente.nome,
      ingrediente.quantidade,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))]
      .join("\n")
      .replace(/\n/g, "\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio_estoque.csv";
    link.click();
  };

  return (
    <div
      style={{
        color: "#000",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "2.5em",
          color: "#333",
          marginTop: "0",
        }}
      >
        Pizzaria Tropical - Sistema de Pedidos
      </h1>

      {/* Contêiner de itens lado a lado */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "20px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <div
          style={{
            width: "30%",
            minWidth: "280px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          <CadastroCliente adicionarCliente={adicionarCliente} />
        </div>

        <div
          style={{
            width: "30%",
            minWidth: "280px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          <h2>Pedidos:</h2>
          <PedidoForm adicionarPedido={adicionarPedido} />
        </div>

        <div
          style={{
            width: "30%",
            minWidth: "280px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          <h2>Clientes Cadastrados:</h2>
          {clientes.length === 0 ? (
            <p>Nenhum cliente cadastrado ainda.</p>
          ) : (
            <ul>
              {clientes.map((cliente, index) => (
                <li key={index}>
                  <strong>Nome:</strong> {cliente.nome} |{" "}
                  <strong>Email:</strong> {cliente.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#fff",
          marginTop: "20px",
        }}
      >
        <h2>Total de Vendas: R$ {calcularTotalVendas().toFixed(2)}</h2>
        <h2>Estoque:</h2>
        <ul>
          {ingredientes.map((ingrediente, index) => (
            <li key={index}>
              {ingrediente.nome}: {ingrediente.quantidade}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#fff",
          marginTop: "20px",
        }}
      >
        <h2>Histórico de Pedidos:</h2>
        {pedidos.length === 0 ? (
          <p>Nenhum pedido realizado ainda.</p>
        ) : (
          <ul>
            {pedidos.map((pedido, index) => (
              <li key={index}>
                <strong>Cliente:</strong> {pedido.cliente} |{" "}
                <strong>Itens:</strong> {pedido.itens.join(", ")} |{" "}
                <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Botões para baixar os relatórios */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={gerarRelatorioVendas}
        >
          Baixar Relatório de Vendas
        </button>

        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={gerarRelatorioClientes}
        >
          Baixar Relatório de Clientes
        </button>

        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#FF5722",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={gerarRelatorioEstoque}
        >
          Baixar Relatório de Estoque
        </button>
      </div>
    </div>
  );
};

export default App;
