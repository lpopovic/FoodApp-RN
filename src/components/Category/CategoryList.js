import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native';
import CategoryItem from './CategoryItem'
import { BASE_COLOR } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
class CategorySectionList extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        const { titleSection, titleSeeMore } = this.props

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
                    keyExtractor={(item, index) => `${index.toString()}`}
                    renderItem={(info) => (
                        <CategoryItem
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

class CategoryList extends Component {
    render() {
        return (
            <FlatList
                refreshControl={this.props.refreshControl}
                style={styles.listContainer}
                data={this.props.arrayObject}
                numColumns={2}
                keyExtractor={(item, index) => `${index.toString()}`}
                renderItem={(info) => (
                    <CategoryItem
                        item={info.item}
                        onPress={() => this.props.onPressItem(info.item)}
                    />
                )}

            />
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
        paddingLeft: 8, //16
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


export { CategorySectionList, CategoryList };