import { StackNavigationProp } from "@react-navigation/stack"
import { FlexStyleProps } from "@ui-kitten/components/devsupport"
import { Button, Card, ListItem, Text } from "@ui-kitten/components/ui"
import React from "react"
import { View } from "react-native"
import { Header } from "../Header"
import { QuizStackParamList } from "../Quiz/QuizScreen"
import { ScreenWrapper } from "../ScreenWrapper"
import { StatsStackParamList } from "./StatsScreen"



interface StatsScreenProps {
    navigation: StackNavigationProp<StatsStackParamList>
}

export const ResultsScreen = ({ navigation }: StatsScreenProps) => {
    return <ScreenWrapper titleComponent="Math Advanced">


        <View style={{ margin: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text category='h5'>Exams</Text>
            </View>

            <Card style={{ borderRadius: 6, marginTop: 10 }} >
                <Text category="h6">Maths Advanced</Text> 
                <Text>Date: </Text>
                <Text>Result: </Text>
                
            </Card>

        </View>

    </ScreenWrapper>
}
