export async function fetchCondominiums() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/condominiums", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao buscar condomínios.");
    }

    const responseData = await response.json();

    return {
      status: true,
      data: responseData,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

export async function createCondominium(data) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/condominiums", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ocorreu um erro inesperado.");
    }

    const responseData = await response.json();

    return {
      status: true,
      color: "green",
      title: "Condomínio criado com sucesso!",
      message: "O condomínio foi cadastrado corretamente.",
      data: responseData,
    };
  } catch (error) {
    return {
      status: false,
      color: "red",
      title: "Erro ao criar condomínio!",
      message: error.message,
    };
  }
}

export async function updateCondominium(id, data) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/condominiums/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar o condomínio.");
    }

    const responseData = await response.json();

    return {
      status: true,
      color: "green",
      title: "Condomínio atualizado com sucesso!",
      message: "O condomínio foi atualizado corretamente.",
      data: responseData,
    };
  } catch (error) {
    return {
      status: false,
      color: "red",
      title: "Erro ao atualizar condomínio!",
      message: error.message,
    };
  }
}

export async function fetchCondominiumById(id) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/condominiums/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao buscar condomínio.");
    }

    const responseData = await response.json();

    return {
      status: true,
      data: responseData,
    };
  } catch (error) {
    return {
      status: false,
      color: "red",
      title: "Erro ao carregar condomínio!",
      message: error.message,
    };
  }
}

export async function deleteCondominium(id) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/condominiums/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao excluir o condomínio.");
    }

    return {
      status: true,
      color: "green",
      title: "Condomínio excluído com sucesso!",
      message: "Condomínio foi excluído corretamente!",
    };
  } catch (error) {
    return {
      status: false,
      color: "red",
      title: "Erro!",
      message: error.message,
    };
  }
}
