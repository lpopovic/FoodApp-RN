
import { ImageAssets, Category } from './index'

class Place {
    constructor(object) {
        this._id = object._id;
        this.avgRating = object.avgRating || '5.0';
        this.avgPriceTag = object.avgPriceTag || '1';
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
        let value = '$'
        if (this.avgPriceTag) {
            const roundValue = Math.round(Number(this.avgPriceTag))
            switch (roundValue) {
                case 1:
                    value = '$$'
                    break
                case 2:
                    value = '$$$'
                    break
                case 3:
                    value = '$$$$'
                    break
                case 4:
                    value = '$$$$$'
                    break
                default:
                    break
            }

        }
        return value
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

class PlaceDetail {
    constructor(object) {
        this.field = object.field || '';
        this.type = object.type || '';
        this.name = object.name || '';
        this.image = object.image || '';
    }
}
export { Place, PlaceDetail, PlaceCathering };