import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Text, View, ImageBackground, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { addUser } from '../actions';
import LoginModal from './modalLogin';
import SignUpModal from './modalSignup';

// import { connect } from 'react-redux';
// import { getDog } from './actions';
// import { loginPageWallpaper } from './images/loginPageWallpaper.jpg';

class LoginPage extends Component {
    state = {
        loginModalVisible: false,
        signUpModalVisible: false,

        username: '',
        email: '',
        password: '',
        confirm: '',
        usernameLogin: '',
        passwordLogin: '',

        blur: 0,
        badEntry: false,
        badLogin: false,
        invalidEntry: false
    }

    static navigationOptions = {
        header: null
    };

    changeState= (username = this.state.username, email = this.state.email, password = this.state.password, confirm = this.state.confirm, usernameLogin = this.state.usernameLogin, passwordLogin = this.state.passwordLogin) => {
        this.setState({
            username: username,
            email: email,
            password: password,
            confirm: confirm,
            usernameLogin: usernameLogin,
            passwordLogin: passwordLogin,
        })
    }


    navigateWithLogin = (visible, blur) => {
        this.setState({
            loginModalVisible: visible,
            blur: blur
        });

    }

    navigateWithSignUp = (visible, blur) => {
        this.setState({
            signUpModalVisible: visible,
            blur: blur
        });

    }

    loginButton = () => {
        for (let i = 0; i < this.props.users.length; i++) {
            if (this.state.usernameLogin === this.props.users[i].username && this.state.passwordLogin === this.props.users[i].password) {
                this.setState({
                    badLogin: false,
                    loginModalVisible: false
                })
                this.props.navigation.navigate('homepage');
            } else {
                this.setState({
                    badLogin: true
                })
            }
        }
    }

    submitUser = () => {
        let { username, email, password, confirm } = this.state;
        let newUser = {
            username,
            email,
            password,
            confirm
        }
        if (password !== confirm) {
            this.setState({ badEntry: true, password: '', confirm: '' })
        } else if (username === '' || email === '' || password === '' || confirm === '') {
            this.setState({ invalidEntry: true })
        } else {
            // ES6 Shorthand
            // sends up an object { username: username, email: email, password: password }
            this.props.addUser(newUser);
            this.setState({
                username: '',
                email: '',
                password: '',
                confirm: '',
                signUpModalVisible: false,
                blur: 0,
                badEntry: false
            })
        }
    }

    render() {
        let { loginButton, buttonText, textInput, modalBackground, modal, modalBackground2, badPassword } = styles;
        let { username, email, password, confirm, badEntry, badLogin, usernameLogin, passwordLogin, invalidEntry } = this.state;
        let isConfirmed = badEntry && { borderColor: 'red' }
        let incorrectLogin = badLogin && { borderColor: 'red' }
        console.log("HELLO!")
        return (
            <ImageBackground source={require('../images/loginPageWallpaper.jpg')} style={{ width: '100%', height: '100%' }} blurRadius={this.state.blur}>
                {/* Modal for my Login Page */}
                <LoginModal
                    navigateWithLogin={this.navigateWithLogin}
                    loginButton={this.loginButton}
                    changeState={this.changeState}
                    {...this.state}
                />

                {/* Modal for my Sign Up Page */}
                <SignUpModal
                    navigateWithSignUp={this.navigateWithSignUp}
                    submitUser={this.submitUser}
                    changeState = {this.changeState}
                    {...this.state}
                />

                {/* Actual Login Page */}
                <Text style={{ fontSize: 40, marginTop: 30, color: '#FFFFFF', fontWeight: 'bold' }}>OPTC Mobile</Text>
                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginBottom: 50, justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={loginButton} onPress={() => { this.navigateWithLogin(true, 2) }}>
                        <Text style={buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={loginButton} onPress={() => { this.navigateWithSignUp(true, 2) }}>
                        <Text style={buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground >

        );
    }
}

const mapStateToProps = state => ({
    users: state.loginPage.users
})

const mapDispatchToProps = dispatch => ({
    addUser: newUser => dispatch(addUser(newUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

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

