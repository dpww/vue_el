<template>
  <div class="buttonBox" v-if="buttonflag">
    <el-button type="primary" v-if="isShowDiscard" @click="discard">废弃</el-button>
    <el-button type="primary" v-if="isPreview" @click="preview">查看审批</el-button>
</div>
</template>
<script>
import { toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";
import {get} from '@/api/request'
export default {
  data() {
    return {
      flow_id: "",
      buttonflag: false,
      isShowDiscard: true,
      isPreview:true
    };
  },
  methods: {
    discard() {
      this.$confirm(
        "此操作将废弃该流程,若还需重复发起该流程请勿进行此操作, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          if(this.$route.query.taskId){
               get(`/WorkflowChoose/end?instanceId=${this.flow_id}`).then(res => {
            if (res.code == 200) {
              this.isShowDiscard = false;
              this.$message.success('作废成功');
            }
          });
          }else{
               get(`WorkflowChoose/delete?instanceId=${this.flow_id}`).then(res => {
              this.isShowDiscard = false;
              this.$message.success('作废成功');
              window.close()
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    preview() {
      toHistoryUrl({
        proInstId: this.flow_id
      }).then(res => {
        console.log(res);
        window.open(res.data);
      });
    }
  },
  created() {
    if (
      localStorage.getItem("expiration") &&
      new Date().getTime() > localStorage.getItem("expiration")
    ) {
      window.localStorage.removeItem("token");
    }
    // if (this.$route.query.taskId) {
      queryFlowId({}, this.$route.query.BOID).then(res => {
        if (res.code == 200) {
          if (this.$route.query.taskId) {
            this.buttonflag = true;
          }
          if (res.data.flow_status == 7) {
            this.isShowDiscard = false;
          }else if(res.data.flow_status == 2&&this.$route.query.action==="modify"){
            this.buttonflag = true;
            this.isShowDiscard = true;
            this.isPreview=false
          }
          console.log(res.data)
          this.flow_id = res.data.flow_id;
        }
      });
  }
};
</script>

<style scoped>
  .buttonBox {
    height: 60px;
    line-height: 60px;
    text-align: center;
    width: 100%;
    background-color: #fff;
    z-index: 100;
  }
</style>

