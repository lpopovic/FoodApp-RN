import { Place, MenuItem } from './index'

class Order {
    constructor(object) {
        this._id = object._id
        this.totalAmount = object.totalAmount || 0
        this.orderedTime = object.orderedTime    //2019-11-28T11:37:20.175Z",
        this.specialInstructions = object.specialInstructions || ''
        this.company = object.company
        this.additionalPrice = object.additionalPrice || 0
        this.orderedMenuItems = object.orderedMenuItems || []
        this.place = new Place(object.place || {})
        this.orderType = object.orderType || "delivery"
        this.status = object.status
    }

    generateTitleOfOrder() {
        let title = []

        this.orderedMenuItems.forEach(menuItem => {
            var found = false;
            for (var i = 0; i < title.length; i++) {
                if (title[i].name == menuItem.food.name) {
                    found = true;
                    break;
                }
            }

            if (found) {
                title[i].quantity += 1
            } else {
                title.push({
                    quantity: 1,
                    name: menuItem.food.name
                })
            }
        });


        let textFinal = ''

        title.forEach(element => {
            textFinal = textFinal + `${element.quantity}x ${element.name}\n`
        });


        return `${textFinal.slice(0, -1)}`
    }


    static createArrayOrder(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new Order(item);

        })
        return arrayTemplate;

    }
}

export { Order };