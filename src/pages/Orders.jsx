import React from 'react'
import { Typography} from 'antd';
import tb from '../assets/images/tb.png'
import datatb from '../assets/images/datatb.png'
import gis from '../assets/images/gis.png'
import gis2 from '../assets/images/gis2.png'
const {Text} = Typography;

const Orders = () => {
    return (
        <div>
            <h2 className="page-header">Analysis Mehtod</h2>
            <div className="row">
                <div className="col-8">
                    <div className="card full-height"><Text style={{fontSize:25}}>
                        1. For the data preparation, the spatial data are captured from different government Department or private sectors.
                        </Text><img src={datatb} width={900} />
                    </div>             
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <div className="card full-height"><Text style={{fontSize:25}}>
                        2. After data preparation, we calculate the distance between every brownfield and spatial factors by using GIS tools.
                        </Text><img src={gis} width={900} />
                    </div>             
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <div className="card full-height"><Text style={{fontSize:25}}>
                        3. The score of brownfield are divided into 4 categories according to the research about Hierarchical structure of land valuation 
                        geospatial factors and sub-factors (Bencure et al., 2019). 
                        </Text><img src={tb} width={900} />
                    </div>             
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <div className="card full-height"><Text style={{fontSize:25}}>
                        4. Summarize the results, then perform the classification method to the brownfield to determine the potential level.
                        </Text><img src={gis2} width={900} />
                    </div>             
                </div>
            </div>
        </div>
    )
}

export default Orders
