<template>
  <section class="section">
    <div class="container box">
      <h1 class="title">Performance Reviews</h1>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="email" v-model.trim="username" placeholder="Username">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" v-model="password" placeholder="Password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="control">
        <button class="button is-primary" v-on:click="login">Login</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Login extends Vue {
  public username: string = '';
  public password: string = '';

  public login(): void {
    console.log(this.username, this.password);
  }
}
</script>

<style scoped lang="scss">
.container {
  max-width: 400px;
  margin-top: 20vh;
}
</style>