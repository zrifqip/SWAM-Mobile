import React, { Component } from "react";
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Colors, Font, StC } from "@styles";
import { Icon } from "native-base";
import { RFValue } from 'react-native-responsive-fontsize';
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from 'react-native-vector-icons/Feather';
import authUtils from '@utils/AuthUtils';

const number = [1,2,3,4,5,6,7,8,9]

const DottedOTP = (props) => (
    <View style={styles.dotted}>
        <View style={props.activeStyle}/>
    </View>
)

class ModalOTP extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputOTP: [],
            dottedStatus: '',
        }
    }

    _handleInputOTP = (OTP) => {
        const { inputOTP } = { ...this.state }
        const currentState = inputOTP
        if(currentState.length > 5) return;
        currentState.push(OTP)
        this.setState({ inputOTP: currentState })
        if(inputOTP.length === 6){
            let resultOTP = ''
            currentState.forEach((OTP) => {
                resultOTP += OTP
            })

            this._handleverifyOTP(resultOTP)
        }
    }

    _handleverifyOTP = async (otp) => {
        let temp = {
            otp         : parseFloat(otp),
            phoneNumber : this.props.phoneNumber
        }

        const verif = await authUtils.verifyOTP(temp)

        if(verif == 200){
            this.props.navigation.navigate('dashboard')
        } else {
            this.setState({inputOTP:[]})
        }
    }

    _handleDeleteInputOTP = () => {
        const { inputOTP } = { ...this.state }
        inputOTP.splice(inputOTP.length-1, 1)
        this.setState({ inputOTP: inputOTP })
    }

    _handleLongPress = () => {
        this.setState({
            inputOTP: []
        })
    }

    _resendOTP = () => {
        this.props.resendOTP()
    }

    render() {
        const { inputOTP } = this.state
        let dotted = []
        for(var i = 1; i <= 6; i++){
            dotted.push(
                <DottedOTP activeStyle={inputOTP.length >= i ? styles.dottedActive : styles.dottedInActive}/>
            )
        }

        return (
            <RBSheet
                ref={this.props.open}
                height={RFValue(500)}
                openDuration={250}
                customStyles={{
                    container: {
                        ... StC.centerPage
                    }
                }}
            >
                <View style={styles.modal}>
                    <Text style={Font.titleCenter}>Masukkan Kode OTP</Text>
                    <Text style={styles.descOTP}>OTP telah dikirimkan ke whatsapp yang telah Anda daftarkan</Text>
                    <View style={styles.dottedContainer}>
                        {dotted}
                    </View>
                    <FlatList
                        data={number}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.padButton} onPress={() => this._handleInputOTP(item)}>
                                <Text style={styles.inputPad}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        ListFooterComponent={(
                            <View style={StC.flexR}>
                                <View style={styles.padButton}/>
                                <TouchableOpacity style={styles.padButton} onPress={() => this._handleInputOTP(0)}>
                                    <Text style={styles.inputPad}>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.padButton} onPress={() => this._handleDeleteInputOTP()} onLongPress={() => this._handleLongPress()}>
                                    <Icon as={Feather} name={'delete'} color={Colors.DARK} size={RFValue(5)}/>
                                </TouchableOpacity>
                            </View>
                        )}
                    />             
                </View>
            </RBSheet>
        )
    }
}

export default ModalOTP;

const styles = StyleSheet.create({
    modal:{
        ... StC.wh100,
        borderRadius: RFValue(100),
        paddingVertical: RFValue(20),
        alignItems:'center',
    },
    dottedContainer: {
        ... StC.flexR,
        marginVertical: RFValue(20),
        alignItems: "center",
    },
    dotted:{
        ... StC.centerPage,
        width: RFValue(30),
        height: RFValue(30)
    },
    dottedActive: {
        width: RFValue(14),
        height: RFValue(14),
        borderRadius: RFValue(10),
        backgroundColor: Colors.PRIMARY,
    },
    dottedInActive: {
        width: RFValue(8),
        height: RFValue(8),
        borderRadius: RFValue(5),
        backgroundColor: '#696969',
    },
    txtCode:{
        ... Font.F11,
        ... Font.DARK,
        ... Font.Regular,
        ... StC.mB5
    },
    txtResend:{
        ... Font.F11,
        ... Font.PRIMARY,
        ... Font.Medium,
        ... StC.mB20
    },
    inputPad:{
        ... Font.F25,
        ... Font.DARK,
        ... Font.Regular
    },
    padButton: {
        width: RFValue(50),
        height: RFValue(50),
        borderRadius: RFValue(25),
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: RFValue(30),
        marginBottom: RFValue(30),
    },
    descOTP:{
        ... Font.F11,
        ... Font.DARK,
        ... Font.Regular
    },
})