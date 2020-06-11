 <template>
  <div class="settlementAudit">
    <p>是否审核通过此核算单？</p>
    <!-- <div>
    <el-radio v-model="mainData.auditRadio" label="1">审核通过</el-radio>
    </div>
    <div>
    <el-radio v-model="mainData.auditRadio" label="0">驳回</el-radio>
    </div> -->
  </div>
</template>

 <script>
export default {
    props:{
    mainData: {
        type: Object,
        dafault: {}
    },
  },
  watch:{
    mainData:{
        handler(newv){
        },
        deep:true
      },
  },
};
</script>

 <style lang="less" scoped>
 .settlementAudit{
   display: flex;

   p{
     text-align: center;
   }
 }
</style>
