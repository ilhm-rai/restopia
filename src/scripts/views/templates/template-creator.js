import CONFIG from '../../globals/config';

const createStarIcon = (rating) => {
  let html = '';
  for (let i = 1; i <= 5; i += 1) {
    if (i <= parseInt(rating, 10)) {
      html += '<span class="fa fa-star rated"></span>';
    }

    if (i > parseInt(rating, 10)) {
      html += '<span class="fa fa-star"></span>';
    }
  }
  return html;
};

const menusTemplate = (menus) => `
  ${menus.map((menu) => `
    <div class="restaurant__menus-item">
      <picture>
        <source type="image/webp" srcset="/images/menus/default.webp"/>
        <img src="/images/placeholder.jpg" data-src="/images/menus/default.png" class="restaurant__menus-image lazyload" alt="${menu.name}" width="100" height="100"/>
      </picture>
      <p class="restaurant__menus-name">${menu.name}
    </div>`).join('')}
`;

const createSkelentonRestaurantItemTemplate = () => `
  <div class="ssc ssc-card">
    <div class="ssc-wrapper">
      <div class="ssc-square mb"></div>
      <div class="ssc-line mb w-50"></div>
      <div class="ssc-line mb w-30"></div>
      <div class="inline-flex mb">
        <div class="ssc-circle ssc-circle__star mrs w-30"></div>
        <div class="ssc-circle ssc-circle__star mrs w-30"></div>
        <div class="ssc-circle ssc-circle__star mrs w-30"></div>
        <div class="ssc-circle ssc-circle__star mrs w-30"></div>
        <div class="ssc-circle ssc-circle__star mrs w-30"></div>
      </div>
      <div class="ssc-line"></div>
    </div>
  </div>
`;

const createSkelentonRestaurantDetailTemplate = () => `
  <div class="ssc ssc-wrapper">
    <div class="ssc-line mb w-20"></div>
    <div class="ssc-line mb w-40"></div>
    <div class="inline-flex mb">
      <div class="ssc-circle ssc-circle__star mrs w-30"></div>
      <div class="ssc-circle ssc-circle__star mrs w-30"></div>
      <div class="ssc-circle ssc-circle__star mrs w-30"></div>
      <div class="ssc-circle ssc-circle__star mrs w-30"></div>
      <div class="ssc-circle ssc-circle__star mrs w-30"></div>
    </div>
    <div class="ssc-square mb"></div>
    <div class="ssc-line mb"></div>
    <div class="ssc-line mb"></div>
    <div class="ssc-line mb"></div>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <article class="card js-restaurant-item">
    <a href="${`/#/detail/${restaurant.id}`}">
      <p style="display:none">${restaurant.name}</p>
      <div class="restaurant-item">
        <img src="./images/placeholder.jpg" data-src="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}" alt="${restaurant.name}" class="restaurant-item__thumbnail lazyload"  width="175" height="150">
        <h3 class="restaurant-item__name">${restaurant.name}</h3>
        <p class="restaurant-item__city">${restaurant.city}</p>
        <div class="rating">
          <div class="rating__icon">
            ${createStarIcon(restaurant.rating)}
          </div>
          <div class="rating__label">(${restaurant.rating})</div>
        </div>
      <p class="restaurant-item__description">${restaurant.description.substring(0, 125)}...</p>
      </div>
    </a>
  </article>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__name">${restaurant.name}</h2>
  <p class="restaurant__address">${restaurant.address}, ${restaurant.city}</p>
  <div class="rating">
    <div class="rating__icon">
      ${createStarIcon(restaurant.rating)}
    </div>
    <div class="rating__label">${restaurant.rating} (${restaurant.customerReviews.length} ulasan)</div>
  </div>
  <div class="restaurant__category">Tags: ${restaurant.categories.map((category) => `<div class="restaurant__tag">${category.name}</div>`).join('')}</div>
  <img src="./images/placeholder.jpg" data-src="${CONFIG.BASE_IMAGE_URL}large/${restaurant.pictureId}" alt="${restaurant.name}" class="restaurant__image lazyload" width="870" height="450">
  <p class="restaurant__description">${restaurant.description}</p>
  <div class="menus">
    <h3 class="menus__category">Makanan</h3>
    <div class="restaurant__menus">
      ${menusTemplate(restaurant.menus.foods)}
    </div>
    <h3 class="menus__category">Minuman</h3>
    <div class="restaurant__menus">
      ${menusTemplate(restaurant.menus.drinks)}
    </div>
  </div>
  <h3 class="content-head__label">Semua Ulasan (${restaurant.customerReviews.length})</h3>
`;

const createCustomerReviewsTemplate = (customerReviews) => `
  <div class="reviews">
    ${customerReviews.map((customer) => `
      <div class="customer-reviews">
        <div class="customer__profile">
          <picture>
            <source type="image/webp" srcset="/images/users/default.webp">
            <img src="/images/placeholder.jpg" data-src="/images/users/default.png" class="customer__profile-image lazyload" alt="Customer Profile" width="100" height="100"/>
          </picture>
        </div>
        <div class="customer__review">
          <div class="customer__review-head">
            <p class="customer__name">${customer.name}</p>
            <p class="customer__review-date">${customer.date}</p>
          </div>
          <div class="customer__review-body">
            <p class="customer__review-text">${customer.review}</p>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
`;

const createFormReviewTemplate = () => `
  <h4 class="content-head__label">Beri Ulasan</h4>
  <form id="formReview" action="" enctype="multipart/form-data" method="post">
    <div class="form-group">
    <label for="#name">Nama</label>
    <input id="name" name="name" type="text" class="form-control" aria-label="Name">
    <p class="error-message" data-id="name"></p>
    </div>
    <div class="form-group">
    <label for="#review">Ulasan</label>
    <textarea class="form-control" id="review" name="review" rows="5" aria-label="Review"></textarea>
    <p class="error-message" data-id="review"></p>
    </div>
    <button type="submit" class="btn btn-primary mt-5">Kirim</button>
  </form>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fas fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createSkelentonRestaurantItemTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createSkelentonRestaurantDetailTemplate,
  createFormReviewTemplate,
  createCustomerReviewsTemplate,
};
