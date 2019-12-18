import { ImageAssets, Place, Category } from './index'

class MenuItem {

    constructor(object) {
        try{
            this._id = object._id || 'nesto';
            this.description = object.description;
            this.image = new ImageAssets(object.image || {});
            this.name = object.name;
            this.nominalPrice = object.nominalPrice;
            this.menuItemOptions = object.menuItemOptions || [];
            this.place = new Place(object.place || {});
            this.categories = Category.createArrayCategory(object.categories || [])
            this.hasSubtypes = object.hasSubtypes;
            this.sizeName = object.sizeName;
            this.subtypes = MenuItem.createArrayMenuItems(object.subtypes)

        } catch ( error){
            this._id = object._id || 'nesto';
            this.description = object.description;
            this.image = new ImageAssets(object.image || {});
            // this.image = object.image;
            this.name = object.name;
            this.nominalPrice = object.nominalPrice;
            this.menuItemOptions = object.menuItemOptions || [];
            // this.place = object.Place;
            this.place = new Place(object.place || {});
            this.categories = Category.createArrayCategory(object.categories || [])
            this.hasSubtypes = object.hasSubtypes;
            this.sizeName = object.sizeName;
            this.subtypes = [];
        }

    }

    static createArrayMenuItems(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new MenuItem(item);

        })
        return arrayTemplate;

    }


}

export { MenuItem };