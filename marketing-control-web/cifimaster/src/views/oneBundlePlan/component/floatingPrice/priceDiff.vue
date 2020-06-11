<template>
  <div class="fullWidth">
    <div v-if="!readonly">
      价格版本类型：
      <el-select v-model="type" @change="change">
        <el-option label="首开定价" value="首开定价"></el-option>
        <el-option label="非首开定调价" value="非首开定调价"></el-option>
      </el-select>
      <!-- <el-button class="xuHuiBtn secondary fr" @click="add">新增</el-button> -->
    </div>
    <table class="parojectStatus table" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <th colspan="4">价格版本</th>
        <th colspan="3">对标版本</th>
        <th colspan="2">差异值</th>
        <!-- <th rowspan="2" v-if="!readonly">操作</th> -->
      </tr>
      <tr>
        <th>价格版本</th>
        <th>业态</th>
        <th>价格(元/㎡)</th>
        <th>目标流量(万元)</th>
        <th>对标版本（元/㎡）</th>
        <th>价格(元/㎡)</th>
        <th>月度流量(万元)</th>
        <th width="100">价格浮动<br>(元/㎡)</th>
        <th width="100" style="padding: 0;">流量差异<br>(万元)</th>
      </tr>
      <template v-if="value.priceComparison&&value.priceComparison.length">
        <template v-for="(item,index) in value.priceComparison">
          <tr>
            <td :rowspan="value.priceComparison.length*(type==='非首开定调价'?7:4)" v-if="index===0">{{item.priceVersion=type}}</td>
            <td :rowspan="type==='非首开定调价'?7:4">
              <span v-if="readonly||checkNull(index,'commercial')">{{item.commercial===undefined?"--":item.commercial}}</span>
              <el-input v-model="item.commercial" v-else></el-input>
            </td>
            <td :rowspan="type==='非首开定调价'?7:4">
              <span v-if="readonly||checkNull(index,'price')">{{item.price===undefined?"--":item.price}}</span>
              <el-input v-model="item.price" v-else  @blur="item.price=item.price.toFixed(2)" @input="validateDecimal(item,'price')" ></el-input>
            </td>
            <td :rowspan="type==='非首开定调价'?7:4">
              <span v-if="readonly">{{item.targetTraffic===undefined?"--":item.targetTraffic}}</span>
              <el-input v-model="item.targetTraffic" @blur="item.targetTraffic=item.targetTraffic.toFixed(2)" v-else @input="validateDecimal(item,'targetTraffic')"></el-input>
            </td>
            <td>同业态战规版整盘均价</td>
            <td>
              <span v-if="readonly">{{item.zgzpAvgPrice===undefined?"--":item.zgzpAvgPrice}}</span>
              <el-input v-model="item.zgzpAvgPrice" @blur="item.zgzpAvgPrice=item.zgzpAvgPrice.toFixed(2)" v-else @input="validateDecimal(item,'zgzpAvgPrice')"></el-input>
            </td>
            <td>
              <span v-if="readonly">{{item.zgzpTraffic===undefined?"--":item.zgzpTraffic}}</span>
              <el-input v-model="item.zgzpTraffic" @blur="item.zgzpTraffic=item.zgzpTraffic.toFixed(2)" v-else @input="validateDecimal(item,'zgzpTraffic')"></el-input>
            </td>
            <td>{{(item.zgzpPriceFd=(item.price-item.zgzpAvgPrice).toFixed(2))=="NaN"?"--":item.zgzpPriceFd}}</td>
            <td>{{(item.zgzpTrafficDiff=(item.targetTraffic-item.zgzpTraffic).toFixed(2))=="NaN"?"--":item.zgzpTrafficDiff}}</td>
            <!-- <td :rowspan="type==='非首开定调价'?7:4" v-if="!readonly"><el-button type="text" @click="remove(index)">删除</el-button></td> -->
          </tr>
          <tr v-if="type==='非首开定调价'">
            <td>同业态近3月累计已售均价</td>
            <td>
              <span v-if="readonly||checkNull(index,'tytthreeAvgprice')">{{item.tytthreeAvgprice===undefined?"--":item.tytthreeAvgprice}}</span>
              <el-input v-model="item.tytthreeAvgprice" @blur="item.tytthreeAvgprice=item.tytthreeAvgprice.toFixed(2)" v-else @input="validateDecimal(item,'tytthreeAvgprice')"></el-input>
            </td>
            <td>
              <span v-if="readonly">{{item.tytthreeTraffic===undefined?"--":item.tytthreeTraffic}}</span>
              <el-input v-model="item.tytthreeTraffic" @blur="item.tytthreeTraffic=item.tytthreeTraffic.toFixed(2)" v-else @input="validateDecimal(item,'tytthreeTraffic')"></el-input>
            </td>
            <td>{{(item.tytthreePriceFd=(item.price-item.tytthreeAvgprice).toFixed(2))=="NaN"?"--":item.tytthreePriceFd}}</td>
            <td>{{(item.tytthreeTrafficDiff=(item.targetTraffic-item.tytthreeTraffic).toFixed(2))=="NaN"?"--":item.tytthreeTrafficDiff}}</td>
          </tr>
          <tr  v-if="type==='非首开定调价'">
            <td>该批次房源系统单价</td>
            <td>
              <span v-if="readonly||checkNull(index,'fyxtDprice')">{{item.fyxtDprice===undefined?"--":item.fyxtDprice}}</span>
              <el-input v-model="item.fyxtDprice" @blur="item.fyxtDprice=item.fyxtDprice.toFixed(2)" v-else @input="validateDecimal(item,'fyxtDprice')"></el-input>
            </td>
            <td>
              <span v-if="readonly">{{item.fyxtTraffic===undefined?"--":item.fyxtTraffic}}</span>
              <el-input v-model="item.fyxtTraffic" @blur="item.fyxtTraffic=item.fyxtTraffic.toFixed(2)" v-else @input="validateDecimal(item,'fyxtTraffic')"></el-input>
            </td>
            <td>{{(item.fyxtPriceFd=(item.price-item.fyxtDprice).toFixed(2))=="NaN"?"--":item.fyxtPriceFd}}</td>
            <td>{{(item.fyxtTrafficDiff=(item.targetTraffic-item.fyxtTraffic).toFixed(2))=="NaN"?"--":item.fyxtTrafficDiff}}</td>
          </tr>
          <tr  v-if="type==='非首开定调价'">
            <td>同业态上批次定价</td>
            <td>
              <span v-if="readonly||checkNull(index,'tytTopprice')">{{item.tytTopprice===undefined?"--":item.tytTopprice}}</span>
              <el-input v-model="item.tytTopprice" @blur="item.tytTopprice=item.tytTopprice.toFixed(2)" v-else @input="validateDecimal(item,'tytTopprice')"></el-input>
            </td>
            <td>
              <span v-if="readonly">{{item.tytTopDiff===undefined?"--":item.tytTopDiff}}</span>
              <el-input v-model="item.tytTopDiff" @blur="item.tytTopDiff=item.tytTopDiff.toFixed(2)" v-else @input="validateDecimal(item,'tytTopDiff')"></el-input>
            </td>
            <td>{{(item.tytTopPriceFd=(item.price-item.tytTopprice).toFixed(2))=="NaN"?"--":item.tytTopPriceFd}}</td>
            <td>{{(item.tytTopTrafficDiff=(item.targetTraffic-item.tytTopDiff).toFixed(2))=="NaN"?"--":item.tytTopTrafficDiff}}</td>
          </tr>
          <tr  v-if="type==='非首开定调价'">
            <td>同业态待售库存均价</td>
            <td>
              <span v-if="readonly||checkNull(index,'tytDskcavgPrice')">{{item.tytDskcavgPrice===undefined?"--":item.tytDskcavgPrice}}</span>
              <el-input v-model="item.tytDskcavgPrice" @blur="item.tytDskcavgPrice=item.tytDskcavgPrice.toFixed(2)" v-else @input="validateDecimal(item,'tytDskcavgPrice')"></el-input>
            </td>
            <td>
              <span v-if="readonly">{{item.tytDskcTraffic===undefined?"--":item.tytDskcTraffic}}</span>
              <el-input v-model="item.tytDskcTraffic" @blur="item.tytDskcTraffic=item.tytDskcTraffic.toFixed(2)" v-else @input="validateDecimal(item,'tytDskcTraffic')"></el-input>
            </td>
            <td>{{(item.tytDskcPriceFd=(item.price-item.tytDskcavgPrice).toFixed(2))=="NaN"?"--":item.tytDskcPriceFd}}</td>
            <td>{{(item.tytDskcTrafficDiff=(item.targetTraffic-item.tytDskcTraffic).toFixed(2))=="NaN"?"--":item.tytDskcTrafficDiff}}</td>
          </tr>
          <tr  v-if="type==='非首开定调价'">
            <td>同业态规划部分均价</td>
            <td>
              <span v-if="readonly||checkNull(index,'tytGhbfjPrice')">{{item.tytGhbfjPrice===undefined?"--":item.tytGhbfjPrice}}</span>
              <el-input v-model="item.tytGhbfjPrice" @blur="item.tytGhbfjPrice=item.tytGhbfjPrice.toFixed(2)" v-else @input="validateDecimal(item,'tytGhbfjPrice')"></el-input>
            </td>
            <td>
              <span v-if="readonly">{{item.tytGhbfjTraffic===undefined?"--":item.tytGhbfjTraffic}}</span>
              <el-input v-model="item.tytGhbfjTraffic" @blur="item.tytGhbfjTraffic=item.tytGhbfjTraffic.toFixed(2)" @input="validateDecimal(item,'tytGhbfjTraffic')" v-else></el-input>
            </td>
            <td>{{(item.tytGhbfjPriceFd=(item.price-item.tytGhbfjPrice).toFixed(2))=="NaN"?"--":item.tytGhbfjPriceFd}}</td>
            <td>{{(item.tytGhbfjTrafficDiff=(item.targetTraffic-item.tytGhbfjTraffic).toFixed(2))=="NaN"?"--":item.tytGhbfjTrafficDiff}}</td>
          </tr>
          <tr v-if="type!=='非首开定调价'">
            <td>同业态战规版首开均价</td>
            <td>
              <span v-if="readonly||checkNull(index,'zgskAvgPrice')">{{item.zgskAvgPrice===undefined?"--":item.zgskAvgPrice}}</span>
              <el-input v-model="item.zgskAvgPrice" @blur="item.zgskAvgPrice=item.zgskAvgPrice.toFixed(2)" v-else @input="validateDecimal(item,'zgskAvgPrice')"></el-input>
            </td>
            <td>
              <span v-if="readonly">{{item.zgskTraffic===undefined?"--":item.zgskTraffic}}</span>
              <el-input v-model="item.zgskTraffic" @blur="item.zgskTraffic=item.zgskTraffic.toFixed(2)" v-else @input="validateDecimal(item,'zgskTraffic')"></el-input>
            </td>
            <td>{{(item.zgskPriceFd=(item.price-item.zgskAvgPrice).toFixed(2))=="NaN"?"--":item.zgskPriceFd}}</td>
            <td>{{(item.zgskTrafficDiff=(item.targetTraffic-item.zgskTraffic).toFixed(2))=="NaN"?"--":item.zgskTrafficDiff}}</td>
          </tr>
          <tr v-if="type!=='非首开定调价'">
            <td>同业态规划部分均价</td>
            <td>
              <span v-if="readonly||checkNull(index,'ghbfAvgPriect')">{{item.ghbfAvgPriect===undefined?"--":item.ghbfAvgPriect}}</span>
              <el-input v-model="item.ghbfAvgPriect" @blur="item.ghbfAvgPriect=item.ghbfAvgPriect.toFixed(2)" v-else @input="validateDecimal(item,'ghbfAvgPriect')"></el-input>
            </td>
            <td>
              <span v-if="readonly">{{item.ghbfTraffic===undefined?"--":item.ghbfTraffic}}</span>
              <el-input v-model="item.ghbfTraffic" @blur="item.ghbfTraffic=item.ghbfTraffic.toFixed(2)" v-else @input="validateDecimal(item,'ghbfTraffic')"></el-input>
            </td>
            <!-- <td>{{(item.ghbfPriceFd=(item.price-item.ghbfAvgPriect).toFixed(2))||"--"}}</td> -->
            <td>{{(item.ghbfPriceFd=(item.price-item.ghbfAvgPriect).toFixed(2))=="NaN"?"--":item.ghbfPriceFd}}</td>

            <td>{{(item.ghbfTrafficDiff=(item.targetTraffic-item.ghbfTraffic).toFixed(2))=="NaN"?"--":item.ghbfTrafficDiff}}</td>
          </tr>
          <tr>
            <td>竞品价格</td>
            <td>
              <span v-if="readonly">{{item.jpjgAvgPrice===undefined?"--":item.jpjgAvgPrice}}</span>
              <el-input v-model="item.jpjgAvgPrice" @blur="item.jpjgAvgPrice=item.jpjgAvgPrice.toFixed(2)" v-else @input="validateDecimal(item,'jpjgAvgPrice')"></el-input>
            </td>
            <td>
              <span v-if="readonly">{{item.jpjgPriceTraffic===undefined?"--":item.jpjgPriceTraffic}}</span>
              <el-input v-model="item.jpjgPriceTraffic" @blur="item.jpjgPriceTraffic=item.jpjgPriceTraffic.toFixed(2)" v-else @input="validateDecimal(item,'jpjgPriceTraffic')"></el-input>
            </td>
            <!-- <td>{{(item.jpjgPriceFd=(item.price-item.jpjgAvgPrice).toFixed(2))||"--"}}</td> -->
            <td>{{(item.jpjgPriceFd=(item.price-item.jpjgAvgPrice).toFixed(2))=="NaN"?"--":item.jpjgPriceFd}}</td>
            <!-- <td>{{(item.jpjgPriceDiff=(item.targetTraffic-item.jpjgPriceTraffic).toFixed(2))||"--"}}</td> -->
            <td>{{(item.jpjgPriceDiff=(item.targetTraffic-item.jpjgPriceTraffic).toFixed(2))=="NaN"?"--":item.jpjgPriceDiff}}</td>
          </tr>
        </template>
      </template>
      <tr v-else>
        <td style="text-align: center;color: #909399;" colspan="9">暂无数据</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {number,decimal} from "@/utils/filter.js";
  export default {
    name: "priceDiff",
    created(){

    },
    updated(){
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
    computed:{
    },
    data() {
      return {
        type: '首开定价',
        timer:null,
        first:{
          "commercial":"",
          "jpjgAvgPrice":"",
          "jpjgPriceTraffic":"",
          "priceVersion":"",
          "jpjgPriceDiff":"",
          "ghbfAvgPriect":"",
          "ghbfTraffic":"",
          "zgzpTrafficDiff":"",
          "zgskAvgPrice":"",
          "ghbfTrafficDiff":"",
          "zgzpAvgPrice":"",
          "zgskPriceFd":"",
          "zgskTrafficDiff":"",
          "price":"",
          "ghbfPriceFd":"",
          "jpjgPriceFd":"",
          "zgskTraffic":"",
          "targetTraffic":"",
          "zgzpTraffic":"",
          "zgzpPriceFd":"",
        },
      notFirst:{
        commercial:'',
        priceVersion:'',
        price:'',
        targetTraffic:'',
        zgzpAvgPrice:'',
        zgzpTraffic:'',
        zgzpPriceFd:'',
        zgzpTrafficDiff:'',
        tytthreeAvgprice:'',
        tytthreeTraffic:'',
        tytthreePriceFd:'',
        tytthreeTrafficDiff:'',
        fyxtDprice:'',
        fyxtTraffic:'',
        fyxtPriceFd:'',
        fyxtTrafficDiff:'',
        tytTopprice:'',
        tytTopDiff:'',
        tytTopPriceFd:'',
        tytTopTrafficDiff:'',
        tytDskcavgPrice:'',
        tytDskcTraffic:'',
        tytDskcPriceFd:'',
        tytDskcTrafficDiff:'',
        tytGhbfjPrice:'',
        tytGhbfjTraffic:'',
        tytGhbfjPriceFd:'',
        tytGhbfjTrafficDiff:'',
        jpjgPriceTraffic:'',
        jpjgAvgPrice:'',
        jpjgPriceFd:'',
        jpjgPriceDiff:''
      }
      }
    },
    methods:{
       checkNull(index,name) {
          if(!this.value.checkObj.priceComparisonData||this.value.checkObj.priceComparisonData.length==0){
            return false
          }
          if ( this.value.checkObj.priceComparisonData[index][name]!==undefined&& this.value.checkObj.priceComparisonData[index][name] !== null) {
            return true;
          } else {
            return false;
          }
        },
      add(){
        this.type==="首开定价"?this.value.priceComparison.push(Object.assign({},this.first,{priceVersion:this.type}) ):this.value.priceComparison.push(Object.assign({},this.notFirst,{priceVersion:this.type}) );
      },
      remove(index){
        this.value.priceComparison.splice(index,1);
      },
      change(){
        // this.value.priceComparison.splice(0,this.value.priceComparison.length);
        // this.add();
      },
      validateDecimal(obj, key) {
        this.timer && clearTimeout(this.timer);
        this.timer=setTimeout(() => {
          obj[key] = decimal(obj[key]);
        }, 1000)
      },
    },
    watch:{
      value(newV){
        if(newV.priceComparison&&newV.priceComparison.length>0&&newV.priceComparison.some(item=>item.priceVersion=='非首开定调价')){
          this.type="非首开定调价";
        }else{
          this.type="首开定价"
        }
        return newV;
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .parojectStatus.table{
    min-width: 900px;
    text-align: center;
  }
</style>
