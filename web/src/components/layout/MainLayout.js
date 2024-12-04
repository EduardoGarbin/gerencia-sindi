import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="flex w-full h-screen bg-gray-100">
      <div className="flex flex-1 justify-center items-center h-full p-6">
        <div className="w-full bg-white overflow-auto rounded-lg shadow h-full p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
