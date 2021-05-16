import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@ui-kitten/components";
import React from "react";
import { QuizScreen } from "./Quiz/QuizScreen";
import { SettingsScreen } from "./Settings/SettingsScreen";
import { ResultsScreen } from "./Stats/ResultsScreen";
import { StatsScreen } from "./Stats/StatsScreen";
import { SubjectStats } from "./Stats/SubjectStats";


export type TabNavigatorParamList = {
    Quiz: undefined,
    Stats: undefined,
    Settings: undefined
}

const TabBar = createBottomTabNavigator<TabNavigatorParamList>()

const iconFunctionCreator = (name: string) => ({color, size}: {color: string, size: number}) => <Icon name={name} fill={color} style={{width: size, height: size}} />

export const TabScreen = () => <TabBar.Navigator initialRouteName="Quiz">
    <TabBar.Screen name="Stats" component={StatsScreen} options={{title: "Stats", tabBarIcon: iconFunctionCreator("trending-up-outline")}} />
    <TabBar.Screen name="Quiz" component={QuizScreen} options={{title: "Home", tabBarIcon: iconFunctionCreator("home-outline")}} />
    <TabBar.Screen name="Settings" component={SettingsScreen} options={{title: "Settings", tabBarIcon: iconFunctionCreator("settings-2-outline")}} />
</TabBar.Navigator>