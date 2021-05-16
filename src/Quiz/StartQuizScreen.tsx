import React from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { Card, CheckBox, IndexPath, Select, SelectItem, Text, Button } from "@ui-kitten/components"
import { ScreenWrapper } from "../ScreenWrapper"
import { QuizStackParamList } from "./QuizScreen"
import { View } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

interface StartQuizScreenProps {
    route: RouteProp<QuizStackParamList, "StartQuiz">,
    navigation: StackNavigationProp<QuizStackParamList>
}

export const StartQuizScreen = ({ route, navigation }: StartQuizScreenProps) => {
    // const docRef = firestore().collection("collectionName").doc("documentId")
    // const [data, loading, error] = useDocumentData(docRef)

    const startQuiz = async () => {
        const exams = await firestore()
            // Get collection of all subjects...
            .collection('subjects')
            // Get document containing single subject...
            .doc(route.params.subjectId)
            // Get collection of all exams in that subject.
            .collection('exams')
            // Filter WHERE document ID is in array.
            .where(firestore.FieldPath.documentId(), 'in', route.params.examIds)
            .get()
        
        let questionPool: any[] = []
        for (const exam of exams.docs) {
            const snapshot = await exam.ref.collection('questions').get()
            questionPool = questionPool.concat(snapshot.docs.map(q => [exam, q]))
        }


        let questions: any[] = []

        // number of questions wanted = route.params.numQuestions
        // number of possible questions left = questionPool.length
        // number of questions chosen already = questions.length

        while (route.params.numQuestions > questions.length && questionPool.length > 0) {
            const i = Math.floor((Math.random() * questionPool.length))
            questions.push([questionPool[i][0].id, questionPool[i][1].id])
            questionPool.splice(i, 1)
        }
        console.log(questions)

        navigation.navigate("QuizQuestions", {
            subjectId: route.params.subjectId,
            questionIds: questions
        })
    }

    return <ScreenWrapper titleComponent="Start Quiz">
        <View style={{ margin: 10 }}>
            <Card>
                <Text style={{ fontWeight: 'bold' }}>Your Quiz is Ready</Text>
                <Text>No of Questions: {route.params.numQuestions}</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Quiz Quide</Text>
                <Text>Here are a few things to remember</Text>
                <Text style={{ marginLeft: 10, marginTop: 10}}>- The timer is on the top right hand of the screen</Text>
                <Text style={{ marginLeft: 10, marginTop: 10}}>- You can repeat the Quiz as many times as you would like</Text>
                <Text style={{ marginLeft: 10, marginTop: 10}}>- Have a glass of water and take deep beaths to clear you mind and thoughts</Text>
                <Text style={{ marginLeft: 10, marginTop: 10}}>- Make sure to read the question carefully</Text>
                <Button style={{marginTop: 20}} onPress={startQuiz}>
                    Start Quiz
                </Button>
            </Card>
        </View>
    </ScreenWrapper>
}