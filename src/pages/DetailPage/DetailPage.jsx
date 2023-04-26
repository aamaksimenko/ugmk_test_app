import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { options } from '../../consts/circularDiagram';
import { getProductData } from '../../utils/utils';

import style from './index.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DetailPage = () => {
  const {factory_id, month} = useParams();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/products?factory_id=${factory_id}`).then(({ data }) => {
      const fabr = data.filter(item => item.date?.split('/')[1] === month);
      console.log(getProductData(fabr))
      setChartData(getProductData(fabr));
  });
  }, [factory_id, month])

  return (
    <div className={style.wrap}>
      <div className={style.circle}>
        {chartData ? <Pie data={chartData} options={options} /> : null}
      </div>
    </div>
  )
}
