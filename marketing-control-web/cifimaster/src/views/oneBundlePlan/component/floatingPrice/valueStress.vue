<template>
  <div>
    <div class="fullWidth">
      <table
        class="parojectStatus table"
        :style="readonly?{minWidth:'430px'}:''"
        style="table-layout: fixed; word-break: break-all;"
        border="0"
        cellpadding="0"
        cellspacing="0"
      >
        <thead>
          <th>业态</th>
          <th>调价前规划货值</th>
          <th>测算版货值</th>
          <th>货值差异（万元）</th>
          <th>测算货值偏差率（%）</th>
        </thead>
        <tbody>
          <tr v-for="item in value.pressureCompute" :key="item.Code">
            <td>{{item.priceAdObject}}</td>
            <td>{{item.adjustmentBeforePlannedValue}}</td>
            <td>{{item.budgetValue}}</td>
            <td>{{item.valueDifference}}</td>
            <td :style="{color:item.valueDeviationRate>0.5?'red':''}">{{item.valueDeviationRate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <p>偏差原因</p>
    <el-input type="textarea" :readonly="readonly" v-model="value.deviationExplain.deviation_reason"></el-input>
    <p>销售目标</p>
    <el-input type="textarea" :readonly="readonly" v-model="value.deviationExplain.sales_target"></el-input>
    <p>后续动作</p>
    <el-input type="textarea" :readonly="readonly" v-model="value.deviationExplain.follow_up_action"></el-input>-->
  </div>
</template>

<script>
import { number, decimal } from "@/utils/filter.js";
export default {
  name: "valueStress",
  data() {
    return {};
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler(newV) {
        return newV;
      },
      deep: true
    }
  },
  components: {
    yInput:()=>import( "@/views/component/input.vue")
  }
};
</script>

<style scope lang="less">
.parojectStatus.table {
  width: 100%;
  border: 1px solid #e6e6e6;
  margin-top: 10px;
  .fullWidth {
    width: 100%;
    overflow: auto;
  }
  thead th {
    background: #f0f0f0;
    border-bottom: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    height: 35px;
    text-align: center;
    vertical-align: middle;
    padding: 5px 10px;
    color: #878787;
  }
  tbody td {
    border-right: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    padding: 10px;
    height: 35px;
    text-align: center;
    vertical-align: middle;
  }
  .item {
    span {
      padding: 4px 8px;
    }
  }
  .fontRed {
    color: red;
  }
}
</style>
