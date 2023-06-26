import {
   Animated,
   Image,
   StyleSheet,
   Text,
   TouchableWithoutFeedback,
   Alert,
   View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ORCHIDS } from "../../data/orchids";
import { ScrollView } from "react-native-gesture-handler";
import AppColor from "../../consts/colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ItemDetailScreen({ navigation, route }) {
   const [scaleValue, setScaleValue] = useState(new Animated.Value(1));
   const [favData, setFavData] = useState([]);

   const getOrchidId = route.params.orchidId;

   const chosenOrchid = ORCHIDS.find((item) => item.id === getOrchidId);

   useEffect(() => {
      getFromStorage();
   }, []);

   useLayoutEffect(() => {
      navigation.setOptions({
         title: chosenOrchid.name,
         headerShown: false,
      });
   }, [navigation]);

   const getFromStorage = async () => {
      const data = await AsyncStorage.getItem("favorite");
      setFavData(data != null ? JSON.parse(data) : []);
   };

   const setDataToStorage = async () => {
      let list;
      if (favData == []) {
         list = [getOrchidId];
         await AsyncStorage.setItem("favorite", JSON.stringify(list));
      } else {
         list = [...favData, getOrchidId];
         await AsyncStorage.setItem("favorite", JSON.stringify(list));
      }
      setFavData(list);
   };

   const removeDataFromStorage = async () => {
      Alert.alert("Are you sure?", "You are removing your favorite", [
         {
            text: "No",
            onPress: () => {},
            style: "destructive",
         },
         {
            text: "Yes",
            onPress: async () => {
               const list = favData.filter((item) => item !== getOrchidId);
               await AsyncStorage.setItem("favorite", JSON.stringify(list));
               setFavData(list);
               AsyncStorage.clear();
               setFavData([]);
               dataFav = [];
            },
         },
      ]);
   };

   const removeAllStorage = async () => {
      await AsyncStorage.clear();
   };

   function animatedButton() {
      Animated.timing(scaleValue, {
         toValue: 0.8,
         duration: 200,
         useNativeDriver: true,
      }).start(() => {
         Animated.timing(scaleValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
         }).start();
      });

      if (favData.includes(chosenOrchid.id)) {
         removeDataFromStorage();
      } else {
         setDataToStorage();
      }
   }

   return (
      <ScrollView style={{ flex: 1 }}>
         <View style={styles.rootContainer}>
            <View style={styles.headerContainer}>
               <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: chosenOrchid.imageUrl }}
                  defaultSource={require("../../assets/LoadingImage.png")}
               />
               <Ionicons
                  style={styles.backIcon}
                  name="chevron-back-outline"
                  size={40}
                  onPress={() => navigation.goBack()}
               />

               <Ionicons
                  style={styles.HomeIcon}
                  name="home-outline"
                  size={40}
                  onPress={() => navigation.navigate("Home")}
               />
            </View>
            <View style={styles.footerContainer}>
               <View style={styles.header}>
                  <Text style={styles.headerText}>{chosenOrchid.name}</Text>
                  {/* <View > */}
                  <TouchableWithoutFeedback onPress={animatedButton}>
                     <Animated.View
                        style={[
                           styles.headerIcon,
                           { transform: [{ scale: scaleValue }] },
                        ]}
                     >
                        {favData.includes(chosenOrchid.id) ? (
                           <Ionicons name="heart" size={23} color={"#f6736f"} />
                        ) : (
                           <Ionicons
                              name="heart-outline"
                              size={23}
                              color={"black"}
                           />
                        )}
                     </Animated.View>
                  </TouchableWithoutFeedback>
                  {/* </View> */}
               </View>
               <View style={styles.section1}>
                  <Text style={styles.title}>
                     Origin : {chosenOrchid.origin}
                  </Text>
               </View>
               <View style={styles.section2}>
                  <Text style={[styles.title, { color: AppColor.button }]}>
                     Description : {chosenOrchid.desc}
                  </Text>
               </View>
            </View>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   rootContainer: {
      flex: 1,
      marginBottom: 50,
   },
   headerContainer: {
      width: "100%",
      height: 350,
   },
   image: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
   },
   backIcon: {
      position: "absolute",
      top: 60,
      left: 30,
      color: "white",
   },

   HomeIcon: {
      position: "absolute",
      top: 60,
      left: 300,
      color: "white",
   },
   footerContainer: {
      paddingHorizontal: 20,
   },
   header: {
      marginTop: 30,
      marginBottom: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   headerText: {
      width: "80%",
      marginLeft: 20,
      fontSize: 38,
      fontWeight: "400",
   },
   headerIcon: {
      overflow: "hidden",
      padding: 13,
      borderRadius: 30,
      backgroundColor: "#d8dfff",
      justifyContent: "center",
      alignItems: "center",
   },
   section1: { padding: 20, marginBottom: 10 },
   title: {
      color: "orange",
      fontSize: 22,
      fontWeight: "600",
      marginBottom: 12,
   },
   contentText: {
      fontSize: 15,
      color: "rgba(0, 0, 0, 0.5)",
   },
   section2: {
      backgroundColor: AppColor.primary,
      padding: 20,
      borderRadius: 25,
      marginBottom: 15,
   },
   contentText: {
      fontSize: 15,
      color: "rgba(0, 0, 0, 0.5)",
   },
   section3: {
      padding: 20,
   },
   list: {
      paddingVertical: 15,
      paddingHorizontal: 30,
      marginBottom: 18,
      alignItems: "center",
      backgroundColor: AppColor.blue,
      opacity: 0.9,
      borderRadius: 12,
   },
});
