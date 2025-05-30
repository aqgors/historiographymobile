import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { useThemeContext } from '../context/ThemeContext';

const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' },
];

export default function AuthScreen() {
  const { login } = useAuth();
  const { isDark } = useThemeContext();
  const router = useRouter();

  const handleLogin = (values) => {
    const user = users.find(u => u.username === values.username && u.password === values.password);
    if (user) {
      login(user);
      router.replace('/(tabs)');
    } else {
      alert('Невірний логін або пароль');
    }
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.title, isDark && { color: '#fff' }]}>Вхід до системи</Text>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={Yup.object({
            username: Yup.string().required('Обовʼязкове поле'),
            password: Yup.string().required('Обовʼязкове поле'),
          })}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.form}>
              <TextInput
                placeholder="Логін"
                placeholderTextColor={isDark ? '#aaa' : '#999'}
                style={[styles.input, isDark && styles.inputDark]}
                value={values.username}
                onChangeText={handleChange('username')}
              />
              {errors.username && <Text style={styles.error}>{errors.username}</Text>}

              <TextInput
                placeholder="Пароль"
                placeholderTextColor={isDark ? '#aaa' : '#999'}
                secureTextEntry
                style={[styles.input, isDark && styles.inputDark]}
                value={values.password}
                onChangeText={handleChange('password')}
              />
              {errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Увійти</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    backgroundColor: '#ffffffcc',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
  },
  cardDark: {
    backgroundColor: '#1e1e1ecc',
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#222',
  },
  form: {
    gap: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  inputDark: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderColor: '#555',
  },
  error: {
    color: '#f44336',
    fontSize: 12,
    marginTop: -6,
    marginBottom: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
