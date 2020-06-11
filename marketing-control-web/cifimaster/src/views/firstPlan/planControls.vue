<template>
  <div class="planControl">
    <div class="containter">
      <div class="messageBox" v-if="thisPhone">您好，首开计划管理暂不支持手机端访问，请您登录pad或pc端进行访问，谢谢！</div>>
      <div class="top"></div>
      <div class="planTab" v-if="!thisPhone">
        <el-tabs v-model="activeTab" @tab-click="tabClick">
          <el-tab-pane
            v-for="(item, key) in headDatas"
            :label="item.nodeName + '(' + item.nodeNum + ')'"
            :name="item.maxNode"
            :key="key"
          >
            <div class="tips" style="margin: 20px;" v-if="isShow">
              <el-form
                :inline="true"
                :model="searchData"
                label-width="80px"
                :label-position="labelPosition"
                class="demo-form-inline"
              >
                <el-form-item label="区域/事业部">
                  <el-select v-model="searchData.areaName" placeholder="请选择区域/事业部" clearable>
                    <el-option
                      :key="index"
                      :label="item.business_unit_name"
                      :value="item.business_unit_name"
                      v-for="(item, index) in idmBuinessData"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目名称">
                  <el-input v-model="searchData.projectName" placeholder="请输入项目名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="首开时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择开始日期"
                    v-model="searchData.openTime1"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label>
                  <el-date-picker
                    type="date"
                    placeholder="选择结束日期"
                    v-model="searchData.openTime2"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="是否逾期 ">
                  <el-select v-model="searchData.nodeStatus" clearable placeholder="是否逾期">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label=" 逾期天数 ">
                  <el-select v-model="searchData.overday" clearable placeholder="请选择逾期天数">
                    <el-option label="1天内" value="1天内"></el-option>
                    <el-option label="1-3天" value="1-3天"></el-option>
                    <el-option label="3-10天" value="3-10天"></el-option>
                    <el-option label="10天以上" value="10天以上"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <div class="ControlsBtn">
                    <el-button type="primary" @click="search()">查询</el-button>
                    <el-button type="primary" @click="isShowSearch()">收起</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <div class="tips Btn_ChangecColor">
              <img class="img_light" src="../../assets/images/green.png" alt />
              <span>按时完成</span>
              <img class="img_light" src="../../assets/images/redRight.png" alt />
              <span>逾期完成</span>
              <img class="img_light" src="../../assets/images/red.png" alt />
              <span>逾期未完成</span>
              <img class="img_light" src="../../assets/images/warning.png" alt />
              <span>预警提醒</span>
              <el-button
                type="text"
                v-if="CurrentDevice == 'computer'"
                class="screenFull"
                @click="toAll"
              >全屏模式</el-button>
              <el-button type="text" @click="isShowSearch()">高级查询</el-button>
            </div>
            <div
              class="item curs"
              @click="toInfo(projectData)"
              v-for="(projectData, key) in bodyDatas"
              :key="key"
            >
              <div class="title">
                <span class="project" @click="toInfo(projectData)">
                  {{ projectData.projectName }}
                  <span style="font-size:12px">
                    {{
                    projectData.projectCode
                    }}
                  </span>
                </span>
                <span class="area">{{ projectData.areaName }}</span>
                <!-- <i class="el-icon-arrow-down"></i> -->
                <i class="el-icon-arrow-right" @click="toInfo(projectData)"></i>
              </div>
              <div class="steps">
                <el-steps :active="1">
                  <el-step v-for="(nodeData, key) in projectData.nodeList" :key="key">
                    <template slot="icon">
                      <img
                        class="img_light"
                        v-if="nodeData.lightStatus == 3"
                        src="../../assets/images/green.png"
                        alt
                      />
                      <img
                        class="img_light"
                        v-else-if="nodeData.lightStatus == 4"
                        src="../../assets/images/redRight.png"
                        alt
                      />
                      <img
                        class="img_light"
                        v-else-if="nodeData.lightStatus == 5"
                        src="../../assets/images/red.png"
                        alt
                      />
                      <img
                        class="img_light"
                        v-else-if="nodeData.lightStatus == 6"
                        src="../../assets/images/warning.png"
                        alt
                      />
                      <img class="img_light" v-else src="../../assets/images/chageEdit.png" alt />
                    </template>
                    <template slot="title">
                      <div class="stepTitle">
                        <div class="TitleBold">{{ nodeData.nodeName }}</div>
                        <div>计划: {{ nodeData.planEndTime }}</div>
                        <div>
                          实际:
                          <span :style="{color: changeColor(nodeData.lightStatus)}">
                            {{ countsum(nodeData,'actualFinishTime','planEndTime','lightStatus') | filterTime}}
                            <!-- nodeData.actualFinishTime  -->
                          </span>
                        </div>
                      </div>
                    </template>
                  </el-step>
                </el-steps>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-pagination
          v-if="!thisPhone"
          @size-change="handleSizeChange"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          style="float:right;margin-top:10px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  montitorIndex,
  projectSelect,
  getIdmBuinessData,
  dingLogin
} from "@/api/firstPlan";
import screenfull from "screenfull";
import * as dd from "dingtalk-jsapi";
export default {
  data() {
    return {
      isShow: false,
      labelPosition: "right",
      activeTab: "8",
      equipment: "",
      thisPhone: false,
      headDatas: [
        {
          nodeName: "",
          nodeNum: "",
          maxNode: ""
        }
      ],
      thisNode: "",
      searchData: {
        areaName: "",
        projectName: "",
        openTime1: "",
        openTime2: "",
        nodeStatus: "",
        overday: ""
      },
      bodyDatas: [
        {
          projectCode: "",
          areaName: "",
          projectName: "",
          nodeList: [
            {
              nodeName: "",
              nodeLevel: "",
              planEndTime: "",
              actualFinishTime: "",
              lightStatus: "",
              statusClass: "",
              statusStyle: ""
            }
          ]
        }
      ],
      idmBuinessData: [],
      count: 0,
      currentPage: 1,
      pageSize: 10,
      pageIndex: 1,
      CurrentDevice: localStorage.getItem("CurrentDevice")
    };
  },
  filters: {
    filterTime(date) {
      if (!date) {
        return "";
      }
      let val = new Date(date);
      if (val == "Invalid Date") {
        return date;
      }
      var Y = val.getFullYear();
      var M = val.getMonth() + 1;
      var D = val.getDate();
      var H = val.getHours();
      var MI = val.getMinutes();
      var S = val.getSeconds();
      return Y + "年" + M + "月" + D + "日";
    }
  },
  methods: {
    changeColor(status) {
      if (status == 4) {
        return "#FF4853";
      } else if (status == 5) {
        return "#FF4853";
      } else {
        return "";
      }
    },
    countsum(obj, name1, name2, name3) {
      if (!obj[name3]) {
        return "";
      }
      if (obj[name1]) {
        return obj[name1];
      } else if (obj[name3] == 5) {
        let date = (+new Date() - +new Date("20" + obj[name2])) / 86400000;
        return "逾期" + Math.floor(date) + "天";
      } else {
        return "";
      }
    },
    toAll() {
      screenfull.toggle();
    },
    isShowSearch() {
      if (!this.isShow) {
        if (this.idmBuinessData.length > 0) {
        } else {
          getIdmBuinessData({}).then(res => {
            this.idmBuinessData = res.result;
          });
        }
      }
      this.isShow = !this.isShow;
    },
    search() {
      let load = this.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: "正在加载...", // 加载动画的文字
        spinner: "el-icon-loading", // 引入的loading图标
        background: "rgba(0, 0, 0, 0.3)", // 背景颜色
        body: true,
        customClass: "mask" // 遮罩层新增类名
      });
      this.reload();
      load.close();
    },
    tabClick(total, event) {
      this.thisNode = this.headDatas[this.activeTab].this_node;
      this.currentPage = 1;
      this.pageSize = 10;
      this.reload();
    },
    reload() {
      montitorIndex({
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        areaName: this.searchData.areaName,
        projectName: this.searchData.projectName,
        openTime1: this.searchData.openTime1,
        openTime2: this.searchData.openTime2,
        nodeStatus: this.searchData.nodeStatus,
        overday: this.searchData.overday,
        thisNode: this.thisNode
      }).then(res => {
        this.headDatas = res.result.headData;
        this.count = res.result.total;
        this.bodyDatas = res.result.bodyData;
        console.log(this.bodyDatas);
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.reload();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.reload();
    },
    projectSelect() {
      projectSelect({
        name: ""
      }).then(res => {
        // console.log(res.result);
      });
    },
    employeeName1() {
      this.employeeName = localStorage.getItem("employeeName");
      this.JobName = localStorage.getItem("JobName");
    },
    toInfo(row) {
      console.log(row);
      localStorage.setItem(
        "nowProject",
        JSON.stringify({
          nowArea: row.areaName,
          nowCity: row.cityName,
          nowProject: row.projectName,
          project_id: row.project_id
        })
      );
      this.$store.state.user.firstPlanItem = row.projectName;

      this.$router.push({
        path: "/rateWatch",
        query: {
          plan_id: row.plan_id,
          project_id: row.project_id,
          plan_node_id: row.plan_node_id,
          node_level: row.node_level
        }
      });
    }
  },
  created() {
    this.reload();
  }
};
</script>

<style lang="less" scoped>
.planControl {
  ::v-deep .el-pager li {
    font-size: 14px !important;
  }
  ::v-deep .el-pagination .el-select .el-input .el-input__inner,
  .el-pagination__editor.el-input .el-input__inner {
    color: #fff !important;
    font-size: 14px !important;
  }
  ::v-deep .el-pager li.btn-quicknext,
  .el-pager li.btn-quickprev {
    color: #fff !important;
    font-size: 14px !important;
  }
  ::v-deep .el-pager li.btn-quicknext,
  .el-pager li.btn-quickprev {
    color: #fff;
    font-size: 14px !important;
  }
  .Btn_ChangecColor {
    ::v-deep .el-button {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      text-shadow: 0px 0px 4px rgba(255, 255, 255, 0.5);
    }
  }
  .img_light {
    height: 18px;
    width: 18px;
    vertical-align: middle;
    transform: translateY(-3px);
    margin-right: 10px;
  }
  .demo-form-inline {
    ::v-deep .el-input__inner {
      color: #fff;
    }
  }
  ::v-deep .el-tabs {
    margin: 0 auto;
  }
  ::v-deep .el-tabs__nav-scroll {
    overflow: auto;
    padding: 0 10px;
    box-sizing: border-box;
  }

  ::v-deep .el-tabs__header {
    margin: 0 auto;
  }
  ::v-deep .el-tabs__nav {
    display: flex;
    margin: 0 auto;
    float: none;
  }

  ::v-deep .btn-next,
  ::v-deep .btn-prev,
  ::v-deep .el-pager > li {
    background-color: transparent !important ;
  }
  ::v-deep .el-input__inner {
    background-color: transparent !important ;
    color: #fff;
    font-size: 14px;
  }
  ::v-deep .el-step__icon.is-text {
    border: none !important;
  }

  // height: calc(100vh - 40px);
  height: 100vh;
  // background: red;
  background: url("../../assets/images/JK_BG.jpg") no-repeat;
  background-size: 100% 100%;

  ::v-deep .el-tabs__header {
    margin: 0;
  }

  ::v-deep .el-tabs__nav-wrap::after {
    display: none;
  }

  ::v-deep .el-tabs__active-bar {
    display: none;
  }

  ::v-deep .el-tabs__nav-next,
  ::v-deep .el-tabs__nav-prev,
  ::v-deep .el-tabs__item {
    line-height: 52px !important;
  }

  ::v-deep .el-tabs__item {
    color: #fff;
    opacity: 0.6;
    text-align: center;
    flex: 1;
    // width: 9%;
  }

  ::v-deep .el-tabs__item.is-active {
    color: #00f1ff !important;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    text-shadow: 0px 0px 4px rgba(0, 241, 255, 1);
  }

  ::v-deep .el-pagination {
    color: #fff;
    opacity: 0.6;
    font-size: 14px;
    span {
      color: #fff;
      opacity: 0.6;
      font-size: 14px;
    }
    ::v-deep .el-input__inner {
      color: #fff;
      opacity: 0.6;
      font-size: 14px;
    }
  }
  .containter {
    padding: 10px 20px 10px;
    height: 100%;
    overflow: auto;
    .messageBox {
      height: 50%;
      width: 100%;
      margin: 100px auto;
      text-align: center;
      font-size: 20px;
      color: #fff;
    }
    .planTab {
      position: relative;
      height: 52px;
      line-height: 52px;
      background: url("../../assets/images/路径 3@2x.png") no-repeat;
      background-size: 100% 100%;
      // .icons{
      //   position: absolute;
      //   width: 30px;
      //   height: 30px;
      //   background: yellow;
      //   right: 30px;
      //   z-index: 10;
      // }
      .el-icon-arrow-right {
        color: #fff;
      }
      ::v-deep .el-tabs__item {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
      }
      ::v-deep .el-tabs__item.is-active{
        font-weight: 700 !important;
      }
    }
    .tips {
      padding: 10px 0;
      span {
        color: #fff;
        opacity: 0.6;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
      }
      img {
        margin-left: 10px;
      }
      .icon_edit {
        height: 14px;
        width: 14px;
        margin-right: 10px;
        margin-left: 3px;
        // vertical-align: middle;
      }

      ::v-deep > .el-button {
        background: url("../../assets/images/矩形40拷贝6 2@2x.png") no-repeat;
        background-size: 100% 100%;
        float: right;
        margin-top: 11px;
        margin-left: 10px;
        width: 107px;
        height: 37px;
      }
    }

    .item {
      height: 184px;
      background: url("../../assets/images/矩形14 2@2x.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      margin-bottom: 10px;

      .title {
        position: absolute;
        width: 100%;
        top: 10px;
        left: 25px;

        .project {
          font-size: 18px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
        }

        .area {
          color: #fff;
          opacity: 0.6;
          display: inline-block;
          font-size: 12px;
          height: 24px;
          background: #24315d;
          line-height: 24px;
          padding: 0 10px;
          margin-left: 20px;
        }

        i {
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
      .steps {
        width: 100%;
        position: absolute;
        top: 70px;
        left: 0;
        img {
          height: 20px;
          width: 20px;
          transform: translateX(-3px);
        }

        ::v-deep .el-steps {
          height: 120px;
          padding: 3px 40px 0;
          box-sizing: border-box;
          width: 100%;
          overflow: auto;
        }

        ::v-deep .el-step__icon {
          background: transparent;
        }

        ::v-deep .el-step__title.is-process {
          color: #fff;
          opacity: 0.87;
          font-weight: normal;
        }

        ::v-deep .el-step__title.is-wait {
          color: #fff;
          opacity: 0.87;
        }

        ::v-deep .el-icon-success:before {
          background: #fff;
          border-radius: 50%;
          overflow: hidden;
        }

        ::v-deep .el-icon-edit:before {
          color: rgba(255, 255, 255, 0.87);
          display: block;
          width: 25px;
          height: 25px;
          content: "";
          background: url("../../assets/images/椭圆形备份 12@2x.png") no-repeat;
          background-size: 100% 100%;
        }

        ::v-deep .el-icon-warning:before {
          background: #fff;
          border-radius: 50%;
          overflow: hidden;
        }

        ::v-deep .el-step__head {
          line-height: 0;
        }

        .stepTitle {
          position: relative;
          white-space: nowrap;
          .TitleBold {
            font-weight: 700;
          }
          right: 10px;
          > div:first-child {
            color: #fff;
            font-size: 14px;
            line-height: 25px;
            margin-top: 5px;
            opacity: 0.87;
          }

          > div:nth-child(2) {
            width: 100px;
            color: #fff;
            opacity: 0.6;
            font-size: 12px;
            line-height: 28px;
          }

          > div:nth-child(3) {
            color: #fff;
            opacity: 0.6;
            font-size: 12px;
            line-height: 0;
          }
        }
      }
    }
  }
}
@media (min-width: 1024px) {
  .planControl {
    div::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      /**/
    }
    div::-webkit-scrollbar-track {
      background: #0c1843;
      border-radius: 2px;
    }
    div::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 10px;
    }
    div::-webkit-scrollbar-corner {
      background: #0c1843;
    }
  }
}

::v-deep .el-step.is-horizontal .el-step__line {
  height: 1px;
  background: #ffffff;
  opacity: 0.2;
}
.curs {
  cursor: pointer;
}
</style>
