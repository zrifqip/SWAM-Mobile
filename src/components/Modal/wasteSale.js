import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Font, StC } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { requireds, showToast, currencyFloat } from "@constants";
import { ButtonFlex, FormInput, FormInputPicker } from "@components";
import { useTranslation } from "@utils";
import { GetWasteBanksItemsActive } from "@actions";
import RBSheet from "react-native-raw-bottom-sheet";
import store from "@stores/store";
import PickerModal from "react-native-picker-modal-view";

function ModalWasteSale({ open, wasteBanks, onPress }) {
  const { translations } = useTranslation();
  const [type, setType] = useState("");
  const [weight, setWight] = useState("");
  let active = wasteBanks.itemsActive;

  const saveItems = () => {
    let res = {
      itemID: type._id,
      itemName: type.name,
      weight: weight,
      price: type.purchasePrice,
      subtotal: weight * type.purchasePrice,
    };

    let find = active.find((x) => x.itemID == type._id);

    if (find) {
      showToast("Item sudah ditambahkan");
    } else {
      active.push(res);
      store.dispatch(GetWasteBanksItemsActive(active));
      setType("");
      setWight("");
      onPress();
    }
  };

  const onSelected = (val) => {
    setType(val);
  };

  const onClosed = () => {};

  const onBackButtonPressed = () => {};

  return (
    <RBSheet
      ref={open}
      height={RFValue(350)}
      openDuration={250}
      customStyles={{
        container: {
          ...StC.centerPage,
        },
      }}>
      <View style={styles.modal}>
        <PickerModal
          renderSelectView={(disabled, selected, showModal) => (
            <View style={styles.dropdown}>
              <FormInputPicker
                label={"Jenis Sampah"}
                placeholder={"Pilih Sampah"}
                value={type.Name}
                onPress={showModal}
                required
              />
            </View>
          )}
          onSelected={onSelected.bind(this)}
          onClosed={onClosed.bind(this)}
          onBackButtonPressed={onBackButtonPressed.bind(this)}
          items={wasteBanks.productSort}
          sortingLanguage={"tr"}
          showToTopButton={true}
          selected={type}
          showAlphabeticalIndex={false}
          autoGenerateAlphabeticalIndex={false}
          selectPlaceholderText={"Choose one..."}
          onEndReached={() => console.log("list ended...")}
          searchPlaceholderText={"Search..."}
          requireSelection={false}
          autoSort={false}
        />
        <FormInput
          label={translations["waste.weight"]}
          placeholder={"0"}
          value={weight}
          onChangeText={(val) => setWight(val)}
          keyboardType={"number-pad"}
          required
        />
        <View style={styles.cardPrice}>
          <Text style={styles.labelPrice}>
            {translations["estimate.price"]}
          </Text>
          <Text style={styles.price}>
            {currencyFloat(type.purchasePrice)} / kg
          </Text>
        </View>
        <View style={styles.cardPrice}>
          <Text style={styles.labelPrice}>Sub Total</Text>
          <Text style={styles.price}>
            {currencyFloat(weight * type.purchasePrice)}
          </Text>
        </View>
        <ButtonFlex
          title={"+ " + translations["add"] + " Item"}
          onPress={() => saveItems()}
          style={StC.mT10}
          disabled={weight == 0 || weight == "" || type == ""}
        />
      </View>
    </RBSheet>
  );
}

const mapStateToProps = function (state) {
  const { wasteBanks } = state;
  return { wasteBanks };
};

export default connect(mapStateToProps)(ModalWasteSale);

const styles = StyleSheet.create({
  modal: {
    ...StC.wh100,
    padding: RFValue(15),
  },
  dropdown: {
    height: RFValue(80),
    // ... StC.mB8,
    // backgroundColor: Colors.WHITE,
    // padding: RFValue(15)
  },
  cardItem: {
    ...StC.centerPage,
    borderWidth: RFValue(1),
    height: RFValue(25),
    paddingHorizontal: RFValue(8),
    marginRight: RFValue(10),
    borderRadius: RFValue(5),
  },
  txtItem: {
    ...Font.F11,
    ...Font.DARK,
  },
  cardPrice: {
    ...StC.flexR,
    ...StC.mB10,
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
});
