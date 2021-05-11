import React from 'react';
import * as eva from '@eva-design/eva';
import { NavigationContainer, DefaultTheme, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { TabScreen } from './TabScreen';
import { LoginScreen } from './LoginScreen';
import { theme } from "./theme"
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthContext } from './authContext';
import { State } from 'react-native-gesture-handler';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from "@react-native-firebase/auth"

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    //primary: '#F9FAFD',
    background: "#F9FAFD",
    //text: "",
    //card: "",
    //notification: "",
    //border: ""
  },
};


export type RootStackParamList = {
  Login: undefined,
  Tab: undefined
}

const RootStack = createStackNavigator<RootStackParamList>()


export const App = () => {

  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null)
  const navigationRef = React.useRef<NavigationContainerRef>(null)

  auth().onAuthStateChanged(user => {
    setUser(user);
    if (!user) navigationRef.current?.navigate("Login")
  })

  return <NavigationContainer theme={navTheme} ref={navigationRef}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AuthContext.Provider value={user}>
        <RootStack.Navigator initialRouteName="Login" headerMode="none">
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Tab" component={TabScreen} options={{gestureEnabled: false}}/>
        </RootStack.Navigator>
      </AuthContext.Provider>
    </ApplicationProvider>
  </NavigationContainer>
};
