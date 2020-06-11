<template>
  <div class="fullWidth">

    <table class="parojectStatus table" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <th width="180">版本</th>
        <th>净利润率</th>
        <th>IRR</th>
        <th>静态回收周期（月）</th>
      </tr>
      <tr>
        <td>投资版</td>
        <td>
          <span v-if="readonly">{{value.tzbProfit}}</span>
          <el-input v-else v-model="value.tzbProfit" @input="validateDecimal(value,'tzbProfit')" @blur="value.tzbProfit=value.tzbProfit.toFixed(2)"></el-input>%
        </td>
        <td>
          <span v-if="readonly">{{value.tzbIrr}}</span>
          <el-input v-model="value.tzbIrr" @blur="value.tzbIrr=value.tzbIrr.toFixed(2)" @input="validateDecimal(value,'tzbIrr')" v-else></el-input>%
        </td>
        <td>
          <span v-if="readonly">{{value.tzbJths}}</span>
          <el-input v-model="value.tzbJths" @blur="value.tzbJths=value.tzbJths.toFixed(2)"  @input="validateDecimal(value,'tzbJths')" v-else></el-input>
        </td>
      </tr>
      <tr>
        <td>战规版</td>
        <td>
          <span v-if="readonly">{{value.zgbProfit}}</span>
          <el-input v-model="value.zgbProfit"  @blur="value.zgbProfit=value.zgbProfit.toFixed(2)"  @input="validateDecimal(value,'zgbProfit')" v-else></el-input>%
        </td>
        <td>
          <span v-if="readonly">{{value.zgbIrr}}</span>
          <el-input v-model="value.zgbIrr"  @blur="value.zgbIrr=value.zgbIrr.toFixed(2)"  @input="validateDecimal(value,'zgbIrr')" v-else></el-input>%
        </td>
        <td>
          <span v-if="readonly">{{value.zgbJths}}</span>
          <el-input v-model="value.zgbJths"  @blur="value.zgbJths=value.zgbJths.toFixed(2)"  @input="validateDecimal(value,'zgbJths')" v-else></el-input>
        </td>
      </tr>
      <tr>
        <td>动态版</td>
        <td>
          <span v-if="readonly">{{value.dtbProfit}}</span>
          <el-input v-model="value.dtbProfit" @blur="value.dtbProfit=value.dtbProfit.toFixed(2)"   @input="validateDecimal(value,'dtbProfit')" v-else></el-input>%
        </td>
        <td>
          <span v-if="readonly">{{value.dtbIrr}}</span>
          <el-input v-model="value.dtbIrr"  @blur="value.dtbIrr=value.dtbIrr.toFixed(2)"  @input="validateDecimal(value,'dtbIrr')" v-else></el-input>%
        </td>
        <td>
          <span v-if="readonly">{{value.dtbJths}}</span>
          <el-input v-model="value.dtbJths"  @blur="value.dtbJths=value.dtbJths.toFixed(2)"  @input="validateDecimal(value,'dtbJths')" v-else></el-input>
        </td>
      </tr>
      <tr>
        <td>调整后预计</td>
        <td>
          <span v-if="readonly">{{value.tzhProfit}}</span>
          <el-input v-model="value.tzhProfit" @blur="value.tzhProfit=value.tzhProfit.toFixed(2)"   @input="validateDecimal(value,'tzhProfit')" v-else></el-input>%
        </td>
        <td>
          <span v-if="readonly">{{value.tzhIrr}}</span>
          <el-input v-model="value.tzhIrr" @blur="value.tzhIrr=value.tzhIrr.toFixed(2)"  @input="validateDecimal(value,'tzhIrr')" v-else></el-input>%
        </td>
        <td>
          <span v-if="readonly">{{value.tzhJths}}</span>
          <el-input v-model="value.tzhJths" @blur="value.tzhJths=value.tzhJths.toFixed(2)"   @input="validateDecimal(value,'tzhJths')" v-else></el-input>
        </td>
      </tr>
      <tr>
        <td>调整后差值(对比战规版)</td>
        <td>{{((value.tzhProfit-value.zgbProfit)||0).toFixed(2)}}%</td>
        <td>{{((value.tzhIrr-value.zgbIrr)||0).toFixed(2)}}%</td>
        <td>{{((value.tzhJths-value.zgbJths)||0).toFixed(2)}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {number,decimal} from "@/utils/filter.js";
  export default {
    name: "changeData",
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
    data(){
      return {
        timer:null
      }
    },
    methods:{
      validateDecimal(obj, key) {
        this.timer && clearTimeout(this.timer);
        this.timer=setTimeout(() => {
          obj[key] = decimal(obj[key]);
        }, 1000)
      },
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .fullWidth{
    .parojectStatus.table{
      min-width: 400px;
	  text-align: center;
    }
  }
</style>
