import 'react-native-gesture-handler';
 
import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
 
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
 
import HomeScreen from './pages/HomeScreen';
import ShareScreen from './pages/ShareScreen';
import InviteScreen from './pages/InviteScreen';

 
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
 
const NavigationDrawerStructure = (props) => {
 
  const toggleDrawer = () => {
   
    props.navigationProps.toggleDrawer();
  };
 
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        
        <Image
          source={require('./assets/menu.jpg')}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
 
const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
 
  switch (routeName) {
    case 'HomeScreen':
      return 'Home';
    case 'ShareScreen':
      return 'Share';
    ;
  }
};
 
const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#e0e0e0',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 16,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home ',
          
         
        }}
        
      />
      <Tab.Screen
        name="ShareScreen"
        component={ShareScreen}
        options={{
          tabBarLabel: 'Share',
      
        }}
      />
    </Tab.Navigator>
  );
};
 
const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="home"
        component={BottomTabStack}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          headerLeft: () => (
            <NavigationDrawerStructure
              navigationProps={navigation}
            />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        })}
      />
    </Stack.Navigator>
  );
};
 
const InviteScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', 
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold', 
        },
      }}>
      <Stack.Screen
        name="InviteScreen"
        component={InviteScreen}
        options={{
          title: 'Invite', 
        }}
      />
    </Stack.Navigator>
  );
};
 
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}>
        <Drawer.Screen
          name="HomeScreenStack"
          options={{drawerLabel: 'Home '}}
          component={HomeScreenStack}
        />
        <Drawer.Screen
          name="InviteScreenStack"
          options={{drawerLabel: 'Invite'}}
          component={InviteScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
 
export default App;