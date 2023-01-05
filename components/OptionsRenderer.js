import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import getRecipes from '../utils/getRecipes'
import RecipesRenderer from './RecipesRenderer'
import OptionsCards from './OptionsCards'
import { useColorScheme } from 'react-native'
import { lightTheme, darkTheme } from '../customProperties/Themes'

const Stack = createStackNavigator()

const OptionsRenderer = (props) => {
  const [lastQuery, setLastQuery] = React.useState('Recipes')
  const [recipes, setRecipes] = React.useState([])
  const [nextLink, setNextLink] = React.useState(false)
  const [loadingRecipes, setLoadingRecipes] = React.useState(true)
  const [index, setIndex] = React.useState(0)
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'light' ? lightTheme : darkTheme

  const onTypeTouch = async (query) => {
    setLoadingRecipes(true)
    if (query === lastQuery) {
      setLoadingRecipes(false)
      return
    }
    try {
      const searchObj = { ...props.extraParams }
      searchObj[props.searchBy] = query
      setLastQuery(query)
      const newRecipes = await getRecipes(searchObj)
      setRecipes([newRecipes.hits])
      setNextLink(newRecipes._links.next ? newRecipes._links.next.href : false)
      setLoadingRecipes(false)
    } catch (error) {
      console.log(error)
      setRecipes([])
      setNextLink(false)
      setLoadingRecipes(false)
    }
  }

  const getNextRecipes = async () => {
    try {
      setLoadingRecipes(true)
      const response = await fetch(nextLink)
      const newRecipes = await response.json()
      setRecipes((prev) => [...prev, newRecipes.hits])
      setNextLink(
        newRecipes._links.next.href ? newRecipes._links.next.href : false
      )
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

  const handleNextPage = async () => {
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

  const ComponentOptionsRenderer = ({ navigation }) => {
    const handleTouch = async (newType) => {
      onTypeTouch(newType)
      navigation.navigate(props.homeRouteName + 'Recipes')
    }

    return (
      <OptionsCards
        onTouch={handleTouch}
        options={props.options}
        list={props.list}
        theme={theme}
      />
    )
  }
  const ComponentRecipesRenderer = () => {
    return (
      <RecipesRenderer
        recipes={recipes}
        loading={loadingRecipes}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        haveNext={nextLink ? true : false}
        index={index}
      />
    )
  }

  return (
    <Stack.Navigator
      initialRouteName={props.homeRouteName}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerStatusBarHeight: 0,
        headerTintColor: theme.colors.onSurface,
      }}
    >
      <Stack.Screen
        name={props.homeRouteName}
        component={ComponentOptionsRenderer}
        options={{
          title: props.homeRouteTitle,
          headerShown: props.showHomeHeader,
        }}
      />
      <Stack.Screen
        name={props.homeRouteName + 'Recipes'}
        options={{
          title: `${lastQuery} recipes`,
          headerShown: props.showOptionHeader,
        }}
        component={ComponentRecipesRenderer}
      />
    </Stack.Navigator>
  )
}

export default OptionsRenderer
