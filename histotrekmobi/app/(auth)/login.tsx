import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const { isDark } = useThemeContext();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if ((username === 'admin' && password === '1234') || (username === 'user' && password === 'user123')) {
      login({ username });
      router.replace('/(tabs)');
    } else {
      Alert.alert('Помилка', 'Невірний логін або пароль');
    }
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.box, isDark && styles.boxDark]}>
        <Text style={[styles.title, isDark && { color: '#fff' }]}>Авторизація</Text>

        <TextInput
          placeholder="Логін"
          value={username}
          onChangeText={setUsername}
          style={[styles.input, isDark && styles.inputDark]}
          placeholderTextColor={isDark ? '#aaa' : '#888'}
        />

        <TextInput
          placeholder="Пароль"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={[styles.input, isDark && styles.inputDark]}
          placeholderTextColor={isDark ? '#aaa' : '#888'}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Увійти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  box: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#ffffffcc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },
  boxDark: {
    backgroundColor: '#1e1e1ecc',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  inputDark: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderColor: '#555',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
