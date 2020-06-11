<template>
  <div class="approvalStart" ref="refGet_H">
    <div class="containter">
      <codeAndName :codeAndName="codeAndName"/>
      <agingAndDiscount ></agingAndDiscount>
    </div>
  </div>
</template>
<script>
import {  queryFlowId } from "@/api/offerFlow.js";

export default {
  components:{
    codeAndName:()=>import("@/views/offerFlow/component/codeAndName"),
    agingAndDiscount:()=>import("@/views/oneBundlePlan/agingAndDiscount.vue")
  },
  mounted(){
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.refGet_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.refGet_H.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  updated(){
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.refGet_H.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.refGet_H.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  }
  ,
  data(){
    return {
      jizhouId:this.$route.query.BOID,
      codeAndName:[],
    }
  },
  methods:{

  },
  created(){
      if (
      localStorage.getItem("expiration") &&
      new Date().getTime() > localStorage.getItem("expiration")
    ) {
      window.localStorage.removeItem("token");
    }
    // if (this.$route.query.taskId) {
      queryFlowId({}, this.$route.query.BOID).then(res => {
        this.codeAndName=[res.data]
      })
  }
}
</script>

<style scoped>
.containter{
  position: relative;
  z-index: 1997;
}
</style>
