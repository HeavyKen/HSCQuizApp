import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Button, Card, Text } from "@ui-kitten/components"
import React from "react"
import { View } from "react-native"
import { StatsStackParamList } from "./StatsScreen"
import { ScreenWrapper } from "../ScreenWrapper"

interface StatsScreenProps {
    navigation: StackNavigationProp<StatsStackParamList>
}

export const ExamScreen = ({ navigation }: StatsStackParamList) => {
    return <ScreenWrapper titleComponent="Results">

        <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text category='h6'> Correct: 10%</Text>
            <Text category='h6'> Incorrect: 90%</Text>
            <Text category='h6'> Grade: 1/10</Text>
        </View>

        <Card style={{ justifyContent: 'space-evenly', margin: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text>Question</Text>
                <Text>Your Answer</Text>
                <Text>Correct</Text>
                <Text>Results</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text>1</Text>
                <Text>A</Text>
                <Text>A</Text>
                <Text status='success'>✓</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text>2</Text>
                <Text>B</Text>
                <Text>A</Text>
                <Text status='danger'>x</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text>3</Text>
                <Text>B</Text>
                <Text>A</Text>
                <Text status='danger'>x</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text>4</Text>
                <Text>D</Text>
                <Text>A</Text>
                <Text status='danger'>x</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text>5</Text>
                <Text>D</Text>
                <Text>A</Text>
                <Text status='danger'>x</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text>6</Text>
                <Text>D</Text>
                <Text>A</Text>
                <Text status='danger'>x</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text>7</Text>
                <Text>D</Text>
                <Text>A</Text>
                <Text status='danger'>x</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text>8</Text>
                <Text>D</Text>
                <Text>A</Text>
                <Text status='danger'>x</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text>9</Text>
                <Text>D</Text>
                <Text>A</Text>
                <Text status='danger'>x</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text>10</Text>
                <Text>D</Text>
                <Text>A</Text>
                <Text status='danger'>x</Text>
            </View>
        </Card>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Button appearance='ghost' onPress={() => navigation.navigate("StartQuiz", {subjectId: "maths-adv", numQuestions: 10, examIds: []})}>Retake Quiz</Button>
            <Button appearance='ghost' onPress={() => navigation.navigate("Home")}>Home</Button>
            <Button appearance='ghost' onPress={() => navigation.navigate("CreateQuiz", {subjectId: "maths-adv"})}>Take a New Quiz</Button>
        </View>
    </ScreenWrapper>
}