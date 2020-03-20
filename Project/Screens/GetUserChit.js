

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
  ActivityIndicator,
  AsyncStorage
} from 'react-native';




export default class App extends React.Component{

  /*
  Constructor and state variables
   */

    constructor(props){
        super(props);
    
        this.state=
        {
            isloading:true,
            chits:null,
    
    
        }
    
        
    }

    /*
    Component did mount loads up all the users chits when they
    click on view my chits from the previous page this will run
    first before render has occured
     */
 async componentDidMount(){
    
      /*
        Getting the token text string from async and storing
        it in a let variable 
        also parsing the text string as json to use the token value
        in the header
       */
     let tokenVal = await AsyncStorage.getItem('token');
     let data = JSON.parse(tokenVal);

        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+data.id)
        .then((response) => response.json())
        .then((responseJson) =>{

          /*
          Use the response to set the state of is loading
          so we are able to render the result which is in json
           */

            this.setState({
                isloading:false,
                chits:responseJson.recent_chits,
            })
        })

        .catch((error) =>{
            alert(error);

        });
    }

    

   

  render(){

    if(this.state.isloading){
      return(
        <View>
          <ActivityIndicator/>
        </View>
      )
    }

    else{
      let chits = this.state.chits.map((val,key) =>{
        return <View key ={key} style = {styles.item}>
          <Text style = {styles.text}>{val.chit_content}</Text>
        </View>
  
      });

    return(

      
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style = {styles.container}>
          {chits}
        </View>

      </ScrollView>
    






    );
    
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
      },
  
   
      customBtnBG: {
      backgroundColor: "#007aff",
      marginTop:30,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 50
      },

      text:{
          fontSize:30,
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
      }
      
  });