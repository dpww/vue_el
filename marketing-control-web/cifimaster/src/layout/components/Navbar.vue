<template>
  <div>
    <div class="navbar">
      <i v-show="!isShowSidebar" @click="goback" class="el-icon-arrow-left backIcon"></i>
      <breadcrumb class="breadcrumb-container" />
      <div class="user-admin" v-show="isShowSidebar">
        <!-- :class="{'clooStyle' :  $route.path ==  '/report/salesManagementReport/reportForms' ? true : false}" -->
        <el-button size="mini" type="text" @click="toFaq" class="FAQbtn">
          <i style="color:skyblue" class="el-icon-question"></i>
          {{'操作指引&FAQ'}}
        </el-button>
        {{employeeName}} 【 {{JobName}} 】
        <i class="iconfont icontuichu" @click="logout"  >
          <!-- 退出 -->
        </i>
          <!-- <div class="logoutBtn" v-show="showLogout" @click="logout">
            <i class="el-icon-switch-button"></i>
            退出登录
          </div> -->

      </div>
      <!-- <div :class="{'bg' :  $route.path ==  '/report/salesManagementReport/reportForms' ? true : false}" ></div> -->
    </div>
    <div style="height:40px"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { loginBack, loginOut } from "@/api/user";
import { initMenu } from "@/utils/util";

export default {
  components: {
    Breadcrumb:()=>import("@/components/Breadcrumb")
  },
  props: ["isShowSidebar"],
  data() {
    return {
      showLogout:false,
      isMarketingReport: false,
      imgexit: "../../asstes/img/exit.png",
      value: [],
      list: [],
      loading: false,
      value: "",
      pojid: "",
      employeeName: "",
      JobName: "",
      nowRouteName: this.$route.name,
      firstProjectName: "",
      nameobj: {
        planWrite: "首开计划编制",
        planControl: "首开计划监控",
        rateWatch: "首开计划监控",
        getLand: "首开计划编制",
        setSecond: "首开计划编制",
        setFirst: "首开计划编制",
        threeMonth: "首开计划编制",
        opening: "首开计划编制",
        afterAMonth: "首开计划编制",
        twoMonth: "首开计划编制",
        twentyOneDays: "首开计划编制",
        sevenDays: "首开计划编制",
        salesOffice: "首开计划编制",
        modelDistrict: "首开计划编制",
        modelHouses: "首开计划编制"
      },
      nodeobj: {
        planWrite: "",
        planControl: "",
        rateWatch: " / 进度监控",
        getLand: " / 拿地后",
        setSecond: " / 顶设2",
        setFirst: " / 顶设1",
        threeMonth: " / 首开前3月",
        opening: " / 首开",
        afterAMonth: " / 首开后1月",
        twoMonth: " / 首开前2月",
        twentyOneDays: " / 首开前21天",
        sevenDays: " / 首开前7天",
        salesOffice: " / 售楼处开放",
        modelDistrict: " / 景观样板段开放",
        modelHouses: " / 样板房开放"
      }
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    roadName() {
      return this.nameobj[this.$route.name];
    },
    nodeName() {
      return this.nodeobj[this.$route.name];
    },
    firstItemName() {
      return this.$store.state;
    },
    isShowBtn() {
      return this.isShowSidebar;
    }
  },
  watch: {
    firstItemName: {
      handler(a, b) {
        if (a.user.firstPlanItem) {
          this.firstProjectName = " / " + a.user.firstPlanItem;
        } else {
          this.firstProjectName = "";
        }
      },
      deep: true
    }
  },
  created() {
    this.initHandler();
  },
  methods: {
    toFaq() {
      window.open("https://salesmgt.cifi.com.cn/doc/help/index.html");
    },
    initHandler() {
      if (this.$route.query.code) {
        localStorage.clear();
        loginBack({
          code: this.$route.query.code
        }).then(res => {
          if (res.result) {
            localStorage.clear();
            const token = res.result.token;
            const expiration = res.result.expiration;
            const user = res.result.user;
            const job = res.result.user.job;
            const employeeName = res.result.user.employeeName;
            const JobName = res.result.user.job.JobName;
            const ProductID = res.result.user.job.ProductID;
            const JobOrgID = res.result.user.job.JobOrgID;
            const AuthCompanyID = res.result.user.job.AuthCompanyID;
            const authCompanyId = res.result.user.authCompanyId;
            const projectId = res.result.user.projectId;
            const productId = res.result.user.productId;
            const id = res.result.user.id;
            const username = res.result.user.username;
            const ID = res.result.user.job.ID;
            const CommonJobID = res.result.user.job.CommonJobID;
            window.localStorage.setItem("userInfo", JSON.stringify(user));
            window.localStorage.setItem("id", id);
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("ID", ID);
            window.localStorage.setItem("employeeName", employeeName);
            window.localStorage.setItem("ProductID", ProductID);
            window.localStorage.setItem("JobOrgID", JobOrgID);
            window.localStorage.setItem("AuthCompanyID", AuthCompanyID);
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("expiration", expiration);
            window.localStorage.setItem("JobName", JobName);
            window.localStorage.setItem("job", job);
            window.localStorage.setItem("pojid", projectId);
            window.localStorage.setItem("CommonJobID", CommonJobID);
            if (user) {
              _paq.push(["setUserId", `${user.employeeName}_${user.username}`]);
              // this.$router.push("/");
              this.$store.dispatch("user/setJobType", CommonJobID);
              this.$store.dispatch("user/setInfo", user).then(data => {
                initMenu(this.$router, data);
                this.$router.push("/dashboard");
              });
            } else {
              this.$message("没有账号权限！");
            }
            this.employeeName1();
            this.pojid = localStorage.getItem("pojid");
            localStorage.removeItem("code");
            this.employeeName = employeeName;
          }
        });
      } else {
        this.employeeName1();
        this.pojid = localStorage.getItem("pojid");
      }
    },
    goback() {
      if (this.$route.path == "/rateWatch") {
        this.$router.push("planControl");
      } else {
        this.$router.go(-1);
      }
    },
    employeeName1() {
      this.employeeName = localStorage.getItem("employeeName");
      this.JobName = localStorage.getItem("JobName");
    },
    toggleSideBar() {
      this.$store.dispatch(
        "app/toggleSideBar",
        !this.$store.state.app.sidebar.opened
      );
    },
    async logout() {
      loginOut({ userName: localStorage.getItem("username") });
      await this.$store.dispatch("user/resetToken");
      window.location.href = process.env.VUE_APP_LOGOUT_URL;
    },
    clickfun(e) {}
  }
};
</script>
<style >
@import "//at.alicdn.com/t/font_1429919_vergf8ishlq.css";
</style>
<style lang="scss" scoped>
.iconfont {
  font-family: "iconfont";
}
.backIcon {
  height: 20px;
  width: 10px;
  font-size: 16px;
  vertical-align: middle;
  margin-left: 10px;
}
.FAQbtn {
  padding: 0 5px;
}
.icontuichu {
  cursor: pointer;
  position: relative;
  color: #999;
  font-size: 14px;
  margin-left: 8px;
}
.imgexit {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  width: 15px;
}
.user-admin {
  color: #666;
  font-size: 14px;
  line-height: 40px;
  float: right;
  margin-right: 40px;
  position: relative;
  .logoutBtn{
  cursor: pointer;
    border-radius: 6px;
    position: absolute;
    bottom: -40px;
    right: -20px;
    z-index: 20000;
    width: 100px;
    background: #fff;
    padding: 0 5px;
  }
}
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  height: 40px;
  overflow: visible;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #F5F5F5;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 40px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;

          font-size: 12px;
        }
      }
    }
  }
}
.bg {
  width: 200px;
  height: 40px;
  background: url("../../assets/images/logo.png") no-repeat;
  background-size: 190px 30px;
  // background-size:cover;
  background-position-y: 5px;
}
</style>
