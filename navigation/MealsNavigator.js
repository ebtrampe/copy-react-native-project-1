import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {
  CategoriesScreen,
  CategoryMealScreen,
  MealDetailsScreen,
  FavoriteScreen,
  FiltersScreen
} from './../screens';
import Colors from './../constants/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  // headerTitleStyle: {
  //   fontSize: 16
  // },
  // headerBackTitleStyle: {
  //   fontFamily
  // },
  headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primaryColor
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealScreen
    },
    MealDetail: {
      screen: MealDetailsScreen
    }
  },
  {
    initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: {
      screen: FavoriteScreen
    },
    MealDetail: {
      screen: MealDetailsScreen
    }
  },
  {
    initialRouteName: 'Favorites',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Home: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarLabel: 'Meals', // CAN BE A REACT NATIVE Text ELEMENT
      tabBarIcon: tabInfo => {
        return (
          <FontAwesome name='cutlery' size={21} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <FontAwesome name='star' size={21} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor
    }
  }
};

const MealsFaveTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: '#fff',
        shifting: true
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor
        }
      });

const FilterNavigator = createStackNavigator(
  {
    Filters: {
      screen: FiltersScreen
    }
  },
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters'
    // },
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFaveTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals'
      }
    },
    Filters: {
      screen: FilterNavigator,
      navigationOptions: {
        drawerLabel: 'Filters'
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontSize: 18
      }
    }
  }
);

export default createAppContainer(MainNavigator);
