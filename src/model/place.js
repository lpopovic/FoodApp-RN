
import { ImageAssets, Category } from './index'
import { generatePriceTagString } from '../helpers';

class Place {
    constructor(object) {
        this._id = object._id;
        this.avgRating = object.avgRating || '0';
        this.avgPriceTag = object.avgPriceTag || '0';
        this.numberOfReviews = object.numberOfReviews || '0';
        this.pickup = object.pickup;
        this.delivery = object.delivery || false;
        this.estimatedDeliveryTime = object.estimatedDeliveryTime || 'any'
        this.onlinePayment = object.onlinePayment;
        this.name = object.name;
        this.setupCoordinate(object.location);
        this.image = new ImageAssets(object.image || {});
        this.description = object.description;
        this.openDays = object.openDays;
        this.categories = Category.createArrayCategory(object.categories || [])
        this.deliveryPrice = object.deliveryPrice || 0
    }

    returnAvgPriceTag = () => {
        let value = '-'
        if (this.avgPriceTag) {
            return generatePriceTagString(this.avgPriceTag)
        } else {
            return value
        }
    }
    setupCoordinate = (location) => {
        if (location) {
            if (location.coordinates.length == 2) {
                this.coordinate = {
                    latitude: location.coordinates[1],
                    longitude: location.coordinates[0],
                }
            } else {
                this.coordinate = {
                    latitude: null,
                    longitude: null,
                }
            }

        } else {
            this.coordinate = {
                latitude: null,
                longitude: null,
            }
        }
    }
    static createArrayPlaces(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new Place(item);

        })
        return arrayTemplate;

    }
}

class PlaceCathering {
    constructor(object) {
        this._id = object._id;
        this.place = new Place(object.place);
    }

    static createArrayPlacesCathering(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new PlaceCathering(item);

        })

        return arrayTemplate;
    }
}

class PlaceFavorite {
    constructor(object) {
        this._id = object._id;
        this.place = object.place._id || object.place;
    }

    static createArrayPlacesFavorite(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new PlaceFavorite(item);

        })

        return arrayTemplate;
    }
}
class PlaceDetail {
    constructor(object) {
        this.field = object.field || '';
        this.type = object.type || '';
        this.name = object.name || '';
        this.image = object.image || '';
    }
}
export { Place, PlaceDetail, PlaceCathering, PlaceFavorite };