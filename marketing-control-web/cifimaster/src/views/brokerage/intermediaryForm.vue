<template>
  <div class="allPeopleForm">
    <div class="allPeopleForm_top">
      <div>
        <checkProject :mainData="mainData" />
      </div>
    </div>
    <div class="allPeopleForm_bottom">
      <div class="baseInfo">
        <div class="baseInfo_title">基础信息</div>
        <div class="baseInfo_content">
          <div>
            <div class="key">政策编号 :</div>
            <div class="val">{{formInfo.code}}</div>
          </div>
          <div>
            <div class="key">申请人 :</div>
            <div class="val">{{formInfo.name}}</div>
          </div>
          <div>
            <div class="key">申请人部门 :</div>
            <div class="val">{{formInfo.department}}</div>
          </div>
          <div>
            <div class="key">政策名称 :</div>
            <div class="val">
              <el-input class="applyName" v-model="formInfo.applyName"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="applyInfo">
        <div class="applyInfo_title">政策申请</div>
        <div class="applyInfo_content">
          <div>
            <div class="key">项目名称 :</div>
            <div class="val">
              <el-input v-model="formInfo.projectName"></el-input>
            </div>
          </div>
          <div>
            <div class="key">
              <i class="red_icon">*</i> 项目分期 :
            </div>
            <div class="val">
              <el-select v-model="formInfo.projectStages" placeholder="请选择">
                <el-option
                  v-for="item in formInfo.projectStagesOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="key">关键项目名称 :</div>
            <div class="val">
              <el-input v-model="formInfo.crux_name"></el-input>
            </div>
          </div>
          <div>
            <div class="key">在售产品 :</div>
            <div class="val">
              <el-input v-model="formInfo.sell_product"></el-input>
            </div>
          </div>
          <div>
            <div class="key">
              <i class="red_icon">*</i> 启用类别 :
            </div>
            <div class="val">
              <el-select v-model="formInfo.start_type" placeholder="请选择">
                <el-option
                  v-for="item in formInfo.start_typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="key">
              <i class="el-icon-question question"></i> 情况简述 :
            </div>
            <div class="val">
              <el-input v-model="formInfo.case_desc" type="textarea"></el-input>
            </div>
          </div>
        </div>
        <div class="salesTarget">
          <div class="salesTarget_title">一、销售目标</div>
          <div class="salesTarget_content">
            <div>
              <div class="key">阶段销售目标 :</div>
              <div class="val">
                <el-input v-model="formInfo.project_sell_target"></el-input>
              </div>
              <div class="salesTarget_content_unit">万</div>
            </div>
            <div>
              <div class="key">项目套数目标 :</div>
              <div class="val">
                <el-input v-model="formInfo.project_num_target"></el-input>
              </div>
              <div class="salesTarget_content_unit">套</div>
            </div>
            <div>
              <div class="key">中介销售目标 :</div>
              <div class="val">
                <el-input v-model="formInfo.agency_num_target"></el-input>
              </div>
              <div class="salesTarget_content_unit">套</div>
            </div>
            <div>
              <div class="key">中介占比 :</div>
              <div class="val">
                <el-input v-model="formInfo.agency_ratio"></el-input>
              </div>
              <div class="salesTarget_content_unit">%</div>
            </div>
            <div>
              <div class="key">中介控制占比 :</div>
              <div class="val">
                <el-input v-model="formInfo.agency_ctro_ratio"></el-input>
              </div>
              <div class="salesTarget_content_unit">%</div>
            </div>
          </div>
        </div>
        <div class="intermediaryApply">
          <div class="intermediaryApply_title">二、中介申请方案</div>
          <div class="intermediaryApply_content">
            <div>
              <div class="key">启用时间 :</div>
              <div class="val">
                <el-date-picker v-model="formInfo.start_time" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </div>
            <div>
              <div class="key">终止时间 :</div>
              <div class="val">
                <el-date-picker v-model="formInfo.end_time" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </div>
            <div>
              <div class="key">
                <i class="el-icon-question question"></i> 佣金说明 :
              </div>
              <div class="val">
                <el-input v-model="formInfo.commission_desc"></el-input>
              </div>
            </div>
            <div>
              <div class="key">
                <i class="el-icon-question question"></i> 结算标准 :
              </div>
              <div class="val">
                <el-input v-model="formInfo.closing_criteria"></el-input>
              </div>
            </div>
          </div>
          <div class="intermediaryApply_title">标题</div>
          <el-table
            :data="formInfo.intermediaryApplyTable"
            tooltip-effect="dark"
            show-summary
            style="width: 100%"
            :header-cell-style="{'background-color':'#FAFAFA'}"
          >
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column prop="name" label="中介名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="project" label="任务目标(套)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="预估佣金(万)" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text">编辑</el-button>
                <el-button type="text" @click="delIntermediaryApplyTable(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="tableAdd">
            <el-button type="text" @click="addIntermediaryApplyTable">
              <i class="el-icon-plus"></i>添加
            </el-button>
          </div>
        </div>
        <div class="costExplain">
          <div class="costExplain_title">三、费用使用说明</div>
          <div class="costExplain_content">
            <div>
              <div class="key">
                <span class="radioText">费用支出</span>
              </div>
              <div class="val">
                <el-radio v-model="formInfo.cost_append" label="0">表内</el-radio>
                <el-radio v-model="formInfo.cost_append" label="1">表外</el-radio>
              </div>
            </div>
            <div>
              <div class="key">
                <span class="radioText">营销费用支付情况</span>
              </div>
              <div class="val">
                <el-radio v-model="formInfo.marketing_cost_append" label="0">正常支付</el-radio>
                <el-radio v-model="formInfo.marketing_cost_append" label="1">提升售价支付</el-radio>
              </div>
            </div>
            <div>
              <div class="key">
                <i class="el-icon-question question"></i> 营销费率约定 :
              </div>
              <div class="val">
                <el-input v-model="formInfo.marketing_rate_appoint"></el-input>
              </div>
            </div>
            <div>
              <div class="key">整盘情况考核费率 :</div>
              <div class="val">
                <el-input v-model="formInfo.year_check_rate"></el-input>
              </div>
            </div>
            <div>
              <div class="key">整盘情况当前费率情况已花费率 :</div>
              <div class="val">
                <el-input v-model="formInfo.total_has_cost_rate"></el-input>
              </div>
            </div>
            <div>
              <div class="key">整盘情况当前费率情况剩余费率 :</div>
              <div class="val">
                <el-input v-model="formInfo.total_residue_rate"></el-input>
              </div>
            </div>
            <div>
              <div class="key">整盘情况支出后费率变化 :</div>
              <div class="val">
                <el-input v-model="formInfo.total_cost_rate_change"></el-input>
              </div>
            </div>
            <div>
              <div class="key">年度情况考核费率 :</div>
              <div class="val">
                <el-input v-model="formInfo.year_check_rate"></el-input>
              </div>
            </div>
            <div>
              <div class="key">年度情况当前费率情况已花费率 :</div>
              <div class="val">
                <el-input v-model="formInfo.year_has_cost_rate"></el-input>
              </div>
            </div>
            <div>
              <div class="key">年度情况当前费率情况剩余费率 :</div>
              <div class="val">
                <el-input v-model="formInfo.year_total_residue_rate"></el-input>
              </div>
            </div>
            <!-- <div>
              <div class="key">年度情况支出后费率变化</div>
              <div class="val"><el-input  v-model="formInfo.year_check_rate"></el-input></div>
            </div>-->
            <div>
              <div class="key">电商合作单位 :</div>
              <div class="val">
                <el-input v-model="formInfo.ds_cooperative"></el-input>
              </div>
            </div>
            <div>
              <div class="key">电商收取金额 :</div>
              <div class="val">
                <el-input v-model="formInfo.ds_take_money"></el-input>
              </div>
            </div>
            <div>
              <div class="key">电商合作开始时间 :</div>
              <div class="val center">
                <!-- <el-input  v-model="formInfo.dshz_start_time"></el-input> -->
                <el-date-picker v-model="formInfo.dshz_start_time" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </div>
            <div>
              <div class="key">电商合作结束时间 :</div>
              <div class="val center">
                <!-- <el-input  v-model="formInfo.dshz_end_time"></el-input> -->
                <el-date-picker v-model="formInfo.dshz_end_time" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </div>
            <div class="allWidth">
              <div class="key">电商收费标准(电商手续费等) :</div>
              <div class="val">
                <el-input type="textarea" v-model="formInfo.ds_take_standard"></el-input>
              </div>
            </div>
            <div class="allWidth">
              <div class="key">年度情况支出后费率变化 :</div>
              <div class="val">
                <el-input type="textarea" v-model="formInfo.year_cost_rate_change"></el-input>
              </div>
            </div>
            <div class="allWidth">
              <div class="key">优惠口径 :</div>
              <div class="val">
                <el-input type="textarea" v-model="formInfo.preferential_caliber"></el-input>
              </div>
            </div>
            <div class="allWidth">
              <div class="key">政策风险 :</div>
              <div class="val">
                <el-input type="textarea" v-model="formInfo.policy_risk"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="flowProspect">
          <div class="flowProspect_title">四、开通后流量预估</div>
          <div class="flowProspect_content">
            <div>
              <div class="key">现项目销售流量 :</div>
              <div class="val">
                <el-input v-model="formInfo.project_sell_flow"></el-input>
              </div>
              <div class="flowProspect_unit">万/月</div>
            </div>
            <div>
              <div class="key">开通后预估销售流量 :</div>
              <div class="val">
                <el-input v-model="formInfo.predict_sell_flow"></el-input>
              </div>
              <div class="flowProspect_unit">万/月</div>
            </div>
          </div>
        </div>
        <div class="projectBase">
          <div class="projectBase_title">五、项目基本情况</div>
          <div class="projectBase_content">
            <div>
              <div class="key">项目位置及所属板块 :</div>
              <div class="val">
                <el-input v-model="formInfo.project_address"></el-input>
              </div>
            </div>
            <div>
              <div class="key">
                <i class="el-icon-question question"></i> 成交客户区域说明 :
              </div>
              <div class="val">
                <el-input v-model="formInfo.customer_area_desc"></el-input>
              </div>
            </div>
            <div>
              <div class="key">项目以销售去化比例 :</div>
              <div class="val">
                <el-input v-model="formInfo.customer_area_desc"></el-input>
              </div>
            </div>
            <div>
              <div class="key">
                <i class="el-icon-question question"></i> 中介销售房源标注 :
              </div>
              <div class="val">
                <el-input v-model="formInfo.agency_sell_house"></el-input>
              </div>
            </div>
            <div>
              <div class="key">
                <i class="el-icon-question question"></i> 项目股权比例 :
              </div>
              <div class="val">
                <el-input v-model="formInfo.project_stock_ratio"></el-input>
              </div>
            </div>
            <div class="allWidth">
              <div class="key">
                <i class="el-icon-question question"></i> 中介使用目的 :
              </div>
              <div class="val">
                <el-input type="textarea" v-model="formInfo.agency_intended_use"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="selectStandard">
          <div class="selectStandard_title">六、中介选用以及淘汰标准</div>
          <div class="selectStandard_content">
            <div class="key">
              <i class="el-icon-question question"></i> 中介选用以及淘汰标准 :
            </div>
            <div class="val">
              <el-input v-model="formInfo.agency_standard" type="textarea"></el-input>
            </div>
          </div>
        </div>
        <div class="confirmFlow">
          <div class="confirmFlow_title">七、中介客户确认流程</div>
          <div class="confirmFlow_content">
            <div class="key">
              <i class="el-icon-question question"></i> 中介推荐客户管理制度 :
            </div>
            <div class="val">
              <el-input v-model="formInfo.agency_report_standard" type="textarea"></el-input>
            </div>
          </div>
        </div>
        <div class="confirmFlow">
          <div class="confirmFlow_title">八、中介费结算依据以及支出说明</div>
          <div class="confirmFlow_content">
            <div class="key">
              <i class="el-icon-question question"></i> 中介费结算依据以及支出说明 :
            </div>
            <div class="val">
              <el-input v-model="formInfo.agency_cost_desc" type="textarea"></el-input>
            </div>
          </div>
        </div>
        <div class="upload">
          <el-upload
            class="upload-demo"
            :action="action"
            :on-preview="filePreview"
            :on-remove="fileRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="fileExceed"
            :file-list="formInfo.fileList"
          >
            <el-button size="small">
              <i class="el-icon-upload2 uploadIcon"></i> 点击上传
            </el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
      </div>
    </div>
    <div class="allPeopleForm_btn">
      <el-button type="primary">预览后提交</el-button>
      <el-button>保存</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // 项目切换组件
    checkProject: () => import("@/views/brokerage/components/checkProject")
  },
  watch: {
    mainData: {
      handler(newv) {},
      deep: true
    },
    formInfo: {
      handler(newv) {},
      deep: true
    }
  },
  data() {
    return {
      mainData: {
        //当前区域
        nowArea: "",
        //当前城市
        nowCity: "",
        //当前项目
        nowProject: "",
        //项目搜索框
        searchVal: "",
        //树状项目数据
        treeData: [
          {
            id: "1",
            name: "上海区域集团",
            children: [
              {
                id: "2",
                name: "上海片区",
                children: [
                  {
                    id: "3",
                    name: "上海华庭",
                    level: 3
                  },
                  {
                    id: "4",
                    name: "上海雅苑",
                    level: 3
                  }
                ],
                level: 2
              },
              {
                id: "5",
                name: "上海片区2",
                children: [
                  {
                    id: "6",
                    name: "上海华庭2",
                    level: 3
                  },
                  {
                    id: "6",
                    name: "上海雅苑2",
                    level: 3
                  },
                  {
                    id: "6",
                    name: "上海浦江镇2",
                    level: 3
                  }
                ],
                level: 2
              }
            ],
            level: 1
          }
        ]
      },
      formInfo: {
        //政策编号
        code: "政策编号",
        //申请人
        name: "申请人",
        //申请人部门
        department: "申请人部门",
        //政策名称
        applyName:
          "特别长的一段文字特别长的一段文字特别长的一段文字特别长的一段文字特别长的一段文字特别长的一段文字",
        projectName: "项目名称",
        crux_name: "关键项目名称",
        // 启用类别
        start_type: "1",
        // 项目分期
        projectStages: "1",
        // 项目分期选项
        projectStagesOptions: [
          { value: "0", label: "全部" },
          { value: "1", label: "其他" }
        ],
        //启用类别选项
        start_typeOptions: [
          { value: "0", label: "全部" },
          { value: "1", label: "其他" }
        ],
        //在售产品
        sell_product: "在售产品",
        // 情况简述
        case_desc:
          "情况简述情况简述情况简述情况简述情况简述情况简述情况简述情况简述情况简述情况简述情况简述情况简述情况简述情况简述",
        // 阶段销售目标
        project_sell_target: "阶段销售目标",
        // 项目套数目标
        project_num_target: "项目套数目标",
        // 中介销售目标
        agency_num_target: "中介销售目标",
        // 中介占比
        agency_ratio: "中介占比",
        // 中介控制占比
        agency_ctro_ratio: "中介控制占比",
        // 启用时间
        start_time: "",
        //终止时间
        end_time: "",
        //佣金说明
        commission_desc: "佣金说明",
        // 结算标准
        closing_criteria: "结算标准",
        //中介表格
        intermediaryApplyTable: [
          {
            name: "哈哈哈",
            project: "565",
            address: "123"
          },
          {
            name: "哈哈哈",
            project: "565",
            address: "123"
          },
          {
            name: "哈哈哈",
            project: "565",
            address: "123"
          },
          {
            name: "哈哈哈",
            project: "565",
            address: "123"
          }
        ],
        //费用支出
        cost_append: "0",
        //营销费用支付情况
        marketing_cost_append: "0",
        // 营销费率约定
        marketing_rate_appoint: "营销费率约定",
        // 整盘情况考核费率
        // year_check_rate,
        // 整盘情况当前费率情况已花费率
        total_has_cost_rate: "整盘情况当前费率情况已花费率",
        //整盘情况当前费率情况剩余费率
        total_residue_rate: "整盘情况当前费率情况剩余费率",
        //整盘情况支出后费率变化
        total_cost_rate_change: "整盘情况支出后费率变化",
        //年度情况考核费率
        year_check_rate: "年度情况考核费率",
        // 年度情况当前费率情况已花费率
        year_has_cost_rate: "年度情况当前费率情况已花费率",
        //年度情况当前费率情况剩余费率
        year_total_residue_rate: "年度情况当前费率情况剩余费率",
        //电商合作单位
        ds_cooperative: "电商合作单位",
        // 电商收取金额
        ds_take_money: "电商收取金额",
        //电商合作开始时间
        dshz_start_time: "",
        // 电商合作结束时间
        dshz_end_time: "",
        //  电商收费标准(电商手续费等)
        ds_take_standard: "电商收费标准(电商手续费等)",
        //年度情况支出后费率变化
        year_cost_rate_change: "年度情况支出后费率变化",
        // 优惠口径
        preferential_caliber: "优惠口径",
        //政策风险
        policy_risk: "政策风险",
        //现项目销售流量
        project_sell_flow: "现项目销售流量",
        //开通后预估销售流量
        predict_sell_flow: "开通后预估销售流量",
        //项目位置及所属板块
        project_address: "项目位置及所属板块",
        // 成交客户区域说明
        customer_area_desc: "成交客户区域说明",
        //项目以销售去化比例
        //中介销售房源标注
        agency_sell_house: "中介销售房源标注",
        //项目股权比例
        project_stock_ratio: "项目股权比例",
        //中介使用目的
        agency_intended_use: "中介使用目的",
        // 中介选用以及淘汰标准
        agency_standard: "中介选用以及淘汰标准",
        //中介推荐客户管理制度
        agency_report_standard: "中介推荐客户管理制度",
        //中介费结算依据以及支出说明
        agency_cost_desc: "中介费结算依据以及支出说明",
        //附件列表
        fileList: []
      }
    };
  },
  computed: {
    action() {
      let href = process.env.VUE_APP_BASE_API;
      return href + "/Upload/uploadFile_2";
    }
  },
  methods: {
    //表格删除
    delIntermediaryApplyTable(index) {
      this.formInfo.intermediaryApplyTable.splice(index, 1);
    },
    //表格添加
    addIntermediaryApplyTable() {
      this.formInfo.intermediaryApplyTable.push({
        name: "哈哈哈",
        project: "565",
        address: "123"
      });
    },
    fileRemove(file, fileList) {
      console.log(file, fileList);
    },
    filePreview(file) {
      console.log(file);
    },
    fileExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang="less" scoped>
.allPeopleForm {
  padding-bottom: 70px;
  // background: pink;
  .allPeopleForm_top {
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;
    border-radius: 6px;
  }
  .allPeopleForm_bottom {
    border-radius: 6px;

    margin: 10px;
    .red_icon {
      color: red;
      font-style: normal;
    }
    .question {
      margin-right: 0;
      color: #faad15;
    }
    .baseInfo {
      box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;

      background: #fff;
      padding: 15px;
      margin-bottom: 10px;
      .baseInfo_title {
        height: 20px;
        font-weight: 700;
        font-size: 14px;
        color: #333;
      }
      .baseInfo_content {
        margin: 0 10px 0;
        display: flex;
        flex-wrap: wrap;
        font-size: 14px;
        color: #333;

        .applyName {
          ::v-deep .el-input__inner {
            width: 408px;
          }
        }
        > div {
          width: 33.33%;
          height: 45px;
          line-height: 45px;
          display: flex;
          .key {
              width: 100px;
            text-align: right;
            padding-right: 3px;
          }
          .val {
            flex: 1;
          }
        }
        > div:last-child {
          width: 100%;
          height: 45px;
          line-height: 45px;
          display: flex;
            > div:first-child{
            width: 100px;
          }

          > div:last-child {
            flex: 1;
          }
        }
      }
    }
    .applyInfo {
      box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;

      background: #fff;
      padding: 15px;
      .applyInfo_title {
        height: 20px;
        font-weight: 700;
        font-size: 14px;
        color: #333;
      }
      .applyInfo_content {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        border-bottom: 1px solid #f4f4f4;

        > div {
          width: 33.33%;
          // height: 45px;
          min-height: 45px;

          line-height: 45px;
          display: flex;
          .key {
            width: 100px;
            text-align: right;
            padding-right: 3px;
          }
          .val {
            flex: 1;
            padding: 0 5px;
            .el-select {
              width: 100%;
            }
            ::v-deep .el-input__inner {
              max-width: 190px;
            }
          }
        }
        > div:last-child {
          width: 100%;
          .val {
            flex: 1;
            padding: 10px 5px 0;
          }
        }
      }
    }
    .salesTarget {
      border-bottom: 1px solid #f4f4f4;

      .salesTarget_title {
        height: 50px;
        line-height: 50px;
        font-weight: 700;
      }
      .salesTarget_content {
        display: flex;
        flex-wrap: wrap;
        > div {
          width: 33.33%;
          display: flex;
          height: 45px;
          line-height: 45px;
          .key {
            width: 100px;
            text-align: right;
            padding-right: 3px;
          }

          .val {
            flex: 1;
            display: flex;
            padding: 0 5px;
            ::v-deep .el-input__inner {
              max-width: 190px;
            }
          }
          .salesTarget_content_unit {
            width: 18px;
          }
        }
      }
    }
    .intermediaryApply {
      border-bottom: 1px solid #f4f4f4;
      .intermediaryApply_title {
        height: 50px;
        line-height: 50px;
        font-weight: 700;
      }
      .intermediaryApply_content {
        display: flex;
        flex-wrap: wrap;
        > div {
          width: 33.33%;
          display: flex;
          height: 45px;
          line-height: 45px;
          .key {
            width: 100px;
            text-align: right;
          }
          .val {
            padding: 0 5px;
            flex: 1;
            ::v-deep .el-input__inner {
              max-width: 190px;
            }
            .el-date-editor {
              width: 100%;
            }
          }
        }
      }
    }
    .costExplain {
      border-bottom: 1px solid #f4f4f4;
      .costExplain_title {
        height: 50px;
        line-height: 50px;
        font-weight: 700;
      }
      .costExplain_content {
        display: flex;
        flex-wrap: wrap;
        > div {
          width: 50%;
          display: flex;
          min-height: 45px;
          line-height: 45px;
          text-align: center;

          .radioText {
            margin-right: 5px;
          }
          .el-radio {
            line-height: 45px;
          }
          .key {
            flex: 1;
            text-align: right;
          }
          .el-date-editor.el-input {
            width: 100%;
          }
          .val {
            flex: 1;
            padding: 0 5px;
            text-align: center;
            ::v-deep .el-input__inner {
              max-width: 190px;
            }
            .el-textarea {
              margin: 5px 0;
            }
          }
        }
        .allWidth {
          width: 100%;
          .val {
            flex: 3;
            padding: 0 5px;
          }
        }
      }
    }
    .flowProspect {
      border-bottom: 1px solid #f4f4f4;

      .flowProspect_title {
        height: 50px;
        line-height: 50px;
        font-weight: 700;
      }
      .flowProspect_content {
        display: flex;
        flex-wrap: wrap;
        height: 45px;
        line-height: 45px;
        > div {
          width: 50%;
          display: flex;
          .key {
            flex: 1;
            text-align: right;
          }
          .val {
            flex: 1;
            padding: 0 5px;
            ::v-deep .el-input__inner {
              max-width: 190px;
            }
          }
          .flowProspect_unit {
            width: 37px;
          }
        }
      }
    }
    .projectBase {
      border-bottom: 1px solid #f4f4f4;
      padding-bottom: 15px;
      .projectBase_title {
        height: 50px;
        line-height: 50px;
        font-weight: 700;
      }
      .projectBase_content {
        display: flex;
        flex-wrap: wrap;
        > div {
          width: 50%;
          display: flex;
          min-height: 45px;
          line-height: 45px;
          .key {
            flex: 1;
            text-align: right;
          }
          .val {
            flex: 1;
            padding: 0 5px;
            ::v-deep .el-input__inner {
              max-width: 190px;
            }
          }
        }
        .allWidth {
          width: 100%;
          .val {
            flex: 3;
            padding: 0 5px;
          }
        }
      }
    }
    .selectStandard {
      padding-bottom: 15px;

      border-bottom: 1px solid #f4f4f4;
      .selectStandard_title {
        height: 50px;
        line-height: 50px;
        font-weight: 700;
      }
      .selectStandard_content {
        display: flex;
        min-height: 45px;
        line-height: 45px;
        .key {
          flex: 1;
          text-align: right;
        }
        .val {
          flex: 3;
          padding: 0 5px;
        }
      }
    }
    .confirmFlow {
      padding-bottom: 15px;

      border-bottom: 1px solid #f4f4f4;
      .confirmFlow_title {
        height: 50px;
        line-height: 50px;
        font-weight: 700;
      }
      .confirmFlow_content {
        display: flex;
        min-height: 45px;
        line-height: 45px;
        .key {
          flex: 1;
          text-align: right;
        }
        .val {
          flex: 3;
          padding: 0 5px;
        }
      }
    }
    .upload {
      margin-left: 50px;
      width: 200px;

      .el-upload {
        .uploadIcon {
          margin: 0;
          color: #333;
        }
      }
    }
  }
  .allPeopleForm_btn {
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;

    width: 100%;
    position: fixed;
    bottom: 0;
    height: 60px;
    line-height: 60px;
    background: #fff;
    text-align: center;
  }
  .center {
    // position: relative;
    > div {
      width: 190px !important;
      text-align: center;

      //   position: absolute;
      //   top: 50%;
      //   left: 50%;
      //   transform: translate(-50%,-50%);
      //   input{
      //     position: absolute;
      //           top: 50%;
      //   left: 50%;
      //   transform: translate(-50%,-50%);
      //   }
    }
  }
}
</style>
