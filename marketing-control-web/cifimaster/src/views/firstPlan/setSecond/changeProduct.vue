<template>
  <div class="changeProduct">
    <div class="structure" id="structure">
      <p>
        货值结构
        <el-button type="text" @click="addDialog = true" v-if="!readonlyflag"
          >添加</el-button
        >
      </p>
      <div class="table">
        <div class="left_t">
          <div class="t_header">
            <div>业态类型</div>
            <div>产品类型</div>
          </div>
          <div class="t_body">
            <div class="t_cell" v-for="(item, idx) in prodList" :key="idx">
              <div
                :style="{
                  'line-height': item.child.length * 40 + 'px',
                  width: item.operation_type == '合计' ? '100%' : '120px'
                }"
              >
                <span :title="item.operation_type">{{
                  item.operation_type
                }}</span>
              </div>
              <div v-if="item.operation_type !== '合计'">
                <div v-for="(obj, index) in item.child" :key="index">
                  <i
                    v-if="
                      obj.obj.is_del &&
                        obj.product_type !== '小计' &&
                        !readonlyflag
                    "
                    @click="delProdItem(obj, index)"
                    style="color:red;cursor:pointer"
                    class="el-icon-close"
                  ></i>
                  <span :title="obj.product_type">{{ obj.product_type }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right_t">
          <div class="scrollBox">
            <div>
              <div>
                <div class="t_header">顶设1版</div>
                <div class="t_body">
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:110px;">
                      建筑面积(m²)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span>{{ obj.obj.land_back_area | fixed }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:110px;">
                      整盘均价(元/m²)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{
                          obj.obj.land_back_avg_price | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:110px;">
                      货值(万元)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span>{{ obj.obj.land_back_value | fixed }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:110px;">
                      开盘价格(元/m²)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{
                          obj.obj.land_back_open_price | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:140px;">
                      精装成本标准(元/m²)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{
                          obj.obj.land_back_cost_standard | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:130px;">
                      目标月均流量(㎡)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{
                          obj.obj.land_back_avg_flow | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="t_header t_title">大定价</div>
                <div class="t_body">
                  <div>
                    <div class="t_cell amendStyle" style="width:110px;">
                      建筑面积(m²)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <el-input
                          v-if="
                            obj.product_type !== '小计' &&
                              item.operation_type !== '合计' &&
                              !readonlyflag
                          "
                          v-model="obj.obj.designone_area"
                          type="number"
                          v-only-number="{ min: 0, precision: 2 }"
                          @blur="sumSpan"
                        ></el-input>
                        <span v-else>{{ obj.obj.designone_area | fixed }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:110px;">
                      整盘均价(元/m²)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <el-input
                          v-else-if="!readonlyflag"
                          v-model="obj.obj.designone_avg_price"
                          type="number"
                          v-only-number="{ min: 0, precision: 2 }"
                          @blur="sumSpan"
                        >
                          <!--
                          @change.native="obj.obj.designone_avg_price=parseInt(obj.obj.designone_avg_price)"
                          -->
                        </el-input>
                        <span v-else>{{
                          obj.obj.designone_avg_price | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:110px;">
                      货值(万元)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span>{{
                          obj.obj.designonel_front_value | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:110px;">
                      开盘价格(元/m²)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <el-input
                          v-else-if="!readonlyflag"
                          v-model="obj.obj.designone_front_open_price"
                          type="number"
                          v-only-number="{ min: 0, precision: 2 }"
                          @blur="sumSpan"
                        >
                          <!--
                          @input.native="obj.obj.designone_front_open_price=parseInt(obj.obj.designone_front_open_price)"

                          -->
                        </el-input>
                        <span v-else>{{
                          obj.obj.designone_front_open_price | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:140px;">
                      精装成本标准(元/m²)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <el-input
                          v-else-if="!readonlyflag"
                          v-model="obj.obj.designonel_front_cost_standard"
                          type="number"
                          v-only-number="{ min: 0, precision: 2 }"
                          @blur="sumSpan"
                        ></el-input>
                        <span v-else>{{
                          obj.obj.designonel_front_cost_standard | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:130px;">
                      目标月均流量(㎡)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <el-input
                          v-else-if="!readonlyflag"
                          v-model="obj.obj.designone_front_avg_flow"
                          type="number"
                          v-only-number="{ min: 0, precision: 2 }"
                          @blur="sumSpan"
                        ></el-input>
                        <span v-else>{{
                          obj.obj.designone_front_avg_flow | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="t_header">大定价VS顶设1版</div>
                <div class="t_body">
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:140px;">
                      整盘均价偏差(元/㎡)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{
                          obj.obj.vs_all_avg_price | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:140px;">
                      货值偏差(万元)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span>{{ obj.obj.vs_value_price | fixed }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:140px;">
                      开盘价格偏离(元/m²)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{ obj.obj.vs_open_price }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title amendStyle" style="width:140px;">
                      精装偏差(元/m²)
                    </div>
                    <div v-for="(item, idx) in prodList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{
                          obj.obj.vs_hardcover_price | fixed
                        }}</span>
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
        <el-button
          type="text"
          @click="addHouseDialog = true"
          v-if="!readonlyflag"
          >添加</el-button
        >
      </p>
      <div class="table">
        <div class="left_t">
          <div class="t_header">
            <div>业态类型</div>
            <div>产品类型</div>
          </div>
          <div class="t_body">
            <div class="t_cell" v-for="(item, idx) in houseList" :key="idx">
              <div
                :style="{
                  'line-height': item.child.length * 40 + 'px',
                  width: item.operation_type == '合计' ? '100%' : '120px'
                }"
              >
                <span :title="item.operation_type">{{
                  item.operation_type
                }}</span>
              </div>
              <div v-if="item.operation_type !== '合计'">
                <div v-for="(obj, index) in item.child" :key="index">
                  <span :title="obj.product_type">{{ obj.product_type }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right_t">
          <div class="scrollBox">
            <div :class="!readonlyflag ? 'edit-box' : ''">
              <div>
                <div class="t_header">顶设1版</div>
                <div class="t_body">
                  <div>
                    <div class="t_cell t_title">户型面积(m²)</div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{
                          isNaN(obj.obj.land_back_room_area)
                            ? 0.0
                            : obj.obj.land_back_room_area | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title">户数(个)</div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span>{{
                          isNaN(obj.obj.land_back_room_num)
                            ? 0
                            : obj.obj.land_back_room_num
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title">户数配比(%)</div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{
                          isNaN(obj.obj.land_back_room_per)
                            ? 0
                            : obj.obj.land_back_room_per + '%'
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="t_header">大定价版</div>
                <div class="t_body">
                  <div>
                    <div class="t_cell t_title">户型面积(m²)</div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <el-input
                          type="number"
                          v-only-number="{ min: 0, precision: 2 }"
                          v-else-if="!readonlyflag"
                          v-model="obj.obj.designone_room_area"
                          @blur="getSum"
                        ></el-input>
                        <span v-else>{{
                          isNaN(obj.obj.designone_room_area)
                            ? 0.0
                            : obj.obj.designone_room_area | fixed
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title">户数(个)</div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <el-input
                          type="number"
                          v-only-number="{ min: 0 }"
                          v-if="
                            obj.product_type !== '小计' &&
                              item.operation_type !== '合计' &&
                              !readonlyflag
                          "
                          v-model="obj.obj.designone_room_num"
                          @input.native="
                            obj.obj.designone_room_num = parseInt(
                              obj.obj.designone_room_num
                            )
                          "
                          @blur="getSum"
                        ></el-input>
                        <span v-else>{{
                          isNaN(obj.obj.designone_room_num)
                            ? 0
                            : obj.obj.designone_room_num
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title">户数配比(%)</div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <!-- <el-input
                            type="number"
                            v-only-number="{min:0, precision:2}"
                            v-if="obj.product_type!=='小计'&&item.operation_type!=='合计'&&readonly"
                            v-model="obj.obj.designone_room_per"
                            @blur="getSum"
                        ></el-input>-->
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{
                          isNaN(obj.obj.designone_room_per)
                            ? 0
                            : obj.obj.designone_room_per+ '%'
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title" style="min-width:150px">
                      户型功能
                    </div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <el-input
                          v-if="
                            obj.product_type !== '小计' &&
                              item.operation_type !== '合计' &&
                              !readonlyflag
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
                          <!-- {{isNaN(Number(obj.obj.designone_room_fun))?"":obj.obj.designone_room_fun}} -->
                        </span>
                        <span v-else>{{ obj.obj.designone_room_fun }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style="min-width:150px" class="t_cell t_title">
                      南面宽数(个)
                    </div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <el-input
                          type="number"
                          v-if="
                            obj.product_type !== '小计' &&
                              item.operation_type !== '合计' &&
                              !readonlyflag
                          "
                          v-model="obj.obj.designone_south_num"
                          @blur="getSum"
                          v-only-number="{ min: 0, precision: 1 }"
                        ></el-input>
                        <!-- <el-select
                          v-if="obj.product_type!=='小计'&&item.operation_type!=='合计'&&readonly"
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
                        <span v-else>{{
                          obj.obj.designone_south_num | fixedOne
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title">梯户数</div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <el-input
                          @input="
                            obj.obj.vs_designone_door_num = obj.obj.vs_designone_door_num.replace(
                              /[^\w]/gi,
                              ''
                            )
                          "
                          v-else-if="!readonlyflag"
                          v-model="obj.obj.vs_designone_door_num"
                          @blur="getSum"
                        ></el-input>
                        <span v-else>{{ obj.obj.vs_designone_door_num }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="t_header">大定价版VS顶设1版</div>
                <div class="t_body">
                  <div>
                    <div class="t_cell t_title">户型面积(m²)</div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{
                          isNaN(obj.obj.vs_designone_room_area)
                            ? 0.0
                            : obj.obj.vs_designone_room_area
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title">户数(个)</div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span>{{
                          isNaN(obj.obj.vs_designone_room_num)
                            ? 0
                            : obj.obj.vs_designone_room_num
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="t_cell t_title">户数配比(%)</div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
                        <span
                          v-if="
                            obj.product_type == '小计' ||
                              item.operation_type == '合计'
                          "
                          >--</span
                        >
                        <span v-else>{{
                          isNaN(obj.obj.vs_designone_room_per)
                            ? 0
                            : obj.obj.vs_designone_room_per + '%'
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!readonlyflag" class="opt-bar">
                <div class="t_header"></div>
                <div class="t_body">
                  <div>
                    <div class="t_cell t_title">操作</div>
                    <div v-for="(item, idx) in houseList" :key="idx">
                      <div
                        class="t_cell"
                        v-for="(obj, index) in item.child"
                        :key="index"
                      >
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
                          >删除</el-button
                        >
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

    <el-dialog title="添加货值结构" :visible.sync="addDialog">
      <el-form :model="addform">
        <el-form-item label="业态类型" label-width="120px">
          <el-select
            v-model="addform.operation_type"
            placeholder="请选择业态类型"
          >
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
          <el-select
            v-model="addform.product_type"
            placeholder="请选择产品类型"
          >
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
          <el-select
            v-model="addform__.operation_type"
            placeholder="请选择业态类型"
          >
            <el-option
              v-for="(item, idx) in optionList"
              :key="idx"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型" label-width="120px">
          <el-select
            v-model="addform__.product_type"
            placeholder="请选择产品类型"
          >
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
    <el-dialog
      title="填写户型功能"
      class="functionDialog"
      center
      :visible.sync="HouseFunctionFlag"
    >
      <el-input
        class="functionInput"
        type="number"
        v-only-number="{ min: 0, precision: 1 }"
        @paste.native.capture.prevent="handlePaste"
        v-model="houseFunctionForm.bedroom"
      ></el-input
      >室
      <el-input
        class="functionInput"
        type="number"
        v-only-number="{ min: 0, precision: 1 }"
        @paste.native.capture.prevent="handlePaste"
        v-model="houseFunctionForm.livingroom"
      ></el-input
      >厅
      <el-input
        class="functionInput"
        type="number"
        v-only-number="{ min: 0, precision: 1 }"
        @paste.native.capture.prevent="handlePaste"
        v-model="houseFunctionForm.toilet"
      ></el-input
      >卫
      <div slot="footer" class="dialog-footer">
        <el-button @click="HouseFunctionFlag = false">取 消</el-button>
        <el-button type="primary" @click="setHouseFunction">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDicByCodeLevelList,
  getDesignTwoValue,
  updateDesignTwoValue
} from "@/api/firstPlan";
export default {
  name: "changeProduct",
  props: ["beforeAct", "versions", "flowId", "readonly"],
  data() {
    return {
      addDialog: false,
      HouseFunctionFlag: false,
      addHouseDialog: false,
      functionRow: null,
      addform: {},
      addform__: {},
      plan_id: this.$route.query.plan_id,
      plan_node_id: this.$route.query.plan_node_id,
      optionList: [],
      allOption: [],
      houseFunctionForm: {
        bedroom: "",
        livingroom: "",
        toilet: ""
      },
      testList: [],
      testList__: [],
      plan_approval: ""
    };
  },
  filters: {
    fixed(data) {
      if (!data) {
        return "0.00";
      }
      return Number(data).toFixed(2);
    },
    fixedOne(data) {
      if (!data) {
        return "0.0";
      }
      return Number(data).toFixed(1);
    }
  },
  created() {
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
  },
  computed: {

    actVersions() {
      return this.versions;
    },
    // activeTab() {
    //   return this.beforeAct;
    // },
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
    }
  },
  watch: {
    actVersions: {
      handler(a, b) {
        this.reload();
      },
      deep: true
    }
  },
  methods: {
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
    setHouseFunction() {
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
    reload() {
      let obj = {
        plan_id: this.plan_id || "",
        plan_node_id: this.plan_node_id || this.$route.query.BOID
      };
      obj.plan_node_id = this.actVersions;
      if (this.$route.query.BOID) {
        obj.plan_node_id = this.$route.query.BOID;
      }
      getDesignTwoValue(obj).then(res => {
        if (!res.result) return;
        let arr = res.result.tollerMap;
        // let land_arr = res.result.LandMap.tollerMap || [];
        arr.forEach(lv1 => {
          // let conarr = land_arr.filter(
          //   i => i.operation_type == lv1.operation_type
          // );
          lv1.child.forEach(lv2 => {
            // if (conarr.length) {
            // conarr[0].child.map(n => {
            if (!lv2.takeLandId) {
              lv2.is_del = true;
            }
            //   });
            // }
            lv2.obj = { ...lv2 };
          });
        });
        this.testList = arr;
        let arr1 = res.result.roomlist || [];
        // let land_arr1 = res.result.LandMap.roomlist || [];
        arr1.forEach(lv1 => {
          // let conarr1 = land_arr1.filter(
          //   i => i.operation_type == lv1.operation_type
          // );
          lv1.child.forEach(lv2 => {
            // if (conarr1.length) {
            // conarr1[0].child.map(n => {
            if (!lv2.takeLandId) {
              lv2.is_del = true;
            }
            // });
            // }
            lv2.obj = { ...lv2 };
          });
        });
        this.testList__ = arr1;
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
    delHouse(idx, obj, index) {
      this.testList__[idx].child.splice(index, 1);
      if (this.testList__[idx].child.length == 1) {
        this.testList__[idx].child = [];
        this.testList__.splice(idx, 1);
      }
    },
    update(isUpdate) {
      let id = this.$route.query.plan_node_id;
      id = this.actVersions;
      if (this.$route.query.BOID) {
        id = this.$route.query.BOID;
      }
      let tollerlist = [...this.prodList];
      let roomlist = [...this.houseList];
      tollerlist.pop();
      roomlist.pop();
      updateDesignTwoValue({
        plan_id: this.$route.query.plan_id,
        plan_node_id: id,
        project_id: this.$route.query.project_id,
        tollerMap: tollerlist,
        roomlist
      }).then(res => {
        if (isUpdate == "change") {
          this.$parent.$parent.$parent.$refs.coreStandard.reload();
          this.$parent.$parent.$parent.$refs.overallPlan.reload();
        }
        if (res.code == 0) {
          if (isUpdate != "change") {
            this.$message({
              type: "success",
              message: "保存成功！"
            });
          }
        }
      });
    },
    sumSpan() {
      this.testList.forEach(lv1 => {
        lv1.child.forEach(lv2 => {
          let vs_all_avg_price = Number(lv2.obj.land_back_avg_price);
          if (lv2.obj.designone_avg_price) {
            vs_all_avg_price =
              Number(lv2.obj.designone_avg_price) -
              Number(lv2.obj.land_back_avg_price);
          }
          lv2.obj.vs_all_avg_price = vs_all_avg_price;

          let vs_value_price = Number(lv2.obj.land_back_value);
          if (lv2.obj.designonel_front_value) {
            vs_value_price =
              Number(lv2.obj.designonel_front_value) -
              Number(lv2.obj.land_back_value);
          }
          lv2.obj.vs_value_price = vs_value_price.toFixed(2);

          let vs_open_price = Number(lv2.obj.land_back_open_price);
          if (lv2.obj.designone_front_open_price) {
            vs_open_price =
              Number(lv2.obj.designone_front_open_price) -
              Number(lv2.obj.land_back_open_price);
          }
          lv2.obj.vs_open_price = vs_open_price.toFixed(2);

          let vs_hardcover_price = Number(lv2.obj.land_back_cost_standard);
          if (lv2.obj.designonel_front_cost_standard) {
            vs_hardcover_price =
              Number(lv2.obj.designonel_front_cost_standard) -
              Number(lv2.obj.land_back_cost_standard);
          }
          lv2.obj.vs_hardcover_price = vs_hardcover_price.toFixed(2);
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
@tiTleFontSize: #666666; //拿地后表格Title字体颜色
@ContainerFontSize: #333333; //拿地后内容字体颜色
.changeProduct {
  p{
    color: #333333;
    font-weight:700 !important;
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
          // padding: 0 5px;
              border-bottom: 1px solid #ebeef5;

          border-right: 1px solid #ebeef5;
          background: #f5f7fa;
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
          // color: #909399;
          height: 40px;
          line-height: 40px;
          text-align: center;
        }
      }
      .right_t {
        flex: 1;
        overflow: hidden;
        color: @ContainerFontSize;
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
                border: 1px solid #ebeef5;
                padding: 0 5px;
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
                    color: @ContainerFontSize;
                    font-size: 14px;
                    // color: #909399;
                    ::v-deep .el-input__inner {
                      margin: 0 15px;
                      width: 70%;
                      color: #333333;
                      font-size: 14px!important;
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
      width: 160px !important;
      padding: 0 5px !important;
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
        color: @tiTleFontSize;
        width: 460px;
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
                padding: 0 5px;
                height: 40px;
                line-height: 40px;
                // color: #909399;
                background: #f5f7fa;
                border: 1px solid #ebeef5;
              }
              .t_title {
                background: #f5f7fa !important;
                padding-left: 5px;
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
                    // color: #909399;
                    ::v-deep .el-input__inner {
                      margin: 0 15px;
                      width: 70%;
                       color: #333333;
                      font-size: 14px!important;
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
  .functionDialog {
    ::v-deep .el-dialog__body {
      text-align: center;
    }
  }
  .functionInput {
    max-width: 10%;

    .el-input__inner {
      max-width: 10%;
       color: #333333;
      font-size: 14px!important;
    }
  }
  .structure .t_cell span {
    margin-left: 5px;
  }
  .house .t_cell span {
    margin-left: 5px;
  }
}
</style>
