import axios from 'axios';
import { createAction } from 'redux-act';
import { setCurrentUser }   from './sessions';
import GoogleApi from '../lib/googleapi';

export const placesReceived = createAction('PLACES_RECEIVED');

export const getPlaces = (google, map, location) => dispatch => {
  const service = new google.maps.places.PlacesService(map);
  var request = {
    location: new google.maps.LatLng(location.latitude, location.longitude),
    radius: '500',
    keyword: 'poutine'

  };

  service.nearbySearch(request, function(results, status) {
    console.log(results);
    dispatch(placesReceived({ places: results }));
  })
};
