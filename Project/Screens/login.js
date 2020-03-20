import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';




export default class App extends React.Component{

    constructor(props){
        super(props);
  
        this.state=
        {
             
           
           
            email:'',
            password:'',
            token:''
  
  
        }
  
        
   }


   /*
    Method used to for the user to login it uses the ES6 arrow
    function which allows access to the this in the body
    part of the function
    */
   
   
   handlePressLogin = async () =>{

    fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
        method: 'POST',
        headers: {
        'Accept': 'text/plain , application/json',
        'Content-Type': 'application/json'
      },
          body: JSON.stringify({
            email: this.state.email,
            password:this.state.password,
            }),
        })
        .then((response) => {

            var ok = response.ok;
            if(ok){
                /*
                 Once the user logged in with correct details
                 they will be navigated to the logged in page 
                 the response is returned as text to set in 
                 storage to be used to later
                 */
                alert('You have successfully logged in :)');
                this.props.navigation.navigate('loggedin');
                return response.text();
            }
            else{
              
              alert('Invalid Email/Password');
              
            } 
          })
            .then((res) => {

           
        
            /*
            Setting the response in async with id as token
            */
            AsyncStorage.setItem('token',res);
          
      
          })
      .catch((error) => {
      alert('Invalid email/Password' + error);
      });

    }

  render(){
    return(

      <View style = {styles.container}>
        <Text style = {styles.text}>Login</Text>
        <TextInput
        placeholder="Email"
        onChangeText = {(val) => this.setState({email:val})}
        style={styles.input}/>

        

        <TextInput

        placeholder="PASSWORD"

        onChangeText = {(val) => this.setState({password:val})}

        style={styles.input}

        secureTextEntry={true}/>



        <TouchableOpacity
          style={styles.customBtnBG}
          onPress = {this.handlePressLogin.bind(this)}  >
          <Text style={styles.customBtnText}>Login</Text>
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
          fontSize:24,
          fontWeight:'bold',
          textAlign:'left',
      },
      input: {
        height: 50,
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
        borderRadius: 50
      },
      
  });