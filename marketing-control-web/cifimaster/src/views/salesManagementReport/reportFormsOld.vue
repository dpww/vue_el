<template>
  <div class="reportForms container">
    <!-- <div class="title">原有报表</div> -->
    <div class="fromList">
      <div class="title">
        <h3 >原有报表</h3>
      </div>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&userCode=doukai&FunctionCode=00119901&rptGuid=26afadfb-fee4-4273-9a08-c1773b4c49e6&userGuid=538c6318-d981-49fe-b91a-ee8a8bfa0d4c&rptName=YS01%20%E6%88%BF%E9%97%B4%E6%98%8E%E7%BB%86%E8%A1%A8-%E6%88%90%E4%BA%A4&_t=1572177673067'"
            target='_blank'>
            YS01 房间明细表-成交</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=a300f267-c576-4dff-96a2-1962f3b8376a&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS01%20%E6%88%BF%E9%97%B4%E6%98%8E%E7%BB%86%E8%A1%A8-%E6%88%90%E4%BA%A4%EF%BC%88%E9%9B%86%E5%9B%A2%EF%BC%89&_t=1572177715607'"
            target='_blank'>
            YS01 房间明细表-成交（集团）</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=aa05808e-a4d3-4f3a-974a-447115c466b6&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS02%20%E6%88%90%E4%BA%A4%E5%AE%A2%E6%88%B7%E7%BB%9F%E8%AE%A1%E8%A1%A8&_t=1572177723573'"
            target='_blank'>
            YS02 成交客户统计表</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=88d21830-707c-40d6-a4ff-6882c5cfc241&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS03%20%E5%AE%A2%E6%88%B7%E6%98%8E%E7%BB%86%E8%A1%A8&_t=1572177728953'"
            target='_blank'>
            YS03 客户明细表</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=d770e7ab-b984-4e31-9d79-393ce4909a56&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS03-2%20%E5%AE%A2%E6%88%B7%E6%98%8E%E7%BB%86%E8%A1%A8&_t=1572177735940'"
            target='_blank'>
            YS03-2 客户明细表</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=d4ea156f-b312-426c-b8a2-512fe37833ad&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS04%20%E7%BD%AE%E4%B8%9A%E9%A1%BE%E9%97%AE%E4%B8%9A%E7%BB%A9%E7%BB%9F%E8%AE%A1%E8%A1%A8&_t=1572177744010'"
            target='_blank'>
            YS04 置业顾问业绩统计表</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=49170ca2-8b61-4966-b2ed-8c32fb1ace60&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS05%20%E6%9D%A5%E4%BA%BA%E6%B8%A0%E9%81%93%E6%98%8E%E7%BB%86%E8%A1%A8-%E6%88%90%E4%BA%A4&_t=1572177752118'"
            target='_blank'>
            YS05 来人渠道明细表-成交</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=c273c496-b9e2-4aa8-b433-260eb4b3fc02&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS05-2%20%E6%9D%A5%E4%BA%BA%E6%B8%A0%E9%81%93%E6%98%8E%E7%BB%86%E8%A1%A8-%E6%88%90%E4%BA%A4&_t=1572177758568'"
            target='_blank'>
            YS05-2 来人渠道明细表-成交</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=310a999f-35fc-4969-a052-1708f797785d&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS06%20%E6%9D%A5%E4%BA%BA%E8%AE%A1%E5%88%92%E5%AE%8C%E6%88%90%E7%BB%9F%E8%AE%A1%E8%A1%A8&_t=1572177764816'"
            target='_blank'>
            YS06 来人计划完成统计表</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=a709550c-6449-4a24-a8b3-fcdd8f200a1a&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E8%A1%A8%E8%90%A5%E9%94%80&_t=1572177771675'"
            target='_blank'>
            YS07 销售汇总表营销</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=8fab9a77-5992-4ed3-86be-b92a72055611&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E5%9B%9E%E6%AC%BE%E6%98%8E%E7%BB%86&_t=1572177837269'"
            target='_blank'>
            YS07 销售汇总回款明细</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=cf63ae5e-c79e-4bdf-8017-b2b3b4e0c872&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E5%BB%BA%E5%8D%A1%E6%98%8E%E7%BB%86&_t=1572177843218'"
            target='_blank'>
            YS07 销售汇总建卡明细</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=6dc557e6-a212-40ab-ba8a-a2574f7c9e4a&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E6%9D%A5%E7%94%B5%E6%9D%A5%E8%AE%BF%E6%98%8E%E7%BB%86&_t=1572177860318'"
            target='_blank'>
            YS07 销售汇总来电来访明细</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=03ac5443-a286-4222-a49c-d20af4f48ea4&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E7%AD%BE%E7%BA%A6%E6%98%8E%E7%BB%86&_t=1572177870863'"
            target='_blank'>
            YS07 销售汇总签约明细</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=5247e067-b1f4-40a3-b7be-f68c6f9a63a3&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E8%AE%A4%E8%B4%AD%E6%98%8E%E7%BB%86&_t=1572177922121'"
            target='_blank'>
            YS07 销售汇总认购明细</a>
        </el-col>
      </el-row>
      <div class="title">
        <h3 >新开发销售特例报表</h3>
      </div>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=6e3bc0a2-bb73-474e-8978-ac037b716389&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E5%BA%94%E6%94%B6%E6%AC%BE%E6%98%8E%E7%BB%86&_t=1572177934885'"
            target='_blank'>
            YS07销售汇总应收款明细</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=d6e38a9b-5e39-4341-a9d3-1fa1ea8eed1e&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07-2%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E8%A1%A8%E8%90%A5%E9%94%80&_t=1572178013204'"
            target='_blank'>
            YS07-2 销售汇总表营销</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=416b7ab8-1ed9-424e-a2c9-d674335204b7&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07-2%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E5%9B%9E%E6%AC%BE%E6%98%8E%E7%BB%86&_t=1572178018899'"
            target='_blank'>
            YS07-2 销售汇总回款明细</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=5f5fd2a6-9794-45d6-9e18-db11228ef48e&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07-2%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E5%BB%BA%E5%8D%A1%E6%98%8E%E7%BB%86&_t=1572178025785'"
            target='_blank'>
            YS07-2 销售汇总建卡明细</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=a9bb1bf3-b5cf-47dc-bf37-a9b956788439&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07-2%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E6%9D%A5%E7%94%B5%E6%9D%A5%E8%AE%BF%E6%98%8E%E7%BB%86&_t=1572178033281'"
            target='_blank'>
            YS07-2 销售汇总来电来访明细</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=db28531c-060f-484d-bf80-85dc17660988&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07-2%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E7%AD%BE%E7%BA%A6%E6%98%8E%E7%BB%86&_t=1572178039770'"
            target='_blank'>
            YS07-2 销售汇总签约明细</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=0521a20d-0521-43eb-a348-3da9546ee39e&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07-2%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E8%AE%A4%E8%B4%AD%E6%98%8E%E7%BB%86&_t=1572178046698'"
            target='_blank'>
            YS07-2 销售汇总认购明细</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=6ae8c6a5-ae36-493c-b1d7-8a9c76f29dd8&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS07-2%20%E9%94%80%E5%94%AE%E6%B1%87%E6%80%BB%E5%BA%94%E6%94%B6%E6%AC%BE%E6%98%8E%E7%BB%86&_t=1572178060395'"
            target='_blank'>
            YS07-2 销售汇总应收款明细</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=55cbe7cd-71da-498b-a1d0-b0de4c6a67cc&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS08%20%E9%94%80%E5%94%AE%E5%8F%98%E6%9B%B4%E7%BB%9F%E8%AE%A1%E6%8A%A5%E8%A1%A8&_t=1572178066918'"
            target='_blank'>
            YS08 销售变更统计报表</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=53d7c493-5f5d-498a-9bb5-3d8b2ca71940&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS09%20%E6%9D%A5%E4%BA%BA%E6%B8%A0%E9%81%93%E6%98%8E%E7%BB%86%E8%A1%A8-%E6%9D%A5%E4%BA%BA&_t=1572178075188'"
            target='_blank'>
            YS09 来人渠道明细表-来人</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=53d7c493-5f5d-498a-9bb5-3d8b2ca71940&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS09%20%E6%9D%A5%E4%BA%BA%E6%B8%A0%E9%81%93%E6%98%8E%E7%BB%86%E8%A1%A8-%E6%9D%A5%E4%BA%BA&_t=1572178082164'"
            target='_blank'>
            YS09-2 来人渠道明细表-来人</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=7e43aef7-4657-4445-954c-f0a1041b4407&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS10%20%E6%88%BF%E9%97%B4%E6%98%8E%E7%BB%86%E8%A1%A8-%E6%89%80%E6%9C%89&_t=1572178092149'"
            target='_blank'>
            YS10 房间明细表-所有</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=f991c750-3725-4a37-bc9f-2faf60753b4c&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS10%20%E6%88%BF%E9%97%B4%E6%98%8E%E7%BB%86%E8%A1%A8-%E6%89%80%E6%9C%89%EF%BC%88%E9%9B%86%E5%9B%A2%EF%BC%89&_t=1572178100285'"
            target='_blank'>
            YS10 房间明细表-所有（集团）</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=bed16531-f30a-4ebe-b6f2-c40c5c7af63c&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS11%20%E9%94%80%E5%94%AE%E6%97%A5%E6%8A%A5%E8%A1%A8(%E8%AE%A4%E8%B4%AD)&_t=1572178108744'"
            target='_blank'>
            YS11 销售日报表(认购)</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=8bd62cda-0b21-4462-8456-39105ec3f67f&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS12%20%E9%94%80%E5%94%AE%E6%97%A5%E6%8A%A5%E8%A1%A8(%E7%AD%BE%E7%BA%A6)&_t=1572178115521'"
            target='_blank'>
            YS12 销售日报表(签约)</a>
        </el-col>
      </el-row>
      <div class="title">
        <h3 >新开发客户分析报表</h3>
      </div>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=69c843b7-a2d5-4beb-98c1-334fa98f459c&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS13%20%E9%94%80%E5%94%AE%E6%9C%88%E5%BA%A6%E5%AE%8C%E6%88%90%E7%8E%87&_t=1572178121259'"
            target='_blank'>
            YS13 销售月度完成率</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=69c843b7-a2d5-4beb-98c1-334fa98f459c&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS13%20%E9%94%80%E5%94%AE%E6%9C%88%E5%BA%A6%E5%AE%8C%E6%88%90%E7%8E%87&_t=1572178128698'"
            target='_blank'>
            YS14 销售年度完成率</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=6deab736-9c54-477e-af08-b247c88f9089&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS15%20%E9%94%80%E5%94%AE%E6%97%A5%E6%8A%A5%EF%BC%88%E6%96%87%E5%AD%97%E6%97%A5%E6%8A%A5%EF%BC%89&_t=1572178151714'"
            target='_blank'>
            YS15 销售日报（文字日报）</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=c25de35e-b7ab-446c-a4d0-5ee5febb14e3&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS16%20%E5%AE%A2%E6%88%B7%E6%88%BF%E6%BA%90%E7%BB%9F%E8%AE%A1%E8%A1%A8&_t=1572178167850'"
            target='_blank'>
            YS16 客户房源统计表 </a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=59437ebd-f0ca-410a-b010-7af256b4c6b2&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS16-2%20%E5%AE%A2%E6%88%B7%E6%88%BF%E6%BA%90%E7%BB%9F%E8%AE%A1%E8%A1%A8&_t=1572178176028'"
            target='_blank'>
            YS16-2 客户房源统计表</a>
        </el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=ee38e198-2ea0-4464-80be-76f9410c7dcc&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS17%20%E8%B4%A8%E9%87%8F%E7%8E%87%E5%80%BC%E8%A1%A8&_t=1572178185974'"
            target='_blank'>
            YS17 质量率值表</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=6ce3020b-28b2-40a7-a96f-8405ba104d57&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS18%20%E9%94%80%E6%8E%A7%E7%AE%A1%E7%90%86%E6%98%8E%E7%BB%86%E8%A1%A8&_t=1572178192451'"
            target='_blank'>
            YS18 销控管理明细表</a></el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=bf7b157e-7a95-4766-836a-5d2b93fa5509&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS19%20%E9%80%BE%E6%9C%9F%E5%BA%94%E6%94%B6%E6%AC%BE%E6%98%8E%E7%BB%86%E8%A1%A8&_t=1572178199059'"
            target='_blank'>
            YS19 逾期应收款明细表</a></el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=a2a6488e-cd24-4c76-9e0a-aa9f7fcf5637&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS20%20%E5%91%98%E5%B7%A5%E8%B4%AD%E6%88%BF%E6%98%8E%E7%BB%86%E8%A1%A8&_t=1572178206918'"
            target='_blank'>
            YS20 员工购房明细表</a></el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=887b3faa-236e-42d8-8c61-fded1b6f241e&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS21%20%E6%A5%BC%E6%A0%8B%E5%8E%BB%E5%8C%96%E7%8E%87%E6%8A%A5%E8%A1%A8&_t=1572178213177'"
            target='_blank'>
            YS21 楼栋去化率报表</a></el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=cb33ec81-e384-4bc1-9aa0-87f2db47f1c2&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS22%20%E9%9D%A2%E7%A7%AF%E5%88%86%E6%9E%90%E6%8A%A5%E8%A1%A8-%E5%B7%B2%E5%8F%96%E8%AF%81%E9%9D%A2%E7%A7%AF%E6%AE%B5%E5%8E%BB%E5%8C%96%E5%88%86%E6%9E%90&_t=1572178220407'"
            target='_blank'>
            YS22 面积分析报表-已取证面积段去化分析</a></el-col>
        <el-col :span='8'>
          <img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=2b2fae45-b9a5-48aa-abd2-219a18832542&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS22%20%E9%9D%A2%E7%A7%AF%E5%88%86%E6%9E%90%E6%8A%A5%E8%A1%A8-%E6%95%B4%E7%9B%98%E9%9D%A2%E7%A7%AF%E6%AE%B5%E5%8E%BB%E5%8C%96%E5%88%86%E6%9E%90&_t=1572178226649'"
            target='_blank'>
            YS22 面积分析报表-整盘面积段去化分析</a></el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'><img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=b85ac0e6-fcd6-4d8e-bcba-0294064c560d&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=YS23%E9%A6%96%E4%BB%98%E5%88%86%E6%9C%9F%E5%8F%B0%E8%B4%A6%E6%98%8E%E7%BB%86%E8%A1%A8&_t=1572178232683'"
            target='_blank'>
            YS23首付分期台账明细表</a>
        </el-col>
        <el-col :span='8'><img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=fad22127-acb8-4e4b-a9a3-0d63930ab85f&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=%E5%85%A8%E5%8F%A3%E5%BE%84%E9%94%80%E5%94%AE%E6%97%A5%E6%8A%A5%EF%BC%88%E6%96%87%E5%AD%97%E6%97%A5%E6%8A%A5%EF%BC%89&_t=1572178239425'"
            target='_blank'>
            全口径销售日报（文字日报）</a>
        </el-col>
        <el-col :span='8'><img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=962ebd67-bc23-4eaa-9365-487209795600&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=%E5%85%A8%E5%8F%A3%E5%BE%84%E9%94%80%E5%94%AE%E6%97%A5%E6%8A%A5%EF%BC%88%E6%96%87%E5%AD%97%E6%97%A5%E6%8A%A5%EF%BC%89-%E8%B0%83%E6%95%B4%E5%90%8E&_t=1572178245468'"
            target='_blank'>
            全口径销售日报（文字日报）-调整后</a>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span='8'><img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=b83139d4-b93a-4b4e-b949-aa0a98e97192&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=%E8%90%A5%E9%94%80%E5%91%A8%E8%AE%A1%E5%88%92%E8%A1%A8&_t=1572178252831'"
            target='_blank'>
            营销周计划表</a>
        </el-col>
        <el-col :span='8'><img src="../../assets/images/临时_20191029151910.png" alt="">
          <a @click.prevent="openWindow" :href="''+myurl+'/Report/Preview/RptPreview.aspx?appCode=0011&rptRights=1111&FunctionCode=00119901&rptGuid=cffb37c4-1fff-4177-920e-ba8d130d73bd&userGuid=27985fba-2e7d-e911-80bc-005056a21b76&rptName=%E6%9C%88%E5%BA%A6%E6%8C%87%E6%A0%87%E6%8B%9F%E5%AE%9A&_t=1572178258773'"
            target='_blank'>
            月度指标拟定</a>
        </el-col>
        <!-- <el-col :span='8'><img src="../../assets/images/临时_20191029151910.png" alt="">
        <a  @click.prevent="openWindow" :href="'https://finereport.cifi.com.cn/webroot/decision/view/report?viewlet=xuhui%252F%25E5%2585%25A8%25E5%258F%25A3%25E5%25BE%2584%25E8%2590%25A5%25E9%2594%2580%25E6%2597%25A5%25E6%258A%25A5_xRay.cpt&userId='+userName+''" target='_blank'>
        全口径销售日报</a></el-col> -->
        <!-- <el-col :span='8'><img src="../../assets/images/临时_20191029151910.png" alt="">
          <a  @click.prevent="openWindow" :href="'https://finereport.cifi.com.cn/webroot/decision/view/report?viewlet=xuhui%252F%25E6%259D%25A5%25E4%25BA%25BA%25E6%25B8%25A0%25E9%2581%2593%25E6%2598%258E%25E7%25BB%2586%25E8%25A1%25A8-%25E6%259D%25A5%25E4%25BA%25BA.cpt&userId='+userName+'&op=view'" target='_blank'>
          来人渠道表-来人</a>
        </el-col> -->
      </el-row>
    </div>
    <iframe name="frame" :src="myurl" frameborder="0" style="width:0;height:0;">
    </iframe>
    <iframe name="frame" src="/my/" frameborder="0" style="width:0;height:0;">
    </iframe>
  </div>
</template>

<script>
  var localurl = location.href;
  var myurl = "http://sales-test.cifi.com.cn:9060";
  if (localurl.indexOf("salesmgt.cifi.com.cn") != -1) {
    myurl = "http://sales.cifi.com.cn:9060";
  }
  import {
    get,sendJSON
  } from '@/api/request'
  export default {
    name: 'reportForms',
    data() {
      return {
        userName: localStorage.getItem('username'),
        testName: '/PubPlatform/Nav/Home/Default.aspx',
        myurl: myurl,
      }
    },
    created() {
      sendJSON("/report/getAuthorizationData",{UserId:localStorage.getItem('id')}).then(res=>{
        console.log(res);
      })
    },
    methods: {
      openWindow(event, width, height) {
        let url = event.target.href;
        console.log(url);
        width = width || window.screen.width;
        height = height || window.screen.height;
        var left = (window.screen.width - width) / 2;
        var top = (window.screen.height - height) / 2;
        window.open(url, "_blank",
          "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, left=" +
          left + ", top=" + top + ", width=" + width + ", height=" + height);
      }
    }
  }
</script>
<style lang='less' scoped>
  .reportForms {
    padding: 10px;

    .title {
      text-align: left;
      font-size: 16px;
      font-weight: bold;
      padding: 10px 20px;
      padding-left: 0;
      margin-top: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #EBEEF5;
      text-indent: 1em;
      h3{
        font-size: 16px;
        border-left:3px solid #2661FF;
      }
    }

    .el-col-8 {
      padding-left: 3% !important;
    }

    a {
      font-size: 13px;
      display: inline-block;
      text-align: center;
      border-radius: 3px;
      width: 100%;
      height: 35px;
      line-height: 35px;
      vertical-align: middle;
      margin: 12px 0;
      border: 1px solid #ccc;
    }

    .fromList {
      padding: 10px 20px;
      box-shadow: 0 0 3px #ccc;
      background-color: #fff;
    }

    img {
      width: 18px;
      height: 18px;
      display: none;
    }
  }
</style>
