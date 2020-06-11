<template>
  <div ref="signingRearRenamed_H" class="signingRearRenamed app-container">
    <el-row class="container">
      <codeAndName :codeAndName="codeAndName" />
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="titleText">基本信息</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n addHeight">事业部:</el-col>
                  <el-col :span="16" class="bd_n addHeight">
                    <span :title="BName">{{BName}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n addHeight">项目名称:</el-col>
                  <el-col :span="16" style="overflow:hidden" class="bd_n bd_r addHeight">
                    <span :title="ProjectFullName">{{ProjectFullName}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">发起人:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{UserName}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">发起日期:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{ApplyDate}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="titleText">审批要点</h3>
          </template>
          <div class="content">
            <el-row class="lightFather">
              <i class="light" :style="{'background-color': AlterType=='直系亲属间更名'?'green':'red'}"></i>
              <span v-text="AlterType"></span>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="titleText">签约信息</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">客户姓名:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{CstName}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">置业顾问:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{Zygw}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">房间:</el-col>
                  <el-col :span="16" style="overflow:hidden" class="bd_n">
                    <span :title="RoomInfo">{{RoomInfo}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">签约日期:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{QSDate}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">签约面积:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span class="Rename">{{this.BldArea}}㎡</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">签约单价:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span class="Rename">{{this.CjBldPrice}}元/㎡</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">签约总价:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span class="Rename">{{this.CjRmbTotal}}元</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">已到账金额:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span class="Rename">{{this.GetAmount}} 元</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="24">
                <el-row type="flex">
                  <el-col :span="isMobile?8:4" class="bd_n">交易渠道:</el-col>
                  <el-col :span="isMobile?16:20" class="bd_n bd_r">
                    <span>{{Jyqd}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <h3 class="titleText">更新信息</h3>
          </template>
          <el-row>
            <el-col :span="isMobile?24:12">
              <p class="pText">更名前客户信息</p>
              <div class="more">
                <el-row class="bd_w">
                  <el-row class="bd_bottom" type="flex">
                    <el-col :span="12" class="bd_left">姓名</el-col>
                    <el-col :span="12" class="bd_left bd_r">认知途径</el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="12" class="bd_left">
                      <span>{{OldName}}</span>
                    </el-col>
                    <el-col :span="12" class="bd_left bd_r">
                      <span>{{OldMainMediaName}}</span>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
            </el-col>
            <el-col :span="isMobile?24:12">
              <p class="pText">更名后客户信息</p>
              <div class="more">
                <el-row class="bd_w">
                  <el-row class="bd_bottom" type="flex">
                    <el-col :span="12" class="bd_left">姓名</el-col>
                    <el-col :span="12" class="bd_left bd_r">认知途径</el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="12" class="bd_left">
                      <span>{{NewName}}</span>
                    </el-col>
                    <el-col :span="12" class="bd_left bd_r">
                      <span>{{MainMediaName}}</span>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item name="7">
          <template slot="title">
            <h3 class="titleText">更名原因</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">更名类型:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{AlterType}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">变更原因:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{AlterReason}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="24">
                <el-row type="flex">
                  <el-col :span="isMobile?8:4" class="bd_n">更名费:</el-col>
                  <el-col :span="isMobile?16:20" class="bd_n bd_r">
                    <span>{{RenamingFee}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w" style="border-left:1px solid #ccc">
              <el-col :span="24">
                <el-row type="flex">
                  <el-col
                    :span="isMobile?8:4"
                    class="bd_n"
                    style="border:none;border-right:none"
                  >原因说明:</el-col>
                  <el-col
                    :span="isMobile?16:20"
                    class="bd_n bd_r"
                    style="border-left:1px solid #ccc"
                  >
                    <div v-html="input21" style="word-wrap:break-word;"></div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="8">
          <template slot="title">
            <h3 class="titleText">附件</h3>
          </template>
          <div class="content">
            <div class="footer">
              <ul class="footer_list">
                <li v-for="(item,index) in ATTACHMENTS" :key="index">
                  <a v-if="!isMobile" :href="item.URL">{{item.FILENAME}}</a>
                  <span v-else @click="YZ_link(item)">{{item.FILENAME}}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-row>
    <Buttons />
  </div>
</template>


<script>
let width = document.body.offsetWidth;
import $ from "jquery";

import { sendJSONAllPath, sendJSON } from "@/api/request";
import { weekPlanSort } from "@/utils/methods";
import { examineInfo } from "@/api/offerFlow";
import { appSetToken } from "@/utils/util";
export default {
  name: "signingRearRenamed",
  components: {
    Buttons: () => import("../../views/offerFlow/component/index"),
    codeAndName: () => import("@/views/offerFlow/component/codeAndName")
  },
  data() {
    return {
      radioList: "",
      activeNames: ["1", "2", "3", "4", "5", "6", "7", "8"],
      BName: "",
      isMobile: width <= 1024,
      AlterType: "",
      ProjectFullName: "",
      UserName: "",
      ApplyDate: "",
      CstName: "",
      Zygw: "",
      RoomInfo: "",
      QSDate: "",
      BldArea: "",
      CjBldPrice: "",
      CjRmbTotal: "",
      Jyqd: "",
      GetAmount: "",
      OldName: "",
      NewName: "",
      AlterType: "",
      AlterReason: "",
      RenamingFee: "",
      input21: "",
      input22: "",
      OldMainMediaName: "",
      input24: "",
      MainMediaName: "",
      codeAndName: [],
      ATTACHMENTS: []
    };
  },

  methods: {
    YZ_link(file) {
      // console.log(this.isMobile);
      if (this.isMobile) {
        var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(item) {
          return window.location.href.indexOf(item) !== -1;
        });
        let wm = {
          htmlTitle: "签约后更名",
          wmContent: this.userID || "旭辉集团",
          wmSize: 10,
          wmFont: "microsoft yahei",
          wmColor: 7,
          isDelSrc: 1
        };
        //https://sales-uat.cifi.com.cn/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=https%3a%2f%2fsales-uat.cifi.com.cn%2fapi%2fMysoft.Map6.FileManager.AppServices.FileManagerAppService%2fDownLoad.aspx%3fdocumentGuid%3da7dae8d9-669e-ea11-80c9-005056a35e5f
        // let resquestUrl=isTest?`${location.origin}/dcs.web/onlinefile`:`${location.origin}/dcs.web/onlinefile`
        let resquestUrl = `https://oadoc.cifi.com.cn/dcs.web/onlinefile`;
        let requrl = file.FILENAME;
        let end = requrl.split(".")[requrl.split(".").length - 1];
        let convertType;
        if (end == "pdf") {
          convertType = "20";
        } else if (end == "tif") {
          convertType = "17";
         } else if(end == "jpg"){
          // convertType = "6";
        open(file.URL);
        return;
        }else if(end == "png"){
          // convertType = "10";
        open(file.URL);
        return;
        }else {
          convertType = "0";
        }
        // var tempwindow=window.open('about:blank');
        $.ajax({
          url: resquestUrl,
          data: {
            ...wm,
            downloadUrl:  file.URL,
            convertType
          },
          dataType: "json",
          async: false,
          type: "post",
          success: function(data) {
            if (data.result == 0) {
              if (parent) {
                parent.window.location.href = data.data[0];
              } else {
                window.location.href = data.data[0];
              }
            } else {
              this.$message.error("转换失败");
            }
          },
          error: function(data) {
            alert("报错:" + JSON.stringify(data));
            open(file.URL);
          }
        });
      } else {
        let requrl = file.URL.split("?")[0];
        open(file.URL);
      }
    },
    handleChange(val) {
      console.log(val);
    },
    getInfo() {
      examineInfo({
        json_id: this.$route.query.BOID
        // json_id: "359b81b3-1cfd-e911-80bb-005056a37afa"
      }).then(res => {
        this.codeAndName = res.result;
        let json = JSON.parse(res.result[0].flow_json);
        console.log(json);
        this.AlterType = json.AlterType;
        this.BName = json.BName;
        this.ProjectFullName = json.ProjectFullName;
        this.UserName = json.UserName;
        this.ApplyDate = json.ApplyDate;
        this.CstName = json.CstName;
        this.Zygw = json.Zygw;
        this.RoomInfo = json.RoomInfo;
        this.QSDate = json.QSDate;
        this.BldArea = json.BldArea;
        this.CjBldPrice = json.CjBldPrice;
        this.CjRmbTotal = json.CjRmbTotal;
        this.Jyqd = json.Jyqd;
        this.GetAmount = json.GetAmount;
        this.OldName = json.OldName;
        this.NewName = json.NewName;
        this.AlterType = json.AlterType;
        this.AlterReason = json.AlterReason;
        this.RenamingFee = json.RenamingFee;
        this.input21 = json.Reason;
        this.OldMainMediaName = json.OldMainMediaName;
        this.MainMediaName = json.MainMediaName;
        if (json.ATTACHMENTS) {
          if (
            Object.prototype.toString.call(json.ATTACHMENTS.Item) ==
            "[object Array]"
          ) {
            json.ATTACHMENTS.Item.forEach(item => {
              this.ATTACHMENTS.push({
                FILENAME: item.FILENAME,
                URL: item.URL
              });
            });
          } else {
            let obj = {
              URL: json.ATTACHMENTS.Item.URL,
              FILENAME: json.ATTACHMENTS.Item.FILENAME
            };
            this.ATTACHMENTS = [obj];
          }
        }
      });
    }
  },
  created() {
    appSetToken();
    this.getInfo();
    /*
      //加载周计划程序已加载至2028年如果需要重新初始化打开注释重新发送，发送结束后请注释掉一下的代码
      let sendList=[];
      for(let i=2018;i<=2028;i++){
        for(let j=1;j<=12;j++){
          sendList.push(...weekPlanSort(`${i}-${j}-01`,true));
        }
      }
      sendJSONAllPath('http://192.168.34.66:8001/weekRule/getCommonWeekRule',{_param:sendList}); */
  },
  mounted() {
    console.log(this.$route.query.BOID);
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.signingRearRenamed_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.signingRearRenamed_H.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  updated() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.signingRearRenamed_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.signingRearRenamed_H.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  }
};
</script>


<style lang="less" scoped>
.el-col-8 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content_phone_Border {
  border-right: none;
  border-bottom: none;
}
@media (max-width: 1024px) {
  .content_phone_Border {
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
}
</style>
<style lang='less'>
.signingRearRenamed {
  .titleText {
    border-left: 3px solid #2661ff;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    text-indent: 1em;
  }
  .lightFather {
    height: 20px;
    line-height: 20px;
    .light {
      height: 16px;
      width: 16px;
      background-color: red;
      border-radius: 50%;
      float: left;
      margin-top: 2px;
      margin-right: 10px;
    }
  }

  .pText {
    text-indent: 3em;
    font-weight: 700;
  }
  .content {
    padding: 0 20px;
  }
  .title {
    font-size: 18px;
  }
  .container {
    position: relative;
    z-index: 1997;
  }
  .container input.el-input__inner {
    font-size: 12px;
    color: #333;
    border: none;
    background-color: #fff;
  }

  input::placeholder {
    font-size: 12px;
  }

  .bd_w {
    border-top: 1px solid #ccc;

    .bd_n {
      padding: 0 10px;
      min-height: 40px;
      line-height: 40px;
      font-size: 12px;
      .Rename {
        display: inline-block;
        margin: 0 15px;
      }
      &:first-child {
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        // border-bottom: 1px solid #ccc;
        text-align: right;
      }
    }
    .addHeight {
      min-height: 81px;
    }

    &:last-child {
      border-bottom: 1px solid #ccc;
    }

    .bd_r {
      border-right: 1px solid #ccc;
    }
  }

  .more {
    padding: 0 20px;
    input {
      text-align: center;
    }
    .bd_left {
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-left: 1px solid #ccc;
    }

    .bd_bottom {
      border-bottom: 1px solid #ccc;
    }
  }

  .footer {
    h2 {
      padding-bottom: 10px;
      font-size: 12px;
    }

    .footer_list {
      list-style: none;

      li {
        height: 30px;
        line-height: 30px;
        color: #2761ff;
        list-style: none;
        cursor: pointer;
      }
    }
  }
}
</style>
