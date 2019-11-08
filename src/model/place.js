
import { City, ImageAssets } from './index'

class Place {
    constructor(object) {
        this._id = object._id;
        this.avgRating = object.avgRating || '5.0';
        this.avgPriceTag = object.avgPriceTag || '$$$';
        this.numberOfReviews = object.numberOfReviews || '0';
        this.pickup = object.pickup;
        this.delivery = object.delivery || false;
        this.onlinePayment = object.onlinePayment;
        this.name = object.name;
        this.location = new City(object.location || {});
        this.image = new ImageAssets(object.image || {});
    }


    static createArrayPlaces(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new Place(item);

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
export { Place, PlaceDetail };