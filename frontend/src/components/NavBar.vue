<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <span class="icon is-large">
          <i class="fas fa-users fa-lg"></i>
        </span>
        Performance Reviews
      </router-link>

      <a v-if="isLoggedIn" role="button" class="navbar-burger burger" 
        aria-label="menu" aria-expanded="false" data-target="navMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div v-if="isLoggedIn" id="navMenu" class="navbar-menu">
      <div v-if="isAdmin" class="navbar-start">
        <router-link class="navbar-item" to="/employees">Employees</router-link>
        <router-link class="navbar-item" to="/reviews">Reviews</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="navbar-item">{{ user }}</div>
          <a class="navbar-item button is-dark" v-on:click="logout">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class NavBar extends Vue {
  public isAdmin: boolean = true;
  public isLoggedIn: boolean = true;
  public user: string = 'User';

  public logout(): void {
    // make logout ajax call
    // redirect to login
  }
}
</script>

<style scoped lang="scss">
</style>