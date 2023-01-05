import * as React from 'react'
import OptionsRenderer from '../components/OptionsRenderer'
import { dishTypes } from '../utils/dishTypes'

const DishTypeScreen = () => {
  return (
    <OptionsRenderer
      homeRouteName='DishTypeScreen'
      homeRouteTitle='Dish Type'
      options={dishTypes}
      showHomeHeader={true}
      showOptionHeader={true}
      list={false}
      searchBy='dishType'
      extraParams={{ random: false }}
    />
  )
}

export default DishTypeScreen
