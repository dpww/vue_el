<template>
  <div ref="staffByHouse_H" class="staffByHouse app-container">
    <el-row class="container">
      <codeAndName :codeAndName="codeAndName" />
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="titleText">基本信息</h3>
          </template>
          <div class="content" v-if="!isMobile">
            <div class="data_row">
              <div class="data_col">
                <span>事业部:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input1}}</span>
              </div>
              <div class="data_col">
                <span>项目名称:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{ProjectFullName}}</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>发起人:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{UserName}}</span>
              </div>
              <div class="data_col">
                <span>发起日期:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{ApplyDate}}</span>
              </div>
            </div>
          </div>
          <div v-else class="phone_content">
            <p>
              <span>事业部:</span>
              <span>{{input1}}</span>
            </p>
            <p>
              <span>项目名称:</span>
              <span>{{ProjectFullName}}</span>
            </p>
            <p>
              <span>发起人:</span>
              <span>{{UserName}}</span>
            </p>
            <p>
              <span>发起日期:</span>
              <span>{{ApplyDate}}</span>
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="titleText">房间信息</h3>
          </template>
          <div class="content" v-if="!isMobile">
            <div class="data_row">
              <div class="data_col">
                <span>房间:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input8}}</span>
              </div>
              <div class="data_col">
                <span>付款方式:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{PayFormName}}</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>认购面积:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{BldArea}}㎡</span>
              </div>
              <div class="data_col">
                <span>认购单价:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{CjBldPrice}}元/㎡</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>认购总价:</span>
              </div>
              <div class="data_col flex_all">
                <span>{{CjRmbTotal}}元</span>
              </div>
            </div>
          </div>
          <div v-else class="phone_content">
            <p>
              <span>房间:</span>
              <span>{{input8}}</span>
            </p>
            <p>
              <span>付款方式:</span>
              <span>{{PayFormName}}</span>
            </p>
            <p>
              <span>认购面积:</span>
              <span>{{BldArea}}㎡</span>
            </p>
            <p>
              <span>认购单价:</span>
              <span>{{CjBldPrice}}元/㎡</span>
            </p>
            <p>
              <span>认购总价:</span>
              <span>{{CjRmbTotal}}元</span>
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="titleText">购房人信息</h3>
          </template>
          <div class="content" v-if="!isMobile">
            <div class="data_row">
              <div class="data_col">
                <span>客户名称:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{CstName}}</span>
              </div>
              <div class="data_col">
                <span>员工/高管姓名:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{x_EmployeeName}}</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>与购房人关系:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{x_EmployeeBuyerRelation}}</span>
              </div>
              <div class="data_col">
                <span>员工职级:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{x_EmployeeRanks}}</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>首付比例:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{x_FistPayRate}}%</span>
              </div>
              <div class="data_col">
                <span>首付金额:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{x_FirstPayMoney}}万元</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>备注:</span>
              </div>
              <div class="data_col flex_all" style="padding:0 10px">
                <span style="text-align:left;padding:0;" v-html="Reason"></span>
              </div>
            </div>
          </div>
          <div v-else class="phone_content">
            <p>
              <span>客户名称:</span>
              <span>{{CstName}}</span>
            </p>
            <p>
              <span>员工/高管姓名:</span>
              <span>{{x_EmployeeName}}</span>
            </p>
            <p>
              <span>与购房人关系:</span>
              <span>{{x_EmployeeBuyerRelation}}</span>
            </p>
            <p>
              <span>员工职级:</span>
              <span>{{x_EmployeeRanks}}</span>
            </p>
            <p>
              <span>首付比例:</span>
              <span>{{x_FistPayRate}}%</span>
            </p>
            <p>
              <span>首付金额:</span>
              <span>{{x_FirstPayMoney}}万元</span>
            </p>
            <p>
              <span>备注:</span>
              <span v-html="Reason"></span>
            </p>
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
    <Buttons />
  </div>
</template>

<script>
let width = document.body.offsetWidth;
import $ from "jquery";

import { sendJSONALLPATH, sendJSON, get } from "@/api/request";
import { weekPlanSort } from "@/utils/methods";
import { examineInfo } from "@/api/offerFlow";
import { appSetToken } from "@/utils/util";
export default {
  name: "staffByHouse",
  components: {
    codeAndName: () => import("@/views/offerFlow/component/codeAndName"),
    processForm: () => import("@/views/component/form.vue"),
    Buttons: () => import("../../views/offerFlow/component/index")
  },
  data() {
    return {
      codeAndName: [],
      activeNames: ["1", "2", "3", "4"],
      isMobile: width <= 1024,
      input1: "",
      ProjectFullName: "",
      UserName: "",
      ApplyDate: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
      PayFormName: "",
      BldArea: "",
      CjBldPrice: "",
      CjRmbTotal: "",
      input13: "",
      CstName: "",
      x_EmployeeName: "",
      x_EmployeeBuyerRelation: "",
      x_FistPayRate: "",
      x_FirstPayMoney: "",
      x_EmployeeRanks: "",
      Reason: "",
      input19: "",
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
          htmlTitle: "认购后员工购房",
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
    getInfo() {
      examineInfo({
        json_id: this.$route.query.BOID
      }).then(res => {
        this.codeAndName = res.result;
        let json = JSON.parse(res.result[0].flow_json);
        console.log(json);

        this.input1 = json.BName;
        this.ProjectFullName = json.ProjectFullName;
        this.UserName = json.UserName;
        this.ApplyDate = json.ApplyDate;
        this.input5 = json.AlterTypeDtl;
        this.input6 = json.x_IsEmployeeBuyPolicy;
        this.input7 = json.x_IsApplyPolicy;
        this.input8 = json.RoomInfo;
        this.PayFormName = json.PayFormName;
        this.BldArea = json.BldArea;
        this.CjBldPrice = json.CjBldPrice;
        this.CjRmbTotal = json.CjRmbTotal;
        this.input13 = json.x_FirstPayMoney;
        this.CstName = json.CstName;
        this.x_EmployeeName = json.x_EmployeeName;
        this.x_EmployeeBuyerRelation = json.x_EmployeeBuyerRelation;
        this.x_FistPayRate = json.x_FistPayRate;
        this.x_EmployeeRanks = json.x_EmployeeRanks;

        this.x_FirstPayMoney = json.x_FirstPayMoney;
        this.Reason = json.Reason;
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
    //加载周计划程序已加载至2028年如果需要重新初始化打开注释重新发送，发送结束后请注释掉一下的代码
    //     let sendList=[];
    //     for(let i=2018;i<=2028;i++){
    //       for(let j=1;j<=12;j++){
    //         sendList.push(...weekPlanSort(`${i}-${j}-01`,true));
    //       }
    //     }
    //     sendJSONAllPath('http://192.168.34.66:8001/weekRule/getCommonWeekRule',{_param:sendList}); */
    // },
    // mounted(){
    // console.log(document.querySelectorAll("input"));
    // document.querySelectorAll("input").forEach(item=>{
    //   item.readonly=true
    //   item.disabled=true
    //   item.onfocus=item.blur()
    // })
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.staffByHouse_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.staffByHouse_H.offsetHeight
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
        console.log(this.$refs.staffByHouse_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.staffByHouse_H.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  }
};
</script>

<style lang='less'>
.staffByHouse {
  .container {
    position: relative;
    z-index: 1997;
  }
  .phone_content {
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    p {
      // padding-left:10%;
      min-height: 40px;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      display: flex;
      span {
        display: block;
        flex: 2;
        // padding-right:5px;
        text-align: left;
      }
      span:first-child {
        flex: 1;
        text-align: right;
        padding-right: 10px;
        border-right: 1px solid #ccc;
      }
      span:last-child {
        padding-left: 10px;
      }
    }
  }
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
      background-color: green;
      border-radius: 50%;
      float: left;
      margin-top: 2px;
      margin-right: 10px;
    }
  }
  .content {
    padding: 0 20px;
    .data_row {
      display: flex;
      border-left: 1px solid #e6e6e6;
      .data_col {
        flex: 1;
        text-align: center;
        border-right: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        span {
          padding: 20px 0;
          display: inline-block;
        }
      }
      .flex_2 {
        flex: 2;
      }
      .flex_all {
        flex: 5;
      }
    }
    .data_row:first-child {
      border-top: 1px solid #e6e6e6;
    }
  }

  .container input.el-input__inner {
    font-size: 12px;
    color: #333;
    background-color: #fff;
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
