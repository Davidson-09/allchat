import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


const GistCard = ({chat}) => {

	const color = JSON.parse(chat.data.colorId)

  return (
	  <View style={styles.container}>
		<Text style={styles.message}>{chat.data.message}</Text>
		<View style={{
			 backgroundColor: color,
			 height: 10,
			 width: 10,
			 borderRadius: 5,
			 marginTop: 10,
			 marginRight: 10
		}}></View>
	  </View>
  );
};

const styles = StyleSheet.create({
  container: {
	  width: '100%',
	  display: 'flex',
	  flexDirection: 'row',
	  backgroundColor: '#fff',
	  paddingLeft: 20,
	  minHeight: 70,
	  shadowColor: 'blue',
	  shadowOffset: {width: 1, height: 1},
	  shadowColor: 'black',
	  shadowOpacity: 0.3,
	  marginVertical: 5,
  },
  message: {
	  marginTop: 10,
	  marginBottom: 10,
	  flex: 1,
  },
});

export default GistCard;