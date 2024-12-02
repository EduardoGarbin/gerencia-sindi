import { useEffect, useState } from "react";
import { fetchCondominiums } from "../../services/condominiumService";
import "@mantine/charts/styles.css";
import { BarChart } from "@mantine/charts";

export default function BlocksChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getCondominiumData();
  }, []);

  const getCondominiumData = async () => {
    const response = await fetchCondominiums();
    if (response.status) {
      const data = response.data.data.map((condo) => ({
        month: condo.name,
        blocos: condo.blocks,
      }));

      setChartData(data);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-center mb-4">
        Blocos por Condomínio
      </h2>
      {chartData.length > 0 ? (
        <BarChart
          h={300}
          data={chartData}
          dataKey="month"
          type="percent"
          series={[
            { name: "blocos", color: "violet.6" },
          ]}
        />
      ) : (
        <p className="text-center">Carregando...</p>
      )}
    </div>
  );
}
