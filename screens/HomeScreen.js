import React from 'react'
import { View, StyleSheet } from 'react-native'
import AppSearchBar from '../components/AppSearchBar'
import RecipesRenderer from '../components/RecipesRenderer'
import getRecipes from '../utils/getRecipes'

const HomeScreen = () => {
  const [recipes, setRecipes] = React.useState([])
  const [loadingRecipes, setLoadingRecipes] = React.useState(true)
  const [nextLink, setNextLink] = React.useState(false)
  const [index, setIndex] = React.useState(0)

  const getNextRecipes = async () => {
    try {
      setLoadingRecipes(true)
      const response = await fetch(nextLink)
      const newRecipes = await response.json()
      setRecipes((prev) => [...prev, newRecipes.hits])
      setNextLink(newRecipes._links.next ? newRecipes._links.next.href : false)
      setLoadingRecipes(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handlePreviousPage = (scrollRef) => {
    setIndex((prev) => prev - 1)
    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    })
  }

  const handleNextPage = async (scrollRef) => {
    if (
      (!nextLink && index !== recipes.length - 1) ||
      (nextLink && index !== recipes.length - 1)
    ) {
      setIndex((prev) => prev + 1)
    } else if (nextLink && index === recipes.length - 1) {
      await getNextRecipes()
      setIndex((prev) => prev + 1)
    }
  }

  const handleSearch = async (query) => {
    if (query === '') {
      alert(
        'Search field empty!, you must enter something you wanna search like "Pizza"'
      )
      return
    }
    try {
      setLoadingRecipes(true)
      const recipesJson = await getRecipes({ query })
      setRecipes([recipesJson.hits])
      setNextLink(
        recipesJson._links.next ? recipesJson._links.next.href : false
      )
      setLoadingRecipes(false)
      console.log(recipes.length)
    } catch (error) {
      console.log(error)
      setRecipes([])
      setNextLink(false)
      setLoadingRecipes(false)
    }
  }

  const randomSearch = async () => {
    const randomIndex = Math.floor(Math.random() * 5)
    const dishTypes = [
      'breakfast',
      'brunch',
      'lunch/dinner',
      'snack',
      'teatime',
    ]
    try {
      const recipesJson = await getRecipes({
        query: dishTypes[randomIndex],
        random: true,
      })
      setRecipes([recipesJson.hits])
      setLoadingRecipes(false)
    } catch (error) {
      console.log(error)
      setRecipes([])
      setLoadingRecipes(false)
    }
  }

  React.useEffect(() => {
    randomSearch()
  }, [])

  return (
    <View style={styles.container}>
      <AppSearchBar onSearch={handleSearch} />
      <RecipesRenderer
        recipes={recipes}
        loading={loadingRecipes}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        haveNext={nextLink ? true : false}
        index={index}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})

export default HomeScreen
