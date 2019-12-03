import React, { Component } from 'react';
import {
    View,
    FlatList,
    Keyboard,
    StyleSheet
} from 'react-native';
import { HistoryOrder } from './HistoryOrder'
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
                keyExtractor={(index) => `${Math.random() * Math.random()}${index.toString()}`}
                renderItem={(info) => (
                    <HistoryOrder
                        item={info.item}
                        onPressDetailOrder={() => this.props.PressDetailOrder(info.item)}
                        onPressOrderAgain={() => this.props.PressOrderAgain(info.item)}
                        onPressReview={() => this.props.PressReview(info.item)}
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


export { HistoryOrderList }