<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p class="explain_text">蚂蚁链朔源实践系统</p>
        <p class="explain_text">掌握JavaSDK 调用蚂蚁链合约</p>
        <p class="explain_text">了解Springboot编写无状态API的基本逻辑</p>
        <p class="explain_text">了解蚂蚁链Dapp前端开发的基本流程</p>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	components: {
    		headTop,
    	},
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
</style>
