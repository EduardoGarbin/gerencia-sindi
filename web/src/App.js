import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import DoubleNavbar from "./components/sidebar/DoubleNavbar";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications position="top-right" />
        <div className="flex w-full h-screen">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/vabaan" element={<DoubleNavbar />} />
          </Routes>
        </div>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
