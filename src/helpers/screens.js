class SreenName {
    
    static withKey = screen => `cateringapp_${screen}`

    static HomeScreen = () => { return this.withKey(`Home`) }
    static MapScreen = () => { return this.withKey(`Map`) }
    static CateringScreen = () => { return this.withKey(`Catering`) }
    static UserScreen = () => { return this.withKey(`User`) }
    static DetailScreen = () => { return this.withKey(`Detail`) }

}
export { SreenName };
