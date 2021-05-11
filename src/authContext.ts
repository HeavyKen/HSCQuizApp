import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React from "react";

export const AuthContext = React.createContext<FirebaseAuthTypes.User | null>(null);