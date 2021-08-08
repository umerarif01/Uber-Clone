import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from "tailwind-react-native-classnames";  
import { GooglePlacesAutocomplete } from 
'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements'

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    return (
           <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning,Umer</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
              <View>
               <GooglePlacesAutocomplete 
               styles={toInputBoxStyles}
               enablePoweredByContainer={false}
               returnKeyType={true}
               placeholder="Where to?"
               fetchDetails={true}
               nearbyPlacesAPI="GooglePlacesSearch"
               onPress={(data,details=null)=>{
                dispatch(
                    setDestination({
                    location: details.geometry.location,
                    description : data.description,
                  })
                );
                navigation.navigate("RideOptionsCard");
                // dispatch(setDestination(null));
               
            }}
               debounce={400}
               query={{
                key:GOOGLE_MAPS_APIKEY,
                language:"en",
            }}
               />
              </View>
            </View>
            <View style={tw`px-3 bg-white relative z-10 justify-between flex-1`}>
                <NavFavourites />
                <View style={tw`mt-3 flex-row justify-evenly py-3 border-t border-gray-100`}>
                    <TouchableOpacity 
                        style={tw`flex-row bg-black w-24 px-4 py-3 rounded-full border border-black`}
                        onPress={() => navigation.push('RideOptionsCard')}
                    >
                        <Icon name="car" type="font-awesome" color="white" size={16} />
                        <Text style={tw`text-white text-center pl-3`}>Ride</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`flex-row bg-white w-24 px-4 py-3 rounded-full border border-black`}
                    >
                        <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                        <Text style={tw`text-black text-center pl-3`}>Ride</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
container:{
    backgroundColor:"white",
    paddingTop:20,
    flex:0,
},
    textInput:{
        backgroundColor:"#DDDDDF",
        borderRadius:0,
        fontSize:18,
    },
    textInputContainer:{
        paddingHorizontal:20,
        paddingBottom: 0,
    },



})
