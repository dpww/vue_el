<template>
  <div class="app-container">
    <div class="organization">
      <div>集团指标编制<small style="font-size: 80%; color: #999;">(金额单位:万元)</small></div>
      <div>
        <el-row>
          <!-- <el-upload  v-if="$store.state.user.userPower.includes('导入数据')&&onlyRead" @click="loadMatomo" class="upload-demo intodata " :before-upload="loading" :action="importData('/import/groupMonthlyPlanImport.action')"
                      :show-file-list="false" :on-success="reload" :on-error="closeLoading" >
            <el-button type="primary" class="xuHuiBtn secondary">导入数据</el-button>
          </el-upload> -->
          <el-link v-if="$store.state.user.userPower.includes('导出模板')" :href="exportTemp()" style="color:#fff;" class="outdata xuHuiBtn main " @click="bury" type="primary">导出数据</el-link>
        </el-row>
      </div>
    </div>
    <!-- 表格 -->
    <el-row class="container">
      <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;margin-top:0" row-key="business_id"
        :default-expand-all="false" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" class="etable"
        lazy :load="load" :height="tableHeight" >
        <el-table-column label="项目" header-align="center" align="left" width="210" style="text-align: left;" fixed>
          <template slot-scope="scope">
            <span :title="scope.row.business_name">{{ scope.row.business_name }}</span>
          </template>
        </el-table-column>
        <!--
          周度计划管理 新增
          月度累计考核签约指标
         -->
        <!-- <el-table-column label="年度考核签约目标" header-align="center" align="center">
          <el-table-column prop="year_check_funds" label="金额" header-align="center" align="center" ></el-table-column>
        </el-table-column>
        <el-table-column label="年度考核版指标完成率(%)" prop="year_check_funds_per"  header-align="center" align="center" ></el-table-column>
        <el-table-column label="月度累计考核签约指标" header-align="center" align="center">
          <el-table-column prop="months_check_funds" label="金额" header-align="center" align="center" ></el-table-column>
        </el-table-column>
          <el-table-column  label="月度累计考核签约指标完成率(%)" prop="months_check_funds_per"  header-align="center" align="center" ></el-table-column> -->

        <el-table-column label="年度累计签约" header-align="center" align="center">
          <el-table-column prop="year_grand_total_sign" label="金额" header-align="center" align="center" ></el-table-column>
        </el-table-column>
        <el-table-column label="前三月月均签约" header-align="center" align="center">
          <el-table-column prop="top_three_month_average_sign_set" label="套"  header-align="center" align="center"></el-table-column>
          <el-table-column prop="top_three_month_average_sign_funds" label="金额"   header-align="center" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="上月签约" header-align="center" align="center">
          <el-table-column prop="upper_moon_sign_set" label="套" header-align="center"  align="center"></el-table-column>
          <el-table-column prop="upper_moon_sign_funds" label="金额" header-align="center"  align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="计划签约" header-align="center" align="center">
            <el-table-column label="金额" header-align="center" width="120" align='center'>
              <template slot-scope="scope">
                <el-input v-if="!readonly&&scope.row.type==3&&onlyRead&&$store.state.user.userPower.includes('签约计划编制')" :maxlength="8" @blur="tableSetChange('total_sign_funds')"  @input="validateDecimal(scope.row,'total_sign_funds')" v-model="scope.row.total_sign_funds"
                   placeholder class="amount" ></el-input>
                <span v-else>{{scope.row.total_sign_funds | fixed}}</span>
              </template>
            </el-table-column>
        </el-table-column>
      </el-table>
      <el-row class="el-row-button">
        <el-button type="primary"  v-if="$store.state.user.userPower.includes('下达')&&onlyRead" class="xuHuiBtn main" @click='requestHandle({"planStatus": "1" , "months" : $route.query.months ,"businessId" : $route.query.id , "preparedByLevel" : "1" })'>下达</el-button>
        <el-button type="primary" v-if="$store.state.user.userPower.includes('暂存')&&onlyRead" class="xuHuiBtn secondary" @click='requestHandle({"planStatus": "0" , "months" : $route.query.months ,"businessId" : $route.query.id , "preparedByLevel" : "1" })'>暂存</el-button>
        <el-button type='primary' class="xuHuiBtn secondary" @click='$router.back(-1)'>返回</el-button>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  import {
    sendFile,
    sendJSON,
    downLoad,
    upFile
  } from "@/api/request";
  import {
    sortList,
    total
  } from "@/utils/methods";
    import {
    number,
    decimal
  } from "@/utils/filter";
  export default {
    created() {
      this.reload();
      this.$store.dispatch("app/trackPageView", "区域指标编制");
    },
    filters: {
    fixed: function(data) {
      if (!data) {
        return "";
      } else if (isNaN(data)) {
        return "";
      } else {
        return data.toFixed(2);
      }
    }
  },
    methods: {
      loading() {
        this.loadObj = this.$loading({
          lock: true,
          text: '上传中，请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
        });
      },
      closeLoading() {
        this.loadObj.close();
      },
      importData(url) {
        return upFile(url);
      },
      loadMatomo(){
        _paq.push(['trackEvent', '点击', '导入', '集团月度计划指标编制数据导入']);
      },
      bury() {
        _paq.push(['setDownloadExtensions', "xlsx"]);
        _paq.push(['trackEvent', '点击', '导出', '集团月度计划指标编制数据导出']);

      },
      exportTemp() {
        let {
          months,
          id
        } = this.$route.query;
        return downLoad("/Export/groupMonthlyPlanWriteExport.action"
        , {
          month: months,
          businessId: id
        });
      },
      reload(res) {
        if((!res)||res.code==200||res.code==0){
          sendJSON("/group/getGroupAllMessages", {
            "months": this.$route.query.months,
            "userId": localStorage.getItem('id')
          }).then(res => {
            if (this.loadObj) {
              this.closeLoading();
            }
            this.$data.tableData.splice(0, this.$data.tableData.length, ...sortList(res.result, 'business_unit_id',
              'father_id', 'type', true));
              // this.tableData[0].children.forEach(item=>{
              //   item.children=[]
              // })
              console.log(this.tableData);

          });
        }else{
          if(this.loadObj){
            this.closeLoading();
          }
          this.$message.error(res.messages||res.message);
        }
      },
      //   表格
      load(tree, treeNode, resolve) {
        sendJSON('/group/getGroupChildMessages', {
          "months": this.$route.query.months,
          "PojectOrgId": tree.business_unit_id,
          "userId": "6d445313-3554-11e7-a3f8-5254007b6f02"
        }).then(res => {
          res.result.forEach(item => {
            if (item.father_count > 0) {
              item.hasChildren = true;
            }
          })
          resolve(res.result);
        });
      },
      findC_flag(obj){
        for(let i=0;i<obj.length;i++){
            if(obj[i].reserve_sign_funds>obj[i].reserve_can_sell_funds){
              this.flagInfo="计划签约中的库存签约金额不得大于供货情况中库存可售金额"
              this.downFlag=false
              return
            }else if(obj[i].new_sign_funds>obj[i].new_reserve_funds){
              this.flagInfo="计划签约中的新增签约金额不得大于供货情况中新增可售金额"
              this.downFlag=false
              return
            }
           if(obj[i].children&&obj[i].type<=3){
            this.findC_flag(obj[i].children)
          }
        }
      },
      requestHandle(params) {
        _paq.push(['trackEvent', '点击', params.planStatus == 0 ? "暂存" : "下达", '集团月度计划指标编制' + params.planStatus == 0 ? "暂存" :
          "下达"
        ]);
        params.valuelist=this.tableData

        if(params.planStatus == 0){
          sendJSON("/group/updatePlanStatus", params).then(res => {
            this.$message.success("暂存成功");
          });
        }else{
             this.$confirm(`确认下达吗？`).then(() => {
              sendJSON("/group/updatePlanStatus", params).then(res => {
                this.$message.success('下达成功');
                if (params.planStatus != 0)
                  this.$router.push({
                    name: 'groupMonthPlan'
                  });
              });
            }).catch(() => {
              this.$message("已取消")
            })
        }
      },
      validateNumber(obj, key) {
        this.timer || clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          obj[key] = number(obj[key]);
        }, 1000)
      },
      validateDecimal(obj, key) {
       if(this.timer ){
          clearTimeout(this.timer)
        }
        this.timer =setTimeout(() => {
          obj[key] = decimal(obj[key]);
        }, 3000)
      },
      tableSetChange(key){
        total(this.tableData, [key]);
        console.log(this.tableData,"total(this.tableData, [key])");

      }
    },
    data() {
      return {
        //   表格
        tableData: [],
        input: '',
        loadObj: null,
        tableHeight: window.outerHeight- 310,
        downFlag:true,
        flagInfo:"",
        // readonly:this.$route.query.status=="集团已下发",
        readonly:false,
        timer: null,
        onlyRead:this.$route.query.status=="编制完成"?false:true
      }
    }

  };
</script>
<style scoped src="@/assets/css/style.css"></style>
<style lang="scss">
  @import "@/styles/form.scss";
</style>
<style lang="less">
  // .el-table {
  //   .el-table__fixed {
  //     height:auto !important; // 此处的important表示优先于element.style
  //     bottom:17px; // 改为自动高度后，设置与父容器的底部距离，则高度会动态改变
  //   }
  // }
  .outdata{
    margin-right:10px;
    // margin:6px 10px 6px 0px;
  }
  .intodata{
    float: right;
  }

</style>
