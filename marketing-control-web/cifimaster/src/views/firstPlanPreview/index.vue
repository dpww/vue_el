<template>
  <div class="firstPlanPreview">
    <codeAndName :codeAndName="codeAndName"/>
    <component :is="componentList[orgName]"></component>
  </div>
</template>


<script>
import { costInfo } from "@/api/offerFlow";
import { queryFlowId } from "@/api/offerFlow.js";

export default {
  components: {
    codeAndName:()=>import("@/views/offerFlow/component/codeAndName"),
    getLandInfo: () => import("./getLandInfo.vue"),
    setFirstInfo: () => import("./setFirstInfo.vue"),
    setSecondInfo: () => import("./setSecondInfo.vue"),
    threeMonthInfo: () => import("./threeMonthInfo.vue"),
    twoMonthInfo: () => import("./twoMonthInfo.vue"),
    sevenAndTwentyOnePostpone: () => import("./sevenAndTwentyOnePostpone.vue"),
    twentyOneDaysChange: () => import("./twentyOneDaysChange.vue"),
    sevenDaysOpening: () => import("./sevenDaysOpening.vue"),
    openingDayInfo: () => import("./openingDayInfo.vue"),
    openingTomorrowInfo: () => import("./openingTomorrowInfo.vue"),
    afterAMonthInfo: () => import("./afterAMonthInfo.vue")
  },
  data() {
    return {
      BOID: this.$route.query.BOID,
      orgName: "",
      codeAndName:[],
      componentList: {
        fp_land_back: "getLandInfo",
        fp_designone: "setFirstInfo",
        fp_designtwo: "setSecondInfo",
        fp_open_three: "threeMonthInfo",
        fp_open_two: "twoMonthInfo",
        fp_open_twentyone_off: "sevenAndTwentyOnePostpone",
        fp_open_seven_off: "sevenAndTwentyOnePostpone",
        fp_open_twentyone_node: "twentyOneDaysChange",
        fp_open_seven_approve: "sevenDaysOpening",
        fp_open: "openingDayInfo",
        fp_open_morrow: "openingTomorrowInfo",
        fp_open_one_month: "afterAMonthInfo"
      }
    };
  },
  created() {
    if (this.$route.query.BOID) {
      costInfo({ json_id: this.$route.query.BOID }).then(res => {
        this.orgName = res.result[0].orgName;
      });

    }
      queryFlowId({}, this.$route.query.BOID).then(res => {
        if (res.code == 200) {
          this.codeAndName = [res.data];
        }
      });
  }
};
</script>

<style>
</style>
