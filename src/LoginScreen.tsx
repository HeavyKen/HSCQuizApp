import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card, TabBar, Tab, Input, Button, Text, Spinner } from "@ui-kitten/components";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RootStackParamList } from "./App";
import { AuthContext } from "./authContext";
import auth from "@react-native-firebase/auth"


interface LoginScreenProps {
    navigation: StackNavigationProp<RootStackParamList>
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const user = React.useContext(AuthContext)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (user) navigation.navigate("Tab")
    }, [user])

    const onPress = () => {
        setLoading(true);
        (
            selectedIndex === 0 ? auth().signInWithEmailAndPassword(
                email, password
            ) : auth().createUserWithEmailAndPassword(
                email, password
            )
        ).then(() => {
            setError(null)
        }).catch(error => {
            setError(error.code)
        }).finally(() => {
            setLoading(false)
        })
    }

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return <View style={{ flex: 1 }}>
        <LinearGradient colors={["#324ab2", "#00FFFF"]} style={{
            flex: 4,
            alignItems: "center",
            flexDirection: "row",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
        }}>
            <Text style={{ color: 'white', marginLeft: '5%' }} category='h4'>Welcome</Text>
        </LinearGradient>
        <View style={{ flex: 7 }} />
        <Card style={{
            flex: 1, position: "absolute", left: "7%", right: "7%", top: "25%", bottom: "23.5%", borderRadius: 10, borderColor: "rgba(0, 0, 0, 0.3)"
        }} >
            <TabBar
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <Tab title='LOGIN' />
                <Tab title='SIGNUP' />
            </TabBar>
            {error && <Text>{error}</Text>}
            <Input placeholder='Email Address' value={email} onChangeText={setEmail} style={{ borderColor: "rgba(0, 0, 0, 0.3)", marginTop: 30 }} />
            <Input placeholder='Password' secureTextEntry={true} value={password} onChangeText={setPassword} style={{ borderColor: "rgba(0, 0, 0, 0.3)", marginTop: 10 }} />
            {selectedIndex === 0 ? <Text style={{ marginTop: 20 }}>Forgot Password?</Text> : <Text style={{ marginTop: 20 }}></Text>}
            {/* <View style={{flex: 1, flexGrow: 100}}/> */}
            <Button style={{ marginTop: 60 }} onPress={onPress} >
                {selectedIndex === 0 ? 'Login' : 'Sign Up'}
            </Button>
        </Card>

        {loading && <View style={{ position: "absolute", left: "50%", bottom: "11.75%" }}>
            <Spinner size='giant' style={{}} />
        </View>}

    </View>
};