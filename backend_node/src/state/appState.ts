let currentTitle = "CCE Chat";

export const getCurrentTitle = (): string => currentTitle;

export const setCurrentTitle = (newTitle: string): void => {
    currentTitle = newTitle;
};