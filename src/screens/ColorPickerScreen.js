

 import React, { useState } from 'react';
 import {
   StyleSheet,
   Text,
   TouchableHighlight,
   View,
 } from 'react-native';
 import { ColorPicker, fromHsv } from 'react-native-color-picker'
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { useHistory } from 'react-router';
 

 
 const ColorPickerScreen= () => {

	const history = useHistory();
	const [colorId, setColorId] = useState('white');

	const setup =async (colorId)=>{
		// store color id
		try {
			await AsyncStorage.setItem('color_id', JSON.stringify(colorId));
			history.push('/');
		} catch(e){
		}
	}
 
   return (
	   <View style={{width: '100%', height: '100%', backgroundColor: 'black', display: 'flex', justifyContent: 'center'}}>
		   <Text style={{color: 'white', fontWeight: 'bold', marginVertical: 10, marginHorizontal: 20, fontSize: 30}}>
			   To get started pick a color</Text>
		   <ColorPicker
			onColorChange={color=> setColorId(fromHsv(color))}
			hideSliders
   			style={{flex: 1}}
  			/>
			  <TouchableHighlight style={{
				  justifyContent: 'center',
				  backgroundColor: colorId,
				  padding: 10,
				  borderRadius: 3,
				  width: '50%',
				  marginBottom: 10,
				  alignSelf: 'center'
			  }}
			  onPress={()=>{setup(colorId)}}>
				  <Text style={{color: 'black', textAlign:'center', fontWeight: 'bold'}}>Done</Text>
			  </TouchableHighlight>
	   </View>
   );
 };
 
 const styles = StyleSheet.create({
 });
 
 export default ColorPickerScreen;