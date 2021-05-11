import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Card, CheckBox, IndexPath, Select, SelectItem, Text, Button } from "@ui-kitten/components"
import React from "react"
import { View } from "react-native"
import { QuizStackParamList } from "./QuizScreen"
import { ScreenWrapper } from "../ScreenWrapper"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { Exam, Subject } from "../types"

interface CreateQuizScreenProps {
    route: RouteProp<QuizStackParamList, "CreateQuiz">,
    navigation: StackNavigationProp<QuizStackParamList>
}

interface ExamWithReference {
    exam: Exam
    ref: FirebaseFirestoreTypes.DocumentReference<Exam>
}

export const CreateQuizScreen = ({ route, navigation }: CreateQuizScreenProps) => {
    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(new IndexPath(0));
    const [subjectDetails, setSubjectDetails] = React.useState<any>()
    const [exams, setExams] = React.useState<ExamWithReference[] | null>(null)
    const [checked, setChecked] = React.useState(Array(7).fill(true));

    React.useEffect(() => {
        route.params.subjectRef.get().then(doc => setSubjectDetails(doc.data() as unknown as Subject))
        route.params.subjectRef.collection("exams").get().then(snapshot => {
            setExams(snapshot.docs.map(doc => ({
                exam: doc.data(),
                ref: doc.ref
            })) as unknown as ExamWithReference[])
        })
    }, [route.params.subjectRef])

    return <ScreenWrapper titleComponent={subjectDetails?.name || "Loading..."}>
        <View style={{ flex: 3, margin: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text category='h6'>
                How Many Questions?
            </Text>
            <Select
                style={{ flex: 1, marginLeft: 20 }}
                selectedIndex={selectedIndex}
                value={selectedIndex ? 10 + selectedIndex.row * 5 : ""}
                onSelect={(index: IndexPath | IndexPath[]) => setSelectedIndex(index as IndexPath)}
            >
                <SelectItem title='10' />
                <SelectItem title='15' />
                <SelectItem title='20' />
            </Select>
        </View>
        <View style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
            <Text>
                We recommend no more than 20 questions at a time. It take around 15 minutes to complete a 20 question test (45 seconds per question).
            </Text>
        </View>
        <Card style={{ flex: 5, marginTop: 20, marginLeft: 20, marginRight: 20, height: '100%' }}>
            <Text style={{ fontWeight: 'bold' }}>
                Select exam year(s)
            </Text>

            {exams?.map(
                (exam, i) => <CheckBox
                    style={{ marginTop: 10 }}
                    checked={checked[i]}
                    onChange={next => setChecked(prev => {
                        prev[i] = next
                        console.log(prev)
                        return [...prev]
                    })}
                    key={i}
                >
                    {exam.exam.name}
                </CheckBox>
            ) || <Text>Loading...</Text>}

            <Button
                style={{ marginTop: 20 }}
                onPress={() => navigation.navigate("StartQuiz", { subjectId: "maths-adv", numQuestions: 10 + selectedIndex!.row * 5, examIds: [] })}
                disabled={!selectedIndex}
            >
                Generate Quiz
            </Button>

        </Card>
    </ScreenWrapper>
}