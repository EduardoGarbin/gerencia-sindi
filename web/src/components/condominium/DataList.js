import React, { useEffect, useState } from "react";
import {
  deleteCondominium,
  fetchCondominiums,
} from "../../services/condominiumService";
import { Table, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/notifications";

export default function DataList() {
  const navigate = useNavigate();
  const [condominiums, setCondominiums] = useState([]);

  useEffect(() => {
    getCondominiums();
  }, []);

  const getCondominiums = async () => {
    const response = await fetchCondominiums();
    if (response.status) {
      setCondominiums(response.data.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteCondominium(id);
      showNotification(response.color, response.title, response.message);

      if (response.status) {
        setCondominiums((prev) =>
          prev.filter((condominium) => condominium.id !== id)
        );
      }
    } catch (error) {
      console.error("Erro ao excluir condomínio:", error);
      showNotification("red", "Erro", "Erro ao excluir o condomínio.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Lista de Condomínios</h1>
        <Button
          color="green"
          size="xs"
          onClick={() => navigate("/condominium/create")}
        >
          Adicionar
        </Button>
      </div>
      <Table highlightOnHover withColumnBorders verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Endereço</Table.Th>
            <Table.Th>Blocos</Table.Th>
            <Table.Th>Unidades</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Ações</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {condominiums.map((condominium) => (
            <Table.Tr key={condominium.id}>
              <Table.Td>{condominium.name}</Table.Td>
              <Table.Td>{condominium.address}</Table.Td>
              <Table.Td>{condominium.blocks}</Table.Td>
              <Table.Td>{condominium.units}</Table.Td>
              <Table.Td>{condominium.status ? "Ativo" : "Inativo"}</Table.Td>
              <Table.Td>
                <Button
                  color="blue"
                  size="xs"
                  onClick={() =>
                    navigate(`/condominium/${condominium.id}/edit`)
                  }
                >
                  Editar
                </Button>
                <Button
                  color="red"
                  size="xs"
                  ml="sm"
                  onClick={() => handleDelete(condominium.id)}
                >
                  Excluir
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
