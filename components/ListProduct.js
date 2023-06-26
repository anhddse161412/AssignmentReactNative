import {
   FlatList,
   Image,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import colors from "../assets/colors/colors";
export default function ListProduct({ data }) {
   const [favData, setFavData] = useState([]);
   const navigation = useNavigation();
   const isFocused = useIsFocused();

   useEffect(() => {
      getFromStorage();
   }, [isFocused]);

   const getFromStorage = async () => {
      const data = await AsyncStorage.getItem("favorite");
      setFavData(data != null ? JSON.parse(data) : []);
   };

   function onPressFunction(id) {
      navigation.navigate("Detail", { orchidId: id });
   }

   function renderProductItem(item) {
      return (
         <View style={styles.rootContainer} key={item.id}>
            <TouchableOpacity
               style={styles.innerContainer}
               onPress={onPressFunction.bind(this, item.id)}
            >
               {favData.includes(item.id) ? (
                  <Ionicons
                     style={{
                        position: "absolute",
                        top: 0,
                        right: "4%",
                        backgroundColor: "#d8dfff",
                        padding: 5,
                        borderRadius: 16,
                        overflow: "hidden",
                     }}
                     name="heart"
                     size={20}
                     color="red"
                  />
               ) : (
                  <></>
               )}
               <View style={styles.left}>
                  <Text style={styles.textName}>{item.name}</Text>
                  <Text style={styles.textOrigin}>{item.origin}</Text>

                  <Text style={styles.rating}>
                     <Ionicons name="star-sharp"> </Ionicons>
                     {item.rating}.0
                  </Text>
               </View>
               <View style={styles.right}>
                  <Image
                     resizeMode="cover"
                     style={styles.image}
                     source={{ uri: item.imageUrl }}
                     defaultSource={require("../assets/LoadingImage.png")}
                  />
               </View>
            </TouchableOpacity>
         </View>
      );
   }

   return data.length !== 0 ? (
      <FlatList
         data={data}
         renderItem={({ item }) => renderProductItem(item)}
         scrollEnabled={false}
      />
   ) : (
      <View style={styles.emptyContainer}>
         <Text style={styles.emptyText}>Nothing here</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   rootContainer: {
      height: 180,
      marginBottom: 45,
      marginHorizontal: 30,
      borderRadius: 30,
      shadowColor: "rgba(0, 0, 0, 0.6)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      backgroundColor: "white",
   },
   innerContainer: {
      flex: 1,
      borderRightColor: "black",
      backgroundColor: "white",
      borderRadius: 30,
      flexDirection: "row",
      padding: 15,
   },
   left: {
      flex: 4,
      borderRadius: 30,
      shadowColor: "rgba(0, 0, 0, 0.6)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 4,
      backgroundColor: "white",
   },
   image: {
      width: "100%",
      height: "50%",
      borderRadius: 50,
   },
   right: {
      flex: 4,
      paddingLeft: 20,
      justifyContent: "center",
   },
   textName: {
      fontSize: 20,
      fontWeight: "600",
   },
   textOrigin: {
      marginTop: 5,
      marginBottom: 15,
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.4)",
   },
   rating: {
      flexDirection: "row",
      alignItems: "center",
      width: 50,
      borderRadius: 10,
      backgroundColor: "aquamarine",
   },
   ratingText: {
      fontSize: 15,
      fontWeight: "600",
      marginLeft: 5,
   },
   emptyContainer: {
      alignItems: "center",
   },
   emptyImage: {
      width: "70%",
   },
   emptyText: {
      color: "blue",
      fontSize: 20,
   },
   popularCardWrapper: {
      backgroundColor: colors.white,
      borderRadius: 25,
      paddingTop: 20,
      paddingLeft: 20,
      flexDirection: "row",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
   },
   popularTopWrapper: {
      flexDirection: "row",
   },
   popularTopText: {
      marginLeft: 10,
      fontWeight: 600,
      fontSize: 14,
      marginBottom: 10,
   },
   popularTitlesTitle: {
      margintop: 20,
   },
   popularTitlesWeight: {
      fontWeight: 500,
      fontSize: 14,
      color: "#CDCDCD",
      marginTop: 5,
   },

   popularCardBottom: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      marginLeft: -20,
      justifyContent: "space-between",
   },
   popularCardRight: {
      marginTop: 20,
   },
   popularCardImage: {
      fontSize: colors.textDark,
      color: colors.textDark,
      width: 174,
      height: 85,
      marginLeft: 45,
   },
});
