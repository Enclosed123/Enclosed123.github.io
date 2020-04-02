// 全国各省份互联网从业人数
(function() {
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  var option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["北京", "广东", "浙江", "上海", "江苏", "四川", "重庆", "山东","福建","湖北","其他"],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: "#fff",
          fontSize: "12"
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        name:"(单位:万)",
        nameTextStyle:{
          color:"#fff"
        },
        axisLabel: {
          color: "#fff"
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "从业人数",
        type: "bar",
        barWidth: "60%",
        data: [417.8, 346.7, 193.3, 132.1, 128.9, 60.7, 56.6,47.3,42.4,42.2,209.3]
      }
    ]
  };
  window.addEventListener("resize",function(){
    myChart.resize();
  })
  myChart.setOption(option);
})();





// 岗位分布占比
(function() {
  var myChart = echarts.init(document.querySelector(".line .chart"));
  var option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 0,
        data: ['技术', '市场销售', '运营', '设计', '产品', '职能',],
        textStyle:{
          color:"#ffeb7b"
        }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
                position: 'inner'
            },
            labelLine: {
                show: false
            },

        },
        {
            name: '岗位分类',
            type: 'pie',
            radius: ['40%', '75%'],

            data: [
              {value: 1800000, name: '市场销售'},
              {value: 1600000, name: '运营'},
              {value: 800000, name: '设计'},
              {value: 680000, name: '产品'},
              {value: 600000, name: '职能'},
              {value: 8000000, name: '技术'},

            ]
        }
    ]
};
window.addEventListener("resize",function(){
  myChart.resize();
})
  myChart.setOption(option);
})();



// 中国地图
(function() {
  var myChart = echarts.init(document.querySelector(".map .chart"));

var name_title = "互联网行业发达地区"
var subname = '(单位:万)'
var nameColor = " rgb(251, 198, 129)"
var name_fontFamily = '等线'
var subname_fontSize = 15
var name_fontSize = 18
var mapName = 'china'
var data = [
    {name:"北京",value:417.8},
    {name:"广东",value:346.7},
    {name:"浙江",value:193.3},
    {name:"上海",value:132.1},
    {name:"江苏",value:128.9},
    {name:"四川",value:60.7},
    {name:"重庆",value:56.6},
    {name:"山东",value:47.3},
    {name:"福建",value:42.4},
    {name:"湖北",value:42.2},
    ];
    
var geoCoordMap = {};
var toolTipData = [ 
    {name:"北京",value:[{name:"人数",value:417.8}]},
    {name:"广东",value:[{name:"人数",value:346.7}]},
    {name:"浙江",value:[{name:"人数",value:193.3}]},
    {name:"上海",value:[{name:"人数",value:132.1}]},
    {name:"江苏",value:[{name:"人数",value:128.9}]},
    {name:"四川",value:[{name:"人数",value:60.7}]},
    {name:"重庆",value:[{name:"人数",value:56.6}]},
    {name:"山东",value:[{name:"人数",value:47.3}]},
    {name:"福建",value:[{name:"人数",value:42.4}]},
    {name:"湖北",value:[{name:"人数",value:42.2}]},
];

/*获取地图数据*/
myChart.showLoading();
var mapFeatures = echarts.getMap(mapName).geoJson.features;
myChart.hideLoading();
mapFeatures.forEach(function(v) {
    // 地区名称
    var name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp;

});

// console.log("============geoCoordMap===================")
// console.log(geoCoordMap)
// console.log("================data======================")
console.log(data)
console.log(toolTipData)
var max = 480,
    min = 9; // todo 
var maxSize4Pin = 100,
    minSize4Pin = 20;

var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
};
option = {
    title: {
        text: name_title,
        subtext: subname,
        x: 'center',
        textStyle: {
            color: nameColor,
            fontFamily: name_fontFamily,
            fontSize: name_fontSize
        },
        subtextStyle:{
            fontSize:subname_fontSize,
            fontFamily:name_fontFamily
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            if (typeof(params.value)[2] == "undefined") {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                    if(params.name==toolTipData[i].name){
                        toolTiphtml += toolTipData[i].name+':<br>'
                        for(var j = 0;j<toolTipData[i].value.length;j++){
                            toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                        }
                    }
                }
                console.log(toolTiphtml)
                // console.log(convertData(data))
                return toolTiphtml;
            } else {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                    if(params.name==toolTipData[i].name){
                        toolTiphtml += toolTipData[i].name+':<br>'
                        for(var j = 0;j<toolTipData[i].value.length;j++){
                            toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                        }
                    }
                }
                console.log(toolTiphtml)
                // console.log(convertData(data))
                return toolTiphtml;
            }
        }
    },
    // legend: {
    //     orient: 'vertical',
    //     y: 'bottom',
    //     x: 'right',
    //     data: ['credit_pm2.5'],
    //     textStyle: {
    //         color: '#fff'
    //     }
    // },

    /*工具按钮组*/
    // toolbox: {
    //     show: true,
    //     orient: 'vertical',
    //     left: 'right',
    //     top: 'center',
    //     feature: {
    //         dataView: {
    //             readOnly: false
    //         },
    //         restore: {},
    //         saveAsImage: {}
    //     }
    // },
    geo: {
        show: true,
        map: mapName,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false,
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: 'rgba(0,24,110,0.5)',
                borderColor: '#3B5077',
            },
            emphasis: {
                areaColor: '#2B91B7',
            }
        }
    },
    series: [{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#05C3F9'
                }
            }
        },
        {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
            data: data
        },
        {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function(val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a * min;
                b = maxSize4Pin - a * max;
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 9,
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#F62157', //标志颜色
                }
            },
            zlevel: 6,
            data: convertData(data),
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function(a, b) {
                return b.value - a.value;
            }).slice(0, 5)),
            symbolSize: function(val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'yellow',
                    shadowBlur: 10,
                    shadowColor: 'yellow'
                }
            },
            zlevel: 1
        },

    ]
};
myChart.setOption(option);
 
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();

// 全国不同年龄段月薪
(function() {
  var myChart = echarts.init(document.querySelector(".pie .chart"));
  var option = {

    title: {
        left: "center",
        bottom: "5%",
        textStyle: {
            color: "#fff",
            fontSize: 16
        }
    },
    grid: {
        top: '20%',
        left: '10%',
        right: '10%',
        bottom: '15%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['20', '25', '30', '35', '40', '45'],
        axisLabel: {
            margin: 30,
            color: '#ffffff63'
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: true,
            length: 25,
            lineStyle: {
                color: "#ffffff1f"
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#ffffff1f'
            }
        }
    },
    yAxis: [{
        type: 'value',
        position: 'right',
        axisLabel: {
            margin: 20,
            color: '#ffffff63'
        },

        axisTick: {
            show: true,
            length: 15,
            lineStyle: {
                color: "#ffffff1f",
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#ffffff1f'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff',
                width: 2
            }
        }
    }],
    series: [{
        name: '注册总量',
        type: 'line',
        smooth: true, //是否平滑曲线显示
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
            normal: {
                color: "#fff", // 线条颜色
            },
        },
        label: {
            show: true,
            position: 'top',
            textStyle: {
                color: '#fff',
            }
        },
        itemStyle: {
            color: "red",
            borderColor: "#fff",
            borderWidth: 3
        },
        tooltip: {
            show: false
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#eb64fb'
                    },
                    {
                        offset: 1,
                        color: '#3fbbff0d'
                    }
                ], false),
            }
        },
        data: [ 6458, 10258, 14587,16114,19145,21457]
    }]
};

  window.addEventListener("resize",function(){
    myChart.resize();
  })
  myChart.setOption(option);
})();


// 跳槽情况
(function() {
  var myChart = echarts.init(document.querySelector(".bar2 .chart"));
  var option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["无", "1次", "2次", "3次", "4次", "5次", "6次以上"],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: "#fff",
          fontSize: "12"
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        nameTextStyle:{
          color:"#fff"
        },
        axisLabel: {
          color: "#fff",
          formatter: '{value} %'  
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "跳槽占比",
        type: "bar",
        barWidth: "60%",
        data: [17.6,15.8,18.8,24.2,10.3,6.1,7.3]
      }
    ]
  };
  window.addEventListener("resize",function(){
    myChart.resize();
  })
  myChart.setOption(option);
})();

// 公司属性
(function(){
  var myChart = echarts.init(document.querySelector(".line2 .chart"))
  var option = {

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        left: 'center',
        top: 'bottom',
        data: ['民营企业', '自由职业者', '国有企业', '中外合资企业', '外商独资企业', '其他'],
        textStyle:{
          color:"#ffeb7b"
        }
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            magicType: {
                show: true,
                type: ['pie', 'funnel']
            },

        }
    },
    series: [
        {
            name: '公司属性',
            type: 'pie',
            radius: [20, 60],
            center: ['55%', '40%'],
            roseType: 'radius',
            label: {
                show: false,
                　　　　normal : {
                　　　　　　formatter: '{b}: ({d}%)',
                　　　　　　textStyle : {
                　　　　　　　　fontWeight : 'normal',
                　　　　　　　　fontSize : 15
                　　　　　　}
                　　　　}
            },
            emphasis: {
                label: {
                    show: true
                }
            },
            data: [
                {value: 69.7, name: '民营企业'},
                {value: 19.4, name: '自由职业者'},
                {value: 3.6, name: '国有企业'},
                {value: 3, name: '中外合资企业'},
                {value: 2.4, name: '外商独资企业'},
                {value: 1.8, name: '其他'},
            ]
        },

    ]
};

  myChart.setOption(option)
})();

// 离职原因
(function() {
  var myChart = echarts.init(document.querySelector(".pie2 .chart"));
  var option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["北京", "杭州", "上海", "西安", "南京", "广州", "深圳", "长沙","武汉","成都"],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: "#fff",
          fontSize: "12"
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        nameTextStyle:{
          color:"#fff"
        },
        axisLabel: {
          color: "#fff",
          formatter: '{value} %'  
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "加班比例",
        type: "bar",
        barWidth: "60%",
        data: [68, 67, 66, 65, 65, 62, 59,58,57,52]
      }
    ]
  };
  window.addEventListener("resize",function(){
    myChart.resize();
  })
  myChart.setOption(option);
})();
