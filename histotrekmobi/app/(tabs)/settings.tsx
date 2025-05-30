import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { useThemeContext } from '../../context/ThemeContext';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useThemeContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.title, isDark && { color: '#fff' }]}>⚙️ Налаштування</Text>

        <Text style={[styles.label, isDark && { color: '#ccc' }]}>Ви увійшли як:</Text>
        <Text style={[styles.username, isDark && { color: '#4a90e2' }]}>{user?.username}</Text>

        <View style={styles.row}>
          <Text style={[styles.label, isDark && { color: '#ccc' }]}>🌙 Темна тема</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <View style={styles.logoutButton}>
          <Button title="🚪 Вийти з акаунту" onPress={handleLogout} color={isDark ? '#e57373' : '#d9534f'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f5',
    justifyContent: 'center',
    padding: 24,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoutButton: {
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
