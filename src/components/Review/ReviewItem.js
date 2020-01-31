import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import {
    STAR_COLOR,
    BASE_COLOR,
} from '../../styles'

class ReviewItem extends Component {

    render() {
        const { review } = this.props
        
        return (
            <View style={{ margin: 12, flex: 10, flexDirection: 'row' }}>

                <View style={{ flexDirection: 'column', alignItems: 'stretch', flex: 10 }}>
                    <View style={{ flexDirection: 'row', flex: 6 }}>
                        <View style={{ flex: 6, flexDirection: 'column' }}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{ fontWeight: 'bold', color: 'black', fontSize: 15 }}>
                                {review.getAuthorReview()}
                            </Text>

                        </View>
                        <StarRating
                            style={{ flex: 4 }}
                            disabled={true}
                            maxStars={5}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            rating={review.getRatingReview()}
                            starSize={15}
                            emptyStarColor={STAR_COLOR}
                            fullStarColor={STAR_COLOR}
                            containerStyle={styles.starContainerStyle}
                        />

                    </View>
                    <View style={{ flex: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Text style={{ color: '#9B9B9B', alignSelf: 'center' }}>{review.getHoursOrDate()}</Text>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: BASE_COLOR.white,
                                padding: 4,
                                backgroundColor: BASE_COLOR.blue,
                                width: 60,
                                textAlign: 'center'
                            }}>
                            {review.getPriceTag()}</Text>
                    </View>
                    <View style={{ flex: 10, marginTop: 5, flexDirection: 'column' }}>

                        <Text style={{ color: 'black' }}>{review.getTextReview()}</Text>
                    </View>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});


export default ReviewItem;