import React, { useEffect } from "react";
import { Button, Group, TextInput, NumberInput, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import {
  createCondominium,
  updateCondominium,
  fetchCondominiumById,
} from "../../services/condominiumService";
import { showNotification } from "../../utils/notifications";
import { useParams } from "react-router-dom";

export default function Form({ isEditing = false, onSuccess }) {
  const { id: condominiumId } = useParams();
  const form = useForm({
    initialValues: {
      name: "",
      address: "",
      cnpj: "",
      cpf: "",
      blocks: 0,
      units: 0,
      construction_date: null,
      manager_name: "",
      manager_contact: "",
      total_area: 0,
      status: true,
      management_start_date: null,
    },
  });

  useEffect(() => {
    if (isEditing && condominiumId) {
      loadCondominium();
    }
  }, [isEditing, condominiumId]);

  const loadCondominium = async () => {
    try {
      const response = await fetchCondominiumById(condominiumId);

      if (response.status) {
        const data = response.data;

        form.setValues({
          name: data.name || "",
          address: data.address || "",
          cnpj: data.cnpj || "",
          cpf: data.cpf || "",
          blocks: data.blocks || 0,
          units: data.units || 0,
          construction_date: data.construction_date
            ? new Date(data.construction_date)
            : null,
          manager_name: data.manager_name || "",
          manager_contact: data.manager_contact || "",
          total_area: parseFloat(data.total_area) || 0,
          status: data.status !== undefined ? data.status : true,
          management_start_date: data.management_start_date
            ? new Date(data.management_start_date)
            : null,
        });
      } else {
        showNotification(response.color, response.title, response.message);
      }
    } catch (error) {
      console.error("Erro ao carregar condomínio", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = isEditing
        ? await updateCondominium(condominiumId, values)
        : await createCondominium(values);

      showNotification(response.color, response.title, response.message);

      if (response.status && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro na operação", error);
      showNotification("red", "Erro!", "Erro ao salvar o condomínio.");
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="w-full h-full flex flex-col gap-y-4"
    >
      <TextInput
        withAsterisk
        label="Nome"
        placeholder="Digite o nome do condomínio"
        {...form.getInputProps("name")}
      />
      <TextInput
        withAsterisk
        label="Endereço"
        placeholder="Digite o endereço"
        {...form.getInputProps("address")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="CNPJ"
          placeholder="Digite o CNPJ"
          {...form.getInputProps("cnpj")}
        />
        <TextInput
          label="CPF"
          placeholder="Digite o CPF"
          {...form.getInputProps("cpf")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput
          withAsterisk
          label="Blocos"
          placeholder="Digite a quantidade de blocos"
          {...form.getInputProps("blocks")}
        />
        <NumberInput
          withAsterisk
          label="Unidades"
          placeholder="Digite a quantidade de unidades"
          {...form.getInputProps("units")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePickerInput
          label="Data de Construção"
          placeholder="Selecione a data"
          {...form.getInputProps("construction_date")}
        />
        <DatePickerInput
          label="Início da Gestão"
          placeholder="Selecione a data"
          {...form.getInputProps("management_start_date")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Nome do Síndico"
          placeholder="Digite o nome do síndico"
          {...form.getInputProps("manager_name")}
        />
        <TextInput
          label="Contato do Síndico"
          placeholder="Digite o contato do síndico"
          {...form.getInputProps("manager_contact")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput
          label="Área Total"
          placeholder="Digite a área total"
          {...form.getInputProps("total_area")}
        />
        <Checkbox
          className="flex items-center"
          label="Ativo"
          {...form.getInputProps("status", { type: "checkbox" })}
        />
      </div>

      <div className="mt-auto">
        <Group justify="flex-end" mt="md">
          <Button type="submit">{isEditing ? "Atualizar" : "Criar"}</Button>
        </Group>
      </div>
    </form>
  );
}
