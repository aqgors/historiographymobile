
import { Slot } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { FindsProvider } from '../context/FindsContext';

export default function Layout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <FindsProvider>
          <Slot />
        </FindsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
