import React from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  useColorScheme,
} from 'react-native'
import {
  List,
  ActivityIndicator,
  Provider,
  Portal,
  IconButton,
  Surface,
  Text,
} from 'react-native-paper'
import RecipeModal from './RecipeModal'
const defaultRecipeImg = require('../images/default_recipe_img.png')
import { lightTheme, darkTheme } from '../customProperties/Themes'

/*props.recipes[index].recipe
 label -> Name of the recipe - String
 cuisineType -> Type of Cuisine - Array
 cautions -> Example: Gluten, Wheat, Sulfites - Array
 dietLabels -> Ex: High-Protein, Low-Carb - Array
 healthLabels -> Ex: Sugar-Conscious, Gluten-Free - Array
 image -> String 
 images -> REGULAR , SMALL, THUMBNAIL - Object
 ingredientLines -> Ex: 400g of beef, sugar - Array
 mealType -> Array
 source -> String
 url -> Source url to get instructions - String 
 yield -> Number of people who can eat from it - Int
 externalId -> String
*/

const RecipesRenderer = (props) => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'light' ? lightTheme : darkTheme

  const [showModal, setShowModal] = React.useState(false)
  const [modalRecipe, setModalRecipe] = React.useState(undefined)
  const [disableBack, setDisableBack] = React.useState(true)
  const [disableNext, setDisableNext] = React.useState(false)
  const scrollRef = React.useRef()

  const onPreviousPage = () => {
    props.onPreviousPage(scrollRef)
  }

  const onNextPage = () => {
    props.onNextPage(scrollRef)
  }

  const triggerModal = () => setShowModal((prev) => !prev)

  const handleSeeRecipe = (recipe) => {
    triggerModal()
    setModalRecipe(recipe)
  }

  React.useEffect(() => {
    if (props.index === 0) {
      setDisableBack(true)
    } else {
      setDisableBack(false)
    }
    if (!props.haveNext && props.index !== props.recipes.length - 1) {
      setDisableNext(false)
    } else if (!props.haveNext && props.index === props.recipes.length - 1) {
      setDisableNext(true)
    } else {
      setDisableNext(false)
    }
  }, [props.recipes, props.haveNext, props.index])

  if (props.loading === true) {
    return (
      <Surface style={styles.activityContainer}>
        <ActivityIndicator theme={theme} animating={true} size='large' />
      </Surface>
    )
  }

  if (props.recipes[0].length === 0 || props.index > props.recipes.length - 1) {
    return (
      <Surface
        style={{
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Text variant='titleMedium' style={{ textAlign: 'center' }}>
          No results for your search
        </Text>
      </Surface>
    )
  }

  return (
    <Provider theme={theme}>
      <Portal>
        <RecipeModal
          recipe={modalRecipe}
          onDismiss={triggerModal}
          visible={showModal}
        />
      </Portal>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }} ref={scrollRef}>
        <View
          style={{
            minHeight: '92%',
            paddingHorizontal: 10,
          }}
        >
          {props.recipes[props.index].map((item, index) => {
            let recipeImg = ''
            if (item.recipe.images.THUMBNAIL.url) {
              recipeImg = item.recipe.images.THUMBNAIL.url
            } else if (item.recipe.images.SMALL.url) {
              recipeImg = item.recipe.images.SMALL.url
            } else {
              recipeImg = item.recipe.images.REGULAR.url
            }

            return (
              <List.Item
                style={styles.listItem}
                titleNumberOfLines={2}
                key={item.recipe.label + index}
                title={item.recipe.label}
                description={
                  `Type of Cuisine: ${item.recipe.cuisineType}, ${item.recipe.yield} ` +
                  (item.recipe.yield < 2 ? 'serving' : 'servings')
                }
                left={() => (
                  <Image
                    style={styles.recipeThumbnail}
                    defaultSource={defaultRecipeImg}
                    source={{ uri: recipeImg }}
                    progressiveRenderingEnabled={true}
                  />
                )}
                onPress={() => handleSeeRecipe(item.recipe)}
              />
            )
          })}
        </View>
        <Surface style={styles.controlsContainer}>
          <IconButton
            disabled={disableBack}
            icon='chevron-left'
            onPress={onPreviousPage}
            mode='contained'
          />
          <Text variant='bodyMedium'>{props.index + 1}</Text>
          <IconButton
            disabled={disableNext}
            icon='chevron-right'
            onPress={onNextPage}
            mode='contained'
          />
        </Surface>
      </ScrollView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  recipeThumbnail: {
    height: 75,
    width: 75,
    alignSelf: 'center',
  },
  activityContainer: {
    paddingTop: 250,
    height: '100%',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    height: 90,
    justifyContent: 'center',
  },
})

export default RecipesRenderer
