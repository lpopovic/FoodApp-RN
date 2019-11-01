class ScreenName {
    
    static withKey = screen => `cateringapp_${screen}`

    static HomeScreen = () => { return this.withKey(`Home`) }
    static MapScreen = () => { return this.withKey(`Map`) }
    static CateringScreen = () => { return this.withKey(`Catering`) }
    static UserScreen = () => { return this.withKey(`User`) }
    static DetailScreen = () => { return this.withKey(`Detail`) }
    static PlaceDetailScreen = () => { return this.withKey('PlaceDetail')}

    static TabNavigatorScreen = () =>{return this.withKey(`TabNavigator`)}
    static OnboardingScreen = ()=>{return this.withKey(`Onboarding`)}
    static LoginScreen = () => { return this.withKey(`Login`) }
    static RegisterScreen = () => { return this.withKey(`Register`) }

    static MainLocationScreen = () => { return this.withKey(`MainLocation`) }
    
    static SplashScreen = () => { return this.withKey(`Splash`) }

}
export { ScreenName };
