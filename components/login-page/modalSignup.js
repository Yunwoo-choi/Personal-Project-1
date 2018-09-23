import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Text, View, ImageBackground, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { addUser } from '../actions';

// import { connect } from 'react-redux';
// import { getDog } from './actions';
// import { loginPageWallpaper } from './images/loginPageWallpaper.jpg';

class SignUpModal extends Component {

    render() {

        let { loginButton, buttonText, textInput, modalBackground, modal, modalBackground2, badPassword } = styles;
        let isConfirmed = this.props.badEntry && { borderColor: 'red' }
        // let incorrectLogin = badLogin && { borderColor: 'red' }

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.signUpModalVisible}
                onRequestClose={() => {
                    this.props.navigateWithSignUp(false, 0);
                }}
            >
                <View style={modal}>
                    <View style={modalBackground}>
                        <TouchableOpacity onPress={() => this.props.navigateWithSignUp(false, 0)} style={{ alignSelf: 'flex-end' }}>
                            <Text style={{ marginRight: 10, fontSize: 20 }}>X</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>Sign Up</Text>
                        <Text>Username</Text>
                        <TextInput
                            textAlign='center'
                            onChangeText={username => { this.props.changeState(username, undefined, undefined, undefined, undefined, undefined) }}
                            value={this.props.username}
                            style={textInput}
                        />
                        <Text>Email</Text>
                        <TextInput
                            textContentType='emailAddress'    // for iOS auto-fill purposes; NOT validation
                            textAlign='center'
                            onChangeText={email => { this.props.changeState(undefined, email, undefined, undefined, undefined, undefined) }}
                            value={this.props.email}
                            style={textInput}
                        />
                        <Text>Password</Text>
                        <TextInput
                            secureTextEntry
                            textAlign='center'
                            onChangeText={password => { this.props.changeState(undefined, undefined, password, undefined, undefined, undefined) }}
                            value={this.props.password}
                            style={[textInput, isConfirmed]}
                        />
                        <Text>Confirm Password</Text>
                        <TextInput
                            secureTextEntry
                            textAlign='center'
                            onChangeText={confirm => { this.props.changeState(undefined, undefined, undefined, confirm, undefined, undefined) }}
                            value={this.props.confirm}
                            style={[textInput, isConfirmed]}
                        />

                        {/* Bad Password Message */}
                        {this.props.badEntry && <Text style={badPassword}>Passwords Do Not Match</Text>}
                        {this.props.invalidEntry && <Text style={badPassword}>Invalid Sign Up, Try Again</Text>}

                        <View style={{ backgroundColor: 'red', alignItems: 'flex-start' }}>
                            <Button
                                onPress={() => this.props.submitUser()}
                                text='Sign Up'
                                title="Sign Up!"
                                textStyle={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}
                            >
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default SignUpModal;

const styles = StyleSheet.create({
    loginButton: {
        height: 50,
        width: 100,
        backgroundColor: '#E96D63',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        opacity: 1
    },
    buttonText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: 'white',
        height: 40,
        width: 250,
        borderRadius: 10,
        borderColor: 'blue',
        borderWidth: 1,
        marginBottom: 10
    },
    modalBackground: {
        backgroundColor: 'white',
        opacity: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '60%',
        borderRadius: 40
    },
    modalBackground2: {
        backgroundColor: 'white',
        opacity: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '40%',
        borderRadius: 40
    },
    modal: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badPassword: {
        color: 'red',
        marginBottom: 5
    },
})