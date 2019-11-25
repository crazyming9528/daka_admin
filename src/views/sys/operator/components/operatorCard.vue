<template>
  <el-card class="form" shadow="never">
    <el-form :model="form" label-width="80px" ref="form">
      <el-form-item label="用户名">
        <el-input :disabled="!edit" class="paramInput" v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input :disabled="!edit" class="paramInput" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" v-if="!this.operator_id && edit">
        <el-input :disabled="!edit" class="paramInput" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" v-if="!this.operator_id && edit">
        <el-input :disabled="!edit" class="paramInput" v-model="form.password2"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input :disabled="!edit" class="paramInput" v-model="form.note"></el-input>
      </el-form-item>
      <el-form-item label="状态">

        <el-select :disabled="!edit" class="paramInput" placeholder="请选择账号状态" v-model="form.status">
          <el-option :value="0" label="禁用"></el-option>
          <el-option :value="1" label="启用"></el-option>
        </el-select>
      </el-form-item>


    </el-form>
    <div v-if="edit">
      <el-button @click="submit" size="small" type="primary">确定</el-button>
      <el-button @click="edit = false" size="small">取消</el-button>
    </div>

    <div v-else>
      <el-button @click="edit = true" size="small">编辑</el-button>
    </div>
  </el-card>


</template>

<script>
    import {Message} from 'element-ui'
    import {adminRegister, fetchAdmDetail, updateAdmin} from "@/api/dk_admin";

    const operatorFields = {
        delFlag: 1,//0 删除   1  未删除
        email: "",
        icon: "",
        id: 0,
        lastUdatedAt: "",
        note: "",
        password: "",
        password2: "",
        status: 1,
        userName: ""
    };

    export default {
        name: "operatorCard",
        components: {},
        props: {
            operator_id: {
                type: Number,
                default: 0,
                required: false
            }, //用户id
            edit: {
                type: Boolean,
                default: false,
            },// 编辑状态
        },
        data() {
            return {
                form: _.cloneDeep(operatorFields),//表单
            }
        },
        watch: {},
        computed: {},
        methods: {
            submit() {
                if (this.operator_id) {
                    this.editOperator(this.form);
                } else {
                    if (this.form.password === this.form.password2 && this.form.password !== '') {
                        // this.$emit('register', this.form);
                        this.addOperator(this.form);
                    } else {
                        Message({
                            message: '键入的密码存在错误',
                            type: 'error',
                            duration: 3 * 1000
                        })
                    }
                }

            },
            getOperatorDetail(id) {

                fetchAdmDetail(id).then(result => {
                    const {code, data, message} = result
                    if (code === 200) {
                        this.form = data;
                    }
                })

            },
            addOperator(data) {
                adminRegister(data).then(result => {
                        const {code, data, message} = result;
                        if (code === 200) {
                            Message({
                                message: message,
                                type: 'success',
                                duration: 3 * 1000
                            })
                        }
                        this.$emit('finish');
                    }
                );
            },
            editOperator(data) {
                updateAdmin(this.operator_id, data).then(result => {
                    const {code, data, message} = result;
                    if (code === 200) {
                        Message({
                            message: message,
                            type: 'success',
                            duration: 3 * 1000
                        })
                    }
                    this.$emit('finish');
                })
            }
        },
        created() {
            console.log(656);
            const {operator_id} = this;
            if (operator_id) {
                this.getOperatorDetail(operator_id);
            }
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
