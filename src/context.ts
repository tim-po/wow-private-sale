import {createContext} from "react";

export const PopupContext = createContext<any>({})

export const NotificationContext = createContext<{
	displayNotification: (type: 'error' | 'default', title: string, subtitle: string) => void
}>({
	displayNotification: (title, subtitle, type) => {},
});

export default NotificationContext;
