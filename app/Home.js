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