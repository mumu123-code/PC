<template>
  <div class="registeredView">
    <el-form
      :model="form"
      :rules="rules"
      ref="rules"
      label-width="100px"
      class="formStyle"
    >
      <!-- <el-form-item> -->
      <span class="title"><h1>注册</h1></span>
      <!-- </el-form-item> -->
      <el-form-item label="企业名称" label-width="100px" prop="companyName" size="small">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="负责人" label-width="100px" prop="managerName" size="small">
        <el-input v-model="form.managerName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" label-width="100px" prop="phone" size="small">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" label-width="100px" prop="verificationCode" size="small" class="code">
        <el-input v-model="form.verificationCode"></el-input>
        <el-button type="primary" size="small" @click.native="getCode" :disabled="countdownNum!=='获取验证码'">{{countdownNum}}</el-button>
      </el-form-item>
      <el-form-item label="密码" label-width="100px" prop="password" size="small">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" label-width="100px" prop="comfirmPossWord" size="small">
        <el-input v-model="form.comfirmPossWord" @blur="isPassWord"></el-input>
      </el-form-item>
      <el-form-item label="激活码" label-width="100px" prop="registerCode" size="small">
        <el-input v-model="form.registerCode"></el-input>
      </el-form-item>
      <el-form-item label="是否为固废" label-width="100px" size="small">
        <el-radio v-model="waste" v-for="(item,i) in radioTypeData" :key="i" :label="item.val">{{item.text}}</el-radio>
      </el-form-item>
      <div class="btn-con">
        <el-button type="success" class="btn" size="small" @click.native="submitFunc">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getVerificationCode,registeredUser } from '../../assets/js/Login'
export default {
  name: "registeredView",
  data() {
    return {
        form: {
            companyName: "",
            managerName: "",
            phone:"",
            verificationCode:"",
            password:"",
            comfirmPossWord:"",
            registerCode:"",
        },
        rules: {
            companyName: [
                { required: true, message: "请输入企业名称！", trigger: "blur" },
            ],
            managerName:[
                {required:true,message:"请输入负责人！",trigger:"blur"},
            ],
            phone:[
                {required:true,message:"请输入联系电话！",trigger:"blur"},
            ],
            verificationCode:[
                {required:true,message:"请输入验证码！",trigger:"blur"},
            ],
            password: [
                {required:true,message:"请输入密码！",trigger:"blur"},
            ],
            comfirmPossWord:[
                {required:true,message:"请输入确认密码！",trigger:"blur"},
            ],
            registerCode:[
                {required:true,message:"请输入激活码！", trigger:"blur"},
            ],
        },
        countdownNum:"获取验证码",
        codeTime:60,
        timer: 60,
        radioTypeData:[
            {val:0,text:"是"},
            {val:1,text:"否"},
        ],
        waste:0,
        isShowModel:false,
    }
  },
  methods: {
    //判断密码和确认密码
    isPassWord(){
        console.log()
        if(this.form.password != this.form.comfirmPossWord){
            this.$message.error("密码和确认密码不同！");
            return false;
        }
    },
    //获取验证码
    async getCode(){
        if(this.form.phone == ""){
            this.$message.error("请输入手机号码!");
            return;
        }
        if(this.countdownNum == '获取验证码'){
            const res = await getVerificationCode({smsType: 0,phone:this.form.phone});
            if(res?.code == "1"){
                this.$message.success("验证码发送成功");
                this.timer = setInterval(() =>{
                    this.codeTime--;
                    if(this.codeTime < 1){
                        clearInterval(this.timer);
                        this.codeTime = 0;
                        this.countdownNum = '获取验证码';
                    }else{
                        this.countdownNum = this.codeTime + 's';
                    }
                },1000)
            }else{
                this.$message.error(res.msg);
            }
        }
        
    },
    async submitFunc(){
        this.$refs.rules.validate((valid) => {
            if (valid) {
                this.user();
                return;
            }
        })
    },
    async user(){
        const res = await registeredUser(this.form);
        if(res?.code == "1"){
            if(this.waste == "1"){
                this.$router.push('/')
            }else{
                // 存储页面数据到本地
                sessionStorage.setItem("userInfo", JSON.stringify(res.data));
                this.$router.push({path:'/waste'});
            }
        }
    },
  }
}
</script>

<style lang="less" scoped>
.registeredView{
    width: 100vw;
    height: 100vh;
    background-size: 100%;
    background-image: url('https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1652084150833-bg.jpg');
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    padding-top: 15vh;
    .formStyle{
        width: 600px;
        margin: auto;
        background: rgba(241, 242, 240, .1);
        box-shadow: 1px 1px 3px 1px #f1f2f0;
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 20px;
        .title{
            color: aliceblue;
            text-align: center;
            width: 100%;
            letter-spacing: 4px;
            font-family: cursive;
            margin-bottom: 20px;
        }
    }
}
.btn-con{
    text-align: center;
    .btn{
        width: 100px;
    }
}
/deep/.el-form-item__label{
    color: #fff !important;
}
.code .el-input{
    width: 73% !important;
    margin-right: 30px;
} 
</style>