import React from "react";
import { Route, Routes } from "react-router-dom";
import Form from "./Form";
import List from "./List";

export default function Page() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/create" element={<Form />} />
      <Route path="/:id/edit" element={<Form isEditing={true} />} />
    </Routes>
  );
}