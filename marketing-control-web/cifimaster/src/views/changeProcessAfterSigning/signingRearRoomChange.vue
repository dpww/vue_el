<template>
  <div ref="signingRearRoomChange_H" class="signingRearRoomChange app-container">
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
                    <span :title="BName">{{BName}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">项目名称：</el-col>
                  <el-col :span="16" style="overflow:hidden" class="bd_n bd_r">
                    <span :title="ProjectFullName">{{ProjectFullName}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">发起人:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{UserName}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
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
              <i class="light" :style="{'background':`${lightColor1}`}"></i>
              <span v-if="lightColor1=='red'">新房间比原房间的建筑面积小</span>
              <span v-else>新房间比原房间的建筑面积大</span>
            </el-row>
            <el-row class="lightFather">
              <i class="light" :style="{'background':`${lightColor2}`}"></i>
              <span v-if="lightColor2=='red'">新房间比原房间的建筑单价小</span>
              <span v-else>新房间比原房间的建筑单价大</span>
            </el-row>
            <el-row class="lightFather">
              <i class="light" :style="{'background':`${lightColor3}`}"></i>
              <span v-if="lightColor3=='red'">新房间比原房间的标准总价小</span>
              <span v-else>新房间比原房间的标准总价大</span>
            </el-row>
            <el-row class="lightFather">
              <i class="light" :style="{'background':isZero?'red':'green'}"></i>
              <span>{{isZero?'房间重新定价价格等于原价格':'房间重新定价价格大于原价格'}}</span>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="titleText">原房间签约信息</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">客户:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{CstName}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
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
                <el-row>
                  <el-col :span="8" class="bd_n">签约日期:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{QSDate}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">签约金额:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{CjRmbTotal}}元</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">已到账金额:</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{GetAmount}}元</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="24">
                <el-row>
                  <el-col :span="isMobile?8:4" class="bd_n">来访渠道:</el-col>
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
            <h3 class="titleText">换房信息</h3>
          </template>
          <div class="content">
            <el-table :data="changeHouseData" border style="width: 100%">
              <af-table-column align="center" :width="isMobile?170:''" prop="room" label></af-table-column>
              <el-table-column
                align="center"
                :width="isMobile?120:''"
                prop="oldHouse"
                label="原房间信息"
              ></el-table-column>
              <el-table-column
                align="center"
                :width="isMobile?120:''"
                prop="newHouse"
                label="新房间信息"
              ></el-table-column>
              <el-table-column align="center" :width="isMobile?120:''" label="差值（新房间-原房间）">
                <template slot-scope="scope">
                  <span v-if="scope.$index==0">--</span>
                  <span
                    v-else
                  >{{isNaN(Number(scope.row.newHouse)-Number(scope.row.oldHouse))?"":Number(scope.row.newHouse)-Number(scope.row.oldHouse) | fixed}}</span>
                </template>
              </el-table-column>
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
                  <el-col :span="8" class="bd_n">换房类型:</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{AlterType}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">换房原因:</el-col>
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
                  >原因说明:</el-col>
                  <el-col
                    :span="isMobile?16:20"
                    class="bd_n bd_r"
                    style="border-left:1px solid #ccc"
                  >
                    <div v-html="Reason" style="word-wrap:break-word;"></div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <h3 class="titleText">原房间重新定价</h3>
          </template>
          <div class="content tableContent">
            <el-table :data="oldHouseData" border style="width: 100%">
              <af-table-column prop="name" :width="isMobile?120:''" labaf align="center"></af-table-column>
              <el-table-column
                prop="oldPrice"
                :width="isMobile?120:''"
                label="原价格信息"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="newPrice"
                :width="isMobile?120:''"
                align="center"
                label="新价格信息"
              ></el-table-column>
              <el-table-column align="center" :width="isMobile?120:''" label="差值（新价格-原价格）">
                <template slot-scope="scope">
                  <span v-if="scope.$index==0">--</span>
                  <span
                    v-else
                  >{{isNaN(Number(scope.row.newPrice)-Number(scope.row.oldPrice))?"":Number(scope.row.newPrice)-Number(scope.row.oldPrice) | fixed}}</span>
                </template>
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
  name: "signingRearRoomChange",
  components: {
    codeAndName: () => import("@/views/offerFlow/component/codeAndName"),
    Buttons: () => import("../../views/offerFlow/component/index")
  },
  filters: {
    fixed: function(data) {
      if (data == 0) {
        return 0;
      }
      if (!data) {
        return "";
      } else if (isNaN(data)) {
        return "";
      } else {
        return data.toFixed(2);
      }
    }
  },
  data() {
    return {
      radioList: "",
      isMobile: width <= 1024,
      changeHouseData: [],
      oldHouseData: [],
      activeNames: ["1", "2", "3", "4", "5", "6"],
      BName: "",
      ProjectFullName: "",
      codeAndName: [],
      UserName: "",
      ApplyDate: "",
      CstName: "",
      Zygw: "",
      RoomInfo: "",
      QSDate: "",
      CjRmbTotal: "",
      GetAmount: "",
      Jyqd: "",
      AlterType: "",
      AlterReason: "",
      Reason: "",
      input22: "",
      input23: "",
      input24: "",
      input25: "",
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
          htmlTitle: "签约后换房",
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
        this.BName = json.BName;
        this.ProjectFullName = json.ProjectFullName;
        this.UserName = json.UserName;
        this.ApplyDate = json.ApplyDate;
        this.CstName = json.CstName;
        this.Zygw = json.Zygw;
        this.RoomInfo = json.RoomInfo;
        this.QSDate = json.QSDate;
        // this.input10 = json.BldArea + "㎡";
        // this.GetAmount = json.CjBldPrice + "/㎡";

        this.CjRmbTotal = json.CjRmbTotal;
        this.GetAmount = json.GetAmount;
        this.AlterType = json.AlterType;
        this.AlterReason = json.AlterReason;
        this.Reason = json.Reason;
        this.Jyqd = json.Jyqd;
        this.changeHouseData = [
          {
            room: "房间",
            oldHouse: json.RoomInfo,
            newHouse: json.NewRoomInfo
          },
          {
            room: "建筑面积(㎡)",
            oldHouse: json.BldArea,
            newHouse: json.NewBldArea
          },
          {
            room: "建筑单价(元/㎡)",
            oldHouse: json.CjBldPrice,
            newHouse: json.NewCjBldPrice
          },
          {
            room: "标准总价(元)",
            oldHouse: json.CjRmbTotal,
            newHouse: json.NewCjRmbTotal
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
    lightColor1() {
      let flag = "green";
      if (
        Number(this.changeHouseData[1].newHouse) -
          Number(this.changeHouseData[1].oldHouse) <
        0
      ) {
        flag = "red";
      }
      return flag;
    },
    lightColor2() {
      let flag = "green";
      if (
        Number(this.changeHouseData[2].newHouse) -
          Number(this.changeHouseData[2].oldHouse) <
        0
      ) {
        flag = "red";
      }
      return flag;
    },
    lightColor3() {
      let flag = "green";
      if (
        Number(this.changeHouseData[3].newHouse) -
          Number(this.changeHouseData[3].oldHouse) <
        0
      ) {
        flag = "red";
      }
      return flag;
    },
    isZero() {
      let flag = true;
      this.oldHouseData.forEach((item, index) => {
        if (Number(item.newPrice) - Number(item.oldPrice) > 0) {
          flag = false;
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
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.signingRearRoomChange_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.signingRearRoomChange_H.offsetHeight
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
        console.log(this.$refs.signingRearRoomChange_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.signingRearRoomChange_H.offsetHeight
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
.signingRearRoomChange {
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
      padding: 10px 10px 0;
      min-height: 40px;
      // line-height: 40px;
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
