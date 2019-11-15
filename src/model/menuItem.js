import { ImageAssets } from './index'

class MenuItem {

    constructor(object) {
        this._id = object._id;
        this.description = object.description;
        this.image = new ImageAssets(object.image || {});
        this.name = object.name;
    }

    static createArrayMenuItems(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new MenuItem(item);

        })
        return arrayTemplate;

    }
}

export { MenuItem };