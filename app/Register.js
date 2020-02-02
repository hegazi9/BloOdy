import React , {Component}from 'react';
import { StyleSheet , View , Text , Image  , TextInput,  Button , ScrollView ,ToastAndroid
    , TouchableOpacity,  Alert } from 'react-native';
import ImagePiker from 'react-native-image-picker' ;
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet';
import firebase from './config';

const title = <Text style={{ color: 'red', fontSize: 18 }}>عليك اختيار فصيلة الدم ؟ </Text>
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 9 
var id = 1;
const options = [
    'Cancel',
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-'
    
  ]

 
export default class Register extends Component 
{
    
    constructor(props)
    {
        super(props);
        this.state = { username : '' , email : '' , password : '' , confirmpassword : '' ,
         address : '' , age : '' , phone : ''
        , avatar : './img/vector.png' , selected: 1 }
     
    }
    static navigationOptions = {header: null}

/*
    addavatar = () => 
    {
      ImagePiker.showImagePicker({},response => {
        if (response.didCancel)
        {
          console.warn("Really ");
        }
        else if (response.error)
        {
          console.warn(response.error);
        }
        else 
        {
          this.setState({
            avatar:response.uri
          })
        }
      })
    }
*/
    showActionSheet = () => this.actionSheet.show() 
    getActionSheetRef = ref => (this.actionSheet = ref)
    handlePress = index =>this.setState({ selected: index }) 
  
    OnloginPress()
    {
      this.props.navigation.navigate('Login');
    }

    OnRegisterPress()
    {
        if (this.validation_check())
        {
          
          firebase.database().ref("USERS").orderByChild("email").equalTo(this.state.email)
          .once("value",snapshot => {
            if (snapshot.exists()){
             
                ToastAndroid.showWithGravityAndOffset(
                'الايميل موجود بالفعل',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );




            }
            else 
            {

              
           firebase.database().ref(`USERS`).push(
            {
                email : this.state.email,
                username : this.state.username,
                password : this.state.password,
                address : this.state.address,
                phone : this.state.phone,
                age : this.state.age ,
                selected : options[this.state.selected].component || options[this.state.selected]
               
            }
          ).then(() => {
            
            firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(()=>{
                  
              ToastAndroid.showWithGravityAndOffset(
              ' تم تسجيل البيانات بنجاح ',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
          );
          ++id;
          this.props.navigation.navigate('Login');

          
      }).catch((e)=>{
          ToastAndroid.showWithGravityAndOffset(
              'الايميل موجود بالفعل',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
              );

      });
      

          }).catch((e) => 
          {
            ToastAndroid.showWithGravityAndOffset(
              'توجد مشكلة في حفظ البيانات ',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
              );
  
          })
      
      
            }
        });
      }
    }
        

    validation_check =()=>
    {
        const number = /^[0-9]*$/;
        const experssion = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { username , email  , password  , confirmpassword ,
        address , age , phone  } = this.state ;
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
     
        else if (username == "")
        {
            
            ToastAndroid.showWithGravityAndOffset(
                'Username is Required',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
                return false ;

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

        else if (password !== confirmpassword )
        {
            ToastAndroid.showWithGravityAndOffset(
                'PassWord donot Match',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
    
        return false ;

        }
        else if (address == "")
        {
            
            ToastAndroid.showWithGravityAndOffset(
                'Address is Required',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
                return false ;

        }

        else if (phone == "")
        {
            
            ToastAndroid.showWithGravityAndOffset(
                'Phone is Required',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
                return false ;

        }
        else if (phone.length < 11 && phone.length > 11)
        {
            
            ToastAndroid.showWithGravityAndOffset(
                'Phone must 11 Number',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
                return false ;

        }

        else if (age == "")
        {
            
            ToastAndroid.showWithGravityAndOffset(
                'Age is Required',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
                return false ;

        }

        else if (age.length > 2 )
        {
            
            ToastAndroid.showWithGravityAndOffset(
                'Age isnot Valid',
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
  const { selected } = this.state
  const selectedText = options[selected].component || options[selected]

    return (
       
      <ScrollView style = {styles.view}>
        
        <Image source = {require('./img/logo.png')} style = {{  marginLeft : '15%' , marginTop : '5%' ,
            width : 250 , height : 200 }}/>


        
        <View style = {{ marginTop : '0%'}}>


        <TextInput style={ styles.input}
          placeholder="الايـميل" placeholderTextColor = '#424949'
          onChangeText = {(value)=> this.setState({email : value})}
          value = {this.state.email}
          keyboardType = "email-address"

          />

        <TextInput style={ styles.input}
          placeholder="الاســم" placeholderTextColor = '#424949'
          onChangeText = {(value)=> this.setState({username : value})}
          value = {this.state.username}
          />
                        
       
        <TextInput style={ styles.input}
          placeholder="الرقم السري" placeholderTextColor = '#424949'
          secureTextEntry = {true}
          onChangeText = {(value)=> this.setState({password : value})}
          value = {this.state.password}
          />

        <TextInput style={ styles.input}
          placeholder="تأكيد الرقم السرى" placeholderTextColor = '#424949'
          secureTextEntry = {true}
          onChangeText = {(value)=> this.setState({confirmpassword : value})}
          value = {this.state.confirmpassword}
          
          />

        <TextInput style={ styles.input}
          placeholder="العنوان" placeholderTextColor = '#424949'
          onChangeText = {(value)=> this.setState({address : value})}
          value = {this.state.address}
          
          />
            
        <TextInput style={ styles.input}
          keyboardType = "decimal-pad"
        
        placeholder="رقم الهاتف" placeholderTextColor = '#424949'
          onChangeText = {(value)=> this.setState({phone : value})}
          value = {this.state.phone}
          
          
          />
            

            <TextInput style={ styles.input}
          placeholder="السن" placeholderTextColor = '#424949'
          onChangeText = {(value)=> this.setState({age : value})}
          value = {this.state.age}
          
          keyboardType={'numeric'}
          
          />

        <TouchableOpacity style = {styles.button}
        onPress={this.showActionSheet}
        >
           <Text style = { styles.txt}> تحديد فصيلة الدم  </Text>  
            </TouchableOpacity>      
        

            <ActionSheet
          ref={this.getActionSheetRef}
          title={title}
          message="أختر نوع فصيلة الدم الصحيح لأن الهدف الرئيسي للتطبيق يعتمد بشكل كلى على أنواع الدم الصحيحة "
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
          
        />
    
        <TouchableOpacity style = {styles.button}
          onPress = {this.OnRegisterPress.bind(this)}
        
        >
           <Text style = { styles.txt}> تـسجيل البيانات </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.buttonline}>
           <Text style = {{  alignSelf : "center" , color : '#58D68D' , fontSize : 15  }}
            onPress = {this.OnloginPress.bind(this)}
           >
                إن تمتلك حـسـاب ؟ برجــاء تـسجيل الدخول </Text>
            </TouchableOpacity>



            </View> 
          </ScrollView>
        
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
          , borderRadius : 20 , marginTop : '5%' , marginLeft : '5%' , marginRight : '5%' 
          , textAlign : 'center' , color : '#ECF0F1' , fontSize : 15 
          
        },
        button :
        {
            marginTop : '5%' , height : 40 , width : '90%' ,  borderRadius : 15 , marginLeft : '5%' ,
            justifyContent : 'center' , backgroundColor : '#2980B9'  , padding : 15
        } , 

        buttonline :
        {
            marginTop : '5%' , height : '10%' , width : '80%' ,  justifyContent : 'center' , marginLeft : '10%'
          ,    marginBottom : '15%'
        }, 
        txt : 
        {
            alignSelf : "center" , color : '#ECF0F1' , fontSize : 18  
            
          }
    
    });
    
// {selectedText} value of Actionsheet