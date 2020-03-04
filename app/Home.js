<<<<<<< HEAD
import React , {Component}from 'react' ;
import { View , StyleSheet , ToastAndroid ,  TextInput , TouchableOpacity ,Linking, Alert, Platform 
   , ScrollView } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet';
import { Icon , Tab, Tabs , Container , Accordion  , Text ,TabHeading , Card,
     CardItem  } from 'native-base';
import Swiper from "react-native-web-swiper";
import firebase from './config';


 
    const dataArray = [
  { title: " تعليــمات", content: " أهلا بك فى هذا التطبيق البسيط أود أن أشكرك على استخدام هذا التطبيق لتحديد فصيلة الدم وهذا ملخص  عن التطبيق : يصل المتبرعين بالدم للمرضى المحتاجين كميات من الدم ، وكانت هناك مشكلة في هذا الجزء ، وخاصة في الحالات النادرة من فصائل الدم ، لذلك يجد المريض صعوبة في الوصول إلى نوعية الدم المطلوبة و هذا التطبيق  يحاول قدر الإمكان بتقريب المسافات بين المرضى والمتبرعين بالدم" },
  { title: "تواصــل معنا", content: "01120465421 - 01068874226 " },
  
];
const title = <Text style={{ color: 'red', fontSize: 18 }}>عليك اختيار فصيلة الدم ؟ </Text>
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 10 
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
  


class Home extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible : false , searchbarfocus : false  , selected: 1 ,items: [] , results: [] 
             , all_Users : [] ,  checker : false , message : '' , email : ''

                };
        this._handleResults = this._handleResults.bind(this);
        console.disableYellowBox = true;
        }

        

      _handleResults(results) {
        this.setState({ results });
      }

    static navigationOptions = {header: null};
 

    componentDidMount() {
  var user = firebase.auth().currentUser ;   
    let currentComponent = this;
   var x =firebase.database().ref(`USERS/${user.uid}`)
        x.on('value', (snapshot) => {
          let data = snapshot.val();
          let Info = Object.values(data);
          currentComponent.setState({
            items : Info  
          });     
       });
        
      }
     
    forgotPassword() {
      var user = firebase.auth().currentUser ;       
      firebase.auth().sendPasswordResetEmail(user.email)
        .then(function () {
          ToastAndroid.showWithGravityAndOffset(
            'Check Your Email.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
            );
        }).catch(function (e) {
          ToastAndroid.showWithGravityAndOffset(
            'You have something wrong.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
            );
        })
    }
 
    RetriveAllUser()
    {
      if(this.state.checker == true)
      {
        let currentComponent = this;
        var x =firebase.database().ref('USER-BLOOD').orderByChild('selected')
        .equalTo(options[this.state.selected].component || options[this.state.selected]);
          
        if(options[this.state.selected].component || options[this.state.selected] == '' 
        && options[this.state.selected].component || options[this.state.selected] == 'Cancel')
        {
          ToastAndroid.showWithGravityAndOffset(
            'لابد من اختيار فصيلة الدم',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
            );
  
        }
        else if (x)
        {
          x.on('value', (snapshot) => {
            let data = snapshot.val();
            let Info = Object.values(data);
            currentComponent.setState({
              all_Users : Info  
            });             
         });
       }
       else
       {       
        ToastAndroid.showWithGravityAndOffset(
          'حتى الان لا توجد هذه الفصيلة ',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
          );
  
       }
  
        
      }
      else
      {
        
        ToastAndroid.showWithGravityAndOffset(
          'لابد من اختيار فصيلة الدم ',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
          );
  
      }
        
    }

    OnlogOutPress()
    {
      firebase.auth().signOut()
   .then(
     () => {
      ToastAndroid.showWithGravityAndOffset(
        'LogOut Successfully',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
        );
        
      this.props.navigation.navigate("Login");
     
     },
     function(error) {
      ToastAndroid.showWithGravityAndOffset(
        'LogOut is Failed',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
        );
       

     }
   );
    } 
   
    feedback()
    {
      var user = firebase.auth().currentUser ;
      if(this.state.message != '')
      {
                  firebase.database().ref(`FEEDBACK/${user.uid}`).set(
                    {
                        email : user.email ,
                        message : this.state.message
                    })
                    .then(()=>{     
                  ToastAndroid.showWithGravityAndOffset(
                  'Thanks for your Opinion.',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                  );
                // alert("User" + user.uid);
                  this.setState ({
                    message : ''
                  })
                  
            })
          }
          else {
            ToastAndroid.showWithGravityAndOffset(
              'Message is Empty.',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
              );
          }     
    }
    
    showActionSheet = () => {
      this.actionSheet.show()
    } ;
    getActionSheetRef = ref => (this.actionSheet = ref) ;
    handlePress = index =>this.setState({ selected: index , checker : true}) ;
  
    render()
    {
     
      let currentComponent = this;
      const UserList = this.state.all_Users.map( function(user){
        return(
          <Card style = {{ marginTop : '5%' , backgroundColor : '#17202A' , borderColor : '#2980B9' ,
          borderRadius : 5 , marginLeft : '5%' , marginRight : '5%'}}>
      
          <CardItem style = {{ backgroundColor : '#17202A' ,  marginTop : '1%', height : 30  
                         , borderRadius : 5}} >       
          <Text key ={user.key} style ={styles.usertxt}>Em@il : {user.email}
          </Text>
          </CardItem>
          <CardItem style = {{ backgroundColor : '#17202A' ,height : 30
                     , borderRadius : 5}} > 
        <TouchableOpacity style = {styles.buttonline}>
        <Text key ={user.key} style ={{ alignSelf : "center" , color : '#2980B9' 
              , fontSize : 14 ,}} onPress = {currentComponent.calling = phone => 
              {
                let phoneNumber = user.phone;
                if (Platform.OS !== 'android') {
                phoneNumber =  `telprompt:${user.phone}`;
                }
                else  {
                phoneNumber = `tel:${user.phone}`;
                }
                Linking.openURL(phoneNumber)
                .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                  } else {
                    return Linking.openURL(phoneNumber);
                }
                })
                .catch(err => console.log(err));
                }
            
              }
              >Phone : {user.phone}
      
                   </Text>
  </TouchableOpacity>
          </CardItem>
          <CardItem style = {{ backgroundColor : '#17202A' ,height : 30
                         ,marginBottom : '2%'  , borderRadius : 5}} > 
          <Text key ={user.key} style ={styles.usertxt}>BlOod-Type : {user.selected}               
          </Text>
         </CardItem>
         <CardItem style = {{ backgroundColor : '#17202A' 
                         , borderRadius : 5}} > 
          <Text key ={user.key} style ={styles.usertxt}>              
          </Text>
         </CardItem>
       
        </Card>
         )
        
      })  
      return(
      <Tabs tabBarPosition = "bottom" tabBarUnderlineStyle = {{backgroundColor : '#AAB7B8' , height : 2.5}}>
                        <Tab 
                        heading={ <TabHeading style = {{backgroundColor : '#17202A' }}> 
                        <Icon name="home" type = "Entypo" style={{color: 'white'  }}/>
                        </TabHeading>}>
                        <View style = {styles.view}>
                        <View style={{ marginTop: '5%' }}>

                      <Icon name="logout" type = "AntDesign" style={{color: 'red' , marginLeft : '90%' }}
                        onPress = {this.OnlogOutPress.bind(this)}
                      />
    
                        <TouchableOpacity style = {styles.button}
                         onPress={this.showActionSheet}>
        
                      <Text style = {{alignSelf : "center" , color : '#2980B9' , fontSize : 18  }}>
                         تحديد فصيلة الدم  </Text>  
                     </TouchableOpacity>      

                      <ActionSheet
                    ref={this.getActionSheetRef}
                    title={title}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                    
                  />
                <TouchableOpacity style = {styles.buttonline}>
           <Text style = {{  alignSelf : "center" , color : '#58D68D' , fontSize : 15 , marginTop : '10%' }}
            onPress = {this.RetriveAllUser.bind(this)}
           >
               اضغط هنا. لرؤية المشتركين مع فصيلة دمك</Text>
            </TouchableOpacity>
                        </View>
                        <ScrollView>
                        { UserList }
                        </ScrollView>
                        </View> 
                        </Tab>


                        <Tab heading={ <TabHeading style = {{backgroundColor : '#17202A' , }}>
                        <Icon name="user" type = "Entypo" style={{color: 'white' }}/>
                        
                        </TabHeading>}>
            
                        <View style = {styles.view}>
                       
                        <Card style = {{ marginTop : '10%' , backgroundColor : '#17202A' ,
                         borderRadius : 5 , marginLeft : '5%' , marginRight : '5%'}}>
                          <CardItem style = {{ backgroundColor : '#17202A' 
                           , borderRadius : 5}} > 
                          <Icon name="email-check-outline" type = "MaterialCommunityIcons" style={{color: '#AAB7B8' }}/>
                          <Text style = {styles.txt}>{this.state.items[2]}</Text>
                          </CardItem>
                          </Card>
                         
                          <Card style = {{ backgroundColor : '#17202A' ,
                         borderRadius : 5 , marginLeft : '5%' , marginRight : '5%'}}>
                          <CardItem style = {{ backgroundColor : '#17202A' 
                           , borderRadius : 5}} > 
                        <Icon name="user" type = "AntDesign" style={{color: '#AAB7B8' }}/>
                            <Text style = {styles.txt}>{this.state.items[6]}</Text>
                          </CardItem>
                          </Card>
                    
                          <Card style = {{ backgroundColor : '#17202A' ,
                         borderRadius : 5 , marginLeft : '5%' , marginRight : '5%'}}>
                          <CardItem style = {{ backgroundColor : '#17202A' 
                           , borderRadius : 5}} > 
                        <Icon name="address" type = "Entypo" style={{color: '#AAB7B8' }}/>
                            <Text style = {styles.txt}>{this.state.items[0]}</Text>
                          </CardItem>
                          </Card>
                    
                          <Card style = {{ backgroundColor : '#17202A' ,
                         borderRadius : 5 , marginLeft : '5%' , marginRight : '5%'}}>
                          <CardItem style = {{ backgroundColor : '#17202A' 
                           , borderRadius : 5}} > 
                        <Icon name="phone-call" type = "Feather" style={{color: '#AAB7B8' }}/>
                            <Text style = {styles.txt}>{this.state.items[4]}</Text>
                          </CardItem>
                          </Card>
                    
                          <Card style = {{ backgroundColor : '#17202A' ,
                         borderRadius : 5 , marginLeft : '5%' , marginRight : '5%'}}>
                          <CardItem style = {{ backgroundColor : '#17202A' 
                           , borderRadius : 5}} > 
                        <Icon name="calendar-minus-o" type = "FontAwesome" style={{color: '#AAB7B8' }}/>
                        <Text style = {styles.txt}>{this.state.items[1]}</Text>
                          </CardItem>
                          </Card>
                    
                          <Card style = {{ backgroundColor : '#17202A' ,
                         borderRadius : 5 , marginLeft : '5%' , marginRight : '5%'}}>
                          <CardItem style = {{ backgroundColor : '#17202A' 
                           , borderRadius : 5}} > 
                        <Icon name="hearto" type = "AntDesign" style={{color: '#AAB7B8' }}/>
                        <Text style = {styles.txt}>{this.state.items[5]}</Text>
                          </CardItem>
                          </Card>
                    
                       <TouchableOpacity style = {styles.button}
                         onPress={this.forgotPassword}>
        
                      <Text style = {{alignSelf : "center" , color : '#2980B9' , fontSize : 18  }}>
                        تغيير الرقم السرى   </Text>  
                     </TouchableOpacity>      

                        
                        </View>
            
            
                        </Tab>
                        

         
                        <Tab heading={ <TabHeading style = {{backgroundColor : '#17202A' }}>
                        <Icon name="information" type = "MaterialCommunityIcons" style={{color: 'white' }}/>
                        </TabHeading>}>
                        
                        <View style = {styles.view}>
                        <Container>
                          <Accordion style = {{backgroundColor : '#17202A' , marginTop : '5%'}}
                            dataArray={dataArray}
                            headerStyle={{ backgroundColor: "#AAB7B8" }}
                            contentStyle={{ backgroundColor: "#ECF0F1"}}
                            
                          />
                       </Container>
                    


                        </View>
                        </Tab>

                        <Tab heading={ <TabHeading style = {{backgroundColor : '#17202A' , }}>
                        <Icon name="feedback" type = "MaterialIcons" style={{color: 'white' }}/>
                        
                        </TabHeading>}>
            
                        <View style = {styles.view}>
                        <Card style = {{ backgroundColor : '#AAB7B8' ,
                         borderRadius : 5 , marginLeft : '5%' , marginRight : '5%' , marginTop : '30%'}}>
                          <CardItem style = {{ backgroundColor : '#AAB7B8' , marginTop : 5
                           , borderRadius : 5}} > 
                        <Icon name="megaphone" type = "Entypo" style={{color: 'red' }}/>
                        <Text style = {{alignSelf : "center" , color : 'black' ,
                         fontSize : 18  , justifyContent : "center"}}>We're here to help !</Text>
                          </CardItem>

                          <CardItem style = {{ backgroundColor : 'white'  , marginLeft : '5%' , marginRight : '5%'
                            , borderTopLeftRadius : 3}} > 
                        <Icon name= "email-open" type = "MaterialCommunityIcons" style={{color: 'red' }}/>
                        <Text style = {{alignSelf : "center" , color : 'black' ,
                         fontSize : 15  , justifyContent : "center"}}> mohamedhegazy500@gmail.com</Text>
                          </CardItem>
                        
                          
                          <CardItem style = {{ backgroundColor : 'white'  , marginLeft : '5%' , marginRight : '5%'
                            , borderTopLeftRadius : 3}} > 
                        <Icon name="old-phone" type = "Entypo" style={{color: 'red' }}/>
                        <Text style = {{alignSelf : "center" , color : 'black' ,
                         fontSize : 18  , justifyContent : "center"}}>01068874226</Text>
                          </CardItem>

                          <CardItem style = {{ backgroundColor : 'white'  , marginLeft : '5%' , marginRight : '5%'
                            , borderTopLeftRadius : 3}} > 
                        <Icon name="location-pin" type = "Entypo" style={{color: 'red' }}/>
                        <Text style = {{alignSelf : "center" , color : 'black' ,
                         fontSize : 18  , justifyContent : "center"}}> Cairo - Egypt </Text>
                          </CardItem>
                        
                          <CardItem style = {{ backgroundColor : 'white'  , marginLeft : '5%' , marginRight : '5%'
                            , borderTopLeftRadius : 3}} > 
                          <TextInput style={ styles.feedbackinput}
                              placeholder="Message" placeholderTextColor = '#424949'
                              onChangeText = {(value)=> this.setState({message : value})}
                              value = {this.state.message}
                              
                              />
                          </CardItem>
                          <TouchableOpacity style = {styles.feedbackbutton}
                         onPress={this.feedback.bind(this)}>        
                      <Text style = {{alignSelf : "center" , color : 'white' , fontSize : 18 , }}>
                        Submit </Text>  
                     </TouchableOpacity>      

                          <CardItem style = {{ backgroundColor : '#AAB7B8' , marginTop : 10
                           , borderRadius : 5}} > 
                           </CardItem>
                          </Card>
                    
                       
                        </View>
                        </Tab>

                        
                    </Tabs>
            
            )
    }
}

export default Home ;


const styles = StyleSheet.create(
    {
        view :
        {
            backgroundColor : '#17202A' , flex : 1 , 

        },
        input : 
        {
            borderWidth : .5  , padding : 10 , borderColor : '#AAB7B8' 
          , borderRadius : 20 , marginTop : '5%' , marginLeft : '5%' , marginRight : '5%' 
          , textAlign : 'center' , color : '#ECF0F1' , fontSize : 15 
        },

        feedbackinput : 
        {
            borderWidth : .5  , padding : 5 , borderColor : '#AAB7B8' , width : '90%'
          , borderRadius : 10 , marginLeft : '5%' , marginRight : '5%' 
          , textAlign : 'center' , fontSize : 15 
        },

        feedbackbutton : 
        {
          borderWidth : .5  , padding : 10  , backgroundColor : '#2980B9' 
          , borderRadius : 10 , marginTop : '5%' , marginLeft : '5%' , marginRight : '5%' 
          , textAlign : 'center' , fontSize : 15 
        
        },
         
        button :
        {
          borderWidth : .5  , padding : 10 , borderColor : '#2980B9' 
          , borderRadius : 20 , marginTop : '5%' , marginLeft : '5%' , marginRight : '5%' 
          , textAlign : 'center' , color : '#ECF0F1' , fontSize : 15 
         } , 

        txt : 
        {
            alignSelf : "center" , color : '#ECF0F1' , fontSize : 15  , justifyContent : "center"
            
          } ,
           usertxt : 
        {
            alignSelf : "center" , color : '#ECF0F1' , fontSize : 14 ,
            
          } ,
          slideContainer: {
           flex : 1
            
           
        }
    
    });
    
/*
 forgotPassword = (Email) => {
    firebase.auth().sendPasswordResetEmail(Email)
      .then(function (user) {
        alert('Please check your email...')
      }).catch(function (e) {
        console.log(e)
      })
  }
*/ 

  /* var ref = firebase.database().ref('USERS');
     ref.on("value",snapshot => {
        snapshot.forEach(function(data) {
          let result = snapshot.val() ;
          result["key"] = data.key ;
          alert('' + data.key);


mport { Linking, Alert, Platform } from 'react-native';



export const callNumber = phone => {
console.log('callNumber ----> ', phone);
let phoneNumber = phone;
if (Platform.OS !== 'android') {
phoneNumber = `telprompt:${phone}`;
}
else  {
phoneNumber = `tel:${phone}`;
}
Linking.canOpenURL(phoneNumber)
.then(supported => {
if (!supported) {
    Alert.alert('Phone number is not available');
  } else {
    return Linking.openURL(phoneNumber);
}
})
.catch(err => console.log(err));
};

  <TouchableOpacity style = {styles.buttonline}>
           <Text style = {{  alignSelf : "center" , color : '#58D68D' , fontSize : 15 }}
             onPress = {currentComponent.calling.bind(this)}>
               
               للاتصال اضغط هنـــــــا</Text>
            </TouchableOpacity>


    */   
=======
import React , {Component}from 'react' ;
import { View , StyleSheet  ,  TextInput,  FlatList , TouchableHighlight} from 'react-native';
import SearchBar from 'react-native-search-bar';
import { Icon , Tab, Tabs ,  Header , Item , Input ,
    Button , Text ,TabHeading ,Card, CardItem, Body } from 'native-base';


    const items = [
        1337,
        'janeway',
        {
          lots: 'of',
          different: {
            types: 0,
            data: false,
            that: {
              can: {
                be: {
                  quite: {
                    complex: {
                      hidden: [ 'gold!' ],
                    },
                  },
                },
              },
            },
          },
        },
        [ 4, 2, 'tree' ],
      ];
const ListItems = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];

class Home extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible : false , searchbarfocus : false ,
          items,
          results: []
        };
        this._handleResults = this._handleResults.bind(this);
      }

      _handleResults(results) {
        this.setState({ results });
      }

    static navigationOptions = {header: null};
 
    
    _onChangeSearchText()
    {
        alert("hegazy");
    }

    render()
    {
        return(
            
                <Tabs tabBarPosition = "bottom" tabBarUnderlineStyle = {{backgroundColor : '#AAB7B8' , height : 2.5}}
                
                >
                        <Tab 
                        heading={ <TabHeading style = {{backgroundColor : '#17202A' }}> 
                        <Icon name="home" type = "Entypo" style={{color: 'red' , }}/>
                        </TabHeading>}>
                        <View style = {styles.view}>
                        <View style={{ marginTop: '5%' }}>
          {
            this.state.results.map((result, i) => {
              return (
                <Text key={i}>
                  {typeof result === 'object' && !(result instanceof Array) ? 'gold object!' : result.toString()}
                </Text>
              );
            })
          }
        </View>
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          data={items}
          handleResults={this._handleResults}
          showOnLoad
        /> 
                    
                        </View> 
                        </Tab>

                        <Tab heading={ <TabHeading style = {{backgroundColor : '#17202A' }}>
                        <Icon name="information" type = "MaterialCommunityIcons" style={{color: 'red' }}/>
                        </TabHeading>}>
                        
                        <View >

                        <Card  style = {{ marginTop : '10%' , marginLeft : '5%' , marginRight : '5%' ,
                    borderRadius : 10
                    }}>
                    <CardItem header bordered style = {{backgroundColor : '#AAB7B8' , borderRadius : 10}} >
                    <Text >تعليمات هامة  !!</Text>
                    </CardItem>
                    <CardItem bordered>
                    <Body>
                        <Text>
                       
                        أهلا بك فى هذا التطبيق البسيط أود أن أشكرك على استخدام هذا التطبيق لتحديد فصيلة الدم وهذا ملخص  عن التطبيق : يصل المتبرعين بالدم للمرضى المحتاجين كميات من الدم ، وكانت هناك مشكلة في هذا الجزء ، وخاصة في الحالات النادرة من فصائل الدم ، لذلك يجد المريض صعوبة في الوصول إلى نوعية الدم المطلوبة و هذا التطبيق  يحاول قدر الإمكان بتقريب المسافات بين المرضى والمتبرعين بالدم  
 </Text>
                    </Body>
                    </CardItem>
                    <CardItem footer bordered>
                    <Text>BloOdy</Text>
                    </CardItem>
                </Card>





                        </View>
                        </Tab>


                        <Tab heading={ <TabHeading style = {{backgroundColor : '#17202A' , }}>
                        <Icon name="user" type = "Entypo" style={{color: 'red' }}/>
                        
                        </TabHeading>}>
            
                        <View style = {styles.view}>
                        </View>
            
            
                        </Tab>
                        
                        
                    </Tabs>
            
            )
    }
}

export default Home ;


const styles = StyleSheet.create(
    {
        view :
        {
            backgroundColor : '#17202A' , flex :  1 

        },
    
    });
    
/*
    <Animatable.View animation = "slideInRight"  style={{height : '9%' , backgroundColor : 'white' , padding : 5 ,
                           flexDirection : 'row', alignItems : 'center', borderRadius : 15 , marginTop : '5%' }}>
                         <Icon name="search" type = "Feather" style={{color: 'red' , }}/>
                        <TextInput placeholder = 'Search' style = {{fontSize : 18 , marginLeft : '5%', padding : 0.5}} /> 
                       
                         </Animatable.View>                
                         <FlatList 
                           data = {ListItems} 
                           renderItem = {({item}) => <Text style = {{padding : 20 , fontSize : 16 , color : 'white'}}>{item}</Text>} 
                            keyExtractor = {(item , index)=> index.toString()}
                        />
                             
                     <Header searchBar rounded autoCorrect={false} style = {{backgroundColor : '#282828'}}>
                        <Item>
                        <Icon name="ios-search" />
                        <Input
                            onChangeText={this._onChangeSearchText.bind(this)} // <-- Here
                            placeholder="Search"
                            dataDetectorTypes = "none"
                        />
                        </Item>
                    </Header>
 
*/ 
>>>>>>> bafa8498a82831b6856c993cd4ed6310576312b1
