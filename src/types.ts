import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface SubjectSummary {
    name: string
    reference: FirebaseFirestoreTypes.DocumentReference
}

export interface UserProfile {
    name: string,
    subjects: SubjectSummary[],
    darkMode: boolean
}

export interface Subject {
    name: string
}

export interface Exam {
    name: string
}

export interface Question {
    text: string
    answers: string[]
    correctIndex: number
}