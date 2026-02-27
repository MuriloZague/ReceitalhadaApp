import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <View>
      <View style={styles.headerApp}>
        <Image
          style={{ width: 155, height: 30 }}
          source={require('../../assets/images/logoReceitalhada.png')}
        />
        <Image
        style={{ width:35, height: 35}}
        source={require('../../assets/images/profile-icon.svg')}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Encontre A <Text style={{color: '#E96B35'}}>Melhor Receita</Text> Para A Sua Fome</Text>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerApp: {
    paddingHorizontal: 30,
    paddingBottom: 16,
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 8,
    borderBottomColor: '#E96B35'
  },
  titleContainer: {
    paddingHorizontal: 50,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 500,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
