import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import Form from "./components/condominium/Form";
import MainLayout from "./components/layout/MainLayout";

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
                path="condominium"
                element={
                  <MainLayout>
                    <Form />
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
