
 import React, { useEffect, useState } from 'react';
 import {
   StyleSheet,
   View,
   TextInput,
   TouchableHighlight,
   PermissionsAndroid,
   ToastAndroid
 } from 'react-native';

 import { Icon } from 'react-native-elements';
 import { primary, primaryLight } from '../assets/color';
 import Geolocation from 'react-native-geolocation-service';
 import firestore from '@react-native-firebase/firestore';
 
 
 const ChatInput = ({colorId}) => {

	const [message, setMessage] = useState('');
	const [permitted, setPermitted] = useState(false);
	const [location, setLocation] = useState({});
	const db = firestore();

	useEffect(()=>{
		requestPermission();
		getPosition();
		locationWatch();
	},[permitted])

	const send = async ()=>{
		// create chat object
		if (message.trim().length > 0 ){
			let d = new Date();
			let time = d.getTime();
			let chat = {message, location, time, colorId};
			// send to firestore
			setMessage('');
			db.collection('chats').add(chat).then(()=>{
				ToastAndroid.show('sent!', ToastAndroid.SHORT);
			})
			
		} else{
			ToastAndroid.show('cannot send empty chat', ToastAndroid.SHORT);
		}
	}

	const requestPermission = async ()=>{
		try {
			const granted = await PermissionsAndroid.request(
			  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			  {
				title: "allchat location Permission",
				message:
				  "allchat needs accesss to your location ",
				buttonNeutral: "Ask Me Later",
				buttonNegative: "Cancel",
				buttonPositive: "OK"
			  }
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			  setPermitted(true);
			} else {
			  ToastAndroid.show('you need to set location permission', ToastAndroid.SHORT);
			}
		  } catch (err) {
			console.warn(err);
		  }
	}

	const locationWatch = ()=>{
		if (permitted){
			Geolocation.watchPosition((position)=>{
				let nl = {lat: position.coords.latitude, long: position.coords.longitude, alt: position.coords.altitude}
				setLocation(nl);
			},(error)=>{
				console.log(error);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 } )
		}
	}

	const getPosition = ()=>{
		if (permitted) {
			Geolocation.getCurrentPosition(
				(position) => {
				  let nl = {lat: position.coords.latitude, long: position.coords.longitude, alt: position.coords.altitude}
				  setLocation(nl);
				},
				(error) => {
				  // See error code charts below.
				  console.log(error.code, error.message);
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			);
		  }
	}
 
	return (
		<View style={styles.container}>
		  <TextInput style={styles.input} placeholder='type a message' value={message} onChangeText={setMessage}/>
		  <TouchableHighlight onPress={send}>
			  <Icon name='send' type='material' color={primaryLight} style={styles.icon}/>
		  </TouchableHighlight>
		</View>
	);
 };
 
 const styles = StyleSheet.create({
	container: {
		backgroundColor: primary,
		width: '100%',
		display: 'flex',
		paddingVertical: 15,
		paddingHorizontal: 20,
		flexDirection: 'row',
	},
	input: {
		flex: 1,
		height: 20,
		height: 40,
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: primaryLight,
	},
	icon: {
	   marginHorizontal: 10,
	   marginTop: 8
	}
  });
 
 export default ChatInput;
 