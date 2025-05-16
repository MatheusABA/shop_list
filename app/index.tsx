import useAuthStore from "@/src/stores/useAuthStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { user, loading } = useAuthStore();
  
  // Aguarde o carregamento do estado de autenticação
  if (loading) {
    return null; // Ou um indicador de carregamento
  }
  
  // Redirecione com base no estado de autenticação
  if (user) {
    return <Redirect href="/(auth)/" />;
  } else {
    return <Redirect href="/(public)/login" />;
  }
}