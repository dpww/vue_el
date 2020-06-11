<template>
  <div class="flodTable">
    <el-collapse @change="change">
      <el-collapse-item>
        <template slot="title"><h4 class="subtitle">{{value.TjPlanType=='定调价'?'九':'四'}}、价格提示</h4></template>
        <div class="fullWidth">
          <table class="parojectStatus table tips"  border="0" cellpadding="0" cellspacing="0">
            <tr>
              <th>产品类型</th>
              <th width="90">整盘去化率<br>(按金额)</th>
              <th>本次定价最低单价(元/㎡)</th>
              <th>本次定价最高单价(元)</th>
              <th>最低总价<br>(元/㎡)</th>
              <th>最高总价<br>(元/㎡)</th>
            </tr>
            <tr v-for="(item,index) in value.PriceInfoDetails" :key="index">
              <td :width="isMobile&&220">{{item.ProductType||""}}</td>
              <td>{{item.ZpRate||""}}</td>
              <td width="120">{{item.MinPrice||""}}</td>
              <td width="120">{{item.MaxPrice||""}}</td>
              <td>{{item.MinAmount||""}}</td>
              <td>{{item.MaxAmount||""}}</td>
            </tr>
          </table>
        </div>
        <!-- <el-table :data="value.PriceInfoDetails" border>
          <el-table-column label="产品类型" prop="ProductType" :width="isMobile&&220">
            <template slot-scope="scope">
              <span :title="scope.row.ProductType">{{scope.row.ProductType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="整盘去化率(按金额)" prop="ZpRate"></el-table-column>
          <el-table-column label="本次定价最低单价(元/㎡)" width="120" prop="MinPrice"></el-table-column>
          <el-table-column label="本次定价最高单价(元)" width="120"  prop="MaxPrice"></el-table-column>
          <el-table-column label="最低总价(元/㎡)" prop="MinAmount"></el-table-column>
          <el-table-column label="最高总价(元)" prop="MaxAmount"></el-table-column>
        </el-table> -->
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title"><h4 class="subtitle">{{value.TjPlanType=='定调价'?'十':'五'}}、折扣方案</h4></template>
        <div class="fullWidth">
          <table class="parojectStatus table dis"  border="0" cellpadding="0" cellspacing="0">
            <tr>
              <th>序号</th>
              <th>折扣类型</th>
              <th>折扣分类</th>
              <th>折扣项名称</th>
              <th>计算方法</th>
              <th>折扣(%)</th>
              <th>折扣金额</th>
              <th>指定房间</th>
              <th>详细</th>
            </tr>
            <tr v-for="(item,index) in value.PriceDiscountInfo" :key="index">
              <td>{{index+1}}</td>
              <td :width="isMobile&&100">{{item.DiscountType||""}}</td>
              <td :width="isMobile&&100">{{item.AppScenariosEnum||""}}</td>
              <td :width="isMobile&&100">{{item.DiscountDetailName||""}}</td>
              <td >{{item.CalMethodEnum||""}}</td>
              <td >{{item.DiscountVlue||""}}</td>
              <td>{{item.PreferentialPrice||""}}</td>
              <td>{{item.RoomInfo||""}}</td>
              <td><a :href="item.DetailUrl||''" target="_blank">查看详情</a></td>
            </tr>
          </table>
        </div>
        <!-- <el-table :data="value.PriceDiscountInfo" border>
          <el-table-column label="序号" prop="priceAdObject">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column label="折扣类型" prop="AppScenariosEnum" :width="isMobile&&100"></el-table-column>
          <el-table-column label="折扣项名称" prop="DiscountDetailName" :width="isMobile&&100"></el-table-column>
          <el-table-column label="计算方法" prop="CalMethodEnum"></el-table-column>
          <el-table-column label="折扣(%)" prop="DiscountVlue"></el-table-column>
          <el-table-column label="折扣金额" prop="PreferentialPrice"></el-table-column>
          <el-table-column label="指定房间" prop="RoomInfo"></el-table-column>
          <el-table-column label="详细" prop="priceAdafterCargo">
            <template slot-scope="scope">
              <a :href="scope.row.DetailUrl">查看详情</a>
            </template>
          </el-table-column>
        </el-table> -->
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title"><h4 class="subtitle">{{value.TjPlanType=='定调价'?'十一':'六'}}、付款方式</h4></template>
        <div class="fullWidth">
          <table class="parojectStatus table pay"  border="0" cellpadding="0" cellspacing="0">
            <tr>
              <th>序号</th>
              <th>付款方式名称</th>
              <th>生效日期</th>
              <th>失效日期</th>
              <th>应用范围</th>
              <th>贷款选项</th>
              <th>详细</th>
            </tr>
            <tr v-for="(item,index) in value.PayFormInfoDetails" :key="index">
              <td>{{index+1}}</td>
              <td :width="isMobile&&120">{{item.PayFormName}}</td>
              <td >{{item.BgnDate}}</td>
              <td >{{item.EndDate}}</td>
              <td >{{item.Scope}}</td>
              <td>{{item.LoanOption}}</td>
              <td><a :href="item.DetailUrl" target="_blank">查看详情</a></td>
            </tr>
          </table>
        </div>
        <!-- <el-table :data="value.PayFormInfoDetails" border>
          <el-table-column label="序号" prop="priceAdObject">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column label="付款方式名称" prop="PayFormName" :width="isMobile&&120"></el-table-column>
          <el-table-column label="生效日期" prop="BgnDate"></el-table-column>
          <el-table-column label="失效日期" prop="EndDate"></el-table-column>
          <el-table-column label="应用范围" prop="Scope"></el-table-column>
          <el-table-column label="贷款选项" prop="LoanOption"></el-table-column>
          <el-table-column label="详细" >
            <template slot-scope="scope">
              <a :href="scope.row.DetailUrl">查看详情</a>
            </template>
          </el-table-column>
        </el-table> -->
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title"><h4 class="subtitle">{{value.TjPlanType=='定调价'?'十二':'七'}}、一房一价表</h4></template>
        <div class="fullWidth">
          <table class="parojectStatus table house"  border="0" cellpadding="0" cellspacing="0">
            <tr>
              <th>业态名称</th>
              <th>楼栋名称</th>
              <th>详细</th>
            </tr>
            <tr v-for="(item,index) in value.PriceDetail" :key="index">
              <td >{{item.BldFullName}}</td>
              <td >{{item.BldType}}</td>
              <td><a :href="item.DetailUrl" target="_blank">查看详情</a></td>
            </tr>
          </table>
        </div>
        <!-- <el-table :data="value.PriceDetail" border>
          <el-table-column label="业态名称" prop="BldFullName" :width="isMobile&&200"></el-table-column>
          <el-table-column label="楼栋名称" prop="BldType"></el-table-column>
          <el-table-column label="详细" prop="priceAdafterCargo">
            <template slot-scope="scope">
              <a :href="scope.row.DetailUrl">查看详情</a>
            </template>
          </el-table-column>
        </el-table> -->
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  export default {
      name: "flodTable",
      created() {
      },
      props: {
        value: {
          type: Object,
          default: () => ({})
        }
      },
      data() {
        return {
          isMobile:window.screen.width<=1024,
          timer:null
        }
      },
      methods:{
        change(){
          this.timer&&clearTimeout(this.timer);
          this.timer=setTimeout(()=>{
            this.$emit("comEvent");
          },210)
        }
      }
    }
</script>
<style lang="scss">
  .flodTable{
    .tips.parojectStatus{
      min-width: 700px;
    }
    .dis.parojectStatus{
      min-width: 680px;
    }
    .pay.parojectStatus{
      min-width: 600px;
    }
    .house.parojectStatus{
      min-width: 360px;
    }
    td,th{
      text-align: center;
    }
    .cir{
      margin-top: 10px;
      margin-right: 5px;
    }
    a[target="_blank"]{
      color: #409EFF;
    }
  }
</style>
