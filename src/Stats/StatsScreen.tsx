import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { SubjectStats } from "./SubjectStats"
import { ResultsScreen } from "./ResultsScreen"
//import { ExamScreen } from "./ResultsScreen"


export type StatsStackParamList = {
    StatsScreen: undefined,
    Subects: {
        subjectId: string
    },
    
    ResultsScreen: undefined,
    Exam: {
       
    },
    ExamScreen: { 
        questionIds: string[],
        answers: number[]
    }

}

const StatsStack = createStackNavigator<StatsStackParamList>()

export const StatsScreen = () => <StatsStack.Navigator initialRouteName="StatsScreen" headerMode="none">
    <StatsStack.Screen name="StatsScreen" component={SubjectStats} />
    <StatsStack.Screen name="ResultsScreen" component={ResultsScreen} />
    {/* <StatsStack.Screen name="ExamScreen" component={ExamScreen} /> */}

</StatsStack.Navigator>