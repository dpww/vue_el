<template>
  <div class="reportForms3 container">
    <div class="title">新开发客户分析报表</div>
     <div class="fromList">
      <el-row :gutter='24'>
          <el-col :span='12'><img src="../../assets/images/临时_20191029151910.png" alt="">
            <a  @click.prevent="openWindow" :href="'https://finereport.cifi.com.cn/webroot/decision/view/report?viewlet=xuhui%252F%25E6%259D%25A5%25E4%25BA%25BA%25E6%25B8%25A0%25E9%2581%2593%25E6%2598%258E%25E7%25BB%2586%25E8%25A1%25A8-%25E6%259D%25A5%25E4%25BA%25BA%25EF%25BC%2588%25E8%25AF%25A6%25E7%25BB%2586%25E7%2589%2588%25EF%25BC%2589.cpt&userid='+userName+''" target='_blank'>
            来人渠道明细表-来人（详细版）</a>
          </el-col>
        <el-col :span='12'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
            <a  @click.prevent="openWindow" :href="'https://finereport.cifi.com.cn/webroot/decision/view/report?viewlet=xuhui%252F%25E6%2588%2590%25E4%25BA%25A4%25E6%25B8%25A0%25E9%2581%2593%25E6%2598%258E%25E7%25BB%2586%25E8%25A1%25A8.cpt&userid='+userName+''" target='_blank'>
            成交渠道明细表</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
         <el-col :span='12'><img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="'https://finereport.cifi.com.cn/webroot/decision/view/report?viewlet=xuhui%252F%25E5%25AE%25A2%25E6%2588%25B7%25E4%25BF%25A1%25E6%2581%25AF%25E6%2598%258E%25E7%25BB%2586%25E8%25A1%25A8.cpt&userid='+userName+''" target='_blank'>
          客户信息明细表</a>
        </el-col>
        <el-col :span='12'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a :href="'https://finereport.cifi.com.cn/webroot/decision/view/report?viewlet=xuhui%252F%25E6%259D%25A5%25E4%25BA%25BA%25E4%25B8%258E%25E6%2588%2590%25E4%25BA%25A4%25E5%25AF%25B9%25E6%25AF%2594%25E8%25A1%25A8.cpt&userid='+userName+''" target='_blank'>
            来人与成交对比表</a>
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
  name: 'reportForms3',
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
.reportForms3{
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
