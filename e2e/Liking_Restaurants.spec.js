const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty like restaurants', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.seeElement('#restaurants');
  I.see('Anda belum memiliki restoran favorit nih...', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Anda belum memiliki restoran favorit nih...', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant-item__name');

  const firstRestaurant = locate('.restaurant-item__name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantName = await I.grabTextFrom('.restaurant-item__name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});
