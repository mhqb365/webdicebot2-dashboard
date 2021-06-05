<template>
  <div id="app">
    <div class="spinner-wrapper">
      <div class="spinner">
        <!-- <div class="spinner-border text-white"></div> -->
        <img src="/static/favicon.png" class="rounded-circle img-loader" width="64px"/>
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

        <a class="to-top pl-2 pr-2" href="#app">
          <i class="fas fa-angle-up" style="font-size: 36px"></i>
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
      //Preloader
      let preloaderFadeOutTime = 2e3;

      function hidePreloader() {
        var preloader = $(".spinner-wrapper");
        preloader.fadeOut(preloaderFadeOutTime);
      }

      hidePreloader();
    });

    let duration = 5e2;
    $(window).scroll(function () {
      if ($(this).scrollTop() > 2e2) {
        $(".to-top").fadeIn(duration);
      } else {
        $(".to-top").fadeOut(duration);
      }
    });

    $(".to-top").click(function (event) {
      event.preventDefault();
      $("html").animate({ scrollTop: 0 }, duration);
      return false;
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");

#app {
  font-family: "Kanit", sans-serif;
}

.img-loader {
  animation: fa-spin 2s infinite linear
}

.spinner-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #7b86ff;
  z-index: 999999;
}

.spinner {
  position: relative;
  top: 46%;
  left: 46%;
}

.to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  text-decoration: none;
  color: #fff;
  background: #007bff;
  display: none;
  border: 1px solid transparent;
  border-radius: 20px;
}

.to-top:hover {
  text-decoration: none;
  color: #fff;
  background: #0069d9;
  border: 1px solid transparent;
  border-radius: 20px;
}

.list-group,
.list-group-item,
.alert {
  border: none;
  border-radius: 20px;
  margin-bottom: 5px;
}

.list-group-item {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

pre {
  border-radius: 20px;
  padding: 20px;
}

.btn,
.form-control {
  /* border: 1px solid #000; */
  border-radius: 20px;
}

.card {
  color: white;
  border: none;
  border-radius: 20px;
}

.card-body {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
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
</style>