import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {Animated, Callout, Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';

const MappolylineScreen = ({route}) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCg2a2TETOOCBew4hAdmlOzJclpitXZGmM';
  const drawline = route.params.item;
  const navigation = useNavigation();
  const [initRegion, setInitRegion] = useState(null);

  useEffect(() => {
    console.log('UseEffectMap Data -+-+-+-+-', drawline);
    requestPermission();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      var res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iphone', res);

      if (res === 'granted') {
        getCurrentLocation();
      }
    } else {
      var res = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('android', res);
      if (res === 'granted') {
        getCurrentLocation();
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      data => {
        console.log('lat long +-+-+-+-', data);
        let region = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setInitRegion(region);
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 100000, maximumAge: 1000},
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          top: 35,
          zIndex: 10,
          backgroundColor: '#fff',
          width: RFValue(310),
          alignSelf: 'center',
          padding: RFValue(10),
          borderRadius: RFValue(10),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{width: RFValue(20), height: RFValue(20)}}
            source={require('./assets/images/left-arrow.png')}
          />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            paddingLeft: RFValue(90),
            fontWeight: 'bold',
          }}>
          Map Explore
        </Text>
      </View>
      <MapView
        zoomEnabled={true}
        ref={map => (_map = map)}
        initialRegion={initRegion}
        // showsUserLocation={true}
        style={styles.mapview}>
        <MapViewDirections
          origin={initRegion}
          destination={drawline}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="red"
        />

        <Marker
          coordinate={initRegion}
          title="Current Location"
          description="You are currently standing here">
          <Image
            style={{
              height: RFPercentage(3),
              width: RFPercentage(3),
              // tintColor: COLORS.darkorange,
            }}
            source={require('./assets/images/placeholder.png')}
            resizeMode="contain"
          />
        </Marker>
        <Marker
          coordinate={drawline}
          title="Your Destination"
          description="You want to go there">
          <Image
            style={{
              height: RFPercentage(5),
              width: RFPercentage(5),
            }}
            source={require('./assets/images/placeholder.png')}
            resizeMode="contain"
          />
        </Marker>

        <Marker
          coordinate={{
            latitude: drawline.latitude,
            longitude: drawline.longitude,
          }}>
          <Image
            style={{height: RFPercentage(5), width: RFPercentage(5)}}
            source={require('./assets/images/placeholder.png')}
          />
        </Marker>
      </MapView>
    </View>
  );
};

export default MappolylineScreen;

const styles = StyleSheet.create({
  mapview: {
    ...StyleSheet.absoluteFillObject,
  },
});
