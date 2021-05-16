import { RouteProp, TabRouter } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Button, Card, Text } from "@ui-kitten/components"
import React from "react"
import { View } from "react-native"
import { QuizStackParamList } from "./QuizScreen"
import { ScreenWrapper } from "../ScreenWrapper"

interface QuizResultsScreenProps {
    route: RouteProp<QuizStackParamList, "QuizResults">,
    navigation: StackNavigationProp<QuizStackParamList>
}

export const QuizResultsScreen = ({ route, navigation }: QuizResultsScreenProps) => {
    return <ScreenWrapper titleComponent="Results">

        <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text category='h6'> Correct: {route.params.result.percentage}%</Text>
            <Text category='h6'> Grade: {route.params.result.score}/{route.params.result.numQuestions}</Text>
        </View>

        <Card style={{ justifyContent: 'space-evenly', margin: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text>Question</Text>
                <Text>Your Answer</Text>
                <Text>Correct</Text>
                <Text>Results</Text>
            </View>
            {route.params.result.answers.map((a, i) => <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text>{i + 1}</Text>
                <Text>{a.user !== undefined && a.user !== null ? String.fromCharCode(65 + a.user) : " "}</Text>
                <Text>{String.fromCharCode(65 + a.correct)}</Text>
                <Text status={a.correct === a.user ? "success" : "danger"}>{a.correct === a.user ? "✓" : "x"}</Text>
            </View>)}
        </Card>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            {/* <Button appearance='ghost' onPress={() => navigation.navigate("StartQuiz", {subjectId: "maths-adv", numQuestions: 10, examIds: []})}>Retake Quiz</Button> */}
            <Button appearance='ghost' onPress={() => navigation.navigate("Home")}>Home</Button>
            {/* <Button appearance='ghost' onPress={() => navigation.navigate("CreateQuiz", {subjectId: "maths-adv"})}>Take a New Quiz</Button> */}
        </View>
    </ScreenWrapper>
}