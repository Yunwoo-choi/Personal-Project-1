import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Modal, ScrollView, TextInput, FlatList, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { getCharacters } from './actions';
import Filter from './characters-filter/filter'
import { _ } from 'lodash'
// import { connect } from 'react-redux';
// import { getDog } from './actions';
// import { loginPageWallpaper } from './images/loginPageWallpaper.jpg';




class Characters extends Component {
    state = {
        filterModal: false,
        detailsModal: false,
        search: '',
        characterID: 1,
        isCompleteLoaded: false,
        characterThumbnail: [],
        initialNumber: 0,
        finalNumber: 205,
        arrayNames: [],
        test: [],
        newSearchID: []
    }


    filterModalHandler = (visible) => {
        this.setState({
            filterModal: visible
        })
    }

    detailsModalHandler = (visible) => {
        this.setState({
            detailsModal: visible
        })
    }

    renderSeparator = () => {
        return (<Image source={require('./images/plus.png')}
            style={{ height: 20, width: 20, marginTop: 10 }}
        />)
    }

    // filterThumbnails = search => {
    //     const formatSearch = search.toLowerCase()
    //     this.getArrayNames()
    //     const data = _.filter(this.state.arrayNames, user => {
    //         return this.contains(user, formatSearch);
    //     });
    //     this.setState ({
    //         test: data
    //     })
    // }

    contains = ({ aliases, id, units }, query) => {
        let newAliases = aliases.join(' ')
        if (newAliases.includes(query) || id == (query) || units[0].toLowerCase().includes(query)) {
            return true;
        }
        return false;
    }

    getArrayNames = search => {
        let newArrayNames = [];
        let {characterData} = this.props;
        for (i = 1; i <= 600; i++) {
            newArrayNames[i - 1] = { ...characterData.characters[i], aliases: characterData.characters[i].aliases.map(function (x) { return x.toLowerCase() }) }
        }
        this.getCharacterThumbnails()
        this.setSearchID()
        this.setState({
            arrayNames: newArrayNames
        },
            () => {
                console.log(this.state.arrayNames)
                const formatSearch = search.toLowerCase()
                const data = _.filter(this.state.arrayNames, user => {
                    return this.contains(user, formatSearch);
                });
                this.setState({
                    test: data
                },
                    () => {
                        let newArrayIndex = []
                        let searchID = []
                        for (let i = 1; i <= 600; i++) {
                            for (let j = 0; j < this.state.test.length; j++) {
                                if (this.state.test[j].units[0].toLowerCase() == characterData.characters[i].units[0].toLowerCase()) {
                                    newArrayIndex[j] = this.state.characterThumbnail[characterData.characters[i].id - 1]
                                    searchID[j] = characterData.characters[i].id
                                }
                            }
                        }
                        this.setState({
                            characterThumbnail: newArrayIndex,
                            newSearchID: searchID
                        })
                    }
                )
            }
        )
    }

    getCharacterThumbnails = () => {
        let newCharacterThumbnail = []
        for (let i = 0; i < 600; i++) {
            if (i < 9) {
                newCharacterThumbnail[i] = 'http://onepiece-treasurecruise.com/wp-content/uploads/f000' + (i + 1) + '.png'
            } else if (i < 99 && i >= 9) {
                newCharacterThumbnail[i] = 'http://onepiece-treasurecruise.com/wp-content/uploads/f00' + (i + 1) + '.png'
            } else if (i < 999 && i >= 99) {
                newCharacterThumbnail[i] = 'http://onepiece-treasurecruise.com/wp-content/uploads/f0' + (i + 1) + '.png'
            } else {
                newCharacterThumbnail[i] = 'http://onepiece-treasurecruise.com/wp-content/uploads/f' + (i + 1) + '.png'
            }
        }
        newCharacterThumbnail[573] = 'https://onepiece-treasurecruise.com/wp-content/uploads/f00574.png'
        newCharacterThumbnail[574] = 'https://onepiece-treasurecruise.com/wp-content/uploads/f00575.png'
        this.setState({
            characterThumbnail: newCharacterThumbnail,
        })
    }
    setSearchID = () => {
        let newSearchID = []
        for (let i = 0; i < 600; i++) {
            newSearchID[i] = i + 1;
        }
        this.setState({
            newSearchID: newSearchID
        })
    }
    componentDidMount() {
        this.props.navigation.setParams({
            filterModal: this.filterModalHandler
        });
        this.props.getCharacters()
        this.setSearchID()
        this.getCharacterThumbnails()
        this.setState({
            isCompleteLoaded: true,
        })
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: "Characters",
            headerLeft: (
                <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }} onPress={() => navigation.navigate('homepage')}>
                    <Image source={require('./images/backButton.png')} style={{ height: 20, width: 20 }} />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }} onPress={() => params.filterModal(true)}>
                    <Image source={require('./images/menu.png')} style={{ height: 40, width: 40, marginRight: 10 }} />
                </TouchableOpacity>
            )
        }
    };

    render() {
        let { filterButtons, filterTitle, twoByTwoText, detailsTable, tableDesign1 } = styles;
        let { search, characterDataStore } = this.state;
        let { characterData } = this.props
        return (
            <ImageBackground source={require('./images/luffyBackground.jpg')} style={{ width: '100%', height: '100%' }}>
                <View>
                    {/* My Filter Modal */}
                    <Filter filterModalHandler={this.filterModalHandler} filterModal={this.state.filterModal} />

                    {/*  Modal for Each Character Details  */}

                    {characterData && (<Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.detailsModal}
                        onRequestClose={() => {
                            this.detailsModalHandler(false);
                        }}
                    >
                        <ScrollView>
                            <Text style={{ backgroundColor: '#87cefa', fontSize: 20, textAlign: 'center' }}>{characterData.characters[this.state.characterID].units[0]}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: characterData.characters[this.state.characterID].res.image }}
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
                                    {characterData.characters[this.state.characterID].units[2].length === 2
                                        ? <View><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[2][0]}</Text><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[2][1]}</Text></View>
                                        : <Text style={detailsTable}>{characterData.characters[this.state.characterID].units[2]}</Text>
                                    }
                                </View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[1]}</Text></View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[3]}</Text></View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[4]}</Text></View>
                            </View>
                            <View style={[tableDesign1, { backgroundColor: '#C0C0C0' }]}>
                                <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Combo</Text></View>
                                <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Slots</Text></View>
                                <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Max Level</Text></View>
                                <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Exp to Max</Text></View>
                            </View>
                            <View style={[tableDesign1, { marginBottom: 0 }]}>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[5]}</Text></View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[6]}</Text></View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[7]}</Text></View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[8]}</Text></View>
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
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[9]}</Text></View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[10]}</Text></View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[11]}</Text></View>
                            </View>
                            <View style={[tableDesign1, { backgroundColor: '#C0C0C0', marginBottom: 0 }]}>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[7]}</Text></View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[12]}</Text></View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[13]}</Text></View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].units[14]}</Text></View>
                            </View>

                            {/* Character Abilities */}
                            <View style={{ borderBottomWidth: 2, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                                <Text style={{ fontSize: 20, marginLeft: 5 }}>Character Abilities</Text>
                            </View>
                            <View style={[tableDesign1, { marginTop: 5 }]}>
                                <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Captain Ability</Text></View>
                                {characterData.characters[this.state.characterID].abilityDetails == undefined
                                    ? <View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                                    : characterData.characters[this.state.characterID].abilityDetails.captain == undefined
                                        ? <View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                                        : typeof (characterData.characters[this.state.characterID].abilityDetails.captain) == 'object'
                                            ? <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].abilityDetails.captain.base}</Text></View>
                                            : <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].abilityDetails.captain}</Text></View>
                                }
                            </View>
                            <View style={tableDesign1}>
                                <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Sailor Ability</Text></View>
                                <View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                            </View>
                            <View style={tableDesign1}>
                                <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold' }]}>Special</Text></View>

                                {characterData.characters[this.state.characterID].abilityDetails != undefined
                                    ? <View style={{ flex: 1 }}>
                                        <Text style={[detailsTable, { fontWeight: 'bold' }]}>{characterData.characters[this.state.characterID].abilityDetails.specialName}</Text>
                                        <Text style={detailsTable}>{characterData.characters[this.state.characterID].abilityDetails.special}</Text>
                                    </View>
                                    : <View style={{ flex: 1 }}>
                                        <Text style={[detailsTable, { fontWeight: 'bold' }]}>None</Text>
                                        <Text style={detailsTable}>None</Text>
                                    </View>
                                }
                            </View>
                            <View style={tableDesign1}>
                                <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold', marginBottom: 0 }]}>Cooldown</Text></View>
                                {characterData.characters[this.state.characterID].cooldowns != undefined
                                    ? <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[this.state.characterID].cooldowns.toString()}</Text></View>
                                    :<View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                                }
                            </View>
                            {/* Evolution */}
                            <View style={{ borderBottomWidth: 2, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                                <Text style={{ fontSize: 20, marginLeft: 5 }}>Evolution</Text>
                            </View>
                            {characterData.characters[this.state.characterID].evolutions == undefined
                                ? <View style={[tableDesign1, { marginTop: 5, marginBottom: 15, justifyContent: 'center', alignContent: 'center' }]}></View>
                                : characterData.characters[this.state.characterID].evolutions.evolution.length >= 2
                                    ? <View style={[tableDesign1, { marginTop: 5, marginBottom: 15, justifyContent: 'center', alignContent: 'center' }]}>
                                        <FlatList
                                            data={characterData.characters[this.state.characterID].evolutions.evolvers[0]}
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
                                        <Image source={{ uri: characterData.characters[characterData.characters[this.state.characterID].evolutions.evolution[0]].res.thumbnail }}
                                            style={{ height: 30, width: 30, margin: 5 }}
                                        />
                                    </View>
                                    : <View style={[tableDesign1, { marginTop: 5, marginBottom: 15, justifyContent: 'center', alignContent: 'center' }]}>
                                        <FlatList
                                            horizontal={true}
                                            data={characterData.characters[this.state.characterID].evolutions.evolvers}
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
                                        <Image source={{ uri: characterData.characters[characterData.characters[this.state.characterID].evolutions.evolution].res.thumbnail }}
                                            style={{ height: 30, width: 30, margin: 5 }}
                                        />
                                    </View>
                            }
                        </ScrollView>

                    </Modal>)}
                    <ScrollView>
                        <View style={{ flexDirection: 'row', backgroundColor: 'white', margin: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.setState({ search: '' })}>
                                <Image source={require('./images/xButton.png')} style={{ height: 30, width: 30, marginLeft: 5 }} />
                            </TouchableOpacity>
                            <TextInput
                                style={{ height: 50, borderColor: 'gray', flex: 1, marginLeft: 10 }}
                                placeholder='Type to Filter'
                                underlineColorAndroid='transparent'
                                clearButtonMode='always'
                                onChangeText={search => { this.setState({ search }) }}
                                value={search}
                            />
                            <TouchableOpacity onPress={() => this.getArrayNames(this.state.search)}>
                                <Image source={require('./images/search_icon.png')} style={{ height: 40, width: 40 }} />
                            </TouchableOpacity>

                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {characterData && (<FlatList
                                data={this.state.characterThumbnail}
                                numColumns={7}
                                initialNumToRender={14}
                                ListEmptyComponent={<Text style={{ fontSize: 25, textAlign: 'center' }}>Nothing Was Found</Text>}
                                keyExtractor={(item, index) => index + ''}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => this.setState({ detailsModal: true, characterID: this.state.newSearchID[index] })}>
                                        <Image
                                            source={{ uri: item }}
                                            style={{ width: 51, height: 51 }}
                                        />
                                    </TouchableOpacity>
                                )}
                            />)}
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}
const mapStateToProps = state => ({
    characterData: state.characters.characterData
})

const mapDispatchToProps = dispatch => ({
    getCharacters: () => dispatch(getCharacters()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Characters);

const styles = StyleSheet.create({
    filterButtons: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
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
    buttonPressed: {
        backgroundColor: '#B00000',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 0.3,
        marginBottom: -0.5
    },
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