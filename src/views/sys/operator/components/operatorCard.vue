<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="form" label-width="80px" ref="form">
      <el-form-item label="用户名">
        <el-input :disabled="!edit" class="paramInput" v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input :disabled="!edit" class="paramInput" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input :disabled="!edit" class="paramInput" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
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

      <el-form-item :disabled="!edit">
        <el-button @click="submit" size="small" type="primary">确定</el-button>
      </el-form-item>

    </el-form>
  </el-card>


</template>

<script>
    import {Message} from 'element-ui'

    const operatorFields = {
        delFlag: 0,
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
                    this.$emit('update', this.form);
                } else {
                    if (this.form.password === this.form.password2 && this.form.password !== '') {
                        this.$emit('register', this.form);
                    } else {
                        Message({
                            message: '键入的密码存在错误',
                            type: 'error',
                            duration: 3 * 1000
                        })
                    }
                }

            }
        },
        created() {
            const {operator_id} = this;
        },
        mounted() {
        },
    }
</script>

<style lang='scss' scoped>

  .form-container {
    text-align: center;
  }

  .paramInput {
    width: 250px;
  }
</style>
