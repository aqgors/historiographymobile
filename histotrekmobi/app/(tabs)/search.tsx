import { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import { useFinds } from '../../context/FindsContext';
import { useThemeContext } from '../../context/ThemeContext';

export default function SearchScreen() {
  const { finds } = useFinds();
  const { isDark } = useThemeContext();
  const [query, setQuery] = useState('');

  const filtered = finds.filter((f) =>
    f.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <TextInput
        placeholder="🔎 Пошук знахідки..."
        value={query}
        onChangeText={setQuery}
        style={[styles.input, isDark && styles.inputDark]}
        placeholderTextColor={isDark ? '#aaa' : '#666'}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={[styles.emptyText, isDark && { color: '#aaa' }]}>Нічого не знайдено</Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, isDark && { color: '#fff' }]}>{item.title}</Text>
              <Text style={[styles.cardRegion, isDark && { color: '#ccc' }]}>Регіон: {item.region}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f6f8',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    fontSize: 16,
    borderRadius: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    elevation: 2,
  },
  inputDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 32,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1f1f1f',
    shadowOpacity: 0.2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  cardContent: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardRegion: {
    fontSize: 14,
    color: '#555',
  },
});
