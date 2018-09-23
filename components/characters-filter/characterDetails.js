import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Modal, ScrollView, TextInput, ImageBackground, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash'
// import { connect } from 'react-redux';
// import { getDog } from './actions';
// import { loginPageWallpaper } from './images/loginPageWallpaper.jpg';


class CharacterDetails extends Component {
    render() {
        let { detailsTable, tableDesign1 } = styles;
        let {characterData, characterID} = this.props
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.detailsModal}
                onRequestClose={() => {
                    this.props.detailsModalHandler(false);
                }}
            >
                <ScrollView>
                    <Text style={{ backgroundColor: '#87cefa', fontSize: 20, textAlign: 'center' }}>{characterData.characters[characterID].units[0]}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: characterData.characters[characterID].res.image }}
                            style={{ height: 300, width: 300, marginTop: 20 }}
                        />
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={() => this.detailsModalHandler(false)}><Text style={{ fontSize: 20 }}>X</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 2, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>Details</Text>
                    </View>
                    {/* Character Details */}
                    <View style={[tableDesign1, { backgroundColor: '#C0C0C0', marginTop: 5, }]}>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Class</Text></View>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Type</Text></View>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Stars</Text></View>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Cost</Text></View>
                    </View>
                    {/* // [ "Name", "Type", [ "Class1", "Class2" ], Stars, Cost, Combo, Sockets, maxLVL, EXPToMax, lvl1HP, lvl1ATK, lvl1RCV, MAXHP, MAXATK, MAXRCV, Growth Rate ], */}
                    <View style={tableDesign1}>
                        <View style={{ flex: 1 }}>
                            {characterData.characters[characterID].units[2].length === 2
                                ? <View><Text style={detailsTable}>{characterData.characters[characterID].units[2][0]}</Text><Text style={detailsTable}>{characterData.characters[characterID].units[2][1]}</Text></View>
                                : <Text style={detailsTable}>{characterData.characters[characterID].units[2]}</Text>
                            }
                        </View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[1]}</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[3]}</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[4]}</Text></View>
                    </View>
                    <View style={[tableDesign1, { backgroundColor: '#C0C0C0' }]}>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Combo</Text></View>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Slots</Text></View>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Max Level</Text></View>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Exp to Max</Text></View>
                    </View>
                    <View style={[tableDesign1, { marginBottom: 0 }]}>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[5]}</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[6]}</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[7]}</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[8]}</Text></View>
                    </View>

                    {/* Character Stats */}
                    <View style={{ borderBottomWidth: 2, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>Stats</Text>
                    </View>
                    <View style={[tableDesign1, { backgroundColor: '#C0C0C0', marginTop: 5, }]}>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>level</Text></View>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>HP</Text></View>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>ATK</Text></View>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>RCV</Text></View>
                    </View>
                    {/* // [ "Name", "Type", [ "Class1", "Class2" ], Stars, Cost, Combo, Sockets, maxLVL, EXPToMax, lvl1HP, lvl1ATK, lvl1RCV, MAXHP, MAXATK, MAXRCV, Growth Rate ], */}
                    <View style={tableDesign1}>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>1</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[9]}</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[10]}</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[11]}</Text></View>
                    </View>
                    <View style={[tableDesign1, { backgroundColor: '#C0C0C0', marginBottom: 0 }]}>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[7]}</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[12]}</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[13]}</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].units[14]}</Text></View>
                    </View>

                    {/* Character Abilities */}
                    <View style={{ borderBottomWidth: 2, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>Character Abilities</Text>
                    </View>
                    <View style={[tableDesign1, { marginTop: 5 }]}>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Captain Ability</Text></View>
                        {characterData.characters[characterID].abilityDetails == undefined
                            ? <View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                            : characterData.characters[characterID].abilityDetails.captain == undefined
                                ? <View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                                : typeof (characterData.characters[characterID].abilityDetails.captain) == 'object'
                                    ? <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].abilityDetails.captain.base}</Text></View>
                                    : <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].abilityDetails.captain}</Text></View>
                        }
                    </View>
                    <View style={tableDesign1}>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Sailor Ability</Text></View>
                        <View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                    </View>
                    <View style={tableDesign1}>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Special</Text></View>

                        {characterData.characters[characterID].abilityDetails != undefined
                            ? <View style={{ flex: 1 }}>
                                <Text style={[detailsTable, { fontWeight: 'bold' }]}>{characterData.characters[characterID].abilityDetails.specialName}</Text>
                                <Text style={detailsTable}>{characterData.characters[characterID].abilityDetails.special}</Text>
                            </View>
                            : <View style={{ flex: 1 }}>
                                <Text style={[detailsTable, { fontWeight: 'bold' }]}>None</Text>
                                <Text style={detailsTable}>None</Text>
                            </View>
                        }
                    </View>
                    <View style={tableDesign1}>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold', marginBottom: 0 }]}>Cooldown</Text></View>
                        {characterData.characters[characterID].cooldowns != undefined
                            ? <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].cooldowns.toString()}</Text></View>
                            : <View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                        }
                    </View>
                    {/* Evolution */}
                    <View style={{ borderBottomWidth: 2, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>Evolution</Text>
                    </View>
                    {characterData.characters[characterID].evolutions == undefined
                        ? <View style={[tableDesign1, { marginTop: 5, marginBottom: 15, justifyContent: 'center', alignContent: 'center' }]}></View>
                        : characterData.characters[characterID].evolutions.evolution.length >= 2
                            ? <View style={[tableDesign1, { marginTop: 5, marginBottom: 15, justifyContent: 'center', alignContent: 'center' }]}>
                                <FlatList
                                    data={characterData.characters[characterID].evolutions.evolvers[0]}
                                    numColumns={5}
                                    ListEmptyComponent={<Text style={{ fontSize: 25, textAlign: 'center' }}>Nothing Was Found</Text>}
                                    ItemSeparatorComponent={this.renderSeparator}
                                    keyExtractor={(item, index) => index + ''}
                                    renderItem={({ item, index }) => (
                                        <Image source={{ uri: characterData.characters[item].res.thumbnail }}
                                            style={{ height: 30, width: 30, margin: 5 }}
                                        />
                                    )}
                                />
                                <Image source={require('./images/equal.png')} style={{ height: 20, width: 20, marginTop: 10 }} />
                                <Image source={{ uri: characterData.characters[characterData.characters[characterID].evolutions.evolution[0]].res.thumbnail }}
                                    style={{ height: 30, width: 30, margin: 5 }}
                                />
                            </View>
                            : <View style={[tableDesign1, { marginTop: 5, marginBottom: 15, justifyContent: 'center', alignContent: 'center' }]}>
                                <FlatList
                                    horizontal={true}
                                    data={characterData.characters[characterID].evolutions.evolvers}
                                    ListEmptyComponent={<Text style={{ fontSize: 25, textAlign: 'center' }}>Nothing Was Found</Text>}
                                    ItemSeparatorComponent={this.renderSeparator}
                                    keyExtractor={(item, index) => index + ''}
                                    renderItem={({ item, index }) => (
                                        <Image source={{ uri: characterData.characters[item].res.thumbnail }}
                                            style={{ height: 30, width: 30, margin: 5 }}
                                        />
                                    )}
                                />
                                <Image source={require('./images/equal.png')} style={{ height: 20, width: 20, marginTop: 10 }} />
                                <Image source={{ uri: characterData.characters[characterData.characters[characterID].evolutions.evolution].res.thumbnail }}
                                    style={{ height: 30, width: 30, margin: 5 }}
                                />
                            </View>
                    }
                </ScrollView>
                
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    characterData: state.characters.characterData
})

export default connect(mapStateToProps)(CharacterDetails);

const styles = StyleSheet.create({
    detailsTable: {
        fontSize: 17,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    tableDesign1: {
        borderColor: '#DCDCDC',
        borderWidth: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: -1
    }
})