import DicodingRestaurantSource from '../../data/dicodingrestaurant-source';
import { createRestaurantItemTemplate, createSkelentonRestaurantItemTemplate } from '../templates/template-creator';

const RestaurantList = {
  async render() {
    return `
    <div class="hero">
        <picture>
          <source media="(max-width: 600px)" srcset="./images/heros/hero-image_2-small.jpg">
          <img src="./images/placeholder.jpg" data-src='./images/heros/hero-image_2-large.jpg' class="lazyload" alt="Restopia Hero" width="800" height="405"/>
        </picture>
        <div class="hero__inner">
            <h1 class="hero__title">Restopia</h1>
            <p class="hero__tagline">~ Temukan kehangatan berkumpul di restoran terbaik ~
            </p>
        </div>
    </div>
    <main id="mainContent">
      <section class="content">
        <div class="content-head">
            <h2 class="content-head__label">Rekomendasi Restoran</h2>
        </div>
        <div class="restaurants" id="restaurants-recomendation">
          <!-- Data Restaurants -->
          ${createSkelentonRestaurantItemTemplate()}
        </div>
      </section>

      <section class="content">
        <div class="content-head">
            <h2 class="content-head__label">Daftar Restoran</h2>
        </div>
        <div class="restaurants" id="restaurants-list">
          <!-- Data Restaurants -->
          ${createSkelentonRestaurantItemTemplate()}
        </div>
      </section>
    </main>
    `;
  },

  async afterRender() {
    const restaurants = await DicodingRestaurantSource.restaurantList();
    if (restaurants.length > 0) {
      document.querySelectorAll('.ssc').forEach((item) => {
        const restaurant = item;
        restaurant.style.display = 'none';
      });

      const filteredRestaurants = restaurants.filter(({ rating }) => rating > 4.5);
      filteredRestaurants.sort((a, b) => b.rating - a.rating).slice(0, 4).forEach((restaurant) => {
        document.querySelector('#restaurants-recomendation').innerHTML += createRestaurantItemTemplate(restaurant);
      });

      restaurants.forEach((restaurant) => {
        document.querySelector('#restaurants-list').innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } else {
      document.querySelector('#mainContent').innerHTML = '<section class="content"><p class="text-center">Gagal memuat restoran...</p></div>';
    }
  },
};

export default RestaurantList;
