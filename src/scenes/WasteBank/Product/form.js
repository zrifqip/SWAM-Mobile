import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Text, Alert} from 'react-native';
import {
  BaseContainer,
  AppBar,
  ButtonFlex,
  FormInputPhoto,
  FormInputCurrency,
  FormInput,
  FormInputPicker,
} from '@components';
import {RFValue} from 'react-native-responsive-fontsize';
import {Switch} from 'native-base';
import {connect} from 'react-redux';
import {useTranslation} from '@utils';
import {Colors, StC, Font} from '@styles';
import {AnimationLayout, showToast} from '@constants';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {base_uri} from '@constants/BASE_URL';
import {SelectedCategory} from '@actions';
import wasteBanksUtils from '@utils/WasteBanksUtils';
import store from '@stores/store';

function WasteBankProductForm({navigation, wasteBanks}) {
  let detail = wasteBanks.productdetail;
  let category = wasteBanks.selectedCategory;
  const {translations} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isSell, setIsSell] = useState(false);
  const [photo, setPhoto] = useState('');
  const [photoTemp, setPhotoTemp] = useState('');
  const [photoUri, setPhotoUri] = useState('');
  const [name, setName] = useState(detail ? detail.name : '');
  const [sellingPrice, setSellingPrice] = useState(
    detail ? JSON.stringify(detail.sellingPrice) : '',
  );
  const [purchasePrice, setPurchasePrice] = useState(
    detail ? JSON.stringify(detail.purchasePrice) : '',
  );
  const [weight, setWeight] = useState(
    detail ? JSON.stringify(detail.weight) : 0,
  );

  useEffect(() => {
    if (detail) {
      setIsSell(detail?.isSell);

      if (detail.images.length != 0) {
        setPhoto(base_uri + detail.images[0]?.original?.path);
      }

      store.dispatch(SelectedCategory(detail.category));
    }
  }, []);

  const handleSave = async () => {
    if (purchasePrice && name) {
      setLoading(true);

      let params = {
        name: name,
        purchasePrice: purchasePrice ? purchasePrice : 0,
        sellingPrice: sellingPrice ? sellingPrice : 0,
        weight: weight ? weight : 0,
        isSell: isSell,
        category: wasteBanks.productcategory.find((x) => x._id == category._id),
      };

      if (detail) {
        let merge = {
          _id: detail._id,
          params: params,
        };

        let respons = await wasteBanksUtils.updateWasteBanksProduct(merge);
        _response(respons, 'save');
      } else {
        let respons = await wasteBanksUtils.addWasteBanksProduct(params);

        if (photoUri) {
          await wasteBanksUtils.updatePhotoWasteBanksProduct(
            photoTemp,
            respons,
          );
        }

        await wasteBanksUtils.getWasteBanksProduct();

        _response(respons, 'save');
      }

      setLoading(false);
    } else {
      showToast('Lengkapi data terlebih dahulu');
    }
  };

  const _response = async (respons, type) => {
    if (respons == 400) {
      showToast(
        type == 'save'
          ? translations['save.failed']
          : translations['delete.failed'],
      );
    } else {
      showToast(
        type == 'save'
          ? translations['save.success']
          : translations['delete.success'],
      );

      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }
  };

  const confirmationDelete = () => {
    Alert.alert(
      translations['confirmation'],
      translations['confirm.delete'],
      [
        {
          text: translations['confirmation.no'],
        },
        {
          text: translations['confirmation.yes'],
          onPress: () => handleDelete(),
        },
      ],
      {cancelable: false},
    );
  };

  const handleDelete = async () => {
    let respons = await wasteBanksUtils.deleteWasteBanksProduct(detail._id);

    _response(respons, 'deleted');
  };

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

    setPhotoTemp(photo);
    setPhotoUri(respons.uri);

    if (detail) {
      await wasteBanksUtils.updatePhotoWasteBanksProduct(photo, detail._id);
      await wasteBanksUtils.getWasteBanksProduct();
    }
  };

  return (
    <BaseContainer loading={loading}>
      <AppBar navigation={navigation} title={translations['product']} />
      <ScrollView>
        <View style={styles.authCont}>
          <FormInputPhoto
            onPress={() => setModal()}
            label={'Photo ' + translations['product']}
            fileUri={photoUri ? photoUri : photo}
          />
          <View style={StC.mT5r} />
          <FormInput
            label={translations['name']}
            placeholder={translations['name.product.placeholder']}
            value={name}
            onChangeText={(val) => setName(val)}
            required
          />
          <FormInputPicker
            label={translations['category']}
            placeholder={'Pilih ' + translations['category']}
            value={category.name}
            onPress={() => navigation.navigate('ResultsCategory')}
            required
          />
          <FormInputCurrency
            label={`${translations['buying.price']} / Kg`}
            placeholder={'Rp 0'}
            value={purchasePrice}
            prefix={'Rp '}
            onChangeText={(val) => setPurchasePrice(val)}
            keyboardType={'number-pad'}
            required
            precision={0}
          />
          <FormInputCurrency
            label={`${translations['selling.price']} / Kg`}
            placeholder={'Rp 0'}
            value={sellingPrice}
            prefix={'Rp '}
            onChangeText={(val) => setSellingPrice(val)}
            keyboardType={'number-pad'}
            precision={0}
          />
          <FormInputCurrency
            label={`${translations['weight']} (Kg)`}
            placeholder={'0'}
            value={weight}
            suffix={' kg'}
            onChangeText={(val) => setWeight(val)}
            keyboardType={'number-pad'}
            precision={0}
          />
          <View style={[StC.flexR, StC.mT5]}>
            <Text style={[StC.title, {flex: 1}]}>
              {translations['info.industry']}
            </Text>
            <Switch
              isChecked={isSell}
              colorScheme="blue"
              onValueChange={(val) => {
                setIsSell(val), AnimationLayout();
              }}
            />
          </View>
        </View>
      </ScrollView>
      <ButtonFlex
        title={translations['delete']}
        onPress={() => confirmationDelete()}
        style={{marginTop: RFValue(20)}}
        form
        outline
        hide={!detail}
        remove
      />
      <ButtonFlex
        title={translations['save']}
        onPress={() => handleSave()}
        style={{marginTop: RFValue(-5)}}
        form
      />
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const {wasteBanks} = state;
  return {wasteBanks};
};

export default connect(mapStateToProps)(WasteBankProductForm);

const styles = StyleSheet.create({
  authCont: {
    padding: RFValue(15),
    backgroundColor: Colors.WHITE,
  },
  desc: {
    ...Font.F10,
    ...Font.GRAY_LABEL,
    ...Font.Regular,
    ...StC.mB5,
    marginTop: RFValue(-5),
  },
});
