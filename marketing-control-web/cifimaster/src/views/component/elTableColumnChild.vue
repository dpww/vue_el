<template>
  <el-table-column :label="theadItem.label" :width="theadItem.width" :prop="theadItem.name" :align="theadItem.align||'center'"
    :header-align="theadItem.headAlign||'center'">
    <template v-if="hasChild(theadItem)">
      <el-table-column-child v-for="(item,index) in theadItem.child" :theadItem="item" :key="index"></el-table-column-child>
    </template>
    <template slot-scope="scope">
      <y-input v-if="!hasChild(theadItem)" :values="scope.row" :form_item="theadItem" :params="{index:scope.$index,value:scope.row,data:tabledata}"></y-input>
    </template>
  </el-table-column>
</template>
<script>
  export default {
    name: 'elTableColumnChild',
    components: {
      yInput:()=>import('./input.vue')
    },
    props: {
      theadItem: {
        type: Object,
        default: () => {}
      },
      tabledata:{
        type:Array,
        default:()=>{}
      }
    },
    methods: {
      hasChild(item) {
        return item.child && item.child.length > 0;
      }
    }
  }
</script>

<style>
</style>
