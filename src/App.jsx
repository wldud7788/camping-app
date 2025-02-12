import "./App.css";
import Layout from "./layouts/Layout";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
