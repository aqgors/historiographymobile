
import { Tabs, Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function TabsLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Головна' }} />
      <Tabs.Screen name="search" options={{ title: 'Пошук' }} />
      <Tabs.Screen name="add" options={{ title: 'Додати місце' }} />
      <Tabs.Screen name="settings" options={{ title: 'Налаштування' }} />
    </Tabs>
  );
}
