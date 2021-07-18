<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-form :inline="true" class="queryForm">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">查询</el-button>
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
                <el-table-column property="factoryId" label="工厂Id" width="120"></el-table-column>
                <el-table-column property="factoryAddress" label="工厂位置" width="120"></el-table-column>
                <el-table-column property="sensorAddress" label="传感器位置" width="120"></el-table-column>
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
/* 查询控件(传感器列表查询) */
    import headTop from '../../components/headTop'
    import {getAllSensor} from '@/api/getData'
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
                this.dataText = '单击查询按钮查询';
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
                /*console.log(this.queryForm);*/
                /*var queryData = {
                    factory: this.queryForm.factory,
                    address: this.queryForm.address,
                    begin: this.queryForm.begin,
                    end: this.queryForm.end,
                }
                let res = await getWaterMessageList(queryData);*/
                let res = await getAllSensor();
                if (res.rspCode == '000000') {
                    var messageList = res.rspData.data.sensors ;
                    this.count = messageList.length;
                    this.tableData = [];
                    messageList.forEach(item => {
                        const tableData = {};
                        tableData.factoryId = item.factoryId;
                        tableData.factoryAddress = item.factoryAddress;
                        tableData.sensorAddress = item.sensorAddress;
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
