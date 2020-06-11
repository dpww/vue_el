<template>
  <div ref="uploadVue_H" class="uploadVue">
    <div class="uploadVue-top">
      <p class="uploadVue-topx">
        <span></span>
        <span>基础信息</span>
      </p>
      <el-row :gutter="20" class="uploadVue-top-cen">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>申请人：</span>
            <span>{{EmployeeName}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>申请部门：</span>
            <span>{{JobName}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>申请时间：</span>
            <span>{{createTime | formatDate}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>区域名称：</span>
            <span>{{prjectName}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="uploadVue-top">
      <p class="uploadVue-topx">
        <span></span>
        <span>审批信息</span>
      </p>
      <p class="uploadVueName">尊敬的领导：</p>
      <p class="uploadVueTitle">
        附件中为{{prjectName}} {{startTime | formatDate}} 至 {{endTime | formatDate}}已上报并经过复核的项目周报数据，周报中展示目标数据，实际完成数据，预估数据及缺口说明，请点击附件进行查阅并审批，审批通过后
        此数据将上报集团。
      </p>
    </div>
    <div class="uploadVue-top">
      <p class="uploadVue-topx">
        <span></span>
        <span>附件</span>
      </p>
      <a class="uploadVue-link" @click="openPage(SaveUrl)" download="download">{{ShowName}}</a>
    </div>
      <!-- <div class="buttonBox" v-if="buttonflag">
      <el-button type="primary" v-if="isShowDiscard" @click="discard">废弃</el-button>
      <el-button type="primary" @click="preview">查看审批</el-button>
    </div>
     -->
    <Buttons/>
  </div>
</template>
<script>
let width = document.body.offsetWidth;
let isMobile = width <= 1024;
import { getTitle,selectUrl } from "@/api/commentpublic";
import {  get } from "@/api/request.js";
import {  SendApproveCheck ,toHistoryUrl,queryFlowId} from "@/api/offerFlow";
import $ from "jquery";
export default {
  components:{
    Buttons:()=>import('../../views/offerFlow/component/index')
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d;
    }
  },
  data() {
    return {
      EmployeeName: "",
      JobName: "",
      createTime: "",
      endTime: "",
      prjectName: "",
      startTime: "",
      SaveUrl: "",
      ShowName: "",
       buttonflag: false,
      isShowDiscard: true,
      flow_id:""
    };
  },
  // updated() {
  //   this.$nextTick(() => {
  //     if (window.cifioa) {
  //       window.cifioa.sendMessage({ type: "height", height: 452 });
  //     } else {
  //       console.warn("缺少cifioa插件");
  //     }
  //   });
  // },
  // updated() {
  //     this.$nextTick(()=>{
  //       if(window.cifioa){
  //         window.cifioa.sendMessage({type: "height", height: this.$refs.uploadVue_H.offsetHeight});
  //       }else{
  //         console.warn("缺少cifioa插件");
  //       }
  //     })
  //   },
  mounted() {
      console.log(this.$refs.uploadVue_H.offsetHeight, "mouted");
      this.$nextTick(()=>{
          if(window.cifioa){
            window.cifioa.sendMessage({type: "height", height: 450});
          }else{
            console.warn("缺少cifioa插件");
          }
        })
      let timeid=setTimeout(() => {
        if(window.cifioa){
          console.log(timeid);
          window.cifioa.sendMessage({type: "height", height: this.$refs.uploadVue_H.offsetHeight});
        }else{
          console.warn("缺少cifioa插件");
        }
        clearTimeout(timeid)
      }, 700);
  },
  created() {
      if (this.$route.query.taskId) {
      this.buttonflag = true;
       queryFlowId({},this.$route.query.BOID).then(res=>{
        if(res.code==200){
          if(res.data.flow_status==7){
            this.isShowDiscard=false
          }
          this.flow_id=res.data.flow_id
        }
      })
    }
    this.getTitles1();
    console.log(parent.window);
  },
  methods: {
    getTitles1() {
      if (this.$route.query.action == "modify") {
        console.log(this.$route.query);
          selectUrl({BOID:this.$route.query.BOID}).then(res=>{
            console.log(location.origin+`/#/weekPlan/areaweeklyParticulars?project_id=${res.data.project_id}&how_week=${res.data.how_week}&area_id=${res.data.area_id}&this_time=${res.data.this_time}&start=${res.data.start}&end=${res.data.end}&plan_status=${res.data.plan_status}&type=${res.data.type}`);
          location.href=location.origin+`/#/weekPlan/areaweeklyParticulars?project_id=${res.data.project_id}&how_week=${res.data.how_week}&area_id=${res.data.area_id}&this_time=${res.data.this_time}&start=${res.data.start}&end=${res.data.end}&plan_status=${res.data.plan_status}&type=${res.data.type}`
        })
      }
        getTitle(`?jsonId=${this.$route.query.BOID}`).then(res => {
        this.EmployeeName = res.result.data.EmployeeName;
        this.JobName = res.result.data.JobName;
        this.createTime = res.result.data.createTime;
        this.endTime = res.result.data.endTime;
        this.prjectName = res.result.data.prjectName;
        this.startTime = res.result.data.startTime;
        this.SaveUrl = res.result.data.SaveUrl;
        this.ShowName = res.result.data.ShowName;
        // this.$router.push({path:"/floatingPriceMy",query:{LoginKey:"action=modify",BOID:this.$route.query.BOID,UserID:data.username||localStorage.getItem('username')}});
        // window.top.location.href=`https://salesmgt-uat.cifi.com.cn/#/discount/discount?BOID=${this.$route.query.BOID}`
        // this.$confirm("该审批页尚不支持修改.").then(()=>{
        //   console.log(localStorage.getItem("routerHistory"),"routerHistory");
        // }).catch(()=>{
        // })
      });


    },
    openPage(url) {
      if (isMobile) {
        var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(item) {
          return window.location.href.indexOf(item) !== -1;
        });
        let mbusername=this.$store.getters.userInfo.username|| "旭辉集团"
        let wm = {
          htmlTitle: "周报",
          wmContent: mbusername,
          wmSize: 10,
          wmFont: "microsoft yahei",
          wmColor: 7,
          isDelSrc:1
        };
        let resquestUrl = `https://oadoc.cifi.com.cn/dcs.web/onlinefile`;
        let requrl = url.split("?n=")[0];
        let end = requrl.split(".")[requrl.split(".").length - 1];
        let convertType;
        if (end == "pdf") {
          convertType = "20";
        } else if (end == "tif") {
          convertType = "17";
        } else {
          convertType = "0";
        }
        $.ajax({
          url: resquestUrl,
          data: {
            ...wm,
            downloadUrl: location.origin + requrl,
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
            open(url);
          }
        });
      } else {
        let requrl = url.split("?")[0];
        open(url);
      }
    },
     discard() {
      get(`/WorkflowChoose/end?instanceId=${this.flow_id}`).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.isShowDiscard = false;
          this.$message.error(res.messages);
        }
      });
    },
    preview() {
      toHistoryUrl({
        proInstId: this.flow_id
      }).then(res => {
        console.log(res);
        // location.href = res.data;
        window.openres.data()
      });
    }
  }
};
let flag = true;
window["validForm"] = function() {
  if (flag) {
    flag = false;
    var status = false;
    SendApproveCheck({
      BusinessGUID: window.$routeName,
      BTID: "MY_FYs_HTFKSP"
    }).then(res => {
      console.log(res);
      if (res.code == 200) {
        if (res.data == "true") {
          status = true;
          var params = { type: "validForm", state: true }; //state：true或false
          window.cifioa.sendMessage(params);
          return true;
        } else {
          var params = { type: "validForm", state: false }; //state：true或false
          window.cifioa.sendMessage(params);
          alert(res.messages);
          return false;
        }
      }
    });
  }
};
</script>
<style scoped lang="less">

.uploadVue {
  padding: 12px;
//   .buttonBox {
//   height: 60px;
//   line-height: 60px;
//   text-align: center;
//   position: fixed;
//   width: 100%;
//   bottom: 0;
//   background-color: #fff;
//   z-index: 100;
// }
  .uploadVue-top {
    background: #fff;
    padding: 12px;
    .uploadVue-top-cen {
      padding-top: 20px;
      span {
        line-height: 35px;
      }
    }
    .uploadVueName {
      padding: 12px 0;
    }
    .uploadVueTitle {
      text-indent: 2em;
      line-height: 24px;
    }
    .uploadVue-topx {
      justify-content: flex-star;
      display: flex;
      line-height: 30px;
      font-size: 16px;
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 12px;
      span:nth-child(1) {
        display: inline-block;
        height: 20px;
        width: 3px;
        border-radius: 5px;
        background: #2761ff;
        margin-right: 10px;
        margin-top: 4px;
      }
    }
    .uploadVue-link {
      margin-top: 10px;
      color: #2761ff;
      display: block;
    }
  }
}
@media screen and (max-width: 1000px){
  .uploadVue{
   .el-col-8{
     width:100%;
   }
  }
}
</style>
