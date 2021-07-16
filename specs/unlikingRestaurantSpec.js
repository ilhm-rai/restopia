import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.default({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]'))
      .toBeTruthy();
  });

  it('should does not display like widget when the restaurant has been liked', async () => {
    await TestFactories.default({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.default({ id: 1 });

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not trow error if the unliked resturant is not in the list', async () => {
    await TestFactories.default({ id: 1 });

    // hapus restoran dari daftar restoran yang disukai
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    // simulasi pengguna menekan widget batal menyukai film
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
