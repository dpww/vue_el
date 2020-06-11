<template>
  <div class="reportForms2 container">
    <div class="title">新开发销售特例报表</div>
     <div class="fromList">
      <el-row :gutter='24'>
          <el-col :span='12'><img src="../../assets/images/临时_20191029151910.png" alt="">
            <a  @click.prevent="openWindow" :href="'https://finereport.cifi.com.cn/webroot/decision/view/report?viewlet=xuhui%252F%25E9%2580%2580%25E6%2588%25BF%25E6%2598%258E%25E7%25BB%2586%25E8%25A1%25A8.cpt&userid='+userName+''" target='_blank'>
            退房明细表</a>
          </el-col>
          <el-col :span='12'><img src="../../assets/images/临时_20191029151910.png" alt="">
            <a  @click.prevent="openWindow" :href="'https://finereport.cifi.com.cn/webroot/decision/view/report?viewlet=xuhui%252F%25E6%259B%25B4%25E5%2590%258D%25E6%2598%258E%25E7%25BB%2586%25E8%25A1%25A8.cpt&userid='+userName+''" target='_blank'>
            更名明细表</a>
          </el-col>
      </el-row>
   </div>
   <iframe name="frame" :src="myurl" frameborder="0" style="width:0;height:0;"></iframe>
   <iframe name="frame" src="/my/" frameborder="0" style="width:0;height:0;"></iframe>
 </div>
</template>
<script>
var localurl = location.href;
var myurl = "http://sales-test.cifi.com.cn:9060";
if(localurl.indexOf("salesmgt.cifi.com.cn") != -1 ){
  myurl = "http://sales.cifi.com.cn:9060";
}
import {get} from '@/api/request'
export default {
  name: 'reportForms2',
  data(){
    return {
      userName: localStorage.getItem('username'),
      testName: '/PubPlatform/Nav/Home/Default.aspx',
      myurl: myurl,
    }
  },
  created() {},
  methods: {
    openWindow(event, width, height)
      {
          let url=event.target.href;
          console.log(url);
          width = width || window.screen.width;
          height = height || window.screen.height;
          var left = (window.screen.width - width) / 2;
          var top = (window.screen.height - height) / 2;
          window.open(url, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, left="+left+", top="+top+", width="+width+", height="+height);
      }
  }
}
</script>

<style lang='less' scoped>
.reportForms2{
  padding: 10px;
  .title{
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    padding: 10px 20px;
    margin-bottom: 10px;
    box-shadow: 0 0 3px #ccc;
    background-color: #fff;
  }
  .el-col-12{
    line-height: 60px;
    padding-left: 5% !important;
  }
  a{
    font-size: 16px;
  }
  .fromList{
    padding: 10px 20px;
    box-shadow: 0 0 3px #ccc;
    background-color: #fff;
  }
  img{
    width: 18px;
    height: 18px;
  }
}
</style>
