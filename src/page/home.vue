
<template>
    <el-container>
        <el-row style="height: 60px">
            <el-menu
                :default-active="defaultActive"
                mode="horizontal"
                @select="handleSelect"
                style= "background:#faeeee;"
                theme="light"
                router>
                <el-col :span="22">
                <el-menu-item index="home">首页</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">查询</template>
                    <el-menu-item index="water_info">水质信息</el-menu-item>
                    <el-menu-item index="fact_info">工厂信息</el-menu-item>
                    <el-menu-item index="credit_info">积分信息</el-menu-item>
                    <el-menu-item index="sensorQuery">传感器</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">添加</template>
                    <el-menu-item index="add_gov">政府</el-menu-item>
                    <el-menu-item index="add_fact">工厂</el-menu-item>
                    <el-menu-item index="sensorQuery">传感器</el-menu-item>
                </el-submenu>
                </el-col>
                <head-top></head-top>
            </el-menu>
        </el-row>
        <el-row>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-row>

    </el-container>
</template>

<script>
import Vue from 'vue';
import headTop from '@/components/headTop'
import '@/router/index'
export default {
    components: {
        headTop,
    },
    computed: {
        defaultActive: function(){
            return this.$route.path.replace('/', '');
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
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
