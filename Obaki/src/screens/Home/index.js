import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color } from '../../utils/color';
import { FlatlistComponent } from '../../components/flatlists';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from '../../components/inputs';
import { Modal } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/buttons';
// import { showToast } from '../../utils/Toast';
import { GetItemFromStorage } from '../../utils/storage';
import axios from 'axios';
import { BASE_URL } from '../../constants/keys';
const { height, width } = Dimensions.get('screen');
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [vegFood, setVegFood] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userTypes, setUserTypes] = useState(['Chefs', 'Entertainer', 'Rooms']);
  const [foodList, setfoodList] = useState([
    {
      id: 1,
      name: 'Pizza',
      image: require('../../assets/images/pizza.jpg'),
    },
    {
      id: 2,
      name: 'Pizza',
      image: require('../../assets/images/pizza.jpg'),
    },
    {
      id: 3,
      name: 'Pizza',
      image: require('../../assets/images/pizza.jpg'),
    },
    {
      id: 4,
      name: 'Pizza',
      image: require('../../assets/images/pizza.jpg'),
    },
  ]);
  const isFocused = useIsFocused();
  const [localChef, setLocalChefList] = useState([])
  const [entertainerlist, setEntertainerlist] = useState([])


  // const [localChef, setLocalChefList] = useState([
  //   {
  //     id: 1,
  //     image: require('../../assets/images/chef.png'),
  //   },
  //   {
  //     id: 2,
  //     image: require('../../assets/images/chef.png'),
  //   },
  //   {
  //     id: 3,
  //     image: require('../../assets/images/chef.png'),
  //   },
  //   {
  //     id: 4,
  //     image: require('../../assets/images/chef.png'),
  //   },
  // ]);
  const [propertyList, setPropertyList] = useState([
    // {
    //   id: 1,
    //   image: require('../../assets/images/popular.jpg'),
    // },
    // {
    //   id: 2,
    //   image: require('../../assets/images/popular.jpg'),
    // },
    // {
    //   id: 3,
    //   image: require('../../assets/images/popular.jpg'),
    // },
    // {
    //   id: 4,
    //   image: require('../../assets/images/popular.jpg'),
    // },
  ]);

  useEffect(() => {
    setModalVisible(true);
  }, []);





  useEffect(() => {
    getAllChefs()
    getAllProperties()
    getAllEntertainers()
    // console.log("hiting Function")
  }, [isFocused])


  async function getAllChefs() {
    const token = await GetItemFromStorage("TOKEN")
    try {
      const response = await axios.get(`${BASE_URL}/allchefs`,
        {
          headers: {
            'token': token,
            'Authorization': 'Bearer ' + token,
          }
        }

      );
      const result = response.data;

      if (result) {
        console.log(result.data);
        setLocalChefList(result.data)

      }
      return
    } catch (errors) {
      console.log(errors.response.data)

      // if (errors.response.data === "A token is required for authentication") {
      //   showToast({
      //     type: "error",
      //     message: "Please Sign In to proceed."
      //   });
      //   return;
      // }


      // const Error = errors?.response?.data?.message[0]?.message ?? errors?.response?.data?.message;
      // showToast({
      //   type: "error",
      //   message: Error
      // });
    }


  }


  async function getAllEntertainers() {
    const token = await GetItemFromStorage("TOKEN")
    try {
      const response = await axios.get(`${BASE_URL}/allentertainers`,
        {
          headers: {
            'token': token,
            'Authorization': 'Bearer ' + token,
          }
        }

      );
      const result = response.data;

      if (result) {
        console.log(result.data);
        setEntertainerlist(result.data)

      }
      return
    } catch (errors) {
      console.log(errors.response.data)

      // if (errors.response.data === "A token is required for authentication") {
      //   showToast({
      //     type: "error",
      //     message: "Please Sign In to proceed."
      //   });
      //   return;
      // }


      // const Error = errors?.response?.data?.message[0]?.message ?? errors?.response?.data?.message;
      // showToast({
      //   type: "error",
      //   message: Error
      // });
    }


  }



  async function getAllProperties() {
    const token = await GetItemFromStorage("TOKEN")
    try {
      const response = await axios.get(`${BASE_URL}/allproperties`,
        {
          headers: {
            'token': token,
            'Authorization': 'Bearer ' + token,
          }
        }

      );
      const result = response.data;

      if (result) {
        console.log(result.data);
        setPropertyList(result.data)

      }
      return
    } catch (errors) {
      console.log(errors.response.data)

      // if (errors.response.data === "A token is required for authentication") {
      //   showToast({
      //     type: "error",
      //     message: "Please Sign In to proceed."
      //   });
      //   return;
      // }


      // const Error = errors?.response?.data?.message[0]?.message ?? errors?.response?.data?.message;
      // showToast({
      //   type: "error",
      //   message: Error
      // });
    }


  }


  const [selectedUserType, setSelectedUserType] = useState('Chefs');
  const [selectedFood, setSelectedFood] = useState(1);
  return (
    <SafeAreaView style={{ backgroundColor: Color.WHITE, flex: 1 }}>
      <ScrollView>
        {/* <View style={{}}>    */}
        <View style={{ backgroundColor: Color.ORANGE, height: 210 }}>
          <View style={{ height: 100 }}>

            <TouchableOpacity onPress={() => {
              navigation.openDrawer()

            }}>

              <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                <Ionicons
                  name="reorder-three-outline"
                  color={Color.WHITE}
                  size={40}
                />
              </View>
            </TouchableOpacity>

          </View>
          <View
            style={{
              marginHorizontal: 20,
              paddingVertical: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                textAlign: "auto",
                fontSize: 22,
                fontWeight: 'bold',
                color: Color.BLACK,
              }}>
              EXPERIENCE NEW LOCAL FOOD'S EVERYDAY
            </Text>
          </View>
        </View>

        <View style={{ backgroundColor: Color.WHITE }}>
          <FlatlistComponent
            data={userTypes}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
            style={{ marginVertical: 20 }}
            renderItem={({ item, index }) => {
              const selectedItem = selectedUserType === item;
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedUserType(item);
                  }}>
                  <View
                    key={index}
                    style={{
                      backgroundColor: selectedItem
                        ? Color.ORANGE
                        : Color.WHITE,
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                      borderColor: Color.BLACK,
                      borderWidth: 1,
                      marginHorizontal: 8,
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: Color.BLACK,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: 'lightgrey',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 10,
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginHorizontal: 15,
          }}>
          <View>
            <AntDesign name="search1" color={Color.GREY} size={28} />
          </View>
          <View>
            <Input
              containerStyle={{
                backgroundColor: 'lightgrey',
                borderWidth: 0,
                elevation: 0,
                marginVertical: 0,
              }}
              onChangeText={setSearchText}
              inputStyle={{ backgroundColor: 'lightgrey' }}
              value={searchText}
              placeholder="Search for Chef, Resturants and More"
            />
          </View>
          <View></View>
        </View>

        <FlatlistComponent
          data={foodList}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={{ marginVertical: 20 }}
          renderItem={({ item, index }) => {
            const selectedItem = selectedFood === item.id;
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedFood(item.id);
                }}>
                <View
                  key={index}
                  style={{
                    backgroundColor: selectedItem ? Color.ORANGE : Color.WHITE,
                    paddingHorizontal: 35,
                    paddingVertical: 8,
                    marginHorizontal: 5,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 8,
                  }}>
                  <Image
                    source={item.image}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                  <Text
                    style={{
                      marginTop: 5,
                      color: Color.BLACK,
                      fontWeight: 700,
                    }}>
                    {item.name.substring(0, 8)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View>
          <View
            style={{
              marginHorizontal: 15,
              marginVertical: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{ color: Color.ORANGE, fontWeight: 900, fontSize: 15 }}>
              {/* Local  */}
              Chef Highlight
            </Text>
            <TouchableOpacity>
              <Text
                style={{ color: Color.ORANGE, fontWeight: 900, fontSize: 15 }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatlistComponent
            data={localChef}
            horizontal
            ListEmptyComponent={
              () => {
                return (
                  <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color:Color.BLACK,fontSize: 22 ,marginHorizontal:50}}>No Chef Available </Text>
                  </View>
                )

              }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item._id}
            style={{ marginVertical: 20 }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity>
                  <View
                    key={index}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: 'lightgrey',
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      marginHorizontal: 5,
                      display: 'flex',
                      alignItems: 'center',
                      // borderRadius: 8,
                    }}>
                    {item?.profilePicture ?
                      <Image
                        source={{ uri: item?.profilePicture }}
                        style={{ width: 130, height: 100, borderRadius: 100 }}
                      /> :

                      <Image
                        source={require('../../assets/images/chef.png')}
                        style={{ width: 130, height: 100, borderRadius: 100 }}
                      />
                    }

                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View>
          <View
            style={{
              marginHorizontal: 15,
              marginVertical: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{ color: Color.ORANGE, fontWeight: 900, fontSize: 15 }}>
              Property
            </Text>
            <TouchableOpacity>
              <Text
                style={{ color: Color.ORANGE, fontWeight: 900, fontSize: 15 }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatlistComponent
            data={propertyList}
            horizontal
              ListEmptyComponent={
              () => {
                return (
                  <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color:Color.BLACK,fontSize: 22 ,marginHorizontal:50}}>No Property Available </Text>
                  </View>
                )

              }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            style={{ marginVertical: 20 }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity>
                  <View
                    key={index}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: 'lightgrey',
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      marginHorizontal: 5,
                      display: 'flex',
                      alignItems: 'center',
                      // borderRadius: 8,
                    }}>
                    {item?.propertyImages && item.propertyImages.length > 0 ?
                      <Image
                        source={{ uri: item?.propertyImages[0] }}
                        style={{ width: 150, height: 130, borderRadius: 100 }}
                      /> :

                      <Image
                        source={require('../../assets/images/property.jpg')}
                        style={{ width: 150, height: 130, borderRadius: 100 }}
                      />
                    }

                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View>
          <View
            style={{
              marginHorizontal: 15,
              marginVertical: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{ color: Color.ORANGE, fontWeight: 900, fontSize: 15 }}>
              Entertainer
            </Text>
            <TouchableOpacity>
              <Text
                style={{ color: Color.ORANGE, fontWeight: 900, fontSize: 15 }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatlistComponent
            data={entertainerlist}
            horizontal
              ListEmptyComponent={
              () => {
                return (
                  <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color:Color.BLACK,fontSize: 22 ,marginHorizontal:50}}>No Entertainer Available </Text>
                  </View>
                )

              }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            style={{ marginVertical: 20 }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity>
                  <View
                    key={index}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: 'lightgrey',
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      marginHorizontal: 5,
                      display: 'flex',
                      alignItems: 'center',
                      // borderRadius: 8,
                    }}>
                    {item?.uploadImage  && item.uploadImage.length > 0 ? 
                      <Image
                        source={{ uri: item?.uploadImage[0] }}
                        style={{ width: 150, height: 130, borderRadius: 100 }}
                      /> :

                      <Image
                        source={require('../../assets/images/entertainer.png')}
                        style={{ width: 150, height: 130, borderRadius: 100 }}
                      />
                    }

                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              flex: 1,

              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                // paddingHorizontal: 20,
                paddingVertical: 30,
                marginHorizontal: 15,
                height: 400,
                borderColor: Color.BLACK,
                borderWidth: 1,
                borderTopLeftRadius: 8,
                elevation: 10,
                borderTopRightRadius: 8,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingBottom: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomColor: 'lightgrey',
                  borderBottomWidth: 1,
                }}>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      color: Color.BLACK,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Hi! Tell us what you like...
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={{ paddingRight: 10 }}>
                    <Entypo name="cross" color={Color.BLACK} size={30} />
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginTop: 25,
                  }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderColor: 'green',
                      borderWidth: 1,
                      marginRight: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: 'green',
                      }}></View>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        color: Color.BLACK,
                        fontSize: 18,
                        fontWeight: 700,
                      }}>
                      I only eat Veg
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                    marginVertical: 5,
                  }}>
                  <View style={{ width: width - 80 }}>
                    <Text style={{ textAlign: 'auto', color: Color.BLACK }}>
                      We will suggest Resturants that serve delicious veg dishes
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setVegFood('onlyVeg');
                    }}>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 30,
                        borderColor:
                          vegFood === 'onlyVeg' ? Color.ORANGE : Color.GREY,
                        borderWidth: 1,
                        marginRight: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 50,
                          backgroundColor:
                            vegFood === 'onlyVeg' ? Color.ORANGE : Color.WHITE,
                        }}></View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginTop: 25,
                  }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderColor: 'red',
                      borderWidth: 1,
                      marginRight: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: 'red',
                      }}></View>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        color: Color.BLACK,
                        fontSize: 18,
                        fontWeight: 700,
                      }}>
                      I eat both Veg & Non Veg
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                    marginVertical: 5,
                  }}>
                  <View style={{ width: width - 80 }}>
                    <Text style={{ textAlign: 'auto', color: Color.BLACK }}>
                      We will suggest Resturants that serve delicious veg & non
                      veg dishes
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setVegFood('Veg&NonVeg');
                    }}>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 30,
                        borderColor:
                          vegFood === 'Veg&NonVeg' ? Color.ORANGE : Color.GREY,
                        borderWidth: 1,
                        marginRight: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 50,
                          backgroundColor:
                            vegFood === 'Veg&NonVeg'
                              ? Color.ORANGE
                              : Color.WHITE,
                        }}></View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Button
                title="Proceed"
                containerStyle={{
                  marginHorizontal: 10,
                  marginTop: 30,
                  height: 50,
                  backgroundColor: vegFood ? Color.BLACK : "lightgrey",
                }}
                onPress={() => {
                  vegFood && setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </Modal>

        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
