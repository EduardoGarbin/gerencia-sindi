import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import FormCondominium from "./components/condominium/Form";
import MainLayout from "./components/layout/MainLayout";
import DataListCondominium from "./components/condominium/DataList";
import FormResident from "./components/resident/Form";
import DataListResident from "./components/resident/DataList";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications position="top-right" />
        <div className="flex w-full h-screen">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/" element={<ProtectedLayout />}>
              <Route
                path="dashboard"
                element={
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                }
              />
              <Route
                path="condominium/create"
                element={
                  <MainLayout>
                    <FormCondominium />
                  </MainLayout>
                }
              />
              <Route
                path="condominium"
                element={
                  <MainLayout>
                    <DataListCondominium />
                  </MainLayout>
                }
              />
              <Route
                path="condominium/:id/edit"
                element={
                  <MainLayout>
                    <FormCondominium isEditing={true} />
                  </MainLayout>
                }
              />
              <Route
                path="resident/create"
                element={
                  <MainLayout>
                    <FormResident />
                  </MainLayout>
                }
              />
              <Route
                path="resident"
                element={
                  <MainLayout>
                    <DataListResident />
                  </MainLayout>
                }
              />
              <Route
                path="resident/:id/edit"
                element={
                  <MainLayout>
                    <FormResident isEditing={true} />
                  </MainLayout>
                }
              />
            </Route>
          </Routes>
        </div>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
