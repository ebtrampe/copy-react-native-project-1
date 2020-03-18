import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import MealItem from './MealItem';

const MealList = props => {
  const { navigation, listData } = props;

  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  const renderMealItem = item => {
    const isFavorite = favoriteMeals.find(meal => meal.id === item.id);
    return (
      <MealItem
        title={item.title}
        duration={item.duration}
        complexity={item.complexity}
        affordability={item.affordability}
        image={item.imageUrl}
        onSelectMeal={() =>
          navigation.navigate('MealDetail', {
            mealId: item.id,
            mealTitle: item.title,
            isFav: isFavorite
          })
        }
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={listData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderMealItem(item)}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MealList;
