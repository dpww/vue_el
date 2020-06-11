<template>
  <div ref="paymentMethod_H" class="paymentMethod app-container">
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
                <el-row>
                  <el-col :span="8" class="bd_n">事业部:</el-col>
                  <el-col :span="16" class="bd_n">
                    <el-input disabled v-model="BUName"></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">项目名称：</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input disabled v-model="ProjectName"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">发起人:</el-col>
                  <el-col :span="16" class="bd_n">
                    <el-input disabled v-model="Sponsor"></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">发起日期:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input disabled v-model="SponsorTime"></el-input>
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
              <i class="light" :style="{'background':ChangeClass==='增加首付款/按揭变全款'?'green':'red'}"></i>
              <span>{{ChangeClass}}</span>
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
                <el-row>
                  <el-col :span="8" class="bd_n">客户姓名:</el-col>
                  <el-col :span="16" class="bd_n">
                    <el-input disabled v-model="CstName"></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">置业顾问:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input disabled v-model="Adviser"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">房间:</el-col>
                  <el-col :span="16" class="bd_n">
                    <el-input disabled v-model="Room"></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">签约日期:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input disabled v-model="SigningTime"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">签约面积:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{SigningArea}}㎡</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">签约单价:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{SigningPrice}}元/㎡</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">签约金额:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{SumSigningAmount}}元</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">折扣:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input disabled v-model="DiscountInfo"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <el-row class="bd_w">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8" class="bd_n">已到账金额:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{GetAmount}}元</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>-->
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <h3 class="titleText">变更说明</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">变更细类:</el-col>
                  <el-col :span="16" class="bd_n">
                    <el-input disabled v-model="ChangeClass"></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">变更原因:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input disabled v-model="ChangeReason"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="24">
                <el-row>
                  <el-col :span="isMobile?8:4" class="bd_n">是否保留原折扣:</el-col>
                  <el-col :span="isMobile?16:20" class="bd_n bd_r">
                    <el-input disabled v-model="IsOldDiscount"></el-input>
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
                    <div v-html="ChangeRemark" style="word-wrap:break-word;"></div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <h3 class="titleText">变更明细</h3>
          </template>
          <div class="content">
            <el-table :data="changeInfo" border style="width: 100%">
              <el-table-column prop="name" label></el-table-column>
              <el-table-column prop="oldPay" label="原付款方式"></el-table-column>
              <el-table-column prop="newPay" label="新付款方式"></el-table-column>
            </el-table>
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
  name: "paymentMethod",
  components: {
    codeAndName: () => import("@/views/offerFlow/component/codeAndName"),
    Buttons: () => import("../../views/offerFlow/component/index")
  },
  data() {
    return {
      radioList: "",
      isMobile: width <= 1024,
      activeNames: ["1", "2", "3", "4", "5", "6", "7", "8"],
      changeInfo: [],
      BUName: "",
      ProjectName: "",
      CstName: "",
      Sponsor: "",
      SponsorTime: "",
      Adviser: "",
      Room: "",
      SigningTime: "",
      SigningPrice: "",
      SigningArea: "",
      SumSigningAmount: "",
      codeAndName: [],

      DiscountInfo: "",
      ChangeClass: "",
      ChangeReason: "",
      ATTACHMENTS: [],
      IsOldDiscount: "",
      GetAmount: "",
      ChangeRemark: ""
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
          htmlTitle: "签约后变更付款方式",
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
        this.BUName = json.BUName;
        this.ProjectName = json.ProjectName;
        this.CstName = json.CstName;
        this.Sponsor = json.Sponsor;
        this.SponsorTime = json.SponsorTime;
        this.Adviser = json.Adviser;
        this.Room = json.Room;
        this.SigningTime = json.SigningTime;
        this.SigningPrice = json.SigningPrice;
        this.SigningArea = json.SigningArea;
        this.SumSigningAmount = json.SumSigningAmount;
        this.DiscountInfo = json.DiscountInfo;
        this.ChangeClass = json.ChangeClass;
        this.ChangeReason = json.ChangeReason;
        this.ChangeRemark = json.ChangeRemark;
        this.IsOldDiscount = json.IsOldDiscount;
        this.GetAmount = json.GetAmount;
        this.changeInfo = [
          {
            name: "付款方式",
            oldPay: json.OldPayType,
            newPay: json.NewPayType
          },
          { name: "按揭银行", oldPay: json.OldAjBank, newPay: json.NewAjBank },
          {
            name: "按揭金额(元)",
            oldPay: json.OldAjAmount,
            newPay: json.NewAjAmount
          },
          {
            name: "按揭年限",
            oldPay: json.OldAjYears,
            newPay: json.NewAjYears
          },
          {
            name: "公积金银行",
            oldPay: json.OldGjjBank,
            newPay: json.NewGjjBank
          },
          {
            name: "公积金金额(元)",
            oldPay: json.OldGjjAmount,
            newPay: json.NewGjjAmount
          },
          {
            name: "公积金年限",
            oldPay: json.OldGjjYears,
            newPay: json.NewGjjYears
          }
        ];
        if (json.ATTACHMENTS) {
          if (
            Object.prototype.toString.call(json.ATTACHMENTS.FileItem) ==
            "[object Array]"
          ) {
            json.ATTACHMENTS.FileItem.forEach(item => {
              this.ATTACHMENTS.push({
                FILENAME: item.FILENAME,
                URL: item.URL
              });
            });
          } else {
            let obj = {
              URL: json.ATTACHMENTS.FileItem.URL,
              FILENAME: json.ATTACHMENTS.FileItem.FILENAME
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
        console.log(this.$refs.paymentMethod_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.paymentMethod_H.offsetHeight
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
        console.log(this.$refs.paymentMethod_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.paymentMethod_H.offsetHeight
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
.paymentMethod {
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
