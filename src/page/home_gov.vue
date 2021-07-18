
<template>
    <div>
        <el-row style="height: 60px">
            <el-menu
                :default-active="defaultActive"
                mode="horizontal"
                @select="handleSelect"
                style= "background:#faeeee;"
                theme="light"
                router>
                <el-col :span="22">
                    <el-menu-item index="home_gov">首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">查询</template>
                        <el-menu-item index="sensorQuery">水质信息</el-menu-item>
                        <el-menu-item index="fact_info">工厂信息</el-menu-item>
                        <el-menu-item index="creditQuery">积分信息</el-menu-item>
                        <el-menu-item index="gov_Listsensor">积分信息</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">修改</template>
                        <el-menu-item index="createFactory">创建工厂</el-menu-item>
                        <el-menu-item index="add_sensor">传感器</el-menu-item>
                        <el-menu-item index="incCredit">积分</el-menu-item>
                    </el-submenu>
                </el-col>
                <el-col :span="2">
                    <el-dropdown @command="handleCommand" menu-align='start'>
                        <img :src="baseImgPath + adminInfo.avatar" class="avator">
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="home_gov">首页</el-dropdown-item>
                            <el-dropdown-item command="signout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-menu>
        </el-row>
        <el-row>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-row>
    </div>
</template>

<script>
import Vue from 'vue';
import headTop from '@/components/headTop'
import '@/router/index'
import {setStore} from '@/config/mUtils'
import {baseImgPath} from '@/config/env'
import {mapActions, mapState} from 'vuex'
import {mapMutations} from 'vuex';
export default {
    data(){

        return {
            baseImgPath,
        }
    },
    created(){
        if (!this.adminInfo.id) {
            this.getAdminData()
        }
    },
    computed: {
        defaultActive: function(){
            return this.$route.path.replace('/', '');
        },
        ...mapState(['adminInfo']),
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        ...mapActions(['getAdminData']),
        ...mapMutations(['changeLogin']),
        async handleCommand(command) {
            if (command == 'home') {
                this.$router.push('/home_gov');
            }else if(command == 'signout'){
                const status = 1;
                this.changeLogin({ Authorization: ""});
                if (status == 1) {
                    this.$message({
                        type: 'success',
                        message: '退出成功'
                    });
                    this.$router.push('/');
                }else{
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            }
        },
    }
}
</script>

<style>

.el-card{
    background:#fbfbfb;
    width: 300px;
    display: inline-block;
    margin: 0.3em;
    border-radius:20px;
}
.grid-content {
    /* background: rgb(14, 214, 131); */
    border-radius: 4px;
    min-height: 80px;
}
.text {
    font-size: 14px;
}
.item {
    padding: 18px 0;
}
.header-h2{
    color:#d1d1d1 ;
}
.header-h2:hover{
    color:#fff ;
}
.row-header{
    background:#409eff;
}

.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    #line-height: 160px;
}
</style>
