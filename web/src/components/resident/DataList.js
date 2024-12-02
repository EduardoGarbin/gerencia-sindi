import React, { useEffect, useState } from "react";
import { deleteResident, fetchResidents } from "../../services/residentService";
import { Table, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/notifications";

export default function DataList() {
  const navigate = useNavigate();
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    getResidents();
  }, []);

  const getResidents = async () => {
    const response = await fetchResidents();
    if (response.status) {
      setResidents(response.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteResident(id);
      showNotification(response.color, response.title, response.message);

      if (response.status) {
        setResidents((prev) => prev.filter((resident) => resident.id !== id));
      }
    } catch (error) {
      console.error("Erro ao excluir morador:", error);
      showNotification("red", "Erro", "Erro ao excluir o morador.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Lista de Moradores</h1>
        <Button
          color="green"
          size="xs"
          onClick={() => navigate("/resident/create")}
        >
          Adicionar
        </Button>
      </div>
      <Table highlightOnHover withColumnBorders verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Telefone</Table.Th>
            <Table.Th>CPF</Table.Th>
            <Table.Th>Data de Nascimento</Table.Th>
            <Table.Th>Unidade</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Ações</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {residents.map((resident) => (
            <Table.Tr key={resident.id}>
              <Table.Td>{resident.name}</Table.Td>
              <Table.Td>{resident.email}</Table.Td>
              <Table.Td>{resident.phone}</Table.Td>
              <Table.Td>{resident.cpf}</Table.Td>
              <Table.Td>{resident.birth_date}</Table.Td>
              <Table.Td>{resident.unit}</Table.Td>
              <Table.Td>{resident.status ? "Ativo" : "Inativo"}</Table.Td>
              <Table.Td>
                <Button
                  color="blue"
                  size="xs"
                  onClick={() => navigate(`/resident/${resident.id}/edit`)}
                >
                  Editar
                </Button>
                <Button
                  color="red"
                  size="xs"
                  ml="sm"
                  onClick={() => handleDelete(resident.id)}
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
