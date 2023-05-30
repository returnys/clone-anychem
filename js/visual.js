/**
 * 작성자 : 홍길동
 * 작성일 : 2023-05-26
 * 기능 업데이트 : json 데이터를 이용한 html 구조 생성 적용
 */
window.addEventListener("load", function (event) {
  const swVisualWrap = document.querySelector(".sw-visual .swiper-wrapper");
  fetch("data/visualdata.json")
    .then((res) => res.json())
    .then((result) => makeVisualHtml(result))
    .catch((err) => console.log(err));
  function makeVisualHtml(_data) {
    let html = ``;
    _data.img.forEach((item) => {
      let temp = `<div class="swiper-slide" style="background-image: url(images/${item})"></div>`;
      html += temp;
    });
    swVisualWrap.innerHTML = html;
    const swVisual = new Swiper(".sw-visual", {
      loop: true,
      effect: "fade",
      speed: 1000,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".sw-visual-pg",
        clickable: true,
      },
    });
  }
});
