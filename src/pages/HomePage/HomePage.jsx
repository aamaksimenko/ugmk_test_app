import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Select } from '@consta/uikit/Select';
import { getChartData } from '../../utils/utils';
import { filters } from '../../consts/filter';
import { options } from '../../consts/diagram';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';


import './index.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const savedFilter = JSON.parse(localStorage.getItem('filter'));

export const HomePage = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(savedFilter ?? filters[0]);
  const [fabr1, setFabr1] = useState(null);
  const [fabr2, setFabr2] = useState(null);

  const navigate = useNavigate();
  const chartRef = useRef();  

  useEffect(() => {
    axios.get('http://localhost:3001/products').then(({ data }) => {
      const fabr1 = data.filter(item => item.factory_id === 1);
      const fabr2 = data.filter(item => item.factory_id === 2);
      setChartData(getChartData(fabr1, fabr2)); 
      setFabr1(fabr1);
      setFabr2(fabr2);
    });
  }, [])

  useEffect(() => {
    if (Boolean(fabr1) && Boolean(fabr2)) {
      setChartData(getChartData(fabr1, fabr2, selectedFilter.id));
    }
  }, [selectedFilter, fabr1, fabr2])

  const onClick = (event) => {
    const [clickFabric] = getElementAtEvent(chartRef.current, event)
    if (!clickFabric) return;

    const factory_id = clickFabric.datasetIndex + 1;
    const month = clickFabric.index + 1;
    navigate(`/details/${factory_id}/${month}`);
  }

  return (
    <div className="wrap">
      <div className="filter">
        <p className="placeholder_filter">Фильтр по типу продукции</p>
        <div className="select_wrapper">
          <Select
            items={filters}
            value={selectedFilter}
            onChange={({ value }) => {
                localStorage.setItem('filter', JSON.stringify(value));
                setSelectedFilter(value)
              }
            }
          />
        </div>

      </div>
      <div className="card">
        {chartData ? <Bar options={options} data={chartData} onClick={onClick} ref={chartRef} /> : null}
      </div>
    </div>

)};
