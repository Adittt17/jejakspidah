import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView contentContainerStyle={styles.container}>
        <Ionicons name="information-circle-outline" size={80} color="#cc1f31" />
        <Text style={styles.title}>Track People</Text>
        <Text style={styles.version}>Versi 1.0.0</Text>
        
        <View style={styles.card}>
          <Text style={styles.header}>Tentang Aplikasi</Text>
          <Text style={styles.description}>
            "Track People" adalah aplikasi sederhana yang dirancang untuk melacak dan menampilkan lokasi terakhir yang dilaporkan dari server.
          </Text>
          <Text style={styles.description}>
            Aplikasi ini mengambil data secara real-time untuk memberikan informasi posisi terkini dan kapan data tersebut terakhir diperbarui.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.header}>Fitur Utama</Text>
          <Text style={styles.feature}>- Menampilkan lokasi terakhir.</Text>
          <Text style={styles.feature}>- Menampilkan waktu pembaruan data.</Text>
          <Text style={styles.feature}>- Tombol refresh manual.</Text>
        </View>
        
        <View style={{ height: 20 }} /> 

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f7f6',
  },
  container: {

    flexGrow: 1, 
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d2956',
    marginTop: 10,
  },
  version: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#cc1f31',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 10,
  },
  feature: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});