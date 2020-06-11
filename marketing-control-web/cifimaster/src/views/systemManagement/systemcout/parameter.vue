<template>
  <div class="app-container" >
    <div class="container-header">
      <!-- search -->
      <div class="search-top">
        <div class="search-top-left">
          <!-- <div>
            <span>岗位名称：</span>
            <input placeholder="岗位名称" />
          </div>
          <button>搜索</button>-->
        </div>
        <div class="search-top-right">
          <el-button
            type="primary"
            style="margin-left: 16px;"
            @click="drawer = true;formLabelAlign.value='系统级'"
          >+ {{ operatingStatus ? '新建参数' : '新建目录' }}
          </el-button>
        </div>
      </div>
      <!-- 搜索下边 -->

      <el-row :gutter="20" class="e-el-row" :style="height">
        <el-col :span="5" class="height-span">
          <div class="grid-content bg-purple bg-purple-left" :style="heightleft">
            <el-tree
              :data="data"
              :props="defaultProps"
              node-key="ID"
              @node-click="handleNodeClick"
              :highlight-current="highlight"
              :default-expanded-keys="defaultExpandedKeys"
            />
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple bg-purple-right">
            <el-table :data="tableData" class="etable" :style="heightleft">
              <!-- <el-table-column type="selection" width="55"></el-table-column> -->
              <!-- 排序号 -->
              <el-table-column label="排序号" width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.ListIndex }}</span>
                </template>
              </el-table-column>
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>名称: {{ scope.row.DictName }}</p>
                    <!-- <p>住址: {{ scope.row.address }}</p> -->
                    <div slot="reference" class="name-wrapper">
                      <!-- 显示的名字 -->
                      <el-tag size="medium">{{ scope.row.DictName }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <!-- 管理名称-->
              <el-table-column label="编码">
                <template slot-scope="scope">
                  <span>{{ scope.row.DictCode }}</span>
                </template>
              </el-table-column>
              <!-- 类型 -->
              <el-table-column v-if="operatingStatus" label="类型">
                <template slot-scope="scope">
                  <span>{{ scope.row.DictType==1 ? '值型业务字典' : (scope.row.DictType==2 ?'列型业务字典' :'树状型业务字典' ) }}</span>
                </template>
              </el-table-column>
              <!-- 参数级别 -->
              <el-table-column v-if="operatingStatus" label="参数级别">
                <template slot-scope="scope">
                  <span>{{ scope.row.DictionaryLevel==1 ? '系统级参数' : '项目级参数' }}</span>
                </template>
              </el-table-column>
              <!-- 内置 -->
              <el-table-column v-if="operatingStatus" label="内置">
                <template slot-scope="scope">
                  <span>{{ scope.row.IsReadOnly === 1 ? '是' : '否' }}</span>
                </template>
              </el-table-column>
              <!-- 管理名称-->
              <el-table-column label="备注">
                  <template slot-scope="scope">
                  <span>{{ scope.row.Remark }}</span>
                </template>
              </el-table-column>

              <!-- 操作 -->
              <el-table-column label="操作" width="100">

                <template slot-scope="scope" v-if="(scope.row.DictionaryLevel==1||scope.row.DictionaryLevel==2)&&scope.row.IsReadOnly == 0">

                  <i class="el-icon-edit"
                     @click="handleEdit(scope.$index, scope.row)"/>
                  <!-- <i
                    type="warning"
                    @click="handleProhibit(scope.$index, scope.row)"
                    class="el-icon-setting"
                  ></i>-->
                  <i
                    type="danger"
                     class="el-icon-delete"
                     @click="handleDelete(scope.$index, scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="page-submit">
            <!-- 保存取消 -->
            <div class="form-btn">
              <!-- <el-row>
            <el-button type="primary" @click="updateRule">保存</el-button>
            <el-button type="info" plain>取消</el-button>
              </el-row>-->
            </div>
            <!-- 分页 -->
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count"
              />
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 新增菜单 -->
      <el-drawer
        :title="operatingStatus ? '新建参数' : '新建目录'"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        @closed="handleConfig"
        class="input-drawer"
      >
        <el-form
          :rules="rules1"
          label-width="80px"
          ref="formLabelAlign"
          :model="formLabelAlign"
          class="demo-ruleForm"
        >

          <el-form-item label="名称" prop="DictName">
            <el-input v-model="formLabelAlign.DictName"/>
          </el-form-item>
          <el-form-item label="编码" prop="DictCode">
            <el-input v-model="formLabelAlign.DictCode"/>
          </el-form-item>
          <el-form-item v-if="operatingStatus" label="参数类型" prop="DictType">
            <el-select v-model="formLabelAlign.DictType" placeholder="请选择参数类型">
              <el-option v-for="item in paramsType" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
            <!--formLabelAlign.DictionaryLevel-->
         </el-form-item>

         <!-- <el-form-item v-if="operatingStatus" label="参数级别" prop="DictionaryLevel">
            <el-select v-model="" placeholder="请选择参数级别">
              <el-option v-for="item in dictionaryLevel" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>-->
          <el-form-item label="参数级别" v-if="operatingStatus" prop="DictionaryLevel">
            <el-input v-model="formLabelAlign.value" :disabled="true"/>
          </el-form-item>
          <el-form-item label="排序号">
            <el-input-number v-model="formLabelAlign.ListIndex"  :min="1" :max="100" label="排序号"></el-input-number>
          </el-form-item>
          <el-form-item v-if="operatingStatus" label="是否内置" prop="IsReadOnly">
            <el-select v-model="formLabelAlign.IsReadOnly" placeholder="请选择是否内置">
              <el-option v-for="item in isReadOnly" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formLabelAlign.Remark"/>
          </el-form-item>
        </el-form>
        <el-row class="el-row-btn-style">
          <el-button type="primary" @click="submitParam" plain>确定</el-button>
          <el-button plain @click="drawer = false">取消</el-button>
        </el-row>
      </el-drawer>

      <!-- 修改参数 -->
      <el-drawer

        :visible.sync="drawer1"
        :direction="direction"
        :before-close="handleClose"
        @closed="handleConfig"
        class="input-drawer"
      >
        <el-form
          ref="formLabelAlign"
          :rules="rules2"
          class="demo-ruleForm"
          label-width="80px"
          :model="formLabelAlign"
        >
          <el-form-item label="名称" prop="DictName">
            <el-input v-model="formLabelAlign.DictName"/>
          </el-form-item>
          <el-form-item label="编码" prop="DictCode">
            <el-input v-model="formLabelAlign.DictCode"/>
          </el-form-item>
          <el-form-item v-if="operatingStatus" label="参数类型">
            <!-- {{ typeof formLabelAlign.DictType}} -->
            <el-select v-model="formLabelAlign.DictType" placeholder="请选择参数类型">
              <el-option v-for="item in paramsType" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item v-if="operatingStatus" label="参数级别">
            <el-input v-model="formLabelAlign.value" :disabled="true"/>
          </el-form-item>
          <el-form-item label="排序号">
            <el-input-number v-model="formLabelAlign.ListIndex" :min="1" :max="99" label="排序号"></el-input-number>
          </el-form-item>
          <el-form-item v-if="operatingStatus" label="是否内置" prop="IsReadOnly">
            <el-select v-model="formLabelAlign.IsReadOnly" placeholder="请选择是否内置">
              <el-option v-for="item in isReadOnly" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formLabelAlign.Remark"/>
          </el-form-item>
        </el-form>
        <el-row style="margin-top:20px;width:80%;margin:auto;">
          <el-button type="primary" @click="modifyParam" plain>确定</el-button>
          <el-button plain @click="drawer1 = false">取消</el-button>
        </el-row>
      </el-drawer>
    </div>
  </div>
</template>

<script>
  import {getList} from "@/api/table";
  import {
    getSystemAllParams,
    saveSystemParam,
    modifySystemParam,
    modifySystemParamStatus,
    removeSystemParam,
    getSystemChildParams,
    getSystemTreeChildParams
  } from "@/api/parameter";

  export default {
    filters: {},
    data() {
      return {
        height: {
          height: ""
        },
        heightleft: {
          height: ""
        },
        /*
        DictName
         DictCode
         DictType
         DictionaryLevel
         */

        // 表格校验
        //loading: true,
        rules1: {
          DictName: [
            {required: true, message: "参数/目录 名称不能为空", trigger: "blur"}
          ],
          DictCode: [
            {required: true, message: "参数/目录编码不能为空", trigger: "blur"}
          ],
          DictType: [
            {required: true, message: "参数类型必选", trigger: "change"}
          ],
          DictionaryLevel: [
            {required: true, message: "参数级别不能为空", trigger: "change"}
          ],
          IsReadOnly: [
            {required: true, message: "是否内置必选", trigger: "change"}
          ]
        },


        // 表格校验
        rules2: {
          DictName: [
            {required: true, message: "参数/目录 名称不能为空", trigger: "blur"}
          ],
          DictCode: [
            {required: true, message: "参数/目录 编码不能为空", trigger: "blur"}
          ],
          IsReadOnly: [
            {required: true, message: "是否内置必选", trigger: "change"}
          ]
        },
        operatingStatus: 0,
        data: [],
        highlight: false,
        defaultProps: {
          children: 'Children',
          label: 'DictName',
          value: 'ID'
        },
        defaultExpandedKeys: [], // 默认展开二级菜单
        tableData: [
          {
            ListIndex: '',
            DictCode: '',
            DictName: '',
            ID: '',
            Remark: '',
            DictType: '',
            DictionaryLevel: '',
            IsReadOnly: ''
          }
        ],
        //   弹窗
        drawer: false,
        drawer1: false,
        direction: 'rtl',
        //   新增参数
        labelPosition: 'top',
        formLabelAlign: {
          ID: "",
          PID: "",
          ListIndex: 1,
          DictCode: "",
          DictName: "",
          DictType: 1,
          DictionaryLevel: 1,
          Levels: "",
          Remark: "",
          Status: "",
          IsReadOnly: 0,
          AuthCompanyID: "",
          ProductID: "",
          ProjectID: "",
          Creator: "",
          Editor: "",
          FullPath: "",
          value :"系统级"
        },
        // 表格校验
        rules: {
          name: [
            {required: true, message: "岗位名称不能为空", trigger: "blur"}
          ],
          jobCode: [
            {required: true, message: "岗位编码不能为空", trigger: "blur"}
          ],
          region: [
            {required: true, message: "岗位描述不能为空", trigger: "change"}
          ],
          /*type: [
            {required: true, message: "请输入项目", trigger: "change"}
          ],*/
        },


        paramsType: [
          {
            id: 1,
            name: '值类型'
          },
          {
            id: 2,
            name: '列表型'
          },
          {
            id: 3,
            name: '树状列表'
          }
        ],
        dictionaryLevel: [
          {
            id: 1,
            name: '系统级'
          },
          {
            id: 2,
            name: '项目级'
          }
        ],
        isReadOnly: [
          {
            id: 1,
            name: '是'
          },
          {
            id: 0,
            name: '否'
          }
        ],
        currentPage: 1,
        pageSize: 10,
        count: 0,
        authCompanyId: localStorage.getItem("AuthCompanyID"),
        productId: localStorage.getItem("ProductID"),
        projectId: localStorage.getItem("pojid"),
        userId: localStorage.getItem("id"),
        param: {},
        treenid: ''
      }
    },
    created() {
      this.hh();
      getSystemAllParams({
        authCompanyId: this.authCompanyId,
        productId: this.productId,
        projectId: this.projectId
      }).then(res => {
        console.log(res.result)
        const result = [
          {
            DictName: '系统参数管理',
            ID: '-1',
            Children: res.result,
            Level: -1
          }
        ];
        this.data = result;
        this.current = result[0];
        this.defaultExpandedKeys = [res.result[0].ID];
        this.getSystemChildParams();
        //this.loading=false;
      });
    },
    methods: {
      // 获取高度
      hh() {
        this.height.height = window.innerHeight - 144 + "px";
        this.heightleft.height = window.innerHeight - 206 + "px";
        console.log(this.height.height)
      },
      //获取子数据（非树形）
      getSystemChildParams() {
        getSystemChildParams({
          pid: this.current.ID,
          projectId: this.projectId,
          pageSize: this.pageSize,
          pageIndex: this.currentPage,
        }).then(res => {
          this.tableData = res.result.systemParams;
          this.count = res.result.count;
          this.formLabelAlign.value="系统级";
        });
      },
      getSystemParamsAll() {
        getSystemAllParams({
          authCompanyId: this.authCompanyId,
          productId: this.productId,
          projectId: this.projectId
        }).then(res => {
          console.log(res.result)
          const result = [
            {
              DictName: '系统参数管理',
              ID: '-1',
              Children: res.result,
              Level: -1
            }
          ];
          this.data = result;
          //this.current = result[0];
          this.highlight = true;
          this.formLabelAlign.value="系统级";
          this.getSystemChildParams();
          this.defaultExpandedKeys = [this.current.ID];
        });
      },


      //保存参数
      submitParam() {
        this.drawer = false;
        //this.loading=true;
        this.$refs.formLabelAlign.validate(valid => {
          if (valid) {
            // alert(this.treenid);
            saveSystemParam({
              PID: this.current.ID,
              ListIndex: this.formLabelAlign.ListIndex,
              DictCode: this.formLabelAlign.DictCode,
              DictName: this.formLabelAlign.DictName,
              DictType: 1,
              DictionaryLevel: 1,
              Levels: this.current.ID == "-1" ? "0" : "1",
              Remark: this.formLabelAlign.Remark,
              Status: '1',
              IsReadOnly: this.formLabelAlign.IsReadOnly,
              AuthCompanyID: this.authCompanyId,
              ProductID: this.productId,
              ProjectID: this.projectId,
              Creator: this.userId,
              Editor: this.userId
            }).then(res => {
              if (res.result > 0) {
                // 查询子集（非树形）
                this.currentPage = 1;
                this.getSystemParamsAll();
                //this.loading=false;
                _paq.push(['trackEvent', '点击', '新增', '参数管理---添加参数']);
              }
            })
          } else {
            return false;
          }
        })
      },

      //   tree左侧树形
      handleNodeClick(data) {
        console.log(data);
        this.operatingStatus = data.Level === -1 ? 0 : 1;
        this.current = data;
        this.currentPage = 1;
        this.getSystemChildParams();
        this.formLabelAlign.value="系统级";

      },
      // 弹窗关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      handleConfig() {
        this.formLabelAlign = {
          ID: "",
          PID: "",
          ListIndex: "",
          DictCode: "",
          DictName: "",
          DictType: 1,
          DictionaryLevel: 1,
          Levels: "",
          Remark: "",
          Status: "",
          IsReadOnly: 0,
          AuthCompanyID: "",
          ProductID: "",
          ProjectID: "",
          Creator: "",
          Editor: "",
          FullPath: ""
        }
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getSystemChildParams();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getSystemChildParams();
        console.log(`当前页: ${val}`);
      },

      // 修改参数
      handleEdit(index, row) {
        this.drawer1 = true
        this.formLabelAlign = row
        this.formLabelAlign.value="系统级"
        console.log(index, row)
      },
      modifyParam() {
        // alert(this.formLabelAlign.ID)
        this.$refs.formLabelAlign.validate(valid => {
          if (valid) {
            modifySystemParam({
              ID: this.formLabelAlign.ID,
              FullPath: this.formLabelAlign.ListIndex,
              ListIndex: this.formLabelAlign.ListIndex,
              DictCode: this.formLabelAlign.DictCode,
              DictName: this.formLabelAlign.DictName,
              DictType: this.formLabelAlign.DictType,
              DictionaryLevel: 1,
              Remark: this.formLabelAlign.Remark,
              IsReadOnly: this.formLabelAlign.IsReadOnly,
              ProjectID: this.projectId,
              Editor: this.userId
            }).then(res => {
              this.drawer1 = false;
              // 查询子集（非树形）
              this.getSystemChildParams();
            });
          } else {
            return false;
          }
        })
      },


      handleDelete(index, row) {
        this.$confirm('您确定要删除吗 ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          removeSystemParam({
            ID: row.ID
          }).then(res => {
            // 查询子集（非树形）
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            _paq.push(['trackEvent', '点击', '删除', '参数管理---删除参数']);
            this.getSystemParamsAll();
            this.formLabelAlign.value="系统级";
          });
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleProhibit(index, row) {
        console.log(index)
        console.log(row)
        var tableList = this.tableData
        tableList[index].state = '禁用'
      }
    }
  }
</script>
<style scoped>
  .el-row-btn-style {
    margin-top: 20px;
    width: 80%;
    margin: auto;
    margin-left: 10% !important;
  }

  .eatable {
    border: 1px solid #f0f0f0;
  }

  .el-button--primary.is-plain {
    color: #fff !important;
  }
</style>
<style src="@/assets/css/generalpost.less" lang="less" scoped>
</style>

