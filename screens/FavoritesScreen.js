import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MealList from './../components/MealList';
import HeaderButton from './../components/HeaderButton';

const FavoriteScreen = ({ navigation }) => {
  const availableMeals = useSelector(state => state.meals.favoriteMeals);

  if (availableMeals.length === 0 || availableMeals) {
    return (
      <View style={styles.content}>
        <Text style={styles.fallbackText}>
          No favorite meals found. Start adding some!
        </Text>
      </View>
    );
  }

  return <MealList listData={availableMeals} navigation={navigation} />;
};

FavoriteScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='navicon'
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    fontSize: 19
  }
});

export default FavoriteScreen;
