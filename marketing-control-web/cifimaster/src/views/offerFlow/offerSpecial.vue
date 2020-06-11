<template>
  <div ref="offerSpecial_H" class="offerSpecial app-container">
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
                  <el-col :span="8" class="bd_n chageHeight">事业部 :</el-col>
                  <el-col :span="16" class="bd_n chageHeight">
                    <span>{{input1}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n chageHeight">项目名称 :</el-col>
                  <el-col :span="16" class="bd_n bd_r chageHeight">
                    <span>{{input2}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">发起人 :</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{input3}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">发起日期 :</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{input4}}</span>
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
              <p v-if="IsFgkZk">
                <i v-if="PdRate>3" class="light"></i>
                <i v-else class="light" style="background:yellow"></i>
                {{PdRate>3?'此房源申请折扣政策且破底比例超过3%':'此房源申请折扣政策'}}
              </p>
              <p v-if="IsFq">
                <i v-if="(FkType=='首付分期'&&FqNum>90)||(FkType=='全款分期'&&FqNum>180)" class="light"></i>
                <i v-else class="light" style="background:yellow"></i>
                {{(FkType=='首付分期'&&FqNum>90)||(FkType=='全款分期'&&FqNum>180)?`此房源申请${FkType}且分期天数超过${FkType=="首付分期"?'90':'180'}天`:`此房源申请${FkType}`}}
              </p>
              <p v-if="IsDelaySign">
                <i class="light" style="background:yellow"></i>
                {{'此房源申请延期签约'}}
              </p>
              <!-- <p v-if="PdRate>=3&&IsPd=='是'">
                <i class="light" style="background:red"></i>
                此房源申请折扣政策且破底比例超过3%
              </p>-->
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="titleText">认购信息</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">客户姓名 :</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{input6}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">置业顾问 :</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{input7}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row type="flex">
                  <el-col :span="8" class="bd_n">房间 :</el-col>
                  <el-col :span="16" class="bd_n chageHeight">
                    <span :title="input8">{{input8}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n chageHeight">认购日期 :</el-col>
                  <el-col :span="16" class="bd_n bd_r chageHeight">
                    <span>{{input9}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">认购面积 :</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{input10}}㎡</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">认购单价 :</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{input11}}元/㎡</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="24">
                <el-row>
                  <el-col :span="isMobile?8:4" class="bd_n">认购总价 :</el-col>
                  <el-col :span="isMobile?16:20" class="bd_n bd_r">
                    <span>{{input12}}元</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4" v-if="x_Employee">
          <template slot="title">
            <h3 class="titleText">员工购房信息</h3>
          </template>
          <div class="content">
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">员工/高管姓名 :</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{x_Employee}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n">与购房人关系 :</el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <span>{{x_OldEmployeeBuyerRelation}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="bd_w">
              <el-col :span="isMobile?24:12" class="content_phone_Border">
                <el-row>
                  <el-col :span="8" class="bd_n">员工职级 :</el-col>
                  <el-col :span="16" class="bd_n">
                    <span>{{x_EmployeeRanks}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="isMobile?24:12">
                <el-row>
                  <el-col :span="8" class="bd_n"></el-col>
                  <el-col :span="16" class="bd_n bd_r">
                    <el-input disabled></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>

        <div class="content">
          <el-collapse v-model="defaultOpen2">
            <el-collapse-item name="1" v-if="IsFgkZk">
              <template slot="title">
                <h3>折扣变更信息</h3>
              </template>
              <div class="content">
                <el-row class="bd_w">
                  <el-col :span="isMobile?24:12" class="content_phone_Border">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">折扣政策申请套数:</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n">
                        <span>{{x_PolicyApplyNumber_Zk}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="isMobile?24:12">
                    <el-row type="flex">
                      <el-col :span="isMobile?11:8" class="bd_n">已发起套数(含本套):</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n bd_r">
                        <span>{{x_PolicyChgTotalNumber_Zk}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="bd_w">
                  <el-col :span="isMobile?24:12" class="content_phone_Border">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">是否破底 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n">
                        <span>{{IsPd}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="isMobile?24:12">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">破底比例 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n bd_r">
                        <span>{{PdRate}}%</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="bd_w">
                  <el-col :span="isMobile?24:12" class="content_phone_Border">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">破底金额 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n">
                        <span>{{PdAmount}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="isMobile?24:12">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">房源底价 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n bd_r">
                        <span>{{DjTotal}}元</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="bd_w">
                  <el-col :span="isMobile?24:12" class="content_phone_Border">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">预估成交总价 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n">
                        <span>{{YgCjAmount}}元</span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="isMobile?24:12">
                    <el-row type="flex">
                      <el-col :span="isMobile?11:8" class="bd_n">预计成交单价 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n bd_r">
                        <span>{{PublicYgCjAmount}}元</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="bd_w">
                  <el-col :span="isMobile?24:12" class="content_phone_Border">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">预计签约时间 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n">
                        <span>{{SigningTime}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="isMobile?24:12">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">折扣 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n bd_r">
                        <span>{{Pdzk}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <!-- <el-collapse-item name="2" v-if="IsFgkZk"> -->
              <template slot="title">
                <h3>折扣明细</h3>
              </template>
              <div class="more">
                <el-table :data="SaleSpecialZkDtls" border style="width: 100%">
                  <el-table-column prop="DiscntName" label="折扣项名称" width="180"></el-table-column>
                  <el-table-column prop="AppScenariosEnum" label="折扣类型" width="180"></el-table-column>
                  <el-table-column prop="CalMethodEnum" label="折扣算法"></el-table-column>
                  <el-table-column prop="DiscntValue" label="折扣(%)"></el-table-column>
                  <el-table-column prop="PreferentialPrice" label="优惠(元)"></el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
            <el-collapse-item name="3" v-if="IsFq">
              <template slot="title">
                <h3>分期付款变更信息</h3>
              </template>
              <div class="content">
                <el-row class="bd_w">
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="isMobile?11:4" class="bd_n">分期类型 :</el-col>
                      <el-col :span="isMobile?13:20" class="bd_n bd_r">
                        <span>{{FkType}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="bd_w">
                  <el-col :span="isMobile?24:12" class="content_phone_Border">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">是否一揽子分期政策 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n">
                        <span>{{x_IsApplyPolicy_Fq}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="isMobile?24:12">
                    <el-row type="flex">
                      <el-col :span="isMobile?11:8" class="bd_n">分期政策申请套数 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n bd_r">
                        <span>{{x_PolicyApplyNumber_Fq}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="bd_w">
                  <el-col :span="isMobile?24:12" class="content_phone_Border">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">已发起套数（含本套） :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n">
                        <span>{{x_PolicyChgTotalNumber_Fq}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="isMobile?24:12">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">分期天数 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n bd_r">
                        <span>{{FqNum}}天</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="bd_w">
                  <el-col :span="isMobile?24:12" class="content_phone_Border">
                    <el-row>
                      <el-col :span="isMobile?11:8" class="bd_n">分期期数 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n">
                        <span>{{DtlCount}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="isMobile?24:12">
                    <el-row type="flex">
                      <el-col :span="isMobile?11:8" class="bd_n">分期金额合计 :</el-col>
                      <el-col :span="isMobile?13:16" class="bd_n bd_r">
                        <span>{{SumFkAmount}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
            <el-collapse-item name="4">
              <!-- <el-collapse-item name="4" v-if="IsFq"> -->
              <template slot="title">
                <h3>分期付款变更明细</h3>
              </template>
              <div class="more">
                <el-table :data="SaleSpecialFkDetails" border style="width: 100%">
                  <el-table-column prop="IndexName" label="分期计划" width="180"></el-table-column>
                  <el-table-column prop="FkDate" label="付款时间" width="180"></el-table-column>
                  <el-table-column prop="ItemName" label="款项名称"></el-table-column>
                  <el-table-column prop="FkAmount" label="金额"></el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
            <el-collapse-item name="5">
              <template slot="title">
                <h3>延期签约变更说明</h3>
              </template>
              <div class="content">
                <el-row class="bd_w">
                  <el-col :span="isMobile?24:12" class="content_phone_Border">
                    <el-row>
                      <el-col :span="8" class="bd_n">延期时间:</el-col>
                      <el-col :span="16" class="bd_n">
                        <span>{{DelayDays}}天</span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="isMobile?24:12">
                    <el-row>
                      <el-col :span="8" class="bd_n">原签约期限 :</el-col>
                      <el-col :span="16" class="bd_n bd_r">
                        <span>{{SigningTime}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="bd_w" style="border-bottom:1px solid #ccc;">
                  <el-col :span="isMobile?24:12" class="content_phone_Border">
                    <el-row>
                      <el-col :span="8" class="bd_n">变更类型 :</el-col>
                      <el-col :span="16" class="bd_n">
                        <span>{{AlterType}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="isMobile?24:12">
                    <el-row>
                      <el-col :span="8" class="bd_n">申请签约期限 :</el-col>
                      <el-col :span="16" class="bd_n bd_r">
                        <span>{{ApplySigningTime}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <!-- <el-row class="bd_w">
                  <el-col :span="24">
                    <el-row
                      style="border-right: 1px solid #ccc;
                    border-left: 1px solid #ccc;"
                    >
                      <el-col
                        :span="4"
                        class
                        style="text-align:right;padding:0 10px;"
                      >变更原因说明 :</el-col>
                      <el-col :span="20"   style="border-bottom:1px solid #ccc;overflow:auto;">
                        <div style="word-wrap:break-word;line-height:25px;padding:0 10px;" v-html="Reason">{{Reason}}</div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>-->
              </div>
            </el-collapse-item>
            <el-collapse-item name="6">
              <template slot="title">
                <h3>原因说明</h3>
              </template>
              <el-row>
                <el-col :span="24" style="padding:0 20px;">
                  <el-input
                    class="textareaReason"
                    type="textarea"
                    placeholder="请输入内容"
                    v-html="Reason"
                    maxlength="2000"
                    show-word-limit
                    rows="4"
                    :readonly="true"
                  ></el-input>
                </el-col>
              </el-row>
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
        </div>
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
  name: "offerSpecial",
  components: {
    codeAndName: () => import("@/views/offerFlow/component/codeAndName"),
    Buttons: () => import("../../views/offerFlow/component/index")
  },
  data() {
    return {
      radioList: "",
      codeAndName: [],
      isMobile: width <= 1024,
      defaultOpen1: ["1", "2"],
      defaultOpen2: ["1", "2", "3", "4", "5", "6", "7"],
      ATTACHMENTS: [],
      SaleSpecialFkDetails: [],
      SaleSpecialZkDtls: [],
      activeNames: ["1", "2", "3", "4", "5", "6", "7", "8"],
      x_IsApplyPolicy_Fq: "",
      x_IsApplyPolicy_Zk: "",
      IsDelaySign: "",
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
      input14: "",
      input16: "",
      input17: "",
      AlterType: "",
      input19: "",
      input21: "",
      input22: "",
      input23: "",
      input24: "",
      input25: "",
      input26: "",
      x_PolicyApplyNumber_Zk: "",
      x_PolicyChgTotalNumber_Zk: "",
      IsPd: "",
      PdRate: "",
      PdAmount: " ",
      YgCjAmount: "",
      PublicYgCjAmount: "",
      Pdzk: "",
      DjTotal: "",
      SigningTime: "",
      x_OldEmployeeBuyerRelation: "",
      x_EmployeeRanks: "",
      x_Employee: "",
      IsFq: "",
      FkType: "",
      IsFgkZk: "",
      FqNum: "",
      DtlCount: "",
      SumFkAmount: "",
      x_PolicyApplyNumber_Fq: "",
      x_PolicyChgTotalNumber_Fq: "",
      AlterReason: "",
      Reason: "",
      DelayDays: "",
      ApplySigningTime: ""
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
          htmlTitle: "认购后特例审批",
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
    launch() {
      // let data={
      //   "Result": null,
      //   "Data": [
      //     "My_Sales",
      //     "My_Sales_ContractCheckOutTF",
      //     "da6b5910-8106-ea11-80bb-005056a37aqq",
      //     `<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城全期（杭州）-绿地旭辉大厦-705朱小英</TITLE><BName>浙江事业部</BName><BUCode>ZJSYB</BUCode><IsPartnerProj /><ProjectFullName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectFullName><UserName>杨彦召</UserName><ApplyDate>2019-11-14</ApplyDate><AlterType>退房退款</AlterType><AlterReason>更名-其他原因</AlterReason><CstName>朱小英</CstName><RoomInfo>旭辉绿地旭辉城全期（杭州）-绿地旭辉大厦-705</RoomInfo><BldArea>118.86</BldArea><CjBldPrice>20790.85</CjBldPrice><CjRmbTotal>2471200.00</CjRmbTotal><QSDate>2017-04-30</QSDate><FkState /><GetAmount>2477021.00</GetAmount><DiscntRemark>公寓当天认购优惠总价优惠100000.00；按时签约打折；项目营销总监99打折；一次性打折；总价优惠-85.00。</DiscntRemark><Zygw>童凯翔</Zygw><ProjGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjGUID><HandCharge>11.00</HandCharge><HandChargeRate>0.00</HandChargeRate><Reason>测试</Reason><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>`,
      //     "",
      //     "yangyz01"
      //   ],
      //   "Handled": true,
      //   "EventName": null
      // };
      // sendJSON("/testmingyuan/flowSend",data).then(res=>{
      //   console.log(res);
      // })
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
        this.x_PolicyApplyNumber_Zk = json.x_PolicyApplyNumber_Zk;
        this.x_PolicyChgTotalNumber_Zk = json.x_PolicyChgTotalNumber_Zk;
        this.IsPd = json.IsPd;
        this.PdRate = json.PdRate;
        this.PdAmount = json.PdAmount;
        this.YgCjAmount = json.YgCjAmount;
        this.PublicYgCjAmount = json.PublicYgCjAmount;
        this.x_IsApplyPolicy_Fq = json.x_IsApplyPolicy_Fq;
        this.x_IsApplyPolicy_Zk = json.x_IsApplyPolicy_Zk;

        this.Pdzk = json.Pdzk;
        this.SigningTime = json.SigningTime;
        this.DjTotal = json.DjTotal;
        this.x_Employee = json.x_Employee;
        this.x_EmployeeRanks = json.x_EmployeeRanks;
        this.IsFgkZk = json.IsFgkZk == "是" ? true : false;
        this.IsDelaySign = json.IsDelaySign == "是" ? true : false;
        this.x_OldEmployeeBuyerRelation = json.x_OldEmployeeBuyerRelation;
        this.input1 = json.BName;
        this.input2 = json.ProjectFullName;
        this.IsFq = json.IsFq == "是" ? true : false;
        this.input3 = json.UserName;
        this.input4 = json.ApplyDate;
        this.FkType = json.FkType;
        this.FqNum = json.FqNum;
        this.DtlCount = json.DtlCount;
        this.SumFkAmount = json.SumFkAmount;
        this.x_PolicyApplyNumber_Fq = json.x_PolicyApplyNumber_Fq;
        this.x_PolicyChgTotalNumber_Fq = json.x_PolicyChgTotalNumber_Fq;
        this.DelayDays = json.DelayDays;
        this.ApplySigningTime = json.ApplySigningTime;
        this.input6 = json.CstName;
        this.input7 = json.Zygw;
        this.input8 = json.RoomInfo;
        this.input9 = json.QSDate;
        this.input10 = json.BldArea;
        this.input11 = json.CjBldPrice;
        this.input12 = json.CjRmbTotal;
        this.input13 = json.GetAmount;
        this.input14 = json.ZkInfo;
        this.input16 = json.OldName;
        this.input17 = json.NewName;
        this.AlterType = json.AlterType;
        this.AlterReason = json.AlterReason;
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
        if (json.SaleSpecialZkDtls) {
          if (
            Object.prototype.toString.call(json.SaleSpecialZkDtls.Item) ==
            "[object Array]"
          ) {
            json.SaleSpecialZkDtls.Item.forEach(item => {
              this.SaleSpecialZkDtls.push({
                AppScenariosEnum: item.AppScenariosEnum,
                CalMethodEnum: item.CalMethodEnum,
                DiscntName: item.DiscntName,
                DiscntValue: item.DiscntValue,
                PreferentialPrice: item.PreferentialPrice
              });
            });
          } else {
            let obj = {
              AppScenariosEnum: json.SaleSpecialZkDtls.Item.AppScenariosEnum,
              CalMethodEnum: json.SaleSpecialZkDtls.Item.CalMethodEnum,
              DiscntName: json.SaleSpecialZkDtls.Item.DiscntName,
              DiscntValue: json.SaleSpecialZkDtls.Item.DiscntValue,
              PreferentialPrice: json.SaleSpecialZkDtls.Item.PreferentialPrice
            };
            this.SaleSpecialZkDtls = [obj];
          }
        }

        if (json.SaleSpecialFkDetails) {
          if (
            Object.prototype.toString.call(json.SaleSpecialFkDetails.Item) ==
            "[object Array]"
          ) {
            json.SaleSpecialFkDetails.Item.forEach(item => {
              this.SaleSpecialFkDetails.push({
                FkAmount: item.FkAmount,
                FkDate: item.FkDate,
                IndexName: item.IndexName,
                ItemName: item.ItemName
              });
            });
          } else {
            let obj = {
              FkAmount: json.SaleSpecialFkDetails.Item.FkAmount,
              FkDate: json.SaleSpecialFkDetails.Item.FkDate,
              IndexName: json.SaleSpecialFkDetails.Item.IndexName,
              ItemName: json.SaleSpecialFkDetails.Item.ItemName
            };
            this.SaleSpecialFkDetails = [obj];
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
        console.log(this.$refs.offerSpecial_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.offerSpecial_H.offsetHeight
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
        console.log(this.$refs.offerSpecial_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.offerSpecial_H.offsetHeight
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
.offerSpecial {
  .textareaReason {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 12px;
    padding: 5px;
  }
  .titleText {
    border-left: 3px solid #2661ff;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    text-indent: 1em;
  }
  .pText {
    text-indent: 3em;
    font-weight: 700;
    // overflow: hidden;
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
      // height: 53px;
      font-size: 12px;
      overflow: hidden;

      &:first-child {
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        text-align: right;
      }
    }
    .chageHeight {
      min-height: 53px;
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
  .lightFather {
    line-height: 20px;
    .light {
      margin-top: 2px;
      float: left;
      height: 16px;
      width: 16px;
      background-color: red;
      margin-right: 16px;
      border-radius: 50%;
    }
  }
}
</style>
