<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text"> 您好<br>欢迎登录营销管理系统</div> -->
    <div class="dashboard-hreftop">
      <div class="hreftop-item" v-for="(item, index) in hreftop" :key="index">
        <a @click.prevent="tohref(item)" href target="_blank">
          <!--  local?: item.productionHref" -->
          <img :src="item.ImgPath" alt />
          <span>
            {{item.title }}
            <!-- <span v-html="item.isIE"></span> -->
          </span>

          <!-- <span>{{local}}</span> -->
        </a>
      </div>
    </div>

    <div class="dashboard-bottomcotent">
      <!-- 货值结构 -->
      <div class="bottomcotent-item value">
        <div class="items">
          <!-- item 头部 -->
          <div class="item-title">
            <div class="title-box">
              <h3>货值结构</h3>
            </div>
          </div>
          <!-- item中间 -->
          <div class="item-middel">
            <ul class="clearfix">
              <li v-for="(item, index) in bottomcotent" :key="index">
                <img :src="item.ImgPath" alt />
                <span>{{item.title}}</span>
              </li>
            </ul>
          </div>
          <!-- item 底部 -->
          <div class="item-bottom">
            <ul class="bottom clearfix">
              <li class="xianbold">
                <span class="bold">楼栋面积</span>
              </li>
              <li class="xianbold" style="line-height:25px">
                <span class="bold">楼栋计划</span>
              </li>
              <li class="xian">
                <p class="bold">投资版</p>
                <p>整盘货值</p>
              </li>
              <li class="xian">
                <p class="bold">战规版</p>
                <p>整盘货值</p>
              </li>
              <li class="xian">
                <p class="bold">大定价版</p>
                <p>整盘货值</p>
              </li>
              <li class="xian">
                <p class="bold">月度动态版</p>
                <p>整盘货值</p>
              </li>
              <li>
                <p class="bold">定调价测算版</p>
                <p>规划货值</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 客户管理 -->
      <div class="client bottomcotent-item">
        <div class="items">
          <div class="item-title">
            <div class="title-box">
              <h3>客户管理</h3>
            </div>
          </div>
          <ul>
            <li>
              <img src="../../assets/yingxiao/xkt.jpg" alt />
              <p>旭客通</p>
            </li>
            <li>
              <img src="../../assets/yingxiao/xkh.jpg" alt />
              <p>旭客汇</p>
            </li>
            <li>
              <img src="../../assets/yingxiao/xkj (2).jpg" alt />
              <p>旭客家</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 计划管理 -->
      <div class="bottomcotent-item plan">
        <div class="items">
          <div class="item-title">
            <div class="title-box">
              <h3>计划管理</h3>
            </div>
          </div>
          <!--  -->
          <div class="plan-middel">
            <ul class="clearfix">
              <li>
                <img src="../../assets/yingxiao/sheji3.png" alt />
                <span class="title">供销存</span>
              </li>
              <li class="two"></li>
              <li class="border">
                <p>投资版全周期销售计划</p>
                <p>战规版全周期销售计划</p>
                <p>预算版年度销售计划</p>
                <p>动态版全周期销售计划</p>
              </li>
              <li class="three"></li>
              <li class="xs">
                <span style="font-size:12px">月度销售计划</span>
              </li>
              <li class="xsnone">
                <span>销售管理</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 交易管理 -->
      <div class="bottomcotent-item coy">
        <div class="items">
          <div class="item-title">
            <div class="title-box">
              <h3>交易管理</h3>
            </div>
          </div>
          <!--  -->
          <div class="coycontent">
            <ul class="clearfix">
              <li class="first">
                <img src="../../assets/yingxiao/yxgl.png" alt />
                <span class="firstspan">营销管理</span>
              </li>

              <li class="borders"></li>
              <li class="msg">
                <p>销售政策申请</p>
                <p>渠道政策申请</p>
                <p>请佣管理</p>
              </li>
              <li class="house">
                <p>房源管理</p>
                <p>价格管理</p>
                <p>机会管理</p>
                <p>认购签约</p>
                <p>销售变更</p>
              </li>
              <li class="my">
                <span>明源售楼</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 采购管理 -->
      <div class="bottomcotent-item data">
        <div class="datacontent items">
          <div class="item-title">
            <div class="title-box">
              <h3>招采管理</h3>
            </div>
            <div class="contents">
              <ul class="uls clearfix">
                <li class="first">
                  <img src="../../assets/yingxiao/yxcg.png" alt />
                  <span>营销采购</span>
                </li>
                <li class="border"></li>
                <li class="lists">
                  <p>供应商管理</p>
                  <p>月度采购计划</p>
                  <p>采购方案</p>
                  <p>招投标</p>
                  <p>定标</p>
                </li>
                <li class="heng"></li>
                <li class="money">
                  <p>营销预算</p>
                  <p>采购合同</p>
                  <p>付款申请</p>
                </li>
                <li class="fy">
                  <img src="../../assets/yingxiao/yingxiaofeiyong.png" alt />
                  <span>营销费用</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 数据 -->
      <div class="bottomcotent-item ms">
        <div class="items">
          <div class="item-title">
            <div class="title-box">
              <h3>数据应用</h3>
            </div>
          </div>
          <div class="mscontent">
            <ul class="clearfix">
              <li class="firsts">
                <img src="../../assets/yingxiao/yxgl.png" alt />
                <span>营销管理</span>
              </li>
              <li class="bdd"></li>
              <li class="twos">
                <p>固化报表</p>
                <p>自定义报表</p>
              </li>
              <li class="threes">
                <img src="../../assets/yingxiao/xhsj.png" alt />
                <span>旭慧数据2.0</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      isChrome: false,
      hreftop: [
        {
          title: "旭客后台",
          ImgPath: require("../../assets/yingxiao/gianzu.png"),
          targetUatHref: "https://scrm-uat.cifi.com.cn/#/dashboard",
          productionHref: "https://scrm.cifi.com.cn/#/dashboard"
        },
        {
          title: "渠道风控",
          ImgPath: require("../../assets/yingxiao/qudao.png"),
          targetUatHref: "https://face-sys-test.cifi.com.cn",
          productionHref: "https://face-sys.cifi.com.cn/"
        },
        {
          title: "明源售楼",
          ImgPath: require("../../assets/yingxiao/yinxiao.png"),
          targetUatHref:
            "https://sales-uat.cifi.com.cn/PubPlatform/Nav/Home/Default.aspx",
          productionHref:
            "https://sales.cifi.com.cn/PubPlatform/Nav/Home/Default.aspx"
        },
        {
          title: "营销采购",
          ImgPath: require("../../assets/yingxiao/caigou.png"),
          targetUatHref:
            "https://zc-test.cifi.com.cn/zc-sky/page/btc/index.html",
          productionHref: "https://gys.cifi.com.cn/"
        },
        {
          title: "营销费用",
          ImgPath: require("../../assets/yingxiao/yinxiao.png"),
          targetUatHref: "https://myfee-uat.cifi.com.cn/Frame/Index.aspx",
          productionHref:
            "http://sales.cifi.com.cn:9020/Frame/Index.aspx?ssotoken=EbfOHlMYgxDJ5RbLraksL21KbynB6XqECdmfFe64hOApfTUwMvgUtAKrNzUG8Qk6gL83a%2bR9eEqIBDo4P4w9iQ%3d%3d",
          ID: 1
        },
        {
          title: "供销存",
          ImgPath: require("../../assets/yingxiao/gongxiaocun.png"),
          targetUatHref: "https://mars-uat.cifi.com.cn/#/Workbench",
          productionHref: "https://mars.cifi.com.cn/#/Workbench"
        }
      ],
      bottomcotent: [
        {
          title: "设计系统",
          ImgPath: require("../../assets/yingxiao/sheji1.png")
        },
        {
          title: "全景计划",
          ImgPath: require("../../assets/yingxiao/shenji2.png")
        },
        {
          title: "供销存",
          ImgPath: require("../../assets/yingxiao/sheji3.png")
        },
        {
          title: "明源售楼",
          ImgPath: ""
        }
      ],
      contentDats: [{}],
      employeeName: localStorage.getItem("employeeName")
    };
  },
  computed: {
    userName() {
      return localStorage.getItem("employeeName");
    },

    local() {
      let isUat;
      if (location.origin.includes("uat")) {
        isUat = true;
      } else {
        isUat = false;
      }
      return isUat;
    }
  },
  created() {},
  mounted() {
    var userAgent = navigator.userAgent;
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.isChrome = false;
    } else if (
      userAgent.indexOf("Chrome") > -1 ||
      userAgent.indexOf("Firefox") > -1 ||
      userAgent.indexOf("Safari") > -1
    ) {
      this.isChrome = true;
    }

    let time = setTimeout(() => {
      this.employeeName = localStorage.getItem("employeeName");
      clearTimeout(time);
    }, 700);
  },
  methods: {
    tohref(href) {
      //如果chrome ie链接不生效
      if (href.ID && this.isChrome) {
        return;
      } else {
        href = this.local ? href.targetUatHref : href.productionHref; //uat || 生产地址配置
        window.open(href);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin sizeType($size, $color, $bold) {
  font-size: $size;
  color: $color;
  font-weight: $bold;
  font-family: PingFangSC-Regular, PingFang SC;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
p {
  text-align: center;
}
.dashboard-container {
  padding: 10px;
  width: 100%;
  // height: 1200px;

  //头部链接
  .dashboard-hreftop {
    margin-bottom: 10px;
    display: flex;

    .hreftop-item {
      margin-left: 10px;
      height: 60px;
      flex: 1;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      @include sizeType(14px, #333333, 400);
      a {
        img {
          vertical-align: middle;
          width: 22px;
          height: 22px;
        }
        display: block;
        text-align: center;
        span {
          line-height: 60px;
          // text-align: center;
          margin-left: 8px;
        }
      }
    }

    .hreftop-item:first-child {
      margin-left: 0;
    }
    .hreftop-item:nth-child(5) {
      position: relative;
    }
    .hreftop-item:nth-child(5)::after {
      content: "注: 该系统只适用于IE浏览器";
      display: block;
      width: 100%;
      height: 20px;
      position: absolute;
      left: 10px;
      bottom: -2px;
      color: red;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 12px;
    }
  }
  .dashboard-bottomcotent {
    // height: 1200px;
    display: flex;
    flex-wrap: wrap;

    .bottomcotent-item {
      // display: inline-block;
      float: left;
      width: 50%;
      height: 188px;
      box-sizing: border-box;
      .items {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        height: 188px;
        // float: left;

        .item-title {
          padding: 15px 10px;
          .title-box {
            position: relative;
            h3:after {
              content: "";
              display: block;
              position: absolute;
              width: 4px;
              height: 16px;
              // top: 9%;
              top: 50%;
              transform: translateY(-50%);
              left: 0;
              background: #2761ff;
            }
            h3 {
              margin-left: 15px;
              @include sizeType(16px, #333333, 600);
            }
          }
        }
        .item-middel {
          // height: 80px;
          margin-left: 38px;
          margin-top: 20px;
          height: 50px;
          // border:1px solid  red;
          ul {
            list-style: none;
            // display: flex;
            position: relative;
            li {
              // margin-right: 30px;
              float: left;
              width: 80px;
              flex: 1;
              margin-right: 50px;
              img {
                vertical-align: middle;
                width: 14px;
              }
              span {
                @include sizeType(14px, #333333, 600);
              }
            }
            li:nth-child(3) {
              position: absolute;
              left: 53%;
            }
            li:nth-child(4) {
              float: right;
              margin-right: 24px;
            }
            li:nth-child(2) {
              margin-left: 22px;
            }
          }
        }

        // bottom
        .item-bottom {
          padding: 0 10px;
          // padding-top: 20px;
          .bottom {
            list-style: none;
            display: flex;
            height: 40px;
            li {
              // flex: 1;
              text-align: center;
              position: relative;
              margin-left: 10px;
              flex: 1;
              height: 48px;
              // float: left;
              // width: 80px;
              @include sizeType(12px, #333333, 500);
              .bold {
                @include sizeType(12px, #333333, 700);
                padding-bottom: 3px;
              }
              // line
            }
            li:first-child {
              line-height: 25px;

              margin-left: 23px;
            }
            li:nth-child(2) {
            }
            .xian:after {
              content: "";
              display: block;
              position: absolute;
              width: 16px;
              height: 1px;
              background: #e6e6e6;
              right: -13px;
              top: 30%;
              transform: translateY(-50%);
            }
            .xianbold {
              position: relative;
            }
            .xianbold::after {
              content: "";
              display: block;
              position: absolute;
              width: 25px;
              height: 1px;
              background: #e6e6e6;
              right: -20px;
              top: 27%;
              transform: translateY(-50%);
            }
          }
        }
      }
    }
    .bottomcotent-item:nth-child(odd) {
      width: 55%;
      margin-right: 5px;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
    .bottomcotent-item:nth-child(even) {
      width: 44%;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
    // 客户管理
    .client {
      margin-left: 5px;
      ul {
        list-style: none;
        display: flex;
        justify-content: center;
        align-content: center;
        text-align: center;
        li {
          flex: 1;
          @include sizeType(12px, #333333, 600);
          img {
            width: 90px;
            margin-bottom: 10px;
          }
        }
      }
    }
    //
    .plan {
      .plan-middel {
        ul {
          // display: flex;
          list-style: none;
          margin-left: 38px;
          margin-top: 40px;
          li {
            @include sizeType(14px, #333333, 600);
            float: left;
            // flex: 1;
            margin: 0 50px;
            img {
              width: 14px;
              vertical-align: middle;
            }

            .title {
              @include sizeType(14px, #333333, 600);
            }
            span {
              @include sizeType(14px, #333333, 600);
            }
          }
          .xs {
            position: relative;
            margin-left: 0px;
            margin-right: 0;
            span {
              padding: 0 10px;
            }
          }
          .xsnone {
            // margin: 0;
            margin-left: 64px;
            margin-right: 0;
          }
          .xs:after {
            content: "";
            display: block;
            width: 40px;
            height: 1px;
            background: #e6e6e6;
            position: absolute;
            left: -50px;
            top: 50%;
            transform: translateY(-50%);
          }
          .xs:before {
            content: "";
            display: block;
            width: 40px;
            height: 1px;
            background: #e6e6e6;
            position: absolute;
            right: -50px;
            top: 50%;
            transform: translateY(-50%);
          }
          .two {
            margin-top: -35px;
            width: 1px;
            height: 90px;
            background: #e6e6e6;
            margin-left: -1px;
          }
          .three {
            margin-top: -35px;
            width: 1px;
            height: 90px;
            background: #e6e6e6;
            margin-left: -21px;
          }
          li:nth-child(2) {
            // padding: 0 30px;
          }
          .border {
            margin-left: -20px !important;
            // border-left: 1px solid #e6e6e6;
            // border-right: 1px solid #e6e6e6;
            margin-top: -50px;

            p {
              // padding: 5px 0;
              position: relative;
              line-height: 30px;
              // margin-top: -10px;
              @include sizeType(12px, #333333, 500);
              padding: 0 10px;
            }
            p:after {
              content: "";
              display: block;
              width: 30px;
              height: 1px;
              background: #e6e6e6;
              position: absolute;
              left: -31px;
              top: 50%;
              transform: translateY(-50%);
            }
            p:before {
              content: "";
              display: block;
              width: 30px;
              height: 1px;
              background: #e6e6e6;
              position: absolute;
              right: -30px;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          li:first-child {
            position: relative;
            margin-left: 0 !important;
            // top: 20px;
          }
          li:first-child:after {
            content: "";
            display: block;
            position: absolute;
            width: 40px;
            height: 1px;
            background: #e6e6e6;
            right: -50px;
            top: 8px;
            // transform: translateY(-50%);
          }
        }
      }
    }
    // 交易管理
    .coy {
      margin-left: 5px;
      position: relative;
      .coycontent {
        // background: red;
        // padding-top: 20px;
        margin-top: 20px;
        ul {
          position: relative;
          list-style: none;
          // display: flex;
          li {
            float: left;
            margin: 0 35px;
            flex: 1;
            img {
              width: 14px;
              vertical-align: middle;
            }
            span {
              @include sizeType(14px, #333333, 600);
            }
          }

          .first {
            position: relative;
            margin-top: 30px;
            margin-right: 82px;
          }
          .first::after {
            content: "";
            display: block;
            // width: 30px;
            // height: 10px;
            background: #e6e6e6;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
          .borders {
            height: 50px;
            width: 1px;
            background: #e6e6e6;
            position: absolute;
            top: 13px;
            // left: 83px;
            left: 117px;
            // margin-top: 20px;
          }
          .borders:after {
            content: "";
            display: block;
            width: 30px;
            height: 1px;
            background: #e6e6e6;
            position: absolute;
            left: -30px;
            top: 50%;
            transform: translateY(-50%);
          }
          .msg {
            // margin-top: -20px;
            // margin-left: -29px;

            // margin-left: 32px;
            margin-left: 0;
            p {
              position: relative;
              line-height: 25px;
              @include sizeType(12px, #333333, 500);
            }
            p:after {
              content: "";
              display: block;
              width: 30px;
              height: 1px;
              background: #e6e6e6;
              position: absolute;
              left: -40px;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
        .house {
          margin-top: -26px;
          position: relative;
          margin-left: 20px;
          p {
            text-align: center;
            line-height: 25px;
            position: relative;
            @include sizeType(12px, #333333, 500);
          }
          p:after {
            content: "";
            display: block;
            position: absolute;
            right: -40px;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 1px;
            background: #e6e6e6;
          }
          p:nth-child(3):after {
            content: "";
            display: block;
            position: absolute;
            right: -70px;
            top: 50%;
            transform: translateY(-50%);
            width: 60px;
            height: 1px;
            background: #e6e6e6;
          }
        }

        .house:after {
          content: "";
          display: block;
          position: absolute;
          width: 1px;
          height: 100px;
          background: #e6e6e6;
          right: -40px;
          top: 13px;
        }
        .my {
          margin-top: 28px;
          margin-left: 45px;
          margin-right: 0;
        }
      }
    }
    //
    .data {
      .datacontent {
        .contents {
          height: 140px;
          // background: red;
          // padding: 20px 0;
          padding-top: 60px;
          padding-left: 22px;
          .uls {
            list-style: none;
            position: relative;

            img {
              width: 14px;
              vertical-align: middle;
            }
            span {
              @include sizeType(14px, #333333, 600);
            }
            li {
              float: left;
              margin: 0 45px;
            }
            .first {
              position: relative;
              margin-left: 0;
            }
            .first:after {
              position: absolute;
              content: "";
              display: block;
              width: 80px;
              height: 1px;
              background: #e6e6e6;
              right: -90px;
              top: 50%;
              transform: translateY(-50%);
            }
            .border {
              width: 1px;
              height: 100px;
              background: #e6e6e6;
              position: absolute;
              top: -39px;
              left: 81px;
            }
            .lists {
              // margin-top: -30px;
              margin-top: -52px;
              p {
                position: relative;
                line-height: 25px;
                padding-left: 8px;
                @include sizeType(12px, #333333, 500);
              }
              p:after {
                content: "";
                position: absolute;
                width: 40px;
                height: 1px;
                background: #e6e6e6;
                left: -38px;
                top: 50%;
                transform: translateY(-50%);
              }
              p:nth-child(3):after {
                content: "";
                position: absolute;
                width: 40px;
                height: 0px;
                background: #e6e6e6;
                left: -38px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            .heng {
              width: 67px;
              height: 1px;
              background: #e6e6e6;
              position: absolute;
              bottom: 11px;
              left: 201px;
            }
            .heng:after {
              content: "";
              position: absolute;
              width: 1px;
              height: 72px;
              background: #e6e6e6;
              right: 0;
              // top: 0;
              bottom: 0;
              // transform: translateY(-50%);
            }
            .money {
              margin-top: -24px;
              margin-left: 63px;
              position: relative;
              // @include sizeType(14px, #333333, 600);

              p {
                position: relative;
                line-height: 25px;
                @include sizeType(12px, #333333, 600);
              }
              p:after {
                content: "";
                position: absolute;
                width: 30px;
                height: 1px;
                background: #e6e6e6;
                left: -40px;
                top: 50%;
                transform: translateY(-50%);
              }
              p:before {
                content: "";
                position: absolute;
                width: 30px;
                height: 1px;
                background: #e6e6e6;
                right: -40px;
                top: 50%;
                transform: translateY(-50%);
              }
              p:nth-child(2):before {
                content: "";
                position: absolute;
                width: 80px;
                height: 1px;
                background: #e6e6e6;
                right: -90px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            .money::before {
              content: "";
              position: absolute;
              width: 1px;
              height: 50px;
              background: #e6e6e6;
              right: -40px;
              top: 50%;
              transform: translateY(-50%);
            }
            .fy {
              margin-top: 4px;
              margin-left: 55px;
            }
          }
        }
      }
    }
    .ms {
      margin-left: 5px;
      .mscontent {
        height: 120px;
        // background: yellow;
        padding-top: 50px;
        padding-left: 6px;
        .firsts {
          @include sizeType(14px, #333333, 600);
          // margin-left: 16px;
        }
        .threes {
          @include sizeType(14px, #333333, 600);
          margin-left: 80px;
        }
        ul {
          list-style: none;
          position: relative;
          li {
            float: left;
            margin: 0 30px;
            // background: red;
            img {
              vertical-align: middle;
              width: 14px;
            }
          }
        }
        .bdd {
          width: 25px;
          height: 1px;
          position: absolute;
          background: #e6e6e6;
          left: 90px;
          top: 8px;
          // position: relative;
          // transform: translateY(-50%);
        }
        .bdd::after {
          position: absolute;
          content: "";
          display: block;
          width: 1px;
          background: #e6e6e6;
          right: -1px;
          height: 25px;
          background: #e6e6e6;
          top: -10px;
          // height: 25px;
          // background: #e6e6e6;
          // right: 15px;
          // top: -11px;
        }
        .twos {
          margin-top: -15px;
          margin-left: 40px;
          p {
            position: relative;
            line-height: 25px;
            font-size: 12px;
            color: #333333;
          }
          p:after {
            position: absolute;
            content: "";
            display: block;
            width: 30px;
            height: 1px;
            background: #e6e6e6;
            left: -30px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
</style>
