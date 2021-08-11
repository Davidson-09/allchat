
 import React, { useEffect, useState } from 'react';
 import {
	 FlatList,
   StyleSheet,
   View, Text,
 } from 'react-native';

import GistCard from  '../components/GistCard'
import { background, primary, secondary } from '../assets/color';
import ChatInput from '../components/ChatInput';
import firestore from '@react-native-firebase/firestore';
import { useHistory } from 'react-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
 
 const Home = () => {

	const [colorId, setColorId] = useState();
	const [chats, setChats] = useState([]);
	const history = useHistory();
	
	const db = firestore();

	 // get messages from the area
	 //load them into a list

	 useEffect(()=>{
		 // get chats from firestore
		 getColorId();
	 }, [])

	 
	 const getColorId = async ()=>{
		try{
			const value = await AsyncStorage.getItem('color_id');
			if (value !== null){
			   setColorId(value);
			   console.log(colorId);
			   setChatListener();
			    
			} else{
				history.push('/colorpicker')
			}
			
		} catch(e){
			console.log(e)
		}
	}

	 const getChats =()=>{
		 db.collection('chats').orderBy('time').get().then((querySnapshot)=>{
			 let c = []; // temporary list of chats
			 querySnapshot.forEach((doc)=>{
				 let chat = {data: doc.data(), id: doc.id};
				 c.push(chat);
			 })
		 })
	 }

	 const setChatListener =()=>{
		db.collection('chats').orderBy('time').onSnapshot((querySnapshot)=>{
			let cl = chats; // temporary list containing chats in previous state
			let c = [];
			querySnapshot.forEach((doc)=>{
				let chat = {data: doc.data(), id: doc.id};
				c.push(chat);
			})
			setChats(cl.concat(c));
		})
	 }


	 const renderItem = ({item}) =>(
		 <GistCard chat= {item}/>
	 )
 
   return (
	   <View style={styles.container}>
		   <View style={styles.top}>
			   <Text style={{
				   fontSize: 20,
				   fontWeight: 'bold',
				   color: 'white'
			   }}>
				   allchat
			   </Text>
		   </View>
		   <FlatList data= {chats} renderItem={renderItem} keyExtractor={chat=>chat.id} style={styles.list}/>
		   <ChatInput colorId={colorId}/>
		   
	   </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
	   height: '100%',
	   width: '100%',
	   backgroundColor: background
   },
   list: {
	   paddingHorizontal: 15
   },
   top:{
	   width: '100%',
	   backgroundColor: primary,
	   paddingHorizontal: 30,
	   paddingVertical: 20
   }
 });
 
 export default Home;
 