export async function loginUser(credentials) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error("Credenciais incorretas.");
        }

        return {
            status: true,
            color: 'green',
            title: "Autenticação realizada com sucesso!",
            message: "Você será redirecionado.",
        };
    } catch (error) {
        return {
            status: false,
            color: 'red',
            title: "Erro de autenticação!",
            message: error.message,
        };
    }
}