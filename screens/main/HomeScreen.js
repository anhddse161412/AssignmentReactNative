import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ORCHIDS } from "../../data/orchids";
import { CATEGORIES } from "../../data/categories";
import ListProduct from "../../components/ListProduct";
import AppColor from "../../consts/colors";
import ListCatItem from "../../components/ListCatItem";
import colors from "../../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function HomeScreen({ navigation }) {
   const [chosenCat, setChosenCat] = useState("c0");

   let data;

   if (!chosenCat) {
      data = ORCHIDS;
   } else if (chosenCat) {
      data = ORCHIDS.filter((item) => item.categoriId == chosenCat);
   }

   function selectCat(id) {
      setChosenCat(id);
   }

   return (
      <ScrollView style={styles.rootContainer}>
         <View style={styles.headSection}>
            <Text style={styles.text1}>Orchid</Text>
            <Text style={styles.text2}>Collection</Text>
         </View>
         <View style={styles.search}>
            <Text style={styles.searchText}>
               <Ionicons name="search-outline" size={15} />
               Search
            </Text>
         </View>
         <View style={styles.categoriesWrapper}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            <View style={styles.categoriesListWrapper}>
               <ListCatItem
                  data={CATEGORIES}
                  selectCat={selectCat}
                  chosenCat={chosenCat}
               />
            </View>
         </View>
         <View style={styles.product}>
            <Text style={styles.textTitle}>Popular</Text>
         </View>
         <View>
            <ListProduct data={data} />
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   rootContainer: {
      flex: 1,
      // backgroundColor: AppColor.bg,
      backgroundColor: "white",
   },
   headSection: {
      marginTop: 30,
      marginLeft: 30,
   },
   text1: {
      fontSize: 20,
      color: "rgba(0, 0, 0, 0.4)",
   },
   text2: {
      fontSize: 50,
      fontWeight: "500",
      color: AppColor.blue,
   },
   textTitle: {
      fontSize: 22,
      fontWeight: "500",
      marginBottom: 15,
      marginLeft: 30,
   },
   cat: {
      marginTop: 25,
      marginHorizontal: 15,
   },
   product: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginTop: 35,
   },
   textViewAll: {
      marginRight: 30,
      marginBottom: 15,
      color: "rgba(0,0,0,0.5)",
   },
   categoriesItemWrapper: {
      backgroundColor: "#F5CA89",
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
   categoriesListWrapper: {
      paddingTop: 15,
      paddingBottom: 20,
   },
   categoriesTitle: {
      fontWeight: "bold",
      fontSize: 16,
      paddingHorizontal: 20,
   },
   searchWrapper: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      marginTop: 30,
   },
   search: {
      flex: 1,
      margin: 10,
      borderBottomColor: colors.textLight,
      borderBottomWidth: 2,
   },
   searchText: {
      fontSize: 14,
      marginBottom: 5,
      color: colors.textLight,
   },
});
