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
                <el-table-column property="factory" label="工厂" width="flex"></el-table-column>
                <el-table-column property="sensorId" label="传感器id" width="flex"></el-table-column>
                <el-table-column property="time" label="监测时间" width="flex"></el-table-column>
                <el-table-column property="val0" label="ph" width="flex"></el-table-column>
                <el-table-column property="val1" label="chroma" width="flex"></el-table-column>
                <el-table-column property="val2" label="ss" width="flex"></el-table-column>
                <el-table-column property="val3" label="bod5" width="flex"></el-table-column>
                <el-table-column property="val4" label="cod" width="flex"></el-table-column>
                <el-table-column property="val5" label="an" width="flex"></el-table-column>
                <el-table-column property="val6" label="tn" width="flex"></el-table-column>
                <el-table-column property="val7" label="tp" width="flex"></el-table-column>
                <el-table-column property="val8" label="vp" width="flex"></el-table-column>
                <el-table-column property="val9" label="toc" width="flex"></el-table-column>

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
/* 查询控件模板(水质查询) */
    import headTop from '../../components/headTop'
    import {getWaterMessageList} from '@/api/getData'
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
                this.dataText = "正在加载蚂蚁链数据,请稍后...";
                console.log(this.queryForm);
                let res = await getWaterMessageList({factory: this.queryForm.factory, address: this.queryForm.address, begin: this.queryForm.begin, end: this.queryForm.end});
                if (res.rspCode == '000000') {
                    var messageList = res.rspData.messageList ;
                    this.count = messageList.length;
                    this.tableData = [];
                    messageList.forEach(item => {
                        const tableData = {};
                        tableData.factory = item.factory;
                        tableData.sensorId = item.sensorId;
                        tableData.val0 = item.val0;
                        tableData.time = item.time;
                        tableData.val1 = item.val1;
                        tableData.val2 = item.val2;
                        tableData.val3 = item.val3;
                        tableData.val4 = item.val4;
                        tableData.val5 = item.val5;
                        tableData.val6 = item.val6;
                        tableData.val7 = item.val7;
                        tableData.val8 = item.val8;
                        tableData.val9 = item.val9;
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
