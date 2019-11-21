import { ImageAssets, Place } from './index'

class MenuItem {

    constructor(object) {
        this._id = object._id;
        this.description = object.description;
        this.image = new ImageAssets(object.image || {});
        this.name = object.name;
        this.nominalPrice = object.nominalPrice;
        this.menuItemOptions = object.menuItemOptions || [];
        this.place = object.place || {};
    }

    static createArrayMenuItems(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new MenuItem(item);

        })
        return arrayTemplate;

    }


}

export { MenuItem };