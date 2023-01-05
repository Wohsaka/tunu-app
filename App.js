import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'
import Constants from 'expo-constants'
import { Provider as PaperProvider } from 'react-native-paper'
import { lightTheme, darkTheme } from './customProperties/Themes'
import NavigationBar from './components/NavigationBar'

export default function App() {
  const colorScheme = useColorScheme()

  const theme = colorScheme === 'light' ? lightTheme : darkTheme
  const statusBarColor = colorScheme === 'light' ? '#fff' : '#000D'

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <NavigationBar theme={theme} />
        <StatusBar style='auto' backgroundColor={statusBarColor} />
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
})
