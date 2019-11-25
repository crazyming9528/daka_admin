<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>CMS权限列表</span>
      <el-button
        @click="handleRefresh()"
        class="btn-refresh btn-r"
        size="mini">
        刷新
      </el-button>
      <el-button
        @click="handleAddPermission()"
        class="btn-add btn-r"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableDataSource"
                @selection-change="handleSelectionChange"
                border
                ref="productTable"
                stripe
                style="width: 100%"
                v-loading="tableLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="#" type="index" width="50">
        </el-table-column>
        <el-table-column align="center" label="角色ID" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>

        <el-table-column align="center" label="角色名">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column align="center" label="拥有的权限">
          <template slot-scope="scope">
            {{scope.row.role}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述">
          <template slot-scope="scope">
            {{scope.row.role}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="350">
          <template slot-scope="scope">
            <p>
              <el-button
                @click="handleShowOperator(scope.$index, scope.row.id)"
                size="mini">查看
              </el-button>
              <el-button
                @click="handleUpdateOperator(scope.$index, scope.row.id)"
                size="mini">编辑
              </el-button>
              <el-button
                @click="handleUpdateRole(scope.$index, scope.row.id)"
                size="mini">更改角色
              </el-button>
              <el-button
                @click="handleDelete(scope.$index, scope.row.id)"
                size="mini"
                type="danger">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
        components: {},
        props: {},
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {
            handleRefresh() {

            },
            handleAddPermission() {

            }
        },
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
