import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {checkLogin,signupAsync} from '../helper';

import LoadingViewComponent from './LoadingComponent'

class Register extends Component {
    state = {
        email: '',
        password: '',
        repassword: '',
        isLoading: false
    }
    render() {
        return (
            <Image source={require('../images/bg.jpg')}
                style={styles.imagebg}>

                <View
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>

                    <Image source={require('../images/logo.png')}
                        style={{
                            width: 250,
                            height: 90
                        }}
                    />

                    <View style={styles.viewForm}>
                        <Text style={styles.labelLogin}>Email :</Text>
                        <TextInput
                            style={styles.inputLogin}
                            onBlur={() => { Keyboard.dismiss() }}
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </View>

                    <View style={styles.viewForm}>
                        <Text style={styles.labelLogin}>Password :</Text>
                        <TextInput
                            style={styles.inputLogin}
                            secureTextEntry={true}
                            onBlur={() => { Keyboard.dismiss() }}
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                    <View style={styles.viewForm}>
                        <Text style={styles.labelLogin}>Repassword :</Text>
                        <TextInput
                            style={styles.inputLogin}
                            secureTextEntry={true}
                            onBlur={() => { Keyboard.dismiss() }}
                            onChangeText={(repassword) => this.setState({ repassword })}
                        />
                    </View>

                    <Button iconLeft rounded style={{
                        alignSelf: 'center',
                        marginTop: 20
                    }}
                        onPress={()=>signupAsync(this)}>
                        <Icon name='md-lock' />
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Register</Text>
                    </Button>

                    <Button
                        onPress={() => Actions.login({ type: 'reset' })}
                        transparent primary
                        style={{
                            alignSelf: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: 'center',
                                marginTop: 20,
                                color: 'white'
                            }}>Login</Text>
                    </Button>

                </View>
                <LoadingViewComponent isLoading={this.state.isLoading} />
            </Image>
        );
    }
}
const styles = StyleSheet.create({
    imagebg: {
        resizeMode: 'cover',
        width: null,
        height: null,
        flex: 1
    },
    viewForm: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    labelLogin: {
        color: 'white',
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 17,
        marginRight: 10,
        flex: 1
    },
    inputLogin: {
        height: 40,
        backgroundColor: 'white',
        flex: 2
    }
});
export default Register;
