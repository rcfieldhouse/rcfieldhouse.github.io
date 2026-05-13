//  ------------------------------------- [ Loader Design Data ]
$(window).on("load", function () {
  setTimeout(function () {
    $(".preloader").addClass("loaded").fadeOut(600);
  }, 1000);
});

// ------------------------------------ [ Header scroll ]
const $header = $("[data-header]");

$(window).on("scroll", function () {
  const scrollTop = parseInt($(this).scrollTop(), 10);

  if (scrollTop > 0) {
    $header.addClass("active");
  } else {
    $header.removeClass("active");
  }
});

// ------------------------------------ [ menu open close ]
// Menu Open
$(document).on("click", ".menu-bar", function () {
  $("#menu").addClass("active");
});

// Menu Close
$(document).on("click", ".close-bar", function () {
  $("#menu").removeClass("active");
});

// ------------------------------------ [ id Scroll page click  ] 
$(document).on("click", ".navbar-data a[href^='#']", function (e) {
  e.preventDefault();
  const target = $(this).attr("href");
  const $target = $(target);
  if ($target.length) {

    $("html, body").animate(
      {
        scrollTop: $target.offset().top - 30
      },
      800
    );

    $(".navbar-data a").removeClass("active");
    $(this).addClass("active");

    $("#menu").removeClass("active");
  }
});

// ------------------------------------ [ Light & Dark Mode ]
const themeButton = $("#theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-fill";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

if (selectedTheme) {
  $("body").toggleClass(darkTheme, selectedTheme === "dark");
  themeButton.toggleClass(iconTheme, selectedIcon === "ri-moon-clear-fill");
}

$(document).on("click", "#theme-button", function () {

  $("body").toggleClass(darkTheme);
  themeButton.toggleClass(iconTheme);

  const currentTheme = $("body").hasClass(darkTheme) ? "dark" : "light";
  const currentIcon = themeButton.hasClass(iconTheme)
    ? "ri-moon-clear-fill"
    : "ri-sun-fill";

  localStorage.setItem("selected-theme", currentTheme);
  localStorage.setItem("selected-icon", currentIcon);
});


//  ------------------------- Cursor Design
(function () {
  "use strict";

  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  if ("ontouchstart" in window || window.innerWidth < 768) {
    cursor.style.display = "none";
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;

  const speed = 0.2;

  window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;

    cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;

    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener("mouseover", function (e) {
    if (e.target.closest("a, button, .slide-box, .cursor-pointer")) {
      cursor.classList.add("active");
    }
  });

  document.addEventListener("mouseout", function (e) {
    if (e.target.closest("a, button, .slide-box, .cursor-pointer")) {
      cursor.classList.remove("active");
    }
  });
})();

//  ------------------------- Testimonial Design
$(".testimonial-detail").slick({
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 1,
  dots: true,
  arrows: false,
  autoplay: true,
  speed: 800,

  customPaging: function (slider, i) {
    return '<button type="button"></button>';
  },
});

/*----------------------- Blog Slider -----------------------------*/
$(".blog-leage").slick({
  centerMode: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
  autoplay: true,
  speed: 800,

  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

/*----------------------- Whole Page Scrolling Animation -----------------------------*/
(function ($) {
  "use strict";
  const elements = document.querySelectorAll(
    ".fade_up, .fade_down, .zoom_in, .zoom_out, .fade_right, .fade_left, .flip_left, .flip_right, .flip_up, .flip_down"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {

        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }

      });
    }, {
      threshold: 0.2
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });

  } else {
    elements.forEach(function (el) {
      el.classList.add("show");
    });
  }
})(jQuery);

/*----------------------- Services Blog  Open popup -----------------------------*/
(function ($) {
  "use strict";

  /* Open Popup */
  $(document).on("click", ".services-title", function () {
    openPopup(".popup-box-dash");
  });

  $(document).on("click", ".data-detail", function () {
    openPopup(".popup-box-dash-project");
  });

  $(document).on("click", ".slide-box", function () {
    openPopup(".popup-box-dash-blog");
  });

  function openPopup(target) {
    $(".popup-overlay").fadeIn(200);
    $(target).removeClass("hide").addClass("show");
  }

  /* Close Popup */
  $(document).on("click", ".close-popup, .popup-overlay, .circle-wrap", function () {

    $(".popup-box-dash, .popup-box-dash-project, .popup-box-dash-blog")
      .removeClass("show")
      .addClass("hide");

    setTimeout(function () {
      $(".popup-overlay").fadeOut(200);
    }, 300);
  });

})(jQuery);

// ------------------------------- link hover image show
(function ($) {
  "use strict";

  const items = document.querySelectorAll(".main-sec-design-hover");

  items.forEach(function (item) {

    const reveal = item.querySelector(".hover-reveal");
    if (!reveal) return;

    let mouseX = 0;
    let mouseY = 0;

    let posX = 0;
    let posY = 0;

    const speed = 0.12;

    item.addEventListener("mousemove", function (e) {
      const rect = item.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      reveal.style.opacity = "1";
    });

    function animate() {
      posX += (mouseX - posX) * speed;
      posY += (mouseY - posY) * speed;
      reveal.style.transform =
        `translate(${posX}px, ${posY}px) translate(-50%, -50%) scale(1)`;
      requestAnimationFrame(animate);

    }
    animate();
    item.addEventListener("mouseleave", function () {

      reveal.style.opacity = "0";
      reveal.style.transform =
        `translate(${posX}px, ${posY}px) translate(-50%, -50%) scale(0.8)`;
    });
  });
})(jQuery);


/*------------------------------------- Pop Videos -------------------------------------*/
$(document).ready(function () {
  $('.youtube').magnificPopup({
    items: {
      src: 'https://www.youtube.com/watch?v=PavYAOpVpJI'
    },
    type: 'iframe'
  });
});

/*------------------------------------- Infinite Marquee -------------------------------------*/
document.querySelectorAll('.logos-data').forEach(function (logosContainer) {
  const copy = logosContainer.querySelector('.logos-slide').cloneNode(true);
  logosContainer.appendChild(copy);
});
document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("popup");
    const items = document.querySelectorAll(".project-item");

    /* =========================
       CLOSE BUTTON
    ========================= */
    const closeBtn = document.getElementById("close-popup");

    items.forEach(item => {
        item.addEventListener("click", () => {

            /* =========================
               TEXT CONTENT
            ========================= */
            document.getElementById("popup-title").innerText = item.dataset.title || "";
            document.getElementById("popup-subtitle").innerText = item.dataset.subtitle || "";
            document.getElementById("popup-role").innerText = item.dataset.role || "";
            document.getElementById("popup-desc").innerText = item.dataset.descriptionPrimary || "";

            /* =========================
               MAIN IMAGE (CLICKABLE LINK)
            ========================= */
const mainImg = document.getElementById("popup-image");
const imageButton = document.getElementById("popup-link");
const label = document.querySelector(".popup-cta-label");

mainImg.src = item.dataset.image || "";

const hasLink = item.dataset.projectLink && item.dataset.projectLink.trim() !== "";

if (hasLink) {

    imageButton.href = item.dataset.projectLink;

    imageButton.style.display = "inline-flex";
    label.style.display = "block";

    imageButton.style.pointerEvents = "auto";
    imageButton.style.opacity = "1";

} else {

    imageButton.removeAttribute("href");

    imageButton.style.display = "none";
    label.style.display = "none";
}
            /* =========================
               TAGS
            ========================= */
            const tagsContainer = document.getElementById("popup-tags");
            tagsContainer.innerHTML = "";

            if (item.dataset.tags) {
                item.dataset.tags.split(",").forEach(tag => {
                    const span = document.createElement("span");
                    span.innerText = tag.trim();
                    tagsContainer.appendChild(span);
                });
            }

            /* =========================
               BULLET POINTS
            ========================= */
            const bulletList = document.getElementById("popup-bullets");
            bulletList.innerHTML = "";

            if (item.dataset.descriptionSecondary) {
                try {
                    const bullets = JSON.parse(item.dataset.descriptionSecondary);

                    bullets.forEach(point => {
                        const li = document.createElement("li");
                        li.innerText = point;
                        bulletList.appendChild(li);
                    });

                } catch (err) {
                    console.warn("Invalid JSON in description-secondary", err);
                }
            }

            /* =========================
               IMAGE GALLERY (VERTICAL)
            ========================= */
            const galleryContainer = document.getElementById("popup-gallery");
            galleryContainer.innerHTML = "";

            if (item.dataset.images) {
                try {
                    const images = JSON.parse(item.dataset.images);

                    images.forEach(src => {
                        const img = document.createElement("img");
                        img.src = src;
                        img.classList.add("project-gallery-img");

                        // click to replace main image
                        img.addEventListener("click", () => {
                            mainImg.src = src;
                        });

                        galleryContainer.appendChild(img);
                    });

                } catch (err) {
                    console.warn("Invalid JSON in data-images", err);
                }
            }

            /* =========================
               SECOND IMAGE (OPTIONAL)
            ========================= */
            const secondImg = document.getElementById("popup-image-2");

            if (item.dataset.imageSecondary) {
                secondImg.src = item.dataset.imageSecondary;
                secondImg.style.display = "block";
            } else {
                secondImg.style.display = "none";
            }

            /* =========================
               OPEN POPUP
            ========================= */
            popup.classList.add("active");
        });
    });

    /* =========================
       CLOSE BUTTON
    ========================= */
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            popup.classList.remove("active");
        });
    }

    /* =========================
       CLICK OUTSIDE TO CLOSE
    ========================= */
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("active");
        }
    });

});