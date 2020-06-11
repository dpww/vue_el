<template>
  <div id="discountPage" ref="offerChangeHouse_H">
    <div class="discountPage_container">
      <el-collapse disabled="true" v-model="activeName">
        <div class="userInfo">
          <!-- <h3 class="title">{{userInfo.ProjectFullName}}</h3> -->
          <el-collapse-item name="1">
            <template slot="title">
              <h3 class="titleText">基本信息:</h3>
            </template>
            <div class="content">
              <!-- el-col isPhone判定宽度 -->
              <el-row>
                <el-col :span="isPhone?24 : 12" class="content_phone_Border">
                  <el-row>
                    <el-col align="left" class="bd_n">
                      项目名称:
                      <span>{{userInfo.ProjectFullName}}</span>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="isPhone?24 : 12" class="content_phone_Border">
                  <el-row>
                    <el-col align="left" class="bd_n">
                      申请人:
                      <span>{{userInfo.CreatedName}}</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="isPhone?24 : 12" class="content_phone_Border">
                  <el-row>
                    <el-col align="left" class="bd_n">
                      申请时间:
                      <span>{{userInfo.CreatedTime}}</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </div>
        <div class="policy" v-for="(item, index) in GUID" :key="index">
          <el-collapse-item name="2">
            <template slot="title">
              <div class="titleText zc">
                <span class="ti">政策信息{{index+1}}:</span>

                <span>{{item.DiscountPlanName}}</span>
                <!-- <span>{{item.BgnDate}}</span>
                <span>{{item.CreatedTime}}</span>
                <span>{{item.UsedScope}}</span>-->
                <div class="zcmsg">
                  <!-- <span></span>
                  <span>哈哈哈</span>
                  <span>哈哈哈</span>
                  <span>哈哈哈</span>-->

                  <el-row>
                    <el-col :span="isPhone?24 : 12" class="content_phone_Border">
                      <el-row>
                        <el-col align="left" class="bd_n">{{item.BgnDate}}</el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="isPhone?24 : 12" class="content_phone_Border">
                      <el-row>
                        <el-col align="left" class="bd_n">
                          <!-- {{item.BgnDate}} -->
                          {{item.EndDate}}
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="isPhone?24 : 12" class="content_phone_Border">
                      <el-row>
                        <el-col align="left" class="bd_n">{{item.UsedScope}}</el-col>
                        <!-- <el-col align="left" class="bd_n">{{item.UsedScope}}</el-col> -->
                      </el-row>
                    </el-col>
                  </el-row>
                  <!-- <p>指定楼栋: {{item.BldFullName}}</p> -->
                </div>
                <p  style="padding-top:8px">指定楼栋: <span v-if="item.BldFullName">{{item.BldFullName}}</span></p>
              </div>
            </template>
            <div class="content">
              <!-- <ul class="contentTop">
                <li>{{item.DiscountPlanName}}</li>
                <li>{{item.UsedScope}}</li>
                <li>{{item.BgnDate}}</li>
                <li v-show="item.EndDate">{{item.EndDate}}</li>
                <li>{{item.CreatedName}}</li>
                <li>{{item.CreatedTime}}</li>
              </ul>-->
              <div class="table" v-if="isPhone">
                <el-table
                  :data="item.list"
                  border
                  style="width: 100%"
                  :header-cell-style="{ color: '#333333' }"
                >
                  <el-table-column type="index" width="40"></el-table-column>
                  <el-table-column prop="DiscountDetailName" width="150" label="名称"></el-table-column>
                  <el-table-column prop="DiscountType" width="200" label="折扣类型"></el-table-column>
                  <el-table-column prop="CalMethod" width="200" label="计算方法"></el-table-column>
                  <el-table-column prop="AppScenarios" width="200" label="折扣分类"></el-table-column>
                  <el-table-column prop="DiscountVlue" width="200" label="折扣(%)"></el-table-column>
                  <el-table-column prop="DiscountVlue" width="200" label="优惠(元)"></el-table-column>
                  <el-table-column prop="SpecifyRoom" width="200" label="指定房间"></el-table-column>
                </el-table>
              </div>
              <div class="table" v-else>
                <el-table
                  :data="item.list"
                  border
                  style="width: 100%"
                  :header-cell-style="{ color: '#333333' }"
                >
                  <el-table-column type="index" width="40"></el-table-column>
                  <el-table-column prop="DiscountDetailName" width="150" label="名称"></el-table-column>
                  <el-table-column prop="DiscountType" label="折扣类型"></el-table-column>
                  <el-table-column prop="CalMethod" label="计算方法"></el-table-column>
                  <el-table-column prop="AppScenarios" label="折扣分类"></el-table-column>
                  <el-table-column prop="DiscountVlue" label="折扣(%)"></el-table-column>
                  <el-table-column prop="PreferentialPrice" label="优惠(元)"></el-table-column>
                  <el-table-column prop="SpecifyRoom" label="指定房间"></el-table-column>
                </el-table>
              </div>
            </div>
          </el-collapse-item>
        </div>
        <div class="apply">
          <el-collapse-item name="3">
            <template slot="title">
              <h3 class="titleText">申请信息:</h3>
            </template>
            <div class="content">
              <el-row>
                <el-col :span="isPhone?24 : 12" class="content_phone_Border">
                  <el-col align="left" class="bd_n bor">
                    是否已申请一揽子分期政策:
                    <span>{{Approval.IsApplicationFq}}</span>
                  </el-col>
                </el-col>

                <el-col :span="isPhone?24 : 12" class="content_phone_Border">
                  <el-row>
                    <el-col align="left" class="bd_n bor">
                      是否已申请一揽子折扣政策:
                      <span>{{Approval.IsApplicationZk}}</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-form ref="form" label-width="80px">
                <el-form-item label="折扣说明:">
                  <div
                    class="contents"
                    style="text-align:left"
                    v-html="Approval.DiscountDescription"
                  ></div>
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
        </div>
        <div class="accessory">
          <el-collapse-item name="4">
            <template slot="title">
              <h3 class="titleText">附件:</h3>
            </template>
            <div class="content">
              <div class="footer">
                <ul class="footer_list">
                  <!-- ATTACHMENTS
                  {{item.FILENAME}}-->
                  <li v-for="(item,index) in ATTACHMENTS" :key="index">
                    <a v-if="!isPhone" :href="item.URL">{{item.FILENAME}}</a>
                    <span v-else @click="YZ_link(item)">{{item.FILENAME}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </el-collapse-item>
        </div>
      </el-collapse>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
let Width = document.body.offsetWidth;
import $ from "jquery";

import { examineInfo } from "@/api/offerFlow";

export default {
  data() {
    return {
      userInfo: {},
      tableDatas: [],
      accessoryList: "", //附件
      GUID: [], //销售政策id及table个数
      Approval: {},
      isPhone: Width <= 1024, //判定Width
      activeName: ["1", "2", "3", "4"], //el-collapse-item 默认全部展开
      selectMsg: "", //输入框model
      ATTACHMENTS: []
    };
  },
  mounted() {
    console.log("PC or Phone ?", this.isPhone);
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
  methods: {
    YZ_link(file) {
      // console.log(this.isMobile);
      if (this.isPhone) {
        var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(item) {
          return window.location.href.indexOf(item) !== -1;
        });
        let wm = {
          htmlTitle: "折扣管理",
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
        } else if (end == "jpg") {
          // convertType = "6";
          open(file.URL);
          return;
        } else if (end == "png") {
          // convertType = "10";
          open(file.URL);
          return;
        } else {
          convertType = "0";
        }
        // var tempwindow=window.open('about:blank');
        $.ajax({
          url: resquestUrl,
          data: {
            ...wm,
            downloadUrl: file.URL,
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
    getMsg() {
      examineInfo({
        json_id: this.$route.query.BOID
      }).then(res => {
        let json = JSON.parse(res.result[0].flow_json);
        //申请信息
        let ApprovalObj = {
          DiscountDescription: json.DiscountDescription,
          IsApplicationFq: json.IsApplicationFq,
          IsApplicationZk: json.IsApplicationZk
        };

        this.Approval = ApprovalObj;
        let obj = {
          ProjectFullName: json.ProjectFullName,
          CreatedName: json.CreatedName,
          CreatedTime: json.CreatedTime
        };
        this.userInfo = obj; //projectName user time 相关信息
        //四个销售table
        // DiscountPlanDetail
        this.GUID = json.DiscountPlanApprovalDetail.Item; //4
        if (Object.prototype.toString.call(this.GUID) != "[object Array]") {
          //
          this.GUID = [this.GUID];
        }
        this.GUID.forEach(item => {
          item.list = json.DiscountPlanDetail.Item.filter(
            i => i.DiscountPlanGUID == item.DiscountPlanGUID
          );
        });
        this.ATTACHMENTS = json.ATTACHMENTS.Item;
        // 附件处理 arr || obj 处理
        if (this.ATTACHMENTS) {
          // arr
          if (
            Object.prototype.toString.call(this.ATTACHMENTS) == "[object Array]"
          ) {
            this.ATTACHMENTS.forEach(item => {
              this.ATTACHMENTS.push({
                FILENAME: item.FILENAME,
                URL: item.URL
              });
            });
            // obj
          } else {
            let obj = {
              URL: this.ATTACHMENTS.URL,
              FILENAME: this.ATTACHMENTS.FILENAME
            };
            this.ATTACHMENTS = [obj];
          }
        }
      });
    }
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
  created() {
    this.getMsg();
  }
};
</script>

<style lang="less">
#discountPage {
  text-align: center;
  padding: 10px;
  .discountPage_container {
    background: #fff;
    // height: 2000px;
    display: flex;
    > div {
      width: 100%;
      // flex: 1;
      flex-direction: column;
    }
    .titleText {
      // width: 100%;
      // background: red;
      border-left: 3px solid #2661ff;
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      text-indent: 1em;
      span {
        margin-right: 20px;
      }
    }
    .zc {
      width: 100%;
      // background: yellow;
      // height: 50px;
      text-align: left;
      .ti {
        float: left;
      }
      .zcmsg {
        float: right;
        .bd_n {
          width: 150px;
          color: #333333 !important;
          font-size: 14px;
        }
      }
      span {
        color: #333333;
        font-size: 14px;
      }
    }
    .title {
      padding: 20px 10px;
    }
    .content {
      padding: 10px;
      display: flex;
      flex-direction: column;

      .table {
        padding: 10px 0;
      }
    }
  }
  .userInfo {
    .content {
      .content_phone_Border {
        padding: 5px 0;
      }
    }
  }
  //政策信息
  .policy {
    .content {
      .contentTop {
        display: flex;
        > li {
          padding: 0 20px;
          list-style: none;
        }
        li:nth-child(1) {
          padding-left: 0 !important;
        }
      }
      ::v-deep .bd_n {
        flex: 1;
        color:#333333 !important;
        font-size: 12px ;
      }
    }
  }
  //申请信息
  .apply {
    width: 100%;
    .content {
      border: 1px solid #f0f0f0;
      // height: 200px;
      box-sizing: border-box;
      display: flex;
      .content_phone_Border {
        padding: 5px 10px;
      }
      .bor {
        // padding: none !important;
        padding: 20px 0px;
        // span {
        // }
      }
      .contents {
        text-align: left;
        border: 1px solid #e6e6e6;
      }
    }
  }

  // 附件
  .accessory {
    .footer {
      h3 {
        padding-bottom: 10px;
        font-size: 12px;
      }

      .footer_list {
        list-style: none;
        text-align: left;
        padding: 0 5px;
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
  ::v-deep .el-textarea__inner {
    min-height: 300px;
  }
}
</style>
