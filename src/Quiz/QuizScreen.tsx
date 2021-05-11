import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { HomeScreen } from "./HomeScreen"
import { CreateQuizScreen } from "./CreateQuizScreen"
import { StartQuizScreen } from "./StartQuizScreen"
import { QuizQuestionsScreen } from "./QuizQuestionsScreen"
import { QuizResultsScreen } from "./QuizResultsScreen"
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

export type QuizStackParamList = {
    Home: undefined,
    CreateQuiz: {
        subjectRef: FirebaseFirestoreTypes.DocumentReference
    },
    StartQuiz: {
        subjectId: string,
        numQuestions: number,
        examIds: string[]
    },
    QuizQuestions: {
        subjectId: string,
        numQuestions: number,
        examIds: string[]
    },
    QuizResults: {
        questionIds: string[],
        answers: number[]
    }
}


const QuizStack = createStackNavigator<QuizStackParamList>()

export const QuizScreen = () => <QuizStack.Navigator initialRouteName="Home" headerMode="none">
    <QuizStack.Screen name="Home" component={HomeScreen} />
    <QuizStack.Screen name="CreateQuiz" component={CreateQuizScreen} />
    <QuizStack.Screen name="StartQuiz" component={StartQuizScreen} />
    <QuizStack.Screen name="QuizQuestions" component={QuizQuestionsScreen} />
    <QuizStack.Screen name="QuizResults" component={QuizResultsScreen} />
</QuizStack.Navigator>