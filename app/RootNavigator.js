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
export default createAppContainer (AppNavigator ) ;