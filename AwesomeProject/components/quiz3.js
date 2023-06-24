import React, {useState, useEffect, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet, Button, SafeAreaView, TextInput } from 'react-native';
import UsernameContext from './UsernameContext';

function ProfileScreen ({ name, age, weight, height, setName, setAge, setWeight, setHeight }){
	const [temp1, setTemp1] = useState('');
	const [temp2, setTemp2] = useState('');
	const [temp3, setTemp3] = useState('');
  return (
		<SafeAreaView style={styles.screen}>

			<Text>currentValue={"{"}{'"name"'}:{name},{'"age"'}:{age},{'"weight"'}:{weight},{'"height"'}:{height}{'}'}</Text>

      <SafeAreaView style={styles.input}>
        <Text>name </Text>
        <TextInput 
					style={{backgroundColor:'#90EE8F', height:22, width:180}}
					onChangeText={text => {setName(text);}}>
				</TextInput>
			</SafeAreaView>

			<SafeAreaView style={styles.input}>
        <Text>age </Text>
        <TextInput 
					placeholder=' '
					style={{backgroundColor:'#AED8E6', height:22, width:180}}
					onChangeText={text => {setTemp1(text)}} 
					>
				</TextInput>
			</SafeAreaView>

			<SafeAreaView style={styles.input}>
        <Text>weight </Text>
        <TextInput 
					placeholder=''
					style={{backgroundColor:'#FEC0CB', height:22, width:180}}
					onChangeText={text => {setTemp2(text)}} 
					>
				</TextInput>
			</SafeAreaView>

			<SafeAreaView style={styles.input}>
        <Text>height </Text>
        <TextInput 
					placeholder=' '
					style={{backgroundColor:'#00FFFF', height:22, width:180}}
					onChangeText={text => {setTemp3(text)}} 
					>
				</TextInput>
			</SafeAreaView>		
			<SafeAreaView>
			<Button title='SAVE PROFILE' onPress={()=>{setName(name),setAge(temp1),setWeight(temp2),setHeight(temp3);}}/>	
			</SafeAreaView>
			</SafeAreaView>
			
  );
}

const AgeScreen = ()=>{
	const userInfo = useContext(UsernameContext);
  return (
    <SafeAreaView style={styles.screen}>
      <Text>Age Calculator</Text>
			<Text>age in years: {userInfo.age}</Text>
			<Text>age in weeks: {userInfo.age*52.176}</Text>
			<Text>age in days: {userInfo.age*365}</Text>
    </SafeAreaView>
  );
}

function BMIScreen() {
	const userInfo = useContext(UsernameContext);
    return (
      <SafeAreaView style={styles.screen}>
        <Text>BMI calculator</Text>
				<Text>height: {userInfo.height}</Text>
				<Text>weight: {userInfo.weight}</Text>
				<Text>bmi: {(userInfo.weight/(userInfo.height)**2)*703}</Text>
      </SafeAreaView>
    );
  }

const Tab = createBottomTabNavigator();

export default function App() {
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');
  return (
			<UsernameContext.Provider value={{name:name, age:age, weight:weight, height:height}}>
        <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
  
              if (route.name === 'Profile') {
                iconName = 'ios-list';
              } else if (route.name === 'Age') {
                iconName ='ios-list';
              }else{
                iconName = 'ios-list';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#027AFF',
            tabBarInactiveTintColor: 'gray',
          })}
        >
        <Tab.Screen name="Profile" >
					{() => 
    		<ProfileScreen
      		name={name}
      		age={age}
      		weight={weight}
      		height={height}
					setName={setName}
					setAge={setAge}
					setWeight={setWeight}
					setHeight={setHeight}
					 /> }
				</Tab.Screen>
        <Tab.Screen name="Age" component={AgeScreen} />
        <Tab.Screen name="BMI" component={BMIScreen} />
        </Tab.Navigator>
      </NavigationContainer>
			</UsernameContext.Provider>
    );
  }

  const styles = StyleSheet.create({
    screen:{
			padding: 4,
			flex:1
    },
    input: {
      margin: 5,
			fontSize: 20,
			flexDirection: 'row',
			justifyContent: 'space-evenly',
			alignItems:'center',
			flex: 1
    },
  });
