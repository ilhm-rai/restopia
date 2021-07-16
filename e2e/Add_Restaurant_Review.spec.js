Feature('Add Restaurant Review');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Show error field name and field review are empty', ({ I }) => {
  I.seeElement('.restaurant-item');
  I.click(locate('.restaurant-item').first());

  I.seeInField('name', '');
  I.seeInField('review', '');
  I.click('#formReview button');

  I.seeElement('.error-message');
  I.see('failed to add review because you use blank or empty string for property \'name\'');
});

Scenario('Show error field name is empty', ({ I }) => {
  I.seeElement('.restaurant-item');
  I.click(locate('.restaurant-item').first());

  I.seeInField('name', '');
  I.fillField('review', 'Ulasan');
  I.click('#formReview button');

  I.seeElement('.error-message');
  I.see('failed to add review because you use blank or empty string for property \'name\'');
});

Scenario('Show error field review is empty', ({ I }) => {
  I.seeElement('.restaurant-item');
  I.click(locate('.restaurant-item').first());

  I.fillField('name', 'Nama');
  I.seeInField('review', '');
  I.click('#formReview button');

  I.seeElement('.error-message');
  I.see('failed to add review because no more strings added');
});

Scenario('Add Review', ({ I }) => {
  I.seeElement('.restaurant-item');
  I.click(locate('.restaurant-item').first());

  const customerName = 'Rizky';
  const reviewText = 'Sebuah ulasan';
  I.seeElement('form');
  I.fillField('name', customerName);
  I.fillField('review', reviewText);
  I.click('#formReview button');

  I.see(customerName, '.customer__name');
  I.see(reviewText, '.customer__review-text');
});
