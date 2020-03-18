

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

    constructor(props){
        super(props);
    
        this.state=
        {
            isloading:true,
            chits:null,
    
    
        }
    
        
    }

 async componentDidMount(){

     let val = await AsyncStorage.getItem('token');
      let data = JSON.parse(val);

        
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+data.id)
        .then((response) => response.json())
        .then((responseJson) =>{

            this.setState({
                isloading:false,
                chits:responseJson.recent_chits,
            })
        })

        .catch((error) =>{
            alert(error);

        });
    }

    

    _getid = async() =>{

    let val = await AsyncStorage.getItem('token');
       let data = JSON.parse(val);

       alert(data.id);

    }

   _handlepress = async() =>{

   let val = await AsyncStorage.getItem('token');
       let data = JSON.parse(val);

       let id = data.id;
        
      
  fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id, {
    method: 'GET',
        })
        .then((response) => {




      var ok = response.ok;
      if(ok){
           alert('200');
         
      return response.json();
      }
      else{

        alert('ERORR2');
        }

        })


        .then((res) => {

            this.setState({
              isloading:false,
              recent_chit:res.family_name,
                
            })
           





 
    })
    .catch((error) => {
    alert('Invalid email/Password');
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
    





/*
      <View style = {styles.container}>
      <Text style = {styles.text}>Viewing My Chitts</Text>

        
        <TouchableOpacity
          style={styles.customBtnBG}
          onPress = {this._handlepress}  >
          <Text style={styles.customBtnText}>Retrieve</Text>
        </TouchableOpacity>

        


         


      </View>
      */
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
  
    /* Here, style the text of your button */
      customBtnText: {
          fontSize: 24,
          fontWeight: '400',
          color: "#fff",
      },
  
    /* Here, style the background of your button */
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