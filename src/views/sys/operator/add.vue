<template>
  <div class="wrapper">
    <operatorCard :edit="true" @register="addOperator"></operatorCard>
  </div>
</template>

<script>
    import { Message, MessageBox } from 'element-ui'
    import operatorCard from "./components/operatorCard";
    import {adminRegister} from '@/api/dk_admin'
    // import {adminRegister} from '../../../api/dk_admin'
    export default {
        name: "add",
        components: {operatorCard},
        props: {},
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {
            addOperator(data) {
                adminRegister(data).then(result => {
                    const {code, data, message} = result;
                    if (code===200){
                        Message({
                            message: message,
                            type: 'success',
                            duration: 3 * 1000
                        })
                    }
                })

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
