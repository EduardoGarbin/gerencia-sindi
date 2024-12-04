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

export default function List() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(mockTasks);

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Tarefas do Síndico</h1>
        <Button color="green" onClick={() => navigate("/task/create")}>
          Adicionar Tarefa
        </Button>
      </div>
      <Table highlightOnHover withColumnBorders verticalSpacing="md">
        <thead>
          <tr>
            <th>Título</th>
            <th>Data de Início</th>
            <th>Data de Término</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.start_date}</td>
              <td>{task.end_date}</td>
              <td>{task.status}</td>
              <td>
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
                  onClick={() => handleDelete(task.id)}
                  ml="sm"
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
