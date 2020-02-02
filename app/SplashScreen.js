import React , { Component } from 'react' ;
import {View , Image ,  StyleSheet , Animated , AsyncStorage } from 'react-native' ;
import LogoImage from './img/bloodicon.png' ;
import BackImage from './img/logo.png' ;


class SplashScreen extends Component {
        
  constructor ()
  {
    super();
    this.koora = new Animated.ValueXY(0,0);
    this.x = new Animated.ValueXY(0,50); 
  }
  
  componentDidMount()
  {
    Animated.timing(this.koora,{
      toValue : { x : 250 , y: 300 } ,
      duration : 2000, 
      delay : 500 , 
      
    }).start();


  }


  render() {
    return (
      <View style = {{ backgroundColor : '#17202A' , flex : 1}}> 
      <Animated.View style = {this.koora.getLayout()}>
      <Image source={LogoImage} 
         resizeMode = "contain" style = {{
        width : 50 , height : 50
    }}>

    </Image>
      </Animated.View>
      <Image source={BackImage} 
         resizeMode = "contain" style = {{
        width : 250 , height : 250,  marginTop : '50%' , marginLeft : '15%'
    }}>

    </Image>


</View>
      
      
              );
  }
}

export default SplashScreen ; 





