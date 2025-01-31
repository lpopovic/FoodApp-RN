import React, { Component } from 'react';
import {
    View,
    FlatList,
    Keyboard,
    StyleSheet
} from 'react-native';
import HistoryOrder from './HistoryOrder'
class HistoryOrderList extends Component {
    _onScroll = (event) => {
        Keyboard.dismiss()
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 4,
                    width: "100%",
                }}
            />
        );
    }

    render() {
        return (
            <FlatList
                refreshControl={this.props.refreshControl}
                style={styles.listContainer}
                data={this.props.arrayObject}
                onScroll={this._onScroll}
                keyExtractor={(item, index) => `${index.toString()}`}
                renderItem={(info) => (
                    <HistoryOrder
                        item={info.item}
                        isCatheringOrder={this.props.isCatheringOrder}
                        onPressDetailOrder={() => this.props.PressDetailOrder(info.item)}
                        onPressOrderAgain={() => this.props.PressOrderAgain(info.item)}
                        onPressReview={() => this.props.PressReview(info.item)}
                        onPressSeeMyReview={() => this.props.PressSeeMyReview(info.item)}
                    />
                )}
                ItemSeparatorComponent={this.FlatListItemSeparator}

            />
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        width: "100%",
    },
});


export default HistoryOrderList 