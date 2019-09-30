<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><font-awesome-icon icon="user" /></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Username" v-model="username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><font-awesome-icon icon="lock" /></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Password" v-model="password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" @click="handleSubmit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
      return {
          'username': '',
          'password': ''
      }
  },
  methods : {
      handleSubmit(e){
          e.preventDefault()
          if(this.password.length > 0){
              this.$http.post('/auth/login',{
                  'username': this.username,
                  'password': this.password
              })
              .then(response => {
                  localStorage.setItem('user', JSON.stringify(response.data.user.username));
                  localStorage.setItem('jwt', response.data.user.token);

                  if(localStorage.getItem('jwt') != null || localStorage.getItem('jwt') != 'undefined'){
                      this.$emit('loggedin')
                      if(this.$route.params.nextUrl != null){
                          this.$router.push(this.$route.params.nextUrl);
                      }else{
                        this.$router.push('dashboard')  
                      }
                  }
              })
              .catch(function (error){
                  console.log(error.response);
              })
          }
      }
  }
}
</script>