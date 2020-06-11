<template>
  <div ref="offerChangeHouse_H" class="offerChangeHouse app-container">
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
                    <el-input v-model="input1" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">项目名称:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <!-- <el-input v-model="input2" disabled></el-input> -->
                    <span>{{input2}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">发起人:</el-col>
                  <el-col :span="16" class="bd_n">
                    <el-input v-model="input3" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">发起日期:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input v-model="input4" disabled></el-input>
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
              <i class="light" :style="{'background-color':lights?'green':'red'}"></i>
              {{lights?'原房间重新定价价格大于原价格':'原房间重新定价价格等于原价格'}}
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="titleText">原房间认购信息</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">房间:</el-col>
                  <el-col :span="16" class="bd_n">
                    <!-- <el-input v-model="input5" disabled></el-input> -->
                    <span>{{input5}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">客户:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input v-model="input6" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">认购时间:</el-col>
                  <el-col :span="16" class="bd_n">
                    <el-input v-model="input7" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">置业顾问:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input v-model="Zygw" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="24">
                <el-row>
                  <el-col :span="isMobile?8:4" class="bd_n">成交渠道:</el-col>
                  <el-col :span="isMobile?16:20" class="bd_n bd_r">
                    <el-input v-model="Jyqd" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <h3 class="titleText">换房信息</h3>
          </template>
          <div class="content tableContent">
            <el-table :data="changeHouseData" border style="width: 100%">
              <el-table-column align="center" prop="room" label="指标" width="180"></el-table-column>
              <af-table-column align="center" prop="oldHouse" label="原房间信息"></af-table-column>
              <af-table-column align="center" prop="newHouse" label="新房间信息"></af-table-column>
              <af-table-column align="center" label="差值(新房间-原房间)">
                <template slot-scope="scope">
                  <span v-if="scope.$index==0"></span>
                  <span
                    v-else
                  >{{isNaN(Number(scope.row.newHouse)-Number(scope.row.oldHouse))?"":Number(scope.row.newHouse)-Number(scope.row.oldHouse) | toFixed}}</span>
                </template>
              </af-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <h3 class="titleText">换房原因</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">换房类型</el-col>
                  <el-col :span="16" class="bd_n">
                    <el-input v-model="input29" disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">换房原因</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{input30}}</span>
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
                  >原因说明:</el-col>
                  <el-col
                    :span="isMobile?16:20"
                    class="bd_n bd_r"
                    style="border-left:1px solid #ccc"
                  >
                    <div v-html="input31" style="word-wrap:break-word;"></div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <h3 class="titleText">退出房间重新定价</h3>
          </template>
          <div class="content tableContent">
            <el-table :data="outHouseData" border style="width: 100%">
              <af-table-column align="center" prop="name" label width="150"></af-table-column>
              <af-table-column align="center" prop="oldPrice" label="原价格信息"></af-table-column>
              <af-table-column align="center" prop="newPrice" label="新价格信息"></af-table-column>
              <af-table-column align="center" label="差值（新价格-原价格）">
                <template
                  slot-scope="scope"
                >{{isNaN(Number(scope.row.newPrice)-Number(scope.row.oldPrice))?"":Number(scope.row.newPrice)-Number(scope.row.oldPrice) | toFixed}}</template>
              </af-table-column>
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
    </el-row>
    <Buttons />
  </div>
</template>

<script>
let width = document.body.offsetWidth;
import $ from "jquery";
import { sendJSONALLPATH, sendJSON } from "@/api/request";
import { weekPlanSort } from "@/utils/methods";
import { examineInfo } from "@/api/offerFlow";
import { appSetToken } from "@/utils/util";
export default {
  name: "offerChangeHouse",
  components: {
    codeAndName: () => import("@/views/offerFlow/component/codeAndName"),

    processForm: () => import("@/views/component/form.vue"),
    Buttons: () => import("./component/index")
  },
  filters: {
    toFixed(data) {
      if (data == 0) {
        return 0;
      }
      if (!data) {
        return "";
      } else {
        return data.toFixed(2);
      }
    }
  },
  data() {
    return {
      radioList: "",
      codeAndName: [],
      isMobile: width <= 1024,
      changeHouseData: [],
      outHouseData: [],
      formInfo: "",
      activeNames: ["1", "2", "3", "4", "5", "6", "7"],
      value1: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      Zygw: "",
      Jyqd: "",
      input10: "",
      input11: "",
      input12: "",
      input13: "",
      input14: "",
      input15: "",
      input16: "",
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
      input37: " ",
      ATTACHMENTS: []
    };
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.offerChangeHouse_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.offerChangeHouse_H.offsetHeight
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
        console.log(this.$refs.offerChangeHouse_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.offerChangeHouse_H.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  computed: {
    lights() {
      let flag = true;
      this.outHouseData.forEach((item, idx) => {
        console.log(item.newPrice, item.oldPrice);

        if (Number(item.newPrice) - Number(item.oldPrice) <= 0) {
          flag = false;
        }
      });
      return flag;
    }
  },
  methods: {
    YZ_link(file) {
      // console.log(this.isMobile);
      if (this.isMobile) {
          var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(item) {
          return window.location.href.indexOf(item) !== -1;
        });
        let wm = {
          htmlTitle: "认购后换房",
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
        console.log(this.formInfo);

        this.input1 = this.formInfo.BName;
        this.input2 = this.formInfo.ProjectFullName;
        this.input3 = this.formInfo.UserName;
        this.input4 = this.formInfo.ApplyDate;
        this.input5 = this.formInfo.RoomInfo;
        this.input6 = this.formInfo.CstName;
        this.input7 = this.formInfo.QSDate;
        this.Zygw = this.formInfo.Zygw;
        this.Jyqd = this.formInfo.Jyqd;
        this.input11 = this.formInfo.RoomInfo;
        this.input12 = this.formInfo.NewRoomInfo;
        this.input13 = this.formInfo.Zkds;
        this.input14 = this.formInfo.ZkInfo;
        this.input16 = this.formInfo.YqyDate;
        this.input17 = this.formInfo.BldArea;
        this.input18 = this.formInfo.NewBldArea;
        this.input20 = this.formInfo.FkType;
        this.input22 = this.formInfo.x_IsApplyPolicy;
        this.input23 = this.formInfo.CjBldPrice;
        this.input24 = this.formInfo.NewCjBldPrice;
        this.input26 = this.formInfo.CjRmbTotal;
        this.input27 = this.formInfo.NewCjRmbTotal;
        this.input29 = this.formInfo.HfAlterType;
        this.input30 = this.formInfo.AlterReason;
        this.input31 = this.formInfo.Reason;
        console.log(this.formInfo.ATTACHMENTS);
        this.changeHouseData = [
          {
            room: "房间",
            oldHouse: this.formInfo.RoomInfo,
            newHouse: this.formInfo.NewRoomInfo
          },
          {
            room: "建筑面积(㎡)",
            oldHouse: this.formInfo.BldArea,
            newHouse: this.formInfo.NewBldArea
          },
          {
            room: "建筑单价(元/㎡)",
            oldHouse: this.formInfo.CjBldPrice,
            newHouse: this.formInfo.NewCjBldPrice
          },
          {
            room: "标准总价(元)",
            oldHouse: this.formInfo.CjRmbTotal,
            newHouse: this.formInfo.NewCjRmbTotal
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
.offerChangeHouse {
  .container {
    position: relative;
    z-index: 1997;
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
