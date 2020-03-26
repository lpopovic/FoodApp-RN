class ScreenName {

    static withKey = screen => `cateringapp_${screen}`

    static HomeScreen = () => { return this.withKey(`Home`) }
    static CategoryScreen = () => { return this.withKey(`Category`) }

    static MapScreen = () => { return this.withKey(`Map`) }
    static CateringScreen = () => { return this.withKey(`Catering`) }
    static UserScreen = () => { return this.withKey(`User`) }
    static DetailScreen = () => { return this.withKey(`Detail`) }
    static PlaceDetailScreen = () => { return this.withKey('PlaceDetail') }
    static MenuItemDetailsScreen = () => { return this.withKey('MenuItemDetails') }

    static TabNavigatorScreen = () => { return this.withKey(`TabNavigator`) }
    static OnboardingScreen = () => { return this.withKey(`Onboarding`) }
    static LoginScreen = () => { return this.withKey(`Login`) }
    static RegisterScreen = () => { return this.withKey(`Register`) }

    static MainLocationScreen = () => { return this.withKey(`MainLocation`) }

    static SplashScreen = () => { return this.withKey(`Splash`) }
    static PlaceListScreen = () => { return this.withKey(`PlaceList`) }
    static SearchScreen = () => { return this.withKey(`Search`) }
    static FilterScreen = () => { return this.withKey(`Filter`) }
    static ShopScreen = () => { return this.withKey(`Shop`) }

    static SearchTab = () => { return 'Search' }

    static ReviewScreen = () => { return this.withKey('Review') }

    static OrderDetailScreen = () => { return this.withKey('OrderDetail') }

    static ContactFormScreen = () => { return this.withKey('ContactForm') }
    static ReviewListScreen = () => { return this.withKey('ReviewList') }
    static UserSettingsScreen = () => { return this.withKey('UserSettings') }
    static LanguageScreen = () => { return this.withKey('Language') }

}
export { ScreenName };
