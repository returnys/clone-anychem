/**
 * 작성자 : 손용수
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
      let temp = `
      <div class="swiper-slide" style="background-image: url(images/${item})"></div>`;
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
    // 위의 구문을 통해서 slide가 생성되면 span.swiper-pagination-bullet이 생성됨
    // innerHTML을 이용해서 내용을 넣어보자
    const swVisualBullets = document.querySelectorAll(
      ".sw-visual-pg .swiper-pagination-bullet"
    );
    swVisualBullets.forEach((item, index) => {
      if(index < 9){
        item.innerHTML = `<em>0${index + 1}</em>`;
      } else {
        item.innerHTML = `<em>${index + 1}</em>`;
      }
      // 삼항조건연산자
      // item.innerHTML = `<em>${index < 9 ? '0' : ''}${index + 1}</em>`;
    });
  }
});
