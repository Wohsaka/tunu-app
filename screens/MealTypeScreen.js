import * as React from 'react'
import OptionsRenderer from '../components/OptionsRenderer'
import { mealTypes } from '../utils/mealTypes'

const MealTypeScreen = () => {
  return (
    <OptionsRenderer
      homeRouteName='MealTypeScreen'
      homeRouteTitle='Meal Type'
      options={mealTypes}
      showHomeHeader={true}
      showOptionHeader={true}
      list={false}
      searchBy='mealType'
      extraParams={{ random: false }}
    />
  )
}

export default MealTypeScreen
