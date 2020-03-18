

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

    async componentDidMount(){

        let val = await AsyncStorage.getItem('token');
         let data = JSON.parse(val);
   
           
           return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+data.id)
           .then((response) => response.json())
           .then((responseJson) =>{
   
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

       _handlepress_Update = async () =>{

        let v = await AsyncStorage.getItem('token');
      let data = JSON.parse(v);

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
            alert('Seems like you are already following them' +response);
          }


        })
        .then((responseJson) =>{

            
         
            //alert(responseJson);

         /*   this.setState({
                user_id:responseJson.user_id,
                result_name:responseJson.given_name,
                result_email:responseJson.email,
                result_family_name:responseJson.family_name,
            })
            */
            //alert(val.user_id);

            
        })

        .catch((error) =>{
            alert(error);

        });

       }



  render(){

    if(this.state.isloading){
        return(
            <View style = {styles.container}>
                <ActivityIndicator/>
            </View>
        )
    }else{

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
  
    /* Here, style the text of your button */
      customBtnText: {
          fontSize: 24,
          fontWeight: '400',
          color: "#fff",
          textAlign:"center",
      },
  
    /* Here, style the background of your button */
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