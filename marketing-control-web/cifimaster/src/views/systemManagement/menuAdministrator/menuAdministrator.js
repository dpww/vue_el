export default {
  name: 'menuAdministrator',
  data() {
    return {
      // 新增菜单
      dialog: false,
      //loading: false,
      addRuleForm: {
        showName: '',
        guanLiName: '',
        menuLink: '',
        imgLink: '',
        iconStyle: '',
        sortNumber: '',
        ifShow: '',
        ifDefault: '',
        ifMenu: '',
        state: ''
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
        showName1: '',
        guanLiName1: '',
        menuLink1: '',
        imgLink1: '',
        iconStyle1: '',
        sortNumber1: '',
        ifShow1: '',
        ifDefault1: '',
        ifMenu1: '',
        state1: ''
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
      data: [{
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
        }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 表格数据
      tableData: [{
        name: '内渠',
        abbreviation: '内渠',
        organisation: '渠道团队',
        sequence: '1',
        state: '启用',
        ifDele: '否'
      }],
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
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
      console.log(data)
    },
    // 编辑
    editClick(row) {
      console.log(row)
      this.editFormVisible = true
    },
    // 删除
    delCurrent() {
      this.$confirm('此操作将永久删除该组织, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
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
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
