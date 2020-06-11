<template>
  <div class="costPayPoint">
    <div class="logo">
      <img src="../../assets/images/XH_logo.jpg" alt />
      <el-button round @click="print">
        <i style="color:skyblue;font-size:18px;" class="el-icon-printer"></i> 打印付款申请书
      </el-button>
    </div>

    <div class="containter">
      <div class="title">
        付款申请书
        <span>{{ApplyDate}}</span>
      </div>
      <p>
        明源数据编码:
        <span style="font-size:14px;">{{ApplyCode}}</span> OA流程单号:
        <span style="font-size:14px;">{{instanceId}}</span>
        <span style="float:right">附件个数: {{fileNum}}</span>
      </p>

      <div class="userinfo_el_row">
        <div class="userinfo_el_row_con">
          <div>
            <div>企业名称:</div>
          </div>
          <div>{{PayProviderName}}</div>
        </div>
        <div class="userinfo_el_row_con">
          <div>
            <div>申请人:</div>
          </div>
          <div>{{AppliedByName}}</div>
        </div>
        <div class="userinfo_el_row_con">
          <div>
            <div>部门:</div>
          </div>
          <div>{{DeptName}}</div>
        </div>
        <div class="userinfo_el_row_con">
          <div>
            <div>实际收款单位:</div>
          </div>
          <div>{{ReceiveProviderName}}</div>
        </div>
        <div class="userinfo_el_row_con">
          <div>
            <div>开户行:</div>
          </div>
          <div>{{BankName}}</div>
        </div>
        <div class="userinfo_el_row_con">
          <div>
            <div>账户:</div>
          </div>
          <div class="banknum">{{BankAccounts}}</div>
        </div>
      </div>

      <div class="userinfo">
        <el-row>
          <el-col class="key" :span="3">申请金额:</el-col>
          <el-col :span="5">{{ApplyAmount | fixed}}</el-col>
          <el-col class="key" :span="3">大写:</el-col>
          <el-col :span="13">{{YfAmountDX}}</el-col>
        </el-row>
        <el-row>
          <el-col class="key" :span="3">合同金额:</el-col>
          <el-col :span="5">{{HtAmount | fixed}}</el-col>
          <el-col class="key" :span="3">已付:</el-col>
          <el-col :span="13">{{SumPayAmount | fixed}}</el-col>
        </el-row>
        <el-row>
          <el-col class="key" :span="3">款项说明:</el-col>
          <el-col :span="5"></el-col>
          <el-col class="key" :span="3">付款方式:</el-col>
          <el-col :span="13">{{PayTypeName}}</el-col>
        </el-row>
      </div>
      <div class="table">
        <div class="header_row">
          <div>操作人</div>
          <div>部门</div>
          <div>操作</div>
          <div>会签要点</div>
          <div>意见</div>
          <div>审批时间</div>
        </div>
        <div class="header_for" v-for="(item,index) in flowInfo" :key="index">
          <div>
            <span>{{item.auditorName}}{{item.postName}}</span>
          </div>
          <div>
            <span>{{item.orgPath}}</span>
          </div>
          <div>
            <span>{{item.statusVal}}</span>
          </div>
          <div>
            <span></span>
          </div>
          <div>
            <span>{{item.opinion | clearBR}}</span>
          </div>
          <div>
            <span>{{item.completeTime}}</span>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="btm_row">
          <div class="key">
            <span>实付金额:</span>
          </div>
          <div class="first"></div>
        </div>
        <div class="btm_row">
          <div class="key">
            <span>付款开户行:</span>
          </div>
          <div></div>
          <div class="key">
            <span>票号:</span>
          </div>
          <div></div>
        </div>
        <div class="btm_row">
          <div class="key">
            <span>取款人签字:</span>
          </div>
          <div></div>
          <div class="key">
            <span>出纳签字:</span>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { contractPrint } from "@/api/offerFlow";
import { appSetToken } from "@/utils/util";
export default {
  data() {
    return {
      flowInfo: [],
      instanceId: "",
      ApplyDate: "",
      ApplyCode: "",
      PayProviderName: "",
      AppliedByName: "",
      DeptName: "",
      BankName: "",
      ReceiveProviderName: "",
      ApplyAmount: "",
      HtAmount: "",
      SumPayAmount: "",
      PayTypeName: "",
      BankAccounts: "",
      YfAmountDX: "",
      fileNum: ""
    };
  },
  filters: {
    fixed(data) {
      if (data === 0) {
        return "0.00";
      }
      if (!data) {
        return "";
      } else {
        return Number(data).toFixed(2);
      }
    },
    clearBR(data) {
      if (data.includes("<br>")) {
        return data.replace("<br>", "");
      } else {
        return data;
      }
    }
  },
  created() {
    appSetToken()
    contractPrint({
      json_id: this.$route.query.BOID
      // json_id: "69140c07-816e-ea11-80bc-005056a35d91"
    }).then(res => {
      let json = JSON.parse(res.data.info.flow_json);
      let flowInfo = res.data.flowInfo.opinions;
      console.log(json);
       let str = res.data.info.flow_json;
        let bankStr = str
          .split('BankAccounts"')[1]
          .split(',"')[0]
          .split(":")[1];
        console.log(json);
        this.BankAccounts = bankStr;
      this.ApplyDate = json.ApplyDate;
      this.ApplyCode = json.ApplyCode;
      this.PayProviderName = json.PayProviderName;
      this.AppliedByName = json.AppliedByName;
      this.DeptName = json.DeptName;
      this.BankName = json.BankName;
      this.ReceiveProviderName = json.ReceiveProviderName;
      this.ApplyAmount = json.ApplyAmount;
      this.HtAmount = json.HtAmount;
      this.SumPayAmount = json.SumPayAmount;
      this.PayTypeName = json.PayTypeName;
      // this.BankAccounts = json.BankAccounts;
      this.YfAmountDX = json.YfAmountDX;

      if (flowInfo) {
        if (Object.prototype.toString.call(flowInfo) == "[object Array]") {
          flowInfo.forEach(item => {
            this.flowInfo.push({
              auditorName: item.auditorName,
              completeTime: item.completeTime,
              createTime: item.createTime,
              durMs: item.durMs,
              files: item.files,
              instanceId: item.instanceId,
              opinion: item.opinion,
              orgPath: item.orgPath,
              postName: item.postName,
              status: item.status,
              statusVal: item.statusVal,
              taskKey: item.taskKey,
              taskName: item.taskName
            });
          });
        } else {
          this.flowInfo = [flowInfo];
        }
        this.instanceId = this.flowInfo[0].instanceId;
      }
      if (json.ATTACHMENTS) {
        if (
          Object.prototype.toString.call(json.ATTACHMENTS.Item) ==
          "[object Array]"
        ) {
          this.fileNum = json.ATTACHMENTS.Item.length;
        } else {
          this.fileNum = 0;
        }
      } else {
        this.fileNum = 0;
      }
      console.log(this.flowInfo);
    });
  },
  methods: {
    print() {
      window.print();
    }
  }
};
</script>

<style lang="less" >
.userinfo_el_row {
  clear: both;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-top: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
}
.userinfo_el_row_con {
  width: 33.33333%;
  justify-content: flex-start;
  display: flex;
  border-right: 1px solid #e6e6e6;
  // border-left: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
}

.userinfo_el_row_con > div:nth-child(1) {
  position: relative;
  height: 100%;
  width: 37.5%;
  background: #f1f5f9;
  border-right: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
  border-top: 1px solid #e6e6e6;
}
.userinfo_el_row_con > div:nth-child(1) div {
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.userinfo_el_row_con > div:nth-child(2) {
  width: 62.5%;
  min-height: 25px;
  line-height: 25px;
  padding: 10px 0;
  text-align: left;
  padding-left: 10px;
}
.el-button.is-round {
  padding: 0 15px;
  border: 1px solid skyblue;
  color: skyblue;
}
.costPayPoint {
  background: #fff;
  height: 100vh;

  .logo {
    height: 100px;
    padding: 0 10px;
    line-height: 100px;
    img {
      height: 40px;
      width: 200px;
      vertical-align: middle;
    }
  }
  .containter {
    padding: 0 10px;
    position: relative;
    z-index: 1997;
    .banknum {
      word-wrap: break-word;
    }
    p {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      span {
        margin-right: 20px;
      }
      margin-bottom: 1px;
    }
    .title {
      height: 60px;
      line-height: 60px;
      text-align: center;
      position: relative;
      font-weight: 700;
      font-size: 20px;
      letter-spacing: 3px;

      span {
        font-size: 14px;
        position: absolute;
        left: 50%;
        bottom: -20px;
        transform: translateX(-50%);
        font-weight: normal;
        letter-spacing: 0px;
      }
    }
    .table {
      margin: 20px 0;
      .header_row {
        background: #f1f5f9;
        width: 100%;
        display: flex;
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        > div {
          flex: 1;
          min-height: 40px;
          line-height: 40px;
          border-left: 1px solid #e6e6e6;
          text-align: center;
        }
      }
      .header_for {
        display: flex;
        border-right: 1px solid #e6e6e6;

        > div {
          flex: 1;
          min-height: 40px;
          text-align: center;
          border-left: 1px solid #e6e6e6;
          border-bottom: 1px solid #e6e6e6;
          padding: 10px 0;
        }
      }
      .el-col {
        border-right: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
      }
    }
    .bottom {
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
      .btm_row {
        display: flex;
        > div {
          flex: 1;
          min-height: 40px;
          text-align: center;
          border-bottom: 1px solid #e6e6e6;
        }
        .key {
          background: #f1f5f9;
          position: relative;
          border-left: 1px solid #e6e6e6;
          border-right: 1px solid #e6e6e6;
          border-bottom: 1px solid #e6e6e6;
          border-top: 1px solid #e6e6e6;
          span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        > .first {
          flex: 3;
        }
      }
    }
    .userinfo {
      line-height: 40px;
      text-align: left;
      // border-top: 1px solid #e6e6e6;
      .el-row {
        border-left: 1px solid #e6e6e6;
      }
      .key {
        background: #f1f5f9;
        // height: 100%;
        text-align: center;
        border-right: 1px solid #e6e6e6;
        border-left: 1px solid #e6e6e6;
        border-top: 1px solid #e6e6e6;
      }
      .el-col {
        white-space: pre-wrap;
        min-height: 40px;
        border-right: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        padding-left: 10px;
      }
    }
  }
}
</style>
