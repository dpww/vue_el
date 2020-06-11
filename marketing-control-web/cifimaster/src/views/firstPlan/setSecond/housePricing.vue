<template>
  <div class="housePricing">


    <div class="padding_10">
      <p>楼栋大定价
         <!-- <div class="btnBox"> -->
            <el-button v-if="!readOnly" type="primary" style="float:right;margin-left:10px;" @click="importFile = true"
        >导入文件</el-button>
      <el-button v-if="!readOnly" style="float:right;" type="primary" @click="dialogVisible = true"
        >选择楼栋</el-button>

    <!-- </div> -->
      </p>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="project_name"
        label="项目"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="product_type"
        label="分期"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="operation_type"
        label="业态"
        align="center"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="building_name"
        label="楼栋"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="level_coefficient"
        align="center"
        label="楼幢水平系数"
      ></el-table-column>
      <el-table-column
        prop="operation_coefficient"
        align="center"
        label="楼幢业态系数"
      ></el-table-column>
      <el-table-column
        prop="static_coefficient"
        align="center"
        label="楼幢综合系数"
      ></el-table-column>
      <el-table-column
        prop="product_price"
        align="center"
        label="业态基价"
      ></el-table-column>
      <el-table-column
        prop="static_price"
        width="100"
        align="center"
        label="楼幢静态均价"
      ></el-table-column>
      <el-table-column
        prop="open_time"
        align="center"
        width="190"
        label="开盘时间"
      ></el-table-column>
      <el-table-column
        prop="def_week"
        align="center"
        label="大定价版周期系数"
      ></el-table-column>
      <el-table-column align="center" width="140" label="大定价版楼幢均价">
        <template slot-scope="scope">{{
          scope.row.this_building_avg | fixed
        }}</template>
      </el-table-column>
      <el-table-column
        prop="this_pric_week_correction"
        align="center"
        label="本次定价楼栋周期系数修正"
      ></el-table-column>
      <el-table-column align="center" label="本次定价楼栋数据">
        <el-table-column
          width="160"
          prop="this_building_area"
          align="center"
          label="面积"
        ></el-table-column>
        <el-table-column
          prop="this_pric_build_avgprice"
          width="120"
          align="center"
          label="均价"
        >
          <template slot-scope="scope">{{
            scope.row.this_pric_build_avgprice | fixed
          }}</template>
        </el-table-column>
        <el-table-column
          prop="this_building_raw_avg"
          align="center"
          label="均价偏离度"
        ></el-table-column>
        <el-table-column
          prop="this_pric_value"
          width="140"
          align="center"
          label="货值"
        ></el-table-column>
        <el-table-column
          prop="this_pric_raw_value"
          width="140"
          align="center"
          label="货值损益"
        ></el-table-column>
      </el-table-column>
      <el-table-column align="center" label="本次定价后所有楼栋">
        <el-table-column width="100" align="center" label="均价">
          <template slot-scope="scope">
            {{ scope.row.this_pric_back_raw_value }}
          </template>
        </el-table-column>
        <el-table-column
          prop="this_pric_back_raw_avg"
          align="center"
          width="140"
          label="货值"
        ></el-table-column>
      </el-table-column>
      <el-table-column align="center" label="取自供销存系统项目楼栋去化率报表">
        <el-table-column
          prop="task_kingdee_sell_area"
          align="center"
          label="已售面积"
        ></el-table-column>
        <el-table-column
          prop="task_kingdee_sell_avg"
          align="center"
          label="已售均价"
        ></el-table-column>
        <el-table-column
          prop="task_kingdee_sell_value"
          align="center"
          label="已售货值"
        ></el-table-column>
        <el-table-column
          prop="task_kingdee_not_are"
          align="center"
          label="未售面积"
        ></el-table-column>
        <el-table-column align="center" label="未售均价">
          <template slot-scope="scope">
            {{ scope.row.task_kingdee_not_avg }}
          </template>
        </el-table-column>
        <el-table-column width="140" align="center" label="未售货值">
          <template slot-scope="scope">
            {{ scope.row.task_kingdee_not_value }}
          </template>
        </el-table-column>
        <el-table-column
          prop="task_kingdee_not_area"
          align="center"
          label="整栋面积"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="task_kingdee_dynamic_avg"
          align="center"
          label="整栋均价"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="task_kingdee_dynamic_value"
          width="140"
          align="center"
          label="整栋货值"
        ></el-table-column>
        <el-table-column
          prop="task_kingdee_dynamic_sell"
          align="center"
          label="已售比例"
          width="140"
        ></el-table-column>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible">
      <el-cascader
        v-model="stageValue"
        ref="stageList"
        :options="stageList"
        :props="props"
        :show-all-levels="false"
        collapse-tags
        clearable
        placeholder="请选择"
      ></el-cascader>
      <!-- <el-select v-model="stageValue" @change="changeStage" clearable placeholder="请选择">
        <el-option
          v-for="(item,index) in stageList"
          :key="index"
          :label="item.StageName"
          :value="item.StageName"
        ></el-option>
      </el-select>
      <el-select
        class="buildSelect"
        v-model="buildValue"
        multiple
        collapse-tags
        placeholder="请选择"
        @change="selectAll"
      >
        <el-option
          v-for="(item,index) in houseList"
          :key="index"
          :label="item.buildingName"
          :value="item.bldPrdID"
        ></el-option>
      </el-select>-->

      <span slot="footer" class="dialog-footer">
        <el-button class="blankBtn" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="loadEtable">导出模版</el-button>
      </span>
    </el-dialog>
        <el-dialog title="导入数据" :visible.sync="importFile">
      <el-upload
        class="upload-demo"
        drag
        accept=".xls, .xlsx"
        :on-success="uploadSuccess"
        :action="action"
        :data="{
          plan_id: this.$route.query.plan_id,
          plan_node_id: this.actVersions,
          project_id: this.$route.query.project_id
        }"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传.xls/.xlsx文件</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProjectStages,
  viewBigPriceBuildData,
  saveBigPriceBuildData,
  buildBigPriceExportTemplate
} from "@/api/firstPlan";
import { downLoad } from "@/api/request";
export default {
  name: "housePricing",
  props: ["versions", "readonly"],
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
      importFile: false,
      dialogVisible: false,
      tableData: [],
      stageList: [],
      props: {
        multiple: true,
        children: "buildData",
        value: "bldPrdID",
        label: "buildingName"
      },
      stageValue: "",
      buildValue: [],
      oldOptions: [[]]
    };
  },
  computed: {
    action() {
      let href = process.env.VUE_APP_BASE_API;
      /* "/Upload/uploadFile_2";*/
      return href + "/buildBigPrice/importExcelTemplate";
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
    houseList() {
      let arr = this.stageList.filter(
        item => item.StageName == this.stageValue
      );
      let temparr = [];
      if (arr.length > 0) {
        arr[0].buildData.forEach((item, index) => {
          temparr.push(item);
        });
      }
      temparr.unshift({
        bldPrdID: "选项0",
        buildingName: "全选"
      });
      return temparr;
    }
  },
  watch: {
    actVersions: {
      handler(a, b) {
        if(a==''){
        this.reload("create");

        }else{
        this.reload();

        }
      },
      deep: true
    }
  },
  created() {
    this.reload();
  },
  methods: {
    uploadSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.$message({
          showClose: true,
          message: res.messages,
          type: "success"
        });
        this.importFile = false;
        this.tableData = res.result;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].col = 1;
          if (i > 0) {
            if (
              this.tableData[i - 1].operation_type ==
              this.tableData[i].operation_type
            ) {
              let j = this.tableData.find(
                item => item.operation_type == this.tableData[i].operation_type
              );
              j.col += 1;
              this.tableData[i].col = 0;
            }
          }
        }
      } else {
        this.$message({
          showClose: true,
          message: res.messages,
          type: "error"
        });
      }
    },
    selectAll(val) {
      // console.log(val);
      let allValues = [];
      //保留所有值
      for (let item of this.houseList) {
        allValues.push(item.bldPrdID);
      }
      // 用来储存上一次的值，可以进行对比
      let oldVal = this.oldOptions.length === 1 ? [] : this.oldOptions[1];
      // console.log(oldVal);
      // 若是全部选择
      if (val.includes("选项0")) this.buildValue = allValues;
      // 取消全部选中  上次有 当前没有 表示取消全选
      if (oldVal.includes("选项0") && !val.includes("选项0"))
        this.buildValue = [];
      // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes("选项0") && val.includes("选项0")) {
        const index = val.indexOf("选项0");
        val.splice(index, 1); // 排除全选选项
        this.buildValue = val;
      }
      //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes("选项0") && !val.includes("选项0")) {
        if (val.length === allValues.length - 1)
          this.buildValue = ["选项0"].concat(val);
      }
      //储存当前最后的结果 作为下次的老数据
      this.oldOptions[1] = this.buildValue;
    },
    fileError(res, file, fileList) {
    },
    loadEtable() {
      this.changeHouse();
    },
    changeStage(val) {
    },
    reload(create=null) {
      let id = this.$route.query.plan_node_id;
      id = this.versions;

      if (this.$route.query.BOID) {
        id = this.$route.query.BOID;
      } else {
        getProjectStages({
          project_id: this.$route.query.project_id

        }).then(res => {
          if (res.result) {
            let stageList = [];
            stageList = res.result.map(item => {
              return Object.assign(
                {
                  buildingName: item.StageName,
                  bldPrdID: item.projectFID
                },
                item
              );
            });
            this.stageList = stageList;
          }
        });
      }
      let viewObj={
        plan_id: this.$route.query.plan_id,
        plan_node_id: id
      }
      if(create){
      viewObj.create="new"
      }
      viewBigPriceBuildData(viewObj).then(res => {
        this.tableData = res.result;
      });
    },
    changeHouse() {
      let nowProject = JSON.parse(localStorage.getItem("nowProject"))
        .nowProject;
      let project_id = this.$route.query.project_id;
      let checkedStage = this.$refs.stageList.getCheckedNodes();
      let stageValue = [];
      let buildValue = [];
      checkedStage.map(item => {
        if (item.parent) {
          buildValue.push(item.value);
        } else {
          stageValue.push(item.value);
        }
      });
      if (buildValue.length == 0 && stageValue.length == 0) {
        this.$message.warning("请选择楼栋");
        return;
      }

       let  projectData={
          project_name: nowProject,
          project_id: project_id
      };
      buildBigPriceExportTemplate({
        projectData:projectData,
        stageData:stageValue,
        buildData:buildValue
      }).then(res => {
        location.href=res.data.fileUrl;
      });
      this.dialogVisible = false;
    },
    update(isUpdate) {
      let id = this.$route.query.plan_node_id;
      id = this.actVersions;
      if (this.$route.query.BOID) {
        id = this.$route.query.BOID;
      }
      saveBigPriceBuildData({
        plan_node_id: id,
        project_id: this.$route.query.project_id,
        buildData: this.tableData
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
    }
  }
};
</script>

<style lang="less" scoped>
@tiTleFontSize: #666666; //拿地后表格Title字体颜色
@ContainerFontSize: #333333; //拿地后内容字体颜色
@import url("../../../assets/css/GlobalBtn.less");

.housePricing{
  background: #fff;
}
.btnBox {
  text-align: right;
  ::v-deep .el-button--primary {
    .primaryBtn(#fff, 500, 12px);
  }
}
#app .buildSelect {
  width: 50%;
}
::v-deep .el-upload-list {
  display: none;
}
.padding_10 {
  padding: 10px;
  p {
    height: 40px;
    line-height: 30px;
    font-weight: 700;
  }
}
::v-deep .el-table th,
.el-table tr {
  background: rgba(246, 248, 253, 1) !important;
}
::v-deep .is-leaf {
  color: @tiTleFontSize !important;
}
.blankBtn {
  .generalBtn(#333333, 500, 12px);
}
::v-deep .el-button--primary {
  .primaryBtn(#fff, 500, 12px);
}
</style>
