export async function fetchResidents() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/residents", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao buscar moradores.");
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

export async function createResident(data) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/residents", {
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
      title: "Morador cadastrado com sucesso!",
      message: "O morador foi cadastrado corretamente.",
      data: responseData,
    };
  } catch (error) {
    return {
      status: false,
      color: "red",
      title: "Erro ao cadastrar morador!",
      message: error.message,
    };
  }
}

export async function updateResident(id, data) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/residents/${id}`,
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
      throw new Error(errorData.message || "Erro ao atualizar o morador.");
    }

    const responseData = await response.json();

    return {
      status: true,
      color: "green",
      title: "Morador atualizado com sucesso!",
      message: "O morador foi atualizado corretamente.",
      data: responseData,
    };
  } catch (error) {
    return {
      status: false,
      color: "red",
      title: "Erro ao atualizar morador!",
      message: error.message,
    };
  }
}

export async function fetchResidentById(id) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/residents/${id}`,
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
      throw new Error(errorData.message || "Erro ao buscar morador.");
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
      title: "Erro ao carregar morador!",
      message: error.message,
    };
  }
}

export async function deleteResident(id) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/residents/${id}`,
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
      throw new Error(errorData.message || "Erro ao excluir o morador.");
    }

    return {
      status: true,
      color: "green",
      title: "Morador excluído com sucesso!",
      message: "Morador foi excluído corretamente!",
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
