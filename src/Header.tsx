import React from "react"
import { Text } from "@ui-kitten/components"
import { View } from "react-native"

interface HeaderProps {
    titleComponent: React.ReactChild
}

export const Header = ({ titleComponent }: HeaderProps) => {
    return <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, margin: 20, justifyContent: 'center'  }}>
            <Text category="h4" style={{fontWeight: "bold"}}>{titleComponent}</Text>
        </View>
    </View>
}