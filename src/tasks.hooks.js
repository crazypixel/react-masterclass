import {useState, useEffect, useCallback} from 'react';
import {values} from 'lodash/fp';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
	/* Paste from firebase console */
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const useTasks = () => {
	const [state, setState] = useState([]);
	
	useEffect(() => {
		firebase.database().ref('/tasks').on('value', snapshot => {
			setState(values(snapshot.val()));
		});
		
		return () => firebase.database().ref('/tasks').off();
	}, []);
	
	const syncTasks = useCallback(data => {
		firebase.database().ref('/tasks').set(data);
	}, []);
	
	return [state, syncTasks];
};
