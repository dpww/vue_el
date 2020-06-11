<template>
  <div class="rateWatch">
    <div class="containter">
      <div class="top">
        <div class="project">
          {{plan.project_name}}
          <span style="font-size:12px">{{plan.projectCode}}</span>
        </div>
        <div class="info">
          <span>{{plan.area_name}}</span>
          <span>当前节点</span>
          <span>{{plan.node_name}}</span>
          <span>计划:{{plan.plan_end_time}}</span>
          <span v-if="plan.overday_num!=null">实际:逾期{{plan.overday_num}}天</span>
          <span>
            <img class="img_light" src="../../assets/images/green.png" alt />
            按时完成
            <img class="img_light" src="../../assets/images/redRight.png" alt />
            逾期完成
            <img class="img_light" src="../../assets/images/red.png" alt />
            逾期未完成
            <img class="img_light" src="../../assets/images/warning.png" alt />
            预警提醒
            <img class="img_light" src="../../assets/images/edit.png" alt />
            待填报
          </span>
        </div>
        <el-button class="realTimeBtn" type="primary" @click="isShowPlan=!isShowPlan">
          <span style="font-size:12px">实时客储计划</span>
        </el-button>
      </div>
      <div v-show="isShowPlan" class="nowPlan">
        <el-table
          :data="realPlanData"
          :header-cell-style="{background:'#F5F7FA',color:'#999'}"
          :span-method="mergeCol"
          border
          style="width: 100%"
        >
          <el-table-column prop="nide_name" label="节点" width="180"></el-table-column>
          <el-table-column prop="node_time" label="日期" width="180"></el-table-column>
          <el-table-column prop="line_name" label></el-table-column>
          <el-table-column prop="report_num" label="报备"></el-table-column>
          <el-table-column prop="visit_num" label="来访"></el-table-column>
          <el-table-column prop="little_num" label="小卡"></el-table-column>
          <el-table-column prop="little_per" label="小卡率">
            <template slot-scope="scope">{{scope.row.little_per | fixed}}</template>
          </el-table-column>
          <el-table-column prop="big_num" label="大卡"></el-table-column>
          <el-table-column prop="big_per" label="大卡率">
            <template slot-scope="scope">{{scope.row.big_per | fixed}}</template>
          </el-table-column>
          <el-table-column prop="sub_num" label="认购"></el-table-column>
          <el-table-column prop="make_per" label="成交率">
            <template slot-scope="scope">{{scope.row.make_per | fixed}}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="content">
        <div class="steps">
          <h4>项目信息快速查看</h4>
          <div class="step" v-for="(item,index) in stepsList" :key="index">
            <div v-if="index!='0'" class="line_t"></div>
            <div class="line_b" v-if="index!=stepsList.length-1"></div>
            <div class="status">
              <div class="date">{{item.plan_end_time | FomartDate}}</div>
              <div class="info" @click="toViewLink(item.node_order)">{{item.node_name}}</div>
              <img
                class="img_light"
                v-if="item.light_stuat==3"
                src="../../assets/images/green.png"
                alt
              />
              <img
                class="img_light"
                v-else-if="item.light_stuat==4"
                src="../../assets/images/redRight.png"
                alt
              />

              <img
                class="img_light"
                v-else-if="item.light_stuat==5"
                src="../../assets/images/red.png"
                alt
              />
              <img
                class="img_light"
                v-else-if="item.light_stuat==6"
                src="../../assets/images/warning.png"
                alt
              />

              <img class="img_light" v-else src="../../assets/images/edit.png" alt />
            </div>
          </div>
        </div>
        <div class="tableDate">
          <div class="item" id="link1">
            <div class="title">
              拿地后核心指标
              <el-button @click="moreClick(1)" type="text" class="hoverChangeColor">查看更多</el-button>
            </div>
            <div class="table">
              <el-table
                :data="getLandList"
                :header-cell-style="{background:'#EFEFEF',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column prop="product_set" label="产品系" align="center" width="180"></el-table-column>
                <el-table-column label="整盘货值(万)" align="center" width="180">
                  <el-table-column prop="will_front_value" align="center" label="上会版"></el-table-column>
                  <el-table-column prop="land_back_value" align="center" label="拿地后"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="整盘费率(%)">
                  <el-table-column prop="will_per" align="center" label="上会版">
                    <template slot-scope="scope">{{scope.row.will_per | fixed}}</template>
                  </el-table-column>
                  <el-table-column prop="land_per" align="center" label="拿地后">
                    <template slot-scope="scope">{{scope.row.land_per | fixed}}</template>
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="首开指标">
                  <el-table-column prop="will_price" align="center" label="上会版"></el-table-column>
                  <el-table-column prop="land_back_price" align="center" label="拿地后"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="首年指标">
                  <el-table-column prop="will_price2" align="center" label="上会版"></el-table-column>
                  <el-table-column prop="land_back_price2" align="center" label="拿地后"></el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="item" id="link2">
            <div class="title">
              顶设1核心指标
              <el-button type="text" @click="moreClick(2)" class="hoverChangeColor">查看更多</el-button>
            </div>
            <div class="table">
              <el-table
                :data="setFirstList"
                :header-cell-style="{background:'#EFEFEF',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column prop="product_set" label="产品系" align="center" width="180"></el-table-column>
                <el-table-column label="整盘货值(万)" align="center" width="180">
                  <el-table-column prop="designonel_front_value" align="center" label="上会版"></el-table-column>
                  <el-table-column prop="land_back_value" align="center" label="拿地后"></el-table-column>
                </el-table-column>
                <el-table-column prop="num" align="center" label="首开指标">
                  <el-table-column prop="will_price" align="center" label="上会版"></el-table-column>
                  <el-table-column prop="land_back_price" align="center" label="拿地后"></el-table-column>
                </el-table-column>
                <el-table-column prop="num" align="center" label="首年指标">
                  <el-table-column prop="will_price2" align="center" label="上会版"></el-table-column>
                  <el-table-column prop="land_back_price2" align="center" label="拿地后"></el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="item" id="link3">
            <div class="title">
              顶设2核心指标
              <el-button type="text" @click="moreClick(3)" class="hoverChangeColor">查看更多</el-button>
            </div>
            <div class="table">
              <el-table
                :data="setSecondList"
                :header-cell-style="{background:'#EFEFEF',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column
                  prop="designtwo_push_value"
                  label="首开货值(万)"
                  align="center"
                  width="180"
                ></el-table-column>
                <el-table-column
                  align="center"
                  v-for="(item,index) in setSecondNameList"
                  :key="index"
                  width="300"
                  :label="'首开均价-'+item.product_type"
                >{{item.designtwo_open_avg_price}}</el-table-column>
                <el-table-column prop="cost_open_sales_price" align="center" label="首开费率(%)">
                  <template
                    slot-scope="scope"
                  >{{scope.row&&scope.row.cost_open_sales_price | fixed}}</template>
                </el-table-column>
                <el-table-column prop="sub_num" align="center" label="认购"></el-table-column>
                <el-table-column prop="big_num" align="center" label="大卡"></el-table-column>
                <el-table-column prop="little_num" align="center" label="小卡"></el-table-column>
                <el-table-column prop="visit_num" align="center" label="来人"></el-table-column>
                <el-table-column prop="make_per" align="center" label="成交率(%)">
                  <template slot-scope="scope">{{scope.row && scope.row.make_per | fixed}}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="item" id="link4">
            <div class="title">
              开盘前3个月累计客储情况
              <el-button type="text" @click="moreClick(4)" class="hoverChangeColor">查看更多</el-button>
            </div>
            <div class="table">
              <div class="table_body">
                <div class="t_left">
                  <div class="t_cell" v-for="(item,index) in NameList" :key="index">{{item.type}}</div>
                </div>
                <div class="t_right">
                  <div class="scrollBox">
                    <div class="t_item" v-for="(item,index) in threeMonthList" :key="index">
                      <div class="t_cell">{{item.day_date}}</div>
                      <div class="t_cell">{{item.actual_total}}</div>
                      <div class="t_cell">{{item.plan_total}}</div>
                      <div class="t_cell">{{item.bias_per | fixed}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="table">
              <el-table
                :data="threeMonthValueList"
                border
                :header-cell-style="{background:'#EFEFEF',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column prop="line_name" label="类别" align="center" width="180"></el-table-column>
                <el-table-column prop="report_num" align="center" label="报备"></el-table-column>
                <el-table-column prop="visit_num" align="center" label="来访"></el-table-column>
                <el-table-column prop="little_num" align="center" label="小卡"></el-table-column>
                <el-table-column prop="big_num" align="center" label="大卡"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="item" id="link5">
            <div class="title">
              开盘前2个月累计客储情况
              <el-button type="text" @click="moreClick(5)" class="hoverChangeColor">查看更多</el-button>
            </div>
            <div class="table">
              <div class="table_body">
                <div class="t_left">
                  <div class="t_cell" v-for="(item,index) in NameList" :key="index">{{item.type}}</div>
                </div>
                <div class="t_right">
                  <div class="scrollBox">
                    <div class="t_item" v-for="(item,index) in twoMonthList" :key="index">
                      <div class="t_cell">{{item.day_date}}</div>
                      <div class="t_cell">{{item.actual_total}}</div>
                      <div class="t_cell">{{item.plan_total}}</div>
                      <div class="t_cell">{{item.bias_per | fixed}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="table">
              <el-table
                :data="twoMonthValueList"
                border
                :header-cell-style="{background:'#EFEFEF',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column prop="line_name" label="类别" align="center" width="180"></el-table-column>
                <el-table-column prop="report_num" align="center" label="报备"></el-table-column>
                <el-table-column prop="visit_num" align="center" label="来访"></el-table-column>
                <el-table-column prop="little_num" align="center" label="小卡"></el-table-column>
                <el-table-column prop="big_num" align="center" label="大卡"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="item" id="link6">
            <div class="title">
              开盘前21天累计客储情况
              <el-button type="text" @click="moreClick(6)" class="hoverChangeColor">查看更多</el-button>
            </div>
            <div class="table">
              <div class="table_body">
                <div class="t_left">
                  <div class="t_cell" v-for="(item,index) in NameList" :key="index">{{item.type}}</div>
                </div>
                <div class="t_right">
                  <div class="scrollBox">
                    <div class="t_item" v-for="(item,index) in twentyOneDaysList" :key="index">
                      <div class="t_cell">{{item.day_date}}</div>
                      <div class="t_cell">{{item.actual_total}}</div>
                      <div class="t_cell">{{item.plan_total}}</div>
                      <div class="t_cell">{{item.bias_per | fixed}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="table">
              <el-table
                :data="twentyOneDaysValueList"
                border
                :header-cell-style="{background:'#EFEFEF',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column prop="line_name" label="类别" align="center" width="180"></el-table-column>
                <el-table-column prop="report_num" align="center" label="报备"></el-table-column>
                <el-table-column prop="visit_num" align="center" label="来访"></el-table-column>
                <el-table-column prop="little_num" align="center" label="小卡"></el-table-column>
                <el-table-column prop="big_num" align="center" label="大卡"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="item" id="link7">
            <div class="title">
              售楼处开放
              <el-button type="text" @click="moreClick(10)" class="hoverChangeColor">查看更多</el-button>
            </div>
          </div>
          <div class="item" id="link8">
            <div class="title">
              景观样板段开放
              <el-button type="text" @click="moreClick(11)" class="hoverChangeColor">查看更多</el-button>
            </div>
          </div>
          <div class="item" id="link9">
            <div class="title">
              样板房开放
              <el-button type="text" @click="moreClick(12)" class="hoverChangeColor">查看更多</el-button>
            </div>
          </div>
          <div class="item" id="link10">
            <div class="title">
              开盘前7天累计客储情况
              <el-button type="text" @click="moreClick(7)" class="hoverChangeColor">查看更多</el-button>
            </div>
            <div class="table">
              <div class="table_body">
                <div class="t_left">
                  <div class="t_cell" v-for="(item,index) in NameList" :key="index">{{item.type}}</div>
                </div>
                <div class="t_right">
                  <div class="scrollBox">
                    <div class="t_item" v-for="(item,index) in sevenDayList" :key="index">
                      <div class="t_cell">{{item.day_date}}</div>
                      <div class="t_cell">{{item.actual_total}}</div>
                      <div class="t_cell">{{item.plan_total}}</div>
                      <div class="t_cell">{{item.bias_per | fixed}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="table">
              <el-table
                :data="sevenDayValueList"
                border
                :header-cell-style="{background:'#EFEFEF',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column prop="line_name" label="类别" align="center" width="180"></el-table-column>
                <el-table-column prop="report_num" align="center" label="报备"></el-table-column>
                <el-table-column prop="visit_num" align="center" label="来访"></el-table-column>
                <el-table-column prop="little_num" align="center" label="小卡"></el-table-column>
                <el-table-column prop="big_num" align="center" label="大卡"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="item" id="link11">
            <div class="title">
              首开
              <el-button type="text" @click="moreClick(8)" class="hoverChangeColor">查看更多</el-button>
            </div>
          </div>
          <div class="item" id="link12">
            <div class="title">
              首开后一个月
              <el-button type="text" @click="moreClick(9)" class="hoverChangeColor">查看更多</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryMonitor, monitorRealNode } from "@/api/firstPlan";
export default {
  filters: {
    FomartDate(time) {
      let date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var H = date.getHours();
      var M = date.getMinutes();
      var S = date.getSeconds();
      function Covering(num) {
        return num >= 10 ? num : "0" + num;
      }
      return y.toString().substring(2) + "-" + Covering(m) + "-" + Covering(d);
    },
    fixed: function(data) {
      if (!data) {
        return "0.00";
      } else if (isNaN(data)) {
        return "0.00";
      }
      return  ( parseInt( data * 100 ) / 100 ).toFixed(2)
    }
  },
  components: {
    navbarLink: () => import("./components/navbarLink")
  },
  data() {
    return {
      isShowPlan: false,
      getLandList: [],
      setFirstList: [],
      plan: {},
      setSecondNameList: [],
      setSecondList: [],
      sevenDayList: [],
      NameList: [
        {
          type: "周期"
        },
        {
          type: "达成"
        },
        {
          type: "目标"
        },
        {
          type: "偏差率"
        }
      ],
      sevenDayValueList: [],
      twentyOneDaysList: [],
      twentyOneDaysValueList: [],
      twoMonthList: [],
      twoMonthValueList: [],
      threeMonthList: [],
      threeMonthValueList: [],
      stepsList: [],
      realPlanData: []
    };
  },
  created() {
    this.reload();
  },
  methods: {
    toViewLink(name) {
      document.getElementById(`link${name}`).scrollIntoView();
    },
    reload() {
      queryMonitor({
        plan_id: this.$route.query.plan_id
      }).then(res => {
        this.plan = res.result.plan;
        (this.getLandList = [res.result.land]),
          (this.setFirstList = [res.result.designone]);
        if (res.result.designtwo != null && res.result.designtwo.avg != null) {
          this.setSecondNameList = res.result.designtwo.avg;
        }
        this.setSecondList = [res.result.designtwo];
        if (res.result.node_level7 != null) {
          this.sevenDayList = res.result.node_level7.week;
          this.sevenDayValueList = res.result.node_level7.node;
        }
        if (res.result.node_level6 != null) {
          this.twentyOneDaysList = res.result.node_level6.week;
          this.twentyOneDaysValueList = res.result.node_level6.node;
        }
        if (res.result.node_level5 != null) {
          this.twoMonthList = res.result.node_level5.week;
          this.twoMonthValueList = res.result.node_level5.node;
        }
        if (res.result.node_level4 != null) {
          this.threeMonthList = res.result.node_level4.week;
          this.threeMonthValueList = res.result.node_level4.node;
        }
        //监控时间数据节点问题
        this.stepsList = res.result.node;
      });
      monitorRealNode({ plan_id: this.$route.query.plan_id }).then(res => {
        this.realPlanData = res.result;
      });
    },
    mergeCol({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    moreClick(isNode) {
      let plan_node_id = "";
      let lenth = 0;
      this.stepsList.forEach(item => {
        if (isNode == item.node_level) {
          if (item.plan_approval == undefined || item.plan_approval != 4) {
            this.$message({
              type: "success",
              message: "温馨提示，该表单无可查看版本！"
            });
            lenth = 1;
          }
          plan_node_id = item.id;
        }
      });
      //审批通过才能查看
      if (lenth >= 1) {
        return;
      }
      let urlName = "";
      let NameList = [
        "/getLand",
        "/setFirst",
        "/setSecond",
        "/threeMonth",
        "/twoMonth",
        "/twentyOneDays",
        "/sevenDays",
        "/opening",
        "/afterAMonth",
        "/salesOffice",
        "/modelDistrict",
        "/modelHouses",
      ];
      urlName = NameList[isNode - 1];
      localStorage.setItem("tabactiveName", urlName);
      this.$router.push({
        path: urlName,
        query: {
          project_id: this.$route.query.project_id,
          plan_node_id: plan_node_id,
          plan_id: this.$route.query.plan_id,
          node_level: isNode,
          type: "view"
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.rateWatch {
  background:#f5f5f5;
  .navbarLink {
    background: #fff;
    margin-top: 5px;
  }
  .img_light {
    height: 14px;
    width: 14px;
    vertical-align: middle;
    transform: translateY(-2px);
  }
  .containter {
    ::v-deep .el-icon-edit:before {
      font-size: 12px;
      line-height: 12px;
    }
    .icon_warning {
      display: inline-block;
      background: #ff4853;
      border-radius: 50%;
    }
    .top {
      height: 70px;
      background: #fff;
      position: relative;
      .project {
        position: absolute;
        top: 7px;
        left: 23px;
        height: 25px;
        color: #333;
        font-size: 18px;
        font-weight: 700;
      }
      .info {
        position: absolute;
        bottom: 0;
        left: 23px;
        height: 28px;
        .icon_first {
          margin-left: 90px;
        }
        // img:first-child {
          // margin-left: 180px;
        // }
        img {
          margin-left: 20px;
        }
        span {
          color: #999999;
          font-size: 12px;
          margin-right: 24px;
          i {
            font-size: 16px;
            margin-right: 0;
          }
        }
      }
      ::v-deep .el-button {
        height: 30px;
        position: absolute;
        right: 23px;
        top: 20px;
        transform: translateY(-50%);
      }
    }
    .content {
      display: flex;
      position: relative;
      .steps {
        width: 268px;
        background: rgba(245, 245, 245, 1);
        h4 {
          font-weight: normal;
          font-size: 14px;
          color: #999;
          text-align: center;
          height: 48px;
          line-height: 48px;
        }
        .step {
          cursor: pointer;
          position: relative;
          height: 40px;
          .line_t {
            width: 1px;
            height: 50%;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            background: #d0d0d0;
          }
          .line_b {
            width: 1px;
            height: 50%;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            background: #d0d0d0;
          }
          .status {
            width: 35px;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 1;
            transform: translate(-50%, -50%);
            i {
              font-size: 16px;
              margin: 0 auto;
              // display: block;
              // background: #fff;
            }
            .date {
              position: absolute;
              top: 50%;
              left: 18px;
              transform: translate(-100%, -50%);
              font-size: 14px;
              color: #333;
              width: 100px;
            }
            .info {
              position: absolute;
              white-space: nowrap;
              top: 50%;
              right: -2px;
              font-size: 14px;
              // font-weight: 700;
              color: #333;
              transform: translate(100%, -50%);
            }
          }
        }
        .step:hover .date {
          color: #2761ff;
        }
        .step:hover .info {
          color: #2761ff;
        }
      }
      .tableDate {
        height: calc(100vh - 100px);
        overflow: scroll;
        flex: 1;

        // background: pink;
        .item {
          // padding: 0 14px;
          .title {
            height: 44px;
            // background: pink;
            font-weight: 700;
            position: relative;
            line-height: 44px;
            font-size: 14px;
            color: #333;
            ::v-deep .el-button {
              position: absolute;
              top: 50%;
              right: 20px;
              transform: translateY(-50%);
            }
          }
          .table {
            background: #ffffff;
            padding: 14px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
            border-radius: 4px;
            .table_body {
              // border: 1px solid #ebeef5;
              border: 1px solid rgba(239, 239, 239, 1) !important;
              display: flex;
              .t_left {
                width: 100px;
                height: 100%;
                .t_cell {
                  height: 40px;
                  line-height: 40px;
                  text-align: left;
                  background: rgba(246, 248, 253, 1) !important;
                  // border: 1px solid rgba(239, 239, 239, 1) !important;
                  color: #999;
                  padding: 0 10px;
                  border-right:1px solid rgba(239,239,239,1);
                  border-top:1px solid rgba(239,239,239,1);

                }
                .t_cell:first-child{
                  border-top: none;
                }
              }
              .t_right {
                height: 160px;
                height: 100%;
                flex: 1;
                overflow: hidden;
                .scrollBox {
                  overflow: auto;
                  height: 100%;
                  display: flex;
                  .t_item {
                    min-width: 300px;
                    flex: 1;
                    .t_cell {
                      border-top: 1px solid rgba(239,239,239,1) ;
                      height: 40px;
                      line-height: 40px;
                      text-align: left;
                      padding: 0 10px;
                    }
                    .t_cell:first-child{
                      border-top: none;
                    }
                    .t_cell:first-child {
                      background:rgba(246,248,253,1);;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .nowPlan {
      padding: 10px;
    }
  }
  .trItems {
    display: inline-block;
  }
  #link1 ::v-deep .has-gutter .el-table_2_column_12 {
    border-right: 1px solid rgba(239, 239, 239, 1);
  }
  #link2 ::v-deep .has-gutter .el-table_3_column_25  {
    border-right: 1px solid rgba(239, 239, 239, 1);
  }
  #link3 ::v-deep .el-table {
    // border-right: 1px solid rgba(239, 239, 239, 1);
    // border-left: 1px solid rgba(239, 239, 239, 1);
    // border-top: 1px solid rgba(239, 239, 239, 1);
    border:1px solid rgba(239, 239, 239, 1)
  }
  ::v-deep .has-gutter th {
    background: rgba(246, 248, 253, 1) !important;
    border-left: none;
    border-right: none;
  }
  .hoverChangeColor {
    color: #2761ff;
  }
  .hoverChangeColor:hover {
    color: #2761ff;
  }
  ::v-deep .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: none;
  }
    ::v-deep .el-input__inner{
  color: #333333 !important;
  font-size: 14px !important;
}
}
</style>



