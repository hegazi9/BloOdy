<<<<<<< HEAD
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import Register from './Register';
import Home from './Home';
const  AppNavigator  = createStackNavigator ({    
    Login : 
    {
        screen : Login ,  
    } ,
    Register : 
        {
            screen : Register ,  
        } ,
        Home : 
        {
            screen : Home ,  
        } ,
    });
=======
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import Register from './Register';
import Home from './Home';

const  AppNavigator  = createStackNavigator ({
    
    Register : 
        {
            screen : Register ,  
        } ,
    
    Login : 
        {
            screen : Login ,  
        } ,

        Home : 
        {
            screen : Home ,  
        } ,


    });

>>>>>>> bafa8498a82831b6856c993cd4ed6310576312b1
export default createAppContainer (AppNavigator ) ;