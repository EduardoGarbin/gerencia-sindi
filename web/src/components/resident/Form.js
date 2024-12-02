import React from "react";
import { Button, Group, TextInput, Checkbox } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  createResident,
  updateResident,
  fetchResidentById,
} from "../../services/residentService";
import { showNotification } from "../../utils/notifications";
import { useParams } from "react-router-dom";

export default function FormResident({ isEditing = false, onSuccess }) {
  const { id: residentId } = useParams();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      birth_date: null,
      unit: "",
      condominium_id: "",
      status: true,
      move_in_date: null,
      move_out_date: null,
      notes: "",
    },
  });

  React.useEffect(() => {
    if (isEditing && residentId) {
      loadResident();
    }
  }, [isEditing, residentId]);

  const loadResident = async () => {
    try {
      const response = await fetchResidentById(residentId);
      if (response.status) {
        form.setValues(response.data);
      } else {
        showNotification(response.color, response.title, response.message);
      }
    } catch (error) {
      console.error("Erro ao carregar morador", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        birth_date: values.birth_date
          ? values.birth_date.toISOString().split("T")[0]
          : null,
        move_in_date: values.move_in_date
          ? values.move_in_date.toISOString().split("T")[0]
          : null,
        move_out_date: values.move_out_date
          ? values.move_out_date.toISOString().split("T")[0]
          : null,
      };

      const response = isEditing
        ? await updateResident(residentId, formattedValues)
        : await createResident(formattedValues);

      showNotification(response.color, response.title, response.message);

      if (response.status && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro na operação", error);
      showNotification("red", "Erro!", "Erro ao salvar o morador.");
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="w-full h-full flex flex-col gap-y-4"
    >
      <div className="p-4 overflow-auto h-full">
        <TextInput
          withAsterisk
          label="Nome"
          placeholder="Digite o nome do morador"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Digite o email do morador"
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Telefone"
          placeholder="Digite o telefone"
          {...form.getInputProps("phone")}
        />
        <TextInput
          withAsterisk
          label="CPF"
          placeholder="Digite o CPF"
          {...form.getInputProps("cpf")}
        />
        <DatePickerInput
          label="Data de Nascimento"
          placeholder="Selecione a data"
          {...form.getInputProps("birth_date")}
        />
        <TextInput
          withAsterisk
          label="Unidade"
          placeholder="Digite a unidade"
          {...form.getInputProps("unit")}
        />
        <TextInput
          withAsterisk
          label="ID do Condomínio"
          placeholder="Digite o ID do condomínio"
          {...form.getInputProps("condominium_id")}
        />
        <Checkbox
          label="Ativo"
          {...form.getInputProps("status", { type: "checkbox" })}
        />
        <DatePickerInput
          label="Data de Entrada"
          placeholder="Selecione a data"
          {...form.getInputProps("move_in_date")}
        />
        <DatePickerInput
          label="Data de Saída"
          placeholder="Selecione a data"
          {...form.getInputProps("move_out_date")}
        />
        <TextInput
          label="Notas"
          placeholder="Adicione observações ou notas"
          {...form.getInputProps("notes")}
        />
      </div>
      <Group justify="flex-end" mt="md">
        <Button type="submit">{isEditing ? "Atualizar" : "Criar"}</Button>
      </Group>
    </form>
  );
}
