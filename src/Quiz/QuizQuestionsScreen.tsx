import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Card, CheckBox, Tab, TabBar, Text, Button, RadioGroup, Radio, Spinner } from "@ui-kitten/components"
import React from "react"
import { View, Image } from "react-native"
import { QuizStackParamList } from "./QuizScreen"
import { ScreenWrapper } from "../ScreenWrapper"
import { Question, Result } from "../types"
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { AuthContext } from "../authContext"

interface QuizQuestionsScreenProps {
    route: RouteProp<QuizStackParamList, "QuizQuestions">,
    navigation: StackNavigationProp<QuizStackParamList>
}

export const QuizQuestionsScreen = ({ route, navigation }: QuizQuestionsScreenProps) => {
    const user = React.useContext(AuthContext)

    const [questions, setQuestions] = React.useState<Question[]>([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true)
            let questions = []
            for (const [examId, questionId] of route.params.questionIds) {
                // route.params.subjectId
                const question = await firestore()
                    .collection('subjects')
                    .doc(route.params.subjectId)
                    .collection('exams')
                    .doc(examId)
                    .collection('questions')
                    .doc(questionId)
                    .get()

                questions.push(question.data())
            }
            setQuestions(questions as Question[])
            setSelectedAnswers(questions.map(_ => undefined))
            setLoading(false)
        }

        fetchQuestions()
    }, [route.params.questionIds, route.params.subjectId])

    const [selectedQuestion, setSelectedQuestion] = React.useState(0);
    const [selectedAnswers, setSelectedAnswers] = React.useState<(number | undefined)[]>([]);
    const subjectRef = firestore().collection("subjects").doc(route.params.subjectId)
    const [subjectDetails] = useDocumentData(subjectRef)

    const endQuiz = () => {
        // selectedAnswers is list of answers
        // questions is list of questions
        // questions[index].correctIndex is the index of the correct answer
        // the user answered correctly if correctIndex (see above)
        // matches the corresponding item of selectedAnswers
        let score = 0
        let answers = []
        for (let i = 0; i < questions.length; i++) {
            if (selectedAnswers[i] === questions[i].correctIndex) {
                score++;
            }

            answers.push({
                correct: questions[i].correctIndex,
                user: selectedAnswers[i]
            })
        }

        const result: Result = {
            score,
            numQuestions: questions.length,
            percentage: Math.ceil(score / questions.length * 100),
            answers
        }
        firestore().collection("users").doc(user?.uid).collection("results").add(result)
        navigation.navigate("QuizResults", {
            result
        })
    }

    return <ScreenWrapper titleComponent={<>{subjectDetails?.name}</>}>
        {loading ? <Spinner size='giant' style={{display: 'flex', alignItems:'center', justifyContent: 'center'}} /> : <View style={{ margin: 10 }}>
            <TabBar
                selectedIndex={selectedQuestion}
                onSelect={index => setSelectedQuestion(index)}>
                {route.params.questionIds.map((_, i) => <Tab
                    title={`Q${i + 1}`}
                    key={i}
                />)}
            </TabBar>


            <Card>
                <Text style={{ fontWeight: 'bold' }}>Question {selectedQuestion + 1}</Text>
                {/* <Text>Question ID: {route.params.questionIds[selectedQuestion][1]}</Text> */}

                <Text style={{ marginTop: 10 }}>
                    {questions[selectedQuestion].text}
                </Text>

                <RadioGroup
                    selectedIndex={selectedAnswers[selectedQuestion]}
                    onChange={index => setSelectedAnswers(prev => prev.map((a, i) => i === selectedQuestion ? index : a))}>
                    {questions[selectedQuestion].answers?.map((answer, index) => <Radio key={index}>
                        {String.fromCharCode(65 + index)}: {answer}
                    </Radio>)}
                </RadioGroup>

                <Button
                    style={{ marginTop: 10 }}
                    onPress={() => {
                        if (selectedQuestion + 1 === route.params.questionIds.length) {
                            endQuiz()
                        } else {
                            setSelectedQuestion(prev => prev + 1)
                        }
                    }}
                >
                    {selectedQuestion + 1 === route.params.questionIds.length ? "End Quiz" : "Next Question"}
                </Button>

    
            </Card>
            {selectedQuestion + 1 === route.params.questionIds.length || <Button size='small' appearance='ghost' style={{margin: 20}} onPress={endQuiz}>End Quiz</Button>}
        </View>}

    </ScreenWrapper>
}