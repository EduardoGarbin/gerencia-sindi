import * as React from "react";
import { loginUser } from "../../services/authService";
import { showNotification } from "../../utils/notifications";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await loginUser({ email, password });
    showNotification(response.color, response.title, response.message);

    if (response.status) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-white px-14 py-9 rounded-3xl border-2 border-gray-100">
      <h1 className="text-5xl font-semibold">Bem-vindo!</h1>
      <p className="font-medium text-lg text-gray-500 mt-3">
        Faça login para continuar.
      </p>
      <div className="mt-4">
        <div className="mt-2">
          <label className="text-lg font-medium">E-mail</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Digite seu e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label className="text-lg font-medium">Senha</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] easy-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
            onClick={handleSubmit}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
