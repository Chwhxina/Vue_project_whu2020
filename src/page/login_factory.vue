<template>
    <div class="login_page fillcontain">
        <el-container>
            <el-main>
                <transition name="form-fade" mode="in-out">
                    <section class="form_contianer" v-show="showLogin">
                        <div class="manage_tip" style="opacity: initial">
                            <p>武大蚂蚁链食品朔源系统</p>
                        </div>
                        <el-row :gutter="5">
                            <el-col :span="6" type="flex" ><router-link to="/"><div class="grid-content bg-purple">用户</div></router-link></el-col>
                            <el-col :span="6" type="flex"><router-link to="/login_factory"><div class="grid-content bg-purple-dark">工厂</div></router-link></el-col>
                            <el-col :span="12" type="flex"><router-link to="/login_gov"><div class="grid-content bg-purple">政府</div></router-link></el-col>
                        </el-row>

                        <el-form :model="loginForm" :rules="rules" ref="loginForm">
                            <el-form-item prop="username"  >
                                <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
                            </el-form-item>
                        </el-form>
                    </section>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import {login} from '@/api/getData'
import {mapActions, mapState} from 'vuex'
import {mapMutations} from 'vuex';

export default {
    data(){
        return {
            loginForm: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            },
            showLogin: false,
        }
    },
    mounted(){
        this.showLogin = true;
    },
    computed: {
    },
    methods: {
        ...mapMutations(['changeLogin']),
        async submitForm(formName) {
            let _this = this;
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    login({name: this.loginForm.username, password: this.loginForm.password})
                        .then(res => {
                            if (res.rspCode == '000000') {
                                this.$message({
                                    type: 'success',
                                    message: '登录成功'
                                });
                                console.log(res.rspData.token);
                                _this.changeLogin({ Authorization: res.rspData.token});
                                this.$router.push('home');
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.rspMsg
                                });
                            }
                        });
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '请输入正确的用户名密码',
                        offset: 100
                    });
                    return false;
                }
            });
        },
    }
}
</script>
<style lang="less" scoped>
@import '../style/mixin';
.login_page{
    background-image: url("../assets/img/background.jpeg");
}
.manage_tip{
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p{
        font-size: 34px;
        color: #fff;
    }
}
.form_contianer{
    .wh(350px, 220px);
    .ctp(-500px, 220px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #dee0e0;
    .submit_btn{
        width: 100%;
        font-size: 16px;
    }
    //opacity: 30%;
}
.tip{
    font-size: 12px;
    color: red;
}
.form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
}
.form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
