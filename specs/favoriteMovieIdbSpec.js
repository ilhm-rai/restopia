import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import itActsAsFavoriteRestaurantModel from './contract/favoriteRestaurantContract';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (movie) => {
      await FavoriteRestaurantIdb.deleteRestaurant(movie.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
