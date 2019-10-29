class SreenName {
    
    static withKey = screen => `cateringapp_${screen}`

    static HomeScreen = () => { return this.withKey(`Home`) }
    static MapScreen = () => { return this.withKey(`Map`) }
    static CateringScreen = () => { return this.withKey(`Catering`) }
    static UserScreen = () => { return this.withKey(`User`) }
    static DetailScreen = () => { return this.withKey(`Detail`) }

    static TabNavigatorScreen = () =>{return this.withKey(`TabNavigator`)}
    
    static LoginScreen = () => { return this.withKey(`Login`) }
    static RegisterScreen = () => { return this.withKey(`Register`) }

    static MainLocationScreen = () => { return this.withKey(`MainLocation`) }
    

}
export { SreenName };
