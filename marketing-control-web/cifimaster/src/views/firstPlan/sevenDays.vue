<template>
  <div class="sevenDays">
    <navbarLink></navbarLink>
    <div class="headerFixed">
      <div class="top" v-if="isType!='view'">
        <div class="right-btn">
          <el-button @click="$router.push({path:'/planWrite'})">返回列表</el-button>
          <el-button @click="toPreview" v-if="applay_status==3||applay_status==4&&activeTab==1">查看审批</el-button>
          <el-button
            @click="toPreview"
            v-if="approval_stuat==3||approval_stuat==4&&activeTab==2"
          >查看审批</el-button>
          <el-button
            v-if="applay_status==4&&activeTab==1"
            @click="createVersion"
            type="primary"
          >创建版本</el-button>
          <el-button
            v-if="approval_stuat==4&&activeTab==2"
            @click="createVersion"
            type="primary"
          >创建版本</el-button>
          <el-button @click="exportDelayData" v-if="activeTab==1&&thisVserion">导出</el-button>
          <el-button @click="exportDelayData" v-if="activeTab==2&&thisVserion">导出</el-button>
        </div>
        <!-- <el-button v-show="isShowVersion" type="primary">创建版本</el-button> -->
        <el-form :model="form" label-width="80px" ref="form" v-show="activeTab==1">
          <el-form-item label="选择版本:">
            <el-select placeholder="请选择版本" @change="switchVersion()" v-model="thisVserion">
              <el-option
                :key="index"
                :label="item.name"
                :value="item.id"
                v-for="(item,index) in versionData"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form" label-width="80px" ref="form" v-show="activeTab==2">
          <el-form-item label="选择版本:">
            <el-select @change="switchVersion()" placeholder="请选择版本" v-model="thisVserion">
              <el-option
                :key="index"
                :label="item.name"
                :value="item.id"
                v-for="(item,index) in versionData"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="tabsFlxed" :class="{isViewFixed:$route.query.type == 'view'}">
          <el-tabs @tab-click="tabClick" v-model="activeTab">
            <el-tab-pane label="开盘审批表" name="1">
              <div class="link">
                <el-button @click="scrollLink('lists')" type="text">附件清单</el-button>
                <el-button @click="scrollLink('come')" type="text">来访周拆分</el-button>
                <el-button @click="scrollLink('node')" type="text">节点客储计划</el-button>
                <el-button @click="scrollLink('prognosis')" type="text">事业部营销负责人开盘预判</el-button>
                <el-button @click="scrollLink('openDay')" type="text">开盘当天预估</el-button>
                <el-button @click="scrollLink('list')" type="text">客户情况</el-button>
                <el-button @click="scrollLink('goodsInfo')" type="text">竞品情况</el-button>
                <el-button @click="scrollLink('firstOpen')" type="text">首开指标</el-button>
                <!-- <el-button @click="scrollLink('goodsInfo')" type="text">竞品情况</el-button> -->
                <!-- <el-button @click="scrollLink('clientInfo')" type="text">客户情况</el-button> -->
                <!-- <el-button @click="scrollLink('openDay')" type="text">开盘当天预估</el-button> -->
                <!-- <el-button @click="scrollLink('prognosis')" type="text">事业部营销负责人开盘预判</el-button> -->
                <!-- <el-button @click="scrollLink('node')" type="text">节点客储计划</el-button> -->
                <!-- <el-button @click="scrollLink('come')" type="text">来访周拆分</el-button> -->
              </div>
            </el-tab-pane>
            <el-tab-pane label="延期开盘申请" name="2">
              <div class="link">
                <el-button @click="scrollLink('lists')" type="text">附件清单</el-button>
                <el-button @click="scrollLink('come_2')" type="text">变更来访周拆分</el-button>
                <el-button @click="scrollLink('card_2')" type="text">办卡方式</el-button>
                <el-button @click="scrollLink('ChageNode')" type="text">变更节点客储计划</el-button>
                <el-button @click="scrollLink('rate')" type="text">客储达成进度</el-button>
                <el-button @click="scrollLink('open')" type="text">延期开盘申请表</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="null" style="height:50px" v-if="isType=='view'"></div>
    <div style="height:140px" v-else></div>
    <div class="containter" id="containter" :class="{isView:isType == 'view'}">
      <el-tabs v-model="activeTab">
        <el-tab-pane label name="1">
          <!-- <div class="link">
            <el-button @click="scrollLink('firstOpen')" type="text">首开指标</el-button>
            <el-button @click="scrollLink('goodsInfo')" type="text">竞品情况</el-button>
            <el-button @click="scrollLink('clientInfo')" type="text">客户情况</el-button>
            <el-button @click="scrollLink('openDay')" type="text">开盘当天预估</el-button>
            <el-button @click="scrollLink('prognosis')" type="text">事业部营销负责人开盘预判</el-button>
            <el-button @click="scrollLink('node')" type="text">节点客储计划</el-button>
            <el-button @click="scrollLink('come')" type="text">来访周拆分</el-button>
          </div>-->
          <div class="firstOpen" id="firstOpen">
            <p class="bold">首开指标</p>
            <div class="table">
              <el-row>
                <el-col :span="4">
                  <div></div>
                </el-col>
                <el-col :span="3">
                  <div>投资版</div>
                </el-col>
                <el-col :span="3">
                  <div>战规版</div>
                </el-col>
                <el-col :span="3">
                  <div>顶设2版</div>
                </el-col>
                <el-col :span="3">
                  <div>开盘预估</div>
                </el-col>
                <el-col :span="2">
                  <div title="偏差(VS顶设2)">偏差(VS顶设2)</div>
                </el-col>
                <el-col :span="3">
                  <div title="偏差率(VS顶设2)">偏差率(VS顶设2)</div>
                </el-col>
                <el-col :span="3">
                  <div>偏差原因</div>
                </el-col>
              </el-row>
              <!-- 首开节点 -->
              <el-row>
                <el-col :span="4">
                  <div>首开节点</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.invest_open_node}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.rules_open_node}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.designtwo_open_node}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-date-picker
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.estimate_open_node"
                      format="yyyy-MM-dd"
                      type="date"
                      value-format="yyyy-MM-dd"
                      @change="getDateDiff(openApplayMainData.estimate_open_node)"
                      placeholder="选择日期"
                      :clearable="false"
                    ></el-date-picker>
                    <span v-else>{{openApplayMainData.estimate_open_node}}</span>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div>{{openApplayMainData.deviation_open_node}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.deviationper_open_node}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.cause_open_node"
                    ></el-input>
                    <span v-else>{{openApplayMainData.cause_open_node}}</span>
                  </div>
                </el-col>
              </el-row>
              <!-- 产品类型 -->
              <el-row>
                <el-col :span="4">
                  <div>产品类型</div>
                </el-col>
                <el-col :span="3">
                  <el-tooltip
                    :content="openApplayMainData.invest_product_type"
                    :disabled="!openApplayMainData.invest_product_type"
                    placement="bottom"
                    effect="light"
                  >
                    <div>{{openApplayMainData.invest_product_type}}</div>
                  </el-tooltip>
                  <!-- <div
                    :title="openApplayMainData.invest_product_type"
                  >{{openApplayMainData.invest_product_type}}</div>-->
                </el-col>
                <el-col :span="3">
                  <el-tooltip
                    :content="openApplayMainData.rules_product_type"
                    :disabled="!openApplayMainData.rules_product_type"
                    placement="bottom"
                    effect="light"
                  >
                    <div>{{openApplayMainData.rules_product_type}}</div>
                  </el-tooltip>
                </el-col>
                <el-col :span="3">
                  <el-tooltip
                    :content="openApplayMainData.designtwo_product_type"
                    :disabled="!openApplayMainData.designtwo_product_type"
                    placement="bottom"
                    effect="light"
                  >
                    <div>{{openApplayMainData.designtwo_product_type}}</div>
                  </el-tooltip>
                </el-col>
                <el-col :span="3">
                  <!-- <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.estimate_product_type"
                    ></el-input>
                    <span>{{openApplayMainData.estimate_product_type}}</span>
                  </div>-->
                  <el-tooltip
                    :content="openApplayMainData.estimate_product_type"
                    :disabled="!openApplayMainData.estimate_product_type"
                    placement="bottom"
                    effect="light"
                  >
                    <div>{{openApplayMainData.estimate_product_type}}</div>
                  </el-tooltip>
                </el-col>
                <el-col :span="2">
                  <div>{{openApplayMainData.deviation_product_type}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.deviation_product_type}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.cause_product_type"
                    ></el-input>
                    <span v-else>{{openApplayMainData.cause_product_type}}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <div>首开取证货值（万元）</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.invest_take_card_value}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.rules_take_card_value}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.designtwo_take_card_value}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      type="number"
                      v-only-number="{min:0, precision:2}"
                      @change="getDiff('estimate_take_card_value')"
                      v-model="openApplayMainData.estimate_take_card_value"
                    ></el-input>
                    <span v-else>{{openApplayMainData.estimate_take_card_value}}</span>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div>
                    {{isNaN(openApplayMainData.deviation_take_card_value)?0:openApplayMainData.deviation_take_card_value | fixed}}
                  </div>
                </el-col>
                <el-col :span="3">
                  <div>
                    {{isNaN(openApplayMainData.deviationper_take_card_value)?0:openApplayMainData.deviationper_take_card_value  | twofix}}%
                  </div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.cause_take_card_value"
                    ></el-input>
                    <span v-else>{{openApplayMainData.cause_take_card_value}}</span>
                  </div>
                </el-col>
              </el-row>
              <!-- 首开推售货值（万元） -->
              <el-row>
                <el-col :span="4">
                  <div>首开推售货值（万元）</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.invest_push_value}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.rules_push_value}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.designtwo_push_value}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      type="number"
                      v-only-number="{min:0, precision:2}"
                      @change="getDiff('estimate_push_value')"
                      v-model="openApplayMainData.estimate_push_value"
                    ></el-input>
                    <span v-else>{{openApplayMainData.estimate_push_value}}</span>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div>
                    {{isNaN(openApplayMainData.deviation_push_value)?0:openApplayMainData.deviation_push_value | fixed}}
                  </div>
                </el-col>
                <el-col :span="3">
                  <div>
                    {{isNaN(openApplayMainData.deviationper_push_value)?0:openApplayMainData.deviationper_push_value | twofix}}%
                  </div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.cause_push_value"
                    ></el-input>
                    <span v-else>{{openApplayMainData.cause_push_value}}</span>
                  </div>
                </el-col>
              </el-row>
              <!-- 首开去化货值（万元） -->
              <el-row>
                <el-col :span="4">
                  <div>首开去化货值（万元）</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.invest_selling_value}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.rules_selling_value}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.designtwo_selling_value}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      type="number"
                      v-only-number="{min:0, precision:2}"
                      @change="getDiff('estimate_selling_value')"
                      v-model="openApplayMainData.estimate_selling_value"
                    ></el-input>
                    <span v-else>{{openApplayMainData.estimate_selling_value}}</span>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div>
                    {{isNaN(openApplayMainData.deviation_selling_value)?0:openApplayMainData.deviation_selling_value  | fixed}}
                  </div>
                </el-col>
                <el-col :span="3">
                  <div>
                    {{isNaN(openApplayMainData.deviationper_selling_value)?0:openApplayMainData.deviationper_selling_value  | twofix}}%
                  </div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.cause_selling_value"
                    ></el-input>
                    <span v-else>{{openApplayMainData.cause_selling_value}}</span>
                  </div>
                </el-col>
              </el-row>
              <!-- 首开均价 -->
              <el-row
                v-if="priceList.length>0"
                :style="{'line-height':priceList.length*40+'px','height':priceList.length*40+'px'}"
              >
                <el-col
                  :span="4"
                  :style="{'line-height':priceList.length*40+'px','height':priceList.length*40+'px'}"
                  class="averagePricehead"
                >
                  <div>
                    <el-row>
                      <el-col
                        :span="9"
                        :style="{'line-height':priceList.length*40+'px','height':priceList.length*40+'px'}"
                      >首开均价</el-col>
                      <el-col :span="15" :style="{'height':priceList.length*40+'px'}">
                        <div
                          :key="index"
                          :title="item.product_type"
                          v-for="(item,index) in priceList"
                        >{{item.product_type}}</div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="3" class="averagePrice" :style="{'height':priceList.length*40+'px'}">
                  <div
                    :key="index"
                    v-for="(item,index) in priceList"
                  >{{isNaN(item.invest_avg)?0:item.invest_avg | fixed}}</div>
                </el-col>
                <el-col :span="3" class="averagePrice" :style="{'height':priceList.length*40+'px'}">
                  <div
                    :key="index"
                    v-for="(item,index) in priceList"
                  >{{isNaN(item.rules_avg)?0:item.rules_avg | fixed}}</div>
                </el-col>
                <el-col :span="3" class="averagePrice" :style="{'height':priceList.length*40+'px'}">
                  <div
                    :key="index"
                    v-for="(item,index) in priceList"
                  >{{isNaN(item.designtwo_avg)?0:item.designtwo_avg | fixed}}</div>
                </el-col>
                <el-col :span="3" class="averagePrice" :style="{'height':priceList.length*40+'px'}">
                  <div :key="index" v-for="(item,index) in priceList">
                    <el-input
                      type="number"
                      v-only-number="{min:0,precision:2}"
                      v-if="applay_status!=4&&applay_status!=3"
                      @change="getDiffRate"
                      v-model="item.open_estimate"
                    ></el-input>
                    <span v-else>{{item.open_estimate | fixed}}</span>
                  </div>
                </el-col>
                <el-col :span="2" class="averagePrice" :style="{'height':priceList.length*40+'px'}">
                  <div
                    :key="index"
                    v-for="(item,index) in priceList"
                  >{{isNaN(item.bias_price)?0:item.bias_price | fixed}}</div>
                </el-col>
                <el-col :span="3" class="averagePrice" :style="{'height':priceList.length*40+'px'}">
                  <div
                    :key="index"
                    v-for="(item,index) in priceList"
                  >{{isNaN(item.bias_per)?0:item.bias_per | twofix}}%</div>
                </el-col>
                <el-col :span="3" class="averagePrice" :style="{'height':priceList.length*40+'px'}">
                  <div>
                    <div class="averagePrice_item" :key="index" v-for="(item,index) in priceList">
                      <el-input v-if="applay_status!=4&&applay_status!=3" v-model="item.bias_cause"></el-input>
                      <span v-else>{{item.bias_cause}}</span>
                    </div>
                    <!-- <div>
                      <span :key="index" v-for="(item,index) in priceList">
                        <span v-if="applay_status==4||applay_status==3">{{item.bias_cause}}></span>
                      </span>
                    </div>-->
                  </div>
                </el-col>
              </el-row>
              <!-- 不同业态价差 -->
              <el-row>
                <el-col
                  :span="4"
                  :style="{'line-height':firstOpenVlaue.list2.length*40+'px'}"
                  class="diffPricehead"
                >
                  <div>{{firstOpenVlaue.list2[0].type}}</div>
                </el-col>
                <el-col :span="3" class="diffPrice">
                  <el-tooltip
                    :content="openApplayMainData.invest_operation_name"
                    :disabled="!openApplayMainData.invest_operation_name"
                    placement="bottom"
                    effect="light"
                  >
                    <div>{{openApplayMainData.invest_operation_name}}</div>
                  </el-tooltip>
                  <!-- <div
                    :title="openApplayMainData.invest_operation_name"
                  >{{openApplayMainData.invest_operation_name}}</div>-->
                  <div>{{openApplayMainData.invest_operation_bfb}}</div>
                </el-col>
                <el-col :span="3" class="diffPrice">
                  <el-tooltip
                    :content="openApplayMainData.rules_operation_name"
                    :disabled="!openApplayMainData.rules_operation_name"
                    placement="bottom"
                    effect="light"
                  >
                    <div>{{openApplayMainData.rules_operation_name}}</div>
                  </el-tooltip>
                  <div>{{openApplayMainData.rules_operation_bfb}}</div>
                </el-col>
                <el-col :span="3" class="diffPrice">
                  <el-tooltip
                    :content="openApplayMainData.designtwo_operation_name"
                    :disabled="!openApplayMainData.designtwo_operation_name"
                    placement="bottom"
                    effect="light"
                  >
                    <div>{{openApplayMainData.designtwo_operation_name}}</div>
                  </el-tooltip>
                  <div>{{openApplayMainData.designtwo_operation_bfb}}</div>
                </el-col>
                <el-col :span="3" class="diffPrice">
                  <el-tooltip
                    :content="openApplayMainData.estimate_operation_name"
                    :disabled="!openApplayMainData.estimate_operation_name"
                    placement="bottom"
                    effect="light"
                  >
                    <div>{{openApplayMainData.estimate_operation_name}}</div>
                  </el-tooltip>
                  <!-- <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.estimate_operation_name"
                    ></el-input>
                    <span v-else>{{openApplayMainData.estimate_operation_name}}</span>
                  </div>-->
                  <div>{{openApplayMainData.estimate_operation_bfb }}</div>
                </el-col>
                <el-col :span="2" class="diffPrice">
                  <div style="height:40px"></div>
                  <div style="height:40px"></div>
                </el-col>
                <el-col :span="3" class="diffPrice">
                  <div style="height:40px"></div>
                  <div style="height:40px"></div>
                </el-col>
                <el-col :span="3" class="diffPrice">
                  <div style="height:40px"></div>
                  <div style="height:40px"></div>
                </el-col>
              </el-row>
              <!-- 取证去化率 -->
              <el-row>
                <el-col :span="4">
                  <div>取证去化率</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.invest_take_card_per}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.rules_take_card_per}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.designtwo_take_card_per}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <!--<el-input
                      type="number" v-only-number="{min:0, precision:2}"
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.estimate_take_card_per"
                    ></el-input>-->
                    <span>{{isNaN(openApplayMainData.estimate_take_card_per)?0:openApplayMainData.estimate_take_card_per | twofix}}</span>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div></div>
                </el-col>
                <el-col :span="3">
                  <div></div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <div>
                      <el-input
                        v-if="applay_status!=4&&applay_status!=3"
                        v-model="openApplayMainData.cause_operation_price"
                      ></el-input>
                      <span v-else>{{openApplayMainData.cause_operation_price}}</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <!-- 当期利润率 -->
              <el-row>
                <el-col :span="4">
                  <div>当期利润率</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.invest_this_per}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.rules_this_per}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.designtwo_this_per}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      type="number"
                      v-only-number="{ precision:2}"
                      @change="getDiff('estimate_this_per')"
                      v-model="openApplayMainData.estimate_this_per"
                    ></el-input>
                    <span v-else>{{openApplayMainData.estimate_this_per}}</span>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div>
                    {{isNaN(openApplayMainData.deviation_this_per)?0:openApplayMainData.deviation_this_per | fixed}}
                  </div>
                </el-col>
                <el-col :span="3">
                  <div>
                    {{isNaN(openApplayMainData.deviationper_this_per)?0:openApplayMainData.deviationper_this_per | twofix}}%
                  </div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.cause_this_per"
                    ></el-input>
                    <span v-else>{{openApplayMainData.cause_this_per }}</span>
                  </div>
                </el-col>
              </el-row>
              <!-- 整盘利润率 -->
              <el-row>
                <el-col :span="4">
                  <div>整盘利润率</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.invest_all_per}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.rules_all_per}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.designtwo_all_per}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      type="number"
                      v-only-number="{ precision:2}"
                      v-if="applay_status!=4&&applay_status!=3"
                      @change="getDiff('estimate_all_per')"
                      v-model="openApplayMainData.estimate_all_per"
                    ></el-input>
                    <span v-else>{{openApplayMainData.estimate_all_per}}</span>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div>{{isNaN(openApplayMainData.deviation_all_per)?0:openApplayMainData.deviation_all_per | fixed}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    {{isNaN(openApplayMainData.deviationper_all_per)?0:openApplayMainData.deviationper_all_per | twofix}}%
                  </div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.cause_all_per"
                    ></el-input>
                    <span v-else>{{openApplayMainData.cause_all_per}}</span>
                  </div>
                </el-col>
              </el-row>
              <!-- 非融IRR  -->
              <el-row>
                <el-col :span="4">
                  <div>非融IRR</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.invest_irr}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.rules_irr}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.designtwo_irr}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      type="number"
                      v-only-number="{ precision:2}"
                      v-if="applay_status!=4&&applay_status!=3"
                      @change="getDiff('estimate_irr')"
                      v-model="openApplayMainData.estimate_irr"
                    ></el-input>
                    <span v-else>{{openApplayMainData.estimate_irr}}</span>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div>{{isNaN(openApplayMainData.deviation_irr)?0:openApplayMainData.deviation_irr | fixed}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{isNaN(openApplayMainData.deviationper_irr)?0:openApplayMainData.deviationper_irr | twofix}}%</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.cause_irr"
                    ></el-input>
                    <span v-else>{{openApplayMainData.cause_irr}}</span>
                  </div>
                </el-col>
              </el-row>
              <!-- 静态投资回收期（月） -->
              <el-row>
                <el-col :span="4">
                  <div>静态投资回收期（月）</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.invest_payback}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.rules_payback}}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{openApplayMainData.designtwo_payback}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      type="number"
                      v-only-number="{min:0,precision:2}"
                      v-if="applay_status!=4&&applay_status!=3"
                      @change="getDiff('estimate_payback')"
                      v-model="openApplayMainData.estimate_payback"
                    ></el-input>
                    <span v-else>{{openApplayMainData.estimate_payback}}</span>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div>{{isNaN(openApplayMainData.deviation_payback)?0:openApplayMainData.deviation_payback | fixed}}</div>
                </el-col>
                <el-col :span="3">
                  <div>
                    {{isNaN(openApplayMainData.deviationper_payback)?0:openApplayMainData.deviationper_payback | twofix}}%
                  </div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData.cause_payback"
                    ></el-input>
                    <span v-else>{{openApplayMainData.cause_payback}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <el-dialog title="添加竞品项目" :visible.sync="dialogFormVisible">
            <el-form>
              <el-form-item label="竞品项目" :label-width="formLabelWidth">
                <el-input v-model="fromData.product_project" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="首开时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="fromData.first_opentime"
                  format="yyyy-MM-dd"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :clearable="false"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="首开去化金额" :label-width="formLabelWidth">
                <el-input
                  type="number"
                  v-only-number="{min:0, precision:2}"
                  v-model="fromData.take_money"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="当前月均流量" :label-width="formLabelWidth">
                <el-input
                  type="number"
                  v-only-number="{min:0, precision:2}"
                  v-model="fromData.month_avg_flow"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="在售均价业态" :label-width="formLabelWidth">
                <el-input v-model="fromData.avg_price_product" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitProject(fromData)">确 定</el-button>
            </div>
          </el-dialog>
          <div class="goodsInfo" id="goodsInfo">
            <p class="bold">竞品情况</p>
            <el-button
              class="add"
              v-if="applay_status!=4&&applay_status!=3"
              type="text"
              @click="dialogFormVisible = true,fromData={}"
            >添加</el-button>
            <div class="table">
              <el-table
                :data="competingpPoducts"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                border
                style="width: 100%"
              >
                <el-table-column label="竞品项目" align="center" prop="product_project" width="180"></el-table-column>
                <el-table-column label="首开时间" align="center" prop="first_opentime" width="180"></el-table-column>
                <el-table-column label="首开去化金额" align="center" prop="take_money"></el-table-column>
                <el-table-column label="当前月均流量" align="center" prop="month_avg_flow"></el-table-column>
                <el-table-column label="在售均价业态" align="center" prop="avg_price_product"></el-table-column>
                <el-table-column
                  label="操作"
                  width="140"
                  align="center"
                  v-if="applay_status!=4&&applay_status!=3"
                >
                  <template slot-scope="scope">
                    <el-button
                      @click="deleteObj(scope.$index)"
                      v-if="applay_status!=4&&applay_status!=3"
                      type="text"
                      size="small"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="list" id="list">
            <p class="bold">客户情况</p>
            <div class="operation">
              <el-table
                :span-method="spanCurrage"
                :data="clientInfoList"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                border
                style="width: 100%"
              >
                <el-table-column label="客储类别" align="center" prop="type" width="180"></el-table-column>
                <el-table-column label="客储目标(组)" align="center" prop="num">
                  <template slot-scope="scope">
                    <!-- <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      type="number" v-only-number="{min:0, precision:2}"
                      v-model="openApplayMainData[scope.row.val1]"
                      @change="setClientInfo"
                    ></el-input>-->
                    <span>{{openApplayMainData[scope.row.val1]}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="实际达成(组)" align="center" prop="num">
                  <template slot-scope="scope">
                    <!-- <el-input
                      type="number" v-only-number="{min:0, precision:2}"
                      @change="setClientInfo"
                      v-if="applay_status!=4&&applay_status!=3"
                      v-model="openApplayMainData[scope.row.val2]"
                    ></el-input>-->
                    <span>{{openApplayMainData[scope.row.val2]}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="达成率(%)" align="center" prop="num">
                  <template slot-scope="scope">
                    <span>{{openApplayMainData[scope.row.val1]==0?"0":openApplayMainData[scope.row.val3] | twofix}}%</span>
                  </template>
                </el-table-column>
                <el-table-column label="偏差原因分析" align="center" prop="num">
                  <template slot-scope="scope">
                    <div class="text_area" v-if="applay_status!=4&&applay_status!=3">
                      <el-input
                        v-if="scope.$index==0"
                        type="textarea"
                        :rows="4"
                        v-model="openApplayMainData.customer_cause"
                        placeholder="请输入偏差原因..."
                      ></el-input>
                    </div>
                    <span v-else>{{openApplayMainData.customer_cause}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="openDay" id="openDay">
            <p class="bold">开盘当天预估</p>
            <div class="table">
              <el-row>
                <el-col :span="4">
                  <div class="grid-content">{{openDayObj.type1}}</div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <el-input
                      type="number"
                      v-if="applay_status!=4&&applay_status!=3"
                      v-only-number="{min:0}"
                      @input.native="openApplayMainData.this_customer_visit=parseInt(openApplayMainData.this_customer_visit)"
                      v-model="openApplayMainData.this_customer_visit"
                    ></el-input>
                    <span v-else>{{openApplayMainData.this_customer_visit}}</span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">{{openDayObj.type2 }}</div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <!-- <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      type="number" v-only-number="{min:0, precision:2}"
                      v-model="openApplayMainData.this_customer_conversionper"
                    ></el-input>
                    <span v-else>{{openApplayMainData.this_customer_conversionper}}</span>-->
                    <span>{{this_customer_conversionper  || '' | twofix}}%</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <div class="grid-content">{{openDayObj.type3}}</div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <el-input
                      type="number"
                      v-if="applay_status!=4&&applay_status!=3"
                      v-only-number="{min:0}"
                      @input.native="openApplayMainData.sub_customer_actual=parseInt(openApplayMainData.sub_customer_actual)"
                      @change="countMarkPer"
                      v-model="openApplayMainData.sub_customer_actual"
                    ></el-input>
                    <span v-else>{{openApplayMainData.sub_customer_actual}}</span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">{{openDayObj.type4 }}</div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <!--  <el-input
                      v-if="applay_status!=4&&applay_status!=3"
                      type="number" v-only-number="{min:0, precision:2}"
                      v-model="openApplayMainData.sub_customer_per"
                    ></el-input>-->
                    <span>{{openApplayMainData.sub_customer_per | twofix }}%</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="prognosis" id="prognosis">
            <p class="bold">事业部营销负责人开盘预判</p>
            <div class="table">
              <el-input
                :readonly="applay_status==4||applay_status==3"
                maxlength="500"
                v-model="openApplayMainData.trader_open_prediction"
                show-word-limit
                type="textarea"
              ></el-input>
              <!-- <span v-else>{{openApplayMainData.trader_open_prediction}}</span> -->
            </div>
          </div>
          <div class="node" id="node">
            <p class="bold">
              节点客储计划
              <!-- <el-checkbox v-model="isCheck">变更客储计划</el-checkbox>
              <span class="time">数据更新日期：2020年02月10日</span>-->
            </p>
            <el-table
              :data="customerStorageNode"
              :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              :span-method="mergeCol"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="节点" prop="node_name" width="160"></el-table-column>
              <el-table-column align="center" label="日期" prop="node_time" width="160"></el-table-column>
              <el-table-column align="center" label prop="line_name"></el-table-column>
              <el-table-column align="center" label="报备(组)" prop="report_num"></el-table-column>
              <el-table-column align="center" label="来访(组)" prop="visit_num"></el-table-column>
              <el-table-column align="center" label="小卡(组)" prop="little_num"></el-table-column>
              <el-table-column align="center" label="小卡率(%)">
                <!--  prop="little_per" -->
                <template slot-scope="scope">
                  <span>{{scope.row.little_per ? scope.row.little_per + '%' : scope.row.little_per}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="大卡(组)" prop="big_num"></el-table-column>
              <el-table-column align="center" label="大卡率(%)">
                <!--  prop="big_per" -->
                <template slot-scope="scope">
                  <span>{{scope.row.big_per ? scope.row.big_per + '%' : scope.row.big_per}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="认购(套)" prop="sub_num"></el-table-column>
              <el-table-column align="center" label="成交率(%)" prop="make_per"></el-table-column>
            </el-table>
          </div>
          <div class="come" id="come">
            <p class="bold">来访周拆分</p>
            <el-table
              :data="come_Data"
              :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              :span-method="mergeSpan"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="周期" prop="week" width="160"></el-table-column>
              <el-table-column align="center" label="日期" prop="day_date" width="190"></el-table-column>
              <el-table-column align="center" label="计划新增(组)" prop="plan_add">
                <template slot-scope="scope">
                  <span v-if="scope.row.week=='完整波段'">{{allSum}}</span>
                  <span v-else>{{scope.row.plan_add}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="计划累计(组)" prop="plan_total">
                <!-- <template slot-scope="scope">
                  <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.plan_total"></el-input>
                  <span v-else>{{scope.row.plan_total}}</span>
                </template>-->
              </el-table-column>
              <el-table-column align="center" label="计划阶段任务占比(%)" prop="plan_task_per">
                <template slot-scope="scope">
                  <!-- <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.plan_task_per"></el-input> -->
                  <span>{{scope.row.plan_task_per}}%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="实际新增(组)" prop="actual_add">
                <template slot-scope="scope">
                  <span v-if="scope.row.week=='完整波段'">{{allRate}}</span>
                  <span v-else>{{scope.row.actual_add}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="实际累计(组)" prop="actual_total">
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.week=='完整波段'&&applay_status!=3&&applay_status!=4"
                    v-model="scope.row.actual_total"
                  ></el-input>
                  <span v-else>{{scope.row.actual_total}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="实际阶段任务占比(%)">
                <!--  prop="actual_task_per" -->
                <template slot-scope="scope">
                  <!-- <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.actual_task_per"></el-input> -->
                  <span>{{scope.row.actual_task_per}}%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="绝对偏差值" prop="bias_value">
                <template slot-scope="scope">
                  <span>{{scope.row.bias_value}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="偏差率" prop="bias_per">
                <template slot-scope="scope">
                  <span>{{scope.row.bias_per}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="偏差原因" prop="bias_cause" width="200">
                <template slot-scope="scope">
                  <el-input
                    align="center"
                    v-if="scope.row.is_edit==1&&applay_status!=3&&applay_status!=4&&scope.row.week!=='完整波段'"
                    v-model="scope.row.bias_cause"
                  ></el-input>
                  <span v-else>{{scope.row.bias_cause}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="node" id="node_" v-show="isCheck">
            <p class="bold">变更节点客储计划</p>
            <el-table
              :data="nodePlan"
              :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="节点" prop="nide_name" width="160"></el-table-column>
              <el-table-column align="center" label="日期" prop="node_time" width="160"></el-table-column>
              <el-table-column align="center" label prop="line_name"></el-table-column>
              <el-table-column align="center" label="报备(组)" prop="report_num">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    v-only-number="{min:0}"
                    v-if="node_level<scope.row.node_level"
                    v-model="scope.row.report_num"
                  ></el-input>
                  <span v-else>{{scope.row.report_num}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="来访(组)" prop="visit_num">
                <template slot-scope="scope">
                    <!-- @change="setSum(scope.row)" -->
                  <el-input
                    v-only-number="{min:0}"
                    v-if="node_level<scope.row.node_level"
                    v-model="scope.row.visit_num"
                    @input.native="scope.row.visit_num=parseInt(scope.row.visit_num);setSum(scope.row)"
                  ></el-input>
                  <span v-else>{{scope.row.visit_num}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="小卡(组)" prop="little_num">
                <template slot-scope="scope">
                  <span>{{scope.row.little_num}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="小卡率(%)" prop="little_per">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    v-only-number="{min:0,precision:2}"
                    v-if="node_level<scope.row.node_level"
                    v-model="scope.row.little_per"
                  ></el-input>
                  <span v-else>{{isNaN(scope.row.little_per)?0:scope.row.little_per}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="大卡(组)" prop="big_num">
                <template slot-scope="scope">
                  <span>{{scope.row.big_num}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="大卡率(%)" prop="big_per">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    v-only-number="{min:0,precision:2}"
                    v-if="node_level<scope.row.node_level"
                    v-model="scope.row.big_per"
                  ></el-input>
                  <span v-else>{{isNaN(scope.row.big_per)?0:scope.row.big_per}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="认购(套)" prop="sub_num">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    v-only-number="{min:0}"
                    v-if="node_level<scope.row.node_level"
                    v-model="scope.row.sub_num"
                  ></el-input>
                  <span v-else>{{scope.row.sub_num}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="成交率(%)" prop="make_per">
                <template slot-scope="scope">{{isNaN(scope.row.make_per)?0:scope.row.make_per}}</template>
              </el-table-column>
            </el-table>
          </div>
          <div class="card" id="card" v-show="isCheck">
            <p class="bold">办卡方式</p>
            <el-form :model="cardForm" class="cardForm" label-width="60px" ref="cardForm">
              <el-form-item label="小卡" prop="small">
                <el-input
                  maxlength="100"
                  show-word-limit
                  type="textarea"
                  v-model="cardForm.little_way"
                ></el-input>
              </el-form-item>
              <el-form-item label="大卡" prop="big">
                <el-input
                  maxlength="100"
                  show-word-limit
                  type="textarea"
                  v-model="cardForm.big_way"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="list" id="lists">
            <p class="bold">附件清单</p>
            <div class="operation">
              <el-table
                :data="accessoryData"
                style="width: 100%"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              >
                <el-table-column prop="type" label="附件名称" align="left" width="200"></el-table-column>
                <el-table-column prop="name" label="附件" align="left">
                  <template slot-scope="scope">
                    <a :href="local+scope.row.url">{{scope.row.name}}</a>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="140" align="center">
                  <template slot-scope="scope">
                    <div class="fileBox" v-if="scope.$index<accessoryData.length-1">
                      <el-upload
                        v-if="applay_status!=4&&applay_status!=3&&activeTab==1&&!scope.row.name"
                        :on-exceed="exceed"
                        :action="action"
                        :data="{'filePath':'salesOffice','bizID':'','orderIndex':scope.$index}"
                        :on-success="fileSuccess"
                        :file-list="fileList__[scope.$index]"
                        :on-remove="fileRemove"
                        :on-error="fileError"
                      >
                        <el-button type="text">{{scope.row.handle}}</el-button>
                      </el-upload>
                      <el-button
                        type="text"
                        v-if="applay_status!=4&&applay_status!=3&&activeTab==1&&scope.row.name"
                        @click="delFielList(scope.$index)"
                      >删除</el-button>
                    </div>
                    <div class="fileBox" v-else>
                      <el-upload
                        :action="action"
                        :on-success="fileSuccess"
                        :data="{'filePath':'twentyOneDays','bizID':'','orderIndex':scope.$index}"
                        :on-remove="fileRemove"
                        :on-error="fileError"
                      >
                        <el-button
                          v-if="applay_status!=4&&applay_status!=3&&activeTab==1"
                          type="text"
                        >+{{scope.row.handle}}</el-button>
                      </el-upload>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label name="2">
          <!-- <div class="link">
            <el-button @click="scrollLink('open')" type="text">延期开盘申请表</el-button>
            <el-button @click="scrollLink('rate')" type="text">客储达成进度</el-button>
          </div>-->
          <div class="open" id="open">
            <p class="bold">延期开盘申请表</p>
            <div class="table">
              <div class="table_top">
                <div class="left">日期调整</div>
                <div>
                  <div :key="index" class="_cell" v-for="(item,index) in dateList">{{item.type}}</div>
                </div>
                <div>
                  <div :key="index" class="_cell" v-for="(item,index) in dateList">
                    <span v-if="index!=4">{{openApplyData[item.date]}}</span>
                    <el-date-picker
                      @change="countDate(openApplyData.new_first_time)"
                      format="yyyy-MM-dd"
                      placeholder="选择日期"
                      type="date"
                      v-else-if="index==4&&approval_stuat!=4&&approval_stuat!=3"
                      v-model="openApplyData.new_first_time"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                    <span v-else>{{openApplyData.new_first_time}}</span>
                  </div>
                </div>
              </div>
              <div class="table_bottom">
                <div class="left">延期原因</div>
                <div>
                  <el-input
                    type="textarea"
                    v-if="approval_stuat!=4&&approval_stuat!=3"
                    v-model="openApplyData.delay_reasons"
                  ></el-input>
                  <span v-else>{{openApplyData.delay_reasons}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="rate" id="rate">
            <p class="bold">客储达成进度</p>
            <el-table
              :data="firstReportData"
              :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              :span-method="mergeRow"
              border
              style="width: 100%"
            >
              <el-table-column label prop="type" width="180">
                <template slot-scope="scope">
                  <div class="db_cell">{{scope.row.type}}</div>
                </template>
              </el-table-column>
              <el-table-column label prop="name" width="100">
                <template slot-scope="scope">
                  <div class="db_cell">{{scope.row.name1}}</div>
                </template>
              </el-table-column>
              <el-table-column label="时间段" width="200" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">{{openApplyData[scope.row.val1]}}</div>
                </template>
              </el-table-column>
              <el-table-column label="来访" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <div
                      v-if="scope.$index!=2"
                    >{{isNaN(openApplyData[scope.row.val2])?0:openApplyData[scope.row.val2]}}</div>
                    <el-input
                      @change="setSum_2(scope.row)"
                      type="number"
                      v-only-number="{min:0}"
                      v-else-if="scope.$index==2&&approval_stuat!=4&&approval_stuat!=3"
                      v-model="openApplyData[scope.row.val2]"
                    ></el-input>
                    <span
                      v-else
                    >{{isNaN(openApplyData[scope.row.val2])?0:openApplyData[scope.row.val2]}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="小卡" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <span>{{isNaN(openApplyData[scope.row.val3])?0:openApplyData[scope.row.val3]}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="小卡率(%)" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <div
                      v-if="scope.$index!=2"
                    >{{isNaN(openApplyData[scope.row.val4])?0:openApplyData[scope.row.val4]}}</div>
                    <el-input
                      @change="setSum_2(scope.row)"
                      type="number"
                      v-only-number="{min:0,precision:2}"
                      v-else-if="scope.$index==2&&approval_stuat!=4&&approval_stuat!=3"
                      v-model="openApplyData[scope.row.val4]"
                    ></el-input>
                    <span
                      v-else
                    >{{isNaN(openApplyData[scope.row.val4])?0:openApplyData[scope.row.val4]}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="大卡" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <span>{{isNaN(openApplyData[scope.row.val5])?0:openApplyData[scope.row.val5]}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="大卡率(%)" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <div
                      v-if="scope.$index!=2"
                    >{{isNaN(openApplyData[scope.row.val6])?0:openApplyData[scope.row.val6]}}</div>
                    <el-input
                      @change="setSum_2(scope.row)"
                      type="number"
                      v-only-number="{min:0,precision:2}"
                      v-else-if="scope.$index==2&&approval_stuat!=4&&approval_stuat!=3"
                      v-model="openApplyData[scope.row.val6]"
                    ></el-input>
                    <div
                      v-else
                    >{{isNaN(openApplyData[scope.row.val6])?0:openApplyData[scope.row.val6]}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="认购" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <div
                      v-if="scope.$index!=2"
                    >{{isNaN(openApplyData[scope.row.val7])?0: parseInt(openApplyData[scope.row.val7])}}</div>
                    <el-input
                      @change="setSum_2(scope.row)"
                      type="number"
                      v-only-number="{min:0}"
                      v-else-if="scope.$index==2&&approval_stuat!=4&&approval_stuat!=3"
                      v-model="openApplyData[scope.row.val7]"
                    ></el-input>
                    <span
                      v-else
                    >{{isNaN(openApplyData[scope.row.val7])?0:openApplyData[scope.row.val7]}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="成交率(%)" prop="num">
                <template slot-scope="scope">
                  <div class="db_cell">{{openApplyData[scope.row.val8]}}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="node" id="ChageNode">
            <p class="bold">变更节点客储计划</p>
            <el-table
              :data="customerNodeStorage"
              :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="节点" prop="node_name" width="160"></el-table-column>
              <el-table-column align="center" label="日期" prop="node_time" width="160"></el-table-column>
              <el-table-column align="center" label prop="line_name"></el-table-column>

              <el-table-column align="center" label="来访(组)" prop="visit_num">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-only-number="{min:0}"
                    v-if="1==1&&approval_stuat!=4&&approval_stuat!=3"
                    v-model="scope.row.visit_num"
                    @input.native="scope.row.visit_num=parseInt(scope.row.visit_num)"
                  ></el-input>
                  <span v-else>{{scope.row.visit_num}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="小卡(组)" prop="little_num">
                <template slot-scope="scope">
                  <span>{{scope.row.little_num || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="小卡率(%)" prop="little_per">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-only-number="{min:0}"
                    v-if="1==1&&approval_stuat!=4&&approval_stuat!=3"
                    v-model="scope.row.little_per"
                  ></el-input>
                  <span v-else>{{isNaN(scope.row.little_per)?0:scope.row.little_per}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="大卡(组)" prop="big_num">
                <template slot-scope="scope">
                  <span>{{scope.row.big_num ||0}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="大卡率(%)" prop="big_per">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-only-number="{min:0}"
                    v-if="1==1&&approval_stuat!=4&&approval_stuat!=3"
                    v-model="scope.row.big_per"
                  ></el-input>
                  <span v-else>{{isNaN(scope.row.big_per)?0:scope.row.big_per}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="认购(套)" prop="sub_num">
                <template slot-scope="scope">
                  <el-input
                    @change="setSum(scope.row)"
                    type="number"
                    v-only-number="{min:0}"
                    v-if="1==1&&approval_stuat!=4&&approval_stuat!=3"
                    v-model="scope.row.sub_num"
                  ></el-input>
                  <span v-else>{{scope.row.sub_num}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="成交率(%)" prop="make_per">
                <template slot-scope="scope">{{isNaN(scope.row.make_per)?0:scope.row.make_per}}</template>
              </el-table-column>
            </el-table>
          </div>
          <div class="card" id="card_2">
            <p class="bold">办卡方式</p>
            <el-form :model="cardForm" class="cardForm" label-width="60px" ref="cardForm">
              <el-form-item label="小卡" prop="small">
                <el-input
                  maxlength="100"
                  show-word-limit
                  type="textarea"
                  v-if="approval_stuat!=4&&approval_stuat!=3"
                  v-model="openApplyData.little_model"
                ></el-input>
                <span v-else>{{openApplyData.little_model}}</span>
              </el-form-item>
              <el-form-item label="大卡" prop="big">
                <el-input
                  maxlength="100"
                  show-word-limit
                  type="textarea"
                  v-if="approval_stuat!=4&&approval_stuat!=3"
                  v-model="openApplyData.big_model"
                ></el-input>
                <span v-else>{{openApplyData.big_model}}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="come" id="come_2">
            <p class="bold">变更来访周拆分</p>
            <el-table
              :data="comeDataCopy_2"
              :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              :span-method="mergeSpan"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="周期" prop="week" width="160"></el-table-column>
              <el-table-column align="center" label="日期" prop="day_date" width="300"></el-table-column>
              <el-table-column align="center" label="计划新增(组)" prop="plan_add">
                <template slot-scope="scope">
                  <!-- <span v-if="scope.row.week=='完整波段'">{{allSum}}</span> -->
                  <!-- <span v-else>{{scope.row.plan_add}}</span> -->
                  <el-input
                    v-if="scope.row.week!=='完整波段'&&approval_stuat!=4&&approval_stuat!=3"
                    v-model="scope.row.plan_add"
                  ></el-input>
                  <span v-else-if="scope.row.week=='完整波段'">{{come_sum_2 | fixed}}</span>
                  <span v-else>{{scope.row.plan_add}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="计划累计(组)" prop="plan_total">
                <template slot-scope="scope">
                  <!--
                  <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.plan_total"></el-input>
                  <span v-else>{{scope.row.plan_total}}</span>
                  -->
                  <span>{{scope.row.plan_total | fixed}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="计划阶段任务占比(%)" prop="plan_task_per">
                <template slot-scope="scope">
                  <!-- <el-input v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'" v-model="scope.row.plan_task_per"></el-input> -->
                  <span>{{scope.row.plan_task_per}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="lists" id="lists">
            <p class="bold">附件清单</p>
            <div class="accessory">
              <el-table
                :data="thataccessoryData"
                style="width: 100%"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              >
                <el-table-column prop="type" label="附件名称" align="left" width="200"></el-table-column>
                <el-table-column prop="name" label="附件" align="left">
                  <template slot-scope="scope">
                    <a :href="local+scope.row.url">{{scope.row.name}}</a>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="140" align="center">
                  <template slot-scope="scope">
                    <div class="fileBox" v-if="scope.$index<thataccessoryData.length-1">
                      <el-upload
                        v-if="approval_stuat!=4&&approval_stuat!=3&&activeTab==2&&!scope.row.name"
                        :on-exceed="exceed"
                        :action="action"
                        :data="{'filePath':'sevenDays','bizID':'','orderIndex':scope.$index}"
                        :on-success="thatfileSuccess"
                        :file-list="fileList__[scope.$index]"
                        :on-remove="fileRemove"
                        :on-error="fileError"
                      >
                        <el-button type="text">{{scope.row.handle}}</el-button>
                      </el-upload>
                      <el-button
                        type="text"
                        v-if="approval_stuat!=4&&approval_stuat!=3&&activeTab==2&&scope.row.name"
                        @click="thatdelFielList(scope.$index)"
                      >删除</el-button>
                    </div>
                    <div class="fileBox" v-else>
                      <el-upload
                        :action="action"
                        :on-success="thatfileSuccess"
                        :data="{'filePath':'sevenDays','bizID':'','orderIndex':scope.$index}"
                        :on-remove="fileRemove"
                        :on-error="fileError"
                      >
                        <el-button
                          v-if="approval_stuat!=4&&approval_stuat!=3&&activeTab==2"
                          type="text"
                        >+{{scope.row.handle}}</el-button>
                      </el-upload>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="null"></div>
    <div class="bottom" v-if="isType!='view'">
      <el-button
        @click="update('1')"
        type="primary"
        v-if="approval_stuat!=3&&approval_stuat!=4&&activeTab==2"
        v-show="$store.state.user.userPower.includes('提交审批')"
      >提交审批</el-button>
      <el-button @click="update('0')" v-if="approval_stuat!=4&&approval_stuat!=3&&activeTab==2">保存</el-button>
      <el-button
        @click="update('3')"
        v-if="approval_stuat!=4&&approval_stuat!=3&&activeTab==2"
        v-show="isShowKS"
      >快速审批</el-button>
      <el-button
        @click="update('1')"
        type="primary"
        v-if="applay_status!=4&&applay_status!=3&&activeTab==1"
        v-show="$store.state.user.userPower.includes('提交审批')"
      >提交审批</el-button>
      <el-button @click="update('0')" v-if="applay_status!=4&&applay_status!=3&&activeTab==1">保存</el-button>
      <el-button
        @click="update('3')"
        v-if="applay_status!=4&&applay_status!=3&&activeTab==1"
        v-show="isShowKS"
      >快速审批</el-button>
    </div>
  </div>
</template>

<script>
import {
  updateNodePlan,
  viewdelayOpenApplay,
  switchVersion,
  savelayOpenApplay,
  updatePlanTime,
  viewOpenBeforeSevenDayOpenApplay,
  getWeeklyResolution,
  saveOpenBeforeSevenDayOpenApplay,
  switchVersionSevenDayOpenApplay,
  forMtstartThreeAndTwo,
  get
} from "@/api/firstPlan";
import { toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";
import { downLoad } from "@/api/request";

export default {
  components: {
    navbarLink: () => import("./components/navbarLink")
  },
  data() {
    return {
      isType: "",
      upflag: true,
      isShowKS: location.origin.includes("uat"),
      formLabelWidth: "120px",
      dialogFormVisible: false,
      activeTab: "1",
      isCheck: false,
      newVersionFlag: false,
      cardForm: {
        big_way: "",
        little_way: ""
      },
      accessoryData: [
        {
          type: "",
          handle: "其他上传"
        }
      ],
      priceList: [{}],
      applay_status: "0",
      firstOpenAvgData: [],

      openApplayMainData: {
        id: "",
        plan_id: "",
        plan_node_id: "",
        product_type_code: "",
        invest_open_node: "",
        invest_product_type: "",
        invest_take_card_value: "",
        invest_push_value: "",
        invest_selling_value: "",
        invest_avg_price: "",
        invest_operation_bfb: "",
        invest_take_card_per: "",
        invest_this_per: "",
        invest_all_per: "",
        invest_irr: "",
        invest_payback: "",
        rules_open_node: "",
        rules_product_type: "",
        rules_take_card_value: "",
        rules_push_value: "",
        rules_selling_value: "",
        rules_avg_price: "",
        rules_operation_bfb: "",
        rules_take_card_per: "",
        rules_this_per: "",
        rules_all_per: "",
        rules_irr: "",
        rules_payback: "",
        designtwo_open_node: "",
        designtwo_product_type: "",
        designtwo_take_card_value: "",
        designtwo_push_value: "",
        designtwo_selling_value: "",
        designtwo_avg_price: "",
        designtwo_operation_bfb: "",
        designtwo_take_card_per: "",
        designtwo_this_per: "",
        designtwo_all_per: "",
        designtwo_irr: "",
        designtwo_payback: "",
        estimate_open_node: "",
        estimate_product_type: "",
        estimate_take_card_value: "",
        estimate_push_value: "",
        estimate_selling_value: "",
        estimate_avg_price: "",
        estimate_operation_bfb: "",
        estimate_take_card_per: "",
        estimate_this_per: "",
        estimate_all_per: "",
        estimate_irr: "",
        estimate_payback: "",
        deviation_open_node: "",
        deviation_product_type: "",
        deviationper_take_card_value: "",
        deviation_push_value: "",
        deviation_selling_value: "",
        deviation_avg_price: "",
        deviation_operation_price: "",
        deviation_take_card_per: "",
        deviation_this_per: "",
        deviation_all_per: "",
        deviation_irr: "",
        deviation_payback: "",
        deviationper_open_node: "",
        deviationper_product_type: "",
        deviationper_take_card_value: "",
        deviationper_push_value: "",
        deviationper_selling_value: "",
        deviationper_avg_price: "",
        deviationper_operation_price: "",
        deviationper_take_card_per: "",
        deviationper_this_per: "",
        deviationper_all_per: "",
        deviationper_irr: "",
        deviationper_payback: "",
        cause_open_node: "",
        cause_product_type: "",
        cause_take_card_value: "",
        cause_push_value: "",
        cause_selling_value: "",
        cause_avg_price: "",
        cause_operation_price: "",
        cause_take_card_per: "",
        cause_this_per: "",
        cause_all_per: "",
        cause_irr: "",
        cause_payback: "",
        competing_relation: "",
        competing_product: "",
        plate_dynamic: "",
        competing_condition: "",
        repot_customer_target: "",
        repot_customer_actual: "",
        repot_customer_per: "",
        come_way: "",
        come_customer_target: "",
        come_customer_actual: "",
        come_customer_per: "",
        lesser_way: "",
        lesser_customer_target: "",
        lesser_customer_actual: "",
        lesser_customer_per: "",
        big_way: "",
        big_customer_target: "",
        big_customer_actual: "",
        big_customer_per: "",
        sub_customer_target: "",
        sub_customer_actual: "",
        sub_customer_per: "",
        this_customer_visit: "",
        this_customer_conversionper: "",
        customer_cause: "",
        trader_open_prediction: "",
        version: "",
        create_time: ""
      },
      fromData: {
        product_project: "",
        first_opentime: "",
        take_money: "",
        month_avg_flow: "",
        avg_price_product: ""
      },
      competingpPoducts: [
        {
          product_project: "",
          first_opentime: "",
          take_money: "",
          month_avg_flow: "",
          avg_price_product: ""
        }
      ],
      allSum: 0,
      allSum_2: 0,
      fileList__: [],
      fileList: [],
      flowData: [],
      thataccessoryData: [
        {
          type: "",
          handle: "其他上传"
        }
      ],
      isShowVersion: false,
      form: {},
      node_level: this.$route.query.node_level,
      comeData: [],
      customerStorageNode: [],
      NodePlanWrite: [],
      listData: [{ type: "开盘前三个月清项清单" }],
      come_Data: [],
      versionsList: [],
      versionData: [],
      thisVserion: "",
      customerNodeStorage: [],
      approval_stuat: "",
      flow_id: "",
      weekData: [
        {
          id: "",
          week: "",
          start_time: "",
          end_time: "",
          day_date: "",
          plan_add: "",
          plan_total: "",
          plan_task_per: "",
          actual_add: "",
          actual_total: "",
          plan_task_per: ""
        }
      ],
      firstReportData: [
        {
          type: "顶设2客储计划与达成",
          name1: "计划",
          val1: "reach_plan_time",
          val2: "reach_plan_visit_num",
          val3: "reach_plan_little_num",
          val4: "reach_plan_little_per",
          val5: "reach_plan_big_num",
          val6: "reach_plan_big_per",
          val7: "reach_plan_sub_num",
          val8: "reach_plan_take_per"
        },
        {
          type: "顶设2客储计划与达成",
          name1: "实际",
          val1: "reach_actual_time",
          val2: "reach_actual_visit_num",
          val3: "reach_actual_littel_num",
          val4: "reach_actual_littel_per",
          val5: "reach_actual_big_num",
          val6: "reach_actual_big_per",
          val7: "reach_actual_sub_num",
          val8: "reach_actual_take_per"
        },
        {
          type: "延期开盘后新增客储预估",
          name1: "计划",
          val1: "estimate_plan_time",
          val2: "estimate_plan_visit_num",
          val3: "estimate_plan_little_num",
          val4: "estimate_plan_little_per",
          val5: "estimate_plan_big_num",
          val6: "estimate_plan_big_per",
          val7: "estimate_plan_sub_num",
          val8: "estimate_plan_take_per"
        },
        {
          type: "延期开盘后合计客储",
          name1: "",
          val1: "sum_time",
          val2: "sum_visit_num",
          val3: "sum_little_num",
          val4: "sum_little_per",
          val5: "sum_big_num",
          val6: "sum_big_per",
          val7: "sum_sub_num",
          val8: "sum_take_per"
        }
      ],
      openApplyData: {
        id: "",
        rules_time: "",
        designtwo_time: "",
        new_first_time: "",
        plan_id: "",
        plan_node_id: "",
        delay_daynum: "",
        delay_reasons: "",
        level: "",
        approval_stuat: "",
        big_model: "",
        little_model: "",
        version: "",
        reach_plan_time: "",
        reach_plan_visit_num: "",
        reach_plan_little_num: "",
        reach_plan_big_num: "",
        reach_plan_big_per: "",
        reach_plan_little_per: "",
        reach_plan_sub_num: "",
        reach_plan_take_per: "",
        reach_actual_time: "",
        reach_actual_visit_num: "",
        reach_actual_littel_num: "",
        reach_actual_littel_per: "",
        reach_actual_big_num: "",
        reach_actual_big_per: "",
        reach_actual_sub_num: "",
        reach_actual_take_per: "",
        estimate_plan_time: "",
        estimate_plan_visit_num: "",
        estimate_plan_little_num: "",
        estimate_plan_little_per: "",
        estimate_plan_big_per: "",
        estimate_plan_big_num: "",
        estimate_plan_take_per: "",
        estimate_plan_sub_num: "",
        sum_time: "",
        sum_visit_num: "",
        sum_little_num: "",
        sum_little_per: "",
        sum_big_num: "",
        sum_big_per: "",
        sum_sub_num: "",
        sum_take_per: ""
      },
      dateList: [
        {
          type: "战规版开盘日期",
          date: "rules_time"
        },
        {
          type: "顶设2开盘日期",
          date: "designtwo_time"
        },
        {
          type: "新申请开盘前21天",
          date: "new_applay_21time"
        },
        {
          type: "新申请开盘前7天",
          date: "new_applay_7time"
        },
        {
          type: "新申请开盘日期",
          date: "new_first_time"
        },
        {
          type: "延期天数",
          date: "delay_daynum"
        }
      ],
      clientInfoList: [
        {
          type: "来访",
          val1: "come_customer_target",
          val2: "come_customer_actual",
          val3: "come_customer_per"
        },
        {
          type: "小卡",
          val1: "lesser_customer_target",
          val2: "lesser_customer_actual",
          val3: "lesser_customer_per"
        },
        {
          type: "大卡",
          val1: "big_customer_target",
          val2: "big_customer_actual",
          val3: "big_customer_per"
        }
      ],
      openDayObj: {
        type1: "当天到访量（组）",
        type2: "当天转化率（%）",
        type3: "认购套数",
        type4: "成交率（%）",
        num: "123"
      },
      firstOpenVlaue: {
        num: "123",
        type1: "首开节点",
        type2: "产品类型",
        type3: "首开取证货值（万元）",
        type4: "首开推售货值（万元）",
        type5: "首开去化货值（万元",
        type6: "不同业态价差",
        type7: "当期利润率",
        type8: "整盘利润率",
        type9: "非融IRR",
        type10: "静态投资回收期（月）",
        list1: [
          { type: "首开均价", name: "高层(19-34层）", num: "123" },
          { type: "首开均价", name: "小高层(9-11层）", num: "123" },
          { type: "首开均价", name: "车位", num: "123" }
        ],
        list2: [
          { type: "不同业态价差", num: "123" },
          { type: "不同业态价差", num: "123" }
        ]
      }
    };
  },
  created() {
    if (this.$route.query.type != null && this.$route.query.type == "view") {
      this.isType = this.$route.query.type;
    }
    this.reload();
  },
  filters: {
    fixed: function(data) {
      if (!data || data === 0) {
        return "0.00";
      }
      if (isNaN(data)) {
        return "0.00";
      }
      return data.toFixed(2);
    },
    twofix: function(data) {
      if (!data || data === 0) {
        return "0.00";
      }
      if (isNaN(data)) {
        return "0.00";
      }
      return data.toFixed(2);
    }
  },
  computed: {
    action() {
      let href = process.env.VUE_APP_BASE_API;
      return href + "/Upload/uploadFile_2";
    },
    disableds() {
      return this.$route.query.disabled;
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
    allRate() {
      return this.come_Data[this.come_Data.length - 1].actual_total;
    },
    nodePlan() {
      return this.NodePlanWrite.filter(item => item.level == 1);
    },
    come_sum() {
      let sum = 0;
      let mylist = [...this.come_Data].concat();
      mylist.splice(0, 1);
      mylist.forEach(item => {
        sum += Number(item.plan_add);
      });
      return sum;
    },
    come_sum_2() {
      let sum = 0;
      let mylist = [...this.weekData].concat();
      mylist.splice(0, 1);
      mylist.forEach(item => {
        sum += isNaN(Number(item.plan_add)) ? 0 : Number(item.plan_add);
      });
      console.log(sum);
      return sum;
    },
    comeDataCopy_2() {
      console.log(this.weekData, "......>");
      let arr = [...this.weekData];
      arr.forEach((item, index) => {
        if (index == 1) {
          if (isNaN(Number(item.plan_add))) {
            item.plan_total = 0;
          } else {
            item.plan_total = Number(item.plan_add);
          }
        }
        if (index > 1) {
          if (isNaN(Number(item.plan_add))) {
            item.plan_total = 0;
          } else {
            item.plan_total =
              Number(item.plan_add) +
              Number(this.weekData[index - 1].plan_total);
          }
        }
      });
      // let sum =arr[arr.length-1].plan_total
      arr.forEach(item => {
        let plan_task_per = 0;
        if (Number(this.allSum_2)) {
          plan_task_per = isNaN(
            (Number(item.plan_add) / Number(this.allSum_2)) * 100
          )
            ? 0
            : (Number(item.plan_add) / Number(this.allSum_2)) * 100;
        }
        item.plan_task_per = plan_task_per.toFixed(0);
      });
      return arr;
    },
    this_customer_conversionper() {
      let sum = 0;
      let {
        sub_customer_actual,
        this_customer_visit
      } = this.openApplayMainData;
      if (sub_customer_actual && this_customer_visit) {
        sum = ((sub_customer_actual / this_customer_visit) * 100).toFixed(2);
      }
      this.$set(this.openApplayMainData, "this_customer_conversionper", sum);
      return sum;
    }
  },
  watch: {
    come_Data: {
      handler(a, b) {
        let sum = 0;
        a.forEach(item => {
          if (item.plan_add) {
            sum += Number(item.plan_add);
          }
        });
        this.allSum = sum;
      },
      deep: true
    },
    weekData: {
      handler(a, b) {
        let sum = 0;
        a.forEach(item => {
          if (item.plan_add) {
            sum += isNaN(Number(item.plan_add)) ? 0 : Number(item.plan_add);
          }
        });
        this.allSum_2 = sum;
      },
      deep: true
    }
    // priceList(val) {
    //   this.getProportion("open_estimate", "estimate_operation_bfb");
    //   this.getProportion("designtwo_avg", "designtwo_operation_bfb");
    //   this.getProportion("rules_avg", "rules_operation_bfb");
    //   this.getProportion("invest_avg", "invest_operation_bfb");
    // }
  },
  methods: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d;
    },
    getSpecialNum(arr) {
      console.log(arr, "arr>?");
      arr = arr.filter(item => item != 0);
      let min = Math.min(...arr);
      let str = "";
      console.log(min);
      let flag = false;
      arr.forEach((num, index) => {
        let temp = ((num * 100) / (min * 100)).toFixed(1);
        if ((num * 100) % (min * 100) == 0) {
          temp = (num * 100) / (min * 100);
        }
        if (isNaN(Number(temp))) {
          flag = true;
        }
        if (index == 0) {
          str += temp;
        } else {
          str += ":" + temp;
        }
      });
      console.log(str);
      if (flag) {
        return "--";
      }
      return str;
    },
    getProportion(k, c) {
      if (this.priceList.length <= 1) {
        this.$set(this.openApplayMainData, c, "--");
      } else {
        let params = this.priceList.map(i => i[k]);
        let result = this.getSpecialNum(params);
        this.$set(this.openApplayMainData, c, result);
      }
    },
    spanCurrage({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 4) {
        if (rowIndex == 0) {
          return [3, 1];
        } else {
          return [0, 0];
        }
      }
    },

    toPreview() {
      // if (this.activeTab == 1) {
      // this.$router.push({
      //   path: "/sevenDaysOpening",
      //   query: {
      //     thisVersion: this.thisVserion,
      //     project_id: this.$route.query.project_id,
      //     plan_node_id: this.$route.query.plan_node_id,
      //     plan_id: this.$route.query.plan_id,
      //     node_level: this.$route.query.node_level
      //   }
      // });

      toHistoryUrl({
        proInstId: this.flow_id
      }).then(res => {
        window.open(res.data);
      });
      /*   forMtstartThreeAndTwo({
        flow_id: this.thisVserion
      }).then(res => {
        get(
          `/Workflow/MTStart2.aspx?BSID=FP&BTID=${res.result.result.BTID}&BOID=${res.result.result.codeBOID}&UserID=${res.result.result.bkUserID}&LoginKey=${res.result.result.loginKey}`
        ).then(res => {
          if (res.code == 200 || res.result.code == 200) {
            window.open(res.data);
          } else {
            this.$message.error(res.messages || res.result.messages);
          }
        });
      });*/
      // }
      // if (this.activeTab == 2) {
      //   this.$router.push({
      //     path: "/sevenAndTwentyOnePostpone",
      //     query: {
      //       thisVersion: this.thisVserion,
      //       project_id: this.$route.query.project_id,
      //       plan_node_id: this.$route.query.plan_node_id,
      //       plan_id: this.$route.query.plan_id,
      //       node_level: this.$route.query.node_level
      //     }
      //   });
      // }
    },
    submitProject(obj) {
      console.log(obj);
      console.log(this.competingpPoducts);
      this.competingpPoducts.push(obj);
      this.dialogFormVisible = false;
    },
    deleteObj(index) {
      this.competingpPoducts.splice(index, 1);
    },
    getDiffRate() {
      console.log(this.priceList);
      this.getProportion("open_estimate", "estimate_operation_bfb");
      this.priceList.forEach((item, index) => {
        this.$set(
          this.priceList[index],
          "bias_price",
          Number(item.designtwo_avg) - Number(item.open_estimate)
        );
        // bias_per
        // designtwo_avg - open_estimate
        let designtwo_avg = Number(item.designtwo_avg);
        let open_estimate = Number(item.open_estimate);
        let sum = 0;
        if (designtwo_avg) {
          sum = ((designtwo_avg - open_estimate) / designtwo_avg) * 100;
        }
        this.$set(this.priceList[index], "bias_per", sum);
      });
    },
    getDateDiff: function(estimate_open_node) {
      if (estimate_open_node && this.openApplayMainData.designtwo_open_node) {
        var date1 = new Date(estimate_open_node);
        var date2 = new Date(this.openApplayMainData.designtwo_open_node);
        var total = date2 - date1;
        var diffDay = total / 86400000;
        if (diffDay < 0) {
          diffDay = -diffDay;
        }
        this.$set(this.openApplayMainData, "deviation_open_node", diffDay);
      }
    },
    getDiff(type) {
      if (type == "estimate_take_card_value") {
        this.$set(
          this.openApplayMainData,
          "deviation_take_card_value",
          Number(this.openApplayMainData.designtwo_take_card_value) -
            Number(this.openApplayMainData.estimate_take_card_value)
        );
        this.$set(
          this.openApplayMainData,
          "estimate_take_card_per",
         this.openApplayMainData.estimate_take_card_value==0?"--":(Number(this.openApplayMainData.estimate_selling_value) /
            Number(this.openApplayMainData.estimate_take_card_value)) *
            100
        );
        let {
          designtwo_take_card_value,
          estimate_take_card_value
        } = this.openApplayMainData;
        designtwo_take_card_value = Number(designtwo_take_card_value);
        estimate_take_card_value = Number(estimate_take_card_value);
        this.$set(
          this.openApplayMainData,
          "deviationper_take_card_value",
          designtwo_take_card_value==0?"--":((designtwo_take_card_value - estimate_take_card_value) /
            designtwo_take_card_value) *
            100
        );
      } else if (type == "estimate_push_value") {
        this.$set(
          this.openApplayMainData,
          "deviation_push_value",
          Number(this.openApplayMainData.designtwo_push_value) -
            Number(this.openApplayMainData.estimate_push_value)
        );
        let {
          designtwo_push_value,
          estimate_push_value
        } = this.openApplayMainData;
        designtwo_push_value = Number(designtwo_push_value);
        estimate_push_value = Number(estimate_push_value);
        this.$set(
          this.openApplayMainData,
          "deviationper_push_value",
           designtwo_push_value==0?"--":((designtwo_push_value - estimate_push_value) /
            designtwo_push_value) *
            100
        );
      } else if (type == "estimate_selling_value") {
        this.$set(
          this.openApplayMainData,
          "deviation_selling_value",
          Number(this.openApplayMainData.designtwo_selling_value) -
            Number(this.openApplayMainData.estimate_selling_value)
        );
        this.$set(
          this.openApplayMainData,
          "estimate_take_card_per",
         this.openApplayMainData.estimate_take_card_value==0?"--": (Number(this.openApplayMainData.estimate_selling_value) /
            Number(this.openApplayMainData.estimate_take_card_value)) *
            100
        );
        let {
          designtwo_selling_value,
          estimate_selling_value
        } = this.openApplayMainData;
        designtwo_selling_value = Number(designtwo_selling_value);
        estimate_selling_value = Number(estimate_selling_value);
        this.$set(
          this.openApplayMainData,
          "deviationper_selling_value",
          designtwo_selling_value==0?"--":((designtwo_selling_value - estimate_selling_value) /
            designtwo_selling_value) *
            100
        );
      } else if (type == "estimate_this_per") {
        this.$set(
          this.openApplayMainData,
          "deviation_this_per",
          Number(this.openApplayMainData.designtwo_this_per) -
            Number(this.openApplayMainData.estimate_this_per)
        );
        let { designtwo_this_per, estimate_this_per } = this.openApplayMainData;
        designtwo_this_per = Number(designtwo_this_per);
        estimate_this_per = Number(estimate_this_per);
        this.$set(
          this.openApplayMainData,
          "deviationper_this_per",
          designtwo_this_per==0?"--":((designtwo_this_per - estimate_this_per) / designtwo_this_per) * 100
        );
      } else if (type == "estimate_all_per") {
        this.$set(
          this.openApplayMainData,
          "deviation_all_per",
          Number(this.openApplayMainData.designtwo_all_per) -
            Number(this.openApplayMainData.estimate_all_per)
        );
        let { designtwo_all_per, estimate_all_per } = this.openApplayMainData;
        designtwo_all_per = Number(designtwo_all_per);
        estimate_all_per = Number(estimate_all_per);
        this.$set(
          this.openApplayMainData,
          "deviationper_all_per",
          designtwo_all_per==0?"--":((designtwo_all_per - estimate_all_per) / designtwo_all_per) * 100
        );
      } else if (type == "estimate_irr") {
        this.$set(
          this.openApplayMainData,
          "deviation_irr",
          Number(this.openApplayMainData.designtwo_irr) -
            Number(this.openApplayMainData.estimate_irr)
        );
        let { designtwo_irr, estimate_irr } = this.openApplayMainData;
        designtwo_irr = Number(designtwo_irr);
        estimate_irr = Number(estimate_irr);
        this.$set(
          this.openApplayMainData,
          "deviationper_irr",
          designtwo_irr==0?"--":((designtwo_irr - estimate_irr) / designtwo_irr) * 100
        );
      } else if ((type = "estimate_payback")) {
        this.$set(
          this.openApplayMainData,
          "deviation_payback",
          Number(this.openApplayMainData.designtwo_payback) -
            Number(this.openApplayMainData.estimate_payback)
        );
        let { designtwo_payback, estimate_payback } = this.openApplayMainData;
        designtwo_payback = Number(designtwo_payback);
        estimate_payback = Number(estimate_payback);
        this.$set(
          this.openApplayMainData,
          "deviationper_payback",
          designtwo_payback==0?"--":((designtwo_payback - estimate_payback) / designtwo_payback) * 100
        );
      }
    },
    switchVersionSevenDayOpenApplay() {
      switchVersionSevenDayOpenApplay({
        id: this.thisVserion,
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7"
      }).then(res => {
        this.applay_status = res.result.openApplayMainData.approval_stuat;
        if (this.$route.query.disabled) {
          this.applay_status = 4;
        }
        this.openApplayMainData = res.result.openApplayMainData;
        this.priceList = res.result.firstOpenAvgData;
        if (res.result.competingpPoducts) {
          this.competingpPoducts = res.result.competingpPoducts;
        } else {
          this.competingpPoducts = [];
        }
        if (res.result.openApplayMainData.new_first_time) {
          this.countDate(res.result.openApplayMainData.new_first_time);
        }
        if (res.result.openApplayMainData.flow_id) {
          this.flow_id = res.result.openApplayMainData.flow_id;
        } else {
          this.flow_id = "";
        }
        this.getDateDiff(res.result.openApplayMainData.estimate_open_node);
        this.getProportion("open_estimate", "estimate_operation_bfb");
        this.getProportion("designtwo_avg", "designtwo_operation_bfb");
        this.getProportion("rules_avg", "rules_operation_bfb");
        this.getProportion("invest_avg", "invest_operation_bfb");
        this.customerStorageNode = res.result.customerStorageNode;
        this.come_Data = res.result.weekStroageData;
        this.firstOpenAvgData = res.result.firstOpenAvgData;
        if (res.result.fileList) {
          arr5 = res.result.fileList;
        } else {
          let arr5 = [];
        }

        this.accessoryData = [
          {
            type: "",
            handle: "其他上传"
          }
        ];
        if (arr5.length > 0) {
          let temp = this.accessoryData.pop();
          arr5.forEach((item, index) => {
            this.accessoryData.push({
              type: "其他上传",
              handle: "上传",
              id: item.id,
              name: item.name,
              url: item.url,
              orderIndex: item.orderIndex
            });
          });
          this.accessoryData.push(temp);
        }
      });
    },
    tabClick(tab, event) {
      if (this.activeTab == 1) {
        this.versionData = [];
        this.viewOpenBeforeSevenDayOpenApplay("");
      }
      if (this.activeTab == 2) {
        // this.approval_stuat = 1;

        this.viewdelayOpenApplay();
      }
    },
    switchVersion() {
      if (this.activeTab == 2) {
        this.switchVersionByVersionID();
      } else {
        this.switchVersionSevenDayOpenApplay();
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
    countDate(date) {
      var aDate, oDate1, oDate2, iDays;
      aDate = date.split("-");
      oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]); //转换为02-05-2018格式
      aDate = this.openApplyData.designtwo_time.split("-");
      oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
      this.openApplyData.delay_daynum = iDays;

      this.customerNodeStorage = [];
      var rules_time = this.openApplyData.rules_time;
      var asd = +new Date(date) - 7 * 86400000;
      var node_time1 = this.FomartDate(new Date(asd));
      var qwe = +new Date(date) - 21 * 86400000;
      var node_time2 = this.FomartDate(new Date(qwe));
      this.openApplyData.new_applay_7time = node_time1;
      this.openApplyData.new_applay_21time = node_time2;
      this.customerNodeStorage.push({
        node_name: "首开前21天",
        node_time: node_time2,
        line_name: "计划",
        level: "1",
        node_level: "6"
      });
      this.customerNodeStorage.push({
        node_name: "首开前7天",
        node_time: node_time1,
        line_name: "计划",
        level: "1",
        node_level: "7"
      });
      this.customerNodeStorage.push({
        node_name: "首开",
        node_time: date,
        line_name: "计划",
        level: "1",
        node_level: "8"
      });

      if (this.openApplyData.designtwo_time) {
        var time = this.openApplyData.designtwo_time.split("-");
        var time2 = date.split("-");
        var s = time[0] + "." + time[1] + "." + time[2];
        var s2 = time2[0] + "." + time2[1] + "." + time2[2];
        this.openApplyData.estimate_plan_time = s + "-" + s2;
      }

      if (this.openApplyData.open_time) {
        var time = this.openApplyData.open_time.split("-");
        var time2 = date.split("-");
        var s = time[0] + "." + time[1] + "." + time[2];
        var s2 = time2[0] + "." + time2[1] + "." + time2[2];
        this.openApplyData.sum_time = s + "-" + s2;
      }

      this.getWeeklyResolution(date);
    },

    //延期看盘申请--获取周拆分数据

    getWeeklyResolution(new_first_time) {
      getWeeklyResolution({
        start_time: this.openApplyData.designtwo_time,
        end_time: new_first_time
      }).then(res => {
        if (res.code != 200) {
          this.functionDrawer = false;
          this.weekData = [];
          this.openApplyData.new_first_time = "";
          this.$message({
            type: "error",
            message: res.message
          });
        } else {
          this.weekData = res.result;
        }
      });
    },
    exportDelayData() {
      var _path;
      let nowProject = JSON.parse(localStorage.getItem("nowProject"))
        .nowProject;
      let obj = {
        projectName: nowProject,
        node_level: this.$route.query.node_level,
        id: this.thisVserion
      };
      console.log(obj);
      if (this.activeTab == 2) {
        _path = downLoad(
          "/openBeforeTwentyone/exportDelayOpenData.action",
          obj
        );
      } else {
        _path = downLoad("/openBeforeSeven/exportOpenApplayData.action", obj);
      }
      window.location = _path;
    },
    viewOpenBeforeSevenDayOpenApplay(create) {
      viewOpenBeforeSevenDayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7",
        create: create,
        project_id: this.$route.query.project_id
      }).then(res => {
        if (res.result.versionData) {
          this.versionData = res.result.versionData;

          this.thisVserion = res.result.versionData[0].id;
        } else {
          this.thisVserion = "";
        }
        if (res.result.openApplayMainData.flow_id) {
          this.flow_id = res.result.openApplayMainData.flow_id;
        } else {
          this.flow_id = "";
        }
        if (res.result.openApplayMainData.new_first_time) {
          this.countDate(res.result.openApplayMainData.new_first_time);
        }

        this.applay_status = res.result.openApplayMainData.approval_stuat;
        if (this.$route.query.disabled) {
          this.applay_status = 4;
        }
        this.openApplayMainData = res.result.openApplayMainData;
        this.priceList = res.result.firstOpenAvgData;
        if (res.result.competingpPoducts) {
          this.competingpPoducts = res.result.competingpPoducts;
        } else {
          this.competingpPoducts = [];
        }
        this.customerStorageNode = res.result.customerStorageNode;
        this.come_Data = res.result.weekStroageData;
        this.firstOpenAvgData = res.result.firstOpenAvgData;
        if (this.priceList.length > 0) {
          let str = "";
          // let touzi = "";
          // let zhangui = "";
          // let dingsheer = "";
          // let kaipanyugu = "";
          this.priceList.forEach((item, index) => {
            if (index == 0) {
              str += item.product_type;
              // kaipanyugu += isNaN(item.open_estimate)
              //   ? "0"
              //   : item.open_estimate;
              // dingsheer += isNaN(item.designtwo_avg) ? "0" : item.designtwo_avg;
              // zhangui += isNaN(item.rules_avg) ? "0" : item.rules_avg;
              // touzi += isNaN(item.invest_avg) ? "0" : item.invest_avg;
            } else {
              str += ":" + item.product_type;
              // touzi += ":" + (isNaN(item.invest_avg) ? "0" : item.invest_avg);
              // zhangui += ":" + (isNaN(item.rules_avg) ? "0" : item.rules_avg);
              // dingsheer +=
              //   ":" + (isNaN(item.designtwo_avg) ? "0" : item.designtwo_avg);
              // kaipanyugu +=
              //   ":" + (isNaN(item.open_estimate) ? "0" : item.open_estimate);
            }
          });

          //创建版本自动触发计算事件
          for (let key in this.openApplayMainData) {
            this.getDiff(key);
          }
          this.openApplayMainData.invest_operation_name = str;
          this.openApplayMainData.rules_operation_name = str;
          this.openApplayMainData.designtwo_operation_name = str;
          // this.openApplayMainData.invest_operation_bfb = touzi;
          // this.openApplayMainData.rules_operation_bfb = zhangui;
          // this.openApplayMainData.designtwo_operation_bfb = dingsheer;
        }
        this.getDateDiff(this.openApplayMainData.estimate_open_node);
        this.getProportion("open_estimate", "estimate_operation_bfb");
        this.getProportion("designtwo_avg", "designtwo_operation_bfb");
        this.getProportion("rules_avg", "rules_operation_bfb");
        this.getProportion("invest_avg", "invest_operation_bfb");
        let arr5;
        if (res.result.fileList) {
          arr5 = res.result.fileList;
        } else {
          arr5 = [];
        }

        this.accessoryData = [
          {
            type: "",
            handle: "其他上传"
          }
        ];
        if (arr5.length > 0) {
          let temp = this.accessoryData.pop();
          arr5.forEach((item, index) => {
            this.accessoryData.push({
              type: "其他上传",
              handle: "上传",
              id: item.id,
              name: item.name,
              url: item.url,
              orderIndex: item.orderIndex
            });
          });
          this.accessoryData.push(temp);
        }
      });
    },

    toFloat(value) {
      value = Math.round(parseFloat(value) * 100) / 100;
      if (value.toString().indexOf(".") < 0) {
        value = value.toString() + ".00";
      }

      return value;
    },
    //延期开盘申请--保存/提交数据
    savelayOpenApplay(button) {
      if (button == "submit") {
        this.checkValue();
        if (!this.updateFlag) {
          this.updateFlag = true;
          return;
        }
      }
      savelayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7",
        button: button,
        thisVserion: this.thisVserion,
        openApplyData: this.openApplyData,
        customerNodeStorage: this.customerNodeStorage,
        weekData: this.weekData,
        project_id: this.$route.query.project_id,
        fileList: this.thataccessoryData
      }).then(res => {
        if (res.code == 200) {
          this.functionDrawer = false;
          var message;
          if (button == "submit") {
            message = "提交成功!";
          } else {
            message = "保存成功!";
          }
          this.$message({
            type: "success",
            message: message
          });
          if (button == "submit") {
            //提交审批并调整预览页面
            get(
              `/Workflow/MTStart2.aspx?BSID=FP&BTID=${res.result.BTID}&BOID=${res.result.codeBOID}&UserID=${res.result.bkUserID}&LoginKey=${res.result.loginKey}`
            ).then(res => {
              if (res.code == 200 || res.result.code == 200) {
                window.open(res.data);
              } else {
                this.$message.error(res.messages || res.result.messages);
              }
            });
          } else {
            if (this.thisVserion == "") {
              this.viewdelayOpenApplay();
            } else {
              this.switchVersion();
            }
          }
        } else {
          this.functionDrawer = false;
          this.$message({
            type: "error",
            message: "保存失败!"
          });
        }
      });
    },
    checkValue() {
      if (!this.openApplyData.new_first_time) {
        this.$message.error("新申请开盘日期未填写!");
        this.updateFlag = false;
        return;
      }
      let openApplyFlag = true;
      let openNameList = [
        "estimate_plan_big_num",
        "estimate_plan_little_num",
        "estimate_plan_sub_num",
        "estimate_plan_visit_num"
      ];
      openNameList.forEach(name => {
        if (
          !this.openApplyData[name] &&
          this.openApplyData[name] !== 0 &&
          openApplyFlag
        ) {
          openApplyFlag = false;
          this.updateFlag = false;
          return;
        }
      });
      if (!openApplyFlag) {
        this.$message.error("客储达成进度必填项未填写!");
        return;
      }
      let customerNodeFlag = true;
      let customerNodeNameList = [
        "big_num",
        "little_num",
        "sub_num",
        "visit_num"
      ];
      this.customerNodeStorage.forEach(item => {
        customerNodeNameList.forEach(name => {
          if (!item[name] && item[name] !== 0 && customerNodeFlag) {
            customerNodeFlag = false;
            this.updateFlag = false;
            return;
          }
        });
      });
      if (!customerNodeFlag) {
        this.$message.error("变更节点客储计划必填项未填写!");
        return;
      }

      let weekDataFlag = true;
      this.weekData.forEach(item => {
        if (
          !item.plan_add &&
          item.plan_add !== 0 &&
          weekDataFlag &&
          item.week != "完整波段"
        ) {
          weekDataFlag = false;
          this.updateFlag = false;
          return;
        }
      });
      if (!weekDataFlag) {
        this.$message.error("变更来访周拆分必填项未填写!");
        return;
      }
      //附件上传
      if (
        this.thataccessoryData.some(
          i => i.type && i.type !== "其他上传" && !i.name
        )
      ) {
        this.$message({
          type: "error",
          message: "必须上传附件清单"
        });
        return;
      }
    },
    savelayOpenKsApplay(button) {
      this.checkValue();
      if (!this.updateFlag) {
        this.updateFlag = true;
        return;
      }
      savelayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7",
        buttonKs: button,
        thisVserion: this.thisVserion,
        openApplyData: this.openApplyData,
        customerNodeStorage: this.customerNodeStorage,
        weekData: this.weekData,
        project_id: this.$route.query.project_id,
        fileList: this.thataccessoryData
      }).then(res => {
        if (res.code == 200) {
          this.functionDrawer = false;
          var message;
          if (button == "ksApplay") {
            message = "提交成功!";
          } else {
            message = "保存成功!";
          }
          this.$message({
            type: "success",
            message: message
          });
          if (button == "ksApplay") {
            //快速审批
            var open =
              this.local +
              "/#/sevenAndTwentyOnePostpone?BOID=" +
              res.result.codeBOID +
              "&isKSAP=1";
            window.open(open);
            this.$router.push("planWrite");
          }
          if (button == "submit") {
            this.$router.push("planWrite");
          }
        } else {
          this.functionDrawer = false;
          this.$message({
            type: "error",
            message: "提交失败!"
          });
        }
      });
    },

    //延期看盘申请--切换数据
    switchVersionByVersionID() {
      switchVersion({
        id: this.thisVserion,
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7"
      }).then(res => {
        this.openApplyData = res.result.openApplyData;
        this.approval_stuat = res.result.openApplyData.approval_stuat;
        if (this.$route.query.disabled) {
          this.approval_stuat = 4;
        }
        if (res.result.openApplyData.flow_id) {
          this.flow_id = res.result.openApplyData.flow_id;
        } else {
          this.flow_id = "";
        }
        this.customerNodeStorage = res.result.customerNodeStorage;
        if (res.result.weekData) {
          this.weekData = res.result.weekData;
        } else {
          this.weekData = [];
        }
        let arr5 = res.result.fileList;
        this.thataccessoryData = [
          {
            type: "",
            handle: "其他上传"
          }
        ];
        if (arr5.length > 0) {
          let temp = this.thataccessoryData.pop();
          arr5.forEach((item, index) => {
            this.thataccessoryData.push({
              type: "其他上传",
              handle: "上传",
              id: item.id,
              name: item.name,
              url: item.url,
              orderIndex: item.orderIndex
            });
          });
          this.thataccessoryData.push(temp);
        }
      });
    },
    viewdelayOpenApplay() {
      viewdelayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7",
        project_id: this.$route.query.project_id
      }).then(res => {
        this.versionData = res.result.versionData;
        if (res.result.versionData) {
          this.thisVserion = res.result.versionData[0].id;
        } else {
          this.thisVserion = "";
        }
        if (res.result.openApplyData.flow_id) {
          this.flow_id = res.result.openApplyData.flow_id;
        } else {
          this.flow_id = "";
        }
        this.approval_stuat = res.result.openApplyData.approval_stuat;
        if (this.$route.query.disabled) {
          this.approval_stuat = 4;
        }
        this.openApplyData = res.result.openApplyData;
        this.customerNodeStorage = res.result.customerNodeStorage;
        if (res.result.weekData) {
          this.weekData = res.result.weekData;
        } else {
          this.weekData = [];
        }
        let arr5 = res.result.fileList;
        this.thataccessoryData = [
          {
            type: "",
            handle: "其他上传"
          }
        ];
        if (arr5.length > 0) {
          let temp = this.thataccessoryData.pop();
          arr5.forEach((item, index) => {
            this.thataccessoryData.push({
              type: "其他上传",
              handle: "上传",
              id: item.id,
              name: item.name,
              url: item.url,
              orderIndex: item.orderIndex
            });
          });
          this.thataccessoryData.push(temp);
        }
      });
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
          // handle: "上传",
          name: res.data.name,
          id: res.data.id,
          url: res.data.url
        });
        this.accessoryData.push(temp);
      }
    },
    delFielList(idx) {
      this.accessoryData.splice(idx, 1);
    },
    exceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
    },
    reload(num) {
      this.approval_stuat = 1;
      this.viewOpenBeforeSevenDayOpenApplay();
    },
    scrollLink(id) {
      // document.getElementById(id).scrollIntoView();
      console.log(document.getElementById(id).offsetTop);
      document.querySelector("#containter").scrollTop =
        document.getElementById(id).offsetTop + 12;
    },
    createVersion() {
      if (this.activeTab == 2) {
        this.thisVserion = "";
        viewdelayOpenApplay({
          plan_id: this.$route.query.plan_id,
          plan_node_id: this.$route.query.plan_node_id,
          create: "new",
          node_level: "7",
          project_id: this.$route.query.project_id
        }).then(res => {
          this.thisVserion = "";

          this.openApplyData = res.result.openApplyData;

          if (res.result.weekData) {
            this.weekData = res.result.weekData;
          } else {
            this.weekData = [];
          }
          if (!res.result.customerNodeStorage) {
            this.customerNodeStorage = [];
          } else {
            this.customerNodeStorage = res.result.customerNodeStorage;
          }
          this.approval_stuat = 1;
          //触发计算事件
          if (res.result.openApplyData.new_first_time) {
            this.countDate(res.result.openApplyData.new_first_time);
          }
          if (!res.result.customerNodeStorage) {
            this.customerNodeStorage = [];
          } else {
            this.customerNodeStorage = res.result.customerNodeStorage;
          }
        });
      } else {
        this.thisVserion = "";
        this.viewOpenBeforeSevenDayOpenApplay("new");
      }
    },
    saveOpenBeforeSevenDayOpenApplay(button) {
      if (button == "submit") {
        this.OnecheckUpdate();
        if (!this.upflag) {
          this.upflag = true;
          return;
        }
      }
      saveOpenBeforeSevenDayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7",
        button: button,
        project_id: this.$route.query.project_id,
        thisVersion: this.thisVserion,
        openApplayMainData: this.openApplayMainData,
        firstOpenAvgData: this.firstOpenAvgData,
        competingpPoducts: this.competingpPoducts,
        customerStorageNode: this.customerStorageNode,
        weekStroageData: this.come_Data,
        firstOpenAvgData: this.firstOpenAvgData,
        fileList: this.accessoryData
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.messages
          });
          if (button == "submit") {
            //提交审批并跳转预览页面
            get(
              `/Workflow/MTStart2.aspx?BSID=FP&BTID=${res.result.BTID}&BOID=${res.result.codeBOID}&UserID=${res.result.bkUserID}&LoginKey=${res.result.loginKey}`
            ).then(res => {
              if (res.code == 200 || res.result.code == 200) {
                window.open(res.data);
              } else {
                this.$message.error(res.messages || res.result.messages);
              }
            });
          } else {
            if (this.thisVserion == "") {
              this.viewOpenBeforeSevenDayOpenApplay("");
            } else {
              this.switchVersionSevenDayOpenApplay();
            }
          }
        } else {
          this.$message({
            type: "error",
            message: res.messages
          });
        }
      });
    },
    OnecheckUpdate() {
      let openApplyName = [
        "estimate_all_per",
        "estimate_irr",
        "estimate_open_node",
        "estimate_payback",
        "estimate_push_value",
        "estimate_selling_value",
        "estimate_take_card_value",
        "estimate_this_per"
      ];
      let opendayName = ["sub_customer_actual", "this_customer_visit"];
      let openApplyFlag = true;
      let opendayFlag = true;
      openApplyName.forEach(name => {
        if (
          !this.openApplayMainData[name] &&
          this.openApplayMainData[name] !== 0 &&
          openApplyFlag
        ) {
          openApplyFlag = false;
          return;
        }
      });
      opendayName.forEach(name => {
        if (
          !this.openApplayMainData[name] &&
          this.openApplayMainData[name] !== 0 &&
          opendayFlag
        ) {
          opendayFlag = false;
          return;
        }
      });
      this.firstOpenAvgData.forEach(item => {
        if (!item.open_estimate && openApplyFlag && item.open_estimate !== 0) {
          openApplyFlag = false;
          return;
        }
      });
      if (!openApplyFlag) {
        this.$message.error("首开指标必填项未填写");
        this.upflag = false;
        return;
      }
      if (!opendayFlag) {
        this.$message.error("开盘当天预估必填项未填写");
        this.upflag = false;
        return;
      }
    },
    saveOpenBeforeSevenDayOpenApplayKs(button) {
      this.OnecheckUpdate();
      if (!this.upflag) {
        this.upflag = true;
        return;
      }
      saveOpenBeforeSevenDayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7",
        buttonKs: button,
        project_id: this.$route.query.project_id,
        thisVersion: this.thisVserion,
        openApplayMainData: this.openApplayMainData,
        firstOpenAvgData: this.firstOpenAvgData,
        competingpPoducts: this.competingpPoducts,
        customerStorageNode: this.customerStorageNode,
        weekStroageData: this.come_Data,
        firstOpenAvgData: this.firstOpenAvgData,
        fileList: this.accessoryData
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.messages
          });

          if (button == "ksApplay") {
            //快速审批
            var open =
              this.local +
              "/#/sevenDaysOpening?BOID=" +
              res.result.codeBOID +
              "&isKSAP=1";
            window.open(open);
            this.$router.push("planWrite");
          }
          if (button == "submit") {
            this.$router.push("planWrite");
          }
        } else {
          this.$message({
            type: "error",
            message: res.messages
          });
        }
      });
    },

    mergeSpan({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if ((columnIndex - 2) % 3 === 0 && columnIndex - 2 < 6) {
          return {
            rowspan: 1,
            colspan: 3
          };
        } else if (columnIndex < 2 || columnIndex > 7) {
          return {
            rowspan: 1,
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
    mergeRow({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        if (rowIndex == 0) {
          return [2, 1];
        } else if (rowIndex == 1) {
          return [0, 0];
        }
      }
    },
    mergeCol({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
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
    update(update) {
      //延期开盘申请审批
      if (this.activeTab == 2) {
        if (update == 3) {
          //快速审批
          this.savelayOpenKsApplay("ksApplay");
        } else if (update == 1) {
          //提交
          this.savelayOpenApplay("submit");
        } else {
          //保存
          this.savelayOpenApplay("save");
        }
      }
      //开盘审批

      if (this.activeTab == 1) {
        if (update == 3) {
          this.saveOpenBeforeSevenDayOpenApplayKs("ksApplay");
        } else if (update == 1) {
          this.saveOpenBeforeSevenDayOpenApplay("submit");
        } else {
          this.saveOpenBeforeSevenDayOpenApplay("save");
        }
      }
    },
    setSum(row) {
      if (row["visit_num"]) {
        this.$set(
          row,
          "little_num",
          isNaN((row["little_per"] * row["visit_num"]) / 100)
            ? 0
            : ((row["little_per"] * row["visit_num"]) / 100).toFixed(0)
        );
        this.$set(
          row,
          "make_per",
          isNaN((row["sub_num"] * row["visit_num"]) / 100)
            ? 0
            : ((row["sub_num"] * row["visit_num"]) / 100).toFixed(0)
        );
        this.$set(
          row,
          "big_num",
          isNaN((row["big_per"] * row["visit_num"]) / 100)
            ? 0
            : ((row["big_per"] * row["visit_num"]) / 100).toFixed(0)
        );
      }
    },
    setSum_2(row) {
      //计算小卡数=小卡率*来访数据/100
      this.openApplyData["estimate_plan_little_num"] = isNaN(
        (
          parseFloat(
            this.openApplyData["estimate_plan_little_per"] *
              this.openApplyData["estimate_plan_visit_num"]
          ) / 100
        ).toFixed(0)
      )
        ? 0
        : (
            parseFloat(
              this.openApplyData["estimate_plan_little_per"] *
                this.openApplyData["estimate_plan_visit_num"]
            ) / 100
          ).toFixed(0);

      //计算大卡数=大卡率*来访数据/100
      this.openApplyData["estimate_plan_big_num"] = isNaN(
        (
          parseFloat(
            this.openApplyData["estimate_plan_big_per"] *
              this.openApplyData["estimate_plan_visit_num"]
          ) / 100
        ).toFixed(0)
      )
        ? 0
        : parseFloat(
            (this.openApplyData["estimate_plan_big_per"] *
              this.openApplyData["estimate_plan_visit_num"]) /
              100
          ).toFixed(0);

      //计算成交率=认购数/来访数
      this.openApplyData[row["val8"]] = isNaN(
        parseFloat(
          this.openApplyData[row["val7"]] / this.openApplyData[row["val2"]]
        )
      )
        ? 0
        : parseFloat(
            (this.openApplyData[row["val7"]] /
              this.openApplyData[row["val2"]]) *
              100
          ).toFixed(0);
      console.log(row,"rowrow");

      //计算合计=小卡数/来访数据
      this.openApplyData.sum_visit_num = isNaN(
        parseInt(this.openApplyData.reach_plan_visit_num) +
          parseInt(this.openApplyData[row["val3"]])
      )
        ? this.openApplyData.reach_plan_visit_num
        : parseInt(this.openApplyData.reach_plan_visit_num) +
          parseInt(this.openApplyData[row["val2"]]);
      this.$set(
        this.openApplyData,
        this.firstReportData[3].val2,
        (Number(this.openApplyData[this.firstReportData[1].val2]) +
          Number(this.openApplyData[this.firstReportData[2].val2])).toFixed(0)
      );
      this.$set(
        this.openApplyData,
        this.firstReportData[3].val3,
        (Number(this.openApplyData[this.firstReportData[1].val3]) +
          Number(this.openApplyData[this.firstReportData[2].val3])).toFixed(0)
      );
      this.$set(
        this.openApplyData,
        this.firstReportData[3].val4,
        (
          (parseFloat(this.openApplyData[this.firstReportData[1].val4]) +
            parseFloat(this.openApplyData[this.firstReportData[2].val4])) /
          2
        ).toFixed(0)
      );
      this.$set(
        this.openApplyData,
        this.firstReportData[3].val5,
      (  Number(this.openApplyData[this.firstReportData[1].val5]) +
          Number(this.openApplyData[this.firstReportData[2].val5])).toFixed(0)
      );
      this.$set(
        this.openApplyData,
        this.firstReportData[3].val6,
        (
          (parseFloat(this.openApplyData[this.firstReportData[1].val6]) +
            parseFloat(this.openApplyData[this.firstReportData[2].val6])) /
          2
        ).toFixed(0)
      );
      this.$set(
        this.openApplyData,
        this.firstReportData[3].val7,
        (Number(this.openApplyData[this.firstReportData[1].val7]) +
          Number(this.openApplyData[this.firstReportData[2].val7])).toFixed(0)
      );

      this.$set(
        this.openApplyData,
        this.firstReportData[3].val8,
        (
          (parseFloat(this.openApplyData[this.firstReportData[1].val8]) +
            parseFloat(this.openApplyData[this.firstReportData[2].val8])) /
          2
        ).toFixed(0)
      );
    },
    thatdelFielList(idx) {
      this.thataccessoryData.splice(idx, 1);
    },
    thatfileSuccess(res, file, fileList) {
      if (!res.data) {
        this.$message.error(res.messages);
        return;
      }
      if (res.data.orderIndex < this.thataccessoryData.length - 1) {
        this.$set(
          this.thataccessoryData[res.data.orderIndex],
          "name",
          res.data.name
        );
        this.$set(
          this.thataccessoryData[res.data.orderIndex],
          "id",
          res.data.id
        );
        this.$set(
          this.thataccessoryData[res.data.orderIndex],
          "url",
          res.data.url
        );
      } else {
        let temp = this.thataccessoryData[this.thataccessoryData.length - 1];
        this.thataccessoryData.pop();
        this.thataccessoryData.push({
          type: "其他上传",
          // handle: "上传",
          name: res.data.name,
          id: res.data.id,
          url: res.data.url
        });
        this.thataccessoryData.push(temp);
      }
    },
    fileRemove(file, fileList) {},
    fileError() {
      this.$message.error("上传失败");
    },
    setClientInfo() {
      this.$set(
        this.openApplayMainData,
        "come_customer_per",
        (Number(this.openApplayMainData.come_customer_actual) /
          Number(this.openApplayMainData.come_customer_target)) *
          100
      );
      this.$set(
        this.openApplayMainData,
        "lesser_customer_per",
        (Number(this.openApplayMainData.lesser_customer_actual) /
          Number(this.openApplayMainData.lesser_customer_target)) *
          100
      );
      this.$set(
        this.openApplayMainData,
        "big_customer_per",
        (Number(this.openApplayMainData.big_customer_actual) /
          Number(this.openApplayMainData.big_customer_target)) *
          100
      );
    },
    countMarkPer() {
      console.log(
        this.openApplayMainData.sub_customer_actual /
          this.openApplayMainData.come_customer_target
      );

      this.$set(
        this.openApplayMainData,
        "sub_customer_per",
        isNaN(
          Number(this.openApplayMainData.sub_customer_actual) /
            Number(this.openApplayMainData.come_customer_target)
        )
          ? 0
          : (Number(this.openApplayMainData.sub_customer_actual) /
              Number(this.openApplayMainData.come_customer_target)) *
              100
      );
    }
  }
};
</script>

<style lang="less" scoped>
.sevenDays {
  overflow: hidden;
  height: calc(100vh - 40px);
  .bold {
    font-weight: 700 !important;
    color: #333333;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .navbarLink {
    background: #fff;
    margin-top: 5px;
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

      ::v-deep .el-button {
        height: 30px;
        float: right;
        margin-left: 10px;
        margin-top: 10px;
      }

      ::v-deep .el-button:first-child {
        margin-right: 15px;
      }
      .right-btn {
        position: fixed;
        right: 0;
        top: 40px;
        z-index: 10;
      }
      ::v-deep .el-input__inner {
        width: 260px;
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

  .isView {
    margin-top: 55px;
  }
  .tabsFlxed {
    height: 90px;
    background: #fff;
    .link {
      float: left;
      margin-top: -12px;
    }
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
    ::v-deep .el-tabs__item {
      font-size: 14px;
    }
    ::v-deep .is-active {
      font-weight: 700;
    }
  }
  .containter {
    padding-bottom: 60px;
    height: calc(100vh - 160px);
    overflow: scroll;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    border: 1px solid rgba(216, 216, 216, 0.34);
    ::v-deep .el-tabs__nav-scroll {
      display: none;
    }
    ::v-deep .el-tabs__content {
      // float: left;
      text-align: left;
    }
    ::v-deep .is-active {
      color: #2761ff;
    }
    .link {
      ::v-deep .el-button {
        color: #2761ff;
      }
    }
    .text_area {
      height: 100%;
      width: 100%;
    }
    ::v-deep .el-tabs {
      padding: 0 15px;
    }

    .come {
      padding: 0 15px;
      margin-bottom: 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }
    }

    .node {
      padding: 0 15px;
      margin-bottom: 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
        position: relative;

        ::v-deep .el-checkbox {
          position: absolute;
          top: 50%;
          right: 30px;
          transform: translateY(-50%);
          color: #333;
        }

        ::v-deep .el-checkbox__label {
          font-size: 12px;
        }

        .time {
          position: absolute;
          top: 50%;
          right: 200px;
          transform: translateY(-50%);
          color: #999;
          font-size: 12px;
          font-weight: normal;
        }
      }

      .bold {
        font-weight: 700;
      }
    }

    .lists {
      padding: 0 15px;
      margin-bottom: 15px;
      ::v-deep .is-leaf {
        color: #666666 !important;
      }
      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }
      .fileBox {
        position: relative;
        left: -18px;
      }
    }
    .list {
      padding: 0 15px;
      margin-bottom: 15px;
      ::v-deep .is-leaf {
        color: #666666 !important;
      }
      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }
      ::v-deep .el-button--text {
        margin-left: -18px;
      }
    }

    .card {
      padding: 0 15px;
      margin-bottom: 15px;

      .cardForm {
        width: 100%;
      }

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }

      ::v-deep .el-textarea__inner {
        height: 100px;
      }

      ::v-deep .el-form-item__content {
        margin-bottom: 10px;
      }
    }

    .rate {
      margin: 0 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }
    }

    .open {
      margin: 0 15px;
      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }

      .table {
        border: 1px solid #ebeef5;
      }

      .table_top {
        height: 240px;
        display: flex;

        > div {
          flex: 1;
        }
        > div:last-child {
          flex: 2;
        }

        .left {
          width: 180px;
          flex: 0 1 auto;
          line-height: 160px;
          text-align: center;
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
          color: #909399;
          background-color: #f5f7fa;
        }

        > div:nth-child(2) {
          width: 180px;
          flex: 0 1 auto;
          ._cell {
            background-color: #f5f7fa;
          }
        }

        ._cell {
          height: 40px;
          line-height: 40px;
          text-align: left;
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
          color: #909399;
          padding: 0 20px;
        }
      }

      ::v-deep .el-date-editor.el-input {
        width: 100% !important;
        ::v-deep .el-input__inner {
          padding-left: 30px;
          text-align: left;
        }
        ::v-deep .el-icon-date:before {
          display: initial;
        }
      }

      .table_bottom {
        height: 160px;
        display: flex;

        > div {
          flex: 1;
        }

        .left {
          width: 180px;
          flex: 0 1 auto;
          line-height: 160px;
          text-align: center;
          border-right: 1px solid #ebeef5;
          color: #909399;
          background-color: #f5f7fa;
        }

        > div:last-child {
          padding: 20px;
        }

        ::v-deep .el-textarea {
          height: 100%;
        }

        ::v-deep .el-textarea__inner {
          height: 100% !important;
        }
      }
    }

    .firstOpen {
      margin: 0 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }
      .el-input {
        margin-left: -20px;
        text-align: center;
        padding: 0 10px;
      }
      .bold {
        font-weight: 700;
      }

      .table {
        border-left: 0.5px solid #e6e6e6;
        border-top: 0.5px solid #e6e6e6;
        font-size: 14px;
        font-weight: normal;

        > .el-row:first-child {
          background: #f5f7fa;
          color: #999;
        }
        .el-col {
          text-align: left;
          > div {
            text-indent: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .el-col {
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-right: 0.5px solid #e6e6e6;
        border-bottom: 0.5px solid #e6e6e6;
      }

      .averagePrice {
        text-align: center;
        > div:first-child {
          border-bottom: 0.5px solid #e6e6e6;
        }
        > div:last-child {
          border-bottom: 0.5px solid #e6e6e6;
        }
      }
      .averagePrice.el-col {
        border-bottom: none;
      }
      .averagePricehead {
        border-bottom: none;
        ::v-deep .el-col {
          > div {
            border-bottom: 0.5px solid #e6e6e6;
            border-right: none;
          }
          > div:last-child {
            border-bottom: none;
          }
        }
      }
      .averagePrice_item {
        // border-bottom: 0.5px solid #e6e6e6;
        height: 40px;
        line-height: 40px;
      }
      .diffPricehead {
        text-align: center;
        height: 80px;
      }
      .diffPrice {
        text-align: center;
        height: 80px;
        > div:first-child {
          height: 40px;
          border-bottom: 0.5px solid #e6e6e6;
        }
      }
    }

    .goodsInfo {
      margin: 0 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }
      .add {
        float: right;
      }
    }

    .clientInfo {
      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }
    }

    .openDay {
      margin: 0 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }
      ::v-deep .el-input {
        padding: 0 10px 0;
        // max-width:200px;
      }
      ::v-deep .el-row {
        border-top: 1px solid #e6e6e6;

        .el-col:first-child {
          border-left: 1px solid #e6e6e6;
          background: #f5f7fa;
        }

        .el-col:nth-child(3) {
          background: #f5f7fa;
        }
      }

      ::v-deep .el-col {
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
      }
    }

    .prognosis {
      margin: 0 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }

      .table {
        height: 200px;
        // padding: 20px;

        ::v-deep .el-textarea {
          width: 100%;
          height: 100%;
        }

        ::v-deep .el-textarea__inner {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .null {
    height: 60px;
  }
  .bottom {
    width: 100%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background: #fff;
    margin: 0 15px;
    position: fixed;
    bottom: 0;
    left: 50%;
    z-index: 100;
    transform: translateX(-50%);
    ::v-deep .el-button {
      height: 30px;
    }
  }

  ::v-deep .el-input__inner {
    color: #333333 !important;
    font-size: 14px !important;
  }
}
::v-deep .el-tabs__active-bar {
  background: transparent;
}
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

::v-deep .el-input__inner {
  text-align: left;
}
::v-deep .el-upload-list {
  display: none;
}
::v-deep .el-input--prefix .el-input__inner {
  padding-left: 0;
}

::v-deep .el-input--prefix .el-input__inner {
  padding-right: 0;
}

::v-deep .el-icon-date:before {
  display: none;
}

::v-deep input[type="number"] {
  -moz-appearance: "textfield";
}

::v-deep .el-form {
  width: 40%;
}

::v-deep .el-button--text {
  color: #2761ff !important;
}
::v-deep .el-tabs__nav {
  margin-left: 8px;
}
</style>

