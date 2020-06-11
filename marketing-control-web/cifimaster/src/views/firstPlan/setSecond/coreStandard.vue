<template>
  <div class="coreStandard">
    <!-- <div style="height:120px;"></div> -->
    <div class="meeting">
      <div class="input">
        过会次数:
        <el-input
          :disabled="readonlyflag"
          type="number"
          v-only-number="{min:0}"
          @input.native="meetingNum=parseInt(meetingNum)"
          v-model="meetingNum"
        ></el-input>次
      </div>
      <el-button class="reject blankBtn" v-if="!$route.query.BOID">
        <a :href="exportTemp()" download="download">导出</a>
      </el-button>
    </div>
    <el-collapse v-model="activePanel" @change="panelChange">
      <!-- <el-link :underline="false" class="times">时间节点</el-link> -->
      <div class="time">
        <p style="padding:20px 10px;margin-top:15px">时间节点</p>
        <!-- <el-collapse-item name="1" title="时间节点" disabled > -->
        <div class="over_x">
          <div class="coreForm">
            <div class="coreFormHead">
              <div>名称</div>
              <div>时间</div>
            </div>
            <el-form ref="form" :model="coreForm">
              <el-form-item label="摘牌">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  v-model="coreForm.delisting_time"
                  @change="changeTime('摘牌',coreForm.delisting_time)"
                  type="date"
                  :readonly="true"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="顶设1">
                <el-date-picker
                  :readonly="true"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  v-model="coreForm.designone_time"
                  @change="changeTime('顶设1',coreForm.designone_time)"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="顶设2">
                <el-date-picker
                  :readonly="readonlyflag"
                  @focus="setSecondTime"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  v-model="coreForm.designtwo_time"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="开盘">
                <el-date-picker
                  :readonly="readonlyflag"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  v-model="coreForm.open_time"
                  @change="changeTime('开盘',coreForm.open_time)"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="售楼处开放">
                <el-date-picker
                  :readonly="readonlyflag"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  @change="changeTime('售楼处开放',coreForm.sales_time)"
                  v-model="coreForm.sales_time"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="样板段开放">
                <el-date-picker
                  :readonly="readonlyflag"
                  value-format="yyyy-MM-dd"
                  @change="changeTime('样板段开放',coreForm.sample_open_time)"
                  format="yyyy-MM-dd"
                  v-model="coreForm.sample_open_time"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="样板房开放">
                <el-date-picker
                  :readonly="readonlyflag"
                  value-format="yyyy-MM-dd"
                  @change="changeTime('样板房开放',coreForm.model_open_time)"
                  format="yyyy-MM-dd"
                  v-model="coreForm.model_open_time"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!-- </el-collapse-item> -->
      <div class="core">
        <p style="padding:20px 10px">核心指标</p>
        <!-- <el-collapse-item   title="核心指标" name="2" disabled> -->
        <div class="over_x">
          <div class="coreTable">
            <div class="header">
              <div class="title"></div>
              <div class="info">
                <div class="name item_info"></div>
                <div class="item_info font_w">投资版</div>
                <div class="item_info font_w">战规版</div>
                <div class="item_info font_w r_none">顶设2版</div>
              </div>
            </div>
            <div class="frist">
              <div class="title bord_r">首开</div>
              <div class="info">
                <div class="name item_info">取证日期</div>
                <div class="item_info">
                  <el-date-picker
                    :readonly="readonlyflag"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="numberTable.invest_take_card_time"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </div>
                <div class="item_info">
                  <el-date-picker
                    :readonly="readonlyflag"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="numberTable.rules_take_card_time"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </div>
                <div class="item_info r_none">
                  <el-date-picker
                    :readonly="readonlyflag"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="numberTable.designtwo_take_card_time"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </div>
                <div class="name item_info">首开日期</div>
                <div class="item_info">
                  <el-date-picker
                    :readonly="readonlyflag"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="numberTable.invest_time"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </div>
                <div class="item_info">
                  <el-date-picker
                    :readonly="readonlyflag"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="numberTable.rules_time"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </div>
                <div class="item_info r_none">
                  <el-date-picker
                    :readonly="true"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="numberTable.designtwo_time"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </div>
              </div>
            </div>
            <div class="number">
              <div class="title">量</div>
              <div class="info">
                <div class="name item_info">首开取证货值(万元)</div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.invest_take_card_value"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.invest_take_card_value | fixed}}</span>
                </div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.rules_take_card_value"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.rules_take_card_value | fixed}}</span>
                </div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.designtwo_take_card_value"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.designtwo_take_card_value | fixed}}</span>
                </div>
                <div class="name item_info">首开取证套数</div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0}"
                    @input.native="numberTable.invest_take_card_num=parseInt(numberTable.invest_take_card_num)"
                    v-model="numberTable.invest_take_card_num"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.invest_take_card_num}}</span>
                </div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0}"
                    @input.native="numberTable.rules_take_card_num=parseInt(numberTable.rules_take_card_num)"
                    v-model="numberTable.rules_take_card_num"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.rules_take_card_num}}</span>
                </div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0}"
                    v-model="numberTable.designtwo_take_card_num"
                    v-if="!readonlyflag"
                    @input.native="numberTable.designtwo_take_card_num=parseInt(numberTable.designtwo_take_card_num)"
                  ></el-input>
                  <span v-else>{{numberTable.designtwo_take_card_num}}</span>
                </div>
                <div class="name item_info">首开推售货值(万元)</div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.invest_push_value"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.invest_push_value | fixed}}</span>
                </div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.rules_push_value"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.rules_push_value | fixed}}</span>
                </div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.designtwo_push_value"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.designtwo_push_value | fixed}}</span>
                </div>
                <div class="name item_info">首开推售套数</div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0}"
                    @input.native="numberTable.invest_push_num=parseInt(numberTable.invest_push_num)"
                    v-model="numberTable.invest_push_num"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.invest_push_num}}</span>
                </div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0}"
                    @input.native="numberTable.rules_push_num=parseInt(numberTable.rules_push_num)"
                    v-model="numberTable.rules_push_num"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.rules_push_num}}</span>
                </div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0}"
                    v-model="numberTable.designtwo_push_num"
                    v-if="!readonlyflag"
                    @input.native="numberTable.designtwo_push_num=parseInt(numberTable.designtwo_push_num)"
                  ></el-input>
                  <span v-else>{{numberTable.designtwo_push_num}}</span>
                </div>
                <div class="name item_info">首开去化货值(万元)</div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.invest_selling_value"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.invest_selling_value | fixed}}</span>
                </div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.rules_selling_value"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.rules_selling_value | fixed}}</span>
                </div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.designtwo_selling_value"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.designtwo_selling_value | fixed}}</span>
                </div>
                <div class="name item_info">首开去化套数</div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0}"
                    v-model="numberTable.invest_selling_num"
                    @input.native="numberTable.invest_selling_num=parseInt(numberTable.invest_selling_num)"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.invest_selling_num}}</span>
                </div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0}"
                    v-model="numberTable.rules_selling_num"
                    @input.native="numberTable.rules_selling_num=parseInt(numberTable.rules_selling_num)"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.rules_selling_num}}</span>
                </div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0}"
                    v-model="numberTable.designtwo_selling_num"
                    v-if="!readonlyflag"
                    @input.native="numberTable.designtwo_selling_num=parseInt(numberTable.designtwo_selling_num)"
                  ></el-input>
                  <span v-else>{{numberTable.designtwo_selling_num}}</span>
                </div>
                <div class="name item_info">首开取证货值去化率(%)</div>
                <div class="item_info">
                  <!-- <el-input
                  type="number" v-only-number="{min:0, precision:2}"
                  v-model="numberTable.invest_take_card_per"
                  v-if="!readonlyflag"
                ></el-input>
                  <span v-else>{{numberTable.invest_take_card_per}}</span>-->
                  <span
                    v-if="numberTable.invest_selling_value&&numberTable.invest_take_card_value"
                  >{{numberTable.invest_selling_value/numberTable.invest_take_card_value*100 | tofixed}}%</span>
                  <span v-else>--</span>
                </div>

                <div class="item_info">
                  <span
                    v-if="numberTable.rules_selling_value&&numberTable.rules_take_card_value"
                  >{{numberTable.rules_selling_value/numberTable.rules_take_card_value*100 | tofixed}}%</span>
                  <span v-else>--</span>
                  <!-- <el-input
                  type="number" v-only-number="{min:0, precision:2}"
                  v-model="numberTable.rules_take_card_per"
                  v-if="!readonlyflag"
                ></el-input>
                  <span v-else>{{numberTable.rules_take_card_per}}</span>-->
                </div>
                <div class="item_info r_none">
                  <span
                    v-if="numberTable.designtwo_selling_value&&numberTable.designtwo_take_card_value"
                  >{{numberTable.designtwo_selling_value/numberTable.designtwo_take_card_value*100 | tofixed}}%</span>
                  <span v-else>--</span>
                  <!-- <el-input
                  type="number" v-only-number="{min:0, precision:2}"
                  v-model="numberTable.designtwo_take_card_per"
                  v-if="!readonlyflag"
                ></el-input>
                  <span v-else>{{numberTable.designtwo_take_card_per}}</span>-->
                </div>
                <div class="name item_info">首开推售货值去化率(%)</div>
                <div class="item_info">
                  <!-- <el-input
                  type="number" v-only-number="{min:0, precision:2}"
                  v-model="numberTable.invest_selling_per"
                  v-if="!readonlyflag"
                ></el-input>
                  <span v-else>{{numberTable.invest_selling_per}}</span>-->
                  <span
                    v-if="numberTable.invest_selling_value&&numberTable.invest_push_value"
                  >{{numberTable.invest_selling_value/numberTable.invest_push_value*100 | tofixed}}%</span>
                  <span v-else>--</span>
                </div>
                <div class="item_info">
                  <span
                    v-if="numberTable.rules_selling_value&&numberTable.rules_push_value"
                  >{{numberTable.rules_selling_value/numberTable.rules_push_value*100 | tofixed}}%</span>
                  <span v-else>--</span>
                  <!-- <el-input
                  type="number" v-only-number="{min:0, precision:2}"
                  v-model="numberTable.rules_selling_per"
                  v-if="!readonlyflag"
                ></el-input>
                  <span v-else>{{numberTable.rules_selling_per}}</span>-->
                </div>
                <div class="item_info r_none">
                  <span
                    v-if="numberTable.designtwo_selling_value&&numberTable.designtwo_push_value"
                  >{{numberTable.designtwo_selling_value/numberTable.designtwo_push_value*100 | tofixed}}%</span>
                  <span v-else>--</span>
                  <!-- <el-input
                  type="number" v-only-number="{min:0, precision:2}"
                  v-model="numberTable.designtwo_selling_per"
                  v-if="!readonlyflag"
                ></el-input>
                  <span v-else>{{numberTable.designtwo_selling_per}}</span>-->
                </div>
              </div>
            </div>
            <div class="price">
              <div class="title">
                <span>价</span>
              </div>
              <div class="priceInfo">
                <div class="item">
                  <div class="averagePrice">
                    <div class="averageTitle">
                      <div>
                        首开均价
                        <br />(元/m²)
                        <br />(分业态)
                      </div>
                    </div>
                    <div class="averageTab" :class="!priceTable.length ? 'is_one' : ''">
                      <div class="item_cell" v-for="(item,index) in priceTable" :key="index">
                        <!-- <el-button type="text">{{item.btn}}</el-button> -->
                        <span style="white-space:nowrap">
                          <i
                            class="el-icon-close"
                            style="color:red;cursor:pointer"
                            @click="delItem(item.product_type)"
                            v-if="!readonlyflag"
                          ></i>
                          {{item.product_type}}
                        </span>
                      </div>
                      <div class="item_cell addbtn" v-if="!readonlyflag">
                        <el-button type="text" @click="addDialog=true" v-if="!readonlyflag">增加</el-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="item_cell" v-for="(item,index) in priceTable" :key="index">
                    <!-- <el-input
                    type="number"
                    v-only-number="{min:0,precision:2}"
                    v-model="item.invest_open_avg_price"
                    v-if="!readonlyflag"
                      @input.native="item.invest_open_avg_price=parseInt(item.invest_open_avg_price)"
                  >
                    </el-input>-->
                    <span>{{item.invest_open_avg_price | fixed}}</span>
                    <!-- <span v-else>{{item.invest_open_avg_price | fixed}}</span> -->
                  </div>
                </div>
                <div class="item">
                  <div class="item_cell" v-for="(item,index) in priceTable" :key="index">
                    <el-input
                      type="number"
                      v-only-number="{min:0,precision:2}"
                      v-model="item.rules_open_avg_price"
                      v-if="!readonlyflag"
                    >
                      <!--
                    @input.native="item.rules_open_avg_price=parseInt(item.rules_open_avg_price)"

                      -->
                    </el-input>
                    <span v-else>{{item.rules_open_avg_price | fixed}}</span>
                  </div>
                </div>
                <div class="item">
                  <div class="item_cell r_none" v-for="(item,index) in priceTable" :key="index">
                    <el-input
                      type="number"
                      v-only-number="{min:0,precision:2}"
                      v-model="item.designtwo_open_avg_price"
                      v-if="!readonlyflag"
                    >
                      <!--
                    @input.native="item.designtwo_open_avg_price=parseInt(item.designtwo_open_avg_price)"

                      -->
                    </el-input>
                    <span v-else>{{item.designtwo_open_avg_price | fixed}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="cost">
              <div class="title bord_r">费</div>
              <div class="info">
                <div class="name item_info">首开营销费用(万)</div>
                <div class="item_info">--</div>
                <div class="item_info">--</div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.cost_open_sales_price"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.cost_open_sales_price | fixed}}</span>
                </div>
                <div class="name item_info">首开营销费率(%)</div>
                <div class="item_info">--</div>
                <div class="item_info">--</div>
                <div class="item_info r_none">
                  <!-- <el-input type="number" v-only-number="{min:0, precision:2}" v-model="numberTable.cost_sales_per" v-if="!readonlyflag"></el-input> -->
                  <!-- <span v-else>{{numberTable.cost_sales_per}}</span> -->
                  <span
                    v-if="numberTable.cost_open_sales_price && numberTable.designtwo_selling_value"
                  >{{numberTable.cost_open_sales_price/numberTable.designtwo_selling_value*100 | twofixPercent}}</span>
                  <span v-else>--</span>
                </div>
                <div class="name item_info">首开销售推广费(万)</div>
                <div class="item_info">--</div>
                <div class="item_info">--</div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.cost_sales_generalize_price"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.cost_sales_generalize_price | fixed}}</span>
                </div>
                <div class="name item_info">首开销售推广费率(%)</div>
                <div class="item_info">--</div>
                <div class="item_info">--</div>
                <div class="item_info r_none">
                  <!-- <el-input
                  type="number" v-only-number="{min:0, precision:2}"
                  v-model="numberTable.cost_generalize_per"
                  v-if="!readonlyflag"
                ></el-input>
                  <span v-else>{{numberTable.cost_generalize_per}}</span>-->
                  <span
                    v-if="numberTable.cost_sales_generalize_price&&numberTable.designtwo_selling_value"
                  >{{numberTable.cost_sales_generalize_price/numberTable.designtwo_selling_value*100 | twofix}}%</span>
                  <span v-else>--</span>
                </div>
                <div class="name item_info">首开当年费率(%)</div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.cost_invest_open_year_per"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.cost_invest_open_year_per | twofixPercent}}</span>
                </div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.cost_rules_open_year_per"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.cost_rules_open_year_per | twofixPercent}}</span>
                </div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.cost_designtwo_open_year_per"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.cost_designtwo_open_year_per | twofixPercent}}</span>
                </div>
                <div class="name item_info">全盘费率(%)</div>
                <div class="item_info">
                  <!-- <el-input
                  type="number"
                  v-only-number="{min:0, precision:2}"
                  v-model="numberTable.cost_invest_all_sales_per"
                  v-if="!readonlyflag"
                  ></el-input>-->
                  <span>{{numberTable.cost_invest_all_sales_per | twofixPercent}}</span>
                  <!-- <span>213213123123</span> -->
                </div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.cost_rules_all_sales_per"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.cost_rules_all_sales_per | twofixPercent}}</span>
                </div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0, precision:2}"
                    v-model="numberTable.cost_designtwo_all_sales_per"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.cost_designtwo_all_sales_per | twofixPercent}}</span>
                </div>
              </div>
            </div>
            <div class="benefit">
              <div class="title bord_r">利</div>
              <div class="info">
                <div class="name item_info">本年度创造利润率(%)</div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{ precision:2}"
                    v-model="numberTable.invest_create_per"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.invest_create_per | twofixPercent}}</span>
                </div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{ precision:2}"
                    v-model="numberTable.rules_create_per"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.rules_create_per | twofixPercent}}</span>
                </div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{ precision:2}"
                    v-model="numberTable.designtwo_create_per"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.designtwo_create_per | twofixPercent}}</span>
                </div>
                <div class="name item_info">整盘利润率(%)</div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{ precision:2}"
                    v-model="numberTable.invest_all_per"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.invest_all_per | twofixPercent}}</span>
                </div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{ precision:2}"
                    v-model="numberTable.rules_all_per"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.rules_all_per | twofixPercent}}</span>
                </div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{ precision:2}"
                    v-model="numberTable.designtwo_all_per"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.designtwo_all_per | twofixPercent}}</span>
                </div>
                <div class="name item_info">非融IRR(%)</div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{ precision:2}"
                    v-model="numberTable.invest_irr"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.invest_irr | twofixPercent}}</span>
                </div>
                <div class="item_info">
                  <el-input
                    type="number"
                    v-only-number="{precision:2}"
                    v-model="numberTable.rules_irr"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.rules_irr | twofixPercent}}</span>
                </div>
                <div class="item_info r_none">
                  <el-input
                    type="number"
                    v-only-number="{ precision:2}"
                    v-model="numberTable.designtwo_irr"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.designtwo_irr | twofixPercent}}</span>
                </div>
                <div class="name item_info b_none">静态投资回收期(月)</div>
                <div class="item_info b_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0,precision:2}"
                    v-model="numberTable.invest_payback"
                    @change="numberTable.invest_payback=Number(numberTable.invest_payback)"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.invest_payback | twofix}}</span>
                </div>
                <div class="item_info b_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0,precision:2}"
                    v-model="numberTable.rules_payback"
                    @change="numberTable.rules_payback=Number(numberTable.rules_payback)"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.rules_payback}}</span>
                </div>
                <div class="item_info r_none b_none">
                  <el-input
                    type="number"
                    v-only-number="{min:0,precision:2}"
                    @change="numberTable.designtwo_payback=Number(numberTable.designtwo_payback)"
                    v-model="numberTable.designtwo_payback"
                    v-if="!readonlyflag"
                  ></el-input>
                  <span v-else>{{numberTable.designtwo_payback}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </el-collapse-item> -->
    </el-collapse>

    <el-dialog title="添加业态类型" :visible.sync="addDialog">
      <el-form>
        <el-form-item label="业态类型" label-width="120px">
          <el-select v-model="addProd" placeholder="请选择活动区域">
            <el-option
              v-for="(item,idx) in tempList"
              :key="idx"
              :label="item.product_type"
              :value="item.product_type_code"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addProdItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { selectCodeIndex } from "@/api/firstPlan";
import { downLoad } from "@/api/request";
export default {
  name: "coreStandard",
  props: ["versions", "readonly", "beforeAct"],
  data() {
    return {
      addProd: "",
      choiceTable: [],
      activePanel: ["1", "2", "3"],
      fileList: [],
      addDialog: false,
      coreForm: {},
      meetingNum: "",
      fileList__: [],
      fileList: [],
      numberTable: {
        cost_open_sales_price:'',
        cost_sales_generalize_price:""
      },
      priceTable: [],
      plan_id: this.$route.query.plan_id,
      plan_node_id: this.$route.query.plan_node_id,
      accessoryData: [
        { type: "楼栋大定价", handle: "上传" },
        { type: "顶设2报告", handle: "上传" },
        { type: "大定价地块系数表", handle: "上传" },
        { type: "大定价权重系数表", handle: "上传" },
        { type: "", handle: "其他上传" }
      ],
      showVersion: false
    };
  },
  created() {
    // this.reload();
  },
  computed: {
    actVersions() {
      return this.versions;
    },
    activeTab() {
      return this.beforeAct;
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
        host = "https://salesmgt-api.cifi.com.cn";
      }
      return host;
    },
    readonlyflag() {
      if (this.$route.query.BOID) {
        return true;
      } else if (this.$route.query.disabled) {
        return true;
      } else if (this.$route.query.readonly) {
        // return this.$route.query.readonly;
        return true;
      } else {
        return this.readonly;
      }
    },
    tempList() {
      let arr = [];
      this.choiceTable.forEach((item, idx) => {
        if (
          !this.priceTable.some(
            lv1 => item.product_type_code == lv1.product_type_code
          )
        ) {
          arr.push(item);
        }
      });
      return arr;
    }
  },
  filters: {
    tofixed(val) {
      return isNaN(val) ? 0 : val.toFixed(0);
    },
    fixed(data) {
      if (!data) {
        return "0.00";
      }
      return (parseInt(data * 100) / 100).toFixed(2);
    },
    twofix(data) {
      if (!data) {
        return "0.00";
      }
      return (parseInt(data * 100) / 100).toFixed(2);
    },
    // 带有%字段值需要加个 %
    twofixPercent(data) {
      if (!data) {
        return "0.00";
      }
      return (parseInt(data * 100) / 100).toFixed(2) + "%";
    }
  },
  watch: {
    actVersions: {
      handler(a, b) {
        this.reload();
        // if (a == "") {
        //   this.accessoryData = [
        //     { type: "楼栋大定价", handle: "上传" },
        //     { type: "顶设2报告", handle: "上传" },
        //     { type: "大定价地块系数表", handle: "上传" },
        //     { type: "大定价权重系数表", handle: "上传" },
        //     { type: "", handle: "其他上传" }
        //   ];
        // }
      },
      deep: true
    }
    //  activeTab: {
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
      return downLoad("/TopSettingTwoExcel/IndicatorsExcel", {
        plan_id: plan_id,
        plan_node_id: plan_node_id
      });
    },
    exceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
    },
    delFielList(idx) {
      let namelist = [
        "楼栋大定价",
        "顶设2报告",
        "大定价地块系数表",
        "大定价权重系数表"
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
    fileError() {
      this.$message.error("上传失败");
    },
    fileRemove(file, fileList) {
      // console.log(this.fileList, "this.fileList ");
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
    panelChange(val) {},
    addProdItem() {
      if (this.addProd) {
        let obj = this.tempList.filter(
          item => item.product_type_code == this.addProd
        );
        this.priceTable.push({
          plan_id: this.$route.query.plan_id,
          plan_node_id: this.$route.query.plan_node_id,
          product_type: obj[0].product_type,
          product_type_code: obj.product_type_code
        });
      }
      this.addDialog = false;
      this.addProd = "";
    },
    // settwo(time) {
    //   this.changeTime("开盘", time);
    //   this.$set(this.coreForm, "open_time", time);
    // },
    reload() {
      let obj = {
        plan_node_id: this.plan_node_id,
        plan_id: this.plan_id
      };
      obj.plan_node_id = this.versions;
      if (this.$route.query.BOID) {
        obj.plan_node_id = this.$route.query.BOID;
      }

      selectCodeIndex(obj).then(res => {
        if (res.code == 0) {

          this.$emit("isshowversion", res.result.judgeVersion);
          if (res.result.time) {
            this.coreForm = res.result.time;
          }
          if (
            +new Date(this.coreForm.designone_time) >
            +new Date(this.coreForm.designtwo_time)
          ) {
            this.$notify.error({
              title: "提示",
              message: "顶设1时间节点不得小于顶设2时间节点",
              duration: 0
            });
          }

          this.numberTable = res.result;
          this.priceTable = res.result.price;
          this.choiceTable = res.result.choice;
          this.meetingNum = res.result.browse_num;
        }
      });
    },
    changeTime(type, time) {
      if (type == "摘牌") {
        this.$set(
          this.coreForm,
          "designone_time",
          this.FomartDate(new Date(Number(+new Date(time)) + 1296000000))
        );
      }

      if (
        type == "顶设2" ||
        type == "售楼处开放" ||
        type == "样板段开放" ||
        type == "样板房开放"
      ) {
        if (!this.coreForm.open_time) {
          this.$set(this.coreForm, "designtwo_time", "");
          this.$set(this.coreForm, "sales_time", "");
          this.$set(this.coreForm, "sample_open_time", "");
          this.$set(this.coreForm, "model_open_time", "");
          this.$message("请先填报开盘时间");
        }
      } else if (type == "开盘") {
        this.$set(
          this.numberTable,
          "designtwo_time",
          this.FomartDate(new Date(Number(+new Date(time))))
        );

        this.$set(
          this.coreForm,
          "designtwo_time",
          this.FomartDate(new Date(Number(+new Date(time)) - 10368000000))
        );
        this.$set(
          this.coreForm,
          "sales_time",
          this.FomartDate(new Date(Number(+new Date(time)) - 3888000000))
        );
        this.$set(
          this.coreForm,
          "sample_open_time",
          this.FomartDate(new Date(Number(+new Date(time)) - 1814400000))
        );
        this.$set(
          this.coreForm,
          "model_open_time",
          this.FomartDate(new Date(Number(+new Date(time)) - 1814400000))
        );
      }
      if (
        +new Date(this.coreForm.designone_time) >
        +new Date(this.coreForm.designtwo_time)
      ) {
        this.$notify.error({
          title: "提示",
          message: "顶设1时间节点不得小于顶设2时间节点",
          duration: 0
        });
      }
      if (
        +new Date(this.coreForm.open_time) -
          +new Date(this.coreForm.sales_time) <
        3888000000
      ) {
        this.$notify.warning({
          title: "提示",
          message:
            "根据三大件标准工期开放时间要求，首开前45天需完成售楼处开放，您填写的售楼处开放时间节点小于45天，请确认是否需要调整"
        });
      }
      if (
        +new Date(this.coreForm.open_time) -
          +new Date(this.coreForm.sample_open_time) <
        1814400000
      ) {
        this.$notify.warning({
          title: "提示",
          message:
            "根据三大件标准工期开放时间要求，首开前21天需完成景观样板段开放，您填写的景观样板段开放时间节点小于21天，请确认是否需要调整"
        });
      }
      if (
        +new Date(this.coreForm.open_time) -
          +new Date(this.coreForm.model_open_time) <
        1814400000
      ) {
        this.$notify.warning({
          title: "提示",
          message:
            "根据三大件标准工期开放时间要求，首开前21天需完成样板房开放，您填写的样板房开放时间节点小于21天，请确认是否需要调整"
        });
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
    delItem(type) {
      if (this.priceTable.length <= 1) {
        this.$notify.warning({
          title: "提示",
          message: "至少保留一条数据"
        });
        return;
      }
      let idx = this.priceTable.findIndex(item => item.product_type == type);
      this.priceTable.splice(idx, 1);
    },
    setSecondTime() {
      if (this.$route.query.disabled) {
        return;
      }
      this.$notify.warning({
        title: "提示",
        message:
          "根据标准业务时间要求，首开前120天需完成顶设2系统审批，系统根据首开时间自动计算顶设2完成时间，且不可编辑"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.coreForm {
  min-width: 800px;
  .coreFormHead {
    height: 40px;
    line-height: 40px;
    display: flex;
    background: #f6f8fd;
    > div:first-child {
      flex: 1;
      text-align: left;
      margin-left: 10px;
    }
    > div:last-child {
      flex: 1;
      text-align: right;
      margin-left: 5px;
      padding-right: 120px;
    }
  }
  .el-form {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    ::v-deep .el-form-item {
      width: 100%;
      position: relative;
      text-align: left;
      .el-input__inner {
        width: 150px;
        font-size: #333;
      }
    }
    ::v-deep .el-form-item__label {
      text-align: left;
      margin-left: 5px;
    }
    ::v-deep .el-date-editor {
      position: absolute;
      top: 50%;
      width: 150px;
      right: 0;
      transform: translateY(-50%);
      text-align: right;
    }
  }
  ::v-deep .el-form-item {
    padding: 0 5px !important;
  }
  ::v-deep .el-collapse-item__header {
    padding: 0 5px !important;
  }
}
</style>
<style lang="less" scoped>
@import url("../../../assets/css/GlobalBtn.less");
.coreStandard {
  ::v-deep .el-upload-list {
    display: none;
  }
  p {
    font-weight: 700 !important;
    color: #333;
  }
  .meeting {
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;

    .input {
      float: left;
    }
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    ::v-deep .el-input {
      // float: left;
      width: 100px;
    }
    // .reject {
    //   float: right;
    //   background: #2761ff;
    //   color: #333;
    // }
    .blankBtn {
      .primaryBtn(#333, 500, 12px);
      margin-top: 5px;
      float: right;
    }
  }

  .coreTable {
    min-width: 800px;
    border: 1px solid #efefef;
    // margin: 0 15px;
    font-size: 14px;
    color: #333;
    .benefit {
      display: flex;
      height: 160px;
      .title {
        width: 80px;
        line-height: 160px;
        text-align: center;
        background: #f6f8fd;
        color: #666;
        font-weight: 600;
        border-right: 1px solid #efefef;
        // border-bottom: 1px solid #EFEFEF;
      }
    }

    .cost {
      display: flex;
      height: 240px;

      .title {
        width: 80px;
        line-height: 240px;
        text-align: center;
        background: #f6f8fd;
        font-weight: 600;
        color: #666;
        border-right: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
      }
    }
    .frist {
      height: 80px;
      display: flex;
      .title {
        width: 80px;
        line-height: 80px;
        text-align: center;
        background: #f6f8fd;
        border-bottom: 1px solid #efefef;
        font-weight: 600;
        color: #666;
      }
      ::v-deep .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 100%;
      }
    }

    .number {
      height: 320px;
      display: flex;
      .title {
        width: 80px;
        line-height: 320px;
        text-align: center;
        background: #f6f8fd;
        border-bottom: 1px solid #efefef;
        font-weight: 600;
        color: #666;
        border-right: 1px solid #efefef;
      }
    }
    .price {
      display: flex;
      line-height: 40px;
      .title {
        width: 80px;
        text-align: center;
        background: #f6f8fd;
        font-weight: 600;
        color: #666;
        border-right: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .priceInfo {
        flex: 1;
        display: flex;
        border-bottom: 1px solid #efefef;
        .item {
          width: 25%;
          .item_cell {
            width: 100%;
            height: 40px;
            box-sizing: border-box;
            border-bottom: 1px;
            text-align: left;
            padding: 0 10px;
            border-right: 1px solid #efefef;
            border-bottom: 1px solid #efefef;
          }
          // .item_cell:last-child {
          //   // border-bottom: none;
          // }
          .addbtn {
            text-align: center;
            border-bottom: none;
          }
        }
        .averagePrice {
          color: #666;
          display: flex;
          border-right: 1px solid #efefef;
          overflow: hidden;
          height: 100%;
          .averageTitle {
            line-height: 16px;
            text-align: center;
            white-space: nowrap;
            flex: 0 1 auto;
            min-width: 75px;
            border-right: 1px solid #efefef;
            background: #f6f8fd;
            display: flex;
            align-items: center;
            > div {
              width: 100%;
            }
          }
          .averageTab {
            flex: 1;
            background: #f6f8fd;
            overflow: hidden;
            &.is_one {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .item_cell {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-right: none;
          }
        }
      }
    }
    .header {
      display: flex;
      height: 40px;
      .font_w {
        font-weight: 700;
        // text-align: left;
        // padding: 0 5px;
      }
      .title {
        width: 80px;
        line-height: 40px;
        text-align: center;
        background: #f6f8fd;
        border-bottom: 1px solid #efefef;
        border-right: 1px solid #efefef;
        font-weight: 600;
        color: #666;
      }
    }
    .info {
      text-align: center;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .name {
        background: #f6f8fd;
        color: #666;
      }
      .item_info {
        width: 25%;
        line-height: 40px;
        height: 40px;
        text-align: left;
        border-right: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        padding: 0 5px;
      }
    }
    .bord_r {
      border-right: 1px solid #efefef;
    }
    .r_none {
      border-right: none !important;
    }
    .b_none {
      border-bottom: none !important;
    }
  }
  .operation {
    padding: 15px;
  }
  .time {
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
    //    ::v-deep .el-table__fixed-right{
    //   margin-right: 12px;
    // }
    ::v-deep .el-form-item__label {
      font-size: 14px;
      color: #333;
    }
  }
  ::v-deep [class*=" el-icon-"] {
    color: #bfbfbf;
  }
  .core {
    background: #fff;
    margin-top: 15px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
  }
}
</style>
