import { StackNavigationProp } from "@react-navigation/stack"
import { FlexStyleProps } from "@ui-kitten/components/devsupport"
import { Button, ListItem, Text } from "@ui-kitten/components/ui"
import React from "react"
import { View } from "react-native"
import { Header } from "../Header"
import { QuizStackParamList } from "../Quiz/QuizScreen"
import { ScreenWrapper } from "../ScreenWrapper"
import { StatsStackParamList } from "./StatsScreen"



interface StatsScreenProps {
    navigation: StackNavigationProp<StatsStackParamList>
}

export const SubjectStats = ({navigation}: StatsScreenProps) => {
    return <ScreenWrapper titleComponent="Results">


        <View style={{ margin: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text category='h5'>Your Subjects</Text>
            </View>

            <ListItem
                title={() => <Text category="h6">Maths Advanced</Text>} style={{ borderRadius: 6, marginTop: 10 }}
                onPress={() => navigation.navigate('ResultsScreen', { subjectId: "maths-adv" })}
            />
        </View>




    </ScreenWrapper>
}
