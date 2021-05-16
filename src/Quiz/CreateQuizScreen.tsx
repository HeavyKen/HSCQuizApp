import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Card, CheckBox, IndexPath, Select, SelectItem, Text, Button } from "@ui-kitten/components"
import React from "react"
import { View } from "react-native"
import { QuizStackParamList } from "./QuizScreen"
import { ScreenWrapper } from "../ScreenWrapper"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { Exam, Subject } from "../types"
import { useCollection, useCollectionData, useDocumentData } from "react-firebase-hooks/firestore"

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
    const [checked, setChecked] = React.useState<boolean[]>([]);

    const subjectRef = firestore().collection("subjects").doc(route.params.subjectId)
    const [subjectDetails, subjectLoading, subjectError] = useDocumentData(subjectRef)
    const [exams, examsLoading, examsError] = useCollection(subjectRef.collection("exams"))

    React.useEffect(() => {
        setChecked(exams?.docs.map((_: any) => true) || [])
    }, [exams])

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

            {exams?.docs.map(
                (exam: any, i: number) => <CheckBox
                    style={{ marginTop: 10 }}
                    checked={checked[i]}
                    onChange={next => setChecked(prev => {
                        prev[i] = next
                        return [...prev]
                    })}
                    key={i}
                >
                    {exam.data().name}
                </CheckBox>
            ) || <Text>Loading...</Text>}

            <Button
                style={{ marginTop: 20 }}
                onPress={() => navigation.navigate("StartQuiz", {
                    subjectId: route.params.subjectId,
                    numQuestions: 10 + selectedIndex!.row * 5,
                    examIds: exams?.docs.filter((_: any, i: number) => checked[i]).map((e: { id: any }) => e.id) || []
                })}
                disabled={!selectedIndex || !exams?.docs.length || !checked.filter(c => c).length}
            >
                Generate Quiz
            </Button>

        </Card>
    </ScreenWrapper>
}