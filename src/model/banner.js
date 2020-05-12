export const bannerTypeEnum = {
    hero: 'hero',
}

export const bannerSubTypeEnum = {
    place: 'place',
    menuItem: 'menuItem',
    custom: 'custom',
}

class Banner {
    constructor(object) {
        this._id = object._id || null;
        this.type = object.type || null;
        this.subtype = object.subtype || null;
        this.title = object.title || null;
        this.description = object.description || null;
        this.image = object.image || null;
        this.customLink = object.customLink || null;
        this.place = object.place || null;
        this.menuItem = object.menuItem || null;

    }

    getTitle = () => {
        return this.title !== null ? this.title : '-'
    }
    getDescription = () => {
        return this.description !== null ? this.description : '-'
    }
    getImage = () => {
        return this.image !== null ? this.image : undefined
    }
    getPlace = () => {
        return this.place !== null ? this.place : '-'
    }
    getMenuItem = () => {
        return this.menuItem !== null ? this.menuItem : '-'
    }
    getCustomLink = () => {
        return this.customLink !== null ? this.customLink : '-'
    }

    static createArrayTemplate(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new Banner(item);

        })
        return arrayTemplate;
    }

    onPressHeroTypeBanner(place, menuItem, custom) {
        switch (this.type) {
            case bannerTypeEnum.hero:
                switch (this.subtype) {
                    case bannerSubTypeEnum.custom:
                        custom(this.getCustomLink())
                        break;
                    case bannerSubTypeEnum.menuItem:
                        menuItem(this.getMenuItem())
                        break;
                    case bannerSubTypeEnum.place:
                        place(this.getPlace())
                        break;
                    default:
                        break;
                }


                break;

            default:
                break;
        }
    }

}

export { Banner };

// {
//     "_id": "5ea0431c0cf8dd247c443730",
//     "published": true,
//     "customLink": null,
//     "place": "5da99a884157831bf8c616c6",
//     "menuItem": null,
//     "globalBanner": true,
//     "cities": [],
//     "image": "https://thecounter.org/wp-content/uploads/2018/05/mcdonalds-reduce-greenhouse-gas-emissions-hamburger.png",
//     "description": "test klopica",
//     "type": "hero",
//     "subtype": "place",
//     "owner": "5d97121b08d44419247a871b",
//     "createdAt": "2020-04-22T13:14:04.555Z",
//     "updatedAt": "2020-04-22T13:14:04.555Z",
//     "__v": 0
// },