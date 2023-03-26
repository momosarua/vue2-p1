<template>
    <div class="data-view">
        <el-card>
            <div id="main1"></div>
        </el-card>
        <el-card>
            <div id="main2"></div>
        </el-card>
    </div>
</template>

<script>
import { getDataView } from "@/api/dataview";
export default {
    data() {
        return {
            mapData: {},
            myChart: null,
            option: {}
        };
    },
    methods: {
      draw() {
        this.option = {
            title: {
                text: "ECharts 入门示例",
            },
            tooltip: {},
            legend: {
                data: this.mapData.legend,
            },
            xAxis: {
                data: this.mapData.xAxis,
            },
            yAxis: {},
            series: this.mapData && this.mapData.series
        };
        this.myChart.setOption(this.option);
      }
    },
    created() {
        getDataView().then((res) => {
            this.mapData = {
                legend: res.data.legend,
                series: res.data.series,
                xAxis: res.data.xAxis,
            };
            this.draw()
        });
    },
    mounted() {
        this.myChart = this.$echarts.init(document.getElementById("main1"));
        let myChart = this.$echarts.init(document.getElementById("main2"));
        var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
};
</script>

<style lang="scss" scoped>
.data-view {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .el-card {
        width: 50%;
        #main1,
        #main2 {
            height: 500px;
        }
    }
}
</style>