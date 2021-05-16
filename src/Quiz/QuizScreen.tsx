import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { HomeScreen } from "./HomeScreen"
import { CreateQuizScreen } from "./CreateQuizScreen"
import { StartQuizScreen } from "./StartQuizScreen"
import { QuizQuestionsScreen } from "./QuizQuestionsScreen"
import { QuizResultsScreen } from "./QuizResultsScreen"
import { Result } from "../types"

export type QuizStackParamList = {
    Home: undefined,
    CreateQuiz: {
        subjectId: string
    },
    StartQuiz: {
        subjectId: string,
        numQuestions: number,
        examIds: string[]
    },
    QuizQuestions: {
        subjectId: string
        questionIds: [string, string][]
    },
    QuizResults: {
        result: Result
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