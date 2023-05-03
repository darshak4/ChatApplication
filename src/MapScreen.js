import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
} from 'react-native-maps';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    Title: 'Odhani Restaurant',
    latitude: 21.23452,
    longitude: 72.855658,
    image: require('./assets/images/image1.jpeg'),
  },

  {
    Title: 'Annapoorna Restaurant',
    latitude: 21.23582,
    longitude: 72.856935,
    image: require('./assets/images/image2.jpeg'),
  },
  {
    Title: 'Jay khodiyar restaurant',
    latitude: 21.23423,
    longitude: 72.8568315,
    image: require('./assets/images/image3.jpeg'),
  },
  {
    Title: 'Laxmi Food Inn',
    latitude: 21.23533,
    longitude: 72.856425,
    image: require('./assets/images/images4.jpeg'),
  },
];
const MapScreen = () => {
  const [location, Setlocation] = useState();
  const navigation = useNavigation();

  useEffect(() => {
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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        Setlocation(region);
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 100000, maximumAge: 1000},
    );
  };

  const _renderItem = ({item}) => {
    return (
      <View
        style={{
          height: RFValue(150),
          width: RFValue(280),
          alignSelf: 'center',
          borderRadius: RFValue(20),
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: RFValue(280),
              height: RFValue(100),
            }}
            borderTopLeftRadius={RFValue(20)}
            borderTopRightRadius={RFValue(20)}
            source={item.image}></Image>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginLeft: RFValue(10),
              marginTop: RFValue(10),
              fontWeight: 'bold',
            }}>
            {item.Title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MapExpolre', {item: item});
            }}>
            <Image
              style={{
                width: RFPercentage(5),
                height: RFPercentage(5),
                marginTop: RFValue(10),
                marginRight: RFValue(20),
              }}
              source={require('./assets/images/itinerary.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onCarouseChange = index => {
    let location = data[index];
    _map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        zoomEnabled={true}
        ref={map => (_map = map)}
        initialRegion={location}
        showsUserLocation={true}
        style={styles.mapview}>
        {data.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={{latitude: item.latitude, longitude: item.longitude}}>
              <Image
                style={{height: RFPercentage(5), width: RFPercentage(5)}}
                source={require('./assets/images/placeholder.png')}
              />
              <Callout>
                <Text>{item.name}</Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          // zIndex: 50,
          alignSelf: 'center',
        }}>
        <Carousel
          ref={c => {
            _carousel = c;
          }}
          layout={'tinder'}
          data={data}
          renderItem={_renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
          containerCustomeStyle={styles.carouselstyle}
          onSnapToItem={index => onCarouseChange(index)}
        />
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  mapview: {
    flex: RFValue(1),
  },
  contaioner: {
    ...StyleSheet.absoluteFillObject,
  },

  carouselstyle: {
    position: 'absolute',
    bottom: 0,
    top: 80,
    borderRadius: RFValue(20),
  },
});
