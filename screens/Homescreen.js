import React from 'react'
import { SafeAreaView, StyleSheet, Text, View,Image } from 'react-native'
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 
'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';
import { useDispatch } from 'react-redux';
import { setDestination,setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const Homescreen = () => {
     const dispatch = useDispatch();

    return (
           <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
            <Image 
            style={{
                width:100,height:100,resizeMode: 'contain',
            }}
            source={{
                uri:"https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
            }}
            />

            <GooglePlacesAutocomplete 
            styles={{
                container:{
                    flex:0,
                },
                textInput:{
                    fontSize:18,
                },
            }}
            enablePoweredByContainer={false}
            onPress={(data,details=null)=>{
                dispatch(
                    setOrigin({
                    location: details.geometry.location,
                    description : data.description,
                })
                );
                
                dispatch(setDestination(null));
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            query={{
                key:GOOGLE_MAPS_APIKEY,
                language:"en",
            }}
            placeholder="Where from"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            />
            <NavOptions />
            <NavFavourites />
            </View>
         </SafeAreaView>
    )
}

export default Homescreen

const styles = StyleSheet.create({

})
