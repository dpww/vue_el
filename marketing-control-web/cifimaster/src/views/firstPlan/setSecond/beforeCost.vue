<template>
  <div class="beforeCost">

    <div class="meeting">
       <div class="btnBox">
      <div class="addOrRemove">

      </div>
    </div>
       <p class="pTitle">
          首开前费用计划
             <el-button class="reject blankBtn" v-if="!$route.query.BOID">
        <a :href="exportTemp()" download="download">导出</a>
      </el-button>
            <el-button type="text" style="float:right;" v-if="!readOnly" @click="addItem" class="add">添加</el-button>
        <el-button type="text"  style="float:right;" v-if="!readOnly" @click="delItem" class="del">删除</el-button>

          <b class="tipsb" style="font-weight:400;font-size:12px;color:#999">(单位:万元)</b>
        </p>
      <div class="t">

      </div>

    </div>
      <p><span>首开营销费用(万):</span><span>{{cost_open_sales_price}}</span>
       <span>首开销售推广费(万):</span><span>{{cost_sales_generalize_price}}</span>
       </p>
    <el-table
      :data="costData"
      :span-method="spanMethod"
      style="width: 100%"
      :cell-style="cellStyle"
    >
      <el-table-column prop="name" label="第一级科目" align="center" width="160"></el-table-column>
      <el-table-column prop="type" label="第二级科目" align="center" width="200"></el-table-column>
      <el-table-column prop="num" label="首开前总预算" width="100" align="center">
        <template slot-scope="scope">{{getBudget(scope.$index,scope.row) | fixed}}</template>
      </el-table-column>
      <el-table-column align="center" label="分月投放计划">
        <template slot="header">
          <div class="tableHeader">
            <span>分月投放计划</span>
          </div>
        </template>
        <el-table-column
          :label="costData[0].list.length>0?item.months+'月':''"
          v-for="(item,index) in costData[0].list"
          :key="index"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              type="number"
              v-only-number="{min:0, precision:2}"
              @input="getAllSum(index)"
              @blur="setNumVal(scope.row.list[index],nameList[scope.$index],scope.row.list[index][nameList[scope.$index]])"
              v-if="!readOnly&&['allsum','sales_offices_price','pack_price','customer_price','remould_price'].findIndex(l =>l==nameList[scope.$index])==-1"
              v-model="scope.row.list[index][nameList[scope.$index]]"
            ></el-input>
            <span
              v-else-if="nameList[scope.$index]=='allsum'"
            >{{scope.row.list[index][nameList[scope.$index]] | fixed}}</span>
            <span
              v-else-if="['sales_offices_price','pack_price','customer_price','remould_price'].findIndex(l =>l==nameList[scope.$index])!=-1"
            >--</span>
            <span v-else>{{scope.row.list[index][nameList[scope.$index]] | fixed}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { insertOpenCost, queryOpenCost } from "@/api/firstPlan";
import { downLoad } from "@/api/request";
export default {
  name: "beforeCost",
  props: ["versions", "readonly"],
  filters: {
    fixed: function(data) {
      if (!data) {
        return "0.00";
      } else if (isNaN(data)) {
        return "0.00";
      } else {
        return data.toFixed(2);
      }
    }
  },
  data() {
    return {
      nameList: [
        "allsum",
        "public_price",
        "channel_price",
        "activity_price",
        "make_price",
        "datum_price",
        "sales_agency_price",
        "sales_place_price",
        "sales_offices_price",
        "pack_price",
        "property_price",
        "property_qt_price",
        "maintenance_price",
        "payroll_price",
        "work_price",
        "travel_price",
        "serve_price",
        "traffic_price",
        "customer_price",
        "remould_price",
        "government_price",
        "sales_qt"
      ],
      costData: [
        {
          name: "合计",
          type: "合计",
          list: []
        },
        {
          name: "一、销售推广费",
          type: "1-1 大众广告费",
          list: []
        },
        {
          name: "一、销售推广费",
          type: "1-2 渠道费",
          list: []
        },
        {
          name: "一、销售推广费",
          type: "1-3 活动费",
          list: []
        },
        {
          name: "一、销售推广费",
          type: "1-4 制作费",
          list: []
        },
        {
          name: "一、销售推广费",
          type: "1-5 咨询策划费",
          list: []
        },
        {
          name: "二、销售代理费",
          type: "2-1 销售代理费",
          list: []
        },
        {
          name: "二、销售代理费",
          type: "2-2 分销费",
          list: []
        },
        {
          name: "三、销售设施建造费",
          type: "3-1 售楼处样板间相关费",
          list: []
        },
        {
          name: "三、销售设施建造费",
          type: "3-2 现场包装费",
          list: []
        },
        {
          name: "四、销售现场运营费",
          type: "4-1 物业费",
          list: []
        },
        {
          name: "四、销售现场运营费",
          type: "4-2 物业其他",
          list: []
        },
        {
          name: "四、销售现场运营费",
          type: "4-3 日常维护费",
          list: []
        },
        {
          name: "五、营销日常管理费",
          type: "5-1 职工薪酬",
          list: []
        },
        {
          name: "五、营销日常管理费",
          type: "5-2 办公费",
          list: []
        },
        {
          name: "五、营销日常管理费",
          type: "5-3 差旅费",
          list: []
        },
        {
          name: "五、营销日常管理费",
          type: "5-4 招待费",
          list: []
        },
        {
          name: "五、营销日常管理费",
          type: "5-5 交通费",
          list: []
        },
        {
          name: "六、客户关系",
          type: "6-1 客户关系管理费",
          list: []
        },
        {
          name: "六、客户关系",
          type: "6-2 老社区改造费",
          list: []
        },
        {
          name: "七、其他营销费",
          type: "7-1 政府税费",
          list: []
        },
        {
          name: "七、其他营销费",
          type: "7-2 其他",
          list: []
        }
      ]
    };
  },
  computed: {
    actVersions() {
      return this.versions;
    },
    readOnly() {
      if (this.$route.query.BOID) {
        return true;
      } else if (this.$route.query.disabled) {
        return true;
      } else if (this.$route.query.readonly) {
        return this.$route.query.readonly;
      } else {
        return this.readonly;
      }
    },
    cost_sales_generalize_price(){
      return   this.$parent.$parent.$parent.$refs.coreStandard.numberTable.cost_sales_generalize_price ||0
    },
    cost_open_sales_price(){
      return   this.$parent.$parent.$parent.$refs.coreStandard.numberTable.cost_open_sales_price||0
    },


  },
  watch: {
    actVersions: {
      handler(a, b) {
        console.log(a, "....>切换版本");
        this.costData = [
          {
            name: "合计",
            type: "合计",
            list: []
          },
          {
            name: "一、销售推广费",
            type: "1-1 大众广告费",
            list: []
          },
          {
            name: "一、销售推广费",
            type: "1-2 渠道费",
            list: []
          },
          {
            name: "一、销售推广费",
            type: "1-3 活动费",
            list: []
          },
          {
            name: "一、销售推广费",
            type: "1-4 制作费",
            list: []
          },
          {
            name: "一、销售推广费",
            type: "1-5 咨询策划费",
            list: []
          },
          {
            name: "二、销售代理费",
            type: "2-1 销售代理费",
            list: []
          },
          {
            name: "二、销售代理费",
            type: "2-2 分销费",
            list: []
          },
          {
            name: "三、销售设施建造费",
            type: "3-1 售楼处样板间相关费",
            list: []
          },
          {
            name: "三、销售设施建造费",
            type: "3-2 现场包装费",
            list: []
          },
          {
            name: "四、销售现场运营费",
            type: "4-1 物业费",
            list: []
          },
          {
            name: "四、销售现场运营费",
            type: "4-2 物业其他",
            list: []
          },
          {
            name: "四、销售现场运营费",
            type: "4-3 日常维护费",
            list: []
          },
          {
            name: "五、营销日常管理费",
            type: "5-1 职工薪酬",
            list: []
          },
          {
            name: "五、营销日常管理费",
            type: "5-2 办公费",
            list: []
          },
          {
            name: "五、营销日常管理费",
            type: "5-3 差旅费",
            list: []
          },
          {
            name: "五、营销日常管理费",
            type: "5-4 招待费",
            list: []
          },
          {
            name: "五、营销日常管理费",
            type: "5-5 交通费",
            list: []
          },
          {
            name: "六、客户关系",
            type: "6-1 客户关系管理费",
            list: []
          },
          {
            name: "六、客户关系",
            type: "6-2 老社区改造费",
            list: []
          },
          {
            name: "七、其他营销费",
            type: "7-1 政府税费",
            list: []
          },
          {
            name: "七、其他营销费",
            type: "7-2 其他",
            list: []
          }
        ];
        this.reload();
      },
      deep: true
    }
  },
  methods: {
    exportTemp() {
      let { plan_node_id } = this.$route.query;
      if (this.$route.query.BOID) {
        plan_node_id = this.$route.query.BOID;
      }
      return downLoad("/TopSettingTwoExcel/CostPlanExcel", {
        plan_node_id: plan_node_id
      });
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 1) {
        return {
          background: "#F6F8FD",
          color: "#999"
        };
      }
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 0) {
          return {
            rowspan: 1,
            colspan: 2
          };
        } else if (columnIndex === 1) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex == 0) {
        if (row.col) {
          return [row.col, 1];
        } else {
          return [0, 0];
        }
      }
    },
    addItem() {
      let mouth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
      let year = this.costData[0].list[
        this.costData[0].list.length - 1
      ].months.split("-")[0];
      if (this.costData[0].list.length > 0) {
        let temp = new Date(
          this.costData[0].list[this.costData[0].list.length - 1].months
        ).getMonth();
        if (temp == 0) {
          temp = 12;
          year = Number(year) - 1;
        }
        if (temp < 10) {
          temp = "0" + temp;
        }
        mouth = year + "-" + temp;
      } else {
        this.$message.warning("请去核心指标填写开盘时间");
        return;
      }
      this.costData.forEach((item, idx) => {
        let obj = {
           months: mouth,
           activity_price: 0,
            allsum: 0,
            channel_price: 0,
            customer_price: 0,
            datum_price: 0,
            government_price: 0,
            maintenance_price: 0,
            make_price: 0,
            pack_price: 0,
            payroll_price: 0,
            property_price: 0,
            property_qt_price: 0,
            public_price: 0,
            remould_price: 0,
            sales_agency_price: 0,
            sales_offices_price: 0,
            sales_place_price: 0,
            sales_qt: 0,
            serve_price: 0,
            traffic_price: 0,
            travel_price: 0,
            work_price: 0
         };
        obj[this.nameList[idx]] = "0";
        item.list.push(obj);
      });
    },
    delItem() {
      if (this.costData.length < 1 || this.costData[0].list.length < 2) {
        this.$message.error("暂无可删除月份");
      } else {
        this.costData.forEach(item => {
          item.list.pop();
        });
      }
      console.log(this.costData);
    },
    update(isUpdate) {
      let id = this.$route.query.plan_node_id;
        id = this.versions;
      if (this.$route.query.BOID) {
        id = this.$route.query.BOID;
      }
      let arr = [];
      let tempArr = [...this.costData]||[];
         tempArr.forEach((item, index) => {
        item.list.forEach((obj, idx) => {
          if (!arr[idx]) {
            arr[idx] = {};
          }
          arr[idx][this.nameList[index]] = obj[this.nameList[index]];
          arr[idx].months = obj.months;
          arr[idx].plan_id = this.$route.query.plan_id;
          arr[idx].plan_node_id = id;
          arr[idx].project_id = this.$route.query.project_id;
        });
      });

      insertOpenCost({
        plan_id: this.$route.query.plan_id,
        plan_node_id: id,
        project_id: this.$route.query.project_id,
        costList: arr
      }).then(res => {
        if (res.code == 200) {
          if (isUpdate != "change") {
            this.$message({
              type: "success",
              message: "保存成功！"
            });
          }
        }
      });
    },
    getBudget(index, row) {
      let num = 0;
      this.costData[index].list.forEach((item, idx) => {
        num += Number(item[this.nameList[index]]);
      });
      return num;
    },
    reload() {
      let id = this.$route.query.plan_node_id;
        id = this.versions;
      if (this.$route.query.BOID) {
        id = this.$route.query.BOID;
      }
      this.$nextTick(() => {
        queryOpenCost({
          plan_id:this.$route.query.plan_id,
          plan_node_id: id }).then(res => {
              if (this.costData[0].list.length > 0) {
            this.costData = [
              {
                name: "合计",
                type: "合计",
                list: []
              },
              {
                name: "一、销售推广费",
                type: "1-1 大众广告费",
                list: []
              },
              {
                name: "一、销售推广费",
                type: "1-2 渠道费",
                list: []
              },
              {
                name: "一、销售推广费",
                type: "1-3 活动费",
                list: []
              },
              {
                name: "一、销售推广费",
                type: "1-4 制作费",
                list: []
              },
              {
                name: "一、销售推广费",
                type: "1-5 咨询策划费",
                list: []
              },
              {
                name: "二、销售代理费",
                type: "2-1 销售代理费",
                list: []
              },
              {
                name: "二、销售代理费",
                type: "2-2 分销费",
                list: []
              },
              {
                name: "三、销售设施建造费",
                type: "3-1 售楼处样板间相关费",
                list: []
              },
              {
                name: "三、销售设施建造费",
                type: "3-2 现场包装费",
                list: []
              },
              {
                name: "四、销售现场运营费",
                type: "4-1 物业费",
                list: []
              },
              {
                name: "四、销售现场运营费",
                type: "4-2 物业其他",
                list: []
              },
              {
                name: "四、销售现场运营费",
                type: "4-3 日常维护费",
                list: []
              },
              {
                name: "五、营销日常管理费",
                type: "5-1 职工薪酬",
                list: []
              },
              {
                name: "五、营销日常管理费",
                type: "5-2 办公费",
                list: []
              },
              {
                name: "五、营销日常管理费",
                type: "5-3 差旅费",
                list: []
              },
              {
                name: "五、营销日常管理费",
                type: "5-4 招待费",
                list: []
              },
              {
                name: "五、营销日常管理费",
                type: "5-5 交通费",
                list: []
              },
              {
                name: "六、客户关系",
                type: "6-1 客户关系管理费",
                list: []
              },
              {
                name: "六、客户关系",
                type: "6-2 老社区改造费",
                list: []
              },
              {
                name: "七、其他营销费",
                type: "7-1 政府税费",
                list: []
              },
              {
                name: "七、其他营销费",
                type: "7-2 其他",
                list: []
              }
            ];
          }
          let tempArr = res.result||[];
          this.costData.forEach((item, index) => {
            tempArr.forEach((obj, idx) => {
              item.list.push(obj);
            });
          });
          for (let i = 0; i < this.costData.length; i++) {
            this.costData[i].col = 1;
            if (i > 0) {
              if (this.costData[i - 1].name == this.costData[i].name) {
                let j = this.costData.find(
                  item => item.name == this.costData[i].name
                );
                j.col += 1;
                this.costData[i].col = 0;
              }
            }
          }


        });
      });
    },
    getAllSum(index) {
      let sum = 0;
      this.costData.forEach((item, idx) => {
        if (idx != 0) {
          sum = sum + Number(item.list[index][this.nameList[idx]]);
        }
        item.list[index]["allsum"] = sum.toFixed(2);
      });
        this.$set(this.costData[0].list[index],"allsum",sum.toFixed(2))

    },
    setNumVal(obj,name,val){
      if(val===""){
        this.$set(obj,name,0)
      }
    }
  },
};
</script>

<style lang="less" scoped>
@tiTleFontSize: #666666; //拿地后表格Title字体颜色
@ContainerFontSize: #333333; //拿地后内容字体颜色
@import url("../../../assets/css/GlobalBtn.less");

.beforeCost {
  background: #fff;
  padding: 10px;
  .btnBox {
    // display: inline-block;
    overflow: hidden;
    // float: right;
  }
  p {
    position: relative;
    text-align: left;
    // float: left;
    font-weight: 700;
  }
  .tipsb {
    float: right;
    padding: 5px;
    // position: absolute;
    // right: 0;

    // height: 20px;
    // line-height: 20px;
    // bottom: 0;

  }
  .el-table{
    margin-top: 20px;
  }
  .tableHeader {
    position: relative;
    width: 100%;
  }
  .addOrRemove {
    float: right;
    // display: inline;
    ::v-deep .el-button {
      margin-top: 10px;
    }
  }
  .pTitle {
    padding: 10px 0 ;
  }
  .meeting {
    height: 40px;
    width: 100%;
    .t {
      float: left;
    }
    .reject {
      float: right;
       .primaryBtn(#333,500,12px)
    }
  }
  ::v-deep .el-table th, .el-table tr{
    background:rgba(246,248,253,1);
  }
  ::v-deep .tableHeader{
    color: #666;
  }
  ::v-deep .el-table thead{
    color: #666;

  }
  ::v-deep .el-table__row{
    >td:first-child{
      color: #333!important;
    }
  }
}
</style>
