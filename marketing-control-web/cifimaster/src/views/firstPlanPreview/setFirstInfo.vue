<template>
  <div class="setFirstInfo" ref="setFirstInfo">
    <el-collapse v-model="openList" @change="openChange">
      <el-collapse-item title="基础信息" name="1">
        <template slot="title">
          <h3 class="titleText">基础信息</h3>
        </template>
        <ul class="baseInfo">
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">项目名称 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{peopleMap.projectName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人部门 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{peopleMap.postName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{peopleMap.zddate}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{peopleMap.employeeName}}</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="审批信息" name="2">
        <template slot="title">
          <h3 class="titleText">审批信息</h3>
        </template>
        <div class="setFirstInfoinput">
          <div class="containter">
            <!-- <el-tabs v-model="activeName" @tab-click="tabClick">
              <el-tab-pane label="货值结构" name="structure"></el-tab-pane>
              <el-tab-pane label="户型配比及户型定位" name="house"></el-tab-pane>
              <el-tab-pane label="时间节点" name="time"></el-tab-pane>
              <el-tab-pane label="销售目标" name="target"></el-tab-pane>
              <el-tab-pane label="附件清单" name="accessory"></el-tab-pane>
            </el-tabs>-->
            <div class="meeting">
              产品系 :
              <el-select v-model="prodSeries" :disabled="true" placeholder>
                <el-option
                  v-for="item in prodSeriesList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>过会次数 :
              <el-input :readonly="true" type="number" v-model="meetingNum"></el-input>次
            </div>
            <div class="structure" id="structure">
              <p>货值结构</p>
              <div class="table">
                <div class="left_t">
                  <div class="t_header">
                    <div>业态类型</div>
                    <div>产品类型</div>
                  </div>
                  <div class="t_body">
                    <div class="t_cell" v-for="(item,idx) in prodList" :key="idx">
                      <div
                        :style="{'line-height':(item.child.length)*40+'px','width':item.operation_type=='合计'?'100%':'120px'}"
                      >
                        <span :title="item.operation_type">{{item.operation_type}}</span>
                      </div>
                      <div v-if="item.operation_type!=='合计'">
                        <div v-for=" (obj,index) in item.child" :key="index">
                          <span :title="obj.product_type">{{obj.product_type}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right_t">
                  <div class="scrollBox">
                    <div>
                      <div>
                        <div class="t_header">拿地后(投资系统)</div>
                        <div class="t_body">
                          <div>
                            <div class="t_cell t_title" style="width:110px;">建筑面积(元/m²)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span>{{obj.obj.land_back_area | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:110px;">整盘均价(元/m²)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.land_back_avg_price | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:110px;">货值(万元)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span>{{obj.obj.land_back_value | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:110px;">开盘价格(元/m²)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.land_back_open_price | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:140px;">精装成本标准(元/m²)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.land_back_cost_standard | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:130px;">目标月均流量(㎡)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.land_back_avg_flow | fixed}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="t_header t_title">顶设1</div>
                        <div class="t_body">
                          <div>
                            <div class="t_cell" style="width:110px;">建筑面积(元/m²)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span
                                  v-if="obj.product_type!=='小计'&&item.operation_type!=='合计'&&plan_approval!=4"
                                >{{obj.obj.designone_area | fixed}}</span>
                                <span v-else>{{obj.obj.designone_area | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:110px;">整盘均价(元/m²)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.designone_avg_price | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:110px;">货值(万元)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span
                                  v-if="obj.product_type!=='小计'&&item.operation_type!=='合计'&&plan_approval!=4"
                                  v-text="obj.obj.designonel_front_value"
                                ></span>
                                <span v-else>{{obj.obj.designonel_front_value | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:110px;">开盘价格(元/m²)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.designone_front_open_price | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:140px;">精装成本标准(元/m²)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.designonel_front_cost_standard | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:130px;">目标月均流量(㎡)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.designone_front_avg_flow | fixed}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="t_header">顶设1VS投资拿地后版</div>
                        <div class="t_body">
                          <div>
                            <div class="t_cell t_title" style="width:140px;">整盘均价偏差(元/㎡)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.vs_all_avg_price | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:140px;">货值偏差(万元)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span>{{obj.obj.vs_value_price | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:140px;">开盘价格偏离(元/m²)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.vs_open_price | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="width:140px;">精装偏差(元/m²)</div>
                            <div v-for="(item,idx) in prodList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.vs_hardcover_price | fixed}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="house" id="house">
              <p>户型配比及户型定位</p>
              <div class="table">
                <div class="left_t">
                  <div class="t_header">
                    <div>业态类型</div>
                    <div>产品类型</div>
                  </div>
                  <div class="t_body">
                    <div class="t_cell" v-for="(item,idx) in houseList" :key="idx">
                      <div
                        :style="{'line-height':(item.child.length)*40+'px','width':item.operation_type=='合计'?'100%':'120px'}"
                      >
                        <span :title="item.operation_type">{{item.operation_type}}</span>
                      </div>
                      <div v-if="item.operation_type!=='合计'">
                        <div v-for=" (obj,index) in item.child" :key="index">
                          <span :title="obj.product_type">{{obj.product_type}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right_t">
                  <div class="scrollBox">
                    <div>
                      <div>
                        <div class="t_header">拿地后(投资系统)</div>
                        <div class="t_body">
                          <div>
                            <div class="t_cell t_title">户型面积(m²)</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span
                                  v-else
                                >{{isNaN(obj.obj.land_back_room_area)?0:obj.obj.land_back_room_area | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title">户数(个)</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span>{{isNaN(obj.obj.land_back_room_num)?0:obj.obj.land_back_room_num}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title">户数配比(%)</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span
                                  v-else
                                >{{isNaN(obj.obj.land_back_room_per)?0:obj.obj.land_back_room_per + '%'}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="t_header">顶设1</div>
                        <div class="t_body">
                          <div>
                            <div class="t_cell t_title">户型面积(m²)</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span
                                  v-else
                                >{{isNaN(obj.obj.designone_room_area)?0:obj.obj.designone_room_area | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title">户数(个)</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span
                                  v-if="obj.product_type!=='小计'&&item.operation_type!=='合计'&&plan_approval!=4"
                                  v-text="obj.obj.designone_room_num"
                                ></span>
                                <span
                                  v-else
                                >{{isNaN(obj.obj.designone_room_num)?0:obj.obj.designone_room_num}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title">户数配比(%)</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span
                                  v-else
                                >{{isNaN(obj.obj.designone_room_per)?0:obj.obj.designone_room_per + '%'}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title" style="min-width:150px">户型功能</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span
                                  v-if="obj.product_type=='小计'||item.operation_type=='合计'"
                                >{{isNaN(Number(obj.obj.designone_room_fun))?"":obj.obj.designone_room_fun}}</span>
                                <span v-else>{{obj.obj.designone_room_fun}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div style="min-width:150px" class="t_cell t_title">南面宽数(个)</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <!--
                          <el-select
                            v-if="obj.product_type!=='小计'&&item.operation_type!=='合计'&&plan_approval!=4"
                            v-text="obj.obj.designone_south_num"
                            placeholder="请选择"
                          >
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                            <el-option label="3" value="3"></el-option>
                            <el-option label="4" value="4"></el-option>
                            <el-option label="5" value="5"></el-option>
                            <el-option label="5以上" value="5以上"></el-option>
                                </el-select>-->
                                <span
                                  v-if="obj.product_type=='小计'||item.operation_type=='合计'"
                                >{{isNaN(Number(obj.obj.designone_south_num))?"":obj.obj.designone_south_num}}</span>
                                <span v-else>{{obj.obj.designone_south_num}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title">梯户数</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span v-else>{{obj.obj.vs_designone_door_num}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="t_header">顶设1版VS拿地后版</div>
                        <div class="t_body">
                          <div>
                            <div class="t_cell t_title">户型面积(m²)</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span
                                  v-else
                                >{{isNaN(obj.obj.vs_designone_room_area)?0:obj.obj.vs_designone_room_area | fixed}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title">户数(个)</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span>{{isNaN(obj.obj.vs_designone_room_num)?0:obj.obj.vs_designone_room_num}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="t_cell t_title">户数配比(%)</div>
                            <div v-for="(item,idx) in houseList" :key="idx">
                              <div class="t_cell" v-for="(obj,index) in item.child" :key="index">
                                <span v-if="obj.product_type=='小计'||item.operation_type=='合计'">--</span>
                                <span
                                  v-else
                                >{{isNaN(obj.obj.vs_designone_room_per)?0:obj.obj.vs_designone_room_per + '%'}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="time" id="time">
              <p>时间节点</p>
              <el-table
                :data="timeData"
                style="width: 100%"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              >
                <el-table-column prop="name" label="名称" align="left"></el-table-column>
                <el-table-column prop="time" label="时间" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.time}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="target" id="target">
              <p>销售目标<span style="font-weight:400">(单位：万元)</span></p>
              <el-table
                :data="targetData"
                style="width: 100%"
                :summary-method="mysummary"
                show-summary
                border
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              >
                <el-table-column prop="sales_time" label="时间" align="center"></el-table-column>
                <el-table-column prop="land_front_price" label="拿地前(营销内控版)" align="center">
                  <template slot-scope="scope">
                    <span v-if="plan_approval!=4">{{scope.row.land_front_price | fixed}}</span>
                    <span v-else>{{scope.row.land_front_price | fixed}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="will_price" label="上会版(投资系统)" align="center">
                  <template slot-scope="scope">
                    <span v-if="plan_approval!=4">{{scope.row.will_price | fixed}}</span>
                    <span v-else>{{scope.row.will_price | fixed}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="land_back_price" label="拿地后(投资系统)" align="center">
                  <template slot-scope="scope">
                    <span v-if="plan_approval!=4">{{scope.row.land_back_price | fixed}}</span>
                    <span v-else>{{scope.row.land_back_price | fixed}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="accessory" id="accessory">
              <p>附件清单</p>
              <el-table
                :data="accessoryData"
                style="width: 100%"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              >
                <el-table-column prop="type" label="附件名称" align="left" width="250"></el-table-column>
                <el-table-column prop="name" label="附件" align="left">
                  <template slot-scope="scope">
                    <a v-if="!isMobile" :href="local+scope.row.url">{{scope.row.name}}</a>
                    <span v-else @click="YZ_link(scope.row)">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align: center;">
      <el-button v-if="this.$route.query.isKSAP" type @click="takeLandSuccess()">快速审批</el-button>
    </div>
    <Buttons />
  </div>
</template>

<script>
let width = document.body.offsetWidth;
import {
  insertTopOne,
  selectNodeVersion,
  queryTakeLands,
  queryValueStructure,
  queryPlanNodeId,
  queryApartment,
  queryTimeNode,
  queryTopOne,
  takeLandSuccess
} from "@/api/firstPlan";
import $ from "jquery";

export default {
  components: {
    Buttons: () => import("../../views/offerFlow/component/index")
  },
  filters: {
    fixed(data) {
      if (!data) {
        return "0.00";
      }
      return Number(data).toFixed(2);
    }
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.setFirstInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.setFirstInfo.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  updated() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.setFirstInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.setFirstInfo.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  data() {
    let isMobile = width <= 1024;
    return {
      isMobile: width <= 1024,
      isType: "",
      addform: {},
      isShowKS: localStorage.getItem("employeeName") == "管理员",
      plan_approval: "",
      isNew: "",
      isNewType: 0,
      fileList: [],
      fileList__: [],
      addform__: {},
      openList: ["1", "2"],
      testList: [],
      testList__: [],
      fileHeight: 1,
      otherIndex: 4,
      peopleMap: {},
      prodSeriesList: [
        { label: "L", value: "L" },
        { label: "H", value: "H" },
        { label: "G", value: "G" },
        { label: "T", value: "T" }
      ],
      prodSeries: "",
      meetingNum: "",
      form: {
        versions: ""
      },
      project_id: this.$route.query.project_id,
      activeName: "structure",
      structureData: [],
      houseData: [
        {
          operation_type: "住宅类",
          product_type: "高层（19-34层）",
          room_area: "",
          room_num: "",
          room_per: ""
        },
        {
          operation_type: "住宅类",
          product_type: "小高层（9-11层）",
          room_area: "",
          room_num: "",
          room_per: ""
        },
        {
          operation_type: "住宅类",
          product_type: "小计",
          room_area: "",
          room_num: "",
          room_per: ""
        },
        {
          operation_type: "商业类",
          product_type: "车位",
          room_area: "",
          room_num: "",
          room_per: ""
        },
        {
          operation_type: "商业类",
          product_type: "小计",
          room_area: "",
          room_num: "",
          room_per: ""
        }
      ],
      timeData: [
        {
          name: "摘牌"
        },
        {
          name: "顶设1"
        },
        {
          name: "顶设2"
        },
        {
          name: "售楼处开放"
        },
        {
          name: "样板段开放"
        },
        {
          name: "样板房开放"
        },
        {
          name: "开盘"
        }
      ],
      targetData: [
        {
          sales_time: "首开",
          land_front_price: "",
          will_price: "",
          land_back_price: ""
        }
      ],
      accessoryData: [
        {
          type: "《顶设1报告》",
          handle: "上传"
        },
        {
          type: "《定位成果表》",
          handle: "上传"
        },
        {
          type: "《投资交底表》",
          handle: "上传"
        },
        {
          type: "《顶设1会议纪要》",
          handle: "上传"
        },
        {
          type: "",
          handle: "其他上传"
        }
      ],
      versionList: []
    };
  },

  computed: {
    action() {
      let href = process.env.VUE_APP_BASE_API;
      return href + "/Upload/uploadFile_2";
    },
    local() {
      let host;
      if (location.origin.includes("test")) {
        host = "https://salesmgt-test.cifi.com.cn";
      } else if (location.origin.includes("uat")) {
        host = "https://salesmgt-uat.cifi.com.cn";
      } else {
        host = "https://salesmgt.cifi.com.cn";
      }
      return host;
    },
    prodList() {
      let myList = [...this.testList];
      let allSum = {};
      myList.forEach((lv1, index) => {
        let littleSum = {};
        lv1.child.forEach(lv2 => {
          console.log(lv2.product_type);
          if (lv2.product_type == "小计") {
            lv1.child.pop();
            return;
          }
          for (let key in lv2.obj) {
            if (!littleSum[key]) {
              littleSum[key] = Number(lv2.obj[key]);
            } else {
              littleSum[key] += Number(lv2.obj[key]);
            }
            if (!allSum[key]) {
              allSum[key] = Number(lv2.obj[key]);
            } else {
              allSum[key] += Number(lv2.obj[key]);
            }
          }
        });
        for (let key in littleSum) {
          littleSum[key] = littleSum[key].toFixed(2);
        }
        lv1.child.push({
          product_type: "小计",
          obj: littleSum
        });
      });
      for (let key in allSum) {
        allSum[key] = allSum[key].toFixed(2);
      }
      myList.push({
        operation_type: "合计",
        child: [
          {
            obj: allSum
          }
        ]
      });
      return myList;
    },
    houseList() {
      let myList = [...this.testList__];
      let allSum = {};
      myList.forEach((lv1, index) => {
        let littleSum = {};
        lv1.child.forEach((lv2, index) => {
          if (lv2.product_type == "小计") {
            lv1.child.splice(index, 1);
            return;
          }
          for (let key in lv2.obj) {
            if (!littleSum[key]) {
              littleSum[key] = Number(lv2.obj[key]);
            } else {
              littleSum[key] += Number(lv2.obj[key]);
            }
            if (!allSum[key]) {
              allSum[key] = Number(lv2.obj[key]);
            } else {
              allSum[key] += Number(lv2.obj[key]);
            }
          }
        });
        lv1.child.push({
          product_type: "小计",
          obj: littleSum
        });
      });
      myList.push({
        operation_type: "合计",
        child: [
          {
            obj: allSum
          }
        ]
      });
      return myList;
    },
    rateSum() {
      return this.prodList[this.prodList.length - 1].child[0].obj;
    }
  },
  created() {
    //监控进入只查看
    if (this.$route.query.type != null && this.$route.query.type == "view") {
      this.isType = this.$route.query.type;
    }
    selectNodeVersion({
      plan_id: this.$route.query.plan_id,
      node_level: this.$route.query.node_level
    }).then(res => {
      this.versionList = res.data;
      if (res.data.length >= 1) {
        this.form.versions = res.data[0].plan_node_id;
        this.plan_approval = res.data[0].plan_approval;
        if (res.data[0].plan_approval === 2) {
          this.isNewType = 1;
        }
      }
      this.selectTakeLand();
    });
  },

  methods: {
    openChange(val) {
      console.log(val);
    },
    takeLandSuccess() {
      takeLandSuccess({
        businesskey: this.$route.query.BOID,
        orgName: "fp_designone",
        eventType: "4"
      }).then(res => {
        window.close();
      });
    },
    tabClick(tab, event) {
      document.getElementById(tab.name).scrollIntoView();
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
        return {
          background: "#F5F7FA",
          color: "#999"
        };
      }
    },
    mergeCol({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
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
    cell__Style({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 1) {
        return {
          background: "#F5F7FA",
          color: "#999"
        };
      }
    },
    mergeSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex == 0) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if ((rowIndex > 0 && rowIndex < 4) || rowIndex > 4) {
          return {
            rowspan: 0,
            colspan: 0
          };
        } else if (rowIndex == 4) {
          return {
            rowspan: 2,
            colspan: 1
          };
        }
      }
    },
    FomartDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var H = date.getHours();
      var M = date.getMinutes();
      var S = date.getSeconds();
      function Covering(num) {
        return num >= 10 ? num : "0" + num;
      }
      return y + "-" + Covering(m) + "-" + Covering(d);
    },
    mysummary({ columns, data }) {
      let sum = ["整盘合计", 0, 0, 0];
      data.forEach((item, index) => {
        if (index == "0") {
          sum["0"] = "整盘合计";
        } else {
          sum["1"] += isNaN(Number(item.land_front_price))
            ? 0
            : Number(item.land_front_price);
          sum["2"] += isNaN(Number(item.will_price))
            ? 0
            : Number(item.will_price);
          sum["3"] += isNaN(Number(item.land_back_price))
            ? 0
            : Number(item.land_back_price);
        }
      });
      sum = sum.map((item, index) => {
        if (index) {
          item = item.toFixed(2);
        }
        return item;
      });
      return sum;
    },
    YZ_link(file) {
      console.log(this.isMobile);
      if (this.isMobile) {
        var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(item) {
          return window.location.href.indexOf(item) !== -1;
        });
        let wm = {
          htmlTitle: "顶设一",
          wmContent: this.userID || "旭辉集团",
          wmSize: 10,
          wmFont: "microsoft yahei",
          wmColor: 7,
          isDelSrc: 1
        };
        // let resquestUrl=isTest?`${location.origin}/dcs.web/onlinefile`:`${location.origin}/dcs.web/onlinefile`
        let resquestUrl = `https://oadoc.cifi.com.cn/dcs.web/onlinefile`;
        let requrl = file.url.split("?n=")[0];
        let end = requrl.split(".")[requrl.split(".").length - 1];
        let convertType;
        if (end == "pdf") {
          convertType = "20";
        } else if (end == "tif") {
          convertType = "17";
        } else {
          convertType = "0";
        }
        // var tempwindow=window.open('about:blank');
        $.ajax({
          url: resquestUrl,
          data: {
            ...wm,
            downloadUrl: location.origin + requrl,
            convertType
          },
          dataType: "json",
          async: false,
          type: "post",
          success: function(data) {
            if (data.result == 0) {
              if (parent) {
                parent.window.location.href = data.data[0];
              } else {
                window.location.href = data.data[0];
              }
            } else {
              this.$message.error("转换失败");
            }
          },
          error: function(data) {
            alert("报错:" + JSON.stringify(data));
            open(file.url);
          }
        });
      } else {
        let requrl = file.url.split("?")[0];
        open(file.url);
      }
    },
    hidePopover() {
      this.showPopover = false;
    },
    delHouse(type) {
      let idx;
      this.houseList.forEach(item => {
        if (item.child.findIndex(item => item.product_type == type) !== -1) {
          idx = item.child.findIndex(item => item.product_type == type);
          item.child.splice(idx, 1);
        }
      });
    },
    sumSpan() {
      this.testList.forEach(lv1 => {
        lv1.child.forEach(lv2 => {
          if (lv2.obj.designone_avg_price) {
            lv2.obj.vs_all_avg_price =
              Number(lv2.obj.designone_avg_price) -
              Number(lv2.obj.land_back_avg_price);
          } else {
            lv2.obj.vs_all_avg_price = Number(lv2.obj.land_back_avg_price);
          }
          if (lv2.obj.designonel_front_value) {
            lv2.obj.vs_value_price =
              Number(lv2.obj.designonel_front_value) -
              Number(lv2.obj.land_back_value);
          } else {
            lv2.obj.vs_value_price = Number(lv2.obj.land_back_value);
          }
          if (lv2.obj.designone_front_open_price) {
            lv2.obj.vs_open_price =
              Number(lv2.obj.designone_front_open_price) -
              Number(lv2.obj.land_back_open_price);
          } else {
            lv2.obj.vs_open_price = Number(lv2.obj.land_back_open_price);
          }
          if (lv2.obj.designonel_front_cost_standard) {
            lv2.obj.vs_hardcover_price =
              Number(lv2.obj.designonel_front_cost_standard) -
              Number(lv2.obj.land_back_cost_standard);
          } else {
            lv2.obj.vs_hardcover_price = Number(
              lv2.obj.land_back_cost_standard
            );
          }
        });
      });
    },
    selectTakeLand() {
      let id = this.form.versions;
      if (this.$route.query.BOID) {
        id = this.$route.query.BOID;
      }
      queryTopOne({
        project_id: this.$route.query.project_id,
        plan_id: this.$route.query.plan_id,
        node_level: this.$route.query.node_level,
        plan_node_id: id,
        isNew: this.isNew
      }).then(res => {
        let arr = res.result.tollerMap;
        arr.forEach(lv1 => {
          lv1.child.forEach(lv2 => {
            lv2.obj = { ...lv2 };
          });
        });
        this.testList = arr;
        console.log(this.testList);

        let arr1 = res.result.roomlist || [];
        arr1.forEach(lv1 => {
          lv1.child.forEach(lv2 => {
            lv2.obj = { ...lv2 };
          });
        });
        this.testList__ = arr1;
        if (res.result.timeNode.length >= 1) {
          let timeobj = res.result.timeNode[0];
          let timeList = {
            delisting_time: "摘牌",
            designone_time: "顶设1",
            designtwo_time: "顶设2",
            sales_time: "售楼处开放",
            sample_open_time: "样板段开放",
            model_open_time: "样板房开放",
            open_time: "开盘"
          };
          let arr2 = [];
          for (let key in timeList) {
            if (timeobj[key]) {
              arr2.push({
                time: this.FomartDate(new Date(timeobj[key])) || "",
                name: timeList[key]
              });
            } else {
              arr2.push({
                time: "",
                name: timeList[key]
              });
            }
          }
          this.timeData = arr2;
        }
        let arr3 = res.result.sales;
        if (arr3.length > 0) {
          let tempArr = arr3.find(item => item.sales_time == "首开");
          arr3 = arr3.filter(item => item.sales_time != "首开");
          arr3.sort((a, b) => {
            a.sales_time = +new Date(a.sales_time).getFullYear();

            if (a.sales_time < b.sales_time) {
              return -1;
            } else if (a.sales_time > b.sales_time) {
              return 1;
            } else {
              return 0;
            }
          });

          arr3.unshift(tempArr);

          this.targetData = [];
          this.targetData = arr3;
        } else {
          arr3 = {
            sales_time: "首开",
            land_front_price: "",
            will_price: "",
            land_back_price: ""
          };
          this.targetData = [];
          this.targetData.push(arr3);
        }
        let arr5 = res.result.fileList;
        this.accessoryData = [
          {
            type: "《顶设1报告》",
            handle: "上传"
          },
          {
            type: "《定位成果表》",
            handle: "上传"
          },
          {
            type: "《投资交底表》",
            handle: "上传"
          },
          {
            type: "《顶设1会议纪要》",
            handle: "上传"
          },
          {
            type: "",
            handle: "其他上传"
          }
        ];
        if (arr5.length > 0) {
          let temp = this.accessoryData.pop();
          arr5.forEach((item, index) => {
            if (item.orderIndex >= 4) {
              this.accessoryData.push({
                type: "其他上传",
                handle: "上传",
                id: item.id,
                name: item.name,
                url: item.url,
                orderIndex: item.orderIndex
              });
            } else {
              this.accessoryData[item.orderIndex].id = item.id;
              this.accessoryData[item.orderIndex].name = item.name;
              this.accessoryData[item.orderIndex].url = item.url;
              this.accessoryData[item.orderIndex].orderIndex = item.orderIndex;
            }
          });
          this.accessoryData.push(temp);
        }
        this.meetingNum =
          res.result.browse_num == "null" ? "" : res.result.browse_num;
        this.prodSeries =
          res.result.product_set == "null" ? "" : res.result.product_set;
        let arr6 = res.result.numberList;
        if (arr6.length > 0) {
          console.log(arr6[0].numTopOne);
          if (arr6[0].numTopOne >= 1) {
            this.isNewType = 1;
          }
        }
        let arr7 = {
          projectName: "",
          postName: "",
          zddate: "",
          employeeName: ""
        };
        if (res.result.peopleMap) {
          arr7.projectName = res.result.peopleMap.projectName;
          arr7.postName = res.result.peopleMap.postName;
          arr7.zddate = res.result.peopleMap.zddate;
          arr7.employeeName = res.result.peopleMap.employeeName;
        }
        this.peopleMap = arr7;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.setFirstInfo {
  .titleText {
    border-left: 3px solid #2661ff;
    height: 20px;
    line-height: 20px;
    text-indent: 1em;
    font-size: 16px;
    margin-left: 5px;
  }
  .lightFather {
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    .light {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      // background-color: red;
      float: left;
      margin-top: 2px;
    }
    span {
      padding-left: 10px;
    }
  }
  .green {
    background-color: green;
  }
  .red {
    background-color: red;
  }
  .baseInfo {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.33%;
      padding-left: 10px;
    }
  }
  ::v-deep .form_item_title {
    border: none !important;
  }
  ::v-deep .form-container .form_item {
    padding: 0px;
    margin-top: 0px;
  }
  @media (max-width: 1024px) {
    .baseInfo {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 100%;
        padding-left: 10px;
      }
    }
    ::v-deep .el-form-item__label {
      width: 120px !important;
    }
    ::v-deep .el-form-item__content {
      margin-left: 120px !important;
    }

    ::v-deep .inputForm .el-col-8 {
      width: 100% !important;
    }
  }
}

.setFirstInfoinput {
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::v-deep .el-upload-list {
    display: none;
  }

  .navbarLink {
    background: #fff;
    margin-top: 5px;
  }

  ::v-deep input[type="number"] {
    -moz-appearance: "textfield";
  }
  div {
    box-sizing: border-box;
  }
  .top {
    background: #fff;
    color: #333;
    font-size: 14px;
    height: 50px;
    ::v-deep .el-form {
      width: 40%;
    }
    ::v-deep .el-button {
      height: 30px;
      float: right;
      margin-left: 10px;
      margin-top: 10px;
    }
    ::v-deep .el-button:first-child {
      margin-right: 15px;
    }
  }
  ::v-deep .el-tabs__nav-wrap::after {
    display: none;
  }
  ::v-deep .el-tabs__active-bar {
    display: none;
  }
  .containter {
    margin: 10px;
    .meeting {
      height: 40px;
      padding: 0 10px;

      ::v-deep .el-input {
        width: 100px;
      }
    }
    ::v-deep .el-tabs {
      padding: 0 10px;
      background: #fff;
    }
    .structure {
      padding: 0 10px;
      background: #fff;
      margin-bottom: 10px;
      overflow-x: auto;
      p {
        font-weight: 700;
        height: 40px;
        line-height: 40px;
        position: relative;
        ::v-deep .el-button {
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
        }
      }
      .table {
        display: flex;
        min-width: 860px;
        .left_t {
          width: 460px;
          margin-bottom: 16px;
          .t_header {
            height: 80px;
            line-height: 80px;
            text-align: center;
            display: flex;
            border: 1px solid #ebeef5;
            background: #f5f7fa;
            color: #909399;
            > div:first-child {
              width: 120px;
            }
            > div:nth-child(2) {
              flex: 1;
              border-left: 1px solid #ebeef5;
            }
          }
          .t_body {
            .t_cell {
              display: flex;
              background: #f5f7fa;
              color: #909399;
              border-left: 1px solid #ebeef5;
              border-right: 1px solid #ebeef5;
              border-bottom: 1px solid #ebeef5;

              > div:first-child {
                width: 120px;
                text-align: center;
                border-right: 1px solid #ebeef5;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              > div:nth-child(2) {
                flex: 1;
                > div {
                  height: 40px;
                  width: 248px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  line-height: 40px;
                  text-align: center;
                  border-bottom: 1px solid #ebeef5;
                }
                > div:last-child {
                  border-bottom: none;
                }
              }
            }
            .t_cell:last-child {
              border-bottom: none;
            }
          }
          .t_bottom {
            background: #f5f7fa;
            border: 1px solid #ebeef5;
            color: #909399;
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
        }
        .right_t {
          flex: 1;
          overflow: hidden;

          .scrollBox {
            overflow: auto;
            height: 100%;
            > div {
              display: flex;
              width: 1800px;
              > div {
                // width: 600px;
                background: #f5f7fa;
                color: #909399;
                text-align: center;
                .t_header {
                  height: 40px;
                  line-height: 40px;
                  color: #909399;
                  border: 1px solid #ebeef5;
                }
                .t_body {
                  display: flex;

                  > div {
                    border-right: 1px solid #ebeef5;

                    flex: 1;
                    height: 40px;
                    line-height: 40px;
                    .t_cell {
                      height: 40px;
                      line-height: 40px;
                      border-right: 1px solid #ebeef5;
                      border-bottom: 1px solid #ebeef5;

                      font-size: 14px;
                      color: #909399;
                      ::v-deep .el-input__inner {
                        margin: 0 15px;
                        width: 70%;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .house {
      padding: 0 10px;
      background: #fff;
      margin-bottom: 10px;
      overflow-x: auto;
      p {
        font-weight: 700;

        height: 40px;
        line-height: 40px;
        position: relative;
        ::v-deep .el-button {
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
        }
      }
      .table {
        display: flex;
        min-width: 860px;
        .left_t {
          width: 460px;
          margin-bottom: 16px;
          .t_header {
            height: 80px;
            line-height: 80px;
            text-align: center;
            display: flex;
            border: 1px solid #ebeef5;
            background: #f5f7fa;
            color: #909399;
            > div:first-child {
              width: 120px;
            }
            > div:nth-child(2) {
              flex: 1;
              border-left: 1px solid #ebeef5;
            }
          }
          .t_body {
            .t_cell {
              display: flex;
              background: #f5f7fa;
              color: #909399;
              border-left: 1px solid #ebeef5;
              border-right: 1px solid #ebeef5;
              border-bottom: 1px solid #ebeef5;

              > div:first-child {
                width: 120px;
                text-align: center;
                border-right: 1px solid #ebeef5;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              > div:nth-child(2) {
                flex: 1;
                > div {
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  width: 248px;
                  border-bottom: 1px solid #ebeef5;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                > div:last-child {
                  border-bottom: none;
                }
              }
            }
            .t_cell:last-child {
              border-bottom: none;
            }
          }
          .t_bottom {
            background: #f5f7fa;
            border: 1px solid #ebeef5;
            color: #909399;
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
        }
        .right_t {
          flex: 1;
          overflow: hidden;
          .scrollBox {
            overflow: auto;
            height: 100%;
            // width: 100%;
            > div {
              display: flex;
              width: 1500px;
              // width: 100%;
              > div {
                width: 500px;
                color: #909399;
                text-align: center;
                .t_header {
                  height: 40px;
                  line-height: 40px;
                  color: #909399;
                  background: #f5f7fa;
                  border: 1px solid #ebeef5;
                }
                .t_title {
                  background: #f5f7fa !important;
                }
                .t_body {
                  display: flex;

                  > div {
                    border-right: 1px solid #ebeef5;

                    flex: 1;
                    height: 40px;
                    line-height: 40px;
                    .t_cell {
                      height: 40px;
                      line-height: 40px;
                      border-right: 1px solid #ebeef5;
                      border-bottom: 1px solid #ebeef5;

                      font-size: 14px;
                      color: #909399;
                      ::v-deep .el-input__inner {
                        margin: 0 15px;
                        width: 70%;
                      }
                    }
                  }
                }
              }
              > div:nth-child(2) {
                width: 800px;
              }
            }
          }
        }
      }
    }
    .time {
      padding: 0 10px;
      background: #fff;
      margin-bottom: 10px;
      p {
        font-weight: 700;

        height: 40px;
        line-height: 40px;
      }
      ::v-deep .el-input__inner {
        width: 150px;
      }
      ::v-deep .el-input {
        width: 150px;
      }
    }
    .target {
      padding: 0 10px;
      background: #fff;
      margin-bottom: 10px;
      p {
        font-weight: 700;

        height: 40px;
        line-height: 40px;
      }
      ::v-deep .el-input__inner {
        width: 100px;
      }
    }
    .cost {
      padding: 0 10px;
      background: #fff;
      margin-bottom: 10px;
      p {
        font-weight: 700;

        height: 30px;
        line-height: 30px;
      }
      ::v-deep .el-input__inner {
        width: 100px;
      }
    }
    .accessory {
      padding: 0 10px;
      background: #fff;
      margin-bottom: 10px;
      p {
        font-weight: 700;

        height: 30px;
        line-height: 30px;
      }
      .cell {
        overflow: visible;
      }
      .fileBox {
        position: relative;
        ::v-deep .el-upload-list {
          position: absolute;
          top: 0;
          left: -100%;
          z-index: 10;
        }
      }
    }
  }
  .bottom {
    text-align: center;
    height: 60px;
    line-height: 60px;
    background: #fff;
    margin: 0 15px;
    ::v-deep .el-button {
      height: 30px;
    }
  }
  .targetTime {
    width: 200px;
  }
}
</style>
