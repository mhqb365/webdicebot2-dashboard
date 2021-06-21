<template>
  <div id="app">
    <div class="spinner-wrapper">
      <div class="spinner">
        <img
          src="/static/favicon.png"
          class="rounded-circle img-loader"
          width="64px"
        />
      </div>
    </div>

    <Navbar class="d-block d-sm-none" />

    <div class="container-fuild p-3">
      <div class="row">
        <div class="col-md-3">
          <Left class="d-none d-sm-block" />
        </div>

        <div class="col-md-9">
          <router-view />
        </div>

        <a class="gotop pl-2 pr-2" href="#app">
          <i class="fas fa-angle-up text-white" style="font-size: 36px"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/layout/Navbar";
import Left from "@/layout/Left";

export default {
  name: "App",
  components: {
    Navbar,
    Left,
  },
  mounted: function () {
    $(document).ready(function () {
      let preloaderFadeOutTime = 2e3;

      function hidePreloader() {
        let preloader = $(".spinner-wrapper");
        preloader.fadeOut(preloaderFadeOutTime);
      }

      hidePreloader();
    });

    let duration = 5e2;
    $(window).scroll(function () {
      if ($(this).scrollTop() > 2e2) {
        $(".gotop").fadeIn(duration);
      } else {
        $(".gotop").fadeOut(duration);
      }
    });

    $(".gotop").click(function (event) {
      event.preventDefault();
      $("html").animate({ scrollTop: 0 }, duration);
      return false;
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");

#app {
  font-family: "Varela Round", sans-serif;
}

.img-loader {
  animation: fa-spin 2s infinite linear;
}

.spinner-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 999999;
}

.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.gotop {
  position: fixed;
  bottom: 20px;
  right: 20px;
  text-decoration: none;
  /* color: #fff; */
  background: #007bff;
  display: none;
}

.gotop:hover {
  color: #fff;
}

.btn,
.card,
.gotop,
.form-control,
.jumbotron,
.list-group,
.modal-content,
pre {
  border-radius: 20px;
}

pre {
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.gradient-primary {
  background-image: linear-gradient(to bottom right, #863ee2, #571f9e);
}

.gradient-danger {
  background-image: linear-gradient(to bottom right, #ff9cc3, #fd3484);
}

.gradient-warning {
  background-image: linear-gradient(to bottom right, #ffd85d, #ffc200);
}

.gradient-info {
  background-image: linear-gradient(to bottom right, #00d2d7, #07b2dd);
}

.page-item:first-child .page-link {
  margin-left: 0;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.page-item:last-child .page-link {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.input-group-sm > .form-control {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 20px;
}

.input-group-sm > .input-group-append > .btn {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

table > .table > thead {
  border-top: none;
}
</style>