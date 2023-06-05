window.addEventListener("load", function () {
  // fetch("data/gooddata.json")
  //   .then((res) => res.json())
  //   .then((result) => console.log(result))
  //   .catch((err) => console.log(err));
  let swGoods;
  // const SLIDECOUNT = 4;
  const getData = async function () {
    try {
      let response = await fetch("data/gooddata.json");
      let result = await response.json();
      makeSlide(result);
      makeSlideShow();
      makeMenu(result);
    } catch (err) {
      console.log(err);
    }
  };
  function makeSlide(_result) {
    let html = ``;
    let copyArr = [..._result.goods];
    // Swiper 버전에 따른 문제 발생
    // 강제 목록 추가한것 제거
    // if (_result.goods.length <= SLIDECOUNT) {
    //   copyArr = [..._result.goods, ..._result.goods];
    // }
    copyArr.forEach((item) => {
      let tag = `
        <div class="swiper-slide">
          <a href="${item.link}" class="good-link">
            <div class="good-item">
              <div class="good-item-img">
                <img src="images/${item.image}" alt="${item.alt}" />
              </div>
              <div class="good-item-txt">
                <p>${item.title}</p>
                <span>${item.desc}</span>
              </div>
            </div>
          </a>
        </div>
      `;
      html += tag;
    });
    document.querySelector(".sw-goods .swiper-wrapper").innerHTML = html;
  }
  function makeSlideShow() {
    swGoods = new Swiper(".sw-goods", {
      loop: true,
      speed: 1000,
      slidesPerView: 3,
      navigation: {
        prevEl: ".sw-goods-prev",
        nextEl: ".sw-goods-next",
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      breakpoints: {
        480: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      },
    });
    swGoods.on("slideChange", function () {
      // let count = this.realIndex % SLIDECOUNT;
      focusMenu(this.realIndex);
    });
  }

  function focusMenu(_count) {
    let lis = document.querySelectorAll(".goods-list li");
    lis.forEach((item, index) => {
      if (index === _count) {
        // 순서번호랑 슬라이드 번호가 같다면 add한다.
        item.classList.add("focus");
      } else {
        item.classList.remove("focus");
      }
    });
  }
  function makeMenu(_result) {
    let html = ``;
    _result.goods.forEach((item) => {
      let tag = `<li><a href="#">${item.title}</a></li>`;
      html += tag;
    });
    document.querySelector(".goods-list").innerHTML = html;

    // li태그를 클릭하는 경우 슬라이드 이동
    let lis = document.querySelectorAll(".goods-list li a");
    lis.forEach((item, index) => {
      item.onclick = function (e) {
        e.preventDefault();
        swGoods.slideToLoop(index);
      };
      focusMenu(0);
    });
  }
  getData();
  // 슬라이드 멈추기/재생하기
  const bt = document.querySelector(".sw-goods-pause");
  const icon = bt.querySelector(".fa-pause");
  let swGoodsState = "play";
  bt.onclick = function () {
    // if (swGoodsState === "play") {
    //   // 슬라이드 멈춤
    //   swGoods.autoplay.stop();
    //   swGoodsState = "stop";
    //   icon.classList.add("fa-play");
    // } else {
    //   // 슬라이드 재실행
    //   swGoods.autoplay.start();
    //   swGoodsState = "play";
    //   icon.classList.remove("fa-play");
    // }
    const isPlaying = swGoodsState === "play";
    swGoods.autoplay[isPlaying ? "stop" : "start"]();
    swGoodsState = isPlaying ? "stop" : "play";
    icon.classList.toggle("fa-play");
  };
});
