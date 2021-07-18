<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-form :inline="true" :model="queryForm" ref="queryForm" class="queryForm">
                <el-form-item label="工厂">
                    <el-input v-model="queryForm.factory" placeholder="工厂名称"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('queryForm')">查询</el-button>
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
                <el-table-column property="factory" label="传感器ID" width="flex"></el-table-column>
                <el-table-column property="factory" label="工厂" width="flex"></el-table-column>
                <el-table-column property="factory" label="工厂地址" width="flex"></el-table-column>
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
import headTop from '@/components/headTop'
import {queryCredit} from '@/api/getData'
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
            formData: {
                accountname: '',
            },
            queryForm: {
                factory: '',
            }
        }
    },
    components: {
        headTop,
    },
    mounted(){
        this.initData();
    },
    methods: {
        async initData(){
        },
        submitForm(querryName) {
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
            /*var queryData = {
                factory: this.queryForm.factory,
                address: this.queryForm.address,
                begin: this.queryForm.begin,
                end: this.queryForm.end,
            }
            let res = await getWaterMessageList(queryData);*/
            let res = await sensorQuery({factory: this.queryForm.factory, address: this.queryForm.address, begin: this.queryForm.begin, end: this.queryForm.end});
            if (res.rspCode == '0') {
                var messageList = res.rspData.messageList ;
                this.count = messageList.length;
                this.tableData = [];
                messageList.forEach(item => {
                    const tableData = {};
                    tableData.factory = item.factory;
                    tableData.address = item.address;
                    tableData.time = item.time;
                    tableData.val0 = item.val0;
                    this.tableData.push(tableData);
                })

                if (this.tableData.length === 0) {
                    this.dataText = "暂无数据";
                }
            }
            else {
                this.dataText = "数据加载异常" + res.rspMsg;
            }
        },
    }
}
</script>

<style lang="less">
@import '../../style/mixin';
.button_submit{
    text-align: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
.el-table .info-row {
    background: #c9e5f5;
}

.el-table .positive-row {
    background: #e2f0e4;
}
</style>
