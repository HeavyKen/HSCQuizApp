import React from "react"
import { ScrollView, View } from "react-native"
import { Button, Icon, ListItem, Spinner, Text } from "@ui-kitten/components"
import { Header } from "../Header"
import { StackNavigationProp } from "@react-navigation/stack"
import { QuizStackParamList } from "./QuizScreen"
import { ScreenWrapper } from "../ScreenWrapper"
import firestore, { firebase, FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { AuthContext } from "../authContext"
import { SubjectSummary, UserProfile } from "../types"
import {useDocumentData} from "react-firebase-hooks/firestore"
import {useTheme} from "@ui-kitten/components"

const PlusIcon = (props: any) => <Icon {...props} name='plus-circle-outline' fill={useTheme()["color-success-600"]}/>
const MinusIcon = (props: any) => <Icon {...props} name='minus-circle-outline' fill='#FF0000'/>
const EditIcon = (props: any) => <Icon {...props} name='edit-outline' />

interface HomeScreenProps {
    navigation: StackNavigationProp<QuizStackParamList>
}

// const docRef = firestore().collection("collectionName").doc("documentId")
// const [data, loading, error] = useDocumentData(docRef)

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const user = React.useContext(AuthContext)
    const [userProfile, profileLoading, profileError]: [UserProfile | undefined, boolean, any] = useDocumentData(firestore().collection("users").doc(user?.uid))
    const [subjects, setSubjects] = React.useState<SubjectSummary[] | null>(null)
    const [editing, setEditing] = React.useState<boolean>(false)

    // Runs when edit button is pressed.
    const displayAllSubjects = async () => {
        if (subjects) {
            // Subjects already loaded, so remove them instead.
            setSubjects(null)
            setEditing(false)
            return
        }

        setEditing(true)

        // Get data from collection.
        const snapshot = await firestore().collection('subjects').get()

        // Set up array of subjects.
        let subs = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
            // For each subject...
            const doc = snapshot.docs[i];
            // Push a 'subject summary' to the array.
            subs.push({
                reference: doc.ref,
                name: doc.data().name
            })
        }
        setSubjects(subs)
    }


    return <ScreenWrapper titleComponent={<>Hello, <Text category="h4">{userProfile?.name}</Text></>}>

        <View style={{ margin: 20, flex: 1 }}>
            {!profileLoading && userProfile ? <>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Text category='h5'>Your Subjects</Text>
                    <Button appearance='ghost' accessoryLeft={EditIcon} size="large" onPress={displayAllSubjects} />
                </View>
                {/* User's Added Subjects */}
                {userProfile.subjects.map((subject, i) => <ListItem
                    key={i}
                    title={() => <Text category="h6">{subject.name}</Text>} style={{ borderRadius: 6, marginTop: 10 }}
                    accessoryRight={subjects && editing ? MinusIcon : undefined}
                    onPress={() => editing && subjects ? firebase.firestore().collection("users").doc(user?.uid).update({
                        "subjects": firebase.firestore.FieldValue.arrayRemove(subject)
                    }) : navigation.navigate("CreateQuiz", { subjectId: subject.reference.id })}
                />)}
                {/* Subjects that can be added. Only shows subjects the user isn't already in.
                    Only shows while editing. Shows Spinner if editing, but subjects haven't loaded/been set. */}
                {editing && (subjects ? subjects.map((subject, i) => !userProfile.subjects.find(sub => sub.name === subject.name) && <ListItem
                    key={i}
                    accessoryRight={PlusIcon}
                    title={() => <Text category="h6">{subject.name}</Text>} style={{ borderRadius: 6, marginTop: 10 }}
                    onPress={() => firebase.firestore().collection("users").doc(user?.uid).update({
                        "subjects": firebase.firestore.FieldValue.arrayUnion(subject)
                    })}
                />) : <Spinner size='giant' style={{}} />)}
            </> : <Spinner size='giant' style={{}} />}
        </View>


    </ScreenWrapper>
}