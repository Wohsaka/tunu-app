import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import OptionsCards from '../components/OptionsCards'
import OptionsRenderer from '../components/OptionsRenderer'
import { cuisineTypes } from '../utils/cuisineTypes'
import { mealTypes } from '../utils/mealTypes'
import { dishTypes } from '../utils/dishTypes'
import { useColorScheme } from 'react-native'
import { lightTheme, darkTheme } from '../customProperties/Themes'

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()
let cuisineType = ''
let theme = {}

const MealTypeRenderer = () => {
  return (
    <OptionsRenderer
      homeRouteName='CuisineMealType'
      homeRouteTitle='Meal Type'
      options={mealTypes}
      showHomeHeader={false}
      showOptionHeader={false}
      searchBy='mealType'
      extraParams={{ cuisineType: cuisineType, random: false }}
      list={false}
    />
  )
}
const DishTypeRenderer = () => {
  return (
    <OptionsRenderer
      homeRouteName='CuisineDishType'
      homeRouteTitle='Dish Type'
      options={dishTypes}
      showHomeHeader={false}
      showOptionHeader={false}
      searchBy='dishType'
      extraParams={{ cuisineType: cuisineType, random: false }}
      list={false}
    />
  )
}

const CuisineOptions = ({ navigation }) => {
  const handleOnTouch = (route) => {
    cuisineType = route
    navigation.navigate(route)
  }
  return (
    <OptionsCards
      onTouch={handleOnTouch}
      options={cuisineTypes}
      list={true}
      theme={theme}
    />
  )
}

const CuisineSubOptions = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.onSurface,
      }}
    >
      <Tab.Screen
        name={'Cuisine meal type ' + route.name}
        options={{ title: 'Meal type' }}
        component={MealTypeRenderer}
      />
      <Tab.Screen
        name={'Cuisine dish type' + route.name}
        options={{ title: 'Dish type' }}
        component={DishTypeRenderer}
      />
    </Tab.Navigator>
  )
}

const CuisineScreen = () => {
  const colorScheme = useColorScheme()
  theme = colorScheme === 'light' ? lightTheme : darkTheme

  return (
    <Stack.Navigator
      initialRouteName='Cuisine Types'
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
        headerStatusBarHeight: 0,
      }}
    >
      <Stack.Screen
        name='Cuisine Types'
        component={CuisineOptions}
        options={{ headerShown: false }}
      />
      {cuisineTypes.map((cuisine) => (
        <Stack.Screen
          key={cuisine.key}
          name={cuisine.key}
          component={CuisineSubOptions}
        />
      ))}
    </Stack.Navigator>
  )
}

export default CuisineScreen
