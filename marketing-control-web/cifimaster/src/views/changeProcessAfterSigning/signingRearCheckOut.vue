<template>
  <div ref="signingRearCheckOut_H" class="signingRearCheckOut app-container">
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
                  <el-col :span="8" class="bd_n">事业部:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{BName}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">项目名称：</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{ProjectFullName}}</span>
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
            <h3 class="titleText">签约信息</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">客户:</el-col>
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
                  <el-col :span="16" class="bd_n">
                    <span>{{RoomInfo}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">签约时间:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{QSDate}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">建筑面积:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span class="Rename">{{BldArea }} ㎡</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">建筑单价:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span class="Rename">{{CjBldPrice }} 元/㎡</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="24">
                <el-row type="flex">
                  <el-col :span="isMobile?8:4" class="bd_n">签约金额:</el-col>
                  <el-col :span="isMobile?16:20" class="bd_n bd_r">
                    <span class="Rename">{{CjRmbTotal }}元</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">折扣说明:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{DiscntRemark}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">已到账金额:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span class="Rename">{{GetAmount }} 元</span>
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
        <el-collapse-item name="4">
          <template slot="title">
            <h3 class="titleText">退房说明</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">变更类型:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{AlterType}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">原因分类:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{AlterReason}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w" style="border-left:1px solid #ccc">
              <el-col :span="24">
                <el-row>
                  <el-col
                    :span="isMobile?8:4"
                    class="bd_n"
                    style="border:none;border-right:none"
                  >变更说明:</el-col>
                  <el-col
                    :span="isMobile?16:20"
                    class="bd_n bd_r"
                    style="border-left:1px solid #ccc"
                  >
                    <div style="word-wrap:break-word;" v-html="Reason"></div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <h3 class="titleText">违约金说明</h3>
          </template>
          <div class="content tableContent">
            <el-table :data="contractData" border style="width: 100%">
              <el-table-column align="center" prop="payment" label="合同约定违约金(元)"></el-table-column>
              <el-table-column align="center" prop="contract" label="申请收取违约金(元)"></el-table-column>
              <el-table-column align="center" label="差值(元)(申请-约定)">
                <template
                  slot-scope="scope"
                >{{isNaN(scope.row.contract-scope.row.payment)?'':Number(scope.row.contract)-Number(scope.row.payment)}}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <h3 class="titleText">原房间重新定价</h3>
          </template>
          <div class="content tableContent">
            <el-table :data="oldHouseData" border style="width: 100%">
              <af-table-column align="center" prop="name" label :width="isMobile?'150':''"></af-table-column>
              <el-table-column
                align="center"
                prop="oldPrice"
                :width="isMobile?'150':''"
                label="原价格信息"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="newPrice"
                :width="isMobile?'150':''"
                label="新价格信息"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="diff"
                :width="isMobile?'150':''"
                label="差值（新价格-原价格）"
              >
                <template
                  slot-scope="scope"
                >{{isNaN(Number(scope.row.newPrice)-Number(scope.row.oldPrice))?'':(Number(scope.row.newPrice)-Number(scope.row.oldPrice)).toFixed(2)}}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
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
  name: "signingRearCheckOut",
  components: {
    codeAndName: () => import("@/views/offerFlow/component/codeAndName"),
    Buttons: () => import("../../views/offerFlow/component/index")
  },
  data() {
    return {
      radioList: "",
      isMobile: width <= 1024,
      contractData: [
        { payment: "162,011.40", contract: "162,011.40", diff: "0" }
      ],
      oldHouseData: [],
      activeNames: ["1", "2", "3", "4", "5", "6"],

      BName: "",
      ProjectFullName: "",
      UserName: "",
      ApplyDate: "",
      CstName: "",
      Zygw: "",
      RoomInfo: "",
      QSDate: "",
      codeAndName: [],
      CjRmbTotal: "",
      BldArea: "",
      DiscntRemark: "",
      CjBldPrice: "",
      Jyqd: "",
      AlterType: "",
      AlterReason: "",
      Reason: "",
      input22: "",
      input23: "",
      input24: "",
      input25: "",
      ATTACHMENTS: [],
      GetAmount: ""
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
          htmlTitle: "签约后退房",
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
        // console.log(res)
        this.codeAndName = res.result;
        let json = JSON.parse(res.result[0].flow_json);
        console.log(json);
        this.BName = json.BName;
        this.ProjectFullName = json.ProjectFullName;
        this.UserName = json.UserName;
        this.ApplyDate = json.ApplyDate;
        this.CstName = json.CstName;
        this.Zygw = json.Zygw;
        this.RoomInfo = json.RoomInfo;
        this.QSDate = json.QSDate;
        this.CjRmbTotal = json.CjRmbTotal;
        this.CjBldPrice = json.CjBldPrice;
        this.GetAmount = json.GetAmount;
        this.Jyqd = json.Jyqd;
        this.AlterType = json.AlterType;
        this.AlterReason = json.AlterReason;
        this.Reason = json.Reason;
        this.DiscntRemark = json.DiscntRemark;
        this.BldArea = json.BldArea;

        this.contractData = [
          {
            payment: json.ContractBreachMoney,
            contract: json.HandCharge
          }
        ];
        this.oldHouseData = [
          {
            name: "变更后底总价",
            newPrice: json.NewDjTotal,
            oldPrice: json.OldDjTotal
          },
          {
            name: "变更后底套内单价",
            newPrice: json.NewDjTnPrice,
            oldPrice: json.OldDjTnPrice
          },
          {
            name: "变更后底建筑单价",
            newPrice: json.NewDjBldPrice,
            oldPrice: json.OldDjBldPrice
          },
          {
            name: "变更后总价",
            newPrice: json.NowTotalPrice,
            oldPrice: json.OldTotal
          },
          {
            name: "变更后套内单价",
            newPrice: json.NowUsablePrice,
            oldPrice: json.OldTnPrice
          },
          {
            name: "变更后建筑单价",
            newPrice: json.NowBuildingPrice,
            oldPrice: json.OldBldPrice
          }
        ];

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
  computed: {
    isJm() {
      let flag = "red";
      if (
        Number(this.contractData[0].payment) -
          Number(this.contractData[0].contract) <=
        0
      ) {
        flag = "green";
      }
      return flag;
    },
    isDJ() {
      let flag = "red";
      this.oldHouseData.forEach(item => {
        if (Number(item.newPrice) - Number(item.oldPrice) != 0) {
          flag = "green";
        }
      });
      return flag;
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
    // this.getInfo()
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.signingRearCheckOut_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.signingRearCheckOut_H.offsetHeight
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
        console.log(this.$refs.signingRearCheckOut_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.signingRearCheckOut_H.offsetHeight
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
.signingRearCheckOut {
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
        margin: 0 15px;
      }
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
