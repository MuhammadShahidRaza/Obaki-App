import React, {useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Button} from '../../components/buttons';
import {Input} from '../../components/inputs';
import {Color} from '../../utils/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';

const {height} = Dimensions.get('screen');

function SignUpWithEmail({navigation}) {
  const [email, setEmail] = useState('');
  return (
    <SafeAreaView style={{backgroundColor: Color.WHITE, height: height}}>
      <ScrollView>
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              marginVertical: 60,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}>
              <AntDesign name="arrowleft" color={Color.BLACK} size={27} />
            </TouchableOpacity>

            <Text
              style={{
                color: Color.BLACK,
                fontSize: 18,
                marginLeft: 15,
                fontWeight: 500,
              }}>
              Continue With Email
            </Text>
          </View>
          <View style={{height: 350}}>
            <Input onChangeText={setEmail} value={email} placeholder="Email" />
          </View>

          <View>
            <Button
              onPress={() => {
                // navigation.navigate('OptVerification');
              }}
              title="CONTINUE"
              containerStyle={{marginTop: 0}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUpWithEmail;
