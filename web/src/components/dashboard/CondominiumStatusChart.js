import { DonutChart } from "@mantine/charts";
import { useEffect, useState } from "react";
import { fetchCondominiums } from "../../services/condominiumService";
import "@mantine/charts/styles.css";

export default function CondominiumStatusChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getCondominiumData();
  }, []);

  const getCondominiumData = async () => {
    const response = await fetchCondominiums();
    if (response.status) {
      const condominiums = response.data.data;

      const activeCount = condominiums.filter((condo) => condo.status).length;
      const inactiveCount = condominiums.length - activeCount;

      setChartData([
        { name: "Ativos", value: activeCount, color: 'blue' },
        { name: "Inativos", value: inactiveCount, color: 'red' },
      ]);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-center mb-4">
        Status dos Condomínios
      </h2>
      <div className="flex justify-center">
        {chartData.length > 0 ? (
          <DonutChart size={169} thickness={18} data={chartData} />
        ) : (
          <p className="text-center">Carregando...</p>
        )}
      </div>
    </div>
  );
}
