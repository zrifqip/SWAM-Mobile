import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import AppNavigator from "./app-navigator";
import AuthNavigator from "./auth-navigator";

const Stack = createStackNavigator();

const RootNavigator = ({ auth }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            {auth.isLoggedIn ? (
                <Stack.Screen name="App" component={AppNavigator} options={{ headerShown: false }} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
            )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const mapStateToProps = function (state) {
    const { auth } = state;
    return { auth }
}

export default connect(mapStateToProps)(RootNavigator);