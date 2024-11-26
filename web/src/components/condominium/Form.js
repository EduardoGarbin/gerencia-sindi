import { Button, Group, TextInput, NumberInput, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";

export default function Form() {
  const form = useForm({
    mode: "uncontrolled",
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

  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
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
          <Button type="submit">Enviar</Button>
        </Group>
      </div>
    </form>
  );
}
