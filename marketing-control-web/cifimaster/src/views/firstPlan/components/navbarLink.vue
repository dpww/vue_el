<template>
  <div class="navbarLink" v-if="isType=='view'||$route.name=='rateWatch'">
    <el-tabs v-model="tabactiveName" type="card" @tab-click="tabChange">
      <el-tab-pane label="拿地后" title="1" name="/getLand"></el-tab-pane>
      <el-tab-pane label="顶设1" title="2" name="/setFirst"></el-tab-pane>
      <el-tab-pane label="顶设2" title="3" name="/setSecond"></el-tab-pane>
      <el-tab-pane label="开盘前3个月" title="4" name="/threeMonth"></el-tab-pane>
      <el-tab-pane label="开盘前2个月" title="5" name="/twoMonth"></el-tab-pane>
      <el-tab-pane label="开盘前21天" title="6" name="/twentyOneDays"></el-tab-pane>
      <el-tab-pane label="开盘前7天" title="7" name="/sevenDays"></el-tab-pane>
      <el-tab-pane label="开盘" title="8" name="/opening"></el-tab-pane>
      <el-tab-pane label="开盘后一个月" title="9" name="/afterAMonth"></el-tab-pane>
      <el-tab-pane label="售楼处开放" title="10" name="/salesOffice"></el-tab-pane>
      <el-tab-pane label="样板段开放" title="11" name="/modelDistrict"></el-tab-pane>
      <el-tab-pane label="样板房开放" title="12" name="/modelHouses"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { selectMonitorPlanNode } from "@/api/firstPlan";
export default {
  props: {
    stepsList: {
      type: Array,
      defalut: []
    }
  },
  data() {
    return {
      isType: "",
      tabactiveName: "",
      linkList: []
    };
  },
  computed: {
    // tabactiveName() {
    //   return localStorage.getItem("tabactiveName")
    // }
  },
  methods: {
    tabChange(tab, event) {
      this.tabactiveName = tab.name;
      localStorage.setItem("tabactiveName", tab.name);
      let type = tab.name == "/rateWatch" ? "" : "view";
      let plan_node_id = "";
      let lenth = 0;
      this.linkList.forEach(item => {
        if (tab.$attrs.title === item.node_level) {
          if (item.plan_approval != 4) {
            this.$message({
              type: "success",
              message: "温馨提示，该表单无可查看版本！"
            });
            lenth = 1;
          }
          plan_node_id = item.id;
        }
      });
      //审批通过才能查看
      if (lenth >= 1) {
        return;
      }
      this.$router.push({
        path: tab.name,
        query: {
          project_id: this.$route.query.project_id,
          plan_node_id: plan_node_id,
          plan_id: this.$route.query.plan_id,
          node_level: tab.$attrs.title,
          type: "view"
        }
      });
    }
  },
  mounted(){
this.tabactiveName=localStorage.getItem("tabactiveName")
  },
  created() {
    if (this.$route.query.type != null && this.$route.query.type == "view") {
      this.isType = this.$route.query.type;
    }
    this.tabactiveName = localStorage.getItem("tabactiveName");
    selectMonitorPlanNode({
      plan_id: this.$route.query.plan_id
    }).then(res => {
      // console.log(res,"锦章");
      if (res.code == 200) {
        this.linkList = res.result;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.navbarLink {
  background: #fff;
  margin-top: 5px;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  width: 100%;
 ::v-deep .el-tabs__nav {
    margin: 0 auto;
    float: none;
    text-align: center;
  }
 ::v-deep .el-tabs__nav-scroll {
    overflow: auto;
  }
}
</style>
