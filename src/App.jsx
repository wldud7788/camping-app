import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./shared/contexts/AuthContext";
import Layout from "./layouts/Layout";
import AppRoutes from "./routes/AppRoutes";
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
