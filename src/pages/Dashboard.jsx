import React from 'react'
import {useState } from 'react';
import { Button} from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import L from "leaflet"
import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, GeoJSON, LayersControl, Marker, LayerGroup, Popup} from 'react-leaflet'
import brownfield from '../data/brownfield.json';
import district from '../data/districtBoundary.json';
import F01_StrategicRoute from '../data/F01_StrategicRoute.json';
import F03_MTRstation from '../data/F03_test.json';
import F04_FutureMTRstation from '../data/F04_FutureMTRstation.json';
import F05_BusStop from '../data/F05_BusStop.json';
import F06_GMB from '../data/F06_GMB.json';
import F08_SecondarySchool from '../data/F08_SecondarySchool.json';
import F11_Industry from '../data/F11_Industry.json';
import F14_OpenSpaceRecreation from '../data/F14_OpenSpaceRecreation.json';
import F15_devnode from '../data/FutureDevNode.json';
import Legend from "./Legend";
import legendItems from "../entities/LegendItems";

function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../assets/images/mtr3.png"),
        iconAnchor: [20,25],
        popupAnchor: [0,0]
    })
}

function GetIcon2(_iconSize){
    return L.icon({
        iconUrl: require("../assets/images/mtr4.png"),
        iconAnchor: [20,25],
        popupAnchor: [0,0]
    })
}
function GetIcon3(_iconSize){
    return L.icon({
        iconUrl: require("../assets/images/hospital.png"),
        iconAnchor: [20,25],
        popupAnchor: [0,0]
    })
}

function states_color(p) {
    if(p === "Very High") return "#BD0026";
    if(p === "High") return "#F03B20";
    if(p === "Middle") return "#FD8D3C";
    if(p === "Low") return "#FECC5C";
    return "#FFFFB2";
}

const chartOptions = {
    series: [{
        name: 'Number of Brownfield',
        data: [249,1728,823,123,65,129,13],
    }, {
        name: 'Number of Potential Brownfield',
        data: [151, 410, 399]
    }],
    options: {
        color: ['#6ab04c','#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Tuen Mun', 'Yuen Long', 'North', 'Tai Po', 'Islands', 'Sai Kung', 'Sha Tin']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: true
        }
    }
}

const chartOptions2 = {
    series: [{
        name: 'Total Area of Brownfield',
        data: [114,1054.3,344.2,24.1,9.7,24.4,7.7],
    }, {
        name: 'Total Area of Potential Brownfield',
        data: [53, 508, 177]
    }],
    options: {
        color: ['#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Tuen Mun', 'Yuen Long', 'North', 'Tai Po', 'Islands', 'Sai Kung', 'Sha Tin']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: true
        }
    }
}

const chartOptions3 = {
    series: [{
        name: 'All 3 Districts',
        data: [595, 606, 639, 555, 405],
    }, {
        name: 'Yuen Long',
        data: [512, 406, 400, 263, 147]
    }, {
        name: 'North',
        data: [52, 186, 186, 155, 155]
    }, {
        name: 'Tuen Mun',
        data: [31, 14, 53, 137, 14]
    }],
    options: {
        color: ['#6ab04c','#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Very Low', 'Low', 'Middle', 'High', 'Very High']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: true
        }
    }
}

const latestOrders = {
    header: [
        "Date",
        "News",
        "District"
    ],
    body: [
        {
            id: "24 May 2022",
            user: "Yuen Long land set for development",
            status: "YL"
        },
        {
            id: "23 May 2022",
            user: "New World Development proposes first subsidized private housing in Yuen Long",
            status: "YL"
        },
        {
            id: "20 May 2022",
            user: "Hong Kong may use luxury Fanling golf course to build 12,000 public housing flats",
            status: "N"
        },
        {
            id: "18 May 2022",
            user: "Hong Kong government rejects all bids for Tuen Mun site, the first land sale to carry minimum flat size requirement",
            status: "TM"
        },
        {
            id: "15 May 2022",
            user: "Sun Hung Kai, Wheelock among developers rushing to build small flats as Hong Kong home prices approach all-time high",
            status: "All"
        }
    ]
}

const orderStatus = {
    "YL": "primary",
    "N": "warning",
    "TM": "success",
    "All": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>
            <Badge type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
)

const Dashboard = () => {

    const mtrLocations = [
        { name: "Tin Shui Wai Station", position: [22.447890660181887,114.00448718585444]},
        { name: "Long Ping Station", position: [22.447629468889396,114.02544629717877]},
        { name: "Yuen Long Station", position: [22.446076477017474,114.03516256214483]},
        { name: "Kam Sheung Road Station", position: [22.435134538966736,114.06320024078477]},
        { name: "Tuen Mun Station", position: [22.395133371354159,113.97318889342007]},
        { name: "Siu Hong Station", position: [22.411534585389244,113.97880348893929]},
        { name: "Sheung Shui Station", position: [22.501632086191677,114.12752815908377]},
        { name: "Fanling Station", position: [22.492117959063485,114.13867532888754]},
        { name: "Lo Wu Station", position: [22.527642023961185,114.11322872873984]},
        { name: "Lo Ma Chau Station", position: [22.514465887471559,114.06567446020537]}
      ];

      const future_mtrLocations = [
        { name: "Proposed San Tin Station", position: [22.488147550704447,114.07503755591178]},
        { name: "Proposed Ngau Tam Mei Station", position: [22.47281076335258,114.06280118051393]},
        { name: "Proposed Au Tau Station", position: [22.449298829967375,114.05492758145355]},
        { name: "Proposed Kwu Tung Station", position: [22.50965490748487,114.10481597714198]},
        { name: "Proposed Hung Shui Kiu Station", position: [22.428076111089936,113.98661088878481]},
        { name: "Proposed Tuen Mun Swimming Pool Station", position: [22.384335640987405,113.96965156722153]},
        { name: "Proposed Tuen Mun Ferry Pier Station", position: [22.37459943245719,113.96589672289477]},
      ];

      const Hospital = [
        { name: "Siu Lam Hospital", position: [22.4100500000001,113.97487]},
        { name: "Pok Oi Hospital", position: [22.44523,114.04159]},
        { name: "Tuen Mun Hospital", position: [22.4070800000001,113.97621]},
        { name: "Castle Peak Hospital", position: [22.4100110000001,113.97374]},
        { name: "Tin Shui Wai Hospital", position: [22.4587040000001,113.99585]},
      ];


    const [text, setText] = useState('2,800');
    const [text2, setText2] = useState('960');
    const [text3, setText3] = useState('1,513');
    const [text4, setText4] = useState('737');

    //status card state
    const  handleClick = () => {
        setText('249');
        setText2('151');
        setText3('114');
        setText4('53');
      }

    const  handleClick2 = () => {
        setText('1,728');
        setText2('410');
        setText3('1054');
        setText4('508');
      }

    const  handleClick3 = () => {
        setText('823');
        setText2('399');
        setText3('344');
        setText4('177');
      }
      const  handleClick4 = () => {
        setText('2,800');
        setText2('960');
        setText3('1,513');
        setText4('737');
      }
    
    //test
    const statusCards=[
        {
            "icon": "bx bx-receipt",
            "count": text,
            "title": "Total Number of Brownfield"
        },
        {
            "icon": "bx bx-receipt",
            "count": text2,
            "title": "Number of Potential Brownfield"
        },
        {
            "icon": "bx bx-receipt",
            "count": text3,
            "title": "Total Area of Brownfield(ha)"
        },
        {
            "icon": "bx bx-receipt",
            "count": text4,
            "title": "Total Area of Potential Brownfield(ha)"
        }
    ];

    const legendItemsReverse = [...legendItems].reverse();

    const themeReducer = useSelector(state => state.ThemeReducer.mode)

    //Filter district
    const onFilter1 = (feature) => {
        return feature.properties.District_Eng === "Tuen Mun";
    }
    const onFilter2 = (feature) => {
        return feature.properties.District_Eng === "Yuen Long";
    }
    const onFilter3 = (feature) => {
        return feature.properties.District_Eng === "North";
    }

    const onEachFeature = (feature, layer) => {
        const popupContent = 
        `
        Brownfield ID: ${feature.properties.OBJECTID}
        <br>
        District: ${feature.properties.District_Eng}
        <br>
        Land Use: ${feature.properties.F12_LandUse} 
        <br>
        Potential Value: ${feature.properties.PotentialClass} 
        <br>
        Potential Level: ${feature.properties.potential} 
        <br>
        Area (Sq.m.): ${Math.round(feature.properties.Shape_Area)} 
        `;
        if (feature.properties && feature.properties.popupContent) {
          popupContent += feature.properties.popupContent;
        }
        layer.bindPopup(popupContent);
        layer.on({
          mouseover: (event) => {
            event.target.setStyle({
              color: '#964B00',
              weight: 0.5,
              fillColor: "white",
              fillOpacity: 0.6,
            });
          },
          mouseout: (event) => {
            event.target.setStyle({
              color: '#964B00',
              weight: 0.5,
              fillColor: states_color(feature.properties.potential),
              fillOpacity: 0.6,
            });
        }});
      }
    return (
        <div><h2 className="page-header">Brownfield Dashboard111</h2>            
            <div className="row" >


            <MapContainer center={[22.460750, 114.049130]} zoom={12} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png">
                </TileLayer>

              <button id="refreshButton">Refresh Button</button>
            <LayersControl position="topright">
                
                <LayersControl.Overlay name="F01 Strategic Route">
                    <GeoJSON data={F01_StrategicRoute.features} color="#00FF7F"/>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="F02 Street Road">
                    <GeoJSON data={F01_StrategicRoute.features} color="#00FF7F"/>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="F03 MTR Station">
                    <LayerGroup>
                    {mtrLocations.map((location) => (
                        <Marker
                            key={location.name}
                            position={location.position}                                
                            icon={GetIcon(5)}
                        >
                            <Popup>
                                {location.name}
                            </Popup>
                        </Marker>
                    ))}
                    <GeoJSON data={F03_MTRstation.features} color="#ff0000"/>
                    </LayerGroup>
                </LayersControl.Overlay>
                

                <LayersControl.Overlay name="F04 Future MTR Station">
                    <LayerGroup>
                    {future_mtrLocations.map((location) => (
                        <Marker
                            key={location.name}
                            position={location.position}                                
                            icon={GetIcon2(5)}
                        >
                            <Popup>
                                {location.name}
                            </Popup>
                        </Marker>
                    ))}
                    <GeoJSON data={F04_FutureMTRstation.features} color="#DADADA"/>
                    </LayerGroup>
                </LayersControl.Overlay>


                <LayersControl.Overlay name="F05 Bus Stop">
                    <GeoJSON data={F05_BusStop}  key='marker3'/>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="F06 Green Mini Bus">
                    <GeoJSON data={F06_GMB}  key='marker4'/>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="F04 Hospital">
                    <LayerGroup>
                    {Hospital.map((location) => (
                        <Marker
                            key={location.name}
                            position={location.position}                                
                            icon={GetIcon3(5)}
                        >
                            <Popup>
                                {location.name}
                            </Popup>
                        </Marker>
                    ))}
                    </LayerGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="F08 Secondary School">
                    <GeoJSON data={F08_SecondarySchool}  key='marker1'/>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="F11 Industry Land">
                <GeoJSON data={F11_Industry.features} color="#4590FF"/>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="F14 Open Space Recreation">
                <GeoJSON data={F14_OpenSpaceRecreation.features} color="#00FF7F"/>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="F15 Furture Development Node">
                <GeoJSON data={F15_devnode.features} color="#4590FF"/>
                </LayersControl.Overlay>

                <LayersControl.Overlay checked name="District Boundary">
                <GeoJSON data={district.features} 
                 style={() => (
                    {
                        color:"#D3D3D3",
                        weight: 0.6                    
                })}
                />
                </LayersControl.Overlay>
                </LayersControl>

                <LayersControl collapsed={false} position="topright">
                    <LayersControl.Overlay checked name="Tuen Mun">
                        <GeoJSON onEachFeature={onEachFeature} data={brownfield.features}
                        
                        filter={onFilter1}

                        style={(feature) => (
                            {
                            color:'#964B00',
                            weight: 0.5,
                            fillColor: states_color(feature.properties.potential),
                            fillOpacity: 0.6,
                        })}/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Yuen Long">
                        <GeoJSON onEachFeature={onEachFeature} data={brownfield.features}
            
                        filter={onFilter2}

                        style={(feature) => (
                            {
                            color:'#964B00',
                            weight: 0.5,
                            fillColor: states_color(feature.properties.potential),
                            fillOpacity: 0.6,
                        })}/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="North">
                        <GeoJSON onEachFeature={onEachFeature} data={brownfield.features}
            
                        filter={onFilter3}

                        style={(feature) => (
                            {
                            color:'#964B00',
                            weight: 0.5,
                            fillColor: states_color(feature.properties.potential),
                            fillOpacity: 0.6,
                        })}/>
                    </LayersControl.Overlay>
                </LayersControl>   
              </MapContainer>
              <Legend legendItems={legendItemsReverse} />
            </div>
            <br></br>

            <div className="row">
                <div className="col-6">
                <div className="row">
                    <b>Filter by District:</b>&nbsp;&nbsp;
                    <Button type="primary" onClick={handleClick4}>All District</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={handleClick}>Tuen Mun</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={handleClick2}>Yuen Long</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={handleClick3}>North</Button>
                </div>
                <br></br>
                    <div className="row">
                        {
                            statusCards.map((item, index) => (
                                <div className="col-6" key={index}>
                                    <StatusCard
                                        icon={item.icon}
                                        count={item.count}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-6">
                    <div className="card full-height">
                        <div className="card__header">
                            <h3>Number of brownfield by District</h3>
                        </div>
                        {/* chart */}
                        <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...chartOptions.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...chartOptions.options,
                                theme: { mode: 'light'}
                            }}
                            series={chartOptions.series}
                            type='bar'
                            height='100%'
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="card full-height">
                        <div className="card__header">
                            <h3>Total Area of Brownfield by District (Heactare)</h3>
                        </div>
                        {/* chart */}
                        <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...chartOptions2.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...chartOptions2.options,
                                theme: { mode: 'light'}
                            }}
                            series={chartOptions2.series}
                            type='bar'
                            height='100%'
                        />
                    </div>                    
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card__header">
                            <h3>Distribution of Different Level of Brownfield</h3>
                        </div>
                            {/* chart */}
                            <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...chartOptions3.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...chartOptions3.options,
                                theme: { mode: 'light'}
                            }}
                            series={chartOptions3.series}
                            type='bar'
                            height='100%'
                        />
                    </div>
                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card__header">
                            <h3>Latest News</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={latestOrders.header}
                                renderHead={(item, index) => renderOrderHead(item, index)}
                                bodyData={latestOrders.body}
                                renderBody={(item, index) => renderOrderBody(item, index)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard