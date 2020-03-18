

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  TextInput,
  

} from 'react-native';




export default class App extends React.Component{

  constructor(props){
    super(props);

    this.state=
    {
        isloading:true,
        chits:[],
        chit_content:'',
        


    }

    
}

handlepress = async () =>{

    //var val = await AsyncStorage.getItem('token');
  
    let val = await AsyncStorage.getItem('token');
    let data = JSON.parse(val);
   
  
  
    fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
      method: 'POST',
      headers: {
     'Accept': 'text/plain , application/json',
      'Content-Type': 'application/json',
      'X-Authorization': data.token,
  
     },
     body: JSON.stringify({
       chit_id:0,
       timestamp:0,
      chit_content: this.state.chit_content,
    
    }),
  })
  .then((response) => {
  
  
  
  
        var ok = response.ok;
        if(ok){
             alert('200');
            this.props.navigation.navigate('GetUserChit');
        return response.text();
        }
        else{
  
    alert('ERORR2');
    }
  
  })
  
  
  .then((res) => {

   
  })
  .catch((error) => {
  alert('Invalid email/Password');
  });
  
  }






  render(){

    

      



    return(

      <View style = {styles.container}>
        
        <Text style = {styles.text}>Upload your own chitt below!!!!!</Text>

        <TextInput

            placeholder="Chitt"

            onChangeText = {(val) => this.setState({chit_content:val})}

            style={styles.input}
            multiline={true}
            underlineColorAndroid='transparent'/>

      
        <TouchableOpacity
          style={styles.customBtnBG}
          onPress = {this.handlepress.bind(this)}  >
          <Text style={styles.customBtnText}>Send</Text>
        </TouchableOpacity>


      </View>
    )

    }
  }




const styles = StyleSheet.create({
    container: {
      flex:1,
    justifyContent: "center",
      alignItems: "center"
    },
  
   
      customBtnText: {
          fontSize: 24,
          fontWeight: '400',
          color: "#fff",
      },
  
    
      customBtnBG: {
      backgroundColor: "#007aff",
      marginTop:30,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 50
      },

      text:{
          fontSize:24,
          fontWeight:'bold',
      },
      item:{

        flex:1,
        alignSelf:'stretch',
        margin:30,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:3,
        borderBottomColor:'#007aff',
        fontSize:20,
      },
      headingtext:{
        fontSize:21,
        fontWeight:'bold',
    },
    input: {
        height: 200,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 3,
        alignSelf: 'stretch',
        borderColor: '#007aff',
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        
      },
      
  });