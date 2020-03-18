import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';




export default class App extends React.Component{

    constructor(props){
        super(props);
  
        this.state=
        {
             
           
            given_name:'',
            family_name:'',
            email:'',
            password:'',
            token:''
  
  
        }
  
        
   }

   async onLogin(){
              



    try {
      let response = await fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
         method: 'POST',
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
                                
             given_name:this.state.given_name,
              family_name:this.state.family_name,
              email:this.state.email,
             password:this.state.password


                              
                })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
         
         
          

          alert('YOU HAVE SIGNED UP ' +" " + res);

          this.props.navigation.navigate('login');
          //On success we will store the access_token in the AsyncStorage
          
      } else {
          //Handle error
          alert('ON NO SOMETHING WENT WRONG' + res);
          let error = res;
          throw error;

          


      }
    } catch(error) {
        
    }
  }

  render(){
    return(

      <View style = {styles.container}>
        <Text style = {styles.text}>Sign up for An Account</Text>

        

        

        <TextInput

        placeholder="GIVEN NAME"

        onChangeText = {(val) => this.setState({given_name:val})}

        style={styles.input}/>

         
        <TextInput

            placeholder="FAMILY NAME"

            onChangeText = {(val) => this.setState({family_name:val})}

            style={styles.input}/>

            

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
          onPress = {this.onLogin.bind(this)}  >
          <Text style={styles.customBtnText}>Sign Up</Text>
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