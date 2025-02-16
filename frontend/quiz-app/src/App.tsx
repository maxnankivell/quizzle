import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
