<template>
  <div ref="chargeback_H" class="chargeback app-container">
    <el-row class="container" style="z-index: 1997;">
      <codeAndName :codeAndName="codeAndName" />
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="titleText">基本信息</h3>
          </template>
          <div class="content" v-if="!isMobile">
            <el-row class="bd_w">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8" class="bd_n">申请人:</el-col>
                  <el-col :span="16" class="bd_n">
                    <el-input v-model="CreatedName" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8" class="bd_n">事业部:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input v-model="BUName" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8" class="bd_n">申请时间:</el-col>
                  <el-col :span="16" class="bd_n">
                    <el-input v-model="x_BackDate" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8" class="bd_n">项目名称:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input v-model="ProjName" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8" class="bd_n">退卡类型:</el-col>
                  <el-col :span="16" class="bd_n">
                    <el-input v-model="x_BackType" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8" class="bd_n">批次:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input v-model="x_BatchNum" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div class="content tableContent" v-if="isMobile">
            <div class="data_row">
              <div class="data_col">申请人:</div>
              <div class="data_col">{{CreatedName}}</div>
            </div>
            <div class="data_row">
              <div class="data_col">事业部:</div>
              <div class="data_col">{{BUName}}</div>
            </div>
            <div class="data_row">
              <div class="data_col">申请时间:</div>
              <div class="data_col">{{x_BackDate}}</div>
            </div>
            <div class="data_row">
              <div class="data_col">项目名称:</div>
              <div class="data_col">{{ProjName}}</div>
            </div>
            <div class="data_row">
              <div class="data_col">退卡类型:</div>
              <div class="data_col">{{x_BackType}}</div>
            </div>
            <div class="data_row">
              <div class="data_col">批次:</div>
              <div class="data_col">{{x_BatchNum}}</div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="titleText">退卡客户信息</h3>
          </template>
          <div class="content tableContent" v-if="!isMobile">
            <div class="data_row">
              <div class="data_col">客户姓名</div>
              <div class="data_col">办卡时间</div>
              <div class="data_col">已收金额</div>
              <div class="data_col">申退金额</div>
              <div class="data_col">结算方式</div>
              <div class="data_col">退款账户</div>
              <div class="data_col">退款银行</div>
              <div class="data_col">退款说明</div>
              <div class="data_col">置业顾问</div>
            </div>
            <div class="data_row" v-for="(item,idx) in CardApprovalDetail" :key="idx">
              <div class="data_col">
                <span>{{item.cstName}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_Zdkrq}}</span>
              </div>
              <div class="data_col">
                <span>{{item.BeforeRmbYe}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_Stje}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_Jsfs}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_Tkzh}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_Tkyh}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_Tksm}}</span>
              </div>
              <div class="data_col">
                <span>{{item.zygw}}</span>
              </div>
            </div>
          </div>
          <div class="content tableContent" v-if="isMobile">
            <el-table :data="CardApprovalDetail" border style="width: 100%">
              <el-table-column prop="cstName" :width="isMobile?120:''" label="客户姓名"></el-table-column>
              <el-table-column prop="x_Zdkrq" :width="isMobile?120:''" label="办卡时间"></el-table-column>
              <el-table-column prop="BeforeRmbYe" :width="isMobile?120:''" label="已收金额"></el-table-column>
              <el-table-column prop="x_Stje" :width="isMobile?120:''" label="申退金额"></el-table-column>
              <el-table-column prop="x_Jsfs" :width="isMobile?120:''" label="结算方式"></el-table-column>
              <el-table-column prop="x_Tkzh" :width="isMobile?120:''" label="退款账户"></el-table-column>
              <el-table-column prop="x_Tkyh" :width="isMobile?120:''" label="退款银行" ></el-table-column>
              <el-table-column prop="x_Tksm" :width="isMobile?120:''" label="退款说明"></el-table-column>
              <el-table-column prop="zygw" :width="isMobile?120:''" label="置业顾问"></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
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
    <!-- <div class="buttonBox" v-if="buttonflag">
      <el-button type="primary" v-if="isShowDiscard" @click="discard">废弃</el-button>
      <el-button type="primary" @click="preview">查看审批</el-button>
    </div>-->
    <Buttons />
  </div>
</template>

<script>
let width = document.body.offsetWidth;
import $ from "jquery";
import { sendJSONALLPATH, sendJSON } from "@/api/request";
import { weekPlanSort } from "@/utils/methods";
import { examineInfo, SendApproveCheck } from "@/api/offerFlow";
import { toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";
import { get } from "@/api/request.js";
import { appSetToken } from "@/utils/util";
export default {
  name: "chargeback",
  components: {
    codeAndName: () => import("@/views/offerFlow/component/codeAndName"),
    processForm: () => import("@/views/component/form.vue"),
    Buttons: () => import("../../views/offerFlow/component/index")
  },
  data() {
    return {
      activeNames: ["1", "2", "3"],
      isMobile: width <= 1024,
      CreatedName: "",
      buttonflag: false,
      isShowDiscard: true,
      BUName: "",
      x_BackDate: "",
      ProjName: "",
      codeAndName: [],
      x_BackType: "",
      x_BatchNum: "",
      CardApprovalDetail: [],
      ATTACHMENTS: []
    };
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.chargeback_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.chargeback_H.offsetHeight
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
        console.log(this.$refs.chargeback_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.chargeback_H.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  methods: {
    YZ_link(file) {
      // console.log(this.isMobile);
      if (this.isMobile) {
           var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(item) {
          return window.location.href.indexOf(item) !== -1;
        });
        let wm = {
          htmlTitle: "退卡",
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
        let requrl = file.url.split("?")[0];
        open(file.url);
      }
    },
    handleChange(val) {
      console.log(val);
    },
    preview() {
      toHistoryUrl({
        proInstId: this.flow_id
      }).then(res => {
        console.log(res);
        // location.href = res.data;
        window.open(res.data);
      });
    },
    discard() {
      this.$confirm(
        "此操作将废弃该流程,若还需重复发起该流程请勿进行此操作, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          get(`/WorkflowChoose/end?instanceId=${this.flow_id}`).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.isShowDiscard = false;
              this.$message.success(res.messages);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    getInfo() {
      examineInfo({
        json_id: this.$route.query.BOID
      }).then(res => {
        this.codeAndName = res.result;
        let json = JSON.parse(res.result[0].flow_json);
        let str = res.result[0].flow_json;
        console.log(json);

        let bankStr = str
          .split('x_Tkzh"')[1]
          .split(',"')[0]
          .split(":")[1]
          .replace(/"/g, "");
        console.log(bankStr);
        this.CreatedName = json.CreatedName;
        this.BUName = json.BUName;
        this.x_BackDate = json.x_BackDate;
        this.ProjName = json.ProjName;
        this.x_BackType = json.x_BackType;
        this.x_BatchNum = json.x_BatchNum;
        // this.CardApprovalDetail=json.CardApprovalDetail.Item

        if (json.CardApprovalDetail) {
          if (
            Object.prototype.toString.call(json.CardApprovalDetail.Item) ==
            "[object Array]"
          ) {
            json.CardApprovalDetail.Item.forEach(item => {
              this.CardApprovalDetail.push({
                cstName: item.cstName,
                x_Zdkrq: item.x_Zdkrq,
                BeforeRmbYe: item.BeforeRmbYe,
                x_Stje: item.x_Stje,
                x_Jsfs: item.x_Jsfs,
                x_Tkzh: item.x_Tkzh,
                x_Tkyh: item.x_Tkyh,
                x_Tksm: item.x_Tksm,
                zygw: item.zygw
              });
            });
          } else {
            let obj = {
              cstName: json.CardApprovalDetail.Item.cstName,
              x_Zdkrq: json.CardApprovalDetail.Item.x_Zdkrq,
              BeforeRmbYe: json.CardApprovalDetail.Item.BeforeRmbYe,
              x_Stje: json.CardApprovalDetail.Item.x_Stje,
              x_Jsfs: json.CardApprovalDetail.Item.x_Jsfs,
              x_Tkzh: bankStr,
              x_Tkyh: json.CardApprovalDetail.Item.x_Tkyh,
              x_Tksm: json.CardApprovalDetail.Item.x_Tksm,
              zygw: json.CardApprovalDetail.Item.zygw
            };
            this.CardApprovalDetail = [obj];
          }
        }
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
    if (
      localStorage.getItem("expiration") &&
      new Date().getTime() > localStorage.getItem("expiration")
    ) {
      //跳单点
      window.localStorage.removeItem("token");
    }
    if (this.$route.query.taskId) {
      this.buttonflag = true;
      queryFlowId({}, this.$route.query.BOID).then(res => {
        if (res.code == 200) {
          if (res.data.flow_status == 7) {
            this.isShowDiscard = false;
          }
          this.flow_id = res.data.flow_id;
        }
      });
    }
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
  }
};
</script>
<style lang="less" scoped>
.el-col-8 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang='less'>
.chargeback {
  .container {
    position: relative;
    z-index: 1997;
  }
  .buttonBox {
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    z-index: 100;
  }
  .tableContent {
    .bd_w .bd_n:first-child {
      text-align: center !important;
    }
    .el-row {
      text-align: center !important;
    }
    .bd_w {
      &:first-child {
        text-align: center !important;
      }
    }
    .data_row:first-child {
      border-top: 1px solid #e6e6e6;
    }
    .data_row {
      display: flex;
      word-break: break-all;
      // border-top: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;

      .data_col {
        flex: 1;
        text-align: center;
        // word-wrap:break-word;
        word-break: break-all;
        border-left: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        span {
          margin: 20px 0;
          display: inline-block;
        }
      }
    }
  }
  .lightFather {
    height: 20px;
    line-height: 20px;
    .light {
      height: 16px;
      width: 16px;
      background-color: green;
      border-radius: 50%;
      float: left;
      margin-top: 2px;
      margin-right: 10px;
    }
  }
  .content {
    padding: 0 20px;
  }

  .titleText {
    border-left: 3px solid #2661ff;
    height: 20px;
    line-height: 20px;
    text-indent: 1em;
    font-size: 16px;
  }

  input.el-input__inner {
    font-size: 12px;
    color: #333;
    // background-color: pink;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .container .el-collapse input.el-input__inner {
    font-size: 12px;
    color: #333;
    background-color: #fff;
    overflow: visible;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // background-color: red;
    border: none;
  }

  input::placeholder {
    font-size: 12px;
  }

  .bd_w {
    border-top: 1px solid #ccc;

    .bd_n {
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      font-size: 12px;

      &:first-child {
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        text-align: right;
      }
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
      padding: 0 20px;

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
