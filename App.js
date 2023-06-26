import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/main/HomeScreen";
import FavoriteScreen from "./screens/main/FavoriteScreen";
import ItemDetailScreen from "./screens/main/ItemDetailScreen";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigators() {
   return (
      <Tab.Navigator
         screenOptions={{
            headerShown: false,
            tabBarStyle: {
               backgroundColor: "white",
            },
         }}
      >
         <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
               // tabBarLabel: "Home",
               tabBarShowLabel: false,
               tabBarIcon: ({ color, focused }) => (
                  <Ionicons
                     name={focused ? "home" : "home-outline"}
                     size={focused ? 30 : 25}
                     color={color}
                  />
               ),
               tabBarActiveTintColor: "green",
            }}
         />
         <Tab.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={{
               // tabBarLabel: "Home",
               tabBarShowLabel: false,
               tabBarIcon: ({ color, focused }) => (
                  <Ionicons
                     name={focused ? "heart" : "heart-outline"}
                     size={focused ? 30 : 25}
                     color={color}
                  />
               ),
               tabBarActiveTintColor: "red",
            }}
         />
      </Tab.Navigator>
   );
}

function DrawerNavigators() {
   return (
      <Drawer.Navigator
         screenOptions={{
            drawerActiveBackgroundColor: "black",
            drawerActiveTintColor: "white",
            drawerInactiveTintColor: "black",
            headerStyle: {
               backgroundColor: "white",
            },
            headerTintColor: "black",
            headerTitle: "",
            headerRight: () => {
               return (
                  <Image
                     style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginRight: 20,
                        marginBottom: 20,
                     }}
                     source={require("./assets/Originium.png")}
                  />
               );
            },
         }}
      >
         <Drawer.Screen
            name="TabHome"
            component={BottomTabNavigators}
            options={{
               title: "Home",
            }}
         />
         <Drawer.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={{
               title: "Favorite",
               headerTitle: "Favorite",
            }}
         />
      </Drawer.Navigator>
   );
}

export default function App() {
   return (
      <>
         <StatusBar style="light" />
         <NavigationContainer>
            <Stack.Navigator>
               <Stack.Screen
                  // name="Home"
                  // component={HomeScreen}
                  name="DrawerHome"
                  component={DrawerNavigators}
                  options={{ headerShown: false }}
               />
               <Stack.Screen name="Detail" component={ItemDetailScreen} />
            </Stack.Navigator>
         </NavigationContainer>
      </>
   );
}
