import React from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { Card, CheckBox, IndexPath, Select, SelectItem, Text, Button } from "@ui-kitten/components"
import { ScreenWrapper } from "../ScreenWrapper"
import { QuizStackParamList } from "./QuizScreen"
import { View } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"

interface StartQuizScreenProps {
    route: RouteProp<QuizStackParamList, "StartQuiz">,
    navigation: StackNavigationProp<QuizStackParamList>
}

export const StartQuizScreen = ({ route, navigation }: StartQuizScreenProps) => {

    return <ScreenWrapper titleComponent="Start Quiz">
        <View style={{ margin: 10 }}>
            <Card>
                <Text style={{ fontWeight: 'bold' }}>Your Quiz is Ready</Text>
                <Text>No of Questions: {route.params.numQuestions}</Text>
                <Text>Time allowed: {Math.floor(route.params.numQuestions * 45 / 60)} min {(route.params.numQuestions * 45) % 60} sec</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Quiz Quide</Text>
                <Text>Here are a few things to remember</Text>
                <Text style={{ marginLeft: 10, marginTop: 10}}>- The timer is on the top right hand of the screen</Text>
                <Text style={{ marginLeft: 10, marginTop: 10}}>- You can repeat the Quiz as many times as you would like</Text>
                <Text style={{ marginLeft: 10, marginTop: 10}}>- Have a glass of water and take deep beaths to clear you mind and thoughts</Text>
                <Text style={{ marginLeft: 10, marginTop: 10}}>- Make sure to read the question carefully</Text>
                <Button style={{marginTop: 20}} onPress={() => navigation.navigate("QuizQuestions", route.params)}>
                    Start Quiz
                </Button>
            </Card>
        </View>
    </ScreenWrapper>
}