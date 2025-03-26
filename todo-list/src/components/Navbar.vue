<template>
  <nav class="navbar bg-base-200 shadow-sm">
    <div class="navbar-start">
      <div class="avatar">
        <div class="w-8">
          <RouterLink to="/"> <img src="@/assets/logo.svg" alt="logo" /></RouterLink>
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul class="menu px-1 dropdown-content bg-base-200 w-52" tabindex="0">
          <li v-for="route in routes" v-bind:key="route.route" class="flex items-center">
            <RouterLink v-bind:to="route.route">{{ route.display }}</RouterLink>
          </li>
        </ul>

      </div>
      <ul class="menu menu-horizontal px-1 hidden lg:flex">
        <li v-for="route in routes" v-bind:key="route.route">
          <RouterLink v-bind:to="route.route">{{ route.display }}</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
const routes = [
  { display: "Home", route: "/" },
  { display: "About", route: "/about" },
  { display: "Add Todo", route: "/add-todo" },
]


</script>
