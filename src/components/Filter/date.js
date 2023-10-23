import React, { useState, useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Font, Colors } from "@styles";
import { RFValue } from 'react-native-responsive-fontsize';
import { Icon } from 'native-base';
import MonthPicker from 'react-native-month-year-picker';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from 'moment';

function FilterDate({ 
    date,
    setDate
}) {

    const [show, setShow] = useState(false);

    const showPicker = useCallback((value) => setShow(value), []);

    const onValueChange = useCallback(
        (event, newDate) => {
            const selectedDate = newDate || date;

            showPicker(false);

            if(event != 'dismissedAction'){

                setDate(selectedDate);
            }
        },
        [date, showPicker],
    );

    return (
        <>
        <TouchableOpacity style={styles.filter} onPress={() => showPicker(true)}>
            <Text style={styles.label}>{moment(date).format('MMMM Y')}</Text>
            <Icon as={FontAwesome} name={'caret-down'} size={RFValue(4)} color={Colors.GRAY_LABEL}/>
        </TouchableOpacity>
        {show && (
            <MonthPicker
              onChange={onValueChange}
              value={date}
              minimumDate={new Date(2022, 12)}
              maximumDate={new Date()}
              locale="id"
            />
        )}
        </>
    )
}

export default FilterDate;

const styles = ({
    filter:{
        borderRadius: RFValue(15),
        backgroundColor: Colors.GRAY_LIGHT,
        paddingVertical: RFValue(4),
        paddingHorizontal: RFValue(9),
        flexDirection: "row",
    },
    label:{
        ... Font.F12,
        ... Font.GRAY_LABEL,
        marginRight: RFValue(5)
    }
})
