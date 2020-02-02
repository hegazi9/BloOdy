import React , {Component}from 'react';
import { StyleSheet , View , Text , Image  , TextInput , ToastAndroid , Alert 
    , TouchableOpacity, Modal } from 'react-native';

import firebase from './config';

export default class Login extends Component 
{
    
    constructor(props)
    {
        super(props);
        this.state = {  email : '' , password : ''  ,  selected: 1  };
    }
    static navigationOptions = {header: null}

    OnloginPress()
    {
        if (this.validation_check())
        {
            
                firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
                .then(()=>{
                    
                        ToastAndroid.showWithGravityAndOffset(
                        ' تم تسجيل الدخول بنجاح ',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                    this.props.navigation.navigate('Home');
               //     console.warn('user'+this.state.email);
                    
                }).catch((e)=>{
                    ToastAndroid.showWithGravityAndOffset(
                        'توجد مشكلة في تسجيل الدخول ',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                        );

                });
                    
        }
    }
    validation_check =()=>
    {
        const experssion = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { email , password } = this.state ;
        if(email == "")
        {   ToastAndroid.showWithGravityAndOffset(
            'Em@il is Required',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
            );

            return false ;
        }
        else if (experssion.test(String(email).toLocaleLowerCase()) === false)
        {
            ToastAndroid.showWithGravityAndOffset(
                'Em@il isnot Correct',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
            return false;
        }
        else if (password == "")
        {
            
            ToastAndroid.showWithGravityAndOffset(
                'PassWord is Required',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
                return false ;

        }
        else if (password.length < 6 )
        {
            ToastAndroid.showWithGravityAndOffset(
                'PassWord must be at least 6 characters',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
    
        return false ;

        }

        return true ;

    }


render() {

    return (
   

    <View style = { styles.view }>
    
        <Image source = {require('./img/logo.png')} style = {{  marginLeft : '15%' , marginTop : '5%' ,
            width : 250 , height : 200 }}/>

        <View style = {{ marginTop : '5%'}}>

        
        <TextInput style={ styles.input}
          placeholder="الايـمـيـل" placeholderTextColor = '#424949'
          onChangeText = {(value)=> this.setState({email : value})}
          value = {this.state.email}
          keyboardType = "email-address"

          />
            
       
        <TextInput style={ styles.input}
          placeholder="الرقم السرى" placeholderTextColor = '#424949'
          onChangeText = {(value)=> this.setState({password : value})}
          value = {this.state.password}  
          secureTextEntry = {true}
          />

        <TouchableOpacity style = {styles.button}
          onPress = {this.OnloginPress.bind(this)}
        >
           <Text style = { styles.txt}> تـسجيــل الدخــول </Text>
            </TouchableOpacity>


            </View> 
                 </View>
    
    );
}
}


const styles = StyleSheet.create(
    {
        view :
        {
            backgroundColor : '#17202A' , flex :  1 

        },
        input : 
        {
            borderWidth : .5  , padding : 10 , borderColor : '#AAB7B8' 
          , borderRadius : 20 , marginTop : 15 , marginLeft : '5%' , marginRight : '5%' 
          , textAlign : 'center' , color : '#ECF0F1' , fontSize : 15 
          
        },
        button :
        {
            marginTop : '15%' , height : '15%' , width : '90%' ,  borderRadius : 15 , marginLeft : '5%' ,
            justifyContent : 'center' , backgroundColor : '#2980B9' 
        } , 

        buttonline :
        {
            marginTop : '2%' , height : '10%' , width : '50%' ,  justifyContent : 'center' , marginLeft : '25%'

        }, 
        txt : 
        {
            alignSelf : "center" , color : '#ECF0F1' , fontSize : 18  , paddingBottom : '5%' 
            
          }
    
    });
    
