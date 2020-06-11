<template>
  <div class="reportForms container">
    <!-- <div class="tabs" style="height:40px;margin-left:30px">
      <el-tabs v-model="vals" @tab-click="tabClick">
        <el-tab-pane
          class="tabsItem"
          v-for="(item, index) in list"
          :key="index"
          :label="item.title"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>-->
    <div class="fromList">
      <el-collapse v-model="activeNames">
        <div class="feaer">
          <div class="common">
            <el-collapse-item :name="0" disabled>
              <template slot="title">
                <div class="title">
                  <img src="../../assets/MarketingReportImgs/baobiao.png" alt />
                  <h3 class="titleBold">常用报表</h3>
                </div>
              </template>
              <el-row :gutter="24">
                <template v-if="used.length>0">
                  <el-col class="itms" :span="8" v-for="(form,key) in used" :key="key">
                    <a
                      @click.prevent="openWindow($event,{suID:form.suID,menuID:form.id},form.title)"
                      :href="form.url"
                      target="_blank"
                    >
                      <!-- <img src="../../assets/images/临时_20191029151910.png" alt /> -->
                      <img class="collect" src="../../assets/MarketingReportImgs/xingxing.png" alt />
                      {{form.title}}
                    </a>
                  </el-col>
                </template>
                <span
                  v-else
                  style="color: #999;line-height: 35px; font-size: 13px;display: block;text-align: center;"
                >暂无数据</span>
              </el-row>
            </el-collapse-item>
          </div>
          <div class="tabs" style="height:40px;margin-left:30px">
            <el-tabs v-model="vals" @tab-click="tabClick">
              <el-tab-pane
                class="tabsItem"
                v-for="(item, index) in list"
                :key="index"
                :label="item.title"
                :name="item.name"
              ></el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div style="height:170px"></div>
        <div id="contar" class="contar">
          <div class="boxContner" :id="item.name" :key="index" v-for="(item,index) in list">
            <el-collapse-item :title="item.title" :name="index+1">
              <template slot="title">
                <div class="title">
                  <img class="Imas" :src="item.imgPath" alt />
                  <h3 class="titleBold">{{item.title}}</h3>
                </div>
              </template>
              <el-row :gutter="24">
                <template v-if="item.childMap.length>0">
                  <el-col :span="8" v-for="(form,key) in item.childMap" :key="key">
                    <a
                      @click.prevent="openWindow($event,{suID:form.suID,menuID:form.id},form.title)"
                      :href="form.url"
                      target="_blank"
                    >
                      <!-- <img src="../../assets/images/临时_20191029151910.png" alt /> -->
                      <!-- <i class="iconfont icon-stars-lines"></i> -->
                      <!-- <img class="collect" src="../../assets/MarketingReportImgs/xingxing.png" alt /> -->
                      <i class="el-icon-star-off collect noCollect"></i>
                      {{form.title}}
                    </a>
                  </el-col>
                </template>
                <span
                  v-else
                  style="color: #999;line-height: 35px; font-size: 13px;display: block;text-align: center;"
                >暂无数据</span>
              </el-row>
            </el-collapse-item>
          </div>
        </div>
      </el-collapse>
    </div>
    <iframe name="frame" :src="sbiurl" frameborder="0" style="width:0;height:0;"></iframe>
    <iframe name="frame" :src="myurl" frameborder="0" style="width:0;height:0;"></iframe>
    <iframe name="frame" src="/my/" frameborder="0" style="width:0;height:0;"></iframe>
  </div>
</template>

<script>
var localurl = location.href;
var myurl = "http://sales-test.cifi.com.cn:9060";
var sbiurl = "https://smartbi-test.cifi.com.cn/smartbi";
if (localurl.indexOf("salesmgt.cifi.com.cn") != -1) {
  myurl = "http://sales.cifi.com.cn:9060";
  sbiurl = "https://smartbi.cifi.com.cn/smartbi";
}

import { get, sendJSON } from "@/api/request";
export default {
  name: "reportForms",
  data() {
    return {
      path: "../../assets/MarketingReportImgs/baobiao0.png",
      ImgList: [],
      vals: "first0",
      // activeNames:'first0',
      userName: localStorage.getItem("username"),
      testName: "/PubPlatform/Nav/Home/Default.aspx",
      myurl: myurl,
      list: [],
      activeNames: [0],
      used: [],
      sbiurl: sbiurl
    };
  },
  created() {
    sendJSON("/report/getAuthorizationData", {
      UserId: localStorage.getItem("id")
    }).then(res => {
      this.list = res.result.data.content.sqReport;
      this.list.forEach((item, index) => {
        item.name = `first${index}`;
        item.imgPath = require("../../assets/MarketingReportImgs/baobiao" +
          index +
          ".png");
      });
      this.used = res.result.data.content.cyReport;
      res.result.data.content.sqReport.forEach((item, index) =>
        this.activeNames.push(index + 1)
      );
    });
  },
  methods: {
    tabClick(tab, event) {
      console.log(tab, event);
      // document.getElementById(tab.name).scrollIntoView({ block: "end", behavior: "smooth" });
      document.querySelector("#contar").scrollTop =
        document.getElementById(tab.name).offsetTop - 210;
    },
    openWindow($event, params, text) {
      sendJSON("/report/addCommomUserReportMenus", {
        ...params,
        userID: localStorage.getItem("id")
      }).then(res => {
        // console.log($event);
        // console.log(text);

        _paq.push(["trackEvent", "点击", "报表管理", `${text}`]);
        if (res.result.code == 200)
          sendJSON("/report/getAuthorizationData", {
            UserId: localStorage.getItem("id")
          }).then(res => {
            this.list = res.result.data.content.sqReport;
            this.used = res.result.data.content.cyReport;
          });
      });
      let url = $event.target.href;
      let width = width || window.screen.width;
      let height = height || window.screen.height;
      var left = (window.screen.width - width) / 2;
      var top = (window.screen.height - height) / 2;
      window.open(url, "_blank");
    }
  },
  mounted() {
    console.log(this.$route);
    this.ImgList = [
      "../../assets/MarketingReportImgs/baobiao0.png",
      "../../assets/MarketingReportImgs/baobiao1.png",
      "../../assets/MarketingReportImgs/baobiao2.png",
      "../../assets/MarketingReportImgs/baobiao3.png",
      "../../assets/MarketingReportImgs/baobiao4.png"
    ];
  },
  watch: {
    list: function(val) {
      val.forEach((item, index) => {
        item.name = `first${index}`;
        if (!item.imgPath) {
          item.imgPath = require("../../assets/MarketingReportImgs/baobiao" +
            index +
            ".png");
        }
      });
    }
  }
};
</script>
<style lang="less">
.reportForms {
  overflow: hidden;
  height: calc(100vh - 40px);
  a:hover {
    background: rgba(244, 247, 255, 1);
    border-radius: 4px;
    font-weight: 400;
    color: #2661ff;
  }
}
</style>
<style lang='less' scoped>
.reportForms {
  .el-collapse-item__header.is-active {
    border-bottom: 1px solid #ebeef5;
  }
  .el-collapse-item__header {
    font-size: 16px;
    font-weight: bold;
    text-indent: 1em;
    border: none;
  }
  ::v-deep .el-collapse {
    border: none;
  }
  .title {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    // padding: 10px 20px;
    margin-top: 5px;
    padding-left: 0;
    text-indent: 1em;
    margin-left: 5px;
    .el-icon-phone {
      margin: 0;
      padding: 0;
      font-size: 20px;
      color: greenyellow;
    }
    h3 {
      color: rgba(51, 51, 51, 1);
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      display: inline-block;
      margin-left: -20px;
      font-size: 16px;
      line-height: initial;
      .btn {
        font-size: 20px;
      }
    }
  }
  .el-col-8 {
    padding-left: 3% !important;
  }
  ::v-deep .el-col {
    margin-left: -20px;
  }
  a {
    width: 100%;
    height: 33px;
    display: inline-block;
    text-align: left;
    border-radius: 4px;
    line-height: 33px;
    // margin: 6px 0;
    text-indent: 1em;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .fromList {
    // padding: 10px 20px 20px;
    box-shadow: 0 0 3px #ccc;
    // margin-top: -10px;
    .feaer {
      position: fixed;
      top: 30px;
      left: auto;
      width:100%;
      z-index: 10;
      height: 155px;
      background: #fff;
      .common {
        .itms{
          width: 31%;
        }
      }
    }
    .tabs {
      margin-top: 15px;
    }
    .contar {
      overflow-y: auto;
      height: calc(100vh - 250px);
      margin-top: 30px;
    }
  }
  img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .el-collapse-item {
    margin: 10px;
    padding: 10px 0;
  }
  ::v-deep .el-tabs__nav-wrap::after {
    display: none;
  }
  .tabs ::v-deep .is-active::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    height: 3px;
    background: #2661ff;
    width: 26px;
  }
  .Imas {
    display: inline-block;
  }
  ::v-deep .el-col {
    position: relative;
  }
  ::v-deep .el-col .collect {
    display: none;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
  a:hover .collect {
    display: block;
  }
  ::v-deep .el-tabs__nav .is-active {
    color: #2661ff;
  }
  ::v-deep .el-tabs__item {
    padding: 0 !important;
    margin-right: 52px;
  }
  ::v-deep .el-icon-star-off {
    font-size: 16px;
    color: rgba(158, 160, 164, 1);
  }
  ::v-deep .el-tabs__item:hover {
    color: #2661ff !important;
    //  font-size: 16px !important;
  }
  ::v-deep .el-tabs__item {
    font-size: 16px !important;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    // font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .noCollect {
    margin-right: 5px;
  }
  .boxContner {
    margin: 10px 0;
  }
  ::v-deep .el-collapse-item__wrap {
    border: none !important;
  }
  ::v-deep .el-collapse-item {
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(216, 216, 216, 0.5);
  }
  ::v-deep .el-tabs__active-bar {
    display: none !important;
  }
}
</style>
