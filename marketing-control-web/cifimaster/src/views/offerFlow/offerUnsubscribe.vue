<template>
  <div ref="offerUnsubscribe_H" class="offerUnsubscribe app-container">
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
                <span>{{input2}}</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>发起人:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input3}}</span>
              </div>
              <div class="data_col">
                <span>发起日期:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input4}}</span>
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
              <span>{{input2}}</span>
            </p>
            <p>
              <span>发起人:</span>
              <span>{{input3}}</span>
            </p>
            <p>
              <span>发起日期:</span>
              <span>{{input4}}</span>
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="titleText">审批要点</h3>
          </template>
          <div class="content">
            <el-row class="lightFather">
              <i class="light" :style="{'background':`${isJm}`}"></i>
              <span>{{isJm=='red'?'违约金减免':'违约金无减免'}}</span>
            </el-row>
            <el-row class="lightFather">
              <i class="light" :style="{'background':`${isDJ}`}"></i>
              <span>{{isDJ=='red'?'房间重新定价价格等于原价格':'房间重新定价价格大于原价格'}}</span>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="titleText">认购信息</h3>
          </template>
          <div class="content" v-if="!isMobile">
            <div class="data_row">
              <div class="data_col">
                <span>客户姓名:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input6}}</span>
              </div>
              <div class="data_col">
                <span>置业顾问:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input7}}</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>房间:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input8}}</span>
              </div>
              <div class="data_col">
                <span>认购时间:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input9}}</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>认购面积:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input10}}㎡</span>
              </div>
              <div class="data_col">
                <span>认购单价:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input11}}元/㎡</span>
              </div>
            </div>
            <div class="data_row">
              <div class="data_col">
                <span>认购总价:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input12}}元</span>
              </div>
              <div class="data_col">
                <span>折扣:</span>
              </div>
              <div class="data_col flex_2">
                <span>{{input13}}</span>
              </div>
            </div>

            <div class="data_row">
              <div class="data_col">
                <span>成交渠道:</span>
              </div>
              <div class="data_col flex_all">
                <span>{{Jyqd}}</span>
              </div>
            </div>
          </div>
          <div v-else class="phone_content">
            <p>
              <span>客户姓名:</span>
              <span>{{input6}}</span>
            </p>
            <p>
              <span>置业顾问:</span>
              <span>{{input7}}</span>
            </p>
            <p>
              <span>房间:</span>
              <span>{{input8}}</span>
            </p>
            <p>
              <span>认购时间:</span>
              <span>{{input9}}</span>
            </p>
            <p>
              <span>认购面积:</span>
              <span>{{input10}}㎡</span>
            </p>
            <p>
              <span>认购单价:</span>
              <span>{{input11}}元/㎡</span>
            </p>
            <p>
              <span>认购总价:</span>
              <span>{{input12}}元</span>
            </p>
            <p>
              <span>折扣:</span>
              <span>{{input13}}</span>
            </p>
            <p>
              <span>成交渠道:</span>
              <span>{{Jyqd}}</span>
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <h3 class="titleText">退订说明</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">退订类型:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{input17}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">原因分类:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{input18}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w" style="border-left:1px solid #ccc">
              <el-col :span="24">
                <el-row>
                  <el-col
                    :span="isMobile?8:4"
                    style="border:none;border-right:none"
                    class="bd_n"
                  >变更说明:</el-col>
                  <el-col
                    :span="isMobile?16:20"
                    class="bd_n bd_r"
                    style="border-left:1px solid #ccc"
                  >
                    <div style="word-wrap:break-word;" v-html="input19"></div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <h3 class="titleText">违约金</h3>
          </template>
          <div class="content tableContent">
            <el-table :data="contractData" border style="width: 100%">
              <el-table-column align="center" prop="payment" label="已收定金"></el-table-column>
              <el-table-column align="center" prop="contract" label="申请收取违约金(元)"></el-table-column>
              <el-table-column align="center" label="差值(元)（申请-已付定金）">
                <template
                  slot-scope="scope"
                >{{isNaN(Number(scope.row.contract-scope.row.payment))?'':Number(scope.row.contract)-Number(scope.row.payment)}}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <h3 class="titleText">退出房间重新定价</h3>
          </template>
          <div class="content tableContent">
            <el-table :data="outHouseData" border style="width: 100%">
              <el-table-column align="center" prop="name" :width="isMobile?150:''" label></el-table-column>
              <el-table-column
                align="center"
                prop="oldPrice"
                :width="isMobile?120:''"
                label="原价格信息"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="newPrice"
                :width="isMobile?120:''"
                label="新价格信息"
              ></el-table-column>
              <el-table-column align="center" :width="isMobile?120:''" label="差值（新价格-原价格）">
                <template
                  slot-scope="scope"
                >{{isNaN(Number(scope.row.newPrice)-Number(scope.row.oldPrice))?"":Number(scope.row.newPrice)-Number(scope.row.oldPrice) | fixed}}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item name="7">
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
      <Buttons />
    </el-row>
  </div>
</template>
<script>
let width = document.body.offsetWidth;
import $ from "jquery";

import { sendJSONALLPATH, sendJSON } from "@/api/request";
import { weekPlanSort } from "@/utils/methods";
import { testhuan } from "@/api/offerFlow";
import { examineInfo } from "@/api/offerFlow";
import { appSetToken } from "@/utils/util";
export default {
  name: "offerUnsubscribe",
  components: {
    codeAndName: () => import("@/views/offerFlow/component/codeAndName"),
    processForm: () => import("@/views/component/form.vue"),
    Buttons: () => import("./component/index")
  },
  filters: {
    fixed(data) {
      if (!data) {
        return 0;
      } else if (isNaN(Number(data))) {
        return 0;
      } else {
        return Number(data).toFixed(2);
      }
    }
  },
  computed: {
    isJm() {
      let flag = "red";
      if (this.contractData.length == 0) {
        return flag;
      }
      if (
        Number(this.contractData[0].payment) <=
        Number(this.contractData[0].contract)
      ) {
        flag = "green";
      }
      return flag;
    },
    isDJ() {
      let flag = "red";
      this.outHouseData.forEach(item => {
        if (Number(item.newPrice) - Number(item.oldPrice) != 0) {
          flag = "green";
        }
      });
      return flag;
    }
  },
  data() {
    return {
      radioList: [],
      codeAndName: [],
      isMobile: width <= 1024,
      contractData: [
        // {payment:"162,011.40",contract:"162,011.40",diff:"0"}
      ],
      outHouseData: [],
      activeNames: ["1", "2", "3", "4", "5", "6", "7"],
      value1: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input6: "",
      input7: "",
      input8: "",
      input9: "",
      input10: "",
      input11: "",
      input12: "",
      input13: "",
      Jyqd: "",
      input17: "",
      input18: "",
      input19: "",
      input20: "",
      input21: "",
      input22: "",
      input23: "",
      input24: "",
      input25: "",
      input26: "",
      input27: "",
      input28: "",
      input29: "",
      input30: "",
      input31: "",
      input32: "",
      input33: "",
      input34: "",
      input35: "",
      input36: "",
      input37: "",
      input38: "",
      input39: "",
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
          htmlTitle: "认购后退房",
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
        this.formInfo = {
          ...JSON.parse(res.result[0].flow_json)
        };
        // console.log(JSON.parse(this.formInfo.Data[3]),"formInfo");
        console.log(this.formInfo, "formInfo");

        this.input1 = this.formInfo.BName;
        this.input2 = this.formInfo.ProjectFullName;
        this.input3 = this.formInfo.UserName;
        this.input4 = this.formInfo.ApplyDate;
        this.input6 = this.formInfo.CstName;
        this.input7 = this.formInfo.Zygw;
        this.input8 = this.formInfo.RoomInfo;
        this.input9 = this.formInfo.QSDate;
        this.input10 = this.formInfo.BldArea;
        this.input11 = this.formInfo.CjBldPrice;
        this.input12 = this.formInfo.CjRmbTotal;
        this.input13 = this.formInfo.ZkInfo;
        this.Jyqd = this.formInfo.Jyqd;
        this.input17 = this.formInfo.AlterType;
        this.input18 = this.formInfo.AlterReason;
        this.input19 = this.formInfo.Reason;
        this.input20 = this.formInfo.GetAmount;
        this.input21 = this.formInfo.HandCharge;
        this.input22 = parseInt(this.input21) - parseInt(this.input20);
        this.contractData = [
          {
            payment: this.formInfo.GetAmount,
            contract: this.formInfo.HandCharge
          }
        ];
        this.outHouseData = [
          {
            name: "变更后底总价",
            newPrice: this.formInfo.NewDjTotal,
            oldPrice: this.formInfo.OldDjTotal
          },
          {
            name: "变更后底套内单价",
            newPrice: this.formInfo.NewDjTnPrice,
            oldPrice: this.formInfo.OldDjTnPrice
          },
          {
            name: "变更后底建筑单价",
            newPrice: this.formInfo.NewDjBldPrice,
            oldPrice: this.formInfo.OldDjBldPrice
          },
          {
            name: "变更后总价",
            newPrice: this.formInfo.NowTotalPrice,
            oldPrice: this.formInfo.OldTotal
          },
          {
            name: "变更后套内单价",
            newPrice: this.formInfo.NowUsablePrice,
            oldPrice: this.formInfo.OldTnPrice
          },
          {
            name: "变更后建筑单价",
            newPrice: this.formInfo.NowBuildingPrice,
            oldPrice: this.formInfo.OldBldPrice
          }
        ];
        if (this.formInfo.ATTACHMENTS) {
          if (
            Object.prototype.toString.call(this.formInfo.ATTACHMENTS.Item) ==
            "[object Array]"
          ) {
            this.formInfo.ATTACHMENTS.Item.forEach(item => {
              this.ATTACHMENTS.push({
                FILENAME: item.FILENAME,
                URL: item.URL
              });
            });
          } else {
            let obj = {
              URL: this.formInfo.ATTACHMENTS.Item.URL,
              FILENAME: this.formInfo.ATTACHMENTS.Item.FILENAME
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
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.offerUnsubscribe_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.offerUnsubscribe_H.offsetHeight
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
        console.log(this.$refs.offerUnsubscribe_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.offerUnsubscribe_H.offsetHeight
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
.offerUnsubscribe {
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
  .lightFather {
    height: 20px;
    line-height: 20px;
    .light {
      height: 16px;
      width: 16px;
      // background-color: green;
      border-radius: 50%;
      float: left;
      margin-top: 2px;
      margin-right: 10px;
    }
  }
  .tableContent {
    .bd_w .bd_n:first-child {
      text-align: center !important;
    }
    .el-row {
      text-align: center !important;
    }
    input {
      text-align: center !important;
    }
    .bd_w {
      &:first-child {
        text-align: center !important;
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

  .container input.el-input__inner {
    font-size: 12px;
    color: #333;
    border: none;
    background-color: #fff;
  }

  input.el-input__inner {
    font-size: 12px;
    color: #333;
    // background-color: pink;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
