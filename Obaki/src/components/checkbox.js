import {View, Text} from 'react-native';
import React from 'react';
import {Color} from '../utils/color';
import Entypo from 'react-native-vector-icons/Entypo';

const Checkbox = ({selected, title}) => {
  const isselected = selected === title;
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: 26,
          height: 26,
          borderWidth: 1,
          borderRadius: 5,
          marginRight: 10,
          backgroundColor: isselected ? Color.GREEN : Color.WHITE,
          display: 'flex',
          alignItems: 'center',
          justifyCenter: 'center',
        }}>
        <Entypo name="check" color={Color.WHITE} size={20} />
      </View>

      <Text style={{fontSize: 18, color: Color.BLACK, fontWeight: 'bold'}}>
        {title}
      </Text>
    </View>
  );
};

export default Checkbox;
