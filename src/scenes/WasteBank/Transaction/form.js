import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  BaseContainer,
  AppBar,
  FormInputPicker,
  ButtonFlex,
  ModalWasteSale,
  MyView,
} from '@components';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import {StC, Colors, Font} from '@styles';
import {useTranslation} from '@utils';
import {numberFloat, currencyFloat, showToast} from '@constants';
import {GetWasteBanksItemsActive, ResultCustomers} from '@actions';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import wasteBanksUtils from '@utils/WasteBanksUtils';
import store from '@stores/store';
import transactionsUtils from '@utils/TransactionsUtils';
import sendNotifUtils from '@utils/SendNotifUtils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function WasteBankTransactionForm({navigation, wasteBanks, users}) {
  const {translations} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const refModalWaste = useRef();
  const [photo, setPhoto] = useState('');
  const [photoUri, setPhotoUri] = useState('');

  let itemsActive = wasteBanks.itemsActive;

  useEffect(() => {
    getWasteBanksProduct();
  }, []);

  const getWasteBanksProduct = async () => {
    setLoading(true);
    await wasteBanksUtils.getWasteBanksProduct();
    setLoading(false);
  };

  const removeItems = (itemID) => {
    setLoadingItems(true);
    let active = itemsActive;
    let res = active.filter((items) => items.itemID != itemID);

    itemsActive = res;
    store.dispatch(GetWasteBanksItemsActive(itemsActive));
    setLoadingItems(false);
  };

  const _handleSave = async () => {
    setLoading(true);
    let items = [];
    let active = itemsActive;

    for (let i = 0; i < active.length; i++) {
      let temp = {
        itemID: active[i].itemID,
        weight: active[i].weight,
      };

      items.push(temp);
    }

    let nasabah = users.customers;

    let arr = {
      customerID: nasabah?._id,
      item: items,
    };

    let message =
      '*## NEW INVOICE ##*' +
      '\n\n' +
      'Hai *' +
      nasabah?.fullName +
      '*,' +
      '\n\n' +
      'Berikut invoice untuk transaksi terbaru kamu' +
      '\n\n' +
      'Nama Nasabah : ' +
      nasabah?.fullName +
      '\n' +
      'No. Telp : ' +
      nasabah?.phoneNumber +
      '\n' +
      'Alamat : ' +
      nasabah?.address?.street +
      '\n' +
      '\n\n\n' +
      'Silahkan membuka aplikasi untuk melihat detail transaksi' +
      '\n' +
      'Terima Kasih';

    let send = {
      message: message,
      phoneNumber: nasabah?.phoneNumber,
    };

    const respons = await transactionsUtils.createTransactionsWasteBank(
      arr,
      photo,
    );

    if (respons == 200) {
      showToast(translations['save.success']);
      await sendNotifUtils.sendNotifUser(send);
      setTimeout(() => {
        navigation.navigate('WasteBankTransactionDetails');
        store.dispatch(GetWasteBanksItemsActive([]));
        store.dispatch(ResultCustomers([]));
      }, 1000);
    }

    setLoading(false);
  };

  let total = 0;
  if (itemsActive?.length != 0) {
    total = itemsActive
      .map((arr) => arr.subtotal)
      .reduce((acc, arr) => parseFloat(arr) + parseFloat(acc));
  }

  const setModal = async () => {
    Alert.alert(
      'Upload Photo From',
      '',
      [
        {
          text: 'Close',
        },
        {
          text: 'Galery',
          onPress: () => handlePickImage('galery'),
        },
        {
          text: 'Camera',
          onPress: () => handlePickImage('camera'),
        },
      ],
      {cancelable: false},
    );
  };

  const handlePickImage = (type) => {
    if (type == 'camera') {
      launchCamera(
        {
          mediaType: 'photo',
          quality: 0.5,
        },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const res = response?.assets?.[0];

            if (res) {
              handleUpdatePhoto(res);
            } else {
              console.log('Fail to pick image!');
            }
          }
        },
      );
    } else {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.5,
        },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const res = response?.assets?.[0];

            if (res) {
              handleUpdatePhoto(res);
            } else {
              console.log('Fail to pick image!');
            }
          }
        },
      );
    }
  };

  const handleUpdatePhoto = async (respons) => {
    let photo = {
      uri: respons.uri,
      type: 'image/jpg',
      name: respons.fileName,
    };

    setPhoto(photo);
    setPhotoUri(respons.uri);
  };

  return (
    <BaseContainer loading={loading}>
      <AppBar
        navigation={navigation}
        title={translations['create.transaction']}
      />
      <ScrollView>
        <View style={styles.dropdown}>
          <FormInputPicker
            label={'Nasabah'}
            placeholder={'Pilih Nasabah'}
            value={users?.customers?.fullName}
            onPress={() => navigation.navigate('ResultsCustomers')}
            required
          />
        </View>
        <MyView hide={itemsActive.length == 0} style={styles.dropdown}>
          <FlatList
            data={itemsActive}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.cardItem} activeOpacity={0.5}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtItem}>{item.itemName}</Text>
                  <View style={StC.flexR}>
                    <Text style={styles.txtWeight}>
                      {numberFloat(item.weight)} kg x{' '}
                      {currencyFloat(item.price)}
                    </Text>
                    <Text style={styles.subtotal}>
                      {currencyFloat(item.subtotal)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => removeItems(item.itemID)}
                  activeOpacity={0.5}
                  style={styles.btnRemove}
                >
                  <Icon
                    as={<FontAwesome5 name={'trash'} />}
                    size={RFValue(4)}
                    color={Colors.DANGER}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {loadingItems && (
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          )}
          <View style={styles.cardPrice}>
            <Text style={styles.labelPrice}>Total</Text>
            <Text style={styles.price}>{currencyFloat(total)}</Text>
          </View>
        </MyView>
        <View style={styles.dropdown}>
          <Text style={StC.title}>
            {translations['photo']}{' '}
            <Text style={styles.optional}>(Opsional)</Text>
          </Text>
          <TouchableOpacity
            style={styles.cardImage}
            activeOpacity={0.5}
            onPress={() => setModal()}
          >
            {photo ? (
              <Image source={{uri: photoUri}} style={styles.image} />
            ) : (
              <Icon
                as={<FontAwesome5 name={'camera'} />}
                size={RFValue(8)}
                color={Colors.GRAY_SOFT}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ButtonFlex
        outline
        title={'+ ' + translations['add'] + ' Item'}
        onPress={() => refModalWaste.current.open()}
        style={{
          marginHorizontal: RFValue(15),
          marginBottom: RFValue(0),
          backgroundColor: Colors.BACKGROUND,
        }}
      />
      <ButtonFlex
        disabled={
          !(users?.customers?.fullName && users?.customers?.fullName != '') ||
          itemsActive.length == 0
        }
        title={translations['save']}
        onPress={() => _handleSave()}
        form
      />
      <ModalWasteSale
        open={refModalWaste}
        total={total}
        onPress={() => refModalWaste.current.close()}
      />
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const {wasteBanks, users} = state;
  return {wasteBanks, users};
};

export default connect(mapStateToProps)(WasteBankTransactionForm);

const styles = StyleSheet.create({
  dropdown: {
    ...StC.mB8,
    backgroundColor: Colors.WHITE,
    padding: RFValue(15),
  },
  cardType: {
    backgroundColor: Colors.GRAY_SOFT,
    paddingVertical: RFValue(5),
    paddingHorizontal: RFValue(10),
    marginRight: RFValue(10),
    borderRadius: RFValue(5),
  },
  labelType: {
    ...Font.F11,
  },
  cardItem: {
    ...StC.mB10,
    ...StC.flexR,
    borderWidth: RFValue(1),
    borderColor: Colors.GRAY_SOFT,
    paddingVertical: RFValue(10),
    paddingLeft: RFValue(15),
    borderRadius: RFValue(5),
    alignItems: 'center',
  },
  txtItem: {
    ...Font.F13,
    ...Font.DARK,
    ...Font.Medium,
    ...StC.mB5,
  },
  txtWeight: {
    ...Font.F11,
    ...Font.DARK,
    ...Font.Regular,
    flex: 1,
  },
  btnRemove: {
    ...StC.centerPage,
    width: RFValue(40),
    height: RFValue(40),
  },
  subtotal: {
    ...Font.F11,
    ...Font.DARK,
    ...Font.Regular,
  },
  cardPrice: {
    ...StC.flexR,
  },
  labelPrice: {
    ...Font.F13,
    ...Font.DARK,
    flex: 1,
  },
  price: {
    ...Font.F13,
    ...Font.PRIMARY,
    ...Font.Medium,
  },
  cardImage: {
    ...StC.centerPage,
    width: '100%',
    height: RFValue(150),
    borderWidth: RFValue(1),
    borderRadius: RFValue(5),
    borderColor: Colors.GRAY_SOFT,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: RFValue(5),
  },
  optional: {
    ...Font.F10,
    ...Font.DARK,
    ...Font.Regular,
  },
});
