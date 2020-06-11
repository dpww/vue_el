<template>
  <div class="login-container" style="position: fixed;">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span>password: any</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { initMenu } from "@/utils/util";
import { validUsername } from "@/utils/validate";
import { loginauth } from "@/api/common";
import { mgetToken, msetToken, mremoveToken } from "@/utils/auth";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "uat123",
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    localStorage.clear();
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          loginauth(this.loginForm)
            .then(res => {
              console.log(res);
              // this.$messages(res.messages)
              if (res.result) {
                //范例范例：：  ""张三张三_zhangsan01@cifi._zhangsan01@cifi.
                localStorage.clear();
                const token = res.result.token;
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
                const expiration = res.result.expiration;
                // const JobOrgID = res.result.user.job.JobOrgID;
                // const JobOrgID=res.result.user.job.JobOrgID
                const ID = res.result.user.job.ID;
                const CommonJobID = res.result.user.job.CommonJobID;
                window.localStorage.setItem("CommonJobID", CommonJobID);
                // msetToken(token)
                window.localStorage.setItem("userInfo", JSON.stringify(user));
                window.localStorage.setItem("id", id);
                window.localStorage.setItem("username", username);

                // window.localStorage.setItem("JobOrgID", JobOrgID);
                window.localStorage.setItem("ID", ID);
                window.localStorage.setItem("employeeName", employeeName);
                window.localStorage.setItem("ProductID", ProductID);
                window.localStorage.setItem("JobOrgID", JobOrgID);
                window.localStorage.setItem("AuthCompanyID", AuthCompanyID);
                window.localStorage.setItem("token", token);
                window.localStorage.setItem("expiration", expiration);
                window.localStorage.setItem("JobName", JobName);
                window.localStorage.setItem("job", job);
                if (user) {
                  this.$store.dispatch("user/setJobType", CommonJobID);
                  this.$store.dispatch("user/setInfo", user).then(data => {
                    initMenu(this.$router, data);
                    this.$router.push("/dashboard");
                  });
                } else {
                  this.$message("没有账号权限！");
                }
                // axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
                // axios.defaults.headers.common["token"] = token;
              }
            })
            .catch(res => {
              console.log(res);
            });
          // this.$store.dispatch('user/login', this.loginForm).then(() => {
          //   this.$router.push({ path: this.redirect || '/' })
          //   this.loading = false
          // }).catch(() => {
          this.loading = false;
          // })
          // this.$router.push('/example')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    margin-bottom: 22px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  position: fixed !important;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    height: 400px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
