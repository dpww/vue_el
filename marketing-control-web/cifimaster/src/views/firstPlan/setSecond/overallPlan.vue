<template>
  <div class="overallPlan">
    <el-collapse v-model="activePanel" @change="panelChange">
      <el-collapse-item title="大定价全盘量产规划" name="1" disabled>
        <template slot="title">
          <div class="meeting">
            <div class="t">
              <span style="margin-left:10px;">大定价全盘量价规划</span>
            </div>
            <el-button class="reject blankBtn" v-if="!$route.query.BOID">
              <a :href="exportTemp()" download="download">导出</a>
            </el-button>
            <p class="tipRemark">备注：左右滑动查看年度拆分</p>
          </div>
        </template>
        <div class="over_x">
          <div class="prodTable">
            <div class="prod_left">
              <div class="t_header">
                <div>业态类型</div>
                <div>产品类型</div>
              </div>
              <div class="t_body" v-for="(lv1, idx) in prodTable" :key="idx">
                <div
                style="line-height:80px"
                >{{ lv1.operation_type }}</div>
                <div>
                  <div v-for="(item, index) in lv1.product" :key="index">{{ item.product_type }}</div>
                  <div>小计</div>
                </div>
              </div>
              <div class="t_footer">合计</div>
            </div>
            <div class="prod_right">
              <div class="scrollBox">
                <div class="allProd">
                  <div>
                    <div class="t_header">整盘(投资)</div>
                    <div class="t_body">
                      <div class="t_body_l">
                        <div class="t_title t_cell">均价 (元/m²)</div>
                        <div v-for="(lv1, idx) in prodTable" :key="idx">
                          <div
                            class="t_cell"
                            v-for="(item, index) in lv1.product"
                            :key="index"
                          >{{ item.all_invest_avg_price | fixed }}</div>
                          <!-- <div class="t_cell">{{allProdSum.sum[idx].all_invest_avg_price}}</div> -->
                          <div class="t_cell">--</div>
                        </div>

                        <!-- <div class="t_cell">{{allProdSum.all.all_invest_avg_price}}</div> -->
                        <div class="t_cell">--</div>
                      </div>
                      <div class="t_body_r">
                        <div class="t_title t_cell">货值 (万元)</div>
                        <div v-for="(lv1, idx) in prodTable" :key="idx">
                          <div
                            class="t_cell"
                            v-for="(item, index) in lv1.product"
                            :key="index"
                          >{{ item.all_invest_value_price | fixed }}</div>
                          <div class="t_cell">{{allProdSum.sum[idx].all_invest_value_price | fixed}}</div>
                        </div>
                        <div class="t_cell">{{ allProdSum.all.all_invest_value_price | fixed }}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_header">整盘(战规)</div>
                    <div class="t_body">
                      <div class="t_body_l">
                        <div class="t_title t_cell">均价 (元/m²)</div>
                        <div v-for="(lv1, idx) in prodTable" :key="idx">
                          <div class="t_cell" v-for="(item, index) in lv1.product" :key="index">
                            <el-input
                              type="number"
                              v-only-number="{ min: 0, precision: 2 }"
                              v-model="item.all_rules_avg_price"
                              v-if="!readonlyflag"
                            >
                              <!--
                                 @input.native="item.all_rules_avg_price=parseInt(item.all_rules_avg_price)"
                              -->
                            </el-input>
                            <span v-else>{{item.all_rules_avg_price | fixed }}</span>
                          </div>
                          <!-- <div class="t_cell">{{allProdSum.sum[idx].all_rules_avg_price}}</div> -->
                          <div class="t_cell">--</div>
                        </div>
                        <!-- <div class="t_cell">{{allProdSum.all.all_rules_avg_price}}</div> -->
                        <div class="t_cell">--</div>
                      </div>
                      <div class="t_body_r">
                        <div class="t_title t_cell">货值 (万元)</div>
                        <div v-for="(lv1, idx) in prodTable" :key="idx">
                          <div class="t_cell" v-for="(item, index) in lv1.product" :key="index">
                            <el-input
                              type="number"
                              v-only-number="{ min: 0, precision: 2 }"
                              v-model="item.all_rules_value_price"
                              v-if="!readonlyflag"
                              @input="all_rules_value_price_change(idx, index)"
                            ></el-input>
                            <span v-else>{{item.all_rules_value_price | fixed}}</span>
                          </div>
                          <div class="t_cell">{{allProdSum.sum[idx].all_rules_value_price | fixed}}</div>
                        </div>
                        <div class="t_cell">{{ allProdSum.all.all_rules_value_price | fixed }}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_header">整盘(大定价)</div>
                    <div class="t_body">
                      <div class="t_body_l">
                        <div class="t_title t_cell">均价 (元/m²)</div>
                        <div v-for="(lv1, idx) in prodTable" :key="idx">
                          <div class="t_cell" v-for="(item, index) in lv1.product" :key="index">
                            <!-- <el-input
                              type="number"
                              v-only-number="{min:0,precision:2}"
                              v-model="item.all_big_avg_price"
                              v-if="!readonlyflag"
                            >

                              @input.native="item.all_big_avg_price=parseInt(item.all_big_avg_price)"
                            </el-input>
                            -->
                            <span>{{ item.all_big_avg_price | fixed }}</span>
                          </div>
                          <!-- <div class="t_cell">{{allProdSum.sum[idx].all_big_avg_price}}</div> -->
                          <div class="t_cell">--</div>
                        </div>
                        <!-- <div class="t_cell">{{allProdSum.all.all_big_avg_price}}</div> -->
                        <div class="t_cell">--</div>
                      </div>
                      <div class="t_body_r">
                        <div class="t_title t_cell">货值 (万元)</div>
                        <div v-for="(lv1, idx) in prodTable" :key="idx">
                          <div class="t_cell" v-for="(item, index) in lv1.product" :key="index">
                            <!-- <el-input
                              type="number"
                              v-only-number="{min:0, precision:2}"
                              @input="changeBigsum(idx,index,item.all_big_value_price)"
                              v-model="item.all_big_value_price"
                              v-if="!readonlyflag"
                            ></el-input>-->
                            <span>{{ item.all_big_value_price | fixed }}</span>
                          </div>
                          <div class="t_cell">{{allProdSum.sum[idx].all_big_value_price | fixed}}</div>
                        </div>
                        <div class="t_cell">{{ allProdSum.all.all_big_value_price | fixed }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="yearProd" v-if="prodTable.length > 0">
                  <div v-for="(item, index) in prodTable[0].product[0].child" :key="index">
                    <div class="t_header">
                      {{ item.product_year }}
                      <el-button
                        class="blank"
                        v-if="
                          index == prodTable[0].product[0].child.length - 1 &&
                            !readonlyflag
                        "
                        @click="delProd"
                        type="text"
                      >删除</el-button>
                      <el-button
                        class="blank"
                        v-if="
                          index == prodTable[0].product[0].child.length - 1 &&
                          !readonlyflag
                        "
                        @click="addProd"
                        type="text"
                      >添加</el-button>
                    </div>
                    <div class="t_body">
                      <div class="t_body_l">
                        <div class="t_title t_cell">供(万元)</div>
                        <div v-for="(lv1, i) in prodTable" :key="i">
                          <div class="t_cell" v-for="(obj, idx) in lv1.product" :key="idx">
                            <el-input
                              type="number"
                              v-only-number="{ min: 0, precision: 2 }"
                              @input="setYearNum(index, obj.child[index])"
                              v-model="obj.child[index].oneyear_supply"
                              v-if="!readonlyflag"
                            ></el-input>
                            <span v-else>{{obj.child[index].oneyear_supply | fixed}}</span>
                          </div>
                          <div
                            class="t_cell"
                          >{{ allYearSum.sum[i][item.product_year].oneyear_supply | fixed}}</div>
                        </div>
                        <div
                          class="t_cell"
                        >{{allYearSum.all[item.product_year].oneyear_supply | fixed}}</div>
                      </div>
                      <div class="t_body_r">
                        <div class="t_title t_cell">销(万元)</div>
                        <div v-for="(lv1, i) in prodTable" :key="i">
                          <div class="t_cell" v-for="(obj, idx) in lv1.product" :key="idx">
                            <el-input
                              type="number"
                              v-only-number="{ min: 0, precision: 2 }"
                              @input="setYearNum(index, obj.child[index])"
                              v-model="obj.child[index].oneyear_sell"
                              v-if="!readonlyflag"
                            ></el-input>
                            <span v-else>{{ obj.child[index].oneyear_sell | fixed }}</span>
                          </div>
                          <div
                            class="t_cell"
                          >{{allYearSum.sum[i][item.product_year].oneyear_sell | fixed}}</div>
                        </div>
                        <div
                          class="t_cell"
                        >{{allYearSum.all[item.product_year].oneyear_sell | fixed}}</div>
                      </div>
                      <div class="t_body_r">
                        <div class="t_title t_cell">去化率</div>
                        <div v-for="(lv1, i) in prodTable" :key="i">
                          <div class="t_cell" v-for="(obj, idx) in lv1.product" :key="idx">
                            <span>{{obj.child[index].oneyear_selling_per }}</span>
                          </div>
                          <div class="t_cell">--</div>
                        </div>
                        <div class="t_cell">--</div>
                      </div>
                      <div class="t_body_r">
                        <div class="t_title t_cell">均价(元/m²)</div>
                        <div v-for="(lv1, i) in prodTable" :key="i">
                          <div class="t_cell" v-for="(obj, idx) in lv1.product" :key="idx">
                            <el-input
                              type="number"
                              v-only-number="{ min: 0, precision: 2 }"
                              v-model="obj.child[index].oneyear_avg_price"
                              v-if="!readonlyflag"
                            >
                              <!--
                                @input.native="obj.child[index].oneyear_avg_price=parseInt(obj.child[index].oneyear_avg_price)"

                              -->
                            </el-input>
                            <span v-else>{{ obj.child[index].oneyear_avg_price | fixed }}</span>
                          </div>
                          <div class="t_cell">--</div>
                        </div>
                        <div class="t_cell">--</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>

      <p style="padding:20px 5px;font-weight: 700;color:#333;">
        大定价版本对标
        <span class="tipsP" style="color:#999;font-size:12px;float:right">单位(万元)</span>
      </p>
      <!-- <el-collapse-item title="大定价版本对标" name="2" disabled> -->
      <el-table
        class="style_background"
        :data="versionsTable"
        :span-method="mergeCol"
        :header-cell-style="{
          background: '#F6F8FD',
          borderColor: '#EFEFEF',
          color: '#666',
        }"
        :cell-style="cellStyle"
        show-summary
        :summary-method="getSummaries"
        style="width: 100%"
        border
      >
        <el-table-column align="center" prop="operation_type" label="业态类型" width="120"></el-table-column>
        <el-table-column align="center" prop="product_type" label="产品类型" width="150"></el-table-column>
        <el-table-column prop="big_total_value" label="大定价版总货值">
          <template slot-scope="scope">
            <!-- <el-input
                v-model="scope.row.big_total_value"
                type="number"
                v-only-number="{min:0, precision:2}"
                readonly
                v-if="!readonlyflag"
              ></el-input>
            <span v-else>{{scope.row.big_total_value}}</span>-->
            <span>{{ scope.row.big_total_value | fixed }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="invest_total_value" label="投资版总货值">
          <!-- prop="invest_total_value" -->
          <template slot-scope="scope">{{scope.row.invest_total_value | fixed }}</template>
        </el-table-column>
        <el-table-column label="vs投资版差异" prop="vs_invest">
          <template
            slot-scope="scope"
          >{{ scope.row.vs_invest = scope.row.big_total_value- scope.row.invest_total_value | fixed}}</template>
        </el-table-column>
        <el-table-column align="center" prop="invest_cause" label="原因说明" width="200">
          <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.invest_cause" v-if="!readonlyflag"></el-input>
            <span v-else>{{ scope.row.invest_cause }}</span>
          </template>
        </el-table-column>
        <el-table-column label="战规总货值" prop="rules_total">
          <template slot-scope="scope">{{scope.row.rules_total | fixed }}</template>
        </el-table-column>
        <el-table-column prop="vs_rules" label="VS战规版差异">
          <template
            slot-scope="scope"
          >{{(scope.row.vs_rules =(scope.row.big_total_value - scope.row.rules_total)) | fixed}}</template>
        </el-table-column>
        <el-table-column align="center" prop="rules_cause" label="原因说明" width="200">
          <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.rules_cause" v-if="!readonlyflag"></el-input>
            <span v-else>{{ scope.row.rules_cause }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-collapse-item> -->
    </el-collapse>
  </div>
</template>

<script>
import { selectAllPlan } from "@/api/firstPlan";
import { downLoad } from "@/api/request";
export default {
  name: "overallPlan",
  props: ["versions", "readonly", "beforeAct"],
  data() {
    return {
      activePanel: ["1", "2"],
      prodTable: [],
      plan_id: this.$route.query.plan_id,
      plan_node_id: this.$route.query.plan_node_id,
      // readonly:this.$route.query.readonly,
      versionsTable: [],
      inds: [],
      yearList: []
    };
  },
  filters: {
    fixed(data) {
      if (!data) {
        return "0.00";
      }
      return data.toFixed(2);
    }
  },
  computed: {
    activeTab() {
      return this.beforeAct;
    },
    actVersions() {
      return this.versions;
    },
    readonlyflag() {
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
    allProdSum() {
      let arr = [];
      let obj = {
        all_big_avg_price: 0,
        all_big_value_price: 0,
        all_invest_avg_price: 0,
        all_invest_value_price: 0,
        all_rules_avg_price: 0,
        all_rules_value_price: 0
      };
      this.prodTable.forEach((lv1, ind) => {
        arr.push({});
        lv1.product.forEach(item => {
          for (let key in obj) {
            // if (!item[key]) {
            //   this.$set(item, key, 0);
            // }
            if (!arr[ind][key]) {
              arr[ind][key] = 0;
            }
            arr[ind][key] += Number(item[key] || 0);
          }
        });
      });
      arr.map(i => {
        for (let key in obj) {
          if (i[key]) {
            obj[key] += i[key];
          }
        }
      });
      return { sum: arr, all: obj };
    },
    allYearSum() {
      let arr = [];
      let allObj = {};
      let searchobj = {
        oneyear_supply: 0,
        oneyear_sell: 0,
        oneyear_selling_per: 0,
        oneyear_avg_price: 0
      };
      if (this.prodTable.length > 0) {
        this.prodTable.forEach((lv0, ind) => {
          arr.push({});
          lv0.product.forEach(lv1 => {
            if (lv1.child) {
              lv1.child.forEach(lv2 => {
                if (!arr[ind][lv2.product_year]) {
                  arr[ind][lv2.product_year] = {};
                }
                for (let key in searchobj) {
                  if (!arr[ind][lv2.product_year][key]) {
                    arr[ind][lv2.product_year][key] = 0;
                  }
                  // if (!lv2[key]) {
                  //   lv2[key] = 0;
                  // }
                  arr[ind][lv2.product_year][key] += Number(lv2[key] || 0);
                }
              });
            }
          });
        });
      }
      arr.map(i => {
        for (let key in i) {
          if (!allObj[key]) {
            allObj[key] = {};
          }
          for (let k in searchobj) {
            if (!allObj[key][k]) {
              allObj[key][k] = 0;
            }
            if (i[key][k]) {
              allObj[key][k] += i[key][k];
            }
          }
        }
      });
      return { sum: arr, all: allObj };
    }
  },
  watch: {
    actVersions: {
      handler(a, b) {
        this.reload();
      },
      deep: true
    }
    //   activeTab: {
    //   handler(a, b) {
    //     if (a == "changeProduct") {
    //       this.reload();
    //     }
    //   },
    //   deep: true
    // },
  },
  methods: {
    exportTemp() {
      let { plan_id, plan_node_id } = this.$route.query;
      if (this.$route.query.BOID) {
        plan_node_id = this.$route.query.BOID;
      }
      return downLoad("/TopSettingTwoExcel/VolumePricePlanningExcel", {
        plan_id: plan_id,
        plan_node_id: plan_node_id
      });
    },
    cellStyle(params) {
      // console.log(params);
      if (
        params.column.property == "operation_type" ||
        params.column.property == "product_type"
      ) {
        return { background: "#F6F8FD", borderColor: "#EFEFEF", color: "#666" };
      } else {
        return {
          background: "#fff",
          borderColor: "#EFEFEF",
          color: "#333"
        };
      }
    },
    panelChange(val) {},
    reload() {
      let obj = {
        plan_id: this.plan_id,
        plan_node_id: this.plan_node_id || this.$route.query.BOID
      };
      obj.plan_node_id = this.versions;
      if (this.$route.query.BOID) {
        obj.plan_node_id = this.$route.query.BOID;
      }
      selectAllPlan(obj).then(res => {
        if (res.code == 0) {
          let filed = [];
          let l = 0;
          let sum = 0;
          let big_total_value = [0];
          let invest_total_value = [0];
          let vs_invest = [0];
          let rules_total = [0];
          let vs_rules = [0];
          let d = res.result.big;
          d.map((item, index) => {
            // item.col=1
            let ind = index || 1;
            if (item.operation_type_code !== d[ind - 1].operation_type_code) {
              rules_total.push(0);
              invest_total_value.push(0);
              big_total_value.push(0);
              vs_invest.push(0);
              vs_rules.push(0);
              // let sum = filed.length ? filed[filed.length - 1] : 0;
              filed.push(index - sum);
              sum += index - sum;
              l++;
              // if(index==d.length-1&&index==sum){
              //   filed.push(1)
              // }
            }
            rules_total[l] += item.rules_total || 0;
            invest_total_value[l] += item.invest_total_value || 0;
            big_total_value[l] += item.big_total_value || 0;
            vs_invest[l] += item.vs_invest || 0;
            vs_rules[l] += item.vs_rules || 0;
          });

          // 保留两位小数
          rules_total[l] = rules_total[l].toFixed(2);
          invest_total_value[l] = invest_total_value[l].toFixed(2);
          big_total_value[l] = big_total_value[l].toFixed(2);
          vs_invest[l] = vs_invest[l].toFixed(2);
          vs_rules[l] = vs_rules[l].toFixed(2);

          let ind = 0;
          let fLen = filed.length - 1;
          let inds = [];
          if (!filed.length && d.length) {
            // filed.push(d.length);
            d.push({
              invest_total_value: invest_total_value[0],
              operation_type: d[0].operation_type,
              operation_type_code: d[0].operation_type_code,
              product_type: "小计",
              product_type_code: "sum",
              rules_total: rules_total[0],
              vs_invest: vs_invest[0],
              plan_node_id: "",
              vs_rules: vs_rules[0],
              big_total_value: big_total_value[0],
              id: "",
              plan_id: ""
            });
            d[0].col = d.length;
          }

          filed.map((item, i) => {
            // 每次增加不同业态加小计
            d.splice(item + ind, 0, {
              invest_total_value: invest_total_value[i],
              operation_type: d[item - 1].operation_type,
              operation_type_code: d[item - 1].operation_type_code,
              product_type: "小计",
              product_type_code: "sum",
              rules_total: rules_total[i],
              vs_invest: vs_invest[i],
              plan_node_id: "",
              vs_rules: vs_rules[i],
              big_total_value: big_total_value[i],
              id: "",
              plan_id: ""
            });
            //加index
            d[ind].col = item + 1;
            ind += item + 1;
            inds.push(ind);
            if (i == fLen) {
              let dLen = d.length - 1;
              d.push({
                invest_total_value: invest_total_value[i + 1],
                operation_type: d[dLen].operation_type,
                operation_type_code: d[dLen].operation_type_code,
                product_type: "小计",
                product_type_code: "sum",
                rules_total: rules_total[i + 1],
                vs_invest: vs_invest[i + 1],
                plan_node_id: "",
                vs_rules: vs_rules[i + 1],
                big_total_value: big_total_value[i + 1],
                id: "",
                plan_id: "",
                col: 0
              });
              d[ind].col = dLen + 2 - ind;
              inds.push(d.length);
            }
          });
          this.inds = inds;
          this.versionsTable = res.result.big;
          this.prodTable = res.result.plan;
          this.prodTable.sort((a, b) => {
            if (a.operation_type_code > b.operation_type_code) {
              return 1;
            } else if (a.operation_type_code < b.operation_type_code) {
              return -1;
            } else {
              return 0;
            }
          });
          // this.prodTable.forEach((lv1, index) => {
          //   let temp = {
          //     all_invest_avg_price: 0,
          //     all_invest_value_price: 0,
          //     product_type: "小计",
          //     child: []
          //   };
          //   lv1.product.forEach((lv2, idx) => {
          //     temp.all_invest_avg_price += lv2.all_invest_avg_price;
          //     temp.all_invest_value_price += lv2.all_invest_value_price;
          //   });
          // });
        }
      });
    },
    mergeCol({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.col) {
          return {
            rowspan: row.col,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    getSummaries(param) {
      const { columns, data } = param;

      let sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        let values = data.map(item => Number(item[column.property]));
        this.inds.map((item, i) => {
          values.splice(item - 1 - i, 1);
        });
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      });
      sums = sums.map((item, index) => {
        if (index) {
          item = item.toFixed(2);
        }
        return item;
      });
      return sums;
    },
    addProd() {
      let year;
      if (this.prodTable[0] && this.prodTable[0].product[0].child.length == 0) {
        year = new Date().getFullYear();
      } else {
        year =
          Number(
            this.prodTable[0].product[0].child[
              this.prodTable[0].product[0].child.length - 1
            ].product_year
          ) + 1;
      }
      if (
        this.prodTable[0] &&
        this.prodTable[0].product[0].child.length > 0 &&
        year - Number(this.prodTable[0].product[0].child[0].product_year) > 15
      ) {
        this.$message.error("添加年份不能超过当前年份十五年");
        return;
      }
      this.prodTable.forEach(lv1 => {
        lv1.product.forEach(item => {
          item.child.push({
            product_year: year,
            oneyear_supply: "0",
            oneyear_sell: "0",
            oneyear_selling_per: "0",
            oneyear_avg_price: "0"
          });
        });
      });
    },
    delProd() {
      if (
        (this.prodTable[0] && this.prodTable[0].product[0].child.length == 1) ||
        this.prodTable.legth == 0
      ) {
        this.$message.error("暂无可删除年份");
        return;
      }
      this.prodTable.forEach(lv1 => {
        lv1.product.forEach(item => {
          item.child.pop();
        });
      });
    },
    all_rules_value_price_change(idx, index) {
      let fakeId = this.prodTable[idx].product[index].fakeId;
      let all_rules_value_price = this.prodTable[idx].product[index]
        .all_rules_value_price;
      let l = 0;
      let rules_total = [0];
      this.versionsTable.map((item, i) => {
        if (item.fakeId == fakeId) {
          item.rules_total = all_rules_value_price;
        }
        if (item.product_type == "小计") {
          this.versionsTable[i].rules_total = rules_total[l];
          rules_total.push(0);
          l++;
        } else {
          rules_total[l] += Number(item.rules_total) || 0;
        }
      });
    },
    changeBigsum(idx, index, num) {
      let sum = this.allProdSum.sum[idx].all_big_value_price;
      let iGap = 0;
      if (idx > 0) {
        for (let n = 0; n < idx; n++) {
          iGap += this.prodTable[n].product.length;
        }
        iGap += idx;
      }
      let i = iGap + this.prodTable[idx].product.length;
      this.$set(this.versionsTable[index + iGap], "big_total_value", num);
      this.$set(this.versionsTable[i], "big_total_value", sum);
      let vs_invest_num = Number(num);
      let vs_invest_sum = Number(sum);
      if (this.versionsTable[index + iGap].invest_total_value) {
        vs_invest_num =
          Number(num) -
          Number(this.versionsTable[index + iGap].invest_total_value);
        vs_invest_sum =
          Number(sum) - Number(this.versionsTable[i].invest_total_value);
      }
      this.$set(
        this.versionsTable[index + iGap],
        "vs_invest",
        vs_invest_num.toFixed(2)
      );
      this.$set(this.versionsTable[i], "vs_invest", vs_invest_sum.toFixed(2));

      let vs_rules_num = Number(num);
      let vs_rules_sum = Number(sum);
      if (this.versionsTable[index + iGap].rules_total) {
        vs_rules_num =
          Number(num) - Number(this.versionsTable[index + iGap].rules_total);
        vs_rules_sum = Number(sum) - Number(this.versionsTable[i].rules_total);
      }
      this.$set(
        this.versionsTable[index + iGap],
        "vs_rules",
        vs_rules_num.toFixed(2)
      );
      this.$set(this.versionsTable[i], "vs_rules", vs_rules_sum.toFixed(2));
    },
    setYearNum(index, item) {
      if (item.oneyear_supply == 0) {
        this.$set(item, "oneyear_selling_per", 0);
        return;
      }
      if (item.oneyear_sell && item.oneyear_supply) {
        let oneyear_selling_per =
          (Number(item.oneyear_sell) * 100) / Number(item.oneyear_supply);
        this.$set(item, "oneyear_selling_per", oneyear_selling_per.toFixed(0));
      }
    }
  },
  created() {
    // this.reload();
  }
};
</script>

<style lang="less" scoped>
@tiTleFontSize: #666666; //拿地后表格Title字体颜色
@ContainerFontSize: #333333; //拿地后内容字体颜色
@import url("../../../assets/css/GlobalBtn.less");
.overallPlan {
  background: #fff;
  .tipsP {
    text-align: right;
    color: red;
    margin-top: 13px;
  }
  .prodTable {
    min-width: 860px;

    display: flex;
    .prod_left {
      width: 400px;
      margin-bottom: 16px;
      .t_header {
        color: #666;
        height: 80px;
        font-size: 14px;
        display: flex;
        background: #f6f8fd;
        border: 1px solid #efefef;
        > div:first-child {
          width: 120px;
          // background: red;
          height: 80px;
          text-align: center;
          line-height: 80px;
          border-right: 1px solid #efefef;
        }
        > div:nth-child(2) {
          height: 80px;
          flex: 1;
          // background: blue;
          text-align: center;
          line-height: 80px;
        }
      }
      .t_body {
        font-size: 14px;

        background: #f6f8fd;
        border-left: 1px solid #efefef;
        border-right: 1px solid #efefef;

        display: flex;
        color: #333;

        > div:first-child {
          width: 120px;
          text-align: center;
          border-top: 1px solid #efefef;
          border-right: 1px solid #efefef;
          color: #333;
        }
        &:first-child > div:first-child {
          border-top: none;
        }
        > div:nth-child(2) {
          flex: 1;
          > div {
            text-align: center;
            border-bottom: 1px solid #efefef;

            height: 40px;
            line-height: 40px;
          }
        }
      }
      .t_footer {
        background: #f6f8fd;
        border: 1px solid #efefef;

        text-align: center;
        height: 40px;
        line-height: 40px;
      }
    }
    .prod_right {
      flex: 1;
      // background: skyblue;
      overflow: hidden;
      .scrollBox {
        overflow: auto;
        height: 100%;
        display: flex;
        .allProd {
          width: 630px;
          display: flex;
          > div {
            // flex: 1;
            width: 210px;

            text-align: left;
            .t_header {
              padding: 0 5px;
              height: 40px;
              line-height: 40px;
              background: #f6f8fd;
              border: 1px solid #efefef;
              color: #666;
            }
            .t_body {
              display: flex;
              .t_body_l {
                flex: 1;
              }
              .t_body_r {
                flex: 1;
              }
              .t_title {
                background: #f6f8fd;
                color: #666;
              }
              .t_cell {
                height: 40px;
                line-height: 40px;
                color: #333;

                border-right: 1px solid #efefef;
                border-bottom: 1px solid #efefef;
              }
            }
          }
        }
        .yearProd {
          flex: 1;
          display: flex;
          > div {
            // flex: 1;
            // width: 210px;
            text-align: left;
            .t_header {
              padding: 0 5px;
              background: #f6f8fd;
              border: 1px solid #efefef;
              height: 40px;
              position: relative;
              color: #666;
              line-height: 40px;
              ::v-deep .el-button:first-child {
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
              }
              ::v-deep .el-button:last-child {
                position: absolute;
                top: 50%;
                right: 80px;
                transform: translateY(-50%);
              }
            }
            .t_body {
              display: flex;
              .t_body_l {
                flex: 1;
              }
              .t_body_r {
                flex: 1;
              }
              .t_title {
                width: 100px;
                background: #f6f8fd;
              }
              .t_cell {
                width: 100px;
                height: 40px;
                line-height: 40px;
                color: #333;
                border-right: 1px solid #efefef;
                border-bottom: 1px solid #efefef;
              }
            }
          }
          .blankBtn {
            .primaryBtn(#fff, 500, 12px);
          }
        }
      }
    }
  }
  .tipRemark {
    color: red;
    position: absolute;
    bottom: -8px;
    right: 0;
  }
  ::v-deep .el-table__footer-wrapper tbody td {
    background: #fff;
    border-color: #efefef;
    color: #333;
  }
  ::v-deep .el-table__footer-wrapper tbody td:nth-child(1),
  ::v-deep .el-table__footer-wrapper tbody td:nth-child(2) {
    background: #f6f8fd;
    border-color: #efefef;
    color: #666;
  }
  ::v-deep .t_cell {
    text-align: left;
    padding: 0 5px;
  }
  .meeting {
    height: 40px;
    line-height: 20px;
    width: 100%;
    position: relative;
    .t {
      float: left;
      color: #333;
      font-weight: 700;
    }
    .reject {
      float: right;
      margin: -2px 12px 0 0;
      .primaryBtn(#333, 500, 12px);
    }
  }
  ::v-deep .el-table .cell,
  .el-table--border td:first-child .cell,
  .el-table--border th:first-child .cell {
    padding: 0 5px;
  }
  ::v-deep .el-table {
    td.is-center {
      > div {
        text-align: center !important;
      }
    }
  }
  ::v-deep .el-table__footer-wrapper .el-table__footer{
    height: 40px;
  }
  ::v-deep .el-table__header-wrapper .el-table__header{
    height: 40px;
  }
  // ::v-deep .el-table__header tr .el-table_1_column_2{
  //   text-indent: 20px;

  //   text-align: center !important;
  // }
  // ::v-deep .el-table__header tr .el-table_1_column_1{
  //   text-indent: 10px;
  // }
}
</style>
