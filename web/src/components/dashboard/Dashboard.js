import React from "react";
import CondominiumStatusChart from "./CondominiumStatusChart";
import BlocksChart from "./BlocksChart";
import ResidentsStatusChart from "./ResidentsStatusChart";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard de Condomínios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <CondominiumStatusChart />
        </div>

        <div className="bg-white p-4 shadow rounded">
          <BlocksChart />
        </div>

        <div className="bg-white p-4 shadow rounded">
          <ResidentsStatusChart />
        </div>
      </div>
    </div>
  );
}
