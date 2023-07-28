(function () {
  "use strict";

  AOS.init({
    duration: 800,
    easing: "slide",
    once: true,
  });

  var preloader = function () {
    var loader = document.querySelector(".loader");
    var overlay = document.getElementById("overlayer");

    function fadeOut(el) {
      el.style.opacity = 1;
      (function fade() {
        if ((el.style.opacity -= 0.1) < 0) {
          el.style.display = "none";
        } else {
          requestAnimationFrame(fade);
        }
      })();
    }

    setTimeout(function () {
      fadeOut(loader);
      fadeOut(overlay);
    }, 200);
  };
  preloader();

  var tinySdlier = function () {
    var heroSlider = document.querySelectorAll(".hero-slide");
    var propertySlider = document.querySelectorAll(".property-slider");
    var imgPropertySlider = document.querySelectorAll(".img-property-slide");
    var testimonialSlider = document.querySelectorAll(".testimonial-slider");

    if (heroSlider.length > 0) {
      var tnsHeroSlider = tns({
        container: ".hero-slide",
        mode: "carousel",
        speed: 700,
        autoplay: true,
        controls: false,
        nav: false,
        autoplayButtonOutput: false,
        controlsContainer: "#hero-nav",
      });
    }

    if (imgPropertySlider.length > 0) {
      var tnsPropertyImageSlider = tns({
        container: ".img-property-slide",
        mode: "carousel",
        speed: 700,
        items: 1,
        gutter: 30,
        autoplay: true,
        controls: false,
        nav: true,
        autoplayButtonOutput: false,
      });
    }

    if (propertySlider.length > 0) {
      var tnsSlider = tns({
        container: ".property-slider",
        mode: "carousel",
        speed: 700,
        gutter: 30,
        items: 3,
        autoplay: true,
        autoplayButtonOutput: false,
        controlsContainer: "#property-nav",
        responsive: {
          0: {
            items: 1,
          },
          700: {
            items: 2,
          },
          900: {
            items: 3,
          },
        },
      });
    }

    if (testimonialSlider.length > 0) {
      var tnsSlider = tns({
        container: ".testimonial-slider",
        mode: "carousel",
        speed: 700,
        items: 3,
        gutter: 50,
        autoplay: true,
        autoplayButtonOutput: false,
        controlsContainer: "#testimonial-nav",
        responsive: {
          0: {
            items: 1,
          },
          700: {
            items: 2,
          },
          900: {
            items: 3,
          },
        },
      });
    }
  };
  tinySdlier();
})();
// script.js
document.addEventListener("DOMContentLoaded", function () {
  const imgAboutElements = document.querySelectorAll(".img-about");

  imgAboutElements.forEach(function (image) {
    image.addEventListener("click", function () {
      const targetURL = "";
      window.open(targetURL, "_blank");
    });
  });
});

// Gallery
var gallery = document.querySelector("#gallery");
var getVal = function (elem, style) {
  return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
};
var getHeight = function (item) {
  return item.querySelector(".content").getBoundingClientRect().height;
};
var resizeAll = function () {
  var altura = getVal(gallery, "grid-auto-rows");
  var gap = getVal(gallery, "grid-row-gap");
  gallery.querySelectorAll(".gallery-item").forEach(function (item) {
    var el = item;
    el.style.gridRowEnd =
      "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
  });
};
gallery.querySelectorAll("img").forEach(function (item) {
  item.classList.add("byebye");
  if (item.complete) {
    console.log(item.src);
  } else {
    item.addEventListener("load", function () {
      var altura = getVal(gallery, "grid-auto-rows");
      var gap = getVal(gallery, "grid-row-gap");
      var gitem = item.parentElement.parentElement;
      gitem.style.gridRowEnd =
        "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
      item.classList.remove("byebye");
    });
  }
});
window.addEventListener("resize", resizeAll);
gallery.querySelectorAll(".gallery-item").forEach(function (item) {
  item.addEventListener("click", function () {
    item.classList.toggle("full");
  });
});

// Hero button
$("#myCarousel").carousel({
  interval: false,
});
$("#carousel-thumbs").carousel({
  interval: false,
});

// handles the carousel thumbnails
// https://stackoverflow.com/questions/25752187/bootstrap-carousel-with-thumbnails-multiple-carousel
$("[id^=carousel-selector-]").click(function () {
  var id_selector = $(this).attr("id");
  var id = parseInt(id_selector.substr(id_selector.lastIndexOf("-") + 1));
  $("#myCarousel").carousel(id);
});
// Only display 3 items in nav on mobile.
if ($(window).width() < 575) {
  $("#carousel-thumbs .row div:nth-child(4)").each(function () {
    var rowBoundary = $(this);
    $('<div class="row mx-0">')
      .insertAfter(rowBoundary.parent())
      .append(rowBoundary.nextAll().addBack());
  });
  $("#carousel-thumbs .carousel-item .row:nth-child(even)").each(function () {
    var boundary = $(this);
    $('<div class="carousel-item">')
      .insertAfter(boundary.parent())
      .append(boundary.nextAll().addBack());
  });
}
// Hide slide arrows if too few items.
if ($("#carousel-thumbs .carousel-item").length < 2) {
  $("#carousel-thumbs [class^=carousel-control-]").remove();
  $(".machine-carousel-container #carousel-thumbs").css("padding", "0 5px");
}
// when the carousel slides, auto update
$("#myCarousel").on("slide.bs.carousel", function (e) {
  var id = parseInt($(e.relatedTarget).attr("data-slide-number"));
  $("[id^=carousel-selector-]").removeClass("selected");
  $("[id=carousel-selector-" + id + "]").addClass("selected");
});
// when user swipes, go next or previous
$("#myCarousel").swipe({
  fallbackToMouseEvents: true,
  swipeLeft: function (e) {
    $("#myCarousel").carousel("next");
  },
  swipeRight: function (e) {
    $("#myCarousel").carousel("prev");
  },
  allowPageScroll: "vertical",
  preventDefaultEvents: false,
  threshold: 75,
});

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

$("#myCarousel .carousel-item img").on("click", function (e) {
  var src = $(e.target).attr("data-remote");
  if (src) $(this).ekkoLightbox();
});
