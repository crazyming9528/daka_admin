<template>
    <div class="app-container">


      <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="handleSearchList()"
            type="primary"
            size="small">
            查询结果
          </el-button>
          <el-button
            style="float: right;margin-right: 15px"
            @click="handleResetSearch()"
            size="small">
            重置
          </el-button>
        </div>

        <div class="parameter" style="margin-top: 15px">
          <el-form :inline="true" :model="queryParameters" size="small" label-width="140px">
            <el-form-item label="输入用户名：">
              <el-input style="width: 203px" v-model="queryParameters.username" placeholder="商品名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

    </div>
</template>

<script>

    const defaultQueryParameters = {
        username: null,
        pageNum: 1,
        pageSize: 5,
    };
    export default {
        name: "permission",
        components: {},
        props: {},
        data() {
            return {
                queryParameters:Object.assign({},defaultQueryParameters)
            }
        },
        watch: {},
        computed: {},
        methods: {},
        created() {
        },
        mounted() {
        },
    }
</script>

<style lang='scss' scoped>
    .wrapper {
    }
</style>
