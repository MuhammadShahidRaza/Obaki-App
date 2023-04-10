import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Color } from '../utils/color';
import { FlatlistComponent } from './flatlists';

const PickImage = ({ onPress, heading, photo, hasMultipleImage, multipleImage }) => {
  return (
    <View style={{}}>
      <Text style={{ fontSize: 16, color: Color.BLACK, fontWeight: 'bold' }}>
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
          {hasMultipleImage && multipleImage?.length > 0 ?
            <FlatlistComponent
              data={multipleImage}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => {
                return (
                  <Image
                    key={index}
                    source={
                      item.path ? { uri: item.path } : require('../assets/images/placeholder.png')
                    }
                    style={{ width: 200, height: 120, marginBottom: 10 }}
                  />
                );
              }}
            />

            :
            <Image
              source={
                photo ? { uri: photo } : require('../assets/images/placeholder.png')
              }
              style={{ width: 200, height: 120 }}
            />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PickImage;
