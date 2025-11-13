import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// URL API Anda
const API_URL = 'http://spidah.my.id/dimana.php';

// Fungsi helper untuk mem-format tanggal
const formatUpdateTimestamp = (timestamp) => {
  if (!timestamp || timestamp.length !== 12) {
    return "Waktu tidak valid";
  }
  // Format YYYYMMDDHHMM
  const year = timestamp.substring(0, 4);
  const month = timestamp.substring(4, 6);
  const day = timestamp.substring(6, 8);
  const hour = timestamp.substring(8, 10);
  const minute = timestamp.substring(10, 12);

  // Buat objek Date (bulan di JS 0-indexed, jadi - 1)
  const dateObj = new Date(year, month - 1, day, hour, minute);
  
  // Format ke bahasa Indonesia
  return dateObj.toLocaleString('id-ID', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Jakarta' // Sesuaikan dengan zona waktu data
  });
};

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fungsi untuk mengambil data
  const fetchData = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      const json = await response.json();
      
      if (json.status === 'OK') {
        setData(json);
      } else {
        throw new Error('Respons API tidak OK');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  // Fungsi untuk handle refresh manual (tombol)
  const handleManualRefresh = () => {
    setLoading(true);
    fetchData();
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#cc1f31" />
        <Text style={styles.loadingText}>Mencari lokasi...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Ionicons name="alert-circle-outline" size={60} color="#cc1f31" />
        <Text style={styles.errorText}>Oops! Gagal memuat data.</Text>
        <Text style={styles.errorSubText}>{error}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={handleManualRefresh}>
          <Text style={styles.refreshButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#cc1f31', '#1d2956']}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Lokasi Saat Ini</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={48} color="#cc1f31" />
            <Text style={styles.locationText}>{data?.location || 'N/A'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={24} color="#1d2956" />
            <Text style={styles.timeLabel}>Pembaruan Terakhir:</Text>
          </View>
          <Text style={styles.timeText}>
            {formatUpdateTimestamp(data?.updatedAt) || 'N/A'}
          </Text>
        </View>

        <TouchableOpacity style={styles.refreshButton} onPress={handleManualRefresh}>
          <Ionicons name="refresh" size={20} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.refreshButtonText}>Refresh Sekarang</Text>
        </TouchableOpacity>

        <Text style={styles.pullInfo}>Tarik ke bawah untuk me-refresh</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d2956',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#cc1f31',
    marginLeft: 15,
    flexShrink: 1, 
  },
  divider: {
    height: 1,
    backgroundColor: '#eeeeee',
    marginVertical: 15,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  timeLabel: {
    fontSize: 16,
    color: '#1d2956',
    marginLeft: 8,
  },
  timeText: {
    fontSize: 18,
    color: '#333333',
    marginLeft: 32,
  },
  refreshButton: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#1d2956',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pullInfo: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1d2956',
  },
  errorText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#cc1f31',
    marginTop: 10,
    textAlign: 'center',
  },
  errorSubText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
});