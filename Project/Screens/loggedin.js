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
  TextInput
} from 'react-native';




export default class App extends React.Component{

  constructor(props){
    super(props);

    this.state=
    {
        chit_id:0,
        timestamp:0,
        chit_content:'',

       
       
        
        token:''


    }

    
}

 



/*
 Method used to logout user of application on press of the 
 button
 */

_handlepress_Logout = async () =>{

        /*
        Getting the token text string from async and storing
        it in a let variable 
        also parsing the text string as json to use the token value
        in the header
        */
  let tokenVal = await AsyncStorage.getItem('token');
  let data = JSON.parse(tokenVal);
  
      fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
         method: 'POST',
         headers: {
         'X-Authorization': data.token,
        },
   
      })
        .then((response) => {

          /*
          Check to see if response is ok if it is user 
          will be logged out and their token will be deleted from 
          asyn storage they will also be navigated to the main page
           */
            var ok = response.ok;
            if(ok){
              alert('You have successfully logged out :)');
              this.deletetoken(data.token);
              this.props.navigation.navigate('Home');
              return response.text();
          }
          else{

          alert('Something went wrong ');
        }

      })
        .then((res) => {

      })
    .catch((error) => {
    alert('Something went wrong');
    });

  }

  /*
  Method used to delete token from async stroage
  method requires a parameter passed so the method will
  work
   */

 deletetoken = async(val) =>{

  try {
    await AsyncStorage.removeItem(val);
    return true;
  }
  catch(exception) {
    return false;
}

}




  render(){
    return(

      <View style = {styles.container}>
        

      

        <TouchableOpacity
          style={styles.customBtnBG}
          onPress={() => this.props.navigation.navigate('sendChit')}  >
          <Text style={styles.customBtnText}> Upload Chitt</Text>
        </TouchableOpacity> 

        <TouchableOpacity
          style={styles.customBtnBG}
          onPress={() => this.props.navigation.navigate('GetUserChit')}  >
          <Text style={styles.customBtnText}> View my Chitts</Text>
        </TouchableOpacity> 

        <TouchableOpacity
          style={styles.customBtnBG}
          onPress={() => this.props.navigation.navigate('Search')}  >
          <Text style={styles.customBtnText}> Search for a user</Text>
        </TouchableOpacity> 

      

        <TouchableOpacity
          style={styles.customBtnBG}
          onPress = {() => this.props.navigation.navigate('UpdateAccount')}  >
          <Text style={styles.customBtnText}>Update Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customBtnBG}
          onPress = {this._handlepress_Logout.bind(this)}  >
          <Text style={styles.customBtnText}>Logout</Text>
        </TouchableOpacity>

      



         


      </View>
    )

    
  }


}

const styles = StyleSheet.create({
    container: {
      flex:1,
    justifyContent: "center",
      alignItems: "center",
      //alignSelf: 'stretch',
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
          fontSize:30,
          fontWeight:'bold',
      },

      input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        alignSelf: 'stretch',
        borderColor: '#48bbec'
      },
      
  });