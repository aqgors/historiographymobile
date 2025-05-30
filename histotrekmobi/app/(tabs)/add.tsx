import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeContext } from '../../context/ThemeContext';
import { useFinds } from '../../context/FindsContext';

export default function AddFindScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [image, setImage] = useState('https://i0.wp.com/t4.com.ua/wp-content/uploads/2025/04/alexander-the-great.webp?fit=788%2C493&ssl=1');
  const router = useRouter();
  const { isDark } = useThemeContext();
  const { addFinds } = useFinds();

  const handleAdd = () => {
    if (!title || !description || !region || !image) {
      Alert.alert('Помилка', 'Заповніть всі поля');
      return;
    }

    const find = {
      id: Date.now(),
      title,
      description,
      region,
      image,
    };

    addFinds(find);
    router.push('/(tabs)/index');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.title, isDark && { color: '#fff' }]}>🗿 Додати місце</Text>

        <TextInput
          placeholder="Назва місця"
          value={title}
          onChangeText={setTitle}
          style={[styles.input, isDark && styles.inputDark]}
          placeholderTextColor={isDark ? '#aaa' : '#666'}
        />

        <TextInput
          placeholder="Опис"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={[styles.input, styles.textArea, isDark && styles.inputDark]}
          placeholderTextColor={isDark ? '#aaa' : '#666'}
        />

        <TextInput
          placeholder="Регіон"
          value={region}
          onChangeText={setRegion}
          style={[styles.input, isDark && styles.inputDark]}
          placeholderTextColor={isDark ? '#aaa' : '#666'}
        />

        <TextInput
          placeholder="URL зображення"
          value={image}
          onChangeText={setImage}
          style={[styles.input, isDark && styles.inputDark]}
          placeholderTextColor={isDark ? '#aaa' : '#666'}
        />

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>➕ Додати</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f7fa',
    flexGrow: 1,
    justifyContent: 'center',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#ffffffcc',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    maxWidth: 460,
    width: '100%',
    alignSelf: 'center',
  },
  cardDark: {
    backgroundColor: '#1e1e1ecc',
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    fontSize: 16,
    marginBottom: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#555',
    color: '#fff',
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
    fontWeight: '600',
  },
});
