<template>
  <div class="agencyApply">
    <div class="header">
      <checkProject :mainData="mainData"></checkProject>
      <div>
        <el-form :inline="true" v-model="mainData.applyForm">
          <el-form-item>
            <div class="searchInput">
              <el-input
                placeholder="请输入"
                v-model="mainData.applyForm.applyVal"
                class="input-with-select"
              >
                <el-button class="searchIcon" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item label="立项状态" prop="status">
            <el-select class="applyStatus" v-model="mainData.applyForm.status" placeholder="请选择">
              <el-option
                v-for="item in mainData.applyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button>导出</el-button>
            <el-button type="primary">政策申请</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="title">中介政策申请</div>
       <el-table
        ref="applyTable"
        :data="mainData.applyTable"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
        >

        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="name" label="政策编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project" label="政策名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="审批单编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="审批状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="申请人" show-overflow-tooltip></el-table-column>
        <el-table-column  label="操作" width="500" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" >查看</el-button>
            <el-button type="text" >编辑</el-button>
            <el-button type="text" >删除</el-button>
            <el-button type="text" >启用</el-button>
            <el-button type="text" >禁用</el-button>
            <el-button type="text" >发起审批</el-button>
          </template>
        </el-table-column>
      </el-table>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="mainData.currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mainData.pageTotal">
    </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  components: {
    // 项目切换组件
    checkProject: () => import("@/views/brokerage/components/checkProject")
  },
  data() {
    return {
      //公用数据
      mainData: {
        //当前页数
        currentPage: 1,
        //分页总数
        pageTotal: 400,
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
        ],
        //立项状态选项option
        applyOptions: [
          {
            value: "全部",
            label: "全部"
          },
          {
            value: "其他",
            label: "其他"
          }
        ],
        //立项状态
        applyForm: {
          applyVal: "",
          status: ""
        },
        //政策申请数据表格
        applyTable:[
            {
            name: "江苏区域集团",
            project: "南京璟悦名邸",
            address: "数据"
          },
          {
            name: "江苏区域集团",
            project: "南京璟悦名邸",
            address: "数据"
          },
          {
            name: "江苏区域集团",
            project: "南京璟悦名邸",
            address: "数据"
          },
          {
            name: "江苏区域集团",
            project: "南京璟悦名邸",
            address: "数据"
          },
          {
            name: "江苏区域集团",
            project: "南京璟悦名邸",
            address: "数据"
          },
          {
            name: "江苏区域集团",
            project: "南京璟悦名邸",
            address: "数据"
          }
        ]
      }
    };
  },
  methods: {
    //渲染当前页面
    reload() {},
     // 分页个数改变
    pageSizeChange(val){
      console.log(`每页 ${val} 条`);
    },
    //切换分页
    currentPageChange(val){
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    this.reload();
  }
};
</script>

<style lang="less" scoped>
.agencyApply {
  background-color: #f5f5f5;
  height: calc(100vh - 40px);
  .header {
    display: flex;
    > div:first-child {
      width: 250px;
    }
    > div:last-child {
      padding: 0 20px 0 0;
      flex: 1;
      height: 60px;
      line-height: 60px;
      background-color: #fff;
      .el-form {
        height: 60px;
        line-height: 60px;
        text-align: right;
        ::v-deep .el-form-item {
          height: 60px;
          line-height: 60px;
          .el-form-item__content {
            height: 60px;
            line-height: 60px;
            .applyStatus{
              .el-input__inner{
                width: 132px;
              }
            }
            > .el-button {
              height: 30px;
              width: 75px;
            }
          }
        }
      }
      .searchInput {
        width: 210px;
        height: 60px;
        line-height: 60px;
        margin-top: 15px;
        .searchIcon {
          height: 30px;
          width: 35px;
          background-color: #ebebeb;
          padding: 0;
          text-align: center;
          box-sizing: border-box;
        }
        ::v-deep .el-input-group__append {
          height: 30px;
          width: 35px;
          padding: 0;
        }
        ::v-deep .el-input-group__append .el-button {
          margin: 0;
        }
        ::v-deep .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
        ::v-deep .el-icon-search {
          margin: 0;
          color: #999;
        }
      }
    }
  }
  .content{
    background: #fff;
    margin: 10px;
    padding: 0 15px 95px;
    border-radius: 6px;
    .title{
      height: 45px;
      line-height: 45px;
      color: #333;
      font-weight: 700;
      font-size: 14px;
    }
  }
   .el-pagination{
      text-align: right;
    }
}
</style>
