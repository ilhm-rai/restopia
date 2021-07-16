const itActsAsFavoriteRestaurantModel = (favoriterestaurant) => {
  it('should return the restaurant that has been added', async () => {
    favoriterestaurant.putRestaurant({ id: 1 });
    favoriterestaurant.putRestaurant({ id: 2 });

    expect(await favoriterestaurant.getRestaurant(1))
      .toEqual({ id: 1 });
    expect(await favoriterestaurant.getRestaurant(2))
      .toEqual({ id: 2 });
    expect(await favoriterestaurant.getRestaurant(3))
      .toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    favoriterestaurant.putRestaurant({ wrongProperty: 'property' });

    expect(await favoriterestaurant.getAllRestaurants())
      .toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    favoriterestaurant.putRestaurant({ id: 1 });
    favoriterestaurant.putRestaurant({ id: 2 });

    expect(await favoriterestaurant.getAllRestaurants())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });

  it('should remove favorite restaurant', async () => {
    favoriterestaurant.putRestaurant({ id: 1 });
    favoriterestaurant.putRestaurant({ id: 2 });
    favoriterestaurant.putRestaurant({ id: 3 });

    await favoriterestaurant.deleteRestaurant(1);

    expect(await favoriterestaurant.getAllRestaurants())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    favoriterestaurant.putRestaurant({ id: 1 });
    favoriterestaurant.putRestaurant({ id: 2 });
    favoriterestaurant.putRestaurant({ id: 3 });

    await favoriterestaurant.deleteRestaurant(4);

    expect(await favoriterestaurant.getAllRestaurants())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });
};

export default itActsAsFavoriteRestaurantModel;
