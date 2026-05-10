import React, {createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light"
    );
    const [fontSize, setFontSize] = useState(
        () => localStorage.getItem("fontSize") || "medium"
    );

    // Load saved Settings 
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const savedFontSize = localStorage.getItem("fontSize");

        if(savedTheme) setTheme(savedTheme);
        if(savedFontSize) setFontSize(savedFontSize);
    }, []);

    //Save Settings 
    useEffect(() => {
        localStorage.setItem("theme", theme);
        localStorage.setItem("fontSize", fontSize); 
    }, [theme, fontSize]);

    return (
        <SettingsContext.Provider 
        value={{
            theme,
            setTheme,
            fontSize,
            setFontSize
        }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

// Custom hook (clean Usage)
export function useSettings() {
    return useContext(SettingsContext);
}