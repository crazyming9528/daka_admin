<template>
  <div class="app-container">

    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          @click="handleSearchList()"
          size="small"
          style="float: right"
          type="primary">
          查询结果
        </el-button>
        <el-button
          @click="handleResetSearch()"
          size="small"
          style="float: right;margin-right: 15px">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" label-width="140px" size="small">
          <el-form-item label="用户名称：">
            <el-input placeholder="用户名称" style="width: 203px" v-model="listQuery.username"></el-input>
          </el-form-item>
          <el-form-item label="用户ID：">
            <el-input placeholder="用户ID" style="width: 203px" v-model="listQuery.userid"></el-input>
          </el-form-item>
          <el-form-item label="用户状态：">
            <el-select clearable placeholder="选择用户状态" v-model="listQuery.status">
              <el-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-for="item in statusRule">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>CMS用户列表</span>
      <el-button
        @click="handleRefresh()"
        class="btn-add"
        size="mini">
        刷新
      </el-button>
      <el-button
        @click="handleAddOperator()"
        class="btn-add"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableDataSource"
                @selection-change="handleSelectionChange"
                border
                ref="productTable"
                style="width: 100%"
                v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="ID" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>

        <el-table-column align="center" label="用户名">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column align="center" label="真实姓名">
          <template slot-scope="scope">
            {{scope.row.realName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色">
          <template slot-scope="scope">
            {{scope.row.role}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">禁用状态</span>
            <span v-if="scope.row.status==1">启用状态</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="最后一次登录时间" width="150">
          <template slot-scope="scope">
            <!--            {{scope.row.create_time}}-->
            {{scope.row.lastlogin}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="150">
          <template slot-scope="scope">
            <!--            {{scope.row.create_time}}-->
            {{scope.row.lastUpdatedAt}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template slot-scope="scope">
            <p>
              <el-button
                @click="handleShowOperator(scope.$index, scope.row)"
                size="mini">查看
              </el-button>
              <el-button
                @click="handleUpdateOperator(scope.$index, scope.row)"
                size="mini">编辑
              </el-button>
            </p>
            <p>
              <el-button
                @click="handleDelete(scope.$index, scope.row)"
                size="mini"
                type="danger">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        placeholder="批量操作"
        size="small" v-model="operateType">
        <el-option
          :key="item.value"
          :label="item.label"
          :value="item.value"
          v-for="item in operates">
        </el-option>
      </el-select>
      <el-button
        @click="handleBatchOperate()"
        class="search-button"
        size="small"
        style="margin-left: 20px"
        type="primary">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        :current-page.sync="tableMixin_currentPage"
        :page-size="tableMixin_pageSize"
        :page-sizes="tableMixin_pageSizeArr"
        :total="tableMixin_total"
        @current-change="tableMixin_handleCurrentChange"
        @size-change="tableMixin_handleSizeChange"
        background
        layout="total, sizes,prev, pager, next,jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import tableMixin from "@/mixin/tableMixin";
    import {fetchAdminList} from '@/api/dk_admin'

    export default {
        name: "index",
        components: {},
        mixins: [tableMixin],
        props: {},
        data() {
            return {
                tableDataSource: [],
                listQuery: {
                    username: null,
                    userid: null,
                    status: null,
                },
                statusRule: [
                    {
                        value: 1,
                        label: "全部",
                    },
                    {
                        value: 2,
                        label: "正常",
                    },
                    {
                        value: 3,
                        label: "封禁",
                    }
                ],
                operateType: null,
                operates: [
                    {
                        label: "删除",
                        value: "delete"
                    },
                    {
                        label: "禁用",
                        value: "ban"
                    },
                    {
                        label: "启用",
                        value: "recover"
                    },
                ],
                multipleSelection: []
            }
        },
        watch: {},
        computed: {},
        methods: {

            getTableDataSource() {
                const params = Object.assign({
                    pageSize: this.tableMixin_pageSize,
                    pageNum: this.tableMixin_currentPage,
                }, this.listQuery);

                fetchAdminList(params).then(result => {
                    const {code, data, message} = result;
                    if (code === 200) {
                        this.tableDataSource = data.records;
                        this.tableMixin_total = data.total;
                    }
                    console.log(result, 33333);
                })


            },
            handleBatchOperate() {
                console.log('执行批处理');
            },
            handleSearchList() {
                this.listQuery.pageNum = 1;
                this.getTableDataSource();
            },
            handleResetSearch() {
                this.selectProductCateValue = [];
                this.listQuery = Object.assign({}, defaultListQuery);
            },
            handleAddOperator() {
                // this.$router.push({path:'/pms/addProduct'});
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleUpdateOperator() {

            },
            handleRefresh() {
                this.getTableDataSource();
            },
            handleShowOperator(data) {

            },

            handleDelete(index, row) {
                this.$confirm('是否要进行删除操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // let ids = [];
                    // ids.push(row.id);
                    // this.updateDeleteStatus(1,ids);
                });
            },
        },
        created() {
            this.getTableDataSource();
        },
        mounted() {
        },
    }
</script>

<style lang='scss' scoped>
  .app-container {
    width: 90%;
    margin: 30px auto;
  }
</style>
