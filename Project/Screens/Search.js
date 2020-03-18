

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

    _handlepress = async () =>{

        let name = this.state.search_name;

        
        fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+name)
        .then((response) => response.json())
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

            this.setState({
                isloading:false,
                result:responseJson,
            })
        })

        .catch((error) =>{
            alert(error);

        });
    }

    _handlepress1 = async (value)=>{

      //alert(val);

      let v = await AsyncStorage.getItem('token');
      let data = JSON.parse(v);

      fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+value+'/follow',{

        method: 'POST',

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
            alert('Seems like you are already following them');
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

    _handlepress2 = async (value)=>{

      //alert(val);

      let v = await AsyncStorage.getItem('token');
      let data = JSON.parse(v);

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
            alert('Seems like you are already following them');
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

    _handlepress3 = async (value,val2)=>{

      //alert(val);

      let v = await AsyncStorage.getItem('token');
      let data = JSON.parse(v);

      fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+value+'/followers',{

        method: 'GET',

        headers: {
           'X-Authorization': data.token,
       
          },

      })
        .then((response) => {

          var ok = response.ok;

          if(ok){
            alert('Success');
            return response.json();
          }

          else{
            alert('Seems like you are already following them');
          }


        })
        .then((responseJson) =>{

         // const data = JSON.parse(responseJson);

          //alert(responseJson);
            
         
            //alert(responseJson);

         /*   this.setState({
                user_id:responseJson.user_id,
                result_name:responseJson.given_name,
                result_email:responseJson.email,
                result_family_name:responseJson.family_name,
            })
            */
            //alert(val.user_id);

            this.setState({


              isloading:true,
              user_follower_result:responseJson,
              fol:val2
             

            })

            
        })

        .catch((error) =>{
            alert(error);

        });



    }

    _handlepress4 = async (value,val2)=>{

      //alert(val);

      let v = await AsyncStorage.getItem('token');
      let data = JSON.parse(v);

      fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+value+'/following',{

        method: 'GET',

        headers: {
           'X-Authorization': data.token,
       
          },

      })
        .then((response) => {

          var ok = response.ok;

          if(ok){
            alert('Success');
            return response.json();
          }

          else{
            alert('Seems like you are already following them');
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

            this.setState({


              isloading:true,
             user_following_result:responseJson,
              following:val2
             

            })



            
        })

        .catch((error) =>{
            alert(error);

        });



    }

    _handlepress5 = async(val,uname) =>{

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

       var followers = this.state.user_follower_result.map((val,key) =>{
        
       
        
        return(
        
        
        <View key = {key} style = {styles.item}>
          
        <Text style = {styles.text}>{this.state.fol} is followed by </Text>
          
          <Text style = {styles.text}>Username:{val.given_name}</Text>
          <Text style = {styles.text}>User Id:{val.user_id}</Text>

          

        </View>
        
        
        )
          

      });

      var following = this.state.user_following_result.map((val,key) =>{
        
       
        
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



        return(
            <View style = {styles.container}>
        <Text style = {styles.text}>Search for a user </Text>

        <TextInput

        placeholder="e.g:John doe"

        onChangeText = {(val) => this.setState({search_name:val})}

        style={styles.input}/>

        

   

    <TouchableOpacity
          style={styles.customBtnBG}
          onPress = {this._handlepress.bind(this)}  >
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

      
    var chits = this.state.result.map((val,key) =>{
        
        return <View key ={key} style = {styles.item}>
          <Text style = {styles.text}>Given Name:{val.given_name}</Text>
          <Text style = {styles.text}>User Id:{val.user_id}</Text>

          <TouchableOpacity
          style={styles.customBtnBG}
          onPress = {this._handlepress1.bind(this,val.user_id)}  >
          <Text style={styles.customBtnText}>Follow</Text>
        </TouchableOpacity> 

        <TouchableOpacity
          style={styles.customBtnBG}
          onPress = {this._handlepress2.bind(this,val.user_id)}  >
          <Text style={styles.customBtnText}>UnFollow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customBtnBG}
          onPress = {this._handlepress3.bind(this,val.user_id,val.given_name)}  >
         
          <Text style={styles.customBtnText}>View Followers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customBtnBG}
          onPress = {this._handlepress4.bind(this,val.user_id,val.given_name)}  >
          <Text style={styles.customBtnText}>View Following</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customBtnBG}
          onPress = {this._handlepress5.bind(this,val.user_id,val.given_name)}  >
          <Text style={styles.customBtnText}>View Chitts</Text>
        </TouchableOpacity>


            
          
        </View>

        

        
  
      });

     
      

      

     
    
    return(
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