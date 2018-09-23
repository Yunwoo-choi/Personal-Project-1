import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Modal, ScrollView, TextInput, ImageBackground, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash'
// import { connect } from 'react-redux';
// import { getDog } from './actions';
// import { loginPageWallpaper } from './images/loginPageWallpaper.jpg';




export default class Filter extends Component {

    render() {
        let { filterButtons, filterTitle, twoByTwoText } = styles;
        let types = ['STR', 'QCK', 'DEX', 'PSY', 'INT'];
        let classes = ['Fighter', 'Shooter', 'Slasher', 'Striker']
        let classes2 = ['Free Spirit', 'Cerebral', 'Power', 'Driven', 'Evolver', 'Booster']
        let captains = ['Type-Boosting Captains', 'Class-Boosting Captains', 'Universal Ask Boosting Captains', 'ATK Boosting Captains', 'RCV Boosting Captains', 'Special Boosting Captains', 'EXP Boosters', 'Drop Doublers', 'Beli Boosters', 'Healers', 'Damage Reducers'];
        let specials = ['Type-Boosting Specials', 'Class-Bosting Specials', 'Universal Atk Boosting Specials', 'Color Affinity Boosters', 'RCV Boosters', 'Orb Boosters', 'Orb Lockers', 'Delayers', 'Healers', 'Percent Healer Reducers', 'Poisoners', 'Poison Removers', 'Defense Reducers', 'Damage Nullifiers', 'Bind Reducers', 'Silence Reducers', 'Paralysis Reducers', 'Despair Reducers', 'Blindness Reducers', 'Chain Lockers', 'Chain Boosters'];
        let buttonColors = ['#FF4136', '#00CCFF', '#98FB98', '#FFD700', '#EE82EE']
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.filterModal}
                onRequestClose={() => {
                    this.props.filterModalHandler(false);
                }}
            >
                {/* Scroll View for All my Filters which are in a MODAL */}
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#505050' }}>
                        <TouchableOpacity style={{ backgroundColor: '#FFA07A' }}>
                            <Text style={filterButtons}>Clear Filters</Text>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'black', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginRight: -100 }}>
                            <Text style={[filterTitle]}>Type Filters</Text>
                            <TouchableOpacity onPress={() => this.props.filterModalHandler(false)} style={{ alignSelf: 'flex-end' }}>
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'right' }}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={types}
                            numColumns = {5}
                            keyExtractor={(item, index) => index + item}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={{ backgroundColor: buttonColors[index], flex: 1 }}>
                                    <Text style={filterButtons}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Text style={filterTitle}>Class Filters</Text>
                        <FlatList
                            data={classes}
                            numColumns = {4}
                            keyExtractor={(item, index) => index + item}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={{flex: 1 }}>
                                    <Text style={filterButtons}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <FlatList
                            data={classes2}
                            keyExtractor={(item, index) => index + item}
                            numColumns = {3}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={{ flex: 1 }}>
                                    <Text style={filterButtons}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Text style={filterTitle}>Captain Ability Filters</Text>
                        <View>
                            <FlatList
                                data={captains}
                                keyExtractor={(item, index) => index + item}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity>
                                        <Text style={twoByTwoText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>

                        <Text style={filterTitle}>Special Filters</Text>
                        <View>
                            <FlatList
                                data={specials}
                                keyExtractor={(item, index) => index + item}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity>
                                        <Text style={twoByTwoText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    filterButtons: {
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        borderWidth: 0.3,
    },
    filterTitle: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'black',
    },
    twoByTwoText: {
        backgroundColor: '#505050',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 0.3,
        marginBottom: -0.5
    },

})