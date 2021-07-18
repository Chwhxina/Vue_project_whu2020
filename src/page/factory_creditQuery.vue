<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="账户名字" prop="accountname">
                        <el-input v-model="formData.accountname"></el-input>
                    </el-form-item>

                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData')">立即查询</el-button>
                    </el-form-item>

                    <p>{{responseText}}</p>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {queryCredit} from '@/api/getData'
export default {
    data(){
        return {
            responseText:'',
            formData: {
                accountname: '',
            },
            rules: {
                accountname: [
                    { required: true, message: '请输入账户名字', trigger: 'blur' },
                ],
            }
        }
    },
    components: {
    },
    mounted(){
        this.initData();
    },
    methods: {
        async initData(){
        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try{
                        let result = await queryCredit(this.formData);
                        if (result.rspCode == '000000') {
                            this.$message({
                                type: 'success',
                                message: '查询成功'
                            });

                            var accountName = this.formData.accountname ;
                            this.responseText = accountName + "当前积分为:" + result.rspData.amount ;
                            this.formData = {
                                accountname: ''
                            };
                        }else{
                            this.$message({
                                type: 'error',
                                message: result.rspMsg
                            });
                        }
                    }catch(err){
                        console.log(err)
                    }
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '请检查输入是否正确',
                        offset: 100
                    });
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="less">
@import '../style/mixin';
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
