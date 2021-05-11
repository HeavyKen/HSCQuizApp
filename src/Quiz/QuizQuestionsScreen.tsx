import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Card, CheckBox, Tab, TabBar, Text, Button, RadioGroup, Radio } from "@ui-kitten/components"
import React from "react"
import { View, Image } from "react-native"
import { QuizStackParamList } from "./QuizScreen"
import { ScreenWrapper } from "../ScreenWrapper"

interface QuizQuestionsScreenProps {
    route: RouteProp<QuizStackParamList, "QuizQuestions">,
    navigation: StackNavigationProp<QuizStackParamList>
}

export const QuizQuestionsScreen = ({ route, navigation }: QuizQuestionsScreenProps) => {

    const [selectedQuestion, setSelectedQuestion] = React.useState(0);
    const [selectedAnswer, setSelectedAnswer] = React.useState(0);
    const [checked, setChecked] = React.useState(false);

    return <ScreenWrapper titleComponent={<>Maths Advanced Quiz</>}>
        <View style={{ margin: 10 }}>
            <TabBar
                selectedIndex={selectedQuestion}
                onSelect={index => setSelectedQuestion(index)}>
                {Array(10).fill(null).map((_, i) => <Tab
                    title={`Q${i + 1}`}
                    key={i}
                />)}
            </TabBar>


            <Card>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold' }}>Question {selectedQuestion + 1}</Text>
                    <Text>Time: 7:30</Text>
                </View>

                <Text style={{ marginTop: 10 }}>
                    The diagram shows the graph of f'(x), the derivative of a function
                </Text>

                <Image style={{ aspectRatio: 1, width: "100%" }} source={require("../images/sampleImage.png")} resizeMode="contain" />

                <Text style={{ marginTop: 10 }}>
                    For what Value of x does the graph of the function f(x) have a point of inflexion
                </Text>

                <RadioGroup
                    selectedIndex={selectedAnswer}
                    onChange={index => setSelectedAnswer(index)}>
                    <Radio>x = a</Radio>
                    <Radio>x = b</Radio>
                    <Radio>x = c</Radio>
                    <Radio>x = d</Radio>
                </RadioGroup>

                <Button
                    style={{ marginTop: 10 }}
                    onPress={() => {
                        if (selectedQuestion + 1 === route.params.numQuestions)
                        {
                            navigation.navigate("QuizResults", {
                                questionIds: [],
                                answers: []
                            })
                        }
                        else
                        {
                            setSelectedQuestion(prev => prev + 1)
                        }
                    }}
                >
                    {selectedQuestion + 1 === route.params.numQuestions ? "End Quiz" : "Next Question"}
                </Button>
            </Card>
        </View>
    </ScreenWrapper>
}