<template>
  <div id="login">
    <div class="login-wrap">
      <ul>
        <li v-for="item in tab" :key="item.id" :class="{'current' : item.current }" @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
      <!-- 表单开始 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-from" size="mini">
          <el-form-item prop="username">
            <label for="username">邮箱</label>
            <el-input id = "username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <label for="password">密码</label>
            <el-input id="password" type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="passwords" v-if="model === 'register'">
            <label>重复密码</label>
            <el-input type="text" v-model="ruleForm.passwords" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="code">
            <label>验证码</label>
              <el-row :gutter="24">
                <el-col :span="15"><el-input v-model.number="ruleForm.code" maxlength="6"></el-input></el-col>
                <el-col :span="9"><el-button type="success" class="block" :disabled='!loginstatus' @click="GetSms()">获取验证码</el-button></el-col>
              </el-row> 
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')" :disabled='loginstatus'  class="block">{{model === 'login' ? "登录" : "注册" }}</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from 'js-sha1';
import { stripscript } from '@/utils/vaisb';
import { reactive, ref, isRef, toRefs, onMounted} from '@vue/composition-api';
import { getSms, Register, Login} from '@/api/login';
  export default {
    setup(props,  {root ,refs}) {
      // 验证用户名邮箱格式
      let validateUsername = (rule, value, callback) => {
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(!reg.test(value)){
          callback(new Error('用户名格式有误'));
        } else{
          callback();
        }
      };
      // 验证密码 长度6——20 数字+字母
      let validatePassword= (rule, value, callback) => {
          //过滤后的数据
        ruleForm.password = stripscript(value);
        value = ruleForm.password;
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
      let validatePasswords = (rule, value, callback) => {
          //过滤后的数据
        ruleForm.passwords = stripscript(value);  
        value = ruleForm.passwords;
        if (value === '') {
          callback(new Error('请重复密码'));
        } else if (ruleForm.password != value ) {
          callback(new Error('重复密码不正确'));
        } else {
          callback();
        }
      };
      //验证码
      let checkcode = (rule, value, callback) => {
        let reg = /^[a-z0-9]{6}$/
       if (value === '') {
          callback(new Error('请输入验证码'));
        } else if (!reg.test(value)) {
          callback(new Error('验证码格式有误'));
        } else {
          callback();
        }
      };    
      //放函数 生命周期 data数据
      const tab = reactive([{  
        text:'登录',current:true,type:'login'
      },{
        text:'注册',current:false,type:'register'
      }])
      //模块切换
      const model = ref('login')
      //登录状态
      let loginstatus = ref(true)
      //表单数据
      const ruleForm = reactive( {
        username: '',
        password: '',
        code: '', 
        passwords:''
      })
      const rules = reactive({
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
        })
      // 声明函数  
      const GetSms = (()=>{
        if(ruleForm.username == ""){
          root.$message.error('邮箱不能为空');
          return false
        }
        //修改按钮状态
        loginstatus.value = !loginstatus.value;
        //获取验证码
        let requestData = {
          username: ruleForm.username,
          module : model.value =='login' ?'login':'register'
        }
        setTimeout(() => {
          loginstatus.value = true;
        },20000)
        //请求验证码
        getSms(requestData).then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type:'success'
          })
            console.log(response);
        }).catch(error => {
          console.log(error)
        })

      })
      //重置表单
      const reseformData = (() => {
          refs["ruleForm"].resetFields();
      })
      //切换表单
      const toggleMenu = (item => {
        model.value = item.type
        tab.forEach(element => {
          element.current = false
        });
          item.current = true
          reseformData();
      })
      //提交表单
      const submitForm = (formName => {
          refs[formName].validate((valid) => {
              if (valid) {
                model.value ==='login' ? login() : register()
              } else {
                console.log('error submit!!');
                return false;
              }
          });
      })
      //登录
      const login = (() => {
        //表单数据
        let requestdata = {
          username: ruleForm.username,
          password: sha1(ruleForm.password) ,
          code: ruleForm.code,
          module: model.value
        }
        root.$store.dispatch('app/login',requestdata).then(response => {
          let data = response.data;
            root.$message({
              message: data.message,
              type:'success'
            })
            //页面跳转
            root.$router.push({
              name :'Console',
            })
        }).catch(error => {
          console.log(error)
        })
      })
      //注册
      const register = (() => {
          //表单数据
            let requestdata = {
              username: ruleForm.username,
              password: sha1(ruleForm.password),
              code: ruleForm.code,
              module: model.value
            }
          Register(requestdata).then(response => {
            let data = response.data;
            root.$message({
              message: data.message,
              type:'success'
            })
            toggleMenu(tab[0])
          }).catch(error => {
            console.log(error)
          })
      })
        //挂载完成后
      onMounted(() => {
      })
      return {
        tab,
        model,
        loginstatus,
        rules,
        ruleForm,
        toggleMenu,
        submitForm,
        GetSms,
        register,
        login,
      }
    },
} 
</script>
<style lang="scss" scoped>
#login{background-color: #344a51;height: 100vh;}
.login-wrap{width:330px;margin: auto;}
.login-wrap ul{text-align: center;;li{width:88px;line-height: 36px;display: inline-block;cursor: pointer;}}
.login-wrap ul .current{color: white;border: 1px solid red ;border: blue !important;}
.login-from{label{display: block; color: #fff;line-height: 26px;}}
.block{width: 100%;display: block;}
</style>