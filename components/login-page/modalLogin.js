import React, { Component } from 'react';
import { TouchableOpacity, Text, View, ImageBackground, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { addUser } from '../actions';

// import { connect } from 'react-redux';
// import { getDog } from './actions';
// import { loginPageWallpaper } from './images/loginPageWallpaper.jpg';

class LoginModal extends Component {



    render() {
        let { loginButton, buttonText, textInput, modalBackground, modal, modalBackground2, badPassword } = styles;
        // let isConfirmed = badEntry && { borderColor: 'red' }
        let incorrectLogin = this.props.badLogin && { borderColor: 'red' }

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.loginModalVisible}
                onRequestClose={() => {
                    this.props.navigateWithLogin(false, 0);
                }}
            >
                <View style={modal}>
                    <View style={modalBackground2}>
                        <TouchableOpacity onPress={() => this.props.navigateWithLogin(false, 0)} style={{ alignSelf: 'flex-end' }}>
                            <Text style={{ marginRight: 10, fontSize: 20 }}>X</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>Login</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Username</Text>
                        <TextInput
                            textAlign='center'
                            onChangeText={usernameLogin => this.props.changeState(undefined, undefined, undefined, undefined, usernameLogin, undefined) }
                            value={this.props.usernameLogin}
                            style={[textInput, incorrectLogin]}
                        />
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Password</Text>
                        <TextInput
                            secureTextEntry
                            textAlign='center'
                            onChangeText={passwordLogin => this.props.changeState(undefined, undefined, undefined, undefined, undefined, passwordLogin) }
                            value={this.props.passwordLogin}
                            style={[textInput, incorrectLogin]}
                        />
                        {this.props.badLogin && <Text style={badPassword}>Incorrect Username or Password</Text>}
                        <View style={{ backgroundColor: 'red', alignItems: 'flex-start' }}>
                            <Button
                                onPress={() => this.props.loginButton()}
                                text='Login'
                                title="Login"
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
export default LoginModal;


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