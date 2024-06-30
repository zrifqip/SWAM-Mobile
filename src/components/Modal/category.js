import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Font, StC } from "@styles";
import { FormInput } from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { showToast } from "@constants";
import { ButtonFlex } from "@components";
import { useTranslation } from "@utils";
import RBSheet from "react-native-raw-bottom-sheet";
import wasteBanksUtils from "@utils/WasteBanksUtils";

function ModalCategory({ open, onPress, id, name, desc, setName, setDesc }) {
  const { translations } = useTranslation();

  const saveCategory = async () => {
    let params = {
      name: name,
      desc: desc,
    };

    if (!id) {
      let respons = await wasteBanksUtils.addWasteBanksProductCategory(params);
      if (respons == 200) {
        showToast(translations["save.success"]);

        setTimeout(() => {
          onPress();
        }, 1000);
      }
    } else {
      let merge = {
        _id: id,
        params: params,
      };
      let respons = await wasteBanksUtils.updateWasteBanksProductCategory(
        merge,
      );
      if (respons == 200) {
        showToast(translations["save.success"]);

        setTimeout(() => {
          onPress();
        }, 1000);
      }
    }
  };

  return (
    <RBSheet
      ref={open}
      height={RFValue(300)}
      openDuration={250}
      customStyles={{
        container: {
          ...StC.centerPage,
        },
      }}>
      <View style={styles.modal}>
        <Text style={styles.service}>{translations["category"]}</Text>
        <FormInput
          label={translations["name"]}
          placeholder={translations["name"]}
          value={name}
          onChangeText={(val) => setName(val)}
          required
        />
        <FormInput
          label={translations["desc"]}
          placeholder={translations["desc"]}
          value={desc}
          onChangeText={(val) => setDesc(val)}
        />
        <ButtonFlex
          title={translations["save"]}
          onPress={() => saveCategory()}
          style={StC.mT30}
          disabled={name == ""}
        />
      </View>
    </RBSheet>
  );
}

const mapStateToProps = function (state) {
  const { wasteBanks } = state;
  return { wasteBanks };
};

export default connect(mapStateToProps)(ModalCategory);

const styles = StyleSheet.create({
  modal: {
    ...StC.wh100,
    padding: RFValue(15),
  },
  service: {
    ...Font.F15,
    ...Font.DARK,
    ...Font.Medium,
    ...StC.mB15,
  },
  labelCheckbox: {
    ...Font.F13,
    ...Font.DARK,
  },
  price: {
    ...Font.F13,
    ...Font.PRIMARY,
    ...Font.Medium,
  },
});
