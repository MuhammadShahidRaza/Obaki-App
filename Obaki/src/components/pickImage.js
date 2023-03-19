import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Color} from '../utils/color';

const PickImage = ({onPress,heading}) => {
  return (
    <View style={{}}>
      <Text style={{fontSize: 16, color: Color.BLACK, fontWeight: 'bold'}}>
        {heading}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            marginVertical: 10,
            borderWidth: 1,
            borderColor: Color.GREY,
            borderStyle: 'dashed',
            paddingHorizontal: 10,
            paddingVertical: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/images/placeholder.png')}
            style={{width: 200, height: 120}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PickImage;
