<template>
  <div ref="paymentRequest_H" class="paymentRequest app-container">
    <el-row class="container">
      <codeAndName :codeAndName="codeAndName" />
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="titleText">审批信息</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12">
                <el-row :style="{'border-bottom':isMobile?'1px solid #ccc':''}">
                  <el-col :span="8" class="bd_n">付款主题:</el-col>
                  <el-col :span="16" :class="isMobile?'bd_n bd_r':'bd_n'">
                    <span>{{x_PayTitle}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">申请日期:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{x_ApplyDate}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12">
                <el-row :style="{'border-bottom':isMobile?'1px solid #ccc':''}">
                  <el-col :span="8" class="bd_n">申请类型:</el-col>
                  <el-col :span="16" :class="isMobile?'bd_n bd_r':'bd_n'">
                    <span>{{x_ApplyType}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">申请人:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{x_ApplyPerson}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12">
                <el-row type="flex" :style="{'border-bottom':isMobile?'1px solid #ccc':''}">
                  <el-col :span="8" class="bd_n">项目名称:</el-col>
                  <el-col :span="16" :class="isMobile?'bd_n bd_r':'bd_n'">
                    <span>{{ProjName}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">申请金额:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{x_ApplyMoney}} 元</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="24">
                <el-row>
                  <el-col :span="isMobile?8:4" class="bd_n">备注:</el-col>
                  <el-col :span="isMobile?16:20" class="bd_n bd_r">
                    <span v-html="x_Remark"></span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="titleText">付款信息</h3>
          </template>
          <div class="content tableContent" v-if="!isMobile">
            <div class="data_row">
              <div class="data_col">客户名称</div>
              <div class="data_col">客户手机</div>
              <div class="data_col">已收金额(元)</div>
              <div class="data_col">付款金额(元)</div>
              <div class="data_col">付款账号</div>
              <div class="data_col">付款银行</div>
              <div class="data_col">房间名称</div>
              <div class="data_col">最后一次收款日期</div>
              <div class="data_col">业务类型</div>
            </div>
            <div class="data_row" v-for="(item,idx) in payApproveDetail" :key="idx">
              <div class="data_col">
                <span>{{item.x_CstNames}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_CstTels}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_YsMoney}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_PayMoney}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_PayAccount}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_PayBank}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_RoomName}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_LastSkRq}}</span>
              </div>
              <div class="data_col">
                <span>{{item.x_SaleType}}</span>
              </div>
            </div>
          </div>
          <div class="content tableContent" v-if="isMobile">
            <el-table :data="payApproveDetail" border style="width: 100%">
              <el-table-column prop="x_CstNames" align="center" label="客户名称"></el-table-column>
              <el-table-column
                prop="x_CstTels"
                align="center"
                label="客户手机"
                :width="isMobile?120:''"
              ></el-table-column>
              <el-table-column prop="x_YsMoney" align="center" label="已收金额(元)"></el-table-column>
              <el-table-column prop="x_PayMoney" align="center" label="付款金额(元)"></el-table-column>
              <el-table-column
                prop="x_PayAccount"
                align="center"
                label="付款账号"
                :width="isMobile?220:''"
              ></el-table-column>
              <el-table-column
                prop="x_PayBank"
                align="center"
                label="付款银行"
                :width="isMobile?200:''"
              ></el-table-column>
              <el-table-column
                prop="x_RoomName"
                align="center"
                label="房间名称"
                :width="isMobile?200:''"
              ></el-table-column>
              <el-table-column
                prop="x_LastSkRq"
                align="center"
                label="最后一次收款日期"
                :width="isMobile?150:''"
              ></el-table-column>
              <el-table-column prop="x_SaleType" align="center" label="业务类型"></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
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
import { appSetToken } from "@/utils/util";
import { get } from "@/api/request.js";
export default {
  name: "paymentRequest",
  components: {
    codeAndName: () => import("@/views/offerFlow/component/codeAndName"),
    processForm: () => import("@/views/component/form.vue"),
    Buttons: () => import("../../views/offerFlow/component/index")
  },
  data() {
    return {
      codeAndName: [],
      x_PayTitle: "",
      buttonflag: false,
      BusinessType: "",
      BUCode: "",
      isMobile: width <= 1024,
      isShowDiscard: true,
      x_ApplyDate: "",
      x_ApplyType: "",
      x_ApplyPerson: "",
      x_ApplyMoney: "",
      flow_id: "",
      ProjName: "",
      x_ProjGUID: "",
      x_Remark: "",
      payApproveDetail: [],
      ATTACHMENTS: [],
      activeNames: ["1", "2", "3", "4"]
    };
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.paymentRequest_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.paymentRequest_H.offsetHeight
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
        console.log(this.$refs.paymentRequest_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.paymentRequest_H.offsetHeight
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
          htmlTitle: "付款申请",
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

        let json = {
          ...JSON.parse(res.result[0].flow_json)
        };
        console.log(json);

        let str = res.result[0].flow_json;
        let bankStr = str
          .split('x_PayAccount"')[1]
          .split(',"')[0]
          .split(":")[1]
          .replace(/"/g, "");
        console.log(bankStr);

        this.x_PayTitle = json.x_PayTitle;
        this.x_ApplyDate = json.x_ApplyDate;
        this.x_ApplyType = json.x_ApplyType;
        this.x_ApplyPerson = json.x_ApplyPerson;
        this.x_ApplyMoney = json.x_ApplyMoney;
        this.x_Remark = json.x_Remark;
        this.ProjName = json.ProjName;

        if (json.payApproveDetail) {
          if (
            Object.prototype.toString.call(json.payApproveDetail.Item) ==
            "[object Array]"
          ) {
            json.payApproveDetail.Item.forEach(item => {
              this.payApproveDetail.push({
                YsqAmount: item.YsqAmount,
                x_CstNames: item.x_CstNames,
                x_CstTels: item.x_CstTels,
                x_LastSkRq: item.x_LastSkRq,
                x_PayAccount: item.x_PayAccount,
                x_PayBank: item.x_PayBank,
                x_PayMoney: item.x_PayMoney,
                x_RoomName: item.x_RoomName,
                x_SaleType: item.x_SaleType,
                x_YsMoney: item.x_YsMoney
              });
            });
          } else {
            let obj = {
              YsqAmount: json.payApproveDetail.Item.YsqAmount,
              x_CstNames: json.payApproveDetail.Item.x_CstNames,
              x_CstTels: json.payApproveDetail.Item.x_CstTels,
              x_LastSkRq: json.payApproveDetail.Item.x_LastSkRq,
              x_PayAccount: bankStr,
              x_PayBank: json.payApproveDetail.Item.x_PayBank,
              x_PayMoney: json.payApproveDetail.Item.x_PayMoney,
              x_RoomName: json.payApproveDetail.Item.x_RoomName,
              x_SaleType: json.payApproveDetail.Item.x_SaleType,
              x_YsMoney: json.payApproveDetail.Item.x_YsMoney
            };
            this.payApproveDetail = [obj];
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
.paymentRequest {
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
      min-height: 40px;
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
