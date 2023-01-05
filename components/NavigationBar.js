import * as React from 'react'
import { StyleSheet } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import MealTypeScreen from '../screens/MealTypeScreen'
import DishTypeScreen from '../screens/DishTypeScreen'
import CuisineScreen from '../screens/CuisineScreen'
import FavRecipesScreen from '../screens/FavRecipesScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const Tab = createMaterialBottomTabNavigator()

const NavigationBar = (props) => {
  return (
    <NavigationContainer theme={props.theme}>
      <Tab.Navigator
        initialRouteName='Home'
        activeColor={props.theme.colors.primary}
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name='home' size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name='Meal Type'
          component={MealTypeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='bread-slice' size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name='Dish Type'
          component={DishTypeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name='md-pizza' size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name='Cuisine'
          component={CuisineScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='globe-americas' size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name='Favorites'
          component={FavRecipesScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name='favorite' size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  navigationBar: {},
})

export default NavigationBar
