import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import { PlaceItem, PlaceSmallItem } from './PlaceItem'
import { BASE_COLOR } from '../../styles'


class PlaceList extends Component {
    renderFooter = () => {
        if (!this.props.loadingMore) return null;
        return (
            <ActivityIndicator
                size={"large"}
                color={BASE_COLOR.blue}
            />
        );
    };
    handleLoadMore = () => {
        if (!this.props.loadingMore) {
            this.props.loadMoreComponents()
        }
    };
    render() {
        return (
            <FlatList
                refreshControl={this.props.refreshControl}
                style={styles.listContainer}
                data={this.props.arrayObject}
                onScroll={this._onScroll}
                keyExtractor={(index) => `${index.toString()}`}
                renderItem={(info) => (
                    <PlaceItem
                        item={info.item}
                        onPress={() => this.props.onPressItem(info.item)}
                    />
                )}
                onEndReachedThreshold={0.4}
                onEndReached={this.handleLoadMore.bind(this)}
                ListFooterComponent={this.renderFooter.bind(this)}

            />
        )
    }

    _onScroll = (event) => {
        Keyboard.dismiss()
    }
}

class PlaceSectionList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const titleSection = this.props.titleSection ? this.props.titleSection : "NEPOZNATO"
        const titleSeeMore = "vidi sve"
        return (
            <View style={styles.mainContainer}>
                <View style={styles.sectionContainer}>
                    <Text style={styles.text}>{titleSection}</Text>
                    <TouchableOpacity onPress={() => this.props.onPressSeeMore()}>
                        <View style={styles.seeMoreContainer}>
                            <Text style={[styles.text, { color: BASE_COLOR.gray }]}>{titleSeeMore}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={styles.listContainer}
                    data={this.props.arrayObject}
                    horizontal
                    keyExtractor={(index) => `${index.toString()}`}
                    renderItem={(info) => (
                        <PlaceSmallItem
                            item={info.item}
                            setSmall
                            onPress={() => this.props.onPressItem(info.item)}
                        />
                    )}

                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        width: "100%",
    },
    sectionContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: BASE_COLOR.black,
        textAlign: 'center'
    },
    seeMoreContainer: {
        padding: 4,
    }
});


export { PlaceSectionList, PlaceList };