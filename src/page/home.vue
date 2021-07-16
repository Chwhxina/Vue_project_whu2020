<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>属性管理</template>
						<el-menu-item index="attributeList">属性列表</el-menu-item>
						<el-menu-item index="addAttribute">添加属性</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-star-on"></i>交易环节管理</template>
						<el-menu-item index="logisticList">交易环节列表</el-menu-item>
						<el-menu-item index="addLogistic">添加交易环节</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-setting"></i>消息管理</template>
						<el-menu-item index="messageList">消息列表</el-menu-item>
						<el-menu-item index="addMessage">添加消息</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-plus"></i>积分管理</template>
						<el-menu-item index="transferCredit">积分转账</el-menu-item>
						<el-menu-item index="issueCredit">积分发放</el-menu-item>
						<el-menu-item index="creditQuery">积分查询</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
</style>
