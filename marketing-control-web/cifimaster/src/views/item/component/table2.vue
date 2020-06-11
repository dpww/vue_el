<template>
  <div class="container table2">
    <div class="project-div">
      <div class="project-title">平台下发合同口径费用</div>
      <div class="project-container">
        <span class="project-sale-point"><strong>金额</strong>:{{marketing_promotion_cost}}万元</span>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="flex-container blue">
          <p>签约套数<small>（套）</small></p>
          <h3>{{sign_number_set}} </h3>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="flex-container blue">
          <p>认购套数<small>（套）</small></p>
          <h3>{{subscription_number}} </h3>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <el-popover trigger="hover" placement="top">
          成交率=认购套数 /来人量
          <div slot="reference" class="name-wrapper">
            <div class="flex-container gray">
              <p>成交率</p>
               <h3>{{come_client_quantity == '0' ? come_client_quantity  : (subscription_number/(come_client_quantity||1)*100).toFixed(2)}}%</h3>
            </div>
          </div>
        </el-popover>
      </el-col>
      <el-col :span="3" :offset="3">
        <el-popover trigger="hover" placement="top">
          成交成本(元/套) = 费用（元）/认购套数
          <div slot="reference" class="name-wrapper">
            <div class="flex-container gray">
              <p>成交成本<small>（元/套）</small></p>
              <h3>{{Math.round(cost*10000/(subscription_number||1)*100)/100}}</h3>
            </div>
          </div>
        </el-popover>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="flex-container yellow">
          <p>大卡<small>（组）</small></p>
          <h3>
            <el-input placeholder="请输入" :maxlength="10" @input="validateDecimal(null,'big_card')" v-if="!status1 &&$store.state.user.userPower.includes('表二暂存')" v-model="big_card"></el-input>
            <span v-else>{{big_card}}</span>
          </h3>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="flex-container yellow">
          <p>小卡<small>（组）</small></p>
          <h3>
            <el-input placeholder="请输入" :maxlength="10" v-if="!status1 &&$store.state.user.userPower.includes('表二暂存')" @input="validateDecimal(null,'small_card')" v-model="small_card"></el-input>
            <span v-else>{{small_card}}</span>
          </h3>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="flex-container yellow">
          <p>来人量<small>（组）</small></p>
          <h3>
            <el-input placeholder="请输入" :maxlength="10" @input="validateDecimal(null,'come_client_quantity')" v-if="!status1 && $store.state.user.userPower.includes('表二暂存')" v-model="come_client_quantity"></el-input>
            <span v-else>{{come_client_quantity}}</span>
          </h3>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="flex-container green">
          <p>费用<small>（万元）</small></p>
          <h3>
            <el-input placeholder="请输入" :maxlength="10" @input="validateDecimal(null,'cost')" v-if="!status1 &&$store.state.user.userPower.includes('表二暂存')" v-model="cost"></el-input>
            <span v-else>{{cost}}</span>
          </h3>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="flex-container red">
          <p>签约金额<small>（万元）</small></p>
          <h3>{{sign_funds}}</h3>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="flex-container red">
          <p>认购金额<small>（万元）</small></p>
          <h3>{{subscription_funds}}</h3>
        </div>
      </el-col>
      <el-col :span="3">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <el-popover trigger="hover" placement="top">
          来人成本（元/人）=费用（元）/来人量
          <div slot="reference" class="name-wrapper">
            <div class="flex-container gray">
              <p>来人成本<small>（元/人）</small></p>
              <h3>{{(Number(cost)*10000/(come_client_quantity * 1 ||1)).toFixed(2)}}</h3>
              <!-- <h2>{{cost*10000}}</h2> -->
            </div>
          </div>
        </el-popover>
      </el-col>
      <el-col :span="3" :offset="3">
        <el-popover trigger="hover" placement="top">
          费率=费用(万元)/签约金额（万元）
          <div slot="reference" class="name-wrapper">
            <div class="flex-container gray">
              <p>费率</p>
              <h3>{{(marketing_promotion_cost/(sign_funds||1)*100).toFixed(2)}}%</h3>
            </div>
          </div>
        </el-popover>
      </el-col>
    </el-row>
    <p>注：认购套数不含车位/储藏室</p>
    <el-row class="el-row-button">
      <el-button type="primary" v-if="projectStatus==0&&!status1&&$store.state.user.userPower.includes('表二暂存')" @click="PlanUpdate" class="xuHuiBtn secondary">暂存</el-button>
      <el-button type='primary' @click='$router.back(-1)' class="xuHuiBtn secondary">返回</el-button>
    </el-row>
  </div>
</template>
<script>
  import {
    /*
     查找月度计划明细到表二，若没有则初始化
     */
    allMouthPlanSelect,
    /*
     更新表二信息（月度计划明细）
     */
    mouthPlanUpdate,
    /*
     通过项目ID和月份来设置表二（月度计划明细）是否生效状态
     */
    mouthPlanEffective

  } from '@/api/ProjectMonthlyPlan';
  import {number,tableFixed} from "@/utils/filter";
  export default {
    data() {
      return {
        big_card: '',
        small_card: '',
        come_client_quantity: '',
        sign_funds: '',
        sign_number_set: '',
        subscription_number: '',
        subscription_funds: '',
        cost: '',
        projectStatus: 0,
        readonly: false,
        postId: localStorage.getItem("CommonJobID") === '1c1d3cf6-e37a-11e9-8c08-00163e05721e',
        isSubmit:true,
        marketing_promotion_cost:'',
      }
    },
    computed: {
      turnover_rate() {
        return Math.round(this.subscription_number / (this.come_client_quantity || 1) * 100);
      },

      transaction_cost() {
        return Math.round(this.marketing_promotion_cost / (this.subscription_number || 1) * 100);
      },

      come_client_cost() {
        return Math.round(this.marketing_promotion_cost / (this.come_client_quantity || 1) * 100);
      },

      rate() {
        return Math.round(this.marketing_promotion_cost / (this.sign_funds || 1) * 100);
      },
      status() {
        return this.$store.state.settings.projectStatus == 2;
      },
      status1(){
        return this.$store.state.settings.projectStatus >= 3;
      },
      isRegion(){
        return this.$store.state.settings.regionItem
      },
      isAdmin(){
        return this.$store.state.user.userJobType=='admin';
      },
    },
    created() {
      /*
      表二初始化
      */
      allMouthPlanSelect({...this.$route.query,userId:localStorage.getItem("id")}).then(res => {
        res = res.result;
        this.$data.projectStatus = res.is_effective;
        this.readonly = res.is_effective>3||!this.$store.state.user.userPower.includes('表二暂存');
        this.$data.sign_funds = res.sign_funds;
        this.$data.sign_number_set = res.sign_number_set;
        this.$data.subscription_number = res.subscription_number;
        this.$data.subscription_funds = res.subscription_funds;
        this.$data.cost = res.cost;
        this.$data.big_card = res.big_card;
        this.$data.small_card = res.small_card;
        this.$data.come_client_quantity = res.come_client_quantity;
        this.$data.marketing_promotion_cost = res.marketing_promotion_cost;
        console.log(res.marketing_promotion_cost);
        // this.$data.marketing_promotion_cost=res.marketing_promotion_cost;
        this.$emit('tabledata',res);
        this.$store.dispatch('settings/changeSetting',{key:'regionItem',value:res.is_manage==1});
      });
    },
    methods: {
      validateNumber(obj, key) {
        obj = obj || this;
        this.timer || clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          obj[key] = number(obj[key]);
        }, 1000)
      },
      validateDecimal(obj, key) {
        if(this.timer ){
          clearTimeout(this.timer)
        }
        obj=obj||this;

        this.timer = setTimeout(() => {
          obj[key] = tableFixed(obj[key]);
        }, 3000);
      },
      /*
       更新表二信息（月度计划明细）
       */
      PlanUpdate() {
        _paq.push(['trackEvent', '点击', '暂存', '项目月度计划管理表二暂存']);
        let data={
          "big_card": this.$data.big_card,
          "small_card": this.$data.small_card,
          "come_client_quantity": this.$data.come_client_quantity,
          "projectId": this.$route.query.projectId,
          "months": this.$route.query.months,
          "sign_funds": this.$data.sign_funds,
          "sign_number_set": this.$data.sign_number_set,
          "subscription_number": this.$data.subscription_number,
          "subscription_funds": this.$data.subscription_funds,
          "marketing_promotion_cost":this.$data.marketing_promotion_cost,
          "cost": this.$data.cost,
          "transaction_cost": this.transaction_cost,
          "turnover_rate": this.turnover_rate,
          "come_client_cost": this.come_client_cost,
          "rate": this.rate
        };
        this.$emit('tabledata',data);
        mouthPlanUpdate(JSON.stringify(data)).then(res => {
          this.$message.success("暂存成功");
        })
      },
      /*
       通过项目ID和月份来设置表二（月度计划明细）是否生效状态
       */
      PlanEffective() {

        this.$confirm("确认上报吗").then(() => {
          _paq.push(['trackEvent', '点击', '上报', '项目月度计划管理表二上报']);
          mouthPlanUpdate(JSON.stringify({
            "big_card": this.$data.big_card,
            "small_card": this.$data.small_card,
            "come_client_quantity": this.$data.come_client_quantity,
            "projectId": this.$route.query.projectId,
            "months": this.$route.query.months,
            "sign_funds": this.$data.sign_funds,
            "sign_number_set": this.$data.sign_number_set,
            "subscription_number": this.$data.subscription_number,
            "subscription_funds": this.$data.subscription_funds,
            "cost": this.$data.cost,
            "transaction_cost": this.transaction_cost,
            "turnover_rate": this.turnover_rate,
            "come_client_cost": this.come_client_cost,
            "rate": this.rate
          })).then(res => {
            mouthPlanEffective({
              "projectId": this.$route.query.projectId,
              "months": this.$route.query.months,
              "is_effective": 1
            }).then(res => {
              this.isSubmit=false;
              this.$message.success("上报成功");
            })
          })
        }).catch(() => {
          this.$message("已取消")
        })
      }
    },
  }
</script>

<style lang="scss">
  .table2 {
    $bottomMargin: 16px;

    .el-input__inner {
      background-color: transparent;
      color: #fff;
      border-color: #ddd;
      line-height: 40px;
      text-align: center;

      &::placeholder {
        color: #fff;
        font-size: 16px;
        padding: 5px 0;
      }

      &:hover {
        border-color: #fff;
      }
    }

    .el-input {
      font-size: inherit;
    }

    .el-row {
      margin: 14px 0;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
    }

    .el-input {
      width: 85%;
    }

    .flex-container {
      display: flex;
      flex-direction: column;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      height: 96px;

      p {
        font-size: 16px;
        margin-top: $bottomMargin;
        margin-bottom: 12px;

        small {
          font-size: 80%;
        }
      }

      h3 {
        font-size: 28px;
        margin-top: 0;
        margin-bottom: $bottomMargin;
      }

      &.blue {
        background: linear-gradient(to right, #2761ff, #6DB8FF);
      }

      &.gray {
        background: linear-gradient(to right, #9A9BA2, #B8BCCC);
      }

      &.yellow {
        background: linear-gradient(to right, #F76B1C, #FAD961);
      }

      &.green {
        background: linear-gradient(to right, #18A27B, #2FD6B3);
      }

      &.red {
        background: linear-gradient(to right, #C50D24, #FD475D);
      }
    }
  }
</style>
