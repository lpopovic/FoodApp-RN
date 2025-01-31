import moment from 'moment';
import { generatePriceTagString } from '../helpers';

class Review {
    constructor(object) {
        this._id = object._id || 'Nedostupno'
        this.text = object.text || 'Nedostupno'
        this.rating = object.rating || '1.0';
        this.priceTag = object.priceTag || '1';
        this.author = object.author
        this.createdate = object.createdAt || null;
        this.orderId = object.order != null ? object.order._id : null;
    }

    getTextReview = () => {
        return this.text
    }

    getRatingReview = () => {
        return Number(this.rating) || 0
    }

    getPriceTag = () => {
        return generatePriceTagString(this.priceTag)
    }

    getAuthorReview = () => {
        let name = "-"

        if (this.author !== null) {
            // if (this.author.username !== null) {
            //     return String(this.author.username)
            // } else {
            //     return "USERNAME"
            // }
            return `${this.author.name !== null ? this.author.name : '-'} ${this.author.lastName !== null ? this.author.lastName : '-'} `
        } else {
            return name
        }

    }
    getHoursOrDate = () => {
        if (this.createdate !== null) {
            var now = moment(new Date(), "MM-DD-YYYY HH:mm")
            var end = moment.utc(this.createdate).local().format("MM-DD-YYYY HH:mm")

            var duration = moment.duration(now.diff(end))
            if (duration.asHours().toFixed() < 2) {
                return duration.asMinutes().toFixed() + ' minutes ago'
            } else if (duration.asHours().toFixed() >= 2 && duration.asHours().toFixed() <= 24) {
                return duration.asHours().toFixed() + ' hours ago'
            } else {
                return end
            }
        } else {
            return 'Nedostupno'
        }
    }
    static createArrayReview(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new Review(item);

        })
        return arrayTemplate;

    }
}

export { Review };