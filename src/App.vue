<template>
  <div id="app">
    <Navbar class="d-block d-sm-none" />

    <div class="container pt-4">
      <div class="row">
        <div class="col-md-3">
          <Left class="d-none d-sm-block" />
        </div>

        <div class="col-sm-12 col-md-9">
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
    this.checkDeposit();
    setInterval(() => this.checkDeposit(), 3e4);

    let duration = 500;
    $(window).scroll(function () {
      if (jQuery(this).scrollTop() > 200) {
        jQuery(".to-top").fadeIn(duration);
      } else {
        jQuery(".to-top").fadeOut(duration);
      }
    });

    $(".to-top").click(function (event) {
      event.preventDefault();
      jQuery("html").animate({ scrollTop: 0 }, duration);
      return false;
    });
  },
};
</script>

<style>
.to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  text-decoration: none;
  color: #fff;
  background: #007bff;
  display: none;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.to-top:hover {
  text-decoration: none;
  color: #fff;
  background: #0069d9;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
</style>