

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
  

} from 'react-native';





export default class App extends React.Component{

  constructor(props){
    super(props);

    this.state=
    {
        isloading:true,
        chits:[],
        


    }

    
}

/*
  Componet did mount function used to display
  the main get chitts end point. This function runs right 
  at the start once the app is loaded
*/

async componentDidMount(){

 

     
     return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
     .then((response) => response.json())
     .then((responseJson) =>{


          /*
          Use the response to set the state of is loading
          so we are able to render the result which is in json

           */
         this.setState({
             isloading:false,
             chits:responseJson,
            
            
         })
     })

     .catch((error) =>{
         alert(error);

     });
 }




  render(){

    if(this.state.isloading){
      return(
      <View style = {styles.container}>
        <ActivityIndicator size="large"/>
      </View>
      )
    }

    else{

      /*
       Method used to receive and output every chit from the get
       request
       */
      let chits = this.state.chits.map((val,key) =>{
        return <View key ={key} style = {styles.item}>
          <Text style = {styles.text}>Given name: {val.user.given_name}</Text>
          <Text style = {styles.text}>Chitt: {val.chit_content}</Text>
          <Text style = {styles.text}> User ID: {val.user.user_id}</Text>
          
        </View>
  
      });

      



    return(

      <View style = {styles.container}>
        <ScrollView>
          <Text style = {styles.textHeading}>Chittr App</Text>
          {chits}
        </ScrollView>

        <TouchableOpacity
          style={styles.customBtnBG}
          onPress={() => this.props.navigation.navigate('login')}  >
          <Text style={styles.customBtnText}> Login</Text>
        </TouchableOpacity> 

        <TouchableOpacity
          style={styles.customBtnBG}
          onPress={() => this.props.navigation.navigate('signup')}  >
          <Text style={styles.customBtnText}>SignUp </Text>
        </TouchableOpacity> 
      </View>
    )

    }
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
        textAlign:"center",
      },
  
    
      customBtnBG: {
      backgroundColor: "#007aff",
      marginTop:30,
      marginBottom:15,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 50,
      alignSelf: 'stretch',
      // paddingLeft:20,
      // paddingRight:20,
       marginLeft:50,
       marginRight:50,
      },

      text:{
          fontSize:20,
          fontWeight:'bold',
      },
      item:{

        flex:1,
        alignSelf:'stretch',
        margin:50,
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
    textHeading:{
      fontSize:30,
      fontWeight:'bold',
      textAlign:"left",
      marginTop:20,
      marginLeft:50,
  },
  });