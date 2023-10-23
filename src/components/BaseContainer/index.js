import React, { Fragment } from "react";
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from "@styles";
import { Loading } from "@components";

const BaseContainer = ({
    children, 
    loading,
}) => {
        
    return (
        <Fragment>
            <SafeAreaView style={styles.bottomSafeArea}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.WHITE} />
                {children}
                <Loading loading={loading}/>
            </SafeAreaView>
        </Fragment>
    )
}

export default BaseContainer;


const styles = StyleSheet.create({
    topSafeArea: {
        flex: 0, 
        backgroundColor: Colors.PRIMARY_SOFT
    }, 
    bottomSafeArea: {
        flex:1,
        backgroundColor: Colors.BACKGROUND
    }
});