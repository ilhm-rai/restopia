import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class DicodingRestaurantSource {
  static async restaurantList() {
    try {
      const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  static async addReview(review) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.TESTING_KEY,
      },
      body: JSON.stringify(review),
    });
    return response.json();
  }
}

export default DicodingRestaurantSource;
