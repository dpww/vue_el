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
          <tr>
            <th width="150">对标版本</th>
            <th>货值(万元)</th>
            <th>利润额(万元)</th>
            <th>利润率</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>整盘(投资版)</td>
            <td>
              <span v-if="readonly||checkNull('wholePlateInvestmentValue')">{{value.wholePlateInvestmentValue}}</span>
              <el-input
                v-else
                v-model="value.wholePlateInvestmentValue"
                @blur="blurNum(value,'wholePlateInvestmentValue',value.wholePlateInvestmentValue)"
                @input="validateDecimal(value,'wholePlateInvestmentValue')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.wholePlateInvestmentProfitPrice}}</span>
              <el-input
                v-else
                v-model="value.wholePlateInvestmentProfitPrice"
                @blur="blurNum(value,'wholePlateInvestmentProfitPrice',value.wholePlateInvestmentProfitPrice)"
                @input="validateDecimal(value,'wholePlateInvestmentProfitPrice')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.wholePlateInvestmentProfitMargin}}</span>
              <el-input
                v-else
                v-model="value.wholePlateInvestmentProfitMargin"
                @blur="blurNum(value,'wholePlateInvestmentProfitMargin',value.wholePlateInvestmentProfitMargin)"
                @input="validateDecimal(value,'wholePlateInvestmentProfitMargin')"
              ></el-input>%
            </td>
          </tr>

          <tr>
            <td>整盘(战规版)</td>
            <td>
              <span v-if="readonly||checkNull('quietValue')">{{value.quietValue}}</span>
              <el-input
                v-else
                v-model="value.quietValue"
                @blur="blurNum(value,'quietValue',value.quietValue)"
                @input="validateDecimal(value,'quietValue')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.quietProfitPrice}}</span>
              <el-input
                v-else
                v-model="value.quietProfitPrice"
                @blur="blurNum(value,'quietProfitPrice',value.quietProfitPrice)"
                @input="validateDecimal(value,'quietProfitPrice')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.quietProfitMargin}}</span>
              <el-input
                v-else
                v-model="value.quietProfitMargin"
                @blur="blurNum(value,'quietProfitMargin',value.quietProfitMargin)"
                @input="validateDecimal(value,'quietProfitMargin')"
              ></el-input>%
            </td>
          </tr>
          <tr>
            <td>整盘定价前(动态版)</td>
            <td>
              <span v-if="readonly||checkNull('actValue')">{{value.actValue}}</span>
              <el-input
                v-else
                v-model="value.actValue"
                @blur="blurNum(value,'actValue',value.actValue)"
                @input="validateDecimal(value,'actValue')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.actProfitPrice}}</span>
              <el-input
                v-else
                v-model="value.actProfitPrice"
                @blur="blurNum(value,'actProfitPrice',value.actProfitPrice)"
                @input="validateDecimal(value,'actProfitPrice')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.actProfitMargin}}</span>
              <el-input
                v-else
                v-model="value.actProfitMargin"
                @blur="blurNum(value,'actProfitMargin',value.actProfitMargin)"
                @input="validateDecimal(value,'actProfitMargin')"
              ></el-input>%
            </td>
          </tr>
          <tr>
            <td>当批次(战规版)</td>
            <td>
              <span v-if="readonly">{{value.dpcZgbValue}}</span>
              <el-input
                v-else
                v-model="value.dpcZgbValue"
                @blur="blurNum(value,'dpcZgbValue',value.dpcZgbValue)"
                @input="validateDecimal(value,'dpcZgbValue')"
              ></el-input>
            </td>
            <td>——</td>
            <td>——</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-if="readonly&&isMobile"><-该表格可以左右拖动-></span>
    <div class="fullWidth">
      <table
        class="parojectStatus table lastYellow"
        :class="{readonly:readonly}"
        border="0"
        cellpadding="0"
        cellspacing="0"
      >
        <thead>
          <tr>
            <th :width="isMobile&&140">对标细项</th>
            <th>货值(万元)</th>
            <th>创造利润额(万元)</th>
            <th>创造利润率</th>
            <th :width="isMobile&&130">
              与战规版整盘对比
              <br v-if="isMobile" />(利润率)
            </th>
            <th :width="isMobile&&130">
              与动态版整盘对比
              <br v-if="isMobile" />(利润率)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>整盘预计实现</td>
            <td :class="{fontRed:queryMessage('theprojectedValue')}">
              <el-badge
                v-if="readonly&&queryMessage('theprojectedValue')"
                :value="queryMessage('theprojectedValue')"
                class="item"
              >
                <span>{{value.theprojectedValue}}</span>
              </el-badge>
              <span v-else-if="readonly">{{value.theprojectedValue}}</span>
              <el-input
                v-else
                @blur="changeNum(value,'theprojectedValue',value.theprojectedValue)"
                v-model="value.theprojectedValue"
                @input="validateDecimal(value,'theprojectedValue')"
              ></el-input>
            </td>
            <td :class="{fontRed:queryMessage('theprojectedProfitPrice')}">
              <el-badge
                v-if="readonly&&queryMessage('theprojectedProfitPrice')"
                :value="queryMessage('theprojectedProfitPrice')"
                class="item"
              >
                <span>{{value.theprojectedProfitPrice}}</span>
              </el-badge>
              <span v-else-if="readonly">{{value.theprojectedProfitPrice}}</span>
              <el-input
                v-else
                @blur="changeNum(value,'theprojectedProfitPrice',value.theprojectedProfitPrice)"
                v-model="value.theprojectedProfitPrice"
                @input="validateDecimal(value,'theprojectedProfitPrice')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.theprojectedProfitMargin}}</span>
              <el-input
                v-else
                @blur="changeNum(value,'theprojectedProfitMargin',value.theprojectedProfitMargin)"
                v-model="value.theprojectedProfitMargin"
                @input="validateDecimal(value,'theprojectedProfitMargin')"
              ></el-input>%
            </td>
            <td :class="{fontRed:queryMessage('theprojectedQuietProfitMargin')}">
              <el-badge
                v-if="readonly&&queryMessage('theprojectedQuietProfitMargin')"
                :value="queryMessage('theprojectedQuietProfitMargin')"
                class="item"
              >
                <span>{{(value.theprojectedProfitMargin-value.quietProfitMargin).toFixed(2)||0.00}}%</span>
              </el-badge>
              <span
                v-else
              >{{(value.theprojectedProfitMargin-value.quietProfitMargin).toFixed(2)||0.00}}%</span>
            </td>
            <td>{{(value.theprojectedProfitMargin-value.actProfitMargin).toFixed(2)||0.00}}%</td>
          </tr>
          <tr>
            <td>当批次定调价</td>
            <td :class="{fontRed:queryMessage('thisPricingValue')}">
              <el-badge
                v-if="readonly&&queryMessage('thisPricingValue')"
                :value="queryMessage('thisPricingValue')"
                class="item"
              >
                <span>{{value.thisPricingValue}}</span>
              </el-badge>
              <span v-else-if="readonly||checkNull('thisPricingValue')">{{value.thisPricingValue}}</span>
              <el-input
                v-else
                @blur="changeNum(value,'thisPricingValue',value.thisPricingValue)"
                v-model="value.thisPricingValue"
                @input="validateDecimal(value,'thisPricingValue')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.thisPricingProfitPrice}}</span>
              <el-input
                v-else
                @blur="changeNum(value,'thisPricingProfitPrice',value.thisPricingProfitPrice)"
                v-model="value.thisPricingProfitPrice"
                @input="validateDecimal(value,'thisPricingProfitPrice')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.thisPricingProfitMargin}}</span>
              <el-input
                v-else
                @blur="changeNum(value,'thisPricingProfitMargin',value.thisPricingProfitMargin)"
                v-model="value.thisPricingProfitMargin"
                @input="validateDecimal(value,'thisPricingProfitMargin')"
              ></el-input>%
            </td>
            <td>{{(value.thisPricingProfitMargin-value.quietProfitMargin).toFixed(2)||0.00}}%</td>
            <td>{{(value.thisPricingProfitMargin-value.actProfitMargin).toFixed(2)||0.00}}%</td>
          </tr>
          <tr>
            <td>累计已签约部分</td>
            <td>
              <span v-if="readonly||checkNull('addSignValue')">{{value.addSignValue}}</span>
              <el-input
                v-else
                @blur="changeNum(value,'addSignValue',value.addSignValue)"
                v-model="value.addSignValue"
                @input="validateDecimal(value,'addSignValue')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.addSignProfitPrice}}</span>
              <el-input
                v-else
                @blur="changeNum(value,'addSignProfitPrice',value.addSignProfitPrice)"
                v-model="value.addSignProfitPrice"
                @input="validateDecimal(value,'addSignProfitPrice')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.addSignProfitMargin}}</span>
              <el-input
                v-else
                @blur="changeNum(value,'addSignProfitMargin',value.addSignProfitMargin)"
                v-model="value.addSignProfitMargin"
                @input="validateDecimal(value,'addSignProfitMargin')"
              ></el-input>%
            </td>
            <td>{{(value.addSignProfitMargin-value.quietProfitMargin).toFixed(2)||0.00}}%</td>
            <td>{{(value.addSignProfitMargin-value.actProfitMargin).toFixed(2)||0.00}}%</td>
          </tr>
          <tr>
            <td>项目剩余货值部分</td>
            <td>
              <span >{{value.surplusValue}}</span>
              <!-- <el-input v-else @blur="changeNum(value,'surplusValue',value.surplusValue)" v-model="value.surplusValue" @input="validateDecimal(value,'surplusValue')"></el-input> -->
            </td>
            <td>
              <span v-if="readonly">{{value.surplusProfitPrice}}</span>
              <el-input
                v-else
                @blur="changeNum(value,'surplusProfitPrice',value.surplusProfitPrice)"
                v-model="value.surplusProfitPrice"
                @input="validateDecimal(value,'surplusProfitPrice')"
              ></el-input>
            </td>
            <td>
              <span v-if="readonly">{{value.surplusProfitMargin}}</span>
              <el-input
                v-else
                @blur="changeNum(value,'surplusProfitMargin',value.surplusProfitMargin)"
                v-model="value.surplusProfitMargin"
                @input="validateDecimal(value,'surplusProfitMargin')"
              ></el-input>%
            </td>
            <td>{{(value.surplusProfitMargin-value.quietProfitMargin).toFixed(2)||0.00}}%</td>
            <td>{{(value.surplusProfitMargin-value.actProfitMargin).toFixed(2)||0.00}}%</td>
          </tr>
        </tbody>
      </table>
      <div class="minWidth" style="color: red;" v-if="readonly" v-html="getMessage()"></div>
    </div>
  </div>
</template>
<script>
import { number, decimal } from "@/utils/filter.js";
export default {
  name: "management",
  created() {},
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
  },
  data() {
    return {
      isMobile: window.screen.width <= 1024,
      timer: null
    };
  },
  methods: {
    queryMessage(key) {
      let index = "";
      if (this.value.messageArray) {
        this.value.messageArray.some((item, i) => {
          if (item && item.hasOwnProperty(key)) {
            index = i;
            return true;
          }
        });
        if (index !== 0 && !index) return false;
        return (index + 1).toString();
      }
    },
    getMessage() {
      let str = "";
      this.value.messageArray &&
        this.value.messageArray[0] !== null &&
        this.value.messageArray.forEach((item, index) => {
          Object.keys(item).forEach(key => {
            str +=
              "<i class='circle'>" + (index + 1) + "</i>" + item[key] + "</br>";
          });
        });
      return str;
    },
    validateDecimal(obj, key) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        obj[key] = decimal(obj[key]);
      }, 1000);
    },
    blurNum(obj,name,val) {
      if(!val&&val!==0){
        return
      }
      this.$set(obj,name,val.toFixed(2))
    },
    changeNum(obj, name, val) {
      this.$set(obj, name, val.toFixed(2));
      this.$set(
        obj,
        "surplusValue",
        (
          obj.theprojectedValue -
          obj.addSignValue -
          obj.thisPricingValue
        ).toFixed(2)
      );
    },
    checkNull(name) {
      if ( this.value.checkObj[name]!==undefined&& this.value.checkObj[name] !== null) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style>
.circle {
  display: inline-block;
  border-radius: 50%;
  color: #fff;
  margin-right: 5px;
  background: #ff0000;
  font-style: normal;
  height: 15px;
  text-align: center;
  line-height: 15px;
  width: 15px;
}
.el-badge__content {
  padding: 0;
  width: 18px;
  border-radius: 50%;
}
</style>
<style lang="scss" scoped="scoped">
.fullWidth {
  width: 100%;
  overflow: auto;
}
.minWidth {
  min-width: 700px;
  margin-top: 5px;
}
.parojectStatus.table.readonly {
  min-width: 700px;
}
.lastYellow {
  td:last-child,
  td:nth-child(5) {
    background: yellow;
  }
}
.parojectStatus.table {
  width: 100%;
  border: 1px solid #e6e6e6;
  margin-top: 10px;
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
