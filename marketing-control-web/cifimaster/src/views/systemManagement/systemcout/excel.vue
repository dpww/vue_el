<template>
  <div class="app-container">
    <div class="container-header">
      <!-- search -->




      <div class="e-el-row" :style="height">
       <!-- <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-table
                ref="postTable"
                :data="tableData"
                class="etable postTable"
                @select="handleSelected"
                :style="heightleft"
              >
                &lt;!&ndash; 岗位描述 &ndash;&gt;
                <el-table-column label="序号">
                  <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="交易渠道">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sourceTypeDesc }}</span>
                  </template>
                </el-table-column>
                &lt;!&ndash; 岗位描述 &ndash;&gt;
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    <span>{{ scope.row.customerName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="性别">
                  <template slot-scope="scope">
                    <span>{{ scope.row.customerGender }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    <span>{{ scope.row.customerName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="电话">
                  <template slot-scope="scope">
                    <span>{{ scope.row.customerMobile }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="项目名">
                  <template slot-scope="scope">
                    <span>{{ scope.row.projectName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="业务员">
                  <template slot-scope="scope">
                    <span>{{ scope.row.userName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="报备时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.reportCreateTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="到访时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.visitDate }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="报备人OA账号">
                  <template slot-scope="scope">
                    <span>{{ scope.row.reportUserName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="中介公司">
                  <template slot-scope="scope">
                    <span>{{ scope.row.companyName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="媒体大类">
                  <template slot-scope="scope">
                    <span>{{ scope.row.mainMediaName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="媒体子类">
                  <template slot-scope="scope">
                    <span>{{ scope.row.subMediaName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="年龄段">
                  <template slot-scope="scope">
                    <span>{{ scope.row.ageGroup }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="工作区域">
                  <template slot-scope="scope">
                    <span>{{ scope.row.workAreaDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="所属行业">
                  <template slot-scope="scope">
                    <span>{{ scope.row.belongIndustriseDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="生活区域">
                  <template slot-scope="scope">
                    <span>{{ scope.row.lifeAreaDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="家庭结构">
                  <template slot-scope="scope">
                    <span>{{ scope.row.familyStructureDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="家庭收入">
                  <template slot-scope="scope">
                    <span>{{ scope.row.familyIncomeDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="置业目的">
                  <template slot-scope="scope">
                    <span>{{ scope.row.purchasePurposeDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="置业次数">
                  <template slot-scope="scope">
                    <span>{{ scope.row.homeNumDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="现居住房型">
                  <template slot-scope="scope">
                    <span>{{ scope.row. currentHouseTypeDesc}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="意向面积">
                  <template slot-scope="scope">
                    <span>{{ scope.row. intentionalAreaDesc}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="接受单价">
                  <template slot-scope="scope">
                    <span>{{ scope.row.acceptPriceDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="接受总价">
                  <template slot-scope="scope">
                    <span>{{ scope.row.acceptTotalPriceDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="是否具备购房资格">
                  <template slot-scope="scope">
                    <span>{{ scope.row.qualifications }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="证件类型">
                  <template slot-scope="scope">
                    <span>{{ scope.row.cardTypeDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="证件号码">
                  <template slot-scope="scope">
                    <span>{{ scope.row.cardNum }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="买点">
                  <template slot-scope="scope">
                    <span>{{ scope.row.buyPointDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="抗性">
                  <template slot-scope="scope">
                    <span>{{ scope.row.resistanceDesc }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="备注">
                  <template slot-scope="scope">
                    <span>{{ scope.row.remarks }}</span>
                  </template>
                </el-table-column>
                &lt;!&ndash; 状态 &ndash;&gt;
               &lt;!&ndash; <el-table-column label="状态" width="60">
                  <template slot-scope="scope">
                    <span>{{ scope.row.status==true?'启用':'禁用' }}</span>
                  </template>
                </el-table-column>&ndash;&gt;
                &lt;!&ndash; 操作 &ndash;&gt;
     &lt;!&ndash;           <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" />
                    <i
                      type="warning"
                      class="el-icon-setting"
                      @click="handleProhibit(scope.$index, scope.row)"
                    />
                    <i
                      type="danger"
                      class="el-icon-delete"
                      @click="handleDelete(scope.$index, scope.row)"
                    />
                  </template>
                </el-table-column>&ndash;&gt;
              </el-table>
            </div>
          </el-col>
        </el-row>-->
        <div>
          <h1>历史数据导入</h1><br><br>
          <h3>第一步上传需要导入的Excel文件</h3><br><br>
        <el-upload class="upload-demo" :action="updateUrl" :on-preview="handlePreview" :on-success="getData"
                   :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
          <el-button size="small" type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="openFullScreen">点击上传</el-button>
        </el-upload>

        <div class="search-top-right" style="position: absolute;top: 30%">
          <h3>第二步把数据导入业务表生成线索、机会、客户等等</h3><br><br>
          <el-button
            type="primary"
            style="padding:10px 20px;height:36px;"
            @click="sureImport" v-loading.fullscreen.lock="fullscreenLoading"
          >确认导入</el-button>

        </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { getAllVistData,importBizTable} from "@/api/jobAuthorization";
  export default {
    filters: {},
    data() {
      return {
        loading:null,
        updateUrl: process.env.VUE_APP_IMPORT_API,
        fullscreenLoading: false,
        heightleft:{
          height:''
        },
        height:{
          height:''
        },
        // 列表
        tableData: []
      };
    },
    created() {
      //this.getCommonJobs();
      this.hh()
    },
    methods: {

      // 获取高度
      hh() {
        this.height.height = window.innerHeight - 144 + "px";
        this.heightleft.height = window.innerHeight - 206 + "px";
        console.log(this.height.height)
      },
      openFullScreen() {
        this.fullscreenLoading = true;
      },
      openFullScreen() {
        this.loading = this.$loading({
          lock: true,
          text: '导入数据中！可能需要一段时间，请勿关闭页面！',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      //确认导入
      sureImport(){
        this.loading = this.$loading({
          lock: true,
          text: '导入数据中！可能需要一段时间，请勿关闭页面！',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
       // this.fullscreenLoading = true;
        this.importBizTable();
      },
      //解析excel
      getData(response, file, fileList){
        if(JSON.stringify(response.data).length===2){
          this.$message({
            type: "success",
            message: "导入成功!"
          });
        }else{
          alert(JSON.stringify(response.data))
        }
        //this.getAllVistData();
        this.fullscreenLoading = false;
        this.loading.close();
      },
      importBizTable() {
        importBizTable({
        }).then(res => {
          if(JSON.stringify(res.data).length===2){
            this.$message({
              type: "success",
              message: "导入成功!"
            });
          }else{
            alert(JSON.stringify(res.data))
          }
          this.fullscreenLoading = false;
          this.loading.close();
        });
      }

    }
  };
</script>
<style scoped>
  el-form-item__label {
    font-weight: normal;
  }
</style>
<style src="@/assets/css/generalpost.less" lang="less" scoped>
</style>
<style lang="less" scoped>
  .postTable thead {
    tr > th:first-child {
      .el-checkbox {
        display: none;
      }
    }
  }
</style>
