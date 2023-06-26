import {
   FlatList,
   Image,
   Pressable,
   StyleSheet,
   Text,
   View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

export default function ListCatItem({ data, selectCat, chosenCat }) {
   function renderCatItem(item) {
      return (
         <View
            style={[
               styles.categoriesItemWrapper,
               item.id === chosenCat
                  ? { backgroundColor: "aquamarine" }
                  : { backgroundColor: "white" },
            ]}
         >
            <Pressable onPress={selectCat.bind(this, item.id)}>
               {item.id === "c0" ? (
                  <View
                     style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     <Ionicons
                        style={[
                           {
                              padding: 15,
                              borderWidth: 2,
                              borderColor: "black",
                              borderRadius: 36,
                              overflow: "hidden",
                           },
                           item.id !== chosenCat ? { borderWidth: 0 } : null,
                        ]}
                        name="home"
                        size={40}
                     />
                  </View>
               ) : (
                  <>
                     <Image
                        style={styles.categoriesItemImage}
                        source={{ uri: item.img }}
                        resizeMode="cover"
                     />
                     <View style={styles.content}>
                        <Text
                           style={[
                              styles.categoriesItemTitle,
                              item.id === chosenCat
                                 ? { color: "black" }
                                 : { color: "green" },
                           ]}
                        >
                           {item.name}
                        </Text>
                        <Ionicons
                           name={
                              item.id === chosenCat
                                 ? "ios-radio-button-on"
                                 : "ios-radio-button-off"
                           }
                           size={25}
                           color={item.id === chosenCat ? "black" : "green"}
                        />
                     </View>
                  </>
               )}
            </Pressable>
         </View>
      );
   }

   return (
      <FlatList
         data={data}
         renderItem={({ item }) => renderCatItem(item)}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
      />
   );
}

const styles = StyleSheet.create({
   rootContainer: {
      shadowColor: "rgba(0, 0, 0, 0.4)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      padding: 15,
      // backgroundColor: "transparent",
   },
   innerContainer: {
      width: 150,
      height: 200,
      borderRadius: 30,
   },
   image: {
      width: "100%",
      height: 120,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
   },
   content: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      justifyContent: "space-between",
      alignItems: "center",
   },
   textContent: {
      textAlign: "center",
      fontWeight: "600",
   },
   categoriesListWrapper: {
      paddingTop: 15,
      paddingBottom: 20,
   },
   categoriesItemWrapper: {
      backgroundColor: "#FFFFFF",
      marginRight: 20,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
   },
   categoriesItemImage: {
      width: 60,
      height: 60,
      marginTop: 24,
      alignSelf: "center",
      marginHorizontal: 20,
   },
   categoriesItemTitle: {
      textAlign: "center",
      fontWeight: 400,
      fontSize: 10,
      marginTop: 10,
   },
});
