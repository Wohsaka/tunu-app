import { appId, appKey, apiUrl } from './keys'

const getRecipes = async ({
  query,
  mealType,
  dishType,
  cuisineType,
  random,
}) => {
  const array = [
    query ? `&q=${query}` : null,
    mealType ? `&mealType=${mealType}` : null,
    dishType ? `&dishType=${dishType}` : null,
    cuisineType ? `&cuisineType=${cuisineType}` : null,
    random ? `&random=${random}` : null,
  ]
  const params = array.toString().replace(/,/g, '')
  try {
    const response = await fetch(
      `${apiUrl}${params}&app_id=${appId}&app_key=${appKey}`
    )
    return await response.json()
  } catch (error) {
    alert(error)
  }
}

export default getRecipes
