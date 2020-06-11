<template>
  <div class="getLand">
    <navbarLink></navbarLink>
    <div class="headerFixed">
      <div class="top" v-if="isType != 'view'">
        <el-form ref="form" :model="form">
          <el-form-item label="选择版本:">
            <el-select v-model="form.versions" @input="changeVersions">
              <el-option
                :label="item.version"
                v-for="(item, index) in versionList"
                :key="index"
                :value="item.plan_node_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="right-btn">
          <el-button
            v-if="isNewType != 1"
            v-show="!this.$route.query.disabled"
            type="primary"
            @click="addVersion"
          >创建版本</el-button>
          <el-button class="btns" @click="exportGetLand">导出</el-button>
          <el-button class="btns" @click="toPreview" v-if="!readonlyFlag">查看审批</el-button>
          <el-button class="btns blankBtn" @click="$router.push({ path: '/planWrite' })">返回列表</el-button>
        </div>
      </div>
      <div class="tabsFlxed" :class="{ isViewFixed: $route.query.type == 'view' }">
        <el-tabs v-model="activeName" @tab-click="tabClick" class="topTabs">
          <el-tab-pane label="货值结构" name="structure"></el-tab-pane>
          <el-tab-pane label="户型配比及户型定位" name="house"></el-tab-pane>
          <el-tab-pane label="时间节点" name="time"></el-tab-pane>
          <el-tab-pane label="销售目标" name="target"></el-tab-pane>
          <el-tab-pane label="费用" name="cost"></el-tab-pane>
          <el-tab-pane label="附件清单" name="accessory"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- <div class="null" v-if=""></div> -->
    <div class="null" style="height:100px" v-if="isType == 'view'"></div>
    <div style="height:100px" v-else></div>
    <div class="containter" id="containter">
      <!-- <div class="tabsFlxed">
        <el-tabs v-model="activeName" @tab-click="tabClick" class="topTabs">
          <el-tab-pane label="货值结构" name="structure"></el-tab-pane>
          <el-tab-pane label="户型配比及户型定位" name="house"></el-tab-pane>
          <el-tab-pane label="时间节点" name="time"></el-tab-pane>
          <el-tab-pane label="销售目标" name="target"></el-tab-pane>
          <el-tab-pane label="费用" name="cost"></el-tab-pane>
          <el-tab-pane label="附件清单" name="accessory"></el-tab-pane>
        </el-tabs>
      </div>-->
      <div class="meeting" v-if="readonlyFlag">
        产品系 :
        <el-select v-model="prodSeries" placeholder="请选择">
          <el-option
            v-for="item in prodSeriesList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="meeting" v-else>
        产品系 :
        <el-select v-model="prodSeries" :disabled="true" placeholder="请选择">
          <el-option
            v-for="item in prodSeriesList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- <div class="tabsFlxed">
      <el-tabs v-model="activeName" @tab-click="tabClick" class="topTabs">
        <el-tab-pane label="货值结构" name="structure"></el-tab-pane>
        <el-tab-pane class="containterItems"  label="户型配比及户型定位" name="house"></el-tab-pane>
        <el-tab-pane class="containterItems"  label="时间节点" name="time"></el-tab-pane>
        <el-tab-pane class="containterItems"  label="销售目标" name="target"></el-tab-pane>
        <el-tab-pane class="containterItems"  label="费用" name="cost"></el-tab-pane>
        <el-tab-pane class="containterItems"  label="附件清单" name="accessory"></el-tab-pane>
      </el-tabs>
      </div>-->
      <div class="structure" id="structure">
        <p>
          货值结构
          <el-button type="text" @click="addDialog = true" v-if="readonlyFlag">添加</el-button>
        </p>
        <div class="table">
          <div class="left_t">
            <!-- style="background:rgba(246,248,253,1);" -->
            <div class="t_header">
              <div>业态类型</div>
              <div>产品类型</div>
            </div>
            <div class="t_body">
              <div
                class="t_cell"
                style="background:rgba(246, 248, 253, 1)"
                v-for="(item, idx) in prodList"
                :key="idx"
              >
                <div
                  class="amendStyle"
                  :style="{
                    'line-height': item.child.length * 40 + 'px',
                    width: item.operation_type == '合计' ? '100%' : '120px'
                  }"
                >
                  <span :title="item.operation_type">
                    {{
                    item.operation_type
                    }}
                  </span>
                </div>
                <div v-if="item.operation_type !== '合计'">
                  <div class="amendStyles" v-for="(obj, index) in item.child" :key="index">
                    <i
                      v-if="obj.product_type !== '小计' && readonlyFlag"
                      @click="delProdItem(obj, index)"
                      style="color:red;cursor:pointer"
                      class="el-icon-close"
                    ></i>
                    <span :title="obj.product_type">
                      {{
                      obj.product_type
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right_t">
            <div class="scrollBox">
              <div>
                <div>
                  <div class="t_header">拿地前（营销内控版）</div>
                  <div class="t_body">
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:110px;">建筑面积(m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <el-input
                            v-if="
                              obj.product_type !== '小计' &&
                                item.operation_type !== '合计' &&
                                readonlyFlag
                            "
                            v-model="obj.obj.land_front_area"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            @input="setsumAgian"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.land_front_area | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:140px;">整盘均价(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.land_front_avg_price"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            @input="setsumAgian"
                          >
                            <!--
                            ,precision:2
                            @input.native="obj.obj.land_front_avg_price=parseInt(obj.obj.land_front_avg_price)"-->
                          </el-input>
                          <span v-else>
                            {{
                            obj.obj.land_front_avg_price | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:110px;">货值(万元)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span>{{ obj.obj.land_front_value | fixed }}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:140px;">开盘价格(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.land_front_open_price"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                          >
                            <!--   @input.native="obj.obj.land_front_open_price=parseInt(obj.obj.land_front_open_price)" -->
                          </el-input>
                          <span v-else>
                            {{
                            obj.obj.land_front_open_price | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:160px;">精装成本标准(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.land_front_cost_standard"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.land_front_cost_standard | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:150px;">
                        <span>目标月均流量(㎡)</span>
                      </div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.land_front_avg_flow"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.land_front_avg_flow | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="t_header">上会版（投资系统）</div>
                  <div class="t_body">
                    <div>
                      <div
                        class="t_cell amendStyle"
                        style="width:110px; border-left:1px solid #ebeef5"
                      >建筑面积(m²)</div>
                      <div
                        style="border-left:1px solid #ebeef5"
                        v-for="(item, idx) in prodList"
                        :key="idx"
                      >
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <el-input
                            v-if="
                              obj.product_type !== '小计' &&
                                item.operation_type !== '合计' &&
                                readonlyFlag
                            "
                            v-model="obj.obj.will_area"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            @input="setsumAgian"
                          ></el-input>
                          <span v-else>{{ obj.obj.will_area | fixed }}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:140px;">整盘均价(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.will_avg_price"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            @input="setsumAgian"
                          >
                            <!--  @input.native="obj.obj.will_avg_price=parseInt(obj.obj.will_avg_price)" -->
                          </el-input>
                          <span v-else>
                            {{
                            obj.obj.will_avg_price | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:110px;">货值(万元)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span>{{ obj.obj.will_front_value | fixed }}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:140px;">开盘价格(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.will_front_open_price"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                          >
                            <!--
                            @input.native="obj.obj.will_front_open_price=parseInt(obj.obj.will_front_open_price)"

                            -->
                          </el-input>
                          <span v-else>
                            {{
                            obj.obj.will_front_open_price | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:160px;">精装成本标准(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.will_front_cost_standard"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.will_front_cost_standard | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:130px;">目标月均流量(㎡)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.will_front_avg_flow"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.will_front_avg_flow | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="t_header">拿地后（投资系统）</div>
                  <div class="t_body">
                    <div>
                      <div
                        class="t_cell t_title amendStyle"
                        style="width:110px;border-left:1px solid #ebeef5"
                      >建筑面积(m²)</div>
                      <div
                        style="border-left:1px solid #ebeef5"
                        v-for="(item, idx) in prodList"
                        :key="idx"
                      >
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <el-input
                            v-if="
                              obj.product_type !== '小计' &&
                                item.operation_type !== '合计' &&
                                readonlyFlag
                            "
                            v-model="obj.obj.land_back_area"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            @input="setsumAgian"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.land_back_area | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:140px;">整盘均价(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.land_back_avg_price"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            @input="setsumAgian"
                          >
                            <!--
                            @input.native="obj.obj.land_back_avg_price=parseInt(obj.obj.land_back_avg_price)"
                            -->
                          </el-input>
                          <span v-else>
                            {{
                            obj.obj.land_back_avg_price | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:110px;">货值(万元)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span>{{ obj.obj.land_back_value | fixed }}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:140px;">开盘价格(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.land_back_open_price"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                          >
                            <!--
                            @input.native="obj.obj.land_back_open_price=parseInt(obj.obj.land_back_open_price)"
                            -->
                          </el-input>
                          <span v-else>
                            {{
                            obj.obj.land_back_open_price | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:160px;">精装成本标准(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.land_back_cost_standard"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.land_back_cost_standard | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:150px;">目标月均流量（㎡）</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.land_back_avg_flow"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.land_back_avg_flow | fixed
                            }}
                          </span>
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
        <p>
          户型配比及户型定位
          <el-button type="text" @click="addHouseDialog = true" v-if="readonlyFlag">添加</el-button>
        </p>
        <div class="table">
          <div class="left_t">
            <div class="t_header" style="background:rgba(246,248,253,1);">
              <div>业态类型</div>
              <div>产品类型</div>
            </div>
            <div class="t_body">
              <div
                style="background:rgba(246,248,253,1);"
                class="t_cell"
                v-for="(item, idx) in houseList"
                :key="idx"
              >
                <div
                  :style="{
                    'line-height': item.child.length * 40 + 'px',
                    width: item.operation_type == '合计' ? '100%' : '120px'
                  }"
                >
                  <span :title="item.operation_type">
                    {{
                    item.operation_type
                    }}
                  </span>
                </div>
                <div v-if="item.operation_type !== '合计'">
                  <div v-for="(obj, index) in item.child" :key="index">
                    <span :title="obj.product_type">
                      {{
                      obj.product_type
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right_t">
            <div class="scrollBox">
              <div>
                <div>
                  <div class="t_header">拿地后（投资系统）</div>
                  <div class="t_body">
                    <div>
                      <div class="t_cell t_title">户型面积(m²)</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.room_area"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                          ></el-input>
                          <span v-else>{{ obj.obj.room_area | fixed }}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title">户数(个)</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <el-input
                            v-if="
                              obj.product_type !== '小计' &&
                                item.operation_type !== '合计' &&
                                readonlyFlag
                            "
                            v-model="obj.obj.room_num"
                            type="number"
                            @input.native="
                              obj.obj.room_num = parseInt(obj.obj.room_num)
                            "
                            v-only-number="{ min: 0 }"
                          ></el-input>
                          <span v-else>{{ obj.obj.room_num }}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title">户数配比(%)</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <span v-else>{{ obj.obj.room_per ?  obj.obj.room_per + '%' : obj.obj.room_per}}</span>
                        </div>
                      </div>
                    </div>
                    <div v-if="readonlyFlag">
                      <div class="t_cell t_title">操作</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <el-button
                            type="text"
                            v-if="
                              obj.product_type !== '小计' &&
                                item.operation_type !== '合计'
                            "
                            @click="delHouse(idx, obj, index)"
                            :readonly="plan_approval == 4 && plan_approval != 3"
                          >删除</el-button>
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
          :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
        >
          <el-table-column prop="name" label="名称" align="left"></el-table-column>
          <div class="RightTime">
            <el-table-column prop="time" label="时间" align="center" width="170" fixed="right">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.time"
                  format="yyyy-MM-dd"
                  @input="pickTime(scope.row.name, scope.row.time)"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :disabled="plan_approval == 4 || plan_approval == 3"
                  @focus="setSecondTime(scope.row.name)"
                  :readonly="scope.row.name == '顶设2' || !readonlyFlag"
                ></el-date-picker>
              </template>
            </el-table-column>
          </div>
        </el-table>
      </div>
      <div class="target" id="target">
        <p>
          销售目标
          <span style="font-weight:400">(单位：万元)</span>
        </p>
        <el-table
          :data="targetData"
          style="width: 100%"
          show-summary
          border
          :summary-method="mysummary"
          :header-cell-style="{
            background: 'rgba(246,248,253,1)',
            color: '#999'
          }"
        >
          <el-table-column prop="sales_time" label="时间" align="center"></el-table-column>
          <el-table-column prop="land_front_price" label="拿地前(营销内控版)" align="center">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{ min: 0, precision: 2 }"
                v-model="scope.row.land_front_price"
                v-if="readonlyFlag"
              ></el-input>
              <span v-else>{{ scope.row.land_front_price | fixed }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="will_price" label="上会版(投资系统)" align="center">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{ min: 0, precision: 2 }"
                v-model="scope.row.will_price"
                v-if="readonlyFlag"
              ></el-input>
              <span v-else>{{ scope.row.will_price | fixed }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="land_back_price" label="拿地后(投资系统)" align="center">
            <template slot-scope="scope">
              <el-input
                type="number"
                v-only-number="{ min: 0, precision: 2 }"
                v-model="scope.row.land_back_price"
                v-if="readonlyFlag"
              ></el-input>
              <span v-else>{{ scope.row.land_back_price | fixed }}</span>
            </template>
          </el-table-column>
          <el-table-column prop label="操作" align="center" v-if="readonlyFlag">
            <template slot-scope="scope">
              <div>
                <el-button
                  v-if="scope.row.sales_time != '首开'"
                  type="text"
                  @click="delItem(scope.row)"
                >删除</el-button>
                <el-button
                  v-if="scope.row.sales_time == '首开'"
                  type="text"
                  @click="addTimeFlag = true"
                >添加</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="cost" id="cost">
        <p>费用</p>
        <el-table
          :data="costData"
          border
          style="width: 100%"
          :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
        >
          <el-table-column prop="type" label></el-table-column>
          <el-table-column label="拿地前(营销内控版)" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type == '营销费用(万元)'">
                {{
                (isNaN(scope.row.land_front_price)
                ? ""
                : scope.row.land_front_price) | fixed
                }}
              </span>
              <el-input
                label-width="100px"
                v-if="scope.row.type == '营销费率(%)' && readonlyFlag"
                @input="getSum('land_front_price', scope.row.land_front_per)"
                v-model="scope.row.land_front_per"
                type="number"
                v-only-number="{ min: 0, precision: 2 }"
              ></el-input>
              <span v-if="scope.row.type == '营销费率(%)' && !readonlyFlag">
                {{
                scope.row.land_front_per | twoFix
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="上会版(投资系统)" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type == '营销费用(万元)'">
                {{
                (isNaN(scope.row.will_price) ? "" : scope.row.will_price)
                | fixed
                }}
              </span>
              <el-input
                v-if="scope.row.type == '营销费率(%)' && readonlyFlag"
                @input="getSum('will_price', scope.row.will_per)"
                v-model="scope.row.will_per"
                type="number"
                v-only-number="{ min: 0, precision: 2 }"
              ></el-input>
              <span v-if="scope.row.type == '营销费率(%)' && !readonlyFlag">
                {{
                scope.row.will_per | twoFix
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="拿地后(投资系统)" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type == '营销费用(万元)'">
                {{
                (isNaN(scope.row.land_back_price)
                ? ""
                : scope.row.land_back_price) | fixed
                }}
              </span>
              <el-input
                v-if="scope.row.type == '营销费率(%)' && readonlyFlag"
                @input="getSum('land_back_price', scope.row.land_per)"
                v-model="scope.row.land_per"
                type="number"
                v-only-number="{ min: 0, precision: 2 }"
              ></el-input>
              <span v-if="scope.row.type == '营销费率(%)' && !readonlyFlag">
                {{
                scope.row.land_per | twoFix
                }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="accessory" id="accessory">
        <p>附件清单</p>
        <el-table
          :data="accessoryData"
          style="width: 100%"
          :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
        >
          <el-table-column prop="type" label="附件名称" align="left" width="250"></el-table-column>
          <el-table-column prop="name" label="附件" align="left">
            <template slot-scope="scope">
              <a :href="local + scope.row.url">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="left">
            <template slot-scope="scope">
              <div class="fileBox" v-if="scope.$index < accessoryData.length - 1">
                <el-upload
                  :on-exceed="exceed"
                  :action="action"
                  :data="{
                    filePath: 'getLand',
                    bizID: '',
                    orderIndex: scope.$index
                  }"
                  :on-success="fileSuccess"
                  :file-list="fileList__"
                  v-if="readonlyFlag && !scope.row.name"
                  :on-remove="fileRemove"
                  :on-error="fileError"
                >
                  <el-button type="text">{{ scope.row.handle }}</el-button>
                </el-upload>
                <el-button
                  type="text"
                  v-if="readonlyFlag && scope.row.name"
                  @click="delFielList(scope.$index)"
                >删除</el-button>
              </div>
              <div class="fileBox" v-else>
                <el-upload
                  :action="action"
                  :on-success="fileSuccess"
                  :data="{
                    filePath: 'getLand',
                    bizID: '',
                    orderIndex: scope.$index
                  }"
                  v-if="readonlyFlag"
                  :on-remove="fileRemove"
                  :on-error="fileError"
                >
                  <el-button v-if="readonlyFlag" type="text">+{{scope.row.handle}}</el-button>
                </el-upload>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom" v-if="isType != 'view' && readonlyFlag">
      <el-button
        type="primary"
        v-if="$store.state.user.userPower.includes('提交审批')"
        @click="update('3')"
      >提交审批</el-button>
      <el-button type @click="update('1')">保存</el-button>
      <el-button v-if="isShowKS" type @click="update('4')">快速审批</el-button>
    </div>
    <el-dialog class="textStyle" title="添加货值结构" :visible.sync="addDialog">
      <el-form :model="addform">
        <el-form-item label="业态类型" label-width="120px">
          <el-select v-model="addform.operation_type" placeholder="请选择业态类型">
            <el-option
              v-for="(item, idx) in optionList"
              :key="idx"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型" label-width="120px">
          <!-- <el-input v-model="addform.product_type" autocomplete="off"></el-input> -->
          <el-select v-model="addform.product_type" placeholder="请选择产品类型">
            <el-option
              v-for="(item, idx) in pordOption"
              :key="idx"
              :label="item.DictName"
              :value="item.DictName"
              :disabled="item.is_disabled"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addProdItem">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加户型配比及户型定位" :visible.sync="addHouseDialog">
      <el-form :model="addform__">
        <el-form-item label="业态类型" label-width="120px">
          <el-select v-model="addform__.operation_type" placeholder="请选择业态类型">
            <el-option
              v-for="(item, idx) in optionList"
              :key="idx"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型" label-width="120px">
          <el-select v-model="addform__.product_type" placeholder="请选择产品类型">
            <el-option
              v-for="(item, idx) in houseOption"
              :key="idx"
              :label="item.DictName"
              :value="item.DictName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addHouseDialog = false">取 消</el-button>
        <el-button type="primary" @click="addHouseItem">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="请选择时间" :visible.sync="addTimeFlag">
      <el-date-picker v-model="addTime" type="year" placeholder="选择年"></el-date-picker>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTimeFlag = false">取 消</el-button>
        <el-button type="primary" @click="addItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  insertTakeLand,
  getDicByCodeLevelList,
  selectNodeVersion,
  queryTakeLands,
  queryfile,
  delFile
} from "@/api/firstPlan";
import { post, get, downLoad } from "../../api/request";
import { toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";
import $ from "jquery";
export default {
  filters: {
    fixed(data) {
      if (!data) {
        return "0.00";
      }
      return Number(data).toFixed(2);
    },
    twoFix(data) {
      if (!data) {
        return "0.00";
      }
      return Number(data).toFixed(2);
    }
  },
  components: {
    navbarLink: () => import("./components/navbarLink")
  },
  data() {
    return {
      isType: "",
      isShowKS: location.origin.includes("uat"),
      addDialog: false,
      addTimeFlag: false,
      addTime: "",
      addHouseDialog: false,
      plan_approval: "",
      flow_id: "",
      isNewType: 0,
      prodSeriesList: [
        { label: "L", value: "L" },
        { label: "H", value: "H" },
        { label: "G", value: "G" },
        { label: "T", value: "T" }
      ],
      prodSeries: "",
      isNew: "",
      addform: {},
      addform__: {},
      userId: JSON.parse(localStorage.getItem("userInfo")).username,
      otherIndex: 4,
      testList: [],
      testList__: [],
      fileList: [],
      form: {
        versions: ""
      },
      fileList__: [],
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
      costData: [
        {
          type: "营销费用(万元)"
        },
        {
          type: "营销费率(%)",
          land_back_price: "",
          land_front_price: "",
          will_price: ""
        }
      ],
      accessoryData: [
        {
          type: "《竞品信息调研表》",
          handle: "上传"
        },
        {
          type: "《投资阶段产品定位输出表》",
          handle: "上传"
        },
        {
          type: "《投资阶段费率测算标准表》",
          handle: "上传"
        },
        {
          type: "《投资阶段成本配置及量价费输出表》",
          handle: "上传"
        },
        {
          type: "《拿地后战略意图书》",
          handle: "上传"
        },
        {
          type: "《上会版投资报告》",
          handle: "上传"
        },
        {
          type: "《邮件截图》",
          handle: "上传"
        },
        {
          type: "",
          handle: "其他上传"
        }
      ],
      optionList: [],
      allOption: [],
      versionList: [],
      targetDataSum: []
    };
  },

  computed: {
    readonlyFlag() {
      if (this.$route.query.disabled) {
        return false;
      } else if (this.plan_approval == 4 || this.plan_approval == 3) {
        return false;
      } else {
        return true;
      }
    },
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
          if (lv2.product_type == "小计") {
            lv1.child.pop();
            return;
          }
          if (lv2.obj.land_front_area && lv2.obj.land_front_avg_price) {
            let land_front_value =
              (Number(lv2.obj.land_front_area) *
                Number(lv2.obj.land_front_avg_price)) /
              10000;
            lv2.obj.land_front_value = isNaN(land_front_value)
              ? 0.0
              : land_front_value.toFixed(2);
          }
          if (lv2.obj.will_area && lv2.obj.will_avg_price) {
            let will_front_value =
              (Number(lv2.obj.will_area) * Number(lv2.obj.will_avg_price)) /
              10000;
            lv2.obj.will_front_value = isNaN(will_front_value)
              ? 0.0
              : will_front_value.toFixed(2);
          }
          if (lv2.obj.land_back_area && lv2.obj.land_back_avg_price) {
            let land_back_value =
              (Number(lv2.obj.land_back_area) *
                Number(lv2.obj.land_back_avg_price)) /
              10000;
            lv2.obj.land_back_value = isNaN(land_back_value)
              ? 0.0
              : land_back_value.toFixed(2);
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
        lv1.child.sort((a, b) => {
          if (a.product_type > b.product_type) {
            return 1;
          } else if (a.product_type < b.product_type) {
            return -1;
          } else {
            return 0;
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
        lv1.child.sort((a, b) => {
          if (a.product_type > b.product_type) {
            return 1;
          } else if (a.product_type < b.product_type) {
            return -1;
          } else {
            return 0;
          }
        });
        lv1.child.forEach((lv2, index) => {
          let room_per =
            (Number(lv2.obj.room_num) / Number(littleSum.room_num)) * 100;
          lv2.obj.room_per = isNaN(room_per) ? 0 : room_per.toFixed(0);
        });
        lv1.child.push({
          product_type: "小计",
          obj: littleSum
        });
        // }
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

    pordOption() {
      let list = this.allOption.filter(
        item => item.pname == this.addform.operation_type
      );
      list = JSON.parse(JSON.stringify(list));
      // let selectList = this.prodList.filter(
      //   item => item.operation_type == this.addform.operation_type
      // );
      // if (selectList.length) {
      //   list.map(item => {
      //     selectList[0].child.map(y => {
      //       if (item.DictName == y.product_type) item.is_disabled = true;
      //     });
      //   });
      // }
      return list;
    },
    houseOption() {
      let showList = [];
      let list = this.allOption.filter(
        item => item.pname == this.addform__.operation_type
      );
      let selectList = this.prodList.filter(
        item => item.operation_type == this.addform__.operation_type
      );
      if (selectList.length) {
        list.map(item => {
          selectList[0].child.map(y => {
            if (item.DictName == y.product_type) showList.push(item);
          });
        });
      }
      return showList;
    },
    rateSum() {
      return this.prodList[this.prodList.length - 1].child[0].obj;
    }
  },
  watch: {},
  created() {
    //监控进入只查看
    if (this.$route.query.type != null && this.$route.query.type == "view") {
      this.isType = this.$route.query.type;
    }
    // 获取全量业态和产品类型
    getDicByCodeLevelList({ DictCode: "FP_OPERATION_TYPE" }).then(res => {
      this.allOption = res.result.data;
      let obj = [];
      this.allOption.forEach(item => {
        if (!obj.some(obj => obj.name == item.pname)) {
          obj.push({
            name: item.pname,
            code: item.pcode
          });
        }
      });
      this.optionList = obj;
    });
    selectNodeVersion({
      plan_id: this.$route.query.plan_id,
      node_level: this.$route.query.node_level
    }).then(res => {
      this.versionList = res.data;
      if (res.data.length >= 1) {
        this.form.versions = res.data[0].plan_node_id;
        this.plan_approval = res.data[0].plan_approval;
        if (
          res.data[0].plan_approval === 2 ||
          res.data[0].plan_approval === 3
        ) {
          this.isNewType = 1;
        }
      } else {
        this.isNewType = 1;
      }
      if (this.form.versions) {
        this.reloadVersion();
      }
      this.changeFlowId();
    });
  },
  methods: {
    changeFlowId() {
      queryFlowId({}, this.form.versions).then(res => {
        if (res.code == 200 && res.data) {
          if (res.data.flow_status == 7) {
            this.isShowDiscard = false;
          }
          this.flow_id = res.data.flow_id;
        }
      });
    },
    fileError(err, file, fileList) {
      this.$message.error("上传失败");
    },
    changeVersions() {
      let idx = this.versionList.findIndex(
        item => item.plan_node_id == this.form.versions
      );
      this.plan_approval = this.versionList[idx].plan_approval;
      this.isNew = "";
      this.reloadVersion();
      this.changeFlowId();
    },
    exceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
    },
    addVersion() {
      this.$confirm("确认创建新版本么", "创建版本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.form.versions = "";
          this.plan_approval = "1";
          this.isNew = "创建新版";
          this.isNewType = "1";
          this.testList = [];
          this.testList__ = [];
          this.timeData = [
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
          ];
          this.targetData = [
            {
              sales_time: "首开",
              land_front_price: "",
              will_price: "",
              land_back_price: ""
            }
          ];
          this.costData = [
            {
              type: "营销费用(万元)"
            },
            {
              type: "营销费率(%)",
              land_back_price: "",
              land_front_price: "",
              will_price: ""
            }
          ];
          this.accessoryData = [
            {
              type: "《竞品信息调研表》",
              handle: "上传"
            },
            {
              type: "《投资阶段产品定位输出表》",
              handle: "上传"
            },
            {
              type: "《投资阶段费率测算标准表》",
              handle: "上传"
            },
            {
              type: "《投资阶段成本配置及量价费输出表》",
              handle: "上传"
            },
            {
              type: "《拿地后战略意图书》",
              handle: "上传"
            },
            {
              type: "《上会版投资报告》",
              handle: "上传"
            },
            {
              type: "《邮件截图》",
              handle: "上传"
            },
            {
              type: "",
              handle: "其他上传"
            }
          ];
          // this.form.versions = "";
          this.reloadVersion();
          this.$message({
            type: "success",
            message: "创建成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    delProdItem(obj, index) {
      this.$confirm("此操作同时会删除户型配比中的产品类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.testList.forEach(lv1 => {
            lv1.child.forEach(lv2 => {
              if (lv2.product_type == obj.product_type) {
                lv1.child.pop();
                lv1.child.splice(index, 1);
                if (lv1.child.length == 0) {
                  let idx = this.testList.findIndex(
                    item => item.operation_type == lv1.operation_type
                  );
                  lv1.child = [];
                  this.testList.splice(idx, 1);
                }
              }
            });
          });
          let _inds = [];
          let _ind = "";
          this.testList__.forEach((lv1, ind) => {
            lv1.child.forEach((lv2, i) => {
              if (lv2.product_type == obj.product_type) {
                _inds.push(i);
                _ind = ind;
              }
            });
          });
          _inds.map(item => {
            this.testList__[_ind].child.splice(item, 1);
            if (this.testList__[_ind].child.length <= 1) {
              let idx = this.testList__.findIndex(
                item =>
                  item.operation_type == this.testList__[_ind].operation_type
              );
              this.testList__[_ind].child = [];
              this.testList__.splice(idx, 1);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    reloadVersion() {
      queryTakeLands({
        plan_node_id: this.form.versions,
        plan_id: this.$route.query.plan_id
      }).then(res => {
        if (res.code == 200) {
          let arr = [...res.data.tollerMap];
          arr.forEach(lv1 => {
            lv1.child.forEach(lv2 => {
              lv2.obj = { ...lv2 };
            });
          });
          this.testList = arr;
          let arr1 = res.data.roomlist || [];
          arr1.forEach(lv1 => {
            lv1.child.forEach(lv2 => {
              lv2.obj = { ...lv2 };
            });
          });
          this.testList__ = arr1;
          if (res.data.timeNode.length >= 1) {
            let timeobj = res.data.timeNode[0];
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
          let arr3 = res.data.sales;
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
            // arr3.forEach(item => {
            //   item.sales_time = +new Date(item.sales_time).getFullYear();
            // });
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

          let arr4 = { ...res.data.cost[0] };

          this.costData = [
            {
              id: res.data.cost[0].id,
              land_back_price: res.data.cost[0].land_back_price,
              land_front_per: res.data.cost[0].land_front_per,
              land_front_price: res.data.cost[0].land_front_price,
              land_per: res.data.cost[0].land_per,
              plan_id: res.data.cost[0].plan_id,
              plan_node_id: res.data.cost[0].plan_node_id,
              type: "营销费用(万元)",
              will_per: res.data.cost[0].will_per,
              will_price: res.data.cost[0].will_price
            },
            {
              id: res.data.cost[0].id,
              land_back_price: res.data.cost[0].land_back_price,
              land_front_per: res.data.cost[0].land_front_per,
              land_front_price: res.data.cost[0].land_front_price,
              land_per: res.data.cost[0].land_per,
              plan_id: res.data.cost[0].plan_id,
              plan_node_id: res.data.cost[0].plan_node_id,
              type: "营销费率(%)",
              will_per: res.data.cost[0].will_per,
              will_price: res.data.cost[0].will_price
            }
          ];
          let arr5 = res.data.fileList;
          this.accessoryData = [
            {
              type: "《竞品信息调研表》",
              handle: "上传"
            },
            {
              type: "《投资阶段产品定位输出表》",
              handle: "上传"
            },
            {
              type: "《投资阶段费率测算标准表》",
              handle: "上传"
            },
            {
              type: "《投资阶段成本配置及量价费输出表》",
              handle: "上传"
            },
            {
              type: "《拿地后战略意图书》",
              handle: "上传"
            },
            {
              type: "《上会版投资报告》",
              handle: "上传"
            },
            {
              type: "《邮件截图》",
              handle: "上传"
            },
            {
              type: "",
              handle: "其他上传"
            }
          ];
          if (arr5 && arr5.length > 0) {
            let temp = this.accessoryData.pop();
            arr5.forEach((item, index) => {
              if (item.orderIndex >= 7) {
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
                this.accessoryData[item.orderIndex].orderIndex =
                  item.orderIndex;
              }
            });
            this.accessoryData.push(temp);
          }
          this.prodSeries = res.data.product_set;

          let arr6 = res.data.numberList;
          if (arr6.length > 0) {
            if (arr6[0].numTopOne >= 1) {
              this.isNewType = 1;
            }
          }
        }
      });
    },
    addProdItem() {
      if (!this.addform.operation_type) {
        this.$message.error("请选择业态类型");
        return;
      } else if (!this.addform.product_type) {
        this.$message.error("请选择产品类型");
        return;
      }

      let dicCode = this.allOption.filter(
        item => item.DictName == this.addform.product_type
      )[0].DictCode;
      let proCode = this.allOption.filter(
        item => item.pname == this.addform.operation_type
      )[0].pcode;

      if (
        this.testList.some(
          item => item.operation_type == this.addform.operation_type
        )
      ) {
        let idx = this.testList.findIndex(item => {
          return item.operation_type == this.addform.operation_type;
        });
        this.prodList.forEach(item => {
          item.child.pop();
        });
        this.testList[idx].child.push({
          product_type: this.addform.product_type,
          obj: {
            land_front_area: "",
            land_front_avg_price: "",
            land_front_value: "",
            land_front_open_price: "",
            land_front_cost_standard: "",
            land_front_avg_flow: "",
            will_area: "",
            will_avg_price: "",
            will_front_value: "",
            will_front_open_price: "",
            will_front_cost_standard: "",
            will_front_avg_flow: "",
            land_back_area: "",
            land_back_avg_price: "",
            land_back_value: "",
            land_back_open_price: "",
            land_back_cost_standard: "",
            land_back_avg_flow: "",
            operation_type_code: proCode,
            product_type_code: dicCode
          }
        });
      } else {
        this.testList.push({
          operation_type: this.addform.operation_type,
          child: [
            {
              product_type: this.addform.product_type,
              obj: {
                operation_type_code: proCode,
                product_type_code: dicCode,
                land_front_area: "",
                land_front_avg_price: "",
                land_front_value: "",
                land_front_open_price: "",
                land_front_cost_standard: "",
                land_front_avg_flow: "",
                will_area: "",
                will_avg_price: "",
                will_front_value: "",
                will_front_open_price: "",
                will_front_cost_standard: "",
                will_front_avg_flow: "",
                land_back_area: "",
                land_back_avg_price: "",
                land_back_value: "",
                land_back_open_price: "",
                land_back_cost_standard: "",
                land_back_avg_flow: ""
              }
            }
          ]
        });
      }
      if (
        this.testList__.some(
          item => item.operation_type == this.addform.operation_type
        )
      ) {
        let idx = this.testList__.findIndex(item => {
          return item.operation_type == this.addform.operation_type;
        });
        // this.prodList.forEach(item => {
        //   item.child.pop();
        // });
        this.testList__[idx].child.push({
          product_type: this.addform.product_type,
          obj: {
            room_area: "",
            room_num: "",
            room_per: "",
            operation_type_code: proCode,
            product_type_code: dicCode
          }
        });
      } else {
        this.testList__.push({
          operation_type: this.addform.operation_type,
          child: [
            {
              product_type: this.addform.product_type,
              obj: {
                room_area: "",
                room_num: "",
                room_per: "",
                operation_type_code: proCode,
                product_type_code: dicCode
              }
            }
          ]
        });
      }
      this.addform = {};
      this.addDialog = false;
    },
    addHouseItem() {
      if (!this.addform__.operation_type) {
        this.$message.error("请选择业态类型");
        return;
      } else if (!this.addform__.product_type) {
        this.$message.error("请选择产品类型");
        return;
      }
      let dicCode = this.allOption.filter(
        item => item.DictName == this.addform__.product_type
      )[0].DictCode;
      let proCode = this.allOption.filter(
        item => item.pname == this.addform__.operation_type
      )[0].pcode;

      if (
        this.testList__.some(
          item => item.operation_type == this.addform__.operation_type
        )
      ) {
        let idx = this.testList__.findIndex(item => {
          return item.operation_type == this.addform__.operation_type;
        });
        this.houseList.forEach(item => {
          item.child.pop();
        });
        this.testList__[idx].child.push({
          product_type: this.addform__.product_type,
          obj: {
            room_area: "",
            room_num: "",
            room_per: "",
            operation_type_code: proCode,
            product_type_code: dicCode
          }
        });
        // this.testList__[idx].child.sort((a,b)=>{
        //   return a.product_type-b.product_type
        // })
      } else {
        this.testList__.push({
          operation_type: this.addform__.operation_type,
          child: [
            {
              product_type: this.addform__.product_type,
              obj: {
                room_area: "",
                room_num: "",
                room_per: "",
                operation_type_code: proCode,
                product_type_code: dicCode
              }
            }
          ]
        });
      }

      this.addform__ = {};
      this.addHouseDialog = false;
    },
    fileRemove(file, fileList) {},
    fileSuccess(res, file, fileList) {
      if (!res.data) {
        this.$message.error(res.messages);
        return;
      }
      if (res.data.orderIndex < this.accessoryData.length - 1) {
        this.$set(
          this.accessoryData[res.data.orderIndex],
          "name",
          res.data.name
        );
        this.$set(this.accessoryData[res.data.orderIndex], "id", res.data.id);
        this.$set(this.accessoryData[res.data.orderIndex], "url", res.data.url);
      } else {
        let temp = this.accessoryData[this.accessoryData.length - 1];
        this.accessoryData.pop();
        this.accessoryData.push({
          type: "其他上传",
          handle: "上传",
          name: res.data.name,
          id: res.data.id,
          url: res.data.url
        });
        this.accessoryData.push(temp);
      }
    },
    delFielList(idx) {
      let namelist = [
        "《竞品信息调研表》",
        "《投资阶段产品定位输出表》",
        "《投资阶段费率测算标准表》",
        "《投资阶段成本配置及量价费输出表》",
        "《拿地后战略意图书》",
        "《上会版投资报告》",
        "《邮件截图》"
      ];
      if (idx <= 6) {
        this.accessoryData.splice(idx, 1, {
          type: namelist[idx],
          handle: "上传"
        });
      } else {
        this.accessoryData.splice(idx, 1);
      }
    },
    tabClick(tab, event) {
      document.querySelector("#containter").scrollTop =
        document.getElementById(tab.name).offsetTop - 100;
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
    update(status) {
      console.log(this.costData);
      let tempcost = [
        {
          land_back_price: this.costData[0].land_back_price,
          land_front_price: this.costData[0].land_front_price,
          will_price: this.costData[0].will_price,
          land_front_per: this.costData[1].land_front_per,
          land_per: this.costData[1].land_per,
          will_per: this.costData[1].will_per
        }
      ];
      let tollerlist1 = [...this.prodList];
      let roomlist = [...this.houseList];
      tollerlist1.pop();
      roomlist.pop();
      //必填项校验
      if (status == "3" || status == "4") {
        if (!this.prodSeries) {
          this.$message({
            type: "error",
            message: "产品系未填写"
          });
          return;
        }
        //货值结构
        let nameCheckList = [
          "land_back_area",
          "land_back_avg_flow",
          "land_back_avg_price",
          "land_back_cost_standard",
          "land_back_open_price",
          "land_front_area",
          "land_front_avg_flow",
          "land_front_avg_price",
          "land_front_cost_standard",
          "land_front_open_price",
          "will_area",
          "will_avg_price",
          "will_front_avg_flow",
          "will_front_cost_standard",
          "will_front_open_price"
        ];
        if (tollerlist1.length == 0) {
          this.$message({
            type: "error",
            message: "货值结构不能为空!"
          });
          return;
        }
        let tollerflag = true;
        tollerlist1.forEach(lv1 => {
          if (lv1.operation_type != "小计" && tollerflag) {
            lv1.child.forEach(lv2 => {
              if (lv2.product_type != "小计" && tollerflag) {
                nameCheckList.forEach(name => {
                  if (!lv2.obj[name] && lv2.obj[name] !== 0 && tollerflag) {
                    tollerflag = false;
                    return;
                  }
                });
              }
            });
          }
        });
        if (!tollerflag) {
          this.$message({
            type: "error",
            message: "货值结构必填项未填写!"
          });
          return;
        }
        //户型配比
        let roomflag = true;
        let roomNameList = ["room_num", "room_area"];
        if (roomlist.length > 0) {
          roomlist.forEach(lv1 => {
            if (lv1.operation_type != "小计" && roomflag) {
              lv1.child.forEach(lv2 => {
                if (lv2.product_type != "小计" && roomflag) {
                  roomNameList.forEach(name => {
                    if (!lv2.obj[name] && lv2.obj[name] !== 0 && roomflag) {
                      roomflag = false;
                      return;
                    }
                  });
                }
              });
            }
          });
        }
        if (!roomflag) {
          this.$message({
            type: "error",
            message: "户型配比必填项未填写!"
          });
          return;
        }
        //费用
        console.log(tempcost);

        if (
          (!tempcost[0].land_front_per && tempcost[0].land_front_per !== 0) ||
          (!tempcost[0].land_per && tempcost[0].land_per !== 0) ||
          (!tempcost[0].will_per && tempcost[0].will_per !== 0)
        ) {
          this.$message({
            type: "error",
            message: "费用必填项未填写!"
          });
          return;
        }
        // 时间节点
        if (this.timeData.some(i => !i.time)) {
          this.$message({
            type: "error",
            message: "时间节点必填"
          });
          return;
        }
        //销售目标校验
        let prodList = this.prodList.filter(
          item => item.operation_type == "合计"
        );
        let prodObj = prodList[0].child[0].obj;
        let targetDataSum = this.targetDataSum;
        if (
          targetDataSum[1] != prodObj.land_front_value ||
          targetDataSum[2] != prodObj.will_front_value ||
          targetDataSum[3] != prodObj.land_back_value
        ) {
          this.$message({
            type: "error",
            message:
              "销售目标的整盘合计需要与货值结构中各个版本的货值(万元)一致"
          });
          return;
        }
        let targetFlag = true;
        let targetNameList = [
          "land_back_price",
          "land_front_price",
          "will_price"
        ];
        this.targetData.forEach(item => {
          targetNameList.forEach(name => {
            if (!item[name] && item[name] !== 0 && targetFlag) {
              targetFlag = false;
              return;
            }
          });
        });
        if (!targetFlag) {
          this.$message({
            type: "error",
            message: "销售目标必填项未填写!"
          });
          return;
        }
        //附件校验
        if (
          this.accessoryData.some(
            i => i.type && i.type !== "其他上传" && !i.name
          )
        ) {
          this.$message({
            type: "error",
            message: "必须上传附件清单"
          });
          return;
        }
      } //校验结束
      let timeList = [
        "delisting_time",
        "designone_time",
        "designtwo_time",
        "sales_time",
        "sample_open_time",
        "model_open_time",
        "open_time"
      ];
      let timeArr = [];
      timeList.forEach((item, index) => {
        if (this.timeData[index].time) {
          timeArr[index] = {
            time: this.FomartDate(new Date(this.timeData[index].time)),
            name: timeList[index]
          };
        } else {
          timeArr[index] = {
            time: "",
            name: timeList[index]
          };
        }
      });
      let time = {};
      timeArr.forEach(item => {
        time[item.name] = item.time;
      });
      insertTakeLand({
        timeNode: time,
        sales: this.targetData,
        cost: tempcost,
        tollerlist: tollerlist1,
        roomlist: roomlist,
        project_id: this.project_id,
        plan_node_id: this.form.versions,
        plan_id: this.$route.query.plan_id,
        light_stuat: status,
        fileList: this.accessoryData,
        isNew: this.isNew,
        product_set: this.prodSeries
      }).then(res => {
        if (res.code == 200) {
          if (status == "1") {
            this.$message.success("保存草稿成功");
          } else if (status == "3") {
            get(
              `/Workflow/MTStart2.aspx?BSID=FP&BTID=${res.result.flow_code}&BOID=${res.result.json_id}&UserID=${res.result.creator}&LoginKey=''`
            ).then(res => {
              this.$message.success("提交审批成功");
              window.open(res.data);
            });
          }
          //快速审批
          else if (status == "4") {
            var hht =
              this.local +
              "/#/firstPlanPreview?BOID=" +
              res.result.json_id +
              "&t=1585017217401&isKSAP=1";
            window.open(hht);
          }
          if (
            !this.$route.query.plan_node_id ||
            status == "3" ||
            status == "4"
          ) {
            this.$router.push("planWrite");
          } else if (this.isNew === "创建新版") {
            this.isNew = "";
            this.$router.go(0);
          }
        }
      });
    },
    pickTime(type, time) {
      if (type == "摘牌") {
        this.$set(
          this.timeData[1],
          "time",
          this.FomartDate(new Date(Number(+new Date(time)) + 1296000000))
        );
      }
      if (type == ("顶设2" || "售楼处开放" || "样板段开放" || "样板房开放")) {
        if (!this.timeData[6].time) {
          this.timeData[2].time = "";
          this.timeData[3].time = "";
          this.timeData[4].time = "";
          this.timeData[5].time = "";
          this.$message("请先填报开盘时间");
        }
      } else if (type == "开盘") {
        this.$set(
          this.timeData[2],
          "time",
          this.FomartDate(new Date(Number(+new Date(time)) - 10368000000))
        );
        this.$set(
          this.timeData[3],
          "time",
          this.FomartDate(new Date(Number(+new Date(time)) - 3888000000))
        );
        this.$set(
          this.timeData[4],
          "time",
          this.FomartDate(new Date(Number(+new Date(time)) - 1814400000))
        );
        this.$set(
          this.timeData[5],
          "time",
          this.FomartDate(new Date(Number(+new Date(time)) - 1814400000))
        );
      }
      if (new Date(this.timeData[2].time) < new Date(this.timeData[1].time)) {
        this.$notify.error({
          title: "提示",
          message: "顶设1时间节点不得小于顶设2时间节点",
          duration: 0
        });
      }
      if (
        +new Date(this.timeData[1].time) - +new Date(this.timeData[0].time) <
        1296000000
      ) {
        this.$notify.warning({
          title: "提示",
          message:
            "根据标准业务时间要求，拿地后15天需完成顶设1系统审批，您填写的顶设1时间节点不满足标准工期要求，请确认是否需要调整"
        });
      }
      if (
        +new Date(this.timeData[6].time) - +new Date(this.timeData[3].time) <
        3888000000
      ) {
        this.$notify.warning({
          title: "提示",
          message:
            "根据三大件标准工期开放时间要求，首开前45天需完成售楼处开放，您填写的售楼处开放时间节点小于45天，请确认是否需要调整"
        });
      }
      if (
        +new Date(this.timeData[6].time) - +new Date(this.timeData[4].time) <
        1814400000
      ) {
        this.$notify.warning({
          title: "提示",
          message:
            "根据三大件标准工期开放时间要求，首开前21天需完成景观样板段开放，您填写的景观样板段开放时间节点小于21天，请确认是否需要调整"
        });
      }
      if (
        +new Date(this.timeData[6].time) - +new Date(this.timeData[5].time) <
        1814400000
      ) {
        this.$notify.warning({
          title: "提示",
          message:
            "根据三大件标准工期开放时间要求，首开前21天需完成样板房开放，您填写的样板房开放时间节点小于21天，请确认是否需要调整"
        });
      }
    },
    getSum(type, num) {
      let obj = {
        land_front_price: "land_front_value",
        will_price: "will_front_value",
        land_back_price: "land_back_value"
      };
      this.$set(
        this.costData[0],
        `${type}`,
        Number((this.rateSum[obj[type]] * num) / 100).toFixed(2)
      );
      this.$set(
        this.costData[1],
        `${type}`,
        Number((this.rateSum[obj[type]] * num) / 100).toFixed(2)
      );
    },
    mysummary({ columns, data }) {
      let sum = ["整盘合计", 0, 0, 0];
      data.forEach((item, index) => {
        if (index == "0") {
          sum["0"] = "整盘合计";
        } else {
          if (item.sales_time !== "首开") {
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
        }
      });
      sum = sum.map((item, index) => {
        if (index) {
          item = item.toFixed(2);
        }
        return item;
      });
      this.targetDataSum = sum;
      return sum;
    },
    delItem(row) {
      let idx = this.targetData.findIndex(
        item => item.sales_time == row.sales_time
      );
      this.targetData.splice(idx, 1);
    },
    addItem() {
      let value = new Date(this.addTime).getFullYear();
      if (value) {
        if (this.targetData.some(i => i.sales_time == value)) {
          this.$message({
            type: "info",
            message: "年份不能重复"
          });
          return;
        } else {
          this.targetData.push({
            sales_time: value
          });
          this.targetData.sort((a, b) => {
            if (a.sales_time > b.sales_time) {
              return 1;
            } else if (a.sales_time < b.sales_time) {
              return -1;
            } else {
              return 0;
            }
          });
          this.$message({
            type: "success",
            message: "添加成功"
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "添加失败"
        });
      }
      this.addTimeFlag = false;
    },
    hidePopover() {
      this.showPopover = false;
    },
    delHouse(idx, obj, index) {
      this.testList__[idx].child.splice(index, 1);
      if (this.testList__[idx].child.length == 1) {
        this.testList__[idx].child = [];
        this.testList__.splice(idx, 1);
      }
      // this.testList__.forEach(lv1 => {
      //   lv1.child.forEach(lv2 => {
      //     if (lv2.product_type == obj.product_type) {
      //       lv1.child.pop();
      //       lv1.child.splice(index, 1);
      //       if (lv1.child.length == 0) {
      //         let idx = this.testList__.findIndex(
      //           item => item.operation_type == lv1.operation_type
      //         );
      //         lv1.child = [];
      //         this.testList__.splice(idx, 1);
      //       }
      //     }
      //   });
      // });
    },
    toPreview() {
      /*this.$router.push({
        path: "/getLandInfo",
        query: {
          project_id: this.$route.query.project_id,
          plan_node_id: this.$route.query.plan_node_id,
          plan_id: this.$route.query.plan_id,
          node_level: this.$route.query.node_level
        }
      });*/

      toHistoryUrl({
        proInstId: this.flow_id
      }).then(res => {
        window.open(res.data);
      });
    },
    setSecondTime(name) {
      if (!this.readonlyFlag) {
        return;
      }
      if (name == "顶设2") {
        this.$notify.warning({
          title: "提示",
          message:
            "根据标准业务时间要求，首开前120天需完成顶设2系统审批，系统根据首开时间自动计算顶设2完成时间，且不可编辑"
        });
      }
    },
    setsumAgian() {
      this.$set(
        this.costData[0],
        "land_front_price",
        Number(
          (this.rateSum.land_front_value * this.costData[1].land_front_per) /
            100
        ).toFixed(2)
      );
      this.$set(
        this.costData[0],
        "will_price",
        Number(
          (this.rateSum.will_front_value * this.costData[1].will_per) / 100
        ).toFixed(2)
      );
      this.$set(
        this.costData[0],
        "land_back_price",
        Number(
          (this.rateSum.land_back_value * this.costData[1].land_per) / 100
        ).toFixed(2)
      );
    },
    //拿地后数据导出
    exportGetLand() {
      var _path;
      let obj = {
        project_id: this.project_id,
        plan_node_id: this.form.versions,
        plan_id: this.$route.query.plan_id,
        light_stuat: status,
        product_set: this.prodSeries,
        projectName: JSON.parse(localStorage.getItem("nowProject")).nowProject
      };
      _path = downLoad("/takeLand/export", obj);
      window.location = _path;
    }
  },
  mounted() {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", this.$router);
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/t_cell.css");
@import url("../../assets/css/getLangOroneMounthd.css");
@import url("../../assets/css/GlobalBtn.less");
@tiTleFontSize: #666666; //拿地后表格Title字体颜色
@ContainerFontSize: #333333; //拿地后内容字体颜色
.getLand {
  padding-bottom: 60px;
  overflow: hidden;
  height: calc(100vh - 40px);
  .meeting {
    height: 40px;
    line-height: 40px;
    background: #fff;
    padding: 0 10px;
    ::v-deep .el-input {
      width: 100px;
    }
  }
  .navbarLink {
    background: #fff;
    margin-top: 5px;
  }
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::v-deep input[type="number"] {
    -moz-appearance: textfield;
  } /* 隐藏滚动条 */
  html::-webkit-scrollbar {
    display: none;
  }
  div {
    box-sizing: border-box;
  }
  ::v-deep .el-dialog__body {
    text-align: center;
  }
  ::v-deep .el-upload-list {
    display: none;
  }
  .headerFixed {
    width: 100%;
    position: fixed;
    height: 100px;
    background: #fff;
    top: 40px;
    z-index: 10;
    .top {
      background: #fff;
      color: #333;
      font-size: 14px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px 0 15px;
      ::v-deep .el-form {
        // position: fixed;
        // top: 40px;
        // z-index: 10;
        width: 40%;
        .el-form-item__label {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500 !important;
          color: rgba(51, 51, 51, 1);
        }
      }
      ::v-deep .el-button {
        height: 30px;
        margin-left: 6px;
      }
      .right-btn {
        position: fixed;
        right: 10px;
        top: 50px;
        z-index: 10;
        .blankBtn {
          .generalBtn(#333333, 500, 12px);
        }
        ::v-deep .el-button--primary {
          .primaryBtn(#fff, 500, 12px);
        }
      }
      ::v-deep .is-top {
        position: fixed;
        top: 90px;
        z-index: 10;
      }
    }
    .isViewFixed {
      position: absolute;
      left: auto;
      z-index: 12;
      width: 100%;
      top: 50px;
    }
  }
  ::v-deep .el-tabs__nav-wrap::after {
    display: none;
  }
  ::v-deep .el-tabs__active-bar {
    display: none;
  }
  .MarginNull {
    height: 100px;
  }
  .containter {
    padding-bottom: 60px;
    margin: 10px;
    overflow-y: auto;
    height: calc(100vh - 160px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    border: 1px solid rgba(216, 216, 216, 0.34);
    p {
      color: #333333;
      font-weight: 700 !important;
      font-family: PingFangSC-Medium, PingFang SC;
    }
    ::v-deep .el-tabs {
      width: 100%;
      padding: 0 10px;
      background: #fff;
    }
    .structure {
      padding: 0 10px;
      margin: 20px 0;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
      border-radius: 6px;
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
        .left_t {
          width: 370px;
          margin-bottom: 16px;
          color: @tiTleFontSize;
          .t_header {
            height: 80px;
            line-height: 80px;
            text-align: center;
            display: flex;
            background: rgba(246, 248, 253, 1);
            border-bottom: 1px solid rgba(239, 239, 239, 1);
            border-left: 1px solid rgba(239, 239, 239, 1);
            border-top: 1px solid rgba(239, 239, 239, 1);

            > div:first-child {
              width: 120px;
            }
            > div:nth-child(2) {
              flex: 1;
              border-left: 1px solid #ebeef5;
              border-right: 1px solid #ebeef5;
            }
          }
          .t_body {
            .t-cell:last-child {
              height: 50px !important;
            }
            .t_cell {
              display: flex;
              background: #f5f7fa;
              border-left: 1px solid #ebeef5;
              border-right: 1px solid #ebeef5;
              border-bottom: 1px solid #ebeef5;
              > div:first-child {
                width: 120px;
                min-width: 120px;
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
                // color: #909399;
                text-align: center;
                .t_header {
                  height: 40px;
                  line-height: 40px;
                  // color: #909399;
                  background: rgba(246, 248, 253, 1);
                  border-bottom: 1px solid rgba(239, 239, 239, 1);
                  border-right: 1px solid rgba(239, 239, 239, 1);
                  // text-indent: 4px;
                  padding: 0 10px;
                  border-top: 1px solid #efefef;
                }
                .t_title,
                .t_header {
                  color: @tiTleFontSize !important; //拿地后表格Title字体
                }
                .t_body {
                  display: flex;
                  > div {
                    flex: 1;
                    height: 40px;
                    line-height: 40px;
                    .t_cell {
                      color: @ContainerFontSize;
                      height: 40px;
                      line-height: 40px;
                      border-bottom: 1px solid #ebeef5;
                      font-size: 14px;
                      // color: #909399;
                      .el-input__inner {
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
      .amendStyle {
        background: rgba(246, 248, 253, 1);
        // width: 160px !important;
        padding: 0 10px !important;
      }
    }
    .house {
      padding: 0 10px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
      border-radius: 6px;
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
        .left_t {
          color: @tiTleFontSize;
          width: 370px;
          margin-bottom: 16px;
          .t_header {
            height: 80px;
            line-height: 80px;
            text-align: center;
            display: flex;
            border: 1px solid #ebeef5;
            background: #f5f7fa;
            // color: #909399;
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
              // color: #909399;
              border-left: 1px solid #ebeef5;
              border-right: 1px solid #ebeef5;
              border-bottom: 1px solid #ebeef5;

              > div:first-child {
                width: 120px;
                text-align: center;
                border-right: 1px solid #ebeef5;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
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
            // color: #909399;
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
        }
        .right_t {
          color: @ContainerFontSize;
          flex: 1;
          overflow: hidden;
          .scrollBox {
            overflow: auto;
            height: 100%;
            width: 100%;

            > div {
              display: flex;
              width: 100%;
              > div {
                width: 100%;
                // color: #909399;
                text-align: center;
                .t_header {
                  height: 40px;
                  line-height: 40px;
                  // color: #909399;
                  background: #f5f7fa;
                  // width: 30%;
                  background: rgba(246, 248, 253, 1);
                  border-bottom: 1px solid rgba(239, 239, 239, 1);
                  border-left: 1px solid rgba(239, 239, 239, 1);
                  border-top: 1px solid rgba(239, 239, 239, 1);
                  padding: 0 10px;
                }
                .t_title {
                  padding: 0 10px;
                  background: rgba(246, 248, 253, 1);
                }
                .t_title,
                .t_header {
                  color: @tiTleFontSize !important; //拿地后表格Title字体
                }
                .t_body {
                  display: flex;
                  > div {
                    flex: 1;
                    height: 40px;
                    line-height: 40px;
                    .t_cell {
                      height: 40px;
                      line-height: 40px;
                      border-right: 1px solid #ebeef5;
                      border-bottom: 1px solid #ebeef5;

                      font-size: 14px;
                      // color: #909399;
                      .el-input__inner {
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
        color: #333;
      }
      ::v-deep .el-input {
        width: 150px;
      }
      ::v-deep .is-leaf {
        color: @tiTleFontSize !important;
      }
      ::v-deep .el-table__fixed-right {
        margin-right: 12px;
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
        span {
          float: right;
          color: #999;
          font-size: 12px;
        }
      }
      ::v-deep .el-input__inner {
        width: 100px;
      }
      ::v-deep .is-leaf {
        color: @tiTleFontSize !important;
      }
      ::v-deep .el-table__footer-wrapper {
        td {
          .cell {
            color: #333;
          }
        }
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
      ::v-deep .el-table--border {
        text-align: center !important;
      }
      .el-input__inner {
        width: 100px;
      }
      // .cell span {
      // }
      // ::v-deep .el-table th {
      //   color: @tiTleFontSize !important;
      // }
      // ::v-deep .el-table_3_column_7 {
      //   color: @tiTleFontSize !important;
      // }
      ::v-deep .is-center {
        border-left: 1px solid #ebeef5 !important;
      }
      ::v-deep .el-input__inner {
        width: 110px;
      }
      ::v-deep .el-table_3_column_9 .el-input__inner {
        margin-left: -10px;
      }
      ::v-deep .el-table_3_column_9 .cell span {
        // margin-right: 100px;
        margin-left: -90px;
      }
      ::v-deep .el-table_3_column_10 .cell span {
        // margin-right: 100px;
        margin-left: -80px;
      }
      ::v-deep .el-table_3_column_11 .cell span {
        // margin-right: 100px;
        margin-left: -80px;
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
        // left: -5px;
        ::v-deep .el-upload-list {
          position: absolute;
          top: 0;
          left: -100%;
          z-index: 10;
        }
      }
      ::v-deep .el-table th:first-child .cell:first-child {
        text-indent: 8px;
      }
      ::v-deep .el-table_4_column_11 {
        color: @ContainerFontSize;
      }
      ::v-deep .is-leaf {
        color: @tiTleFontSize !important;
      }
      ::v-deep .el-button--text {
        margin-left: -15px;
      }
    }
  }
  .bottom {
    text-align: center;
    height: 60px;
    line-height: 60px;
    background: #fff;
    margin: 0 15px;
    position: fixed;
    bottom: 0;
    width: 100%;
    transform: translateX(-50%);
    left: 50%;
    text-align: center;
    z-index: 100;
    ::v-deep .el-button {
      height: 30px;
    }
  }
  .targetTime {
    width: 200px;
  }
  .btns {
    margin: 0;
  }
  .tabsFlxed {
    display: inline-block;
    position: fixed;
    top: 90px;
    z-index: 10;
    background: #fff;
    margin-left: 2px;
    ::v-deep .is-active::after {
      content: "";
      display: block;
      position: absolute;
      width: 26px;
      background: #2761ff;
      bottom: 1px;
      left: 50%;
      height: 3px;
      transform: translateX(-50%);
    }
    ::v-deep .is-active {
      font-weight: 700;
    }
  }
  .navbarLink ::v-deep .el-tabs__nav {
    border-bottom: 1px solid #ebeef5;
  }
  .amendStyles {
    background: rgba(246, 248, 253, 1) !important;
  }
  // ::v-deep .el-table th>.cell{
  //   color: @tiTleFontSize;
  // }
  // .el-table tbody td>div.cell {
  //   color: @ContainerFontSize;
  // }
  ::v-deep .has-gutter {
    td {
      background: #fff;
    }
  }
  ::v-deep .el-input__inner {
    color: #333333;
    font-size: 14px !important;
  }
}
</style>
