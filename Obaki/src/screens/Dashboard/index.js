import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { Color } from '../../utils/color';
import Header from '../../components/header';
import OptionBox from '../../components/optionBox';
import { FlatlistComponent } from '../../components/flatlists';

const { width, height, scale } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const list = [

    {
      title: "Total Booking",
      item: '150'

    },

    {
      title: "Weekly Balance",
      item: '$ 45,000'

    },

    {
      title: "Incoming Orders",
      item: '15'

    },

    {
      title: "Inbox message",
      item: '10'

    },

    {
      title: "Notifications",
      item: '10'

    },

    {
      title: "Order History",
      item: '100'

    },

  ]

  return (
    <SafeAreaView style={{ height: height, backgroundColor: Color.WHITE }}>
      <ScrollView >
        <Header navigation={navigation} />

        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, color: Color.BLACK, fontWeight: "bold" }}>Dashboard</Text>
          <FlatlistComponent
            data={list}

            numColumns={2}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            columnWrapperStyle={{ alignSelf: "center", }}

            style={{ marginVertical: 20 }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                key={index}
                onPress={() => {
                  
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyCenter: 'center',
                      width: width * 0.42,
                      paddingHorizontal: 5,
                      paddingVertical: 15,
                       margin: 5,
                      elevation: 3,
                      borderWidth: 2,
                      borderColor: Color.LIGHT_GREY,
                      backgroundColor: Color.WHITE,
                      borderRadius: 15,
                    }}>
                    <View>

                      <Text style={{
                        fontSize: 15,
                        color: Color.BLACK,
                        fontWeight: "bold"
                      }}>{item.title}</Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                      <Text style={{ fontSize: 15, color: Color.BLACK, fontWeight: "bold" }}>  <Text>{item.item}</Text></Text>
                    </View>
                    {/* <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor:Color.WHITE,
                      borderWidth: 1,
                      borderColor: Color.BLACK,
                    }}
                  /> */}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
