import React, { useState } from "react";
import { Table, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const mockTasks = [
  {
    id: 1,
    title: "Reunião com moradores",
    start_date: "2024-12-04 10:00",
    end_date: "2024-12-04 12:00",
    status: "pendente",
  },
  {
    id: 2,
    title: "Manutenção na área comum",
    start_date: "2024-12-05 09:00",
    end_date: "2024-12-05 11:00",
    status: "concluído",
  },
];

export default function DataList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(mockTasks);

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Lista de Tarefas</h1>
        <Button
          color="green"
          size="xs"
          onClick={() => navigate("/task/create")}
        >
          Adicionar
        </Button>
      </div>
      <Table highlightOnHover withColumnBorders verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Título</Table.Th>
            <Table.Th>Data de Início</Table.Th>
            <Table.Th>Data de Término</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Ações</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tasks.map((task) => (
            <Table.Tr key={task.id}>
              <Table.Td>{task.title}</Table.Td>
              <Table.Td>{task.start_date}</Table.Td>
              <Table.Td>{task.end_date}</Table.Td>
              <Table.Td>
                {task.status === "pendente" ? "Pendente" : "Concluído"}
              </Table.Td>
              <Table.Td>
                <Button
                  color="blue"
                  size="xs"
                  onClick={() => navigate(`/task/${task.id}/edit`)}
                >
                  Editar
                </Button>
                <Button
                  color="red"
                  size="xs"
                  ml="sm"
                  onClick={() => handleDelete(task.id)}
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
