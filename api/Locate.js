import { Location, Permissions } from 'expo';

export async function Locate (callback) {
    let status = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        callback (null, null, 500);
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

    callback  (location.coords.latitude, location.coords.longitude, 200);
}