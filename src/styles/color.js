const BASE_COLOR = {
    orange: '#FD7A23',
    lightBlue: '#6585A0',
    backgroundBlue: "#073A69",
    red: '#BD2D2D',
    gray: '#C1C0C9',
    white: '#FFFFFF',
    black: '#000000',
    lightGray: '#EEEEEE',
    darkGray: '#333333',
    backgroundColor: '#F8F8F8',
    facebookBlue: '#3b5998',
    green: '#40B36D',
    blue: '#399BF1',
}

const TAB_COLOR = {
    activeTintColor: BASE_COLOR.blue,
    inactiveTintColor: 'rgb(183, 183, 183)',
    backgroundColor: 'rgb(250, 250, 250)',
    borderTopColor: 'rgb(183, 183, 183)',//"transparent",// bez boje
}

const NAV_COLOR = {
    headerBackground: 'rgb(250, 250, 250)',
    tintColor: BASE_COLOR.darkGray,
    locationContent: BASE_COLOR.lightGray,
    borderBottomColor: TAB_COLOR.borderTopColor,
}
const STAR_COLOR = BASE_COLOR.orange//'#FFD700'

export { BASE_COLOR, TAB_COLOR, NAV_COLOR, STAR_COLOR };