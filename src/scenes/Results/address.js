import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  PermissionsAndroid,
  Text,
} from "react-native";
import { Select, Icon } from "native-base";
import { BaseContainer, ButtonFlex, FormInput, AppBar } from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { useTranslation } from "@utils";
import { GetAddress } from "@actions";
import { Marker } from "react-native-maps";
import { Font, Colors, StC } from "@styles";
import { Icons } from "@assets";
import { Formik } from "formik";
import { showToast, requireds } from "@constants";
import { province } from "./province";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import store from "@stores/store";
import * as yup from "yup";
const { width, height } = Dimensions.get("window");

const LATITUDE_DELTA = 0.0015;
const LONGITUDE_DELTA = 0.2222 * (width / height);

function ResultsAddress({ navigation, users }) {
  let address = users.address;
  let coordinate = address?.loc?.coordinates;
  const { translations } = useTranslation();

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          callLocation();
        } else {
          alert("Aktifkan GPS");
        }
      } catch (err) {}
    }

    requestLocationPermission();
  };

  const callLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        address.loc.coordinates = [
          position.coords.longitude,
          position.coords.latitude,
        ];

        storeAddress(address);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000000, maximumAge: 1000 },
    );
    watchID = Geolocation.watchPosition((position) => {
      address.loc.coordinates = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      storeAddress(address);
    });
  };

  const storeAddress = async (coordinate) => {
    return store.dispatch(GetAddress(coordinate));
  };

  const onRegionChange = (current) => {
    address.loc.coordinates = [current.longitude, current.latitude];

    storeAddress(address);
  };

  const validationSchema = yup.object().shape({
    address: yup.string().required(translations["fill.address"]),
  });

  const handleSave = async (values) => {
    if (coordinate[0] && coordinate[1]) {
      address.street = values.address;

      storeAddress(address);
      navigation.goBack();
    } else {
      showToast(translations["choose.location"]);
    }
  };

  const setAddress = async (values) => {
    alert(values);
  };

  return (
    <BaseContainer>
      <AppBar navigation={navigation} title={translations["address"]} />
      <Formik
        validationSchema={validationSchema}
        isValidating={true}
        initialValues={{ address: address?.street ? address?.street : "" }}
        onSubmit={(value) => handleSave(value)}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <>
            <ScrollView>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                onRegionChangeComplete={(val) => onRegionChange(val)}
                zoomEnabled={true}
                zoomControlEnabled={true}
                initialRegion={{
                  latitude: coordinate[1],
                  longitude: coordinate[0],
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                ref={(map) => (map = map)}
                onPress={(e) => onRegionChange(e.nativeEvent.coordinate)}>
                <Marker
                  coordinate={{
                    latitude: coordinate[1],
                    longitude: coordinate[0],
                  }}>
                  <Image source={Icons.pin} style={styles.pin} />
                </Marker>
              </MapView>
              <Text style={styles.longlat}>
                Long: {coordinate[0]}, Lat: {coordinate[1]}
              </Text>
              <View style={styles.cardInput}>
                <FormInput
                  label={translations["address"]}
                  placeholder={translations["address"]}
                  value={values.address}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  isError={errors.address && touched.address}
                  errorMessage={errors.address}
                  required
                />
              </View>
            </ScrollView>
            <ButtonFlex
              title={translations["save"]}
              onPress={() => handleSubmit()}
              style={{ marginTop: RFValue(20) }}
              form
            />
          </>
        )}
      </Formik>
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(ResultsAddress);

const styles = {
  mapStyle: {
    width: "100%",
    height: 400,
  },
  pin: {
    width: RFValue(50),
    height: RFValue(50),
    resizeMode: "contain",
  },
  cardInput: {
    paddingHorizontal: RFValue(15),
  },
  longlat: {
    ...Font.F10,
    padding: RFValue(15),
  },
};
