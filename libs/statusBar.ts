import React from "react";

interface IStackScreenStatusBarOptionsProps {
    title?: string;
    headerTintColor?: string;
    headerShadowVisible?: boolean;
    headerBackgroundColor?: string;
    headerTtitleDisplay?: string;
    headerRight?: React.ReactNode
}


export const StackScreenStatusBarOptions = ({
    title = '',
    headerTintColor = '#fff',
    headerShadowVisible = false,
    headerBackgroundColor = '#10b981',
    headerTtitleDisplay = 'none',
    headerRight = () => { },
}): IStackScreenStatusBarOptionsProps => {
    return {
        title,
        headerTintColor,
        headerShadowVisible,
        headerStyle: {
            backgroundColor: headerBackgroundColor,
        },
        headerTitleStyle: {
            display: headerTtitleDisplay,
        },
        headerRight,
    }
}