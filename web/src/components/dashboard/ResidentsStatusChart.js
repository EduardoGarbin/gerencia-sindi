import { PieChart } from "@mantine/charts";
import { useEffect, useState } from "react";
import { fetchResidents } from "../../services/residentService";
import "@mantine/charts/styles.css";

export default function ResidentsStatusChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getResidentData();
  }, []);

  const getResidentData = async () => {
    const response = await fetchResidents();
    if (response.status) {
      const residents = response.data;
      const activeCount = residents.filter(
        (resident) => resident.status
      ).length;
      const inactiveCount = residents.length - activeCount;

      setChartData([
        { name: "Ativos", value: activeCount, color: "green" },
        { name: "Inativos", value: inactiveCount, color: "red" },
      ]);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-center mb-4">
        Status dos Moradores
      </h2>
      <div className="flex justify-center">
        {chartData.length > 0 ? (
          <PieChart size={169} thickness={18} data={chartData} withTooltip/>
        ) : (
          <p className="text-center">Carregando...</p>
        )}
      </div>
    </div>
  );
}
