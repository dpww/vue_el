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
        </div>
        <div class="salesTarget">
          <div class="salesTarget_title">一、项目背景及市场背景</div>
          <div class="salesTarget_content">
            <div>
              <div class="key">项目位置及所属板块 :</div>
              <div class="val">
                <el-input v-model="formInfo.project_address"></el-input>
              </div>
              <!-- <div class="salesTarget_content_unit">万</div> -->
            </div>
            <div>
              <div class="key">成交客户区域说明 :</div>
              <div class="val">
                <el-input v-model="formInfo.customer_area_desc"></el-input>
              </div>
              <!-- <div class="salesTarget_content_unit">套</div> -->
            </div>
            <div>
              <div class="key">区域存量 :</div>
              <div class="val">
                <el-input v-model="formInfo.area_stock"></el-input>
              </div>
              <!-- <div class="salesTarget_content_unit">套</div> -->
            </div>
            <div>
              <div class="key">使用目的 :</div>
              <div class="val">
                <el-input v-model="formInfo.intended_use"></el-input>
              </div>
              <!-- <div class="salesTarget_content_unit">%</div> -->
            </div>
            <div>
              <div class="key">项目已销售去化比例 :</div>
              <div class="val">
                <el-input v-model="formInfo.project_sell_ratio"></el-input>
              </div>
              <!-- <div class="salesTarget_content_unit">%</div> -->
            </div>
            <div>
              <div class="key">项目股权比例 :</div>
              <div class="val">
                <el-input v-model="formInfo.project_stock_ratio"></el-input>
              </div>
              <!-- <div class="salesTarget_content_unit">%</div> -->
            </div>
            <div class="allWidth">
              <div class="key">市场背景 :</div>
              <div class="val">
                <el-input type="textarea" v-model="formInfo.market_background"></el-input>
              </div>
            </div>
            <!-- <div class="salesTarget_content_unit">%</div> -->
          </div>
        </div>
      <div class="allPeopleFormApply">
        <div class="allPeopleFormApply_title">二、销售目标及预估奖励</div>
        <div class="allPeopleFormApply_content">
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
            <div class="key">阶段销售目标 :</div>
            <div class="val">
              <el-input v-model="formInfo.stage_sell_target"></el-input>
            </div>
            <div class="salesTarget_content_unit">万</div>
          </div>
          <div>
            <div class="key">阶段套数目标 :</div>
            <div class="val">
              <el-input v-model="formInfo.stage_num_target"></el-input>
            </div>
            <div class="salesTarget_content_unit">套</div>
          </div>
          <div>
            <div class="key">销售预计占比 :</div>
            <div class="val">
              <el-input v-model="formInfo.sell_predict_ratio"></el-input>
            </div>
          </div>
          <div>
            <div class="key">
              <i class="el-icon-question question"></i> 签约套数上限 :
            </div>
            <div class="val">
              <el-input v-model="formInfo.sign_num_max"></el-input>
            </div>
            <div class="salesTarget_content_unit">套</div>
          </div>
          <div>
            <div class="key">
              <i class="el-icon-question question"></i> 预计奖励总额 :
            </div>
            <div class="val">
              <el-input v-model="formInfo.predict_award_total"></el-input>
            </div>
            <div class="salesTarget_content_unit">元</div>
          </div>
          <div>
            <div class="key">现项目销售流量 :</div>
            <div class="val">
              <el-input v-model="formInfo.project_sell_flow"></el-input>
            </div>
            <div class="salesTarget_content_unit">万/月</div>
          </div>
          <div>
            <div class="key">开通后预估销售流量 :</div>
            <div class="val">
              <el-input v-model="formInfo.predict_sell_flow"></el-input>
            </div>
            <div class="salesTarget_content_unit">万/月</div>
          </div>
        </div>
      </div>
      <div class="confirmFlow">
        <div class="confirmFlow_title">三、奖励方案及销售政策说明</div>
        <div class="confirmFlow_content">
          <div class="key">
            <i class="el-icon-question question"></i> 奖励方案及销售政策说明 :
          </div>
          <div class="val">
            <el-input v-model="formInfo.award_remake" type="textarea"></el-input>
          </div>
        </div>
      </div>
      <div class="costExplain">
        <div class="costExplain_title">四、费用使用说明</div>
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
            <div class="key">考核费率 :</div>
            <div class="val">
              <el-input v-model="formInfo.check_rate"></el-input>
            </div>
          </div>
          <div>
            <div class="key">已花费率 :</div>
            <div class="val">
              <el-input v-model="formInfo.has_cost_rate"></el-input>
            </div>
          </div>
          <div>
            <div class="key">剩余费率 :</div>
            <div class="val">
              <el-input v-model="formInfo.residue_rate"></el-input>
            </div>
          </div>
          <div>
            <div class="key">支出后费率变化 :</div>
            <div class="val">
              <el-input v-model="formInfo.cost_rate_change"></el-input>
            </div>
          </div>
          <div class="allWidth">
            <div class="key">说明详情 :</div>
            <div class="val">
              <el-input type="textarea" v-model="formInfo.elaborate"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="confirmFlow">
        <div class="confirmFlow_title">五、历史政策使用情况</div>
        <div class="confirmFlow_content">
          <div class="key">
            <i class="el-icon-question question"></i> 历史政策使用情况 :
          </div>
          <div class="val">
            <el-input v-model="formInfo.old_policy_use_desc" type="textarea"></el-input>
          </div>
        </div>
      </div>
      <div class="confirmFlow">
        <div class="confirmFlow_title">六、全民营销执行细节管理制度</div>
        <div class="confirmFlow_content">
          <div class="key">
            <i class="el-icon-question question"></i> 全民营销执行细节管理制度 :
          </div>
          <div class="val">
            <el-input v-model="formInfo.broker_man_desc" type="textarea"></el-input>
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
        // 项目分期
        projectStages: "1",
        // 项目分期选项
        projectStagesOptions: [
          { value: "0", label: "全部" },
          { value: "1", label: "其他" }
        ],
        // 区域存量
        area_stock: "区域存量",
        // 使用目的
        intended_use: "使用目的",
        // 项目已销售去化比例
        project_sell_ratio: "项目已销售去化比例",
        //项目股权比例
        project_stock_ratio:"项目股权比例",
        //市场背景
        market_background:"市场背景",
        // 启用时间
        start_time: "",
        //终止时间
        end_time: "",
        //阶段销售目标
        stage_sell_target: "阶段销售目标",
        //阶段套数目标
        stage_num_target:"阶段套数目标",
        //销售预计占比
        sell_predict_ratio:"销售预计占比",
        //签约套数上限
        sign_num_max:"签约套数上限",
        //预计奖励总额
        predict_award_total:"预计奖励总额",
        //现项目销售流量
        project_sell_flow:"现项目销售流量",
        //开通后预估销售流量
        predict_sell_flow:"开通后预估销售流量",
        //奖励方案及销售政策
        award_remake:"奖励方案及销售政策",
        //费用支出
        cost_append: "0",
        //营销费用支付情况
        marketing_cost_append: "0",
        // 营销费率约定
        marketing_rate_appoint: "营销费率约定",
        // 整盘情况考核费率
        // check_rate,
        // 已花费率
        has_cost_rate: "已花费率",
        //剩余费率
        residue_rate: "剩余费率",
        //支出后费率变化
        cost_rate_change: "支出后费率变化",
        //考核费率
        check_rate: "考核费率",
        //说明详情
        elaborate: "说明详情",
        //项目位置及所属板块
        project_address: "项目位置及所属板块",
        // 成交客户区域说明
        customer_area_desc: "成交客户区域说明",
        //历史政策使用情况
        old_policy_use_desc: "历史政策使用情况",
        //全民营销执行细节管理制度
        broker_man_desc: "全民营销执行细节管理制度",
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
      padding: 15px;
      background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;


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
        border-bottom: 1px solid #f4f4f4;

        > div {
          width: 50%;
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
            width: 130px;
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
        .allWidth {
          width: 100%;
          .val {
            flex: 3;
            padding: 0 5px;
          }
        }
      }
    }
    .allPeopleFormApply {
      border-bottom: 1px solid #f4f4f4;
      background: #fff;
      .allPeopleFormApply_title {
        height: 50px;
        line-height: 50px;
        font-weight: 700;
      }
      .allPeopleFormApply_content {
        display: flex;
        flex-wrap: wrap;
        > div {
          width: 33.33%;
          display: flex;
          height: 45px;
          line-height: 45px;
          .key {
            width: 160px;
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
      background: #fff;
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
            text-align: center;
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
      background: #fff;
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
