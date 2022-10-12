<script>
export default {
  name: 'App',
  data() {
    return {
      selectedPage: 0
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Coupons Analysis</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/types-analysis">
              <a
                class="nav-link"
                :class="[$route.path === '/types-analysis' && 'active']"
                href="#"
                >Types</a
              >
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/discount-type-analysis">
              <a
                class="nav-link"
                href="#"
                :class="[$route.path === '/discount-type-analysis' && 'active']"
                >Discount Types</a
              >
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/retailers-analysis">
              <a
                class="nav-link"
                href="#"
                :class="[$route.path === '/retailers-analysis' && 'active']"
                >Retailers</a
              >
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/relevant-keywords">
              <a
                class="nav-link"
                href="#"
                :class="[$route.path === '/relevant-keywords' && 'active']"
                >Relevant Keywords</a
              >
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <main>
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div
              class="page-title-box d-flex align-items-center justify-content-between"
            >
              <h4 class="mb-0">{{ $route.name }}</h4>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
