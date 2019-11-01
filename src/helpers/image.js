const withKeyIcon = imageName => `../assets/icons/${imageName}`
const withKeyTestImage = imageName => `../assets/testImage/${imageName}`

class IconAssets {
    static template = withKeyIcon('TEMPLATE.PNG')
    static homeTabIcon = () => {return withKeyIcon('home_tab_icon.png')}
}
class TestAssets {
    static template = withKeyTestImage('TEMPLATE.PNG')
}



export { IconAssets, TestAssets };