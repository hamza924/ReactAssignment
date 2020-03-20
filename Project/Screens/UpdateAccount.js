

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
            givenname:'',
            familyname:'',
            email_:'',
            password:'',

            edited_give_name:'',
            edited_family_name:'',
            edited_email:'',
    
    
        }
    
        
    }

    /*
     Method used to load data before page renders 
     and display inside text input fields 
     so user can easily edit changes
     */
    async componentDidMount(){

        /*
        Getting the token text string from async and storing
        it in a let variable 
        also parsing the text string as json to use the token value
        in the url to get data about the user
       */

        let tokenVal = await AsyncStorage.getItem('token');
        let data = JSON.parse(tokenVal);
   
           
           return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+data.id)
           .then((response) => response.json())
           .then((responseJson) =>{

              /*
              Setting the state so we are able to render
              the data from json
               */
   
               this.setState({
                   isloading:false,
                   givenname:responseJson.given_name,
                   familyname:responseJson.family_name,
                   email_:responseJson.email,
               })
           })
   
           .catch((error) =>{
               alert(error);
   
           });
       }


       /*
       Handle update method will run when the user click
       the update button
       */

     _handlepress_Update = async () =>{

        /*
        Getting the token text string from async and storing
        it in a let variable 
        also parsing the text string as json to use the token value
        in the header
       */

        let tokenVal = await AsyncStorage.getItem('token');
        let data = JSON.parse(tokenVal);

        fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+data.id,{

        method: 'PATCH',

        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
           'X-Authorization': data.token,
       
          },

          body: JSON.stringify({
           given_name: this.state.givenname,
           family_name: this.state.familyname,
           email: this.state.email_,
           password: this.state.password,
           
            }),

      })
        .then((response) => {

          var ok = response.ok;

          if(ok){
            alert('Account details have been updated');
            this.props.navigation.navigate('loggedin');
            return response.text();
          }

          else{
            alert('Somethin went wrong' +response);
          }


        })
        .then((responseJson) =>{
        })

        .catch((error) =>{
            alert(error);

        });

       }



  render(){
    /*
    Shows loading wheel to indicate something is happeining

     */
    if(this.state.isloading){
        return(
            <View style = {styles.container}>
                <ActivityIndicator/>
            </View>
        )

    }
    /*
    Displays the text inputs
    once the loading has happened
     */
    else{

    return(
        <View style = {styles.container}>

            <Text style = {styles.text}>Update Your Account Details</Text>

            <TextInput
            defaultValue={this.state.givenname}
            onChangeText = {(val) => this.setState({givenname:val})}
            style={styles.input}/>

            <TextInput
            defaultValue={this.state.familyname}
            onChangeText = {(val) => this.setState({familyname:val})}
            style={styles.input}/>

            <TextInput
            defaultValue={this.state.email_}
            onChangeText = {(val) => this.setState({email_:val})}
            style={styles.input}/>

            <Text style = {styles.textHeading}>Password will remain the same if not changed</Text>
            <TextInput
            placeholder="Password"
            onChangeText = {(val) => this.setState({password:val})}
            style={styles.input}
            secureTextEntry = {true}/>

          


          <TouchableOpacity
            style={styles.customBtnBG}
            onPress = {this._handlepress_Update.bind(this)}  >
            <Text style={styles.customBtnText}>Update</Text>
          </TouchableOpacity>


        </View>

      
    )

    }
  }


}

const styles = StyleSheet.create({
    container: {
      //flex:1,
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
          fontSize:30,
          fontWeight:'bold',
          marginTop:20,
          
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

      textHeading:{
        fontSize:24,
        fontWeight:'bold',
        marginTop:20,
        marginRight:20,
        marginLeft:20,
        textAlign:"center",
    },
      
  });