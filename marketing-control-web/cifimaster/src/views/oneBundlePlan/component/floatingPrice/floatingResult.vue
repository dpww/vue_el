<template>
  <el-table :data="value.pricingResult">
    <el-table-column label="价格调整对象" prop="priceAdObject"></el-table-column>
    <el-table-column label="调整货量（㎡）" prop="priceAdCargo"></el-table-column>
    <el-table-column label="当前均价（元/㎡）" prop="priceAdAvg"></el-table-column>
    <el-table-column label="申请均价（元/㎡）" prop="priceAdsqAvg"></el-table-column>
    <el-table-column label="调整前货值（万元）" prop="priceAdbeforeCargo"></el-table-column>
    <el-table-column label="调整后货值（万元）" prop="priceAdafterCargo"></el-table-column>
    <el-table-column label="货值差异（万元）" prop="priceAdDiff"></el-table-column>
  </el-table>
</template>
<script>
  export default {
      name: "floatingResult",
      created() {

      },
      props: {
        value: {
          type: Object,
          default: () => ({})
        }
      },
      data() {
        return {}
      }
    }
  </script>
</script>
<style>
</style>
