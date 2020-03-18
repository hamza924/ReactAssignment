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

 /* componentDidMount(){
  this._loadState().done();
}

_loadState = async () =>{

 var value = await AsyncStorage.getItem('token');
 if(value !== null){

   this.setState({token:value});
   
 }
}

*/


/*
Method used to post chitt using the token from when the 
user has logged in
 */
handlepress = async () =>{

  //var val = await AsyncStorage.getItem('token');

  let val = await AsyncStorage.getItem('token');
  let data = JSON.parse(val);
  //alert(data.token +' ' + data.id);

  //var t = await AsyncStorage.getItem('token');
  //var data = JSON.parse(t);
  //var d  = data.token;

  //alert(d);


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




// if(res.status === 200){

 
 // }
 // else{
 //   alert(res);
 // }

 //alert(res);



 
})
.catch((error) => {
alert('Invalid email/Password');
});

}



_handlepress_Logout = async () =>{

  //var val = await AsyncStorage.getItem('token');

  let val = await AsyncStorage.getItem('token');
  let data = JSON.parse(val);
  //alert(data.token +' ' + data.id);

  //var t = await AsyncStorage.getItem('token');
  //var data = JSON.parse(t);
  //var d  = data.token;

  //alert(d);


  fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
    method: 'POST',
    headers: {
   
    'X-Authorization': data.token,

   },
   
})
.then((response) => {




      var ok = response.ok;
      if(ok){
           alert('200');
           this.deletetoken(data.token);
          this.props.navigation.navigate('Home');
      return response.text();
      }
      else{

  alert('ERORR2');
  }

})


.then((res) => {




// if(res.status === 200){

 
 // }
 // else{
 //   alert(res);
 // }

 //alert(res);



 
})
.catch((error) => {
alert('Invalid email/Password');
});

}

 deletetoken = async(val) =>{

  try {
    await AsyncStorage.removeItem(key);
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