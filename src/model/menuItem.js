import { ImageAssets, Place, Category } from './index'

class MenuItem {

    constructor(object) {
            this._id = object._id || 'nesto';
            this.description = object.description;
            this.image = new ImageAssets(object.image || {});
            this.name = object.name;
            this.nominalPrice = object.nominalPrice;
            this.menuItemOptions = object.menuItemOptions || [];
            this.place = new Place(object.place || {});
            this.categories = Category.createArrayCategory(object.categories || [])

    }

    static createArrayMenuItems(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new MenuItem(item);

        })
        return arrayTemplate;

    }


}

export { MenuItem };