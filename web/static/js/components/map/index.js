import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState, lifecycle } from 'recompose';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import { getPlaces } from '../../actions/map';

const Markers = (places, onMarkerClick) => {
  return places.map((r, i) => {
    return <Marker
      key={i}
      name={r.name}
      onClick={onMarkerClick}
      position={{lat: r.geometry.location.lat(), lng: r.geometry.location.lng()}} />
  })
}

const MapContainer = ({ location, google, onMapReady, markers, places, ui, onMapClicked, onMarkerClick }) => {
  if (!location || !google) { return null }
  return (
    <Map
      google={google}
      zoom={16}
      onReady={onMapReady}
      location={location}
      onClick={onMapClicked}
      initialCenter={{ lat: location.latitude, lng: location.longitude }}>
      {Markers(places, onMarkerClick)}
      <InfoWindow
        marker={ui.activeMarker}
        visible={ui.showInfo}>
          <div>
            <h1>{ui.selectedPlace.name}</h1>
          </div>
      </InfoWindow>
    </Map>
  );
}

const mapStateToProps = ({ sessionReducer, mapReducer }) => {
  return {
    location: sessionReducer.location,
    places: mapReducer.places
  }
};

export default compose(
  connect(mapStateToProps, {
    getPlaces: getPlaces
  }),
  GoogleApiWrapper({
    apiKey: ('AIzaSyAz3S_jP5IZtvAnp8XSmqh2MXqYw0bxp7o')
  }),
  withState('ui', 'setUi', { showInfo: false, activeMarker: null, selectedPlace: { name: '' } }),
  withHandlers({
    onMapReady: ({ getPlaces, location }) => (mapProps, map) => {
      getPlaces(mapProps.google, map, location);
    },
    onMarkerClick: ({ setUi }) => (props, marker, e) => {
      setUi({
        selectedPlace: props,
        activeMarker: marker,
        showInfo: true
      });
    },
    onMapClicked: ({ ui, setUi }) => (props) => {
      if (ui.showInfo) {
        setUi({
          selectedPlace: ui.selectedPlace,
          showInfo: false,
          activeMarker: null
        })
      }
    }
  })
)(MapContainer)
