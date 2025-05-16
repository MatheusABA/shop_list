import { useAuthInitialize } from '@/src/services/hooks/useAuthInitialize';
import { useProtectedRoute } from '@/src/services/hooks/useProtectedRoute';
import { Slot } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useAuthStore from '../src/stores/useAuthStore';

function RootLayoutNav() {
  const loading = useAuthStore(state => state.loading);
  useProtectedRoute();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  useAuthInitialize();
  
  return (
    <SafeAreaProvider>
      <RootLayoutNav />
    </SafeAreaProvider>
  );
}