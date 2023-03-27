import React, {useState} from 'react';
import './App.css';
import NotificationContext from "./context";
import MainPage from "./pages";
import Notification from "./ui/Notification";
import styled from "styled-components";


const Container = styled.div`
  position: relative;
  width: 100vw;
	overflow-x: hidden;
`

function App() {

	const [shouldDisplayNotification, setShouldDisplayNotification] = useState<boolean>(false);
	const [notificationTitle, setNotificationTitle] = useState<string>('')
	const [notificationSubtitle, setNotificationSubtitle] = useState<string>('')
	const [notificationType, setNotificationType]  = useState<'error' | 'default'>('default')

	const displayNotification = (type: 'error' | 'default', title: string, subtitle: string) => {
		setNotificationTitle(title)
		setNotificationSubtitle(subtitle)
		setShouldDisplayNotification(true);
		setNotificationType(type)

		setTimeout(() => {
			setShouldDisplayNotification(false);
		}, 2500);
	};

	return (
		<NotificationContext.Provider value={{displayNotification}}>
			<Container>
			<Notification
				type={notificationType}
				shouldDisplay={shouldDisplayNotification}
				title={notificationTitle}
				subtitle={notificationSubtitle}
			/>
			<MainPage/>
			</Container>
		</NotificationContext.Provider>
	);
}

export default App;
