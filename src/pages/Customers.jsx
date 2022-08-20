import { Table } from 'antd';
import React from 'react';
import bf from '../assets/JsonData/bf.json'

const columns = [
  {
    title: 'Brownfield ID',
    dataIndex: 'key',
  },
  {
    title: 'Land Use',
    dataIndex: 'F12_LandUse',
  },
  {
    title: '01_Social',
    dataIndex: 'Social',
  },
  {
    title: '02_Economic',
    dataIndex: 'Economic',
  },
  {
    title: '03_Physical',
    dataIndex: 'Physical',
  },
  {
    title: '04_Environmental',
    dataIndex: 'Environmental',
  },
  {
    title: 'Potential Level',
    dataIndex: 'potential',
  },
  {
    title: 'District',
    dataIndex: 'District_Eng',
    filters: [
      {
        text: 'Tuen Mun',
        value: 'Tuen Mun',
      },
      {
        text: 'Yuen Long',
        value: 'Yuen Long',
      },

      {
        text: 'North',
        value: 'North',
      },
    ],
    onFilter: (value, record) => record.District_Eng.indexOf(value) === 0,
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const Customers = () => 
  <div>
    <h2 className="page-header">Analysis Brownfield Data</h2>  
    <Table columns={columns} dataSource={bf} onChange={onChange} />
  </div>;

export default Customers;