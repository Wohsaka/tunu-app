import React from 'react'
import { Searchbar, Surface } from 'react-native-paper'
import { StyleSheet } from 'react-native'

const AppSearchBar = (props) => {
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleSoftKeySearch = () => {
    search()
  }

  const search = () => {
    props.onSearch(searchQuery)
  }

  const onChangeSearch = (query) => setSearchQuery(query)

  return (
    <Surface style={styles.appBar} elevation={3}>
      <Searchbar
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={search}
        onSubmitEditing={handleSoftKeySearch}
        elevation={2}
        style={styles.searchBar}
      />
    </Surface>
  )
}

const styles = StyleSheet.create({
  appBar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  searchBar: {
    height: 40,
    width: '90%',
  },
})

export default AppSearchBar
