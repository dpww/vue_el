export function scattePoint(data,nameList,ecStat) {
  var clusterNumber = nameList.length;

  let datas = [];
  data.forEach(item => {
    let random = () => Math.round(Math.random() * 100);
    datas.push([random(), random()]);
  });
  var step = ecStat.clustering.hierarchicalKMeans(datas, clusterNumber, true);
  var result;
  var option = {
    timeline: {
      top: 'center',
      show: false, //是否显示 timeline 组件。如果设置为false，不会显示，但是功能还存在。
      right: 35,
      height: 300,
      width: 10,
      inverse: true,
      playInterval: 2500, // 表示播放的速度（跳动的间隔），单位毫秒（ms）。
      symbol: 'none',
      orient: 'vertical', // 竖直放置。
      axisType: 'category', //类目轴，适用于离散的类目数据。
      autoPlay: false, // 表示是否自动播放。
      label: {
        normal: {
          show: false
        },
      },
      data: []
    },
    baseOption: {
      title: {
        text: '各通路历史费效比',
        // subtext: 'By ecStat.hierarchicalKMeans',
        left: 'center'
      },
      xAxis: [{
          offset: -230,
          nameGap: 0,
          splitLine: {
            show: false
          },
          type: 'value'
        },
        {
          type: 'value',
          data: (function() {
            var res = [];
            var len = 10;
            while (len--) {
              res.push(10 - len - 1);
            }
            return res;
          })(),
          axisLine: {
            show: false
          }
        }
      ],
      yAxis: [{
          type: 'value',
          offset: -225,
          nameGap: 0,
          splitLine: {
            show: false
          }
        },
        {
          type: 'value',
          data: (function() {
            var res = [];
            var len = 10;
            while (len--) {
              res.push(10 - len - 1);
            }
            return res;
          })(),
          axisLine: {
            show: false
          }
        }
      ],
      series: [{
        symbolSize: 14, // 控制散点的大小
        type: 'scatter', // 表明就是散点图
        data: [], // 连接数据
      }],
      legend: {
        bottom: 0,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          fontSize: 16
        },
        data: nameList
      },
      grid: {
        bottom: '15%',
        containLabel: true
      },
    },

    options: []
  };
  for (var i = 0; !(result = step.next()).isEnd; i++) {
    option.options.push(getOption(result, clusterNumber));
    option.timeline.data.push(i + '');
  }
  function getOption(result, k) {

    //var clusterAssment = result.clusterAssment;
    //var centroids = result.centroids;
    var ptsInCluster = result.pointsInCluster;
    var colorList =['#2B94FF','#606EFE','#FD7949','#FFBC49','#FBEB19','#37E1FD','#acdf82','#4ecb73','#edb58d','#f2637b'
    ,'#e297da','#88d1ea','#36cbcb','#82dfbe','#5254cf','#435188','#94d8f6','#ff7f27']
    var series = [];
    for (let i = 0; i < k; i++) {
      series.push({
        name: nameList[i],
        type: 'scatter',
        animation: false,
        data: datas[i],
      });
    }
    return {
      tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (obj) {
          var value = obj.value;
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'+ '费效比' +'</div>'
            + obj.marker + obj.seriesName + '<br>'
            + '前三月成交率'+ '：' + value[0] + '%' + '<br>'
            + '前三月月均成交成本' + '：' + value[1]+ '<br>'
        }
      },
      series: series,
      color: colorList,
    };
  }
  return option;
}
