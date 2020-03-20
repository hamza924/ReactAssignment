

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
  TextInput,
  ActivityIndicator,
} from 'react-native';




export default class App extends React.Component{
    constructor(props){
        super(props);

        /*
        All the state variable initialsed for using later
         */
    
        this.state=
        {
            search_name:'',
            user_id:'',
            result_name:'',
            result_email:'',
            result_family_name:'',
            isloading:true,
            is:false,
            result:null,
            isloading2:false,
            user_follower_result:[],
            user_following_result:[],

            fol:'',
            following:'',
            chits:[],
            name:'',

    
    
        }
    
        
    }

    /*
    Method used to search for a user from the 
    text input that the user inputs
     */

    _handlePressSearch = async () =>{

        let name = this.state.search_name;

        /*
        Running fetch api call to search for user
        getting respose as json and stroring the response 
        inside the result state variable
         */
        fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+name)
        .then((response) => response.json())
        .then((responseJson) =>{

            this.setState({
                isloading:false,
                result:responseJson,
            })
        })

        .catch((error) =>{
            alert(error);

        });
    }

    /*
    Method used to allow the user to follow a user once they have 
    searched by inputting search name into text input
    */

    _handlePressFollow = async (value)=>{
      /*
        Getting the token text string from async and storing
        it in a let variable 
        also parsing the text string as json to use the token value
        in the header
       */
      let tokenValue = await AsyncStorage.getItem('token');
      let data = JSON.parse(tokenValue);

      fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+value+'/follow',{

        method: 'POST',

        headers: {
           'X-Authorization': data.token,
       
          },

      })
        .then((response) => {

          /*
          Checking to see if the response was ok 
          if ok alert user and if not show other message
           */

          var ok = response.ok;

          if(ok){
            alert('Success');
            return response.text();
          }

          else{
            alert('Seems like you are already following them');
          }


        })
        .then((responseJson) =>{
            
        })

        .catch((error) =>{
            alert(error);

        });



    }

    /*
    Method used to allow users to unfollow a user
    once they have searched for a user
     */

    _handlePressUnfollow = async (value)=>{

      
      /*
        Getting the token text string from async and storing
        it in a let variable 
        also parsing the text string as json to use the token value
        in the header
       */
      let tokenValue = await AsyncStorage.getItem('token');
      let data = JSON.parse(tokenValue);

      fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+value+'/follow',{

        method: 'DELETE',

        headers: {
           'X-Authorization': data.token,
       
          },

      })
        .then((response) => {

          var ok = response.ok;

          if(ok){
            alert('Success');
            return response.text();
          }

          else{
            alert('Something went wrong');
          }


        })
        .then((responseJson) =>{
            
        })

        .catch((error) =>{
            alert(error);

        });



    }

    /*
    Method used to allow users to see who is following 
    the searched user
     */

    _handlePressFollowers = async (value,name)=>{
      /*
        Getting the token text string from async and storing
        it in a let variable 
        also parsing the text string as json to use the token value
        in the header
       */
      

      let tokenValue = await AsyncStorage.getItem('token');
      let data = JSON.parse(tokenValue);

      fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+value+'/followers',{

        method: 'GET',

        headers: {
           'X-Authorization': data.token,
       
          },

      })
        .then((response) => {

          /*
          Checking to see if the response is ok
          if ok alert user and return response as json
           */

          var ok = response.ok;

          if(ok){
            alert('Success');
            return response.json();
          }

          else{
            alert('Something went wrong');
          }


        })
        .then((responseJson) =>{

          /*
          Use the response to set the state of is loading
          so we are able to render the result which is in json

           */

            this.setState({


              isloading:true,
              user_follower_result:responseJson,
              fol:name
             

            })

            
        })

        .catch((error) =>{
            alert(error);

        });



    }

    /*
    Method used to see who the searched user is following
     */

    _handlePressFollowing = async (value,name)=>{

      /*
        Getting the token text string from async and storing
        it in a let variable 
        also parsing the text string as json to use the token value
        in the header
       */

      let tokenValue = await AsyncStorage.getItem('token');
      let data = JSON.parse(tokenValue);

      fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+value+'/following',{

        method: 'GET',

        headers: {
           'X-Authorization': data.token,
       
          },

      })
        .then((response) => {
           /*
          Checking to see if the response is ok
          if ok alert user and return response as json
           */

          var ok = response.ok;

          if(ok){
            alert('Success');
            return response.json();
          }

          else{
            alert('Something went wrong');
          }


        })
        .then((responseJson) =>{

          /*
          Use the response to set the state of is loading
          so we are able to render the result which is in json

           */

            this.setState({


              isloading:true,
              user_following_result:responseJson,
              following:name
             

            })



            
        })

        .catch((error) =>{
            alert(error);

        });



    }

    /*
    Method used to show all the chits about the searched user
     */

    _handlePressChitt = async(val,uname) =>{

      fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+val)
        .then((response) => response.json())
        .then((responseJson) =>{

            this.setState({
                isloading:true,
                chits:responseJson.recent_chits,
                name:uname
            })
        })

        .catch((error) =>{
            alert(error);

        });


    }
    
    


  render(){

    let name = this.state.search_name;

    if(this.state.isloading){

      /*
      Each variable used to map each user and display them 
      into the state mapping becasue response is in 
      json objects
       */
       let followers = this.state.user_follower_result.map((val,key) =>{
        
        return(
      
        <View key = {key} style = {styles.item}>
          
          <Text style = {styles.text}>{this.state.fol} is followed by </Text>
          
          <Text style = {styles.text}>Username:{val.given_name}</Text>
          <Text style = {styles.text}>User Id:{val.user_id}</Text>
        </View>
        
        
        )
          

      });

      /*
      Let variable called following will show to the user
      who the person is following when they click on the view 
      following button
      it will only be displayed when the state is set to loading
       */
      let following = this.state.user_following_result.map((val,key) =>{
        
        return(
        <View key = {key} style = {styles.item}>
          
          <Text style = {styles.text}>{this.state.following} is following </Text>
          
          <Text style = {styles.text}>Username:{val.given_name}</Text>
          <Text style = {styles.text}>User Id:{val.user_id}</Text>

        </View>
        
        
        )
          

      });


      let chits = this.state.chits.map((val,key) =>{
        return <View key ={key} style = {styles.item}>
          <Text style = {styles.text}>{this.state.name} chitted</Text>
          <Text style = {styles.text}>{val.chit_content}</Text>
        </View>
  
      });

        /*
        Original state will be displayed once the user
        goes to the search for user page
         */

        return(
        <View style = {styles.container}>
            <Text style = {styles.text}>Search for a user </Text>
            <TextInput
            placeholder="e.g:John doe"
            onChangeText = {(val) => this.setState({search_name:val})}
            style={styles.input}/>

            <TouchableOpacity
            style={styles.customBtnBG}
            onPress = {this._handlePressSearch.bind(this)}  >
            <Text style={styles.customBtnText}>Search for user</Text>
            </TouchableOpacity> 

               
               <ScrollView> 
                 
                  {followers}
                  {following}
                  {chits}
                </ScrollView>
            </View>

        )

        

        


    }else  {

    /*
    Mapping each user who matches the search criteria
    and adding all the following functinailty next to e
    ach user
     */
    let chits = this.state.result.map((val,key) =>{
        
        return <View key ={key} style = {styles.item}>
          <Text style = {styles.text}>Given Name:{val.given_name}</Text>
          <Text style = {styles.text}>User Id:{val.user_id}</Text>

          <TouchableOpacity
            style={styles.customBtnBG}
            onPress = {this._handlePressFollow.bind(this,val.user_id)}  >
            <Text style={styles.customBtnText}>Follow</Text>
          </TouchableOpacity> 

          <TouchableOpacity
            style={styles.customBtnBG}
            onPress = {this._handlePressUnfollow.bind(this,val.user_id)}  >
            <Text style={styles.customBtnText}>UnFollow</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.customBtnBG}
            onPress = {this._handlePressFollowers.bind(this,val.user_id,val.given_name)}  >
          
            <Text style={styles.customBtnText}>View Followers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.customBtnBG}
            onPress = {this._handlePressFollowing.bind(this,val.user_id,val.given_name)}  >
            <Text style={styles.customBtnText}>View Following</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.customBtnBG}
            onPress = {this._handlePressChitt.bind(this,val.user_id,val.given_name)}  >
            <Text style={styles.customBtnText}>View Chitts</Text>
          </TouchableOpacity>
          
        </View>

        

        
  
      });
    return(
      /**
       Displaying each user inside a scrollview
       */
      <ScrollView>
        <View style = {styles.container}>
          {chits}
        </View>
      </ScrollView>
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
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 50,
      borderRadius: 50,
      alignSelf: 'stretch',
      // paddingLeft:20,
      // paddingRight:20,
       marginLeft:50,
       marginRight:50,
       marginBottom:30,
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
      item:{

        flex:1,
        alignSelf:'stretch',
        margin:30,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:3,
        borderBottomColor:'#007aff',
        fontSize:20,
        marginBottom:10,
      },
      
  });