import * as React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import RecipesRenderer from '../components/RecipesRenderer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator, Text } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'

const FavRecipesScreen = (props) => {
  const [favRecipes, setFavRecipes] = React.useState({})
  const [noFav, setNoFav] = React.useState(true)
  const [loading, setLoading] = React.useState(true)
  const [index, setIndex] = React.useState(0)
  const isFocused = useIsFocused()

  const handlePreviousPage = (scrollRef) => {
    setIndex((prev) => prev - 1)
    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    })
  }

  const handleNextPage = async (scrollRef) => {
    setIndex((prev) => prev + 1)
    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    })
  }

  const getFavRecipes = async () => {
    try {
      setLoading(true)
      let favRecipesJson = await AsyncStorage.getItem('@fav_recipes')
      if (favRecipesJson === null || favRecipesJson === []) {
        setNoFav(true)
        setLoading(false)
        return
      }
      setNoFav(false)
      favRecipesJson = await JSON.parse(favRecipesJson)
      const favRecipesList = Object.values(favRecipesJson)
      const pageSize = 20
      let favRecipesArr = []
      for (let i = 0; i < favRecipesList.length; i += pageSize) {
        favRecipesArr.push(favRecipesList.slice(i, i + pageSize))
      }
      setFavRecipes(favRecipesArr)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    getFavRecipes()
  }, [isFocused])

  if (loading) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  if (noFav) {
    return (
      <View style={styles.noRecipesContainer}>
        <Text variant='titleMedium'>No favorite recipes found!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <RecipesRenderer
        recipes={favRecipes}
        loading={loading}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        haveNext={false}
        index={index}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityContainer: {
    paddingTop: 250,
    height: '100%',
  },
  noRecipesContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default FavRecipesScreen
