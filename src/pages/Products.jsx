import React from 'react'
import view from '../assets/images/view.png'
import north from '../assets/images/North.jpg'
import mtr from '../assets/images/NorthMTR.jpg'
import { Typography, Image } from 'antd';

const {Text} = Typography;

const Products = () => {
    return (
        <div>
            <h2 className="page-header">Background</h2>
            <div className="row">
                <div className="col-6">
                    <div className="card full-height">
                        <img src={view} width={700} />
                    </div>
                 </div>
                 <div className="col-6">
                    <div className="card full-height">
                    <Text style={{fontSize:25}}>
                    In recent years, the housing issues in Hong Kong have been becoming more and more serious. According to the Urban Reform Institute study in 2020, Hong Kong had the world’s least affordable housing market. Increasing the land supply is likely to be one of the methods to alleviate the housing issues. There were about 1414 hectares of active brownfield sites (Planning Department, Arup, 2019). If the potential brownfield in the New Territories could be investigated and developed, it may release a considerable amount of land.
                    </Text>
                    
                    </div>
                 </div>
                 <div className="col-6">
                    <div className="card full-height">
                    <Text style={{fontSize:25}}>
                    The Northern Metropolis Development Strategy (the Development Strategy) proposes to expand the Northern Economic
                    Belt under the Hong Kong 2030+ to cover new towns in Yuen Long, Tin Shui Wai and
                    Fanling/Sheung Shui, various NDAs and development nodes in different planning and
                    construction stages as well as their neighboring rural areas, and to consolidate the
                    above into a holistic metropolis with a total area of 30 000 hectares.
                    </Text>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <Text style={{fontSize:15}}> Source: The Government of the Hong Kong Special Administrative Region - Press Releases</Text>
                    </div>
                 </div>
                 <div className="col-6">
                    <div className="card full-height">
                        <img src={north} width={700} />
                    </div>
                 </div>
                 <div className="col-6">
                    <div className="card full-height">
                        <img src={mtr} width={700} />
                    </div>
                 </div>
                 <div className="col-6">
                    <div className="card full-height">
                    <Text style={{fontSize:25}}>
                    The Northern Link (NOL) is one of the seven recommended railway schemes in the Railway Development Strategy 2014. The project comprises Kwu Tung (KTU) Station and construction of a 10.7-kilometre-long railway link between the existing Kam Sheung Road (KSR) Station of West Rail Line (WRL) and KTU Station. The MTRCL proposed that the construction of the NOL would be carried out in two phases. Phase 1 would be KTU Station on the Lok Ma Chau Spur Line; and Phase 2 would be the NOL Main Line between KSR Station and KTU Station, with three intermediate stations at San Tin, Ngau Tam Mei and Au Tau. 
                    </Text>
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                    <Text style={{fontSize:15}}> Source: 2021 Policyaddress</Text>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default Products
