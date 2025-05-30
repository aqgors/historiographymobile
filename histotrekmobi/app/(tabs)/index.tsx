import { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image,
  TouchableOpacity, Modal, TextInput
} from 'react-native';
import { useThemeContext } from '../../context/ThemeContext';
import { useFinds } from '../../context/FindsContext';

export default function HomeScreen() {
  const { isDark } = useThemeContext();
  const { finds, setFinds } = useFinds();
  const [editItem, setEditItem] = useState(null);
  const [editedData, setEditedData] = useState({ title: '', description: '', region: '', image: '' });

  const handleDelete = (id) => setFinds(finds.filter((m) => m.id !== id));

  const startEdit = (find) => {
    setEditItem(find);
    setEditedData({
      title: find.title,
      description: find.description,
      region: find.region,
      image: find.image
    });
  };

  const handleSaveEdit = () => {
    setFinds(finds.map((m) => (m.id === editItem.id ? { ...m, ...editedData } : m)));
    setEditItem(null);
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>🗿 Знахідки</Text>

      <FlatList
        data={finds}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={[styles.empty, isDark && { color: '#888' }]}>Список знахідок порожній</Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={[styles.cardTitle, isDark && { color: '#fff' }]}>{item.title}</Text>
              <Text style={[styles.cardDesc, isDark && { color: '#ccc' }]}>📄 {item.description}</Text>
              <Text style={[styles.cardDesc, isDark && { color: '#ccc' }]}>🌍 Регіон: {item.region}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => startEdit(item)}>
                  <Text style={styles.actionText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#e74c3c' }]} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.actionText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <Modal visible={!!editItem} transparent animationType="fade">
        <View style={styles.modalWrap}>
          <View style={[styles.modal, isDark && styles.modalDark]}>
            <Text style={[styles.modalTitle, isDark && { color: '#fff' }]}>Редагування</Text>

            <TextInput
              placeholder="Назва"
              value={editedData.title}
              onChangeText={(t) => setEditedData({ ...editedData, title: t })}
              style={[styles.input, isDark && styles.inputDark]}
              placeholderTextColor={isDark ? '#aaa' : '#777'}
            />
            <TextInput
              placeholder="Опис"
              value={editedData.description}
              onChangeText={(t) => setEditedData({ ...editedData, description: t })}
              style={[styles.input, isDark && styles.inputDark]}
              placeholderTextColor={isDark ? '#aaa' : '#777'}
            />
            <TextInput
              placeholder="Регіон"
              value={editedData.region}
              onChangeText={(t) => setEditedData({ ...editedData, region: t })}
              style={[styles.input, isDark && styles.inputDark]}
              placeholderTextColor={isDark ? '#aaa' : '#777'}
            />
            <TextInput
              placeholder="URL зображення"
              value={editedData.image}
              onChangeText={(t) => setEditedData({ ...editedData, image: t })}
              style={[styles.input, isDark && styles.inputDark]}
              placeholderTextColor={isDark ? '#aaa' : '#777'}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalBtn} onPress={handleSaveEdit}>
                <Text style={styles.modalBtnText}>💾 Зберегти</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#aaa' }]} onPress={() => setEditItem(null)}>
                <Text style={styles.modalBtnText}>❌ Скасувати</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  containerDark: { backgroundColor: '#121212' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16, color: '#333' },
  titleDark: { color: '#fff' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardDark: { backgroundColor: '#1e1e1e' },
  image: { width: 80, height: 80, borderRadius: 10, backgroundColor: '#ccc' },
  info: { flex: 1, marginLeft: 12 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  cardDesc: { fontSize: 14, marginBottom: 2 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 8 },
  actionBtn: {
    backgroundColor: '#4a90e2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionText: { color: '#fff', fontSize: 16 },
  modalWrap: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
  },
  modalDark: {
    backgroundColor: '#1e1e1e',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  inputDark: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderColor: '#444',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
