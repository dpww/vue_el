<template>
  <div class="stopAccounts">
    <div class="stopAccounts_top">
      <div class="key">不予结佣:</div>
      <div class="val">
        <el-select v-model="mainData.stopAccountsSelect" placeholder="请选择">
          <el-option
            v-for="item in stopAccountsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="stopAccounts_bottom">
      <div class="key">备注:</div>
      <div class="val">
        <el-input type="textarea" v-model="mainData.stopAccountsRemark"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stopAccountsOptions: [
        {
          value: "物质形式结佣-物业费",
          label: "物质形式结佣-物业费"
        },
         {
          value: "物质形式结佣-购物卡",
          label: "物质形式结佣-购物卡"
        }, {
          value: "物质形式结佣-积分",
          label: "物质形式结佣-积分"
        }, {
          value: "物质形式结佣-礼品",
          label: "物质形式结佣-礼品"
        }, {
          value: "其他",
          label: "其他"
        }, {
          value: "历史数据",
          label: "历史数据"
        }
      ]
    };
  },
  props: {
    mainData: {
      type: Object,
      dafault: {}
    }
  },
  watch: {
    mainData: {
      handler(newv) {},
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.stopAccounts {
  padding: 15px 15px 110px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;
  background: #fff;
  .stopAccounts_top {
    height: 40px;
    line-height: 40px;
    display: flex;
    .key {
      width: 60px;
      text-align: right;
    }
    .val {
      flex: 1;
      padding-left: 5px;
    }
  }
  .stopAccounts_bottom {
    display: flex;

    .key {
      width: 60px;
      text-align: right;
      height: 40px;
      line-height: 40px;
    }
    .val {
      flex: 1;
      padding-left: 5px;
      padding-top: 10px;
    }
  }
}
</style>
