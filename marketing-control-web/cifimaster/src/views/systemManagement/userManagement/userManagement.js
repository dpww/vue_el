import { getUserMessage, getGroupList, updateUsers, deleteUsers } from "@/api/userManagement";
export default {
  name: 'menuAdministrator',
  data() {
    return {
      height: {
        height: ""
      },
      heightleft: {
        height: ""
      },
      // 新增菜单
      dialog: false,
      ////loading: true,
      ruleForm: {
        Status: 1,
        UserName: '',
        EmployeeCode: '',
        OfficeMail: '',
        Address: '',
        Gende: 0,
        RowNum: 0,
        Mobile: '',
        AccountType: 0,
        OrgType: '',
        ID: '',
        EmployeeName: '',
        OfficeTel: '',
        Password: '',
        PostCode: ''
      },
      // 编辑菜单
      editData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      editFormDialogTableVisible: false,
      editFormVisible: false,
      editForm: {
        loginUser: '',
        numberType: '',
        numberProperty: '',
        jobNumber: '',
        userName: ''
      },
      formLabelWidth: '110px',
      // 表格校验
      rules: {
        organisation: [
          { required: true, message: '', trigger: 'blur' }
        ],
        organisationName: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        abbreviation: [
          { type: 'date', required: true, message: '组织简称不能为空', trigger: 'change' }
        ],
        organizationType: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        sortSize: [
          { type: 'array', required: true, message: '排序号不能为空', trigger: 'change' }
        ]
      },
      // 左侧树状
      defaultExpandedKeys: [],
      treeData: [{
        label: '旭辉集团',
        children: [{
          label: '华东区域',
          children: [{
            label: '上海分公司',
            children: [{
              label: '上海事业部',
              children: [{
                label: '旭辉城',
                children: [{
                  label: '渠道团队',
                  children: [{
                    label: '内渠'
                  }]
                }]
              }]
            }]
          }]
        }, {
          label: '拓客管理',
          children: [{
            label: '拓客管理'
          }]
        }, {
          label: '案场管理',
          children: [{
            label: '案场管理'
          }]
        }]
      }],
      defaultProps: {
        children: 'children', // 结构
        label: 'orgName', // 标题
        value: 'id'
      },
      // 表格数据
      tableData: [{
        Status: 0,
        UserName: '',
        EmployeeCode: '',
        OfficeMail: '',
        Address: '',
        Gende: 0,
        RowNum: 0,
        Mobile: '',
        AccountType: 0,
        OrgType: '',
        ID: '',
        EmployeeName: '',
        OfficeTel: '',
        Password: ''
      }],
      // 分页
      currentPage1: 5,
      // 搜索框
      input1: '',
      orgId: '',
      authCompanyId: localStorage.getItem("AuthCompanyID"),
      key: '',
      currentPage: 1,
      pageSize: 10,
      count: 0,
      current: {},
      searchName: ''

    }
  },
  created() {
    this.hh();
    // 组织架构所有数据
    getGroupList({
      isNeedShow :"0"
    }).then(res => {
      console.log(res)
      this.treeData = res.result.content
      this.defaultExpandedKeys = [res.result.content[0].id] // 获取第一层的id
      console.log(this.treeData)
      getUserMessage({
        OrgID: res.result.content[0].id,
        //  AuthCompanyID: this.authCompanyId,
        Key: this.key,
        pageSize: this.pageSize,
        pageIndex: this.currentPage
      }).then(res => {
        console.log(res)
        this.tableData = res.result.list;
        this.count = res.result.total;
        //this.loading=false;
      })
    })

    // 获取用户数据

  },
  methods: {
    // 获取高度
    hh() {
      this.height.height = window.innerHeight - 142 + "px";
      this.heightleft.height = window.innerHeight - 206 + "px";
      console.log(this.height.height)
    },
    // 获取用户数据
    getUserMessage() {
      getUserMessage({
        OrgID: this.orgId,
        AuthCompanyID: this.authCompanyId,
        Key: this.key,
        pageSize: this.pageSize,
        pageIndex: this.currentPage
      }).then(res => {
        console.log("节点"+JSON.stringify(res));
        this.tableData = res.result.list;
        this.count = res.result.total;
        //this.loading=false;
      })
    },
    handleClose(done) {
      // this.$confirm('确定要提交表单吗？')
      //   .then(_ => {
      //     this.loading = true
      //     setTimeout(() => {
      //       this.loading = false
      //       done()
      //     }, 2000)
      //   })
      //   .catch(_ => {})
      this.dialog = false
    },
    handleNodeClick(data) {
      this.current = data;
      this.orgId = data.id;
      console.log(data.id);
      this.currentPage = 1;
      this.pageSize=10;
      this.getUserMessage();
    },
    // 编辑updateUsers,deleteUsers
    editClick(row) {
      console.log(row)
      this.editFormVisible = true
      this.ruleForm = row
    },
    submitChange() {
      console.log(this.ruleForm)
      updateUsers({
        data: this.ruleForm
      }).then(res => {
        this.editFormVisible = false
        this.$message('修改成功')
        this.orgId = row.UserOrgID
        this.getUserMessage()
        _paq.push(['trackEvent', '点击', '修改', '用户管理---修改用户信息'])
      })
    },
    // 删除
    delCurrent(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        deleteUsers({
          ID: row.ID
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })

          this.orgId = row.UserOrgID
          this.getUserMessage()
          _paq.push(['trackEvent', '点击', '删除', '用户管理---删除用户信息'])

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserMessage();
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserMessage();
      console.log(`当前页: ${val}`)
    },
    // 用户搜索
    userSearch() {
      this.loading=true
      this.key = this.searchName
      this.getUserMessage()
      _paq.push(['trackEvent', '点击', '搜索', '用户管理---搜索用户'])
    }, // 用户搜索
    clear() {
      this.loading=true
      this.key = this.searchName
      this.getUserMessage()
      _paq.push(['trackEvent', '点击', '搜索', '用户管理---搜索用户'])
    }
  }
}
