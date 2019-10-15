const withKeyIcon = imageName => `../assets/icons/${rootImage}`
const withKeyTestImage = imageName => `../assets/testImage/${rootImage}`

class IconAssets {
    static template = withKeyIcon('TEMPLATE.PNG')
}
class TestAssets {
    static template = withKeyTestImage('TEMPLATE.PNG')
}



export { IconAssets, TestAssets };