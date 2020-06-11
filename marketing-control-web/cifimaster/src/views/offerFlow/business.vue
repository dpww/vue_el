<template>
  <div ref="refGet_H">
    <businessIncome v-if="showDIV=='MY_FYs_YsAdjustOtherFee'"></businessIncome>
    <businessPayment v-if="showDIV=='MY_FYs_DSManageFeeOut'"></businessPayment>
    <costEntering v-if="showDIV=='MY_FYs_OtherFee'"></costEntering>
    <h3 v-if="showDIV==''">未获取到页面</h3>
  </div>
</template>

<script>
import { costInfo } from "@/api/offerFlow";


export default {
  data(){
    return{
      jizhouId:this.$route.query.BOID,
      showDIV:"",
    }
  },
  components: {
    businessIncome:()=>import('@/views/offerFlow/businessIncome.vue'),
    businessPayment:()=>import('@/views/offerFlow/businessPayment.vue'),
    costEntering:()=>import('@/views/offerFlow/costEntering.vue'),
  },
  mounted() {
    if (window.cifioa) {
      window.cifioa.sendMessage({
        type: "height",
        height: this.$refs.refGet_H.offsetHeight
      });
    } else {
      console.warn("缺少cifioa插件");
    }
  },
  created() {
    this.reload();
  },
  methods: {
    reload() {
      if (this.jizhouId) {
      costInfo({ json_id: this.jizhouId }).then(res=>{
        this.showDIV=res.result[0].flow_code
        console.log(this.showDIV);
        console.log(JSON.parse(res.result[0].flow_json));
      })
      }
    }
  }
};
</script>

<style>
</style>
