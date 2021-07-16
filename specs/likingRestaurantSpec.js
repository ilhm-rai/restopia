import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking a Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.default({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]'))
      .toBeTruthy();
  });

  it('should does not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.default({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to like the movie', async () => {
    await TestFactories.default({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should does not add a movie again when its already like', async () => {
    await TestFactories.default({ id: 1 });

    // tambahkan restaurant dengan id 1 ke daftar restoran yang disukai
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    // simulasikan pengguna menekan tombol suka restoran
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should does not add a movie when it has no id', async () => {
    await TestFactories.default({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
