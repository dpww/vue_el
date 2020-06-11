<template>
  <div class="fullWidth">
    <template v-for="item in value.pricingResult">
      <el-col :span="24" style="line-height: 30px;"><strong>此次定调价对象：</strong> <span style="color: #2661FF;">{{item.priceAdObject}}</span></el-col>
      <el-col :span="24" style="line-height: 30px;"><strong>此次定调价货量：</strong><span style="color: #2661FF;">{{item.priceAdCargo}}(㎡)</span></el-col>
      <el-col :span="24">
        <table  class="parojectStatus table" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th>调整前均价</th>
            <th>申请均价</th>
            <th>均差价</th>
          </tr>
          <tr>
            <td>{{item.priceAdAvg}}</td>
            <td>{{item.priceAdsqAvg}}</td>
            <td :style="Number(item.priceAdsqAvg)-item.priceAdAvg>=0?{color:'green'}:{color:'red'}">{{(Number(item.priceAdsqAvg)-item.priceAdAvg).toFixed(2)}}</td>
          </tr>
          <tr>
            <th>调整前货值(万元)</th>
            <th>调整后货值(万元)</th>
            <th>货值差异</th>
          </tr>
          <tr>
            <td>{{item.priceAdbeforeCargo}}</td>
            <td>{{item.priceAdafterCargo}}</td>
            <td :style="item.priceAdDiff>=0?{color:'green'}:{color:'red'}">{{(item.priceAdafterCargo-item.priceAdbeforeCargo).toFixed(2)}}</td>
          </tr>
        </table>
      </el-col>
    </template>
  </div>
</template>
<script>
  export default {
    name:"projectStatus",
    props:{
      value:{
        type:Object,
        default:()=>({
          pricingResult:[{priceAdObject:''}],
          percentage:1.39
        })
      }
    },
    components:{
      yInput:()=>import("@/views/component/input.vue")

    },
    data(){
      return {
        projectLevel:{

        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .fullWidth{
    .parojectStatus.table{
      min-width:auto;
    }
  }
  strong{
    font-size: 12px;
    color:#606266;
  }
</style>
<style lang="scss">
  .fullWidth{
    width: 100%;
    overflow: auto
  }
  .remarks{
    margin-top: 15px;
  }
  .parojectStatus.table{
    width: 100%;
    border: 1px solid #ebeef5;
    margin-top: 10px;
    th{
      background: #F0f0f0;
      border-bottom: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
      height: 35px;
      vertical-align: middle;
      color: #878787;
      font-weight: 500;
    }
    td{
      border-right: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      padding: 10px 5px;
      height: 35px;
      vertical-align: middle;
    }
  }
  .lamp{
    width: 16px;
    height: 16px;
    border-radius:50% ;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 3px;
    margin-right: 5px;
  }
  .green{
    background-color:#00ff00;
    border: 1px solid #00bb00;
  }
  .red{
    background-color: red;
    border: 1px solid #bb0000;
  }

</style>
