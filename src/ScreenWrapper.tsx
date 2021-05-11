import React from "react"
import { ScrollView, View } from "react-native"
import { Header } from "./Header"

interface ScreenWrapperProps {
    titleComponent: React.ReactChild,
    bounces?: boolean
}

export const ScreenWrapper: React.FunctionComponent<ScreenWrapperProps> = ({ titleComponent, children, bounces=false }) => {
    return <View style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
            <Header titleComponent={titleComponent} />
        </View>
        <View style={{ flex: 11 }}>
            <ScrollView style={{flex: 1}} bounces={bounces}>
                {children}
            </ScrollView>
        </View>
    </View>
}