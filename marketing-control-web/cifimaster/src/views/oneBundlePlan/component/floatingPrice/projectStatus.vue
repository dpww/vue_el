<template>
  <div class="fullWidth">
    <table class="parojectStatus table" border="0" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td>城市能级</td>
          <td align="left">
            <span v-if="readonly">{{projectLevel.options.filter(item=>item.value==(value.cityLevel||1))[0].label}}</span>
            <y-input v-else :values="value" :form_item="projectLevel"></y-input>
          </td>
        </tr>
        <tr>
          <td>项目规模</td>
          <td align="left">
            <y-input :values="value" :form_item="{type:readonly?'info':'text',name:'projectScale',unit:'万方',inputEvent}"></y-input>
          </td>
        </tr>
        <tr>
          <td>区域存量</td>
          <td align="left">
            城市去化周期: <span v-if="readonly">{{value.cityPeriod}}</span> <el-input @input="validateDecimal(value,'cityPeriod')"  v-else v-model="value.cityPeriod"></el-input>月;
            版块存量: <span v-if="readonly">{{value.plateStock}}</span><el-input v-else v-model="value.plateStock" @input="validateDecimal(value,'plateStock')"></el-input>万方;
            版块去化周期:<span v-if="readonly">{{value.platePeriod}}</span> <el-input v-else v-model="value.platePeriod"  @input="validateDecimal(value,'platePeriod')"></el-input>月;
          </td>
        </tr>
        <tr>
          <td>已售</td>
          <td  align="left">
            已售户数: <span v-if="readonly">{{value.soldNum}}</span> <el-input v-model="value.soldNum" v-else @input="validateNumber(value,'soldNum')"></el-input>户;
            已售比例: <span v-if="readonly">{{value.soldPer}}</span> <el-input v-model="value.soldPer"  @input="validateDecimal(value,'soldPer')" v-else></el-input>%;
          </td>
        </tr>
        <tr>
          <td>限价情况及标准</td>
          <td align="left">
            <span v-if="readonly">是否限价：{{value.islimitPrice=='0'?"否":'是'}}</span>
            <y-input v-else :values="value" :form_item="{type:readonly?'info':'radio',name:'islimitPrice',options:[{label:'是',value:'1'},{label:'否',value:'0'}]}" />
            说明：<span v-if="readonly">{{value.islimitExplain}}</span><el-input v-else type="textarea" maxlength="1200" show-word-limit :readonly="readonly" v-model="value.islimitExplain"></el-input>
          </td>
        </tr>
        <tr>
          <td>并表情况</td>
          <td align="left">
            <span v-if="readonly">是否并表：{{value.ismerge=='0'?"否":'是'}}</span>
            <y-input v-else :values="value" :readonly="readonly" :form_item="{type:readonly?'info':'radio',name:'ismerge',options:[{label:'是',value:'1'},{label:'否',value:'0'}]}"></y-input>
          </td>
        </tr>
        <tr>
          <td>营销费率约定</td>
          <td align="left">
            说明: <span v-if="readonly">{{value.marketingExplain}}</span>
            <el-input v-else type="textarea" maxlength="1200" show-word-limit :readonly="readonly" v-model="value.marketingExplain"></el-input>
          </td>
        </tr>
        <tr>
          <td>股权情况</td>
          <td align="left">
            比例：<span v-if="readonly">{{value.stockPer}}</span> <el-input v-else v-model="value.stockPer" @input="validateDecimal(value,'stockPer')" ></el-input>%
            （另合作方为：<span v-if="readonly">{{value.stockPartner}}</span> <el-input v-else v-model="value.stockPartner"></el-input>)
            <br />
            <br />
            股东方意见是否统一:
            <span v-if="readonly">{{value.stockIdea=='0'?"否":'是'}}</span>
            <y-input :values="value" v-else :form_item="{type:'radio',name:'stockIdea',options:[{label:'是',value:'1'},{label:'否',value:'0'}]}" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  const validateDecimal=()=>{
    let timer=null;
    return (item,value)=>{
      timer && clearTimeout(timer);
      timer=setTimeout(() => {
        value[item.name] = decimal(value[item.name]);
      }, 1000)
    }
  }
  const inputEvent=validateDecimal();
  import {number,decimal} from "@/utils/filter.js";
  export default {
    name: "projectStatus",
    mounted() {
      console.log(this.readonly);
    },
    props: {
      value: {
        type: Object,
        default: () => ({
          projectLevel: 0,
          projectScale: ''
        })
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    components: {
    yInput:()=>import( "@/views/component/input.vue")

    },
    data() {
      return {
        timer:null,
        projectLevel: {
          name: 'cityLevel',
          type: 'radio',
          options: [{
            label: '一线',
            value: 1
          }, {
            label: '二线',
            value: 2
          }, {
            label: '三线',
            value: 3
          }, {
            label: '四五线',
            value: 4
          }],
        }
      }
    },
    methods:{
      validateDecimal(obj, key) {
        this.timer && clearTimeout(this.timer);
        this.timer=setTimeout(() => {
          obj[key] = decimal(obj[key]);
        }, 1000)
      },
      inputEvent,
      validateNumber(obj, key) {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          obj[key] = number(obj[key]);
        }, 1000)
      },
    }
  }
</script>
<style lang="scss">
  .parojectStatus.table {
    width: 100%;
    border: 1px solid #ebeef5;
    margin-top: 10px;

    thead th {
      background: #F5F7FA;
      border-bottom: 1px solid #EBEEF5;
      border-right: 1px solid #EBEEF5;
      height: 35px;
      vertical-align: middle;
    }

    tbody td {
      border-right: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      padding: 10px;
      height: 35px;
      vertical-align: middle;
    }
  }
</style>
