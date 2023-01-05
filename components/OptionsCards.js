import * as React from 'react'
import { Button, Card, List, Surface, Text, Avatar } from 'react-native-paper'
import { ScrollView, View, StyleSheet } from 'react-native'
import AppSearchBar from './AppSearchBar'

const OptionsCards = (props) => {
  const [filteredOptions, setFilteredOptions] = React.useState(props.options)
  const handleFilter = (query) => {
    if (query === '') {
      setFilteredOptions(props.options)
      return
    }
    setFilteredOptions(
      props.options.filter((option) =>
        option.key.toLowerCase().includes(query.toLowerCase())
      )
    )
  }

  if (props.list) {
    return (
      <View>
        <AppSearchBar onSearch={handleFilter} />
        <ScrollView
          style={{ marginBottom: 60 }}
          contentContainerStyle={{ minHeight: '100%' }}
        >
          <Surface style={styles.listContainer}>
            {filteredOptions.map((option, index) => {
              return (
                <Surface style={styles.listItem} key={index}>
                  <View
                    style={{
                      ...styles.listItemView,
                      borderColor: props.theme.colors.outlineVariant,
                    }}
                    onPress={() => props.onTouch(option.key)}
                  >
                    <List.Item
                      titleStyle={styles.listItemTitle}
                      title={option.key}
                      onPress={() => props.onTouch(option.key)}
                      right={() => (
                        <Avatar.Icon
                          size={30}
                          icon='chevron-right'
                          style={{ alignSelf: 'center' }}
                        />
                      )}
                      style={{ paddingVertical: 4 }}
                    />
                  </View>
                </Surface>
              )
            })}
          </Surface>
        </ScrollView>
      </View>
    )
  }

  return (
    <ScrollView>
      <Surface>
        {props.options.map((option, index) => {
          return (
            <View key={index} style={styles.cardContainer}>
              <Card key={option.key}>
                <Card.Cover source={option.img} />
                <View style={styles.buttonContainer}>
                  <Text variant='titleLarge'>{option.key}</Text>

                  <Button
                    mode='contained'
                    compact={true}
                    onPress={() => props.onTouch(option.key)}
                    style={styles.button}
                  >
                    See more
                  </Button>
                </View>
              </Card>
            </View>
          )
        })}
      </Surface>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    width: 100,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
  listItem: {
    width: '90%',
    padding: 5,
  },
  listItemTitle: {
    fontSize: 20,
    lineHeight: 20,
  },
  listItemView: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 5,
  },
})

export default OptionsCards
