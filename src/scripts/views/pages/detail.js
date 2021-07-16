import DicodingRestaurantSource from '../../data/dicodingrestaurant-source';
import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import UrlParser from '../../routes/url-parser';
import FormReviewInitator from '../../utils/form-review-initiator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import { createCustomerReviewsTemplate, createRestaurantDetailTemplate, createSkelentonRestaurantDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
    <main id="mainContent">
      <section class="content">
        <div class="restaurant" id="restaurant">
          <!-- Data Restaurant -->
          ${createSkelentonRestaurantDetailTemplate()}
        </div>
      </section>
      <section class="content pt-0" id="containerCustomerReviews"></section>
      <section class="content pt-0" id="containerFormReview"></section>
      <div id="likeButtonContainer"></div>
    </main>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await DicodingRestaurantSource.detailRestaurant(url.id);
    if (restaurant) {
      const container = document.querySelector('#restaurant');
      container.innerHTML = createRestaurantDetailTemplate(restaurant);
      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurant: FavoriteRestaurantIdb,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          rating: restaurant.rating,
        },
      });

      document.querySelector('#containerCustomerReviews').innerHTML = createCustomerReviewsTemplate(restaurant.customerReviews);

      FormReviewInitator.init({
        formReviewContainer: document.querySelector('#containerFormReview'),
        restaurant: {
          id: restaurant.id,
        },
      });
    } else {
      document.querySelector('#mainContent').innerHTML = '<section class="content"><p>Gagal memuat restoran...</p></div>';
    }
  },
};

export default Detail;
