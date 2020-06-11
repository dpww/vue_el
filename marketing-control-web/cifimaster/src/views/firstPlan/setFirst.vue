<template>
  <div class="setFirst">
    <navbarLink></navbarLink>
    <div class="headerFixed">
      <div class="top" v-if="isType != 'view'">
        <div class="right-btn">
          <el-button @click="$router.push({ path: '/planWrite' })">返回列表</el-button>
          <el-button @click="toPreview" v-if="!readonlyFlag">查看审批</el-button>
          <el-button class="btns" @click="exportGetLand">导出</el-button>
          <!-- <el-button>导出</el-button> -->
          <el-button
            type="primary"
            v-show="!this.$route.query.disabled"
            v-if="isNewType != 1"
            @click="addVersion"
          >创建版本</el-button>
        </div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="选择版本:">
            <el-select v-model="form.versions" @change="changeVersions">
              <el-option
                :label="item.version"
                v-for="(item, index) in versionList"
                :key="index"
                :value="item.plan_node_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="tabsFlxed">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="货值结构" name="structure"></el-tab-pane>
          <el-tab-pane label="户型配比及户型定位" name="house"></el-tab-pane>
          <el-tab-pane label="时间节点" name="time"></el-tab-pane>
          <el-tab-pane label="销售目标" name="target"></el-tab-pane>
          <el-tab-pane label="附件清单" name="accessory"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="null" style="height:100px" v-if="isType == 'view'"></div>
    <div v-else style="height:100px"></div>
    <div class="containter" id="containter">
      <div class="meeting" v-if="readonlyFlag">
        产品系 :
        <el-select v-model="prodSeries" placeholder="请选择">
          <el-option
            v-for="item in prodSeriesList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>过会次数 :
        <el-input
          type="number"
          v-only-number="{ min: 0 }"
          @input.native="meetingNum = parseInt(meetingNum)"
          v-model="meetingNum"
        ></el-input>次
      </div>
      <div class="meeting" v-else>
        <!-- 产品系 :{{prodSeries=='null'?"":prodSeries}} 过会次数 :{{meetingNum=='null'?'':meetingNum}}次 -->
        产品系 :
        <el-select v-model="prodSeries" :disabled="true" placeholder="请选择">
          <el-option
            v-for="item in prodSeriesList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>过会次数 :
        <el-input
          :readonly="true"
          type="number"
          v-only-number="{ min: 0 }"
          @input.native="meetingNum = parseInt(meetingNum)"
          v-model="meetingNum"
        ></el-input>次
      </div>
      <div class="structure" id="structure">
        <p>
          货值结构
          <el-button type="text" @click="addDialog = true" v-if="readonlyFlag">添加</el-button>
        </p>
        <div class="table">
          <div class="left_t">
            <div class="t_header">
              <div>业态类型</div>
              <div>产品类型</div>
            </div>
            <div class="t_body">
              <div
                style="background:rgba(246, 248, 253, 1)"
                class="t_cell"
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
                      v-if="
                        obj.obj.is_del &&
                          obj.product_type !== '小计' &&
                          readonlyFlag
                      "
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
                  <div class="t_header">拿地后(投资系统)</div>
                  <div class="t_body">
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:110px;">建筑面积(m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span>{{ obj.obj.land_back_area | fixed }}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:160px;">整盘均价(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
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
                      <div class="t_cell t_title amendStyle" style="width:160px;">开盘价格(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <span v-else>
                            {{
                            obj.obj.land_back_open_price | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:200px;">精装成本标准(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <span v-else>
                            {{
                            obj.obj.land_back_cost_standard | fixed
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
                <div>
                  <div class="t_header t_title">顶设1</div>
                  <div class="t_body">
                    <div>
                      <div
                        class="t_cell amendStyle"
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
                            v-model="obj.obj.designone_area"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            @blur="sumSpan"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.designone_area | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:160px;">整盘均价(元/m²)</div>
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
                            v-model="obj.obj.designone_avg_price"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            @blur="sumSpan"
                          >
                            <!--
                              @change.native="obj.obj.designone_avg_price=parseInt(obj.obj.designone_avg_price)"
                            -->
                          </el-input>
                          <span v-else>
                            {{
                            obj.obj.designone_avg_price | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:110px;">货值(万元)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span>
                            {{
                            obj.obj.designonel_front_value | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:160px;">开盘价格(元/m²)</div>
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
                            v-model="obj.obj.designone_front_open_price"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            @blur="sumSpan"
                          >
                            <!--
                             @input.native="obj.obj.designone_front_open_price=parseInt(obj.obj.designone_front_open_price)"
                            -->
                          </el-input>
                          <span v-else>
                            {{
                            obj.obj.designone_front_open_price | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:200px;">精装成本标准(元/m²)</div>
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
                            v-model="obj.obj.designonel_front_cost_standard"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            @blur="sumSpan"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.designonel_front_cost_standard | fixed
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
                            v-model="obj.obj.designone_front_avg_flow"
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            @blur="sumSpan"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.designone_front_avg_flow | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="t_header">顶设1VS投资拿地后版</div>
                  <div class="t_body">
                    <div>
                      <div
                        class="t_cell t_title amendStyle"
                        style="width:180px;border-left:1px solid #ebeef5"
                      >整盘均价偏差(元/㎡)</div>
                      <div
                        style="border-left:1px solid #ebeef5"
                        v-for="(item, idx) in prodList"
                        :key="idx"
                      >
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <span v-else>
                            {{
                            obj.obj.vs_all_avg_price | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:140px;">货值偏差(万元)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span>{{ obj.obj.vs_value_price | fixed }}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:180px;">开盘价格偏离(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <span v-else>
                            {{
                            obj.obj.vs_open_price | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title amendStyle" style="width:140px;">精装偏差(元/m²)</div>
                      <div v-for="(item, idx) in prodList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <span v-else>
                            {{
                            obj.obj.vs_hardcover_price | fixed
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
              <div :class="readonlyFlag ? 'edit-box' : ''">
                <div>
                  <div class="t_header">拿地后(投资系统)</div>
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
                          <span v-else>
                            {{
                            isNaN(obj.obj.land_back_room_area)
                            ? 0.0
                            : obj.obj.land_back_room_area | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title">户数(个)</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span>
                            {{
                            isNaN(obj.obj.land_back_room_num)
                            ? 0
                            : obj.obj.land_back_room_num
                            }}
                          </span>
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
                          <span v-else>
                            {{
                            isNaN(obj.obj.land_back_room_per)
                            ? 0
                            : obj.obj.land_back_room_per + '%'
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="t_header">顶设1</div>
                  <div class="t_body">
                    <div>
                      <div
                        style="width:110px;border-left:1px solid #ebeef5"
                        class="t_cell t_title"
                      >户型面积(m²)</div>
                      <div
                        style="border-left:1px solid #ebeef5"
                        v-for="(item, idx) in houseList"
                        :key="idx"
                      >
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            type="number"
                            v-only-number="{ min: 0, precision: 2 }"
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.designone_room_area"
                            @blur="getSum"
                          ></el-input>
                          <span v-else>
                            {{
                            isNaN(obj.obj.designone_room_area)
                            ? 0.0
                            : obj.obj.designone_room_area | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title">户数(个)</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <el-input
                            type="number"
                            v-only-number="{ min: 0 }"
                            v-if="
                              obj.product_type !== '小计' &&
                                item.operation_type !== '合计' &&
                                readonlyFlag
                            "
                            v-model="obj.obj.designone_room_num"
                            @input.native="
                              obj.obj.designone_room_num = parseInt(
                                obj.obj.designone_room_num
                              )
                            "
                            @blur="getSum"
                          ></el-input>
                          <span v-else>
                            {{
                            isNaN(obj.obj.designone_room_num)
                            ? 0
                            : obj.obj.designone_room_num
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title" style="width:100px">户数配比(%)</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <!-- <el-input
                            type="number"
                            v-only-number="{min:0, precision:2}"
                            v-if="obj.product_type!=='小计'&&item.operation_type!=='合计'&&readonlyFlag"
                            v-model="obj.obj.designone_room_per"
                            @blur="getSum"
                          ></el-input>-->
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <span v-else>
                            {{
                            isNaN(obj.obj.designone_room_per)
                            ? 0
                            : obj.obj.designone_room_per + '%'
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title" style="min-width:150px">户型功能</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <el-input
                            ref="isTrim"
                            v-if="
                              obj.product_type !== '小计' &&
                                item.operation_type !== '合计' &&
                                readonlyFlag
                            "
                            v-model="obj.obj.designone_room_fun"
                            @blur="getSum"
                            @focus="openHouseFunction(obj.obj)"
                          ></el-input>
                          <span
                            v-else-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >
                            <!-- {{isNaN(Number(obj.obj.designone_room_fun))?"":obj.obj.designone_room_fun | fixedOne}} -->
                          </span>
                          <span v-else>{{ obj.obj.designone_room_fun }}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style="min-width:150px" class="t_cell t_title">南面宽数(个)</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <el-input
                            type="number"
                            v-if="
                              obj.product_type !== '小计' &&
                                item.operation_type !== '合计' &&
                                readonlyFlag
                            "
                            v-model="obj.obj.designone_south_num"
                            @blur="getSum"
                            v-only-number="{ min: 0, precision: 1 }"
                          ></el-input>

                          <!-- <el-select
                            v-if="obj.product_type!=='小计'&&item.operation_type!=='合计'&&readonlyFlag"
                            v-model="obj.obj.designone_south_num"
                            placeholder="请选择"
                            class="southNum"
                          >
                            <el-option label="0" value="0"></el-option>
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                            <el-option label="3" value="3"></el-option>
                            <el-option label="4" value="4"></el-option>
                            <el-option label="5" value="5"></el-option>
                            <el-option label="5以上" value="5以上"></el-option>
                          </el-select>-->
                          <span
                            v-else-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >
                            <!-- {{isNaN(Number(obj.obj.designone_south_num))?"":obj.obj.designone_south_num | fixedOne}} -->
                          </span>
                          <span v-else>{{ obj.obj.designone_south_num }}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title">梯户数</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <el-input
                            @input="
                              obj.obj.vs_designone_door_num = obj.obj.vs_designone_door_num.replace(
                                /[^\w]/gi,
                                ''
                              )
                            "
                            v-else-if="readonlyFlag"
                            v-model="obj.obj.vs_designone_door_num"
                            @blur="getSum"
                          ></el-input>
                          <span v-else>
                            {{
                            obj.obj.vs_designone_door_num
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="t_header">顶设1版VS拿地后版</div>
                  <div class="t_body">
                    <div>
                      <div style="border-left:1px solid #ebeef5" class="t_cell t_title">户型面积(m²)</div>
                      <div
                        style="border-left:1px solid #ebeef5"
                        v-for="(item, idx) in houseList"
                        :key="idx"
                      >
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span
                            v-if="
                              obj.product_type == '小计' ||
                                item.operation_type == '合计'
                            "
                          >--</span>
                          <span v-else>
                            {{
                            isNaN(obj.obj.vs_designone_room_area)
                            ? 0.0
                            : obj.obj.vs_designone_room_area | fixed
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="t_cell t_title">户数(个)</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <span>
                            {{
                            isNaN(obj.obj.vs_designone_room_num)
                            ? 0
                            : obj.obj.vs_designone_room_num
                            }}
                          </span>
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
                          <span v-else>
                            {{
                            isNaN(obj.obj.vs_designone_room_per)
                            ? 0
                            : obj.obj.vs_designone_room_per  + '%'
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="readonlyFlag" class="opt-bar">
                  <div class="t_header"></div>
                  <div class="t_body">
                    <div>
                      <div class="t_cell t_title">操作</div>
                      <div v-for="(item, idx) in houseList" :key="idx">
                        <div class="t_cell" v-for="(obj, index) in item.child" :key="index">
                          <!-- v-if="obj.obj.is_del&&obj.product_type!=='小计'&&item.operation_type!=='合计'" -->
                          <el-button
                            type="text"
                            v-if="
                              obj.obj.is_del &&
                                obj.product_type !== '小计' &&
                                item.operation_type !== '合计'
                            "
                            @click="delHouse(idx, obj, index)"
                            :readonly="plan_approval == 4"
                          >删除</el-button>
                          <span v-else></span>
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
          <el-table-column prop="time" label="时间" align="center" width="170" fixed="right">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.time"
                format="yyyy-MM-dd"
                :disabled="true"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="target" id="target">
        <p>
          销售目标
          <span style="float:right;color:#999999;font-weight:400;font-size:12px">(单位:万元)</span>
        </p>
        <el-table
          :data="targetData"
          style="width: 100%"
          :summary-method="mysummary"
          show-summary
          border
          :header-cell-style="{
            background: 'rgba(246,248,253,1)',
            color: '#999'
          }"
        >
          <el-table-column prop="sales_time" label="时间" align="center"></el-table-column>
          <el-table-column prop="land_front_price" label="拿地前(营销内控版)" align="center">
            <template slot-scope="scope">
              {{
              scope.row.land_front_price | fixed
              }}
            </template>
          </el-table-column>
          <el-table-column prop="will_price" label="上会版(投资系统)" align="center">
            <template slot-scope="scope">
              {{
              scope.row.will_price | fixed
              }}
            </template>
          </el-table-column>
          <el-table-column prop="land_back_price" label="拿地后(投资系统)" align="center">
            <template slot-scope="scope">
              {{
              scope.row.land_back_price | fixed
              }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop label="操作" align="center" v-if="readonlyFlag">
            <template slot-scope="scope">
              <div>
                <el-button
                  v-if="scope.row.sales_time!='首开'"
                  type="text"
                  @click="delItem(scope.row)"
                >删除</el-button>
                <el-button v-if="scope.row.sales_time=='首开'" type="text" @click="addItem">添加</el-button>
              </div>
            </template>
          </el-table-column>-->
        </el-table>
      </div>
      <div class="accessory" id="accessory">
        <p>附件清单</p>
        <el-table
          :data="accessoryData"
          style="width: 100%"
          :header-cell-style="{ background: '#F5F7FA', color: '#999' }"
        >
          <el-table-column prop="type" label="附件名称" align="left" width="200"></el-table-column>
          <el-table-column prop="name" label="附件" align="left">
            <template slot-scope="scope">
              <a :href="local + scope.row.url">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="status" label="状态" align="center"></el-table-column> -->
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <div class="fileBox" v-if="scope.$index < accessoryData.length - 1">
                <el-upload
                  :on-exceed="exceed"
                  :action="action"
                  :data="{
                    filePath: 'setFirst',
                    bizID: '',
                    orderIndex: scope.$index
                  }"
                  :on-success="fileSuccess"
                  :file-list="fileList__[scope.$index]"
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
                    filePath: 'setFirst',
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
    <div class="null"></div>
    <div class="bottom" v-if="isType != 'view' && readonlyFlag">
      <el-button
        type="primary"
        v-if="$store.state.user.userPower.includes('提交审批')"
        @click="update('3')"
      >提交审批</el-button>
      <el-button class="blankBtn" type @click="update('1')">保存</el-button>
      <el-button class="blankBtn" type v-if="isShowKS" @click="update('4')">快速审批</el-button>
    </div>
    <el-dialog title="添加货值结构" :visible.sync="addDialog">
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
    <el-dialog title="填写户型功能" class="functionDialog" center :visible.sync="HouseFunctionFlag">
      <el-input
        class="functionInput"
        type="number"
        v-only-number="{ min: 0, precision: 1 }"
        @paste.native.capture.prevent="handlePaste"
        v-model="houseFunctionForm.bedroom"
      ></el-input>室
      <el-input
        class="functionInput"
        type="number"
        v-only-number="{ min: 0, precision: 1 }"
        @paste.native.capture.prevent="handlePaste"
        v-model="houseFunctionForm.livingroom"
      ></el-input>厅
      <el-input
        class="functionInput"
        type="number"
        v-only-number="{ min: 0, precision: 1 }"
        @paste.native.capture.prevent="handlePaste"
        v-model="houseFunctionForm.toilet"
      ></el-input>卫
      <div slot="footer" class="dialog-footer">
        <el-button @click="HouseFunctionFlag = false">取 消</el-button>
        <el-button type="primary" @click="setHouseFunction">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  insertTopOne,
  getDicByCodeLevelList,
  selectNodeVersion,
  queryTakeLands,
  queryValueStructure,
  queryPlanNodeId,
  queryApartment,
  queryTimeNode,
  queryTopOne,
  get
} from "@/api/firstPlan";
import { queryFlowId, toHistoryUrl } from "@/api/offerFlow";
import { downLoad } from "../../api/request";

export default {
  components: {
    navbarLink: () => import("./components/navbarLink")
  },
  filters: {
    fixed(data) {
      if (!data) {
        return "0.00";
      }
      return Number(data).toFixed(2);
    }
  },
  data() {
    return {
      isType: "",
      houseFunctionForm: {
        bedroom: "",
        livingroom: "",
        toilet: ""
      },
      functionRow: null,
      addDialog: false,
      isShowKS: location.origin.includes("uat"),
      addHouseDialog: false,
      plan_approval: "",
      isNew: "",
      flow_id: "",
      isNewType: 0,
      prodSeriesList: [
        { label: "L", value: "L" },
        { label: "H", value: "H" },
        { label: "G", value: "G" },
        { label: "T", value: "T" }
      ],
      prodSeries: "",
      meetingNum: "",
      fileList: [],
      fileList__: [],
      HouseFunctionFlag: false,
      addform: {},
      addform__: {},
      testList: [],
      testList__: [],
      fileHeight: 1,
      otherIndex: 4,
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
      optionList: [],
      allOption: [],
      versionList: []
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
          if (lv2.obj.designone_area && lv2.obj.designone_avg_price) {
            let designonel_front_value =
              (Number(lv2.obj.designone_area) *
                Number(lv2.obj.designone_avg_price)) /
              10000;
            lv2.obj.designonel_front_value = isNaN(designonel_front_value)
              ? 0.0
              : designonel_front_value.toFixed(2);
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
          let designone_room_per =
            (Number(lv2.obj.designone_room_num) /
              Number(littleSum.designone_room_num)) *
            100;
          lv2.obj.designone_room_per = isNaN(designone_room_per)
            ? 0
            : designone_room_per.toFixed(0);

          let land_back_room_per =
            (Number(lv2.obj.land_back_room_num) /
              Number(littleSum.land_back_room_num)) *
            100;
          lv2.obj.land_back_room_per = isNaN(land_back_room_per)
            ? 0
            : land_back_room_per.toFixed(0);

          lv2.obj.vs_designone_room_per =
            Number(lv2.obj.designone_room_per) -
            Number(lv2.obj.land_back_room_per);
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
        if (res.data[0].plan_approval == 2 || res.data[0].plan_approval === 3) {
          this.isNewType = 1;
        }
      } else {
        this.isNewType = 1;
      }
      this.selectTakeLand();
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
    fileError() {
      this.$message.error("上传失败");
    },
    changeVersions() {
      let idx = this.versionList.findIndex(
        item => item.plan_node_id == this.form.versions
      );
      this.plan_approval = this.versionList[idx].plan_approval;
      this.isNew = "";
      this.selectTakeLand();
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
          this.isNewType = 1;
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
          this.form.versions = "";
          this.isNew = "创建新版";
          this.plan_approval = "1";
          (this.accessoryData = [
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
          ]),
            this.selectTakeLand();
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
      // this.$confirm("此操作同时会删除户型配比中的产品类型, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
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
      // let _inds = [];
      // let _ind = "";
      // this.testList__.forEach((lv1, ind) => {
      //   lv1.child.forEach((lv2, i) => {
      //     if (lv2.product_type == obj.product_type) {
      //       // lv1.child.pop();
      //       _inds.push(i);
      //       _ind = ind;
      //     }
      //   });
      // });
      // _inds.map(item => {
      //   this.testList__[_ind].child.splice(item, 1);
      //   if (this.testList__[_ind].child.length <= 1) {
      //     let idx = this.testList__.findIndex(
      //       item =>
      //         item.operation_type == this.testList__[_ind].operation_type
      //     );
      //     this.testList__[_ind].child = [];
      //     this.testList__.splice(idx, 1);
      //   }
      // });
      this.$message({
        type: "success",
        message: "删除成功!"
      });
      // })
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消删除"
      //   });
      // });
    },
    reloadVersion() {},
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
            is_del: true,
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
            land_back_area: "0",
            land_back_avg_price: "0",
            land_back_value: "0",
            land_back_open_price: "0",
            land_back_cost_standard: "0",
            land_back_avg_flow: "0",
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
                is_del: true,
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
                land_back_area: 0,
                land_back_avg_price: 0,
                land_back_value: 0,
                land_back_open_price: 0,
                land_back_cost_standard: 0,
                land_back_avg_flow: 0
                // designone_area: "",
                // designone_avg_price: "",
                // designonel_front_value: "",
                // designone_front_open_price: "",
                // designonel_front_cost_standard: "",
                // designone_front_avg_flow: "",
                // vs_all_avg_price: "",
                // vs_value_price: "",
                // vs_open_price: "",
                // vs_hardcover_price: ""
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
            is_del: true,
            land_back_room_area: 0,
            land_back_room_num: 0,
            land_back_room_per: 0,
            designone_room_area: "",
            designone_room_num: "",
            designone_room_per: "",
            designone_room_fun: "",
            designone_south_num: "",
            vs_designone_door_num: "",
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
                is_del: true,
                land_back_room_area: 0,
                land_back_room_num: 0,
                land_back_room_per: 0,
                designone_room_area: "",
                designone_room_num: "",
                designone_room_per: "",
                designone_room_fun: "",
                designone_south_num: "",
                vs_designone_door_num: "",
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
    tabClick(tab, event) {
      document.querySelector('#containter').scrollTop=document.getElementById(tab.name).offsetTop-100
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
      let tollerlist = [...this.prodList];
      let roomlist = [...this.houseList];
      tollerlist.pop();
      roomlist.pop();
      //必填校验
      if (status == "3" || status == "4") {
        //过会次数
        if (!this.meetingNum && this.meetingNum !== 0) {
          this.$message({
            type: "error",
            message: "过会次数未填写"
          });
          return;
        }
        //货值结构
        let nameCheckList = [
          "designone_area",
          "designone_avg_price",
          "designone_front_avg_flow",
          "designone_front_open_price",
          "designonel_front_cost_standard"
        ];
        if (tollerlist.length == 0) {
          this.$message({
            type: "error",
            message: "货值结构不能为空!"
          });
          return;
        }
        let tollerflag = true;
        tollerlist.forEach(lv1 => {
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
        let roomNameList = [
          "designone_room_area",
          "designone_room_fun",
          "designone_room_num",
          "designone_south_num",
          "vs_designone_door_num"
        ];
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
        //附件上传
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

      insertTopOne({
        timeNode: time,
        sales: this.targetData,
        tollerlist,
        roomlist,
        isNew: this.isNew,
        project_id: this.project_id,
        plan_node_id: this.form.versions,
        plan_id: this.$route.query.plan_id,
        light_stuat: status,
        fileList: this.accessoryData,
        browse_num: this.meetingNum,
        product_set: this.prodSeries
      }).then(res => {
        if (res.code == 200) {
          if (status == "1") {
            this.$message.success("保存草稿成功");
          } else if (status == "3") {
            get(
              `/Workflow/MTStart2.aspx?BSID=FP&BTID=skcslc&BOID=${res.result.json_id}&UserID=${res.result.creator}&LoginKey=''`
            ).then(res => {
              window.open(res.data);
              // this.$router.push("planWrite");
            });
          } //快速审批
          else if (status == "4") {
            var hht =
              this.local +
              "/#/firstPlanPreview?BOID=" +
              res.result.json_id +
              "&t=1585017217401&isKSAP=1";
            window.open(hht);
          }
          if (status == "3" || status == "4") {
            this.$router.push("planWrite");
          } else if (this.isNew === "创建新版") {
            this.isNew = "";
            this.$router.go(0);
          }
        } else {
          this.$message.error("保存失败，请联系管理员");
        }
      });
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
    },
    sumSpan() {
      this.testList.forEach(lv1 => {
        lv1.child.forEach(lv2 => {
          let vs_all_avg_price = Number(lv2.obj.land_back_avg_price);
          if (!isNaN(Number(lv2.obj.designone_avg_price))) {
            vs_all_avg_price =
              Number(lv2.obj.designone_avg_price) -
              Number(lv2.obj.land_back_avg_price);
          }
          lv2.obj.vs_all_avg_price = vs_all_avg_price;

          let vs_value_price = Number(lv2.obj.land_back_value);
          console.log(lv2.obj.designonel_front_value,"lv2.obj.designonel_front_value");

          if (!isNaN(Number(lv2.obj.designonel_front_value))) {
            vs_value_price =
              Number(lv2.obj.designonel_front_value) -
              Number(lv2.obj.land_back_value);
          }
          lv2.obj.vs_value_price = vs_value_price.toFixed(2);

          let vs_open_price = Number(lv2.obj.land_back_open_price);
          if (!isNaN(Number(lv2.obj.designone_front_open_price))) {
            vs_open_price =
              Number(lv2.obj.designone_front_open_price) -
              Number(lv2.obj.land_back_open_price);
          }
          lv2.obj.vs_open_price = vs_open_price.toFixed(2);

          let vs_hardcover_price = Number(lv2.obj.land_back_cost_standard);
          if (!isNaN(Number(lv2.obj.designonel_front_cost_standard))) {
            vs_hardcover_price =
              Number(lv2.obj.designonel_front_cost_standard) -
              Number(lv2.obj.land_back_cost_standard);
          }
          lv2.obj.vs_hardcover_price = vs_hardcover_price.toFixed(2);
        });
      });
    },
    getSum() {
      this.testList__.forEach(lv1 => {
        let sum = lv1.child[lv1.child.length - 1].obj.designone_room_num;
        lv1.child.forEach(lv2 => {
          let designone_room_per = (lv2.obj.designone_room_num * 100) / sum;
          lv2.obj.designone_room_per = isNaN(designone_room_per)
            ? 0
            : designone_room_per.toFixed(0);

          if (!isNaN(lv2.obj.designone_room_num)) {
            lv2.obj.vs_designone_room_num =
              Number(lv2.obj.designone_room_num) -
              Number(lv2.obj.land_back_room_num);
          } else {
            lv2.obj.vs_designone_room_num = Number(lv2.obj.land_back_room_num);
          }
          let vs_designone_room_area = isNaN(
            Number(lv2.obj.land_back_room_area)
          )
            ? 0
            : Number(lv2.obj.land_back_room_area);

          if (!isNaN(lv2.obj.designone_room_area)) {
            vs_designone_room_area =
              Number(lv2.obj.designone_room_area) -
              Number(lv2.obj.land_back_room_area);
          }
          lv2.obj.vs_designone_room_area = vs_designone_room_area.toFixed(2);
          if (!isNaN(lv2.obj.designone_room_per)) {
            lv2.obj.vs_designone_room_per =
              Number(lv2.obj.designone_room_per) -
              Number(lv2.obj.land_back_room_per);
          } else {
            lv2.obj.vs_designone_room_per = Number(lv2.obj.land_back_room_per);
          }
        });
      });
    },
    toPreview() {
      toHistoryUrl({
        proInstId: this.flow_id
      }).then(res => {
        window.open(res.data);
      });
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
      return sum;
    },
    selectTakeLand() {
      queryTopOne({
        project_id: this.$route.query.project_id,
        plan_id: this.$route.query.plan_id,
        node_level: this.$route.query.node_level,
        plan_node_id: this.form.versions,
        isNew: this.isNew
      }).then(res => {
        if (!res.result) return;
        let arr = res.result.tollerMap;
        let land_arr = res.result.LandMap.tollerMap || [];
        arr.forEach(lv1 => {
          let conarr = land_arr.filter(
            i => i.operation_type == lv1.operation_type
          );
          lv1.child.forEach(lv2 => {
            if (conarr.length) {
              conarr[0].child.map(n => {
                if (!lv2.takeLandId) lv2.is_del = true;
              });
            }
            lv2.obj = { ...lv2 };
          });
        });
        this.testList = arr;
        let arr1 = res.result.roomlist || [];
        let land_arr1 = res.result.LandMap.roomlist || [];
        arr1.forEach(lv1 => {
          let conarr1 = land_arr1.filter(
            i => i.operation_type == lv1.operation_type
          );
          lv1.child.forEach(lv2 => {
            if (conarr1.length) {
              conarr1[0].child.map(n => {
                if (!lv2.takeLandId) lv2.is_del = true;
              });
            }
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
        if (arr5 != null && arr5.length > 0) {
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
        let arr6 = res.result.numberList;
        if (arr6.length > 0) {
          if (arr6[0].numTopOne >= 1) {
            this.isNewType = 1;
          }
        }
        this.meetingNum =
          res.result.browse_num == "null" ? "" : res.result.browse_num;
        this.prodSeries =
          res.result.product_set == "null" ? "" : res.result.product_set;
      });
    },
    delFielList(idx) {
      let namelist = [
        "《顶设1报告》",
        "《定位成果表》",
        "《投资交底表》",
        "《顶设1会议纪要》"
      ];
      if (idx <= 3) {
        this.accessoryData.splice(idx, 1, {
          type: namelist[idx],
          handle: "上传"
        });
      } else {
        this.accessoryData.splice(idx, 1);
      }
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
            is_del: true,
            // room_area: "0",
            // room_num: "0",
            // room_per: "0",
            operation_type_code: proCode,
            product_type_code: dicCode,
            designone_room_area: "0",
            designone_room_fun: "",
            designone_room_num: "0",
            designone_room_per: "0",
            designone_south_num: "0",
            land_back_room_area: "0",
            land_back_room_num: "0",
            land_back_room_per: "0",
            vs_designone_door_num: "0",
            vs_designone_room_area: "0",
            vs_designone_room_num: "0",
            vs_designone_room_per: "0"
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
                is_del: true,
                // room_area: "0",
                // room_num: "0",
                // room_per: "0",
                operation_type_code: proCode,
                product_type_code: dicCode,
                designone_room_area: "0",
                designone_room_fun: "",
                designone_room_num: "0",
                designone_room_per: "0",
                designone_south_num: "0",
                land_back_room_area: "0",
                land_back_room_num: "0",
                land_back_room_per: "0",
                vs_designone_door_num: "0",
                vs_designone_room_area: "0",
                vs_designone_room_num: "0",
                vs_designone_room_per: "0"
              }
            }
          ]
        });
      }

      this.addform__ = {};
      this.addHouseDialog = false;
    },
    fileRemove(file, fileList) {
      this.fileList[file.response.data.orderIndex] = null;
      if (file.response.data.orderIndex >= 5) {
        this.fileHeight -= 1;
      }
    },
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
    setHouseFunction(val) {
      let nameList = ["bedroom", "livingroom", "toilet"];
      let flag = true;
      nameList.forEach(name => {
        if (this.houseFunctionForm[name] == "") {
          flag = false;
          return;
        }
      });
      if (!flag) {
        this.$message.error("请填写完整");
        return;
      }
      let str =
        this.houseFunctionForm.bedroom +
        "室" +
        this.houseFunctionForm.livingroom +
        "厅" +
        this.houseFunctionForm.toilet +
        "卫";

      this.$set(this.functionRow, "designone_room_fun", str);
      console.log(this.functionRow.designone_room_fun);

      this.HouseFunctionFlag = false;
      this.houseFunctionForm = {
        bedroom: "",
        livingroom: "",
        toilet: ""
      };
      this.functionRow = null;
    },
    openHouseFunction(row) {
      this.HouseFunctionFlag = true;
      this.functionRow = row;
      // console.log('////////////////////////////',this.functionRow)
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
        projectName: JSON.parse(localStorage.getItem("nowProject")).nowProject,
        isType: 1,
        browse_num: this.meetingNum
      };
      _path = downLoad("/takeLand/export", obj);
      window.location = _path;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/getLangOroneMounthd.css");
@import url("../../assets/css/t_cell.css");
@import url("../../assets/css/GlobalBtn.less");
@tiTleFontSize: #666666; //拿地后表格Title字体颜色
@ContainerFontSize: #333333; //拿地后内容字体颜色
.setFirst {
  overflow: hidden;
  height: calc(100vh - 40px);
  p {
    color: #333333;
    font-weight: 700 !important;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::v-deep .el-upload-list {
    display: none;
  }
  .southNum {
    ::v-deep .el-input__suffix {
      margin-right: 17px;
    }
  }
  .functionDialog {
    ::v-deep .el-dialog__body {
      text-align: center;
    }
  }
  .functionInput {
    max-width: 10%;

    .el-input__inner {
      max-width: 10%;
    }
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
      ::v-deep .el-input__inner {
        width: 230px;
      }
      .right-btn {
        position: fixed;
        right: 0;
        top: 40px;
        z-index: 10;
        ::v-deep .el-button--default {
          .generalBtn(#333333, 500, 12px);
        }
        ::v-deep .el-button--primary {
          .primaryBtn(#fff, 500, 12px);
        }
        ::v-deep .reject {
          height: 30px !important;
          width: 60px !important;
        }
      }
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
    padding-bottom: 60px;
    border: 1px solid rgba(216, 216, 216, 0.34);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    height: calc(100vh - 160px);
    overflow-Y:auto;
    ::v-deep .el-tabs {
      width: 100%;
      padding: 0 10px;
      background: #fff;
    }
    .meeting {
      height: 40px;
      padding: 5px 10px;
      background: #fff;
      ::v-deep .el-input {
        width: 100px;
        margin: 0 10px;
      }
    }
    .structure {
      padding: 0 10px;
      background: #fff;
      margin-bottom: 10px;
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
          width: 460px;
          margin-bottom: 16px;
          .t_header {
            height: 80px;
            line-height: 80px;
            text-align: center;
            display: flex;
            background: rgba(246, 248, 253, 1);
            border-bottom: 1px solid rgba(239, 239, 239, 1);
            border-left: 1px solid rgba(239, 239, 239, 1);
            border-top: 1px solid rgba(239, 239, 239, 1);
            border-right: 1px solid rgba(239, 239, 239, 1);
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
                overflow: hidden;
                text-overflow: ellipsis;
              }
              > div:nth-child(2) {
                flex: 1;
                > div {
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
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
                      // border-right: 1px solid #ebeef5;
                      border-bottom: 1px solid #ebeef5;
                      margin-left: -1px;
                      color: @ContainerFontSize;
                      font-size: 14px;
                      // color: #909399;
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
          .t_title,
          .t_header {
            color: @tiTleFontSize !important; //拿地后表格Title字体
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
      background: #fff;
      margin-bottom: 10px;
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
          width: 460px;
          margin-bottom: 16px;
          color: @tiTleFontSize;
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
                overflow: hidden;
                text-overflow: ellipsis;
              }
              > div:nth-child(2) {
                flex: 1;
                > div {
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
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
              &.edit-box {
                width: 1650px;
              }
              // width: 100%;
              > div {
                width: 500px;
                // color: #909399;
                text-align: center;
                &.opt-bar {
                  width: 150px;
                }
                .t_header {
                  height: 40px;
                  line-height: 40px;
                  // color: #909399;
                  background: rgba(246, 248, 253, 1);
                  border-bottom: 1px solid rgba(239, 239, 239, 1);
                  border-right: 1px solid rgba(239, 239, 239, 1);
                  border-top: 1px solid rgba(239, 239, 239, 1);
                  padding: 0 10px;
                }
                .t_title {
                  box-sizing: border-box;
                  background: rgba(246, 248, 253, 1);
                  padding: 0 10px;
                }
                .t_body {
                  display: flex;

                  > div {
                    border-right: 1px solid #ebeef5;

                    flex: 1;
                    height: 40px;
                    line-height: 40px;
                    .t_cell {
                      // width:160px;
                      height: 40px;
                      line-height: 40px;
                      // border-right: 1px solid #ebeef5;
                      border-bottom: 1px solid #ebeef5;
                      margin-left: -1px;

                      font-size: 14px;
                      // color: #909399;
                      color: @ContainerFontSize;
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
          .t_title,
          .t_header {
            color: @tiTleFontSize !important; //拿地后表格Title字体
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
      // ::v-deep .el-input__inner {
      //   width: 150px;
      //   color: #333;
      // }
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
      }
      .el-input__inner {
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
        left: -18px;
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
      ::v-deep .is-leaf {
        color: @tiTleFontSize !important;
      }
    }
  }
  .null {
    height: 60px;
  }
  .bottom {
    text-align: center;
    height: 60px;
    line-height: 60px;
    background: #fff;
    width: 100%;
    margin: 0 15px;
    position: fixed;
    z-index: 100;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    ::v-deep .el-button {
      height: 30px;
    }
    ::v-deep .blankBtn {
      .generalBtn(#333333, 500, 12px);
    }
    ::v-deep .el-button--primary {
      .primaryBtn(#fff, 500, 12px);
    }
  }
  .targetTime {
    width: 200px;
  }
  .tabsFlxed {
    margin-left: 5px;
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
  ::v-deep .is-active {
    color: #2761ff;
  }
  ::v-deep .has-gutter {
    td {
      background: #fff;
    }
  }
  p {
    color: #333 !important;
  }
  ::v-deep .el-input__inner {
    color: #333333;
    font-size: 14px !important;
  }
  ::v-deep .el-input__inner {
    color: #333333 !important;
    font-size: 14px !important;
  }
}
</style>
