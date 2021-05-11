import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { ModalSlideFromBottomIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets"
import { Button, Card, Input, Layout, Modal, Text, Toggle } from "@ui-kitten/components"
import React from "react"
import { View } from "react-native"
import { AuthContext } from "../authContext"
import { ScreenWrapper } from "../ScreenWrapper"
import { TabNavigatorParamList } from "../TabScreen"
import auth from "@react-native-firebase/auth"


interface SettingsScreenProps {
    navigation: BottomTabNavigationProp<TabNavigatorParamList>
}

export const SettingsScreen = ({ navigation }: SettingsScreenProps) => {

    const [checked, setChecked] = React.useState(false);

    const onCheckedChange = (isChecked: React.SetStateAction<boolean>) => {
        setChecked(isChecked);
    };


    const [visible, setVisible] = React.useState(false);

    return <ScreenWrapper titleComponent="Settings">


        <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'space-between' }}>
                <Text category='h6' style={{ fontWeight: 'bold' }} >Dark Mode?</Text>
                <Toggle checked={checked} onChange={onCheckedChange} />
            </View>

            <Text category='h6' style={{ margin: 10, fontWeight: 'bold' }}>
                Change Password
            </Text>
            <View style={{ margin: 10 }}>
                <Text>
                    Old Password
                </Text>
                <Input style={{ width: '100%' }} />
                <Text>
                    New Password
                </Text>
                <Input style={{ width: '100%' }} />
                <Text>
                    Confirm New Password
                </Text>
                <Input style={{ width: '100%' }} />
            </View>

            <Text category='h6' style={{ margin: 10, fontWeight: 'bold' }}>
                Change Email
            </Text>
            <View style={{ margin: 10 }}>
                <Text>
                    Old Email
                </Text>
                <Input style={{ width: '100%' }} />
                <Text>
                    New Email
                </Text>
                <Input style={{ width: '100%' }} />
                <Text>
                    Confirm New Email
                </Text>
                <Input style={{ width: '100%' }} />
            </View>

            <Button onPress={() => auth().signOut()}>Log Out</Button>
        </Card>


    </ScreenWrapper>
}