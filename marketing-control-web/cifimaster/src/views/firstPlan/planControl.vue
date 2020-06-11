<template>
  <div class="planControl">
    <div class="containter">
      <div class="messageBox" v-if="thisPhone">您好，首开计划管理暂不支持手机端访问，请您登录pad或pc端进行访问，谢谢！</div>

      <div class="planTab" v-if="!thisPhone">
        <el-tabs v-model="activeTab" @tab-click="tabClick">
          <el-tab-pane
            v-for="(item,key)  in headDatas"
            :label="item.nodeName+'('+item.nodeNum+')'"
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
                      v-for="(item,index) in idmBuinessData"
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
                  <el-button type="primary" @click="search()">查询</el-button>
                  <el-button type="primary" @click="isShowSearch()">收起</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="tips">
              <img class="img_light" src="../../assets/images/green.png" alt />
              <span>按时完成</span>
              <img class="img_light" src="../../assets/images/redRight.png" alt />
              <span>逾期完成</span>
              <img class="img_light" src="../../assets/images/red.png" alt />
              <span>逾期未完成</span>
              <img class="img_light" src="../../assets/images/warning.png" alt />
              <span>预警提醒</span>
              <!-- <el-button
                type="text"
                v-if="CurrentDevice=='computer'"
                class="screenFull"
                @click="toAll"
              >全屏模式</el-button>-->
              <el-button type="text" @click="isShowSearch()">高级查询</el-button>
            </div>
            <div
              class="item"
              @click="toInfo(projectData)"
              v-for="(projectData,key)  in bodyDatas"
              :key="key"
            >
              <div class="title">
                <span class="project" @click="toInfo(projectData)">{{projectData.projectName}}</span>
                <span class="area">{{projectData.areaName}} {{projectData.projectCode}}</span>
                <!-- <i class="el-icon-arrow-down"></i> -->
                <i class="el-icon-arrow-right" @click="toInfo(projectData)"></i>
              </div>
              <div class="steps">
                <el-steps :active="1">
                  <el-step v-for="(nodeData,key)  in projectData.nodeList" :key="key">
                    <template slot="icon">
                      <img
                        class="img_light"
                        v-if="nodeData.lightStatus==3"
                        src="../../assets/images/green.png"
                        alt
                      />
                      <img
                        class="img_light"
                        v-else-if="nodeData.lightStatus==4"
                        src="../../assets/images/redRight.png"
                        alt
                      />
                      <img
                        class="img_light"
                        v-else-if="nodeData.lightStatus==5"
                        src="../../assets/images/red.png"
                        alt
                      />
                      <img
                        class="img_light"
                        v-else-if="nodeData.lightStatus==6"
                        src="../../assets/images/warning.png"
                        alt
                      />
                      <img class="img_light" v-else src="../../assets/images/chageEdit.png" alt />
                    </template>
                    <template slot="title">
                      <div class="stepTitle">
                        <div>{{nodeData.nodeName}}</div>
                        <div>计划: {{nodeData.planEndTime}}</div>
                        <div>实际: {{nodeData.actualFinishTime}}</div>
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
// import screenfull from "screenfull";
import dd from "dingtalk-jsapi";
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
  computed: {
    corpId() {
      let host;
      if (location.origin.includes("test")) {
        host = "dingbc2887e7d0b1676535c2f4657eb6378f";
      } else if (location.origin.includes("uat")) {
        host = "dingbc2887e7d0b1676535c2f4657eb6378f";
      } else {
        host = "ding191e3009d26fae9f";
      }
      return host;
    }
  },
  methods: {
    toAll() {
      // console.log(screenfull);
      // return
      //   if (!screenfull.enabled) {
      //   this.$message({
      //     message: 'Your browser does not work',
      //     type: 'warning'
      //   })
      //   return false
      // }
      // screenfull.toggle();
      // this.isFullscreen = true;
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
        console.log(res.result);
      });
    },
    employeeName1() {
      this.employeeName = localStorage.getItem("employeeName");
      this.JobName = localStorage.getItem("JobName");
    },
    toInfo(row) {
      this.$router.push({
        path: "/rateWatch",
        query: {
          plan_id: row.plan_id,
          project_id: row.project_id,
          plan_node_id: row.plan_node_id,
          node_level: row.node_level
        }
      });
    },
    loginFlag() {
      // let token = JSON.stringify(localStorage.getItem("token"));
      // if (token == null) {
      //   return;
      // }
      window["corpId"] = this.corpId;
      dd.ready(function() {
        try {
          dd.runtime.permission.requestAuthCode({
            corpId: window.corpId, // 企业id
            onSuccess: function(info) {
              let code = info.code; // 通过该免登授权码可以获取用户身份
              dingLogin({
                code
              }).then(res => {
                if (res.result) {
                  const token = res.result.token;
                  const expiration = res.result.expiration;
                  const user = res.result.user;
                  const job = res.result.user.job;
                  const employeeName = res.result.user.employeeName;
                  const JobName = res.result.user.job.JobName;
                  const ProductID = res.result.user.job.ProductID;
                  const JobOrgID = res.result.user.job.JobOrgID;
                  const AuthCompanyID = res.result.user.job.AuthCompanyID;
                  const authCompanyId = res.result.user.authCompanyId;
                  const projectId = res.result.user.projectId;
                  const productId = res.result.user.productId;
                  const id = res.result.user.id;
                  const username = res.result.user.username;
                  const ID = res.result.user.job.ID;
                  const CommonJobID = res.result.user.job.CommonJobID;
                  window.localStorage.setItem("userInfo", JSON.stringify(user));
                  window.localStorage.setItem("id", id);
                  window.localStorage.setItem("username", username);
                  window.localStorage.setItem("ID", ID);
                  window.localStorage.setItem("employeeName", employeeName);
                  window.localStorage.setItem("ProductID", ProductID);
                  window.localStorage.setItem("JobOrgID", JobOrgID);
                  window.localStorage.setItem("AuthCompanyID", AuthCompanyID);
                  window.localStorage.setItem("token", token);
                  window.localStorage.setItem("expiration", expiration);
                  window.localStorage.setItem("JobName", JobName);
                  window.localStorage.setItem("job", job);
                  window.localStorage.setItem("pojid", projectId);
                  window.localStorage.setItem("CommonJobID", CommonJobID);
                  // this.$store.dispatch("user/setJobType", CommonJobID);
                  // if (user) {
                  //   _paq.push([
                  //     "setUserId",
                  //     `${user.employeeName}_${user.username}`
                  //   ]);
                  //   this.$router.push("/");
                  // } else {
                  //   this.$message("没有账号权限！");
                  // }
                  // this.employeeName1();
                  // this.pojid = localStorage.getItem("pojid");
                  // localStorage.removeItem("code");
                }
              });
            },
            onFail(e) {
              alert(JSON.stringify(e));
            }
          });
        } catch (e) {
          alert(JSON.stringify(e));
        }
      });
    }
  },
  created() {
    var os = (function() {
      var ua = navigator.userAgent;
      let isWindowsPhone = /(?:Windows Phone)/.test(ua);
      let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
      let isAndroid = /(?:Android)/.test(ua);
      let isFireFox = /(?:Firefox)/.test(ua);
      let isChrome = /(?:Chrome|CriOS)/.test(ua);
      let isTablet =
        /(?:iPad|PlayBook)/.test(ua) ||
        (isAndroid && !/(?:Mobile)/.test(ua)) ||
        (isFireFox && /(?:Tablet)/.test(ua));
      let isPhone = /(?:iPhone)/.test(ua) && !isTablet;
      let isPc = !isPhone && !isAndroid && !isSymbian;
      return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
      };
    })();

    let screenWidth = window.screen.width >= 480 ? true : false;
    if (os.isAndroid || os.isPhone) {
      this.equipment = "phone";
    }
    if (os.isTablet || (os.isAndroid && screenWidth)) {
      this.equipment = "pad";
    } else if (os.isPc) {
      this.equipment = "computer";
    }
    console.log(this.equipment);
    if (this.equipment == "phone") {
      this.thisPhone = true;
    } else {
      if (
        !localStorage.getItem("expiration") ||
        new Date().getTime() > localStorage.getItem("expiration")
      ) {
        //跳单点
        this.loginFlag();
      }
      this.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.planControl {
  .img_light {
    height: 18px;
    width: 18px;
    vertical-align: middle;
    transform: translateY(-3px);
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
    flex: 1;
    color: #fff;
    opacity: 0.6;
  }

  ::v-deep .el-tabs__item.is-active {
    color: #00f1ff;
    text-shadow: 0 0 5px #00f1ff;
  }

  ::v-deep .el-pagination {
    color: #fff;
    opacity: 0.6;
    span {
      color: #fff;
      opacity: 0.6;
    }
    ::v-deep .el-input__inner {
      color: #fff;
      opacity: 0.6;
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
      height: 52px;
      line-height: 52px;
      background: url("../../assets/images/路径 3@2x.png") no-repeat;
      background-size: 100% 100%;
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
          color: #fff;
          font-size: 18px;
          font-weight: 700;
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
      // ::-webkit-scrollbar-thumb {
      //     display: none!important;
      //   }

      .steps {
        width: 100%;
        // height: 120px;
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
          // min-width: 1024px;
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
          // border-radius: 50%;
          // border: 0.5px solid rgba(255,255,255,0.87);
          color: rgba(255, 255, 255, 0.87);
          // overflow: hidden;
          display: block;
          width: 25px;
          height: 25px;
          content: "";
          background: url("../../assets/images/椭圆形备份 12@2x.png") no-repeat;
          background-size: 100% 100%;

          // vertical-align: middle;
          // font-size: 16px;
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

          right: 10px;
          > div:first-child {
            // position: absolute;
            // top: 0px;
            // left: 14px;
            color: #fff;
            font-size: 14px;
            line-height: 25px;
            margin-top: 5px;
            opacity: 0.87;
          }

          > div:nth-child(2) {
            // position: absolute;
            // top: 21px;
            // left: 0px;
            width: 100px;
            color: #fff;
            opacity: 0.6;
            font-size: 12px;
            line-height: 28px;
          }

          > div:nth-child(3) {
            // position: absolute;
            // top: 38px;
            // left: 0px;
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
    // div::-webkit-scrollbar-thumb:hover{
    //   background: #fff;
    // }
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
</style>


