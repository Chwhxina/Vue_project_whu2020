<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-form :inline="true" :model="queryForm" ref="queryForm" class="queryForm">
                <el-form-item label="工厂">
                    <el-input v-model="queryForm.factory" placeholder="工厂名称"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="queryForm.address" placeholder="工厂地址"></el-input>
                </el-form-item>
                <el-form-item label="时间区间">
                    <el-date-picker
                        v-model="queryForm.begin"
                        align="right"
                        type="date"
                        placeholder="开始时间"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-date-picker
                        v-model="queryForm.end"
                        align="right"
                        type="date"
                        placeholder="结束时间"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('queryForm')">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <template slot="empty">
                    <p>{{dataText}}</p>
                </template>
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="factory" label="工厂" ></el-table-column>
                <el-table-column property="sensorId" label="传感器id" ></el-table-column>
                <el-table-column property="description" label="描述" ></el-table-column>
                <el-table-column property="time" label="记录时间" ></el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="200"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
/* 查询控件(传感器日志查询) */
import {sensorQuery} from '@/api/getData'
export default {
    data(){
        return {
            dataText: "",
            tableData: [],
            currentRow: null,
            offset: 0,
            limit: 200,
            count: 0,
            currentPage: 1,
            queryForm: {
                factory: '',
                address: '',
                begin:   '',
                end:     ''
            },
            //时间选择器
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
        }
    },
    components: {
    },
    created(){
        this.initData();
    },
    methods: {
        async initData(){
            this.dataText = '请选择查询条件,单击查询按钮查询';
        },
        onSubmit() {
            try {
                this.getMessages();
            }
            catch(err) {
                this.dataText = '获取数据失败' +  err;
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getMessages();
        },
        async getMessages(){
            this.dataText = "正在加载蚂蚁链数据,请稍后...";
            console.log(this.queryForm);
            let res = await sensorQuery({factoryName: this.queryForm.factory, address: this.queryForm.address, startTime: this.queryForm.begin, endTime: this.queryForm.end});
            if (res.rspCode == '0') {
                var dataPack = res.Data ;
                this.tableData = [];
                dataPack.forEach(record => {
                    var factoryName = record.factoryName;
                    var factory = factoryName.substr(0, factoryName.lastIndexOf("_"));
                    var sensorId = factoryName.substr(factoryName.lastIndexOf("_") + 1);
                    var data = record.data;
                    data.forEach(item => {
                        const tableData = {};
                        tableData.factory = factory;
                        tableData.sensorId = sensorId;
                        tableData.description = item.description;
                        tableData.time = item.createTime;
                        this.tableData.push(tableData);
                        this.count++;
                    })
                })

                if (this.tableData.length === 0) {
                    this.dataText = "暂无数据";
                }
            }
            else {
                this.dataText = "数据加载异常" + res.rspMsg;
            }
        }
    },
}
</script>

<style lang="less">
@import '../style/mixin';
.table_container{
    padding: 20px;
    .wh(1220px, 600px);
}
</style>
