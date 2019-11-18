<template>
  <div class="wrapper">

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
        @click="handleAddUser()"
        class="btn-add"
        size="mini">
        刷新
      </el-button>
      <el-button
        @click="handleAddUser()"
        class="btn-add"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list"
                @selection-change="handleSelectionChange"
                border
                ref="productTable"
                style="width: 100%"
                v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="ID" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>

        <el-table-column align="center" label="用户名" >
          <template slot-scope="scope"><img :src="scope.row.pic" style="height: 80px"></template>
        </el-table-column>
        <el-table-column align="center" label="真实姓名">
          <template slot-scope="scope">
            {{scope.row.realName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色" >
          <template slot-scope="scope">
            {{scope.row.role}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" >
          <template slot-scope="scope">
            {{scope.row.role}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="150">
          <template slot-scope="scope">
           {{scope.row.create_time}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template slot-scope="scope">
            <p>
              <el-button
                @click="handleShowProduct(scope.$index, scope.row)"
                size="mini">查看
              </el-button>
              <el-button
                @click="handleUpdateProduct(scope.$index, scope.row)"
                size="mini">编辑
              </el-button>
            </p>
            <p>
              <el-button
                @click="handleShowLog(scope.$index, scope.row)"
                size="mini">日志
              </el-button>
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

  </div>
</template>

<script>

    const defaultListQuery = {
        username: null,
        userid: null,
        pageNum: 1,
        pageSize: 5,
        status: null,
    };
    export default {
        name: "index",
        components: {},
        props: {},
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
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
                multipleSelection: []
            }
        },
        watch: {},
        computed: {},
        methods: {
            handleSearchList() {
                this.listQuery.pageNum = 1;
                this.getList();
            },
            handleResetSearch() {
                this.selectProductCateValue = [];
                this.listQuery = Object.assign({}, defaultListQuery);
            },
            handleAddUser() {
                // this.$router.push({path:'/pms/addProduct'});
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        },
        created() {
        },
        mounted() {
        },
    }
</script>

<style lang='scss' scoped>
  .wrapper {
    width: 90%;
    margin: 30px auto;
  }
</style>
