<template>
    <div>
        <head-top></head-top>
        <section class="data_section">
            <header class="section_title">合约所有者</header>
            <el-row :gutter="24">
                <el-col :span="24"><div class="data_list">账户ID: {{goodsOwner}}</div></el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24"><div class="data_list">合约ID: {{goodContractId}}</div></el-col>
            </el-row>
        </section>

        <section class="data_section">
            <header class="section_title">物品信息</header>
            <el-row :gutter="24">
                <el-col :span="8"><div class="data_list">物品: <span class="data_num">{{goodsName}}</span></div></el-col>
                <el-col :span="8"><div class="data_list">价格: <span class="data_num">{{goodsPrice}} 元</span></div></el-col>
                <el-col :span="8"><div class="data_list">重量: <span class="data_num">{{goodsWeight}} 克</span></div></el-col>
            </el-row>
        </section>
		<section class="data_section">
			<header class="section_title">朔源信息数据统计</header>
            <el-row :gutter="24">
                <el-col :span="8"><div class="data_list"><span class="data_num">{{allLogisticCount}}</span> 交易环节(点)</div></el-col>
                <el-col :span="8"><div class="data_list"><span class="data_num">{{allAttributeCount}}</span> 属性(个)</div></el-col>
                <el-col :span="8"><div class="data_list"><span class="data_num">{{allMessageCount}}</span> 消费留言(条)</div></el-col>
            </el-row>
		</section>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import {getGoodsStatis,getGoodsInfo} from '@/api/getData'
    export default {
    	data(){
    		return {
    			allLogisticCount: null,
    			allAttributeCount: null,
                allMessageCount: null,
                goodsName: null,
                goodsPrice: null,
                goodsWeight: null,
                goodsOwner:null,
                goodContractId:null,
    		}
    	},
    	components: {
    		headTop
    	},
    	mounted(){
    		this.initData();
    	},
        computed: {

        },
    	methods: {
    		async initData(){
    			Promise.all([getGoodsStatis(), getGoodsInfo()])
    			.then(res => {
                    if (res[0].rspCode == '000000') {
                        this.allLogisticCount = res[0].rspData.logisticCount;
                        this.allAttributeCount = res[0].rspData.attributeCount;
                        this.allMessageCount = res[0].rspData.messageCount;
                    }

                    if (res[1].rspCode == '000000'){
                        this.goodsName = res[1].rspData.goodInfo.name ;
                        this.goodsPrice = res[1].rspData.goodInfo.price ;
                        this.goodsWeight = res[1].rspData.goodInfo.weight ;
                        this.goodsOwner = res[1].rspData.goodInfo.ownerId ;
                        this.goodContractId = res[1].rspData.goodInfo.contractId ;
                    }
    			}).catch(err => {
    				console.log(err)
    			})
    		}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 26px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
