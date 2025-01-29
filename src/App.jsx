import "./App.css";
import { AuthProvider } from "./shared/AuthContext";
import AppRoutes from "./shared/AppRoutes";
import Layout from "./shared/Layout";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  );
}

export default App;
