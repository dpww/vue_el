import {
  getAllOrg,
  getJobByAuthId,
  getAllCommonJob,
  getGroupList,
  getSystemUserList,
  saveSystemJobForManagement,
  getSystemJobAllList,
  removeSystemJobByUserId,
  modifySystemJobByUserId,
  pullinUser,
  saveSystemUser,
  removeSystemJobUserRel,
  modifySystemJobUserRel,
  saveSystemJobUserRel,
  getAllMenus,
  saveJobMenus,
  getReportForm,
  seveReportForm,
  getDATA__Form,
  seveDATA__Form
} from '@/api/jobAuthorization'

const cityOptions = ['渠道管理', '案场管理', '基础数据', '系统管理']
export default {
  name: 'Group',
  filters: {},
  data() {
    return {
      height: {
        height: ""
      },
      heightleft: {
        height: ""
      },
      heightlefttable: {
        height: ""
      },


      // 新增组织
      dialog: false,
      //loading: true,
      current: {},
      authCompanyId: localStorage.getItem("AuthCompanyID"),
      productId: localStorage.getItem("ProductID"),
      projectId: localStorage.getItem("pojid"),
      userId: localStorage.getItem("id"),
      orgId: localStorage.getItem("JobOrgID"),
      pid: '',
      jobName: '',
      addForm: {
        ID: '',
        JobCode: '',
        JobName: '',
        JobDesc: '',
        JobPID: '',
        CommonJobID: '',
        JobOrgID: '',
        AuthCompanyID: '',
        ProductID: '',
        Creator: '',
        Editor: '',
        Status: "1"
      },
      // 所属组织
      jobOrgList: [{
        ID: '',
        OrgName: ''
      }],
      // 通用岗位
      commonJobList: [{
        ID: '',
        JobDesc: ''
      }],
      // 上级岗位
      topJobList: [{
        ID: '',
        JobDesc: ''
      }],
      // 新增组织
      optTitle: '',
      formLabelWidth: '120px',
      // 新增岗位校验
      gangWeiRules: {
        JobName: [
          {required: true, message: '请输入岗位名称', trigger: 'blur'}
        ],

        CommonJobID: [
          {required: true, message: '请选择通用岗位', trigger: 'change'}
        ],
        /*     JobPID: [
                 { required: true, message: '请选择上级岗位', trigger: 'change' }
             ],*/
        Status: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ]
      },
      // 新增用户校验
      userRules: {
        UserName: [
          {required: true, message: '请输入用户名', trigger: 'change'}
        ],
        AccountType: [
          {required: true, message: '请选择账号类型', trigger: 'change'}
        ],
        EmployeeCode: [
          {required: true, message: '请输入工号', trigger: 'change'}
        ],
        EmployeeName: [
          {required: true, message: '请输入姓名', trigger: 'change'}
        ],
        Gender: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],

        Status: [
          {required: true, message: '请选择账号类型', trigger: 'change'}
        ]
      },
      // 左侧树状
      data: [],
      b: false,
      defaultExpandedKeys: [],
      defaultProps: {
        children: 'children', // 结构
        label: 'orgName' // 标题
      },
      // 当前选中岗位
      jobId: '',
      // 表格数据
      postTableData: [{
        CommonJobName: '',
        JobName: '',
        Status: '',
        ID: ''
      }],
      isRead: false,
      // 分页
      currentPage: 1,
      UsercurrentPage: 1,
      UsertotalCount: 0,
      UserPageSize: 10,
      pageSize: 10,
      totalCount: 0,
      count: 0,
      // 用户表单
      UserData: [],
      searchName: '',
      // 新增用户
      userDialog: false,
      addUserForm: {
        AccountType: 2,
        Status: "1",

      },
      orgIds: "",
      userTitle: '',

      // 引入用户
      importUserDialog: false,
      input: '',
      input1: '',
      userTableData: [],
      multipleSelection: [],
      // 功能授权
      functionDrawer: false,
      functionData: [],
      defaultCheckeds: [],
      functionDefaultProps: {
        children: 'children',
        label: 'NAME'
      },
      id: '',
       //报表授权
      formDrawer:false,
      formData:[],
      formDefaultCheckeds:[],
      formDefaultProps:{
        children: 'children',
        label: 'title'
      },
      dataDrawer:false,
      dataDefaultCheckeds:[],
      dataDefaultProps:{
        children: 'children',
        label: 'name'
      },
      DataList:[],
      DataListchecked:[],
      allmenuList:[]

    }
  },

  // 初始化获取指定岗位，
  created() {
    this.hh();
    // 组织架构所有数据
    getGroupList({
      AuthCompanyID: this.authCompanyId,
      ProductID: this.productId,
      OrgID: this.orgId,
      PID: this.pid,
      isNeedShow: "0"
    }).then(res => {
      this.data = res.result.content
      this.defaultExpandedKeys = [res.result.content[0].id] // 获取第一层的id
      this.tableData = res.result.content[0].children
      this.current = res.result.content[0]
      this.orgIds = res.result.content[0].id

      /* this.$nextTick(function() {
         this.filterChange();
         this.this.b=false;
       })*/
      this.loading = false;
    })
    // 获取通用岗位
    this.getAllCommonJob()
    // 获取指定岗位
    getJobByAuthId({
      AuthCompanyID: this.authCompanyId,
      ProductID: this.productId,
      OrgID: this.orgId,
      pageSize: this.pageSize,
      pageNum: this.currentPage
    }).then(res => {
      this.postTableData = res.result.list;
      this.totalCount = res.result.total;
    })
  },
  methods: {
  	/* 获取所有报表*/
    getReportForm(id){
      getReportForm({jobId:id}).then(res=>{
        this.formData=res.data.content;
        this.formDefaultCheckeds = res.data.jobRelMenu.map(res => res.ID);
      });
    },
    /*保存报表授权*/
    seveReportForm(){
      seveReportForm({jobId:this.id,reportIdList:this.$refs.formTree.getCheckedNodes().map(res => res.ID)}).then(res=>{
        this.formDrawer=false;
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
        _paq.push(['trackEvent', '点击', '保存', '保存报表授权']);
      })
    },
    getJobByAuthId() {
      getJobByAuthId({
        AuthCompanyID: this.authCompanyId,
        ProductID: this.productId,
        OrgID: this.orgId,
        pageSize: this.pageSize,
        pageNum: this.currentPage
      }).then(res => {
        this.postTableData = res.result.list
        console.log(res.result.list)
        this.jobId = "";
      })
    },
    // 获取高度
    hh() {
      this.height.height = window.innerHeight - 75 + "px";
      this.heightleft.height = window.innerHeight - 102 + "px";
      this.heightlefttable.height = window.innerHeight *0.38 + "px";
      // console.log(this.height.height)
    },
    searchUser() {
      this.pullinUser();
    },
    filterData: function (value, data, node) {
      return data.status == value;
    },
    filterChange: function () {
      // 这里每当输入的数据有变化就触发原生的过滤节点这个函数
      this.$refs.tree2.filter(1);
    },
    // 删除人员
    delCurrentUserData(row) {
      this.$confirm('此操作将永久删除该组织, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeSystemJobUserRel({
          JobID: this.id,
          UserID: row.ID
        }).then(res => {
          if (res.result > 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            _paq.push(['trackEvent', '点击', '删除', '删除人员'])

            this.getSystemUserLists();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改岗位信息
    // modifyJobInfo() {
    //   console.log(this.addForm.ID)
    //   modifySystemJobByUserId({
    //     ID: this.addForm.ID,
    //     JobCode: this.addForm.JobName,
    //     JobName: this.addForm.JobName,
    //     JobDesc: this.addForm.JobDesc,
    //     JobPID: this.addForm.JobPID,
    //     CommonJobID: this.addForm.CommonJobID,
    //     JobOrgID: this.addForm.JobOrgID,
    //     AuthCompanyID: this.authCompanyId,
    //     ProductID: this.productId,
    //     Creator: this.userId,
    //     Editor: this.userId,
    //     Status: this.addForm.Status
    //   })
    //     .then(res => {
    //       this.dialog = false
    //       // 获取指定岗位
    //       getJobByAuthId({
    //         AuthCompanyID: this.authCompanyId,
    //         ProductID: this.productId,
    //         OrgID: this.addForm.JobOrgID
    //       }).then(res => {
    //         this.postTableData = res.result.list
    //         console.log(res.result.list)
    //       })
    //     })
    // },
    // 查询所有的组织结构
    getAllOrg(id) {
      getAllOrg({
        AuthCompanyID: this.authCompanyId,
        ProductID: this.productId,
        OrgID: id || this.current.id,
        PID: this.pid
      }).then(res => {
        this.jobOrgList = res.result
        this.addForm.JobOrgID = this.orgIds;
      })
    },
    // 查询上级岗位
    getSystemJobAllList() {
      getSystemJobAllList({
        AuthCompanyID: this.authCompanyId,
        ProductID: this.productId,
        OrgID: this.current.id
      }).then(res => {
        console.log(res)
        this.topJobList = res.result
      })
    },
    // 查询通用岗位
    getAllCommonJob() {
      getAllCommonJob({
        AuthCompanyID: this.authCompanyId,
        ProductID: this.productId,
        JobName: this.jobName
      }).then(res => {
        this.commonJobList = res.result
        this
        console.log(res)
        _paq.push(['trackEvent', '点击', '查询', '查询通用岗位'])

      })
    },
    getChildren(data){
      for(let i=0;i<data.length;i++){
        if(data[i].children.length>0){
        // this.allmenuList.push(data[i].ID)
        this.getChildren(data[i].children)
        }else{
          this.allmenuList.push(data[i].ID)
      }
    }
    return this.allmenuList
    },
    // 获取所有菜单
    getAllMenus(data) {
      let checkedarr=[]
      getAllMenus({
        jobId: data
      }).then(res => {
        console.log(res.data)
        this.functionData = res.data.content;
        let C_arr=res.data.jobRelMenu.map(item=>item.ID)
        let all_id=this.getChildren([res.data.content[0]])
        console.log(all_id,11111111111111111111111);
        C_arr.forEach(item=>{
          if(all_id.findIndex(idx=>idx===item)!=-1){
            checkedarr.push(item)
          }
        })

        console.log(checkedarr);

        this.defaultCheckeds = checkedarr
      })
    },
    // 显示编辑岗位弹框
    editClick(row) {
      console.log(row)
      this.addForm = Object.assign({}, row)
      this.optTitle = '编辑岗位'
      this.getAllOrg(row.id)
      this.getSystemJobAllList()
      this.dialog = true
    },
    handleClear1() {
      if (!this.$refs.addForm) return;
      this.$refs.addForm.clearValidate(); // 移除该表单项的的校验结果
      this.$refs.addForm.resetFields(); // 对表单项 进行重置
    },
    handleClearUser() {
      if (!this.$refs.addUserForm) return;
      this.$refs.addUserForm.clearValidate(); // 移除该表单项的的校验结果
      this.$refs.addUserForm.resetFields(); // 对表单项 进行重置
    },
    // 新增岗位
    addHandler() {
      console.log(this.current)
      this.addForm = {Status: "1"}
      this.optTitle = '新增岗位'
      this.getAllOrg()
      this.getSystemUserLists();
      this.dialog = true
    },
    // 新增岗位
    saveJobInformation() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.optTitle === '新增岗位') {
            // 新增岗位
            saveSystemJobForManagement({
              JobCode: this.addForm.JobName,
              JobName: this.addForm.JobName,
              JobDesc: this.addForm.JobDesc,
              JobPID: this.addForm.JobPID,
              CommonJobID: this.addForm.CommonJobID,
              JobOrgID: this.addForm.JobOrgID,
              AuthCompanyID: this.authCompanyId,
              ProductID: this.productId,
              Creator: this.userId,
              Editor: this.userId,
              Status: this.addForm.Status
            }).then(res => {
              this.dialog = false;
              _paq.push(['trackEvent', '点击', '新增', '新增岗位']);
              // 获取指定岗位
              getJobByAuthId({
                AuthCompanyID: this.authCompanyId,
                ProductID: this.productId,
                OrgID: this.addForm.JobOrgID,
                pageSize: this.pageSize,
                pageNum: this.currentPage
              }).then(res => {
                this.postTableData = res.result.list;
                this.UserData = "";
                this.totalCount = res.result.total;
                this.jobId = "";
              })
            })
          } else {
            // 修改岗位信息
            // this.modifyJobInfo()
            modifySystemJobByUserId({
              ID: this.addForm.ID,
              JobCode: this.addForm.JobName,
              JobName: this.addForm.JobName,
              JobDesc: this.addForm.JobDesc,
              JobPID: this.addForm.JobPID,
              CommonJobID: this.addForm.CommonJobID,
              JobOrgID: this.addForm.JobOrgID,
              AuthCompanyID: this.authCompanyId,
              ProductID: this.productId,
              Creator: this.userId,
              Editor: this.userId,
              Status: this.addForm.Status
            })
              .then(res => {
                this.dialog = false
                _paq.push(['trackEvent', '点击', '编辑', '修改岗位信息'])

                // 获取指定岗位
                getJobByAuthId({
                  AuthCompanyID: this.authCompanyId,
                  ProductID: this.productId,
                  OrgID: this.addForm.JobOrgID,
                  pageSize: this.pageSize,
                  pageNum: this.currentPage
                }).then(res => {
                  this.postTableData = res.result.list
                  this.totalCount = res.result.total;
                })
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取岗位下的人员
    handleSelected(_list, item) {
      console.log(item)
      this.id = item.ID
      console.log(_list)
      var bol = !!_list.length
      this.$refs.postTable.clearSelection()
      this.$refs.postTable.toggleRowSelection(item, bol)
      if (bol) {
        this.jobId = item.ID
        this.getSystemUserLists();
      } else {
        this.jobId = ''
        this.UserData = []
      }
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
      this.current = data
      this.orgId = data.id
      this.orgIds = data.id
      console.log(data.id)
      // 获取指定岗位
      getJobByAuthId({
        AuthCompanyID: this.authCompanyId,
        ProductID: this.productId,
        OrgID: this.orgId,
        pageSize: this.pageSize,
        pageNum: this.currentPage
      }).then(res => {
        //分页
        this.postTableData = res.result.list;
        this.totalCount = res.result.total;
        this.UserData = [];
        this.jobId = "";
      })
    },
    // 删除
    delCurrent(row) {
      console.log(row.JobOrgID)
      this.$confirm('此操作将永久删除该组织, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeSystemJobByUserId({
          ID: row.ID
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          _paq.push(['trackEvent', '点击', '删除', '删除用户'])
          // 获取指定岗位
          getJobByAuthId({
            AuthCompanyID: this.authCompanyId,
            ProductID: this.productId,
            OrgID: row.JobOrgID,
            pageSize: this.pageSize,
            pageNum: this.currentPage
          }).then(res => {
            this.postTableData = res.result.list
            console.log(res.result.list)
          })
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
      this.pageSize = val
      //this.getCommonJobs()
      this.getJobByAuthId()
      this.pullinUser();

      // 获取指定岗位
      // getJobByAuthId({
      //   AuthCompanyID: this.authCompanyId,
      //   ProductID: this.productId,
      //   OrgID: this.addForm.JobOrgID
      // }).then(res => {
      //   this.postTableData = res.result.list
      //   console.log(res.result.list)
      // })
    },
    handleCurrentChange(val) {

      console.log(`当前页: ${val}`)
      this.currentPage = val
      //this.getCommonJobs()
      this.getJobByAuthId()
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    // 用户搜索
    userSearch() {
      this.UserPageSize = 10;
      this.UsercurrentPage = 1;
      this.getSystemUserLists();
      _paq.push(['trackEvent', '点击', '搜索', '用户搜索']);
    },
    // 用户搜索
    clear() {
      this.UserPageSize = 10;
      this.UsercurrentPage = 1;
      this.getSystemUserLists();
      _paq.push(['trackEvent', '点击', '搜索', '用户搜索']);
    },
    // 显示新增用户框
    addUserShow(row) {
      this.userTitle = '新增用户'
      this.getAllOrg(row.id)
      this.getSystemJobAllList()
      this.addUserForm = {
        AccountType: 2,
        Status: 1,
        Gender: 1
      }
      if (!this.jobId) {
        this.$alert('请选择岗位', {
          confirmButtonText: '确定'
        })
      } else {
        this.userDialog = true
        //this.pullinUser()
      }
    },
    // 显示编辑用户框
    editClickUserData(row) {
      this.addUserForm = Object.assign({}, row)
      this.userTitle = '编辑用户'
      this.getAllOrg(row.id)
      this.getSystemJobAllList()
      this.userDialog = true;
    },
    // 新增用户和编辑用户
    addUser() {
      this.$refs.userDrawer.validate((valid) => {
        if (valid) {
          this.userDialog = false
          this.loading = true
          if (this.userTitle === '新增用户') {
            // 新增用户
            saveSystemJobUserRel({
              data: this.addUserForm,
              authCompanyId: this.authCompanyId,
              productId: this.productId,
              orgId: this.orgId,
              userId: this.userId,
              jobId: this.id
            }).then(res => {
              if (res.result == 0) {
                this.$message('保存成功')
                this.userDialog = false

                this.getSystemUserLists();
                this.loading = false;
                _paq.push(['trackEvent', '点击', '保存', '新增用户'])
              } else if (res.result == 1001) {
                this.$message('该账号已关联此岗位！')
              }
            })
          } else {
            // 编辑用户信息
            modifySystemJobUserRel({
              data: this.addUserForm
            }).then(res => {
              if (res.result > 0) {
                this.$message('保存成功')
                this.userDialog = false
                this.getSystemUserLists();
                this.loading = false;
                _paq.push(['trackEvent', '点击', '编辑', '编辑用户'])
              }
            })
          }
        } else {
          return false
        }
      })
    },

    // 保存引入用户
    saveIntroducingUser() {
      this.isRead = true;
      if (this.multipleSelection == null || this.multipleSelection == "") {
        this.$message({
          type: 'success',
          message: '请选择用户!'
        })
        this.importUserDialog = true;
      } else {
        this.loading = true
        saveSystemUser({
          authCompanyId: this.authCompanyId,
          productId: this.productId,
          orgId: this.orgId,
          userId: this.userId,
          data: this.multipleSelection,
          jobId: this.id
        }).then(res => {
          if (res.result == 1001) {
            this.$message('该账号已经关联此岗位！')
            this.getSystemUserLists();
            this.loading = false;
          } else if (res.result == 0) {
            this.$message({
              type: 'success',
              message: '引入成功！'
            })
            this.loading = false;
            this.getSystemUserLists();
            _paq.push(['trackEvent', '点击', '引入', '引入用户']);
            this.userTableData = [];
            this.input = "";
            this.input1 = "";
            this.importUserDialog = false;
          }
        })
      }

    },

    // 查询引入用户
    pullinUser() {
      pullinUser({
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        userCode: this.input,
        userName: this.input1
      }).then(res => {
        this.userTableData = res.result.list
        this.count = res.result.total
      })
    },
    // 引入用户
    introduceUser() {
      if (!this.jobId) {
        this.$alert('请选择岗位', {
          confirmButtonText: '确定'
        })
      } else {
        this.importUserDialog = true;
        this.isRead = false;
        this.pageSize = 10;
        this.currentPage = 1;
        this.input = "";
        this.input1 = "";
        if (this.userTableData == null || this.userTableData == "") {
          this.pullinUser()
        }
      }
    },
    // 用户表单 分页
    UserDataSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    UserDataCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 引入用户搜索
    import_search() {

    },
    // 引入用户
    handleSelectionChange(val) {

      this.multipleSelection = val
    },
    userHandleSizeChange(val) {
      this.pageSize = val
      this.pullinUser()
      console.log(`每页 ${val} 条`)
    },

    getSystemUserLists() {
      getSystemUserList({
        AuthCompanyID: this.authCompanyId,
        ProductID: this.productId,
        JobID: this.id,
        UserName: this.searchName,
        pageSize: this.UserPageSize,
        pageIndex: this.UsercurrentPage
      }).then(res => {
        this.UserData = res.result.list;
        this.UsertotalCount = res.result.total;
      })
    },

    HandleSizeChangeUser(val) {
      this.UserPageSize = val
      this.getSystemUserLists();
      console.log(`每页 ${val} 条`)
    },
    HandleCurrentChangeUser(val) {
      this.UsercurrentPage = val
      this.getSystemUserLists();
    },
    userHandleCurrentChange(val) {
      this.currentPage = val
      this.pullinUser()
      console.log(`当前页: ${val}`)
    },
    //保存岗位
    saveJobMenu(data) {
      saveJobMenus({
        "jobList": [
          ...this.$refs.postTree.getCheckedNodes().map(res => res.ID),
          ...this.$refs.postTree.getHalfCheckedNodes().map(res => res.ID)
        ],
        "isLast": [
          ...this.$refs.postTree.getCheckedNodes().map(res => res.IsLast),
          ...this.$refs.postTree.getHalfCheckedNodes().map(res => res.IsLast)
        ],
        "jobId": this.id
      }).then(res => {
        if (res.code == 200) {
          this.functionDrawer = false;
          this.$message({
            type: 'success',
            message: '保存成功！'
          })
          _paq.push(['trackEvent', '点击', '保存', '保存岗位']);
        }
        console.log(res.result)
      })
    },
    // 功能授权
    functionAuthorization() {
      if (!this.jobId) {
        this.$alert('请选择岗位', {
          confirmButtonText: '确定'
        })
      } else {
        this.getAllMenus(this.id);
        this.functionDrawer = true
      }
    },
    formAuthorization(){
      if (!this.jobId) {
        this.$alert('请选择岗位', {
          confirmButtonText: '确定'
        })
      } else {
        this.getReportForm(this.id);
        this.formDrawer = true
      }
    },
    getDatatreeForm(){
      if (!this.jobId) {
        this.$alert('请选择岗位', {
          confirmButtonText: '确定'
        })
      } else {
        this.getDataAllMenus(this.id);
        this.dataDrawer = true
      }

    },
    sevedata(){

      let arr=this.$refs.dataTree.getCheckedNodes()
      arr.forEach(item=>{
        item.jobId=this.jobId
      })
      arr.forEach(item=>{
        item.children=""
      })
      console.log(arr);

      seveDATA__Form(
        arr

      ).then(res=>{
        this.dataDrawer = false
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
        console.log(res);

      })
    },
    getC(data){
      for(let i=0;i<data.length;i++){
        if(data[i].children){
        this.DataListchecked.push({id:data[i].id,checks:data[i].checks})
        this.getC(data[i].children)
        }else{
          // this.DataListchecked.push(data[i].id)
          this.DataListchecked.push({id:data[i].id,checks:data[i].checks})
      }
    }
    return this.DataListchecked
    },
    getDataAllMenus(){
      this.DataListchecked=[]
      getDATA__Form({
        jobId:this.jobId
      }).then(res=>{
        console.log(res.result);
        this.DataList=[res.result]
        let checkArr=this.getC([res.result])
        console.log(checkArr);
        console.log(checkArr.filter(item=>parseInt(item.checks)>0).map(item=>item.id));
        // console.log(this.getC([res.result]).filter(item=>{
        //   if(parseInt(item.checks)>0){
        //     return item.id
        //   }
        // }));
        this.dataDefaultCheckeds = checkArr.filter(item=>parseInt(item.checks)>0).map(item=>item.id)
      })
    }

  }
}
