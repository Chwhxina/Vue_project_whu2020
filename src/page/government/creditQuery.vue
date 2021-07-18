<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-form :inline="true" :model="queryForm" ref="queryForm" class="queryForm">
                <el-form-item label="工厂">
                    <el-input v-model="queryForm.factory" placeholder="工厂名称"></el-input>
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
                <el-table-column type="index" width="flex"></el-table-column>
                <el-table-column property="factory" label="工厂" width="flex"></el-table-column>
                <el-table-column property="credit" label="积分" width="flex"></el-table-column>
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
/* 查询控件(积分查询) */
    import headTop from '../../components/headTop'
    import {creditQuery} from '@/api/getData'
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
                    factory: ''
                }
            }
        },
    	components: {
    		headTop,
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
                this.dataText = "正在加载数据,请稍后...";
                console.log(this.queryForm);
                let res = await creditQuery({factoryName: this.queryForm.factory});
                if (res.rspCode == '0') {
                    var messageList = res.data.scoreList ;
                    this.count = messageList.length;
                    this.tableData = [];
                    messageList.forEach(item => {
                        const tableData = {};
                        tableData.factory = item.factoryId;
                        tableData.sensorId = item.sensorId;
                        tableData.num = item.num;
                        this.tableData.push(tableData);
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
	@import '../../style/mixin';
    .table_container{
        padding: 20px;
        .wh(1220px, 600px);
    }
</style>
