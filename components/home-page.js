import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Modal, ImageBackground} from 'react-native';

// import { connect } from 'react-redux';
// import { getDog } from './actions';
// import { loginPageWallpaper } from './images/loginPageWallpaper.jpg';



class HomePage extends Component {

    static navigationOptions = {
        title: 'Home Page',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };

    render() {
        let {loginButton1,loginButton2, loginButton3, loginButton4, buttonText, container} = styles
        return (
            <ImageBackground source={require('./images/merryGoing.jpg')} style={{ width: '100%', height: '100%' }}>

            <View style = {container}>
                <Image source = {require('./images/strawhats.png')} style= {{height: 250, width: 400, marginBottom: -31, zIndex: 11, marginTop: -60}}/>
                <TouchableOpacity style={[loginButton1]} onPress={() => { this.props.navigation.navigate('teamcalculator') }}>
                    <Text style={buttonText}>Team Calculator</Text>
                </TouchableOpacity>
                <TouchableOpacity style={loginButton2} onPress={() => { this.props.navigation.navigate('characters') }}>
                    <Text style={buttonText}>Characters</Text>
                </TouchableOpacity>
                <TouchableOpacity style={loginButton3} onPress={() => {  }}>
                    <Text style={buttonText}>User Box</Text>
                </TouchableOpacity>
                <TouchableOpacity style={loginButton4} onPress={() => {  }}>
                    <Text style={buttonText}>Islands</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        );
    }
}

export default HomePage;


const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButton1: {
        height: 80,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 0, 
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20, 
        marginBottom: 10, 
        backgroundColor: '#FF96CC', 
        zIndex: 10,
    },
    loginButton2: {
        height: 80,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5 ,
        marginBottom: 10,
        backgroundColor: '#96FF9C'
    },
    loginButton3: {
        height: 80,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5, 
        marginBottom: 10,
        backgroundColor: '#79E9ED'
    },
    loginButton4: {
        height: 80,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#FF4F64'
    },
    buttonText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
})
