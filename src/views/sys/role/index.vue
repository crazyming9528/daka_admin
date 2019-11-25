<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>CMS角色列表</span>
      <el-button
        @click="handleRefresh()"
        class="btn-refresh btn-r"
        size="mini">
        刷新
      </el-button>
      <el-button
        @click="handleAddRole()"
        class="btn-add btn-r"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableDataSource"
                border
                ref="productTable"
                stripe
                style="width: 100%"
                v-loading="tableLoading">
        <el-table-column align="center" label="#" type="index" width="50">
        </el-table-column>
        <el-table-column align="center" label="角色ID" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>

        <el-table-column align="center" label="角色名">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <!--        <el-table-column align="center" label="拥有的权限">-->
        <!--          <template slot-scope="scope">-->
        <!--            {{scope.row.role}}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column align="center" label="描述">
          <template slot-scope="scope">
            {{scope.row.description}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">禁用状态</span>
            <span v-if="scope.row.status==1">启用状态</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="350">
          <template slot-scope="scope">
            <p>
              <el-button
                @click="handleEditRole(scope.$index,scope.row.id)"
                size="mini">编辑
              </el-button>
              <el-button
                @click="handleUpdateRole(scope.$index, scope.row.id)"
                size="mini">设置权限
              </el-button>
              <el-button
                @click="handleDelete(scope.row.id)"
                size="mini"
                type="danger">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :title="roleDialog.dialogTitle"
      :visible.sync="roleDialog.display">
      <div class="dialog_body form">
        <el-form :model="roleForm" label-width="80px" ref="form">
          <el-form-item label="用户名">
            <el-input class="paramInput" v-model="roleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="描述">
            <el-input class="paramInput" v-model="roleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="状态">

            <el-select class="paramInput" placeholder="请选择账号状态" v-model="roleForm.status">
              <el-option :value="0" label="禁用"></el-option>
              <el-option :value="1" label="启用"></el-option>
            </el-select>
          </el-form-item>


        </el-form>

        <div>
          <el-button @click="handleSaveRole" size="small" type="primary">确定</el-button>
          <el-button @click="roleDialog.display = false" size="small">取消</el-button>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {createRole, deleteRoles, fetchRoleList, updateRole} from "../../../api/dk_role";

    const roleFormDefaultValue = {
        name: "",
        description: "",
        status: 1,
    };
    export default {
        name: "index",
        components: {},
        props: {},
        data() {
            return {
                roleDialog: {
                    display: false,//是否显示
                    dialogTitle: "",//dialog 标题
                    currentRole: null,//当前正在处理的角色
                },
                tableLoading: true,
                tableDataSource: [],
                roleForm: _.cloneDeep(roleFormDefaultValue),//表单
            }
        },
        watch: {},
        computed: {},
        methods: {
            getTableDataSource() {
                this.tableLoading = true;
                fetchRoleList({}).then(result => {
                    const {code, data, message} = result;
                    if (code === 200) {
                        this.tableDataSource = data
                    }
                }).finally(() => {
                    this.tableLoading = false;
                })


            },
            handleRefresh() {

                this.getTableDataSource();

            },
            handleAddRole() {
                this.roleDialog.currentRole = null;
                this.roleForm = _.cloneDeep(roleFormDefaultValue);
                this.roleDialog.dialogTitle = '添加新角色';
                this.roleDialog.display = true;
            },
            handleEditRole(index, id) {
                this.roleDialog.currentRole = id;
                const temp = this.tableDataSource[index];
                for (let p in temp) {
                    if (temp.hasOwnProperty(p) && Object.keys(roleFormDefaultValue).includes(p)) {
                        this.roleForm[p] = temp[p];
                    }
                }
                this.roleDialog.dialogTitle = '修改角色基础信息';
                this.roleDialog.display = true;

            },
            handleSaveRole() {

                if (this.roleDialog.currentRole) {
                    //更新
                    updateRole(this.roleDialog.currentRole, this.roleForm).then(result => {
                        const {code, data, message} = result;
                        if (code === 200) {
                            this.roleDialog.display = false;
                            this.handleRefresh();
                        }
                    });


                } else {
                    //新建

                    createRole(this.roleForm).then(result => {
                        const {code, data, message} = result;
                        if (code === 200) {
                            this.roleDialog.display = false;
                            this.handleRefresh();
                        }
                    });


                }


            },
            handleDelete(id) {

                this.$confirm('是否要进行删除操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const temp = [];
                    temp.push(id);
                    deleteRoles(temp).then(result => {
                        this.roleDialog.display = false;
                        this.handleRefresh();
                    })
                })

            }

        },
        created() {
            this.getTableDataSource();
        },
        mounted() {
        },
    }
</script>

<style lang='scss' scoped>

  .form-container, .form {
    text-align: center;
  }

  .paramInput {
    width: 250px;
  }
</style>
