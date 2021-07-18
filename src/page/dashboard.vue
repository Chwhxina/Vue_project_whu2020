<template>
    <div>
        <el-carousel indica tor-position="outside" height="600px" >
            <el-carousel-item v-for="item in items" :key="item">
                <div class="block" v-for="fit in fits" :key="fit">
                    <span class="demonstration">{{ fit }}</span>
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="url"
                        :fit="fit"></el-image>
                </div>
            </el-carousel-item>
        </el-carousel>

        <div id="app">

            <el-row style="height:250px;background:#eeeeee" type="flex" justify="center" >
                <el-col :span="15">
                    <br>
                    <h1 style="font-size:50px" >我们是"水质卫士"</h1>
                    <div style="height: 20px"></div>
                    <p>通过区块链+物联网技术，将工厂的排放数据实时上链。通过这种方式，我们可以实时、可信的保障居民水质健康，让污染工厂"无处可逃"的同时给予优质环保的工厂以奖励</p>
                    <div style="height: 10px"></div>
                    <el-button type="primary">了解更多 >></el-button>
                    <br>
                </el-col>
            </el-row>


            <el-row style="background:#eeeeee" type="flex" justify="center" >
                <el-col :span="18">
                    <el-card style="background: #cad2ee" v-for="heading in headings" :key=heading>
                        <h2>{{heading}}</h2>

                        <el-button size="small">View details >></el-button>
                    </el-card>
                </el-col>
            </el-row>


            <el-row style="background:#eeeeee" type="flex" justify="center" >
                <el-col :span="15" >
                    <el-divider></el-divider>
                    <p>© 2020 Company, Inc.</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import {getGoodsStatis,getGoodsInfo} from '@/api/getData'
    export default {
    	data(){
    	    return{
            activeIndex: '1',
                activeIndex2: '1',
                headings:['水质查询','工厂信息','传感器', '最新消息','合作联系'],
                welcome: 'Vue.js,Element-UI',
                pj_name: 'Project Name',
                item: []
            };
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
