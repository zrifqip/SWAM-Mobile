import React from "react";
import { Image, TouchableOpacity } from 'react-native';
import { Colors } from '@styles';
import { RFValue } from 'react-native-responsive-fontsize';
import Modal from "react-native-modal";

function ModalPreview({
    image,
    onPress,
    isVisible
}) {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onPress}>
            <TouchableOpacity style={styles.contentPreview} onPress={onPress} activeOpacity={1}>
                <Image source={{uri: image}} style={styles.imagePreview}/>
            </TouchableOpacity>
        </Modal>
    )
}

export default ModalPreview

const styles = ({
    topSafeArea: {
        flex: 0, 
    },
    bottomSafeArea: {
        flex: 1,
    },
    contentPreview:{
        flex: 1, 
        backgroundColor: Colors.WHITE,
        borderRadius: RFValue(10)
    },
    imagePreview:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: RFValue(10)
    }
})