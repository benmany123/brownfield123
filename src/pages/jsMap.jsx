import React from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, GeoJSON, LayersControl} from 'react-leaflet'
import brownfield from '../data/brownfield.json';

class jsMap extends React.Component {
    state = {
        zoom: 15,
    }

    handleClick () {
        L.map('map').setView([22.460750, 114.049130], 8);
    }
    render() {
        return (
            <div>
                <MapContainer center={[22.460750, 114.049130]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png">

                    <LayersControl position="topright">
                        <LayersControl.Overlay checked name="Brownfield">
                        <GeoJSON data={brownfield.features}
                
                            //filter={onFilter}

                            style={() => ({
                                color: '#964B00',
                                weight: 0.5,
                                fillColor: "#F27900",
                                fillOpacity: 0.6,
                        })}/>
                        </LayersControl.Overlay>
                    </LayersControl>    
                </TileLayer>

                </MapContainer>
        </div>
        )
    }
}

export default jsMap