import React from "react";
import { Image, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import {
    Account,
    Chats,
    ChatsRoom,
    CompanyDashboard,
    CompanyProfile,
    CompanyWasteBank,
    CompanyWasteBankDetail,
    OnBoarding,
    ResultsAddress,
    ResultsCategory,
    ResultsCustomers,
    ResultsSchedule,
    ResultsWasteBank,
    SettingLanguage,
    UsersDashboard,
    UsersProfile,
    UsersTransaction,
    UsersTransactionDetails,
    UsersWasteBank,
    UsersWasteBankDetail,
    UsersWithdraw,
    WasteBankCustomers,
    WasteBankDashboard,
    WasteBankProduct,
    WasteBankProductForm,
    WasteBankProfile,
    WasteBankTransaction,
    WasteBankTransactionDetails,
    WasteBankTransactionForm,
    WasteBankWithdraw
} from "@scenes";
import { Icons } from "@assets";
import { Colors, Font } from "@styles";
import { HorizontalSlide } from "./CustomTransaction";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useTranslation } from "@utils";
import { RFValue } from "react-native-responsive-fontsize";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabsUsers = () => {
    const { translations } = useTranslation();

    return (
        <Tab.Navigator
            initialRouteName="UsersDashboard"
            backBehavior="initialRoute"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    paddingBottom: 10,
                    paddingTop: 10,
                    minHeight: 64,
                    borderTopWidth: 0,
                    alignItems: "center",
                    display: route.name === "AddTransaction" ? "none" : "flex",
                },
                tabBarLabel: ({ focused }) => {
                    let title;

                    switch (route.name) {
                      case "UsersDashboard":
                        title = translations["home"];
                        break;
                      case "UsersWasteBank":
                        title = translations["waste.bank"];
                        break;
                      case "UsersTransaction":
                        title = translations["transaction"];
                        break;
                      case "Account":
                        title = translations["account"];
                        break;
                      
                }
                return <Text style={[Font.Regular, { fontSize: RFValue(10), color: focused ? Colors.PRIMARY : Colors.GRAY_LABEL }]}>{title}</Text>;
            },
            tabBarIcon: ({ focused }) => {
                let iconName, style;

                switch (route.name) {
                    case "UsersDashboard":
                        iconName = focused ? Icons.homeTabActive : Icons.homeTab;
                        style = { width: wp(7), height: hp(4) };
                        break;
                    case "UsersWasteBank":
                        iconName = focused ? Icons.scheduleTabActive : Icons.scheduleTab;
                        style = { width: wp(7), height: hp(4) };
                        break;
                    case "UsersTransactionForm":
                        iconName = Icons.addHome;
                        style = { marginTop: 10 };
                        break;
                    case "UsersTransaction":
                        iconName = focused ? Icons.transactionTabActive : Icons.transactionTab;
                        style = { width: wp(7), height: hp(4) };
                        break;
                    case "Account":
                        iconName = focused ? Icons.accountTabActive : Icons.accountTab;
                        style = { width: wp(8), height: hp(4) };
                        break;
                }
                return <Image style={style} source={iconName} />;
            },
        })}>
            <Tab.Screen name="UsersDashboard" component={UsersDashboard} options={{ headerShown: false }} />
            <Tab.Screen name="UsersWasteBank" component={UsersWasteBank} options={{ headerShown: false }} />
            <Tab.Screen name="UsersTransaction" component={UsersTransaction} options={{ headerShown: false }} />
            <Tab.Screen name="Account" component={Account} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

const MainTabWasteBank = () => {
    const { translations } = useTranslation();

    return (
        <Tab.Navigator
            initialRouteName="WasteBankDashboard"
            backBehavior="initialRoute"
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    paddingBottom: 10,
                    paddingTop: 10,
                    minHeight: 64,
                    borderTopWidth: 0,
                    alignItems: "center",
                    display: route.name === "AddTransaction" ? "none" : "flex",
                },
                tabBarLabel: ({ focused }) => {
                let title;

                switch (route.name) {
                    case 'WasteBankDashboard':
                        title = translations['home'];
                        break;
                    case 'WasteBankProduct':
                        title = translations['product'];
                        break;
                    case 'WasteBankTransaction':
                        title = translations['transaction'];
                        break;
                    case 'Account':
                        title = translations['account'];
                        break;
                }
                return <Text style={[Font.Regular, { fontSize: RFValue(10), color: focused ? Colors.PRIMARY : Colors.GRAY_LABEL }]}>{title}</Text>;
            },
            tabBarIcon: ({ focused }) => {
                let iconName, style;

                switch (route.name) {
                    case 'WasteBankDashboard':
                        iconName = focused ? Icons.homeTabActive : Icons.homeTab;
                        style = { width: wp(7), height: hp(4) };
                        break;
                    case 'WasteBankProduct':
                        iconName = focused ? Icons.scheduleTabActive : Icons.scheduleTab;
                        style = { width: wp(7), height: hp(4) };
                        break;
                    case "WasteBankTransactionForm":
                        iconName = Icons.addHome;
                        style = { marginTop: 10 };
                        break;
                    case 'WasteBankTransaction':
                        iconName = focused ? Icons.transactionTabActive : Icons.transactionTab;
                        style = { width: wp(7), height: hp(4) };
                        break;
                    case 'Account':
                        iconName = focused ? Icons.accountTabActive : Icons.accountTab;
                        style = { width: wp(8), height: hp(4) };
                        break;
                  
                }
                return <Image style={style} source={iconName} />;
            },
        })}>
            <Tab.Screen name="WasteBankDashboard" component={WasteBankDashboard} options={{ headerShown: false }} />
            <Tab.Screen name="WasteBankProduct" component={WasteBankProduct} options={{ headerShown: false }} />
            <Tab.Screen
                name="WasteBankTransactionForm"
                component={WasteBankTransactionForm}
                options={{ headerShown: false, tabBarStyle: { display: "none" } }}
            />
            <Tab.Screen name="WasteBankTransaction" component={WasteBankTransaction} options={{ headerShown: false }} />
            <Tab.Screen name="Account" component={Account} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};


const MainTabsCompany = () => {
    const { translations } = useTranslation();

    return (
        <Tab.Navigator
            initialRouteName="CompanyDashboard"
            backBehavior="initialRoute"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    paddingBottom: 10,
                    paddingTop: 10,
                    minHeight: 64,
                    borderTopWidth: 0,
                    alignItems: "center",
                    display: route.name === "AddTransaction" ? "none" : "flex",
                },
                tabBarLabel: ({ focused }) => {
                    let title;

                    switch (route.name) {
                        case "CompanyDashboard":
                            title = translations["home"];
                            break;
                        case "CompanyWasteBank":
                            title = translations["waste.bank"];
                            break;
                        case "Account":
                            title = translations["account"];
                            break;  
                    }

                    return <Text style={[Font.Regular, {  fontSize: RFValue(10), color: focused ? Colors.PRIMARY : Colors.GRAY_LABEL }]}>{title}</Text>;
                },
                tabBarIcon: ({ focused }) => {
                    let iconName, style;

                    switch (route.name) {
                    case "CompanyDashboard":
                        iconName = focused ? Icons.homeTabActive : Icons.homeTab;
                        style = { width: wp(7), height: hp(4) };
                        break;
                    case "CompanyWasteBank":
                        iconName = focused ? Icons.scheduleTabActive : Icons.scheduleTab;
                        style = { width: wp(7), height: hp(4) };
                        break;
                    case "Account":
                        iconName = focused ? Icons.accountTabActive : Icons.accountTab;
                        style = { width: wp(8), height: hp(4) };
                        break;
                    }

                    return <Image style={style} source={iconName} />;
            },
        })}>
            <Tab.Screen name="CompanyDashboard" component={CompanyDashboard} options={{ headerShown: false }} />
            <Tab.Screen name="CompanyWasteBank" component={CompanyWasteBank} options={{ headerShown: false }} />
            <Tab.Screen name="Account" component={Account} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

const AppNavigator = ({ users }) => {

    let user = users.users

    return (
        <Stack.Navigator>
            {user.role == 'user' ? (
                <>
                    <Stack.Screen name="MainTabsUsers" component={MainTabsUsers} options={{ headerShown: false }}/>
                    <Stack.Screen name="UsersProfile" component={UsersProfile} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
                    <Stack.Screen name="UsersTransactionDetails" component={UsersTransactionDetails} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
                    <Stack.Screen name="UsersWithdraw" component={UsersWithdraw} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/> 
                </>
            
            ) : user.role == 'bank-sampah' ? (
                <>
                    <Stack.Screen name="MainTabWasteBank" component={MainTabWasteBank} options={{ headerShown: false }}/>
                    <Stack.Screen name="WasteBankProfile" component={WasteBankProfile} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
                    <Stack.Screen name="WasteBankProductForm" component={WasteBankProductForm} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
                    <Stack.Screen name="WasteBankTransactionDetails" component={WasteBankTransactionDetails} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/> 
                    <Stack.Screen name="WasteBankCustomers" component={WasteBankCustomers} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/> 
                    <Stack.Screen name="WasteBankWithdraw" component={WasteBankWithdraw} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/> 
                </>
        
            ) : user.role == 'pengepul' ? (
                <>
                    <Stack.Screen name="MainTabsCompany" component={MainTabsCompany} options={{ headerShown: false }}/>
                    <Stack.Screen name="CompanyProfile" component={CompanyProfile} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
                    <Stack.Screen name="CompanyWasteBankDetail" component={CompanyWasteBankDetail} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/> 
                </>
                  
            ) : 
                <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
            }
            <Stack.Screen name="Chats" component={Chats} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
            <Stack.Screen name="ChatsRoom" component={ChatsRoom} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
            <Stack.Screen name="SettingLanguage" component={SettingLanguage} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
            <Stack.Screen name="ResultsWasteBank" component={ResultsWasteBank} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
            <Stack.Screen name="UsersWasteBankDetail" component={UsersWasteBankDetail} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
            <Stack.Screen name="ResultsCategory" component={ResultsCategory} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
            <Stack.Screen name="ResultsSchedule" component={ResultsSchedule} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
            <Stack.Screen name="ResultsAddress" component={ResultsAddress} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
            <Stack.Screen name="ResultsCustomers" component={ResultsCustomers} options={{ headerShown: false, cardStyleInterpolator: HorizontalSlide }}/>
        </Stack.Navigator>
    );
};

const mapStateToProps = function (state) {
  const { users } = state;
  return { users }
}

export default connect(mapStateToProps)(AppNavigator);