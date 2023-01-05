import * as React from 'react'
import {
  ActivityIndicator,
  Appbar,
  Button,
  Chip,
  IconButton,
  Modal,
  Surface,
  Text,
  withTheme,
} from 'react-native-paper'
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  Share,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RecipeModal = (props) => {
  const [isFav, setIsFav] = React.useState(false)

  const checkIsFav = async () => {
    try {
      let favRecipes = await AsyncStorage.getItem('@fav_recipes')
      if (favRecipes !== null) {
        favRecipes = await JSON.parse(favRecipes)
        favRecipes[props.recipe.url] ? setIsFav(true) : setIsFav(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    if (props.recipe) {
      checkIsFav()
    }
  }, [props.recipe])

  const addToFav = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@fav_recipes')
      let recipeProps = {}
      const recipePropsString = [
        'images',
        'label',
        'url',
        'image',
        'ingredientLines',
        'mealType',
        'cuisineType',
        'healthLabels',
        'dietLabels',
        'cautions',
        'yield',
      ].forEach((prop) => (recipeProps[prop] = props.recipe[prop]))

      if (jsonValue !== null) {
        const favRecipes = await JSON.parse(jsonValue)
        if (!favRecipes[recipeProps.url]) {
          favRecipes[recipeProps.url] = { recipe: recipeProps }
          setIsFav(true)
        } else {
          delete favRecipes[recipeProps.url]
          setIsFav(false)
        }
        await AsyncStorage.setItem('@fav_recipes', JSON.stringify(favRecipes))
        return
      }
      const favRecipes = { [recipeProps.url]: { recipe: recipeProps } }
      await AsyncStorage.setItem('@fav_recipes', JSON.stringify(favRecipes))
    } catch (error) {
      console.error(error)
    }
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: props.recipe.url,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }

  if (!props.recipe) {
    return (
      <Modal
        visible={props.visible}
        onDismiss={props.onDismiss}
        contentContainerStyle={{
          ...styles.modal,
          backgroundColor: props.theme.colors.surface,
        }}
      >
        <View>
          <ActivityIndicator size='large' />
        </View>
      </Modal>
    )
  }

  return (
    <Modal
      visible={props.visible}
      onDismiss={props.onDismiss}
      contentContainerStyle={{
        ...styles.modal,
        backgroundColor: props.theme.colors.surface,
      }}
    >
      <Surface style={styles.modalHeaderContainer}>
        <Text
          variant='titleMedium'
          style={{ width: '75%', textAlignVertical: 'center' }}
        >
          {props.recipe.label}
        </Text>
        <View style={styles.iconsContainer}>
          <IconButton
            icon='heart'
            style={{ width: 25, height: 25 }}
            onPress={addToFav}
            mode={isFav ? 'contained' : 'contained-tonal'}
          />
          <IconButton
            icon='share'
            style={{ width: 25, height: 25 }}
            onPress={onShare}
          />
        </View>
      </Surface>
      <ScrollView>
        <Image
          source={{ uri: props.recipe.image }}
          style={styles.modalImg}
          progressiveRenderingEnabled={true}
          resizeMode='stretch'
        />
        <Text variant='titleSmall'>Ingredients :</Text>
        {props.recipe.ingredientLines.map((ingredient, index) => (
          <Text key={index} variant='bodySmall'>
            {ingredient}
          </Text>
        ))}
        <Button
          onPress={async () => await Linking.openURL(props.recipe.url)}
          mode='contained'
          compact={true}
          style={{ width: 200, alignSelf: 'center', marginVertical: 10 }}
          contentStyle={{ width: 200 }}
        >
          See instructions
        </Button>
        <View>
          <Text variant='bodyMedium'>Servings: </Text>
          <View style={styles.chipsContainer}>
            <Chip style={styles.chip}>{props.recipe.yield}</Chip>
          </View>
        </View>
        <View contentContainerStyle={styles.chipsContainer}>
          <Text variant='bodyMedium'>Meal type:</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.chipsContainer}
          >
            {props.recipe.mealType.map((cuisine, index) => (
              <Chip
                mode='outlined'
                compact={true}
                style={styles.chip}
                key={index}
              >
                {cuisine}
              </Chip>
            ))}
          </ScrollView>
        </View>
        <View contentContainerStyle={styles.chipsContainer}>
          <Text variant='bodyMedium'>Cuisine type:</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.chipsContainer}
          >
            {props.recipe.cuisineType.map((cuisine, index) => (
              <Chip compact={true} style={styles.chip} key={index}>
                {cuisine}
              </Chip>
            ))}
          </ScrollView>
        </View>
        <View contentContainerStyle={styles.chipsContainer}>
          <Text variant='bodyMedium'>Health labels:</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.chipsContainer}
          >
            {props.recipe.healthLabels.map((cuisine, index) => (
              <Chip
                mode='outlined'
                compact={true}
                style={styles.chip}
                key={index}
              >
                {cuisine}
              </Chip>
            ))}
          </ScrollView>
        </View>
        <View contentContainerStyle={styles.chipsContainer}>
          <Text variant='bodyMedium'>Cautions:</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.chipsContainer}
          >
            {props.recipe.cautions.map((cuisine, index) => (
              <Chip compact={true} style={styles.chip} key={index}>
                {cuisine}
              </Chip>
            ))}
          </ScrollView>
        </View>
        <View>
          <Text variant='bodyMedium'>Diet labels:</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.chipsContainer}
          >
            {props.recipe.dietLabels.map((cuisine, index) => (
              <Chip
                mode='outlined'
                compact={true}
                style={styles.chip}
                key={index}
              >
                {cuisine}
              </Chip>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 15,
    width: 310,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderRadius: 4,
    marginBottom: 30,
  },
  modalImg: {
    width: 280,
    height: 200,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 4,
  },
  chipsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  chip: {
    marginLeft: 5,
    marginRight: 5,
  },
  modalHeaderContainer: {
    maxHeight: 80,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default withTheme(RecipeModal)
