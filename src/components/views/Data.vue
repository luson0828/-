<template>
    <div>
        <div style="display: flex; grid-gap: 10px;">
            <div class="card1" style="flex: 1; height:400px; margin-left: 10px; margin-top: 10px;" id="bar"></div>
            <div class="card1" style="flex: 1; height:400px; margin-right: 10px; margin-top: 10px;" id="line"></div>
        </div>

        <div style="display: flex; grid-gap: 10px;" >
            <div class="card1" style="flex: 1; height:400px; margin-left: 10px; margin-right: 10px; " id="pie"></div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import * as echarts from 'echarts';
import request from "@/utils/request";


const barOption = {
    title: {
        text: '各部门员工数量'
    },
    tooltip: {}, // 提示框组件
    legend: { // 图例组件
        data: ['人数']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [
        {
            name: '人数',
            type: 'bar',
            data: []
        }
    ]
}

const lineOption = {
    title: {
        text: '近七天发布文章的数量'
    },
    tooltip: {},
    legend: {
        trigger: 'item'
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [
        {
            name: '发布文章数量',
            type: 'line',
            data: [],
            smooth: true
        }
    ]
}

const pieOption = {
  title: {
    text: '各部门员工数量比例图',
    left: 'center'
  },
   tooltip: {},
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
     {
      name: '员工数量',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};


// OnMounted 表示页面所有的dom元素都初始化完成
onMounted(() => {
    // 基于准备好的dom，初始化echarts实例（柱状图）
    const barChart = echarts.init(document.getElementById('bar'))

    request.get('/barData').then(res => {
        barOption.xAxis.data = res.data.department // 横轴数据
        barOption.series[0].data = res.data.count // 纵轴数据
        // 使用刚指定的配置项和数据显示图表
        barChart.setOption(barOption);
        // 让图表自适应容器大小
        barChart.resize();
    })

    // 监听窗口大小变化，重新调整图表大小
    window.addEventListener('resize', () => {
        barChart.resize();
    });



    // 基于准备好的dom，初始化echarts实例（折线图）
    const lineChart = echarts.init(document.getElementById('line'))

        request.get('/lineData').then(res => {
        lineOption.xAxis.data = res.data.date // 横轴数据
        lineOption.series[0].data = res.data.count // 纵轴数据
        // 使用刚指定的配置项和数据显示图表
        lineChart.setOption(lineOption);
        // 让图表自适应容器大小
        lineChart.resize();
    })

    // 监听窗口大小变化，重新调整图表大小
    window.addEventListener('resize', () => {
        lineChart.resize();
    });




     // 基于准备好的dom，初始化echarts实例（饼图）
    const pieChart = echarts.init(document.getElementById('pie'))

        request.get('/pieData').then(res => {
        pieOption.series[0].data = res.data
        // 使用刚指定的配置项和数据显示图表
        pieChart.setOption(pieOption);
        // 让图表自适应容器大小
        pieChart.resize();
    })

    // 监听窗口大小变化，重新调整图表大小
    window.addEventListener('resize', () => {
        lineChart.resize();
    });
})







</script>

<style scoped>



</style>