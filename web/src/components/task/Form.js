import React from "react";
import { useForm } from "@mantine/form";
import { TimeInput, DateInput } from "@mantine/dates";
import { TextInput, Textarea, Select, Button } from "@mantine/core";

export default function Form({ initialValues = {}, onSubmit }) {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      location: "",
      status: "pendente",
    },
  });

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      start_date: `${values.startDate}T${values.startTime}`,
      end_date: `${values.endDate}T${values.endTime}`,
    };
    onSubmit(payload);
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-y-4"
    >
      <div>
        <TextInput
          withAsterisk
          label="Título"
          placeholder="Título da tarefa"
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Descrição"
          placeholder="Detalhes da tarefa"
          {...form.getInputProps("description")}
        />
        <DateInput
          label="Data de início"
          {...form.getInputProps("startDate")}
        />
        <TimeInput
          label="Hora de início"
          {...form.getInputProps("startTime")}
        />
        <DateInput
          label="Data de término"
          {...form.getInputProps("endDate")}
        />
        <TimeInput label="Hora de término" {...form.getInputProps("endTime")} />
        <TextInput
          label="Local"
          placeholder="Local do compromisso"
          {...form.getInputProps("location")}
        />
        <Select
          label="Status"
          data={[
            { value: "pendente", label: "Pendente" },
            { value: "concluído", label: "Concluído" },
            { value: "cancelado", label: "Cancelado" },
          ]}
          {...form.getInputProps("status")}
        />
      </div>
      <Button type="submit">Salvar</Button>
    </form>
  );
}
