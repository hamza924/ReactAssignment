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


 /* componentDidMount(){
     this._loadState().done();
   }

   _loadState = async () =>{

    var value = await AsyncStorage.getItem('token');
    if(value !== null){

      this.props.navigation.navigate('loggedin');
      
    }
   }

   */
   
   handlepress = async () =>{

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

//  const contentType = response.headers.get('Content-Type');
  //alert(response);
  

  
 
        var ok = response.ok;
        if(ok){
            // alert('200');
            this.props.navigation.navigate('loggedin');
        return response.text();
        }
        else{

    //alert('ERORR2');
    }
  
 })

  
  .then((res) => {




  alert('You have successfully logged in :)')
 
  const d1 = JSON.stringify(res);

   const data  = JSON.parse(res);
   AsyncStorage.setItem('token',res);
   

   

    



   
  })
.catch((error) => {
alert('Invalid email/Password');
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
          onPress = {this.handlepress.bind(this)}  >
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