Feature('Unliking Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
  I.click(locate('.restaurant-item').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
});

Scenario('showing liked restaurant', ({ I }) => {
  I.seeElement('.restaurant-item');
});

Scenario('unliking one restaurant', ({ I }) => {
  I.seeElement('.restaurant-item');
  I.click(locate('.restaurant-item').first());

  I.dontSee('#likeButton');
  I.seeElement('button[aria-label="unlike this restaurant"');
  I.click('button[aria-label="unlike this restaurant"');

  I.amOnPage('/#/favorite');
  I.seeElement('#restaurants');
  I.see('Anda belum memiliki restoran favorit nih...', '.restaurant-item__not__found');
});
