<template>
  <div id="login">
    <div class="login-wrap">
      <ul>
        <li v-for="item in tab" :key="item.id" :class="{'current' : item.current }" @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
      <!-- 表单开始 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-from" size="mini">
          <el-form-item prop="username">
            <label>邮箱</label>
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <label>密码</label>
            <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="passwords" v-if="model === 'reg'">
            <label>重复密码</label>
            <el-input type="text" v-model="ruleForm.passwords" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="code">
            <label>验证码</label>
              <el-row :gutter="24">
                <el-col :span="15"><el-input v-model.number="ruleForm.code" maxlength="6"></el-input></el-col>
                <el-col :span="9"><el-button type="success" class="block">获取验证码</el-button></el-col>
              </el-row> 
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')" class="block">提交</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import { stripscript } from '@/utils/vaisb'
  export default {
    data() {
      // 验证用户名邮箱格式
      var validateUsername = (rule, value, callback) => {
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(!reg.test(value)){
          callback(new Error('用户名格式有误'));
        } else{
          callback();
        }
      };
      // 验证密码 长度6——20 数字+字母
      var validatePassword= (rule, value, callback) => {
          //过滤后的数据
        this.ruleForm.password = stripscript(value);
        value = this.ruleForm.password;
        console.log(value)
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('密码格式不正确'));
        } else {
          callback();
        }
      };
      //验证重复密码
      var validatePasswords = (rule, value, callback) => {
          //过滤后的数据
        this.ruleForm.passwords = stripscript(value);
        value = this.ruleForm.passwords;
        if (value === '') {
          callback(new Error('请重复密码'));
        } else if (this.ruleForm.password != value ) {
          callback(new Error('重复密码不正确'));
        } else {
          callback();
        }
      };
      //验证码
      var checkcode = (rule, value, callback) => {
        let reg = /^[a-z0-9]{6}$/
       if (value === '') {
          callback(new Error('请输入验证码'));
        } else if (!reg.test(value)) {
          callback(new Error('验证码格式有误'));
        } else {
          callback();
        }
      };
    return {
      model:'login',
      tab:[{  
        text:'登录',current:true,type:'login'
      },{
        text:'注册',current:false,type:'reg'
      }],
        ruleForm: {
          username: '',
          password: '',
          code: '', 
          passwords:''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          passwords: [
            { validator: validatePasswords, trigger: 'blur' }
          ],
          code: [
            { validator: checkcode, trigger: 'blur' }
          ]
        }
      };
    },
  //创建完成
  created() {},
 //挂载完成
 mounted() {},
 //方法区
  methods: {
    toggleMenu(item){
      this.model = item.type
      this.tab.forEach(element => {
        element.current = false
      });
        item.current = true
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log(this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
}
</script>
<style lang="scss" scoped>
#login{background-color: #344a51;height: 100vh;}
.login-wrap{width:330px;margin: auto;}
.login-wrap ul{text-align: center;;li{width:88px;line-height: 36px;display: inline-block;cursor: pointer;}}
.login-wrap ul .current{color: white;border: 1px solid red;}
.login-from{label{display: block; color: #fff;line-height: 26px;}}
.block{width: 100%;display: block;}

</style>