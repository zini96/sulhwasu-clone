$(function () {
  const visu_slide = $(".visu_slide");
  const visu_btm_list = $(".visu_btm_list");
  const visu_right = $(".visu_arrow.right"); //오른쪽버튼
  const visu_left = $(".visu_arrow.left"); //왼쪽버튼
  const play_Btn = $(".visu_btm_wrap li.controls_wrap .control.start");
  const stop_Btn = $(".visu_btm_wrap li.controls_wrap .control.stop");

  let slider_play = setInterval(auto, 6000); //자동으로 슬라이드 넘어가도록 setInterval
  let slider_stop;

  first();

  function auto() {
    visu_right.trigger("click"); //trigger => 어떤 행위를 반복적으로 진행하게 만드는 메소드
    //우측으로 클륵하는 행동을 반복적으로 만듬 => 다음 슬라이드로 계속 넘어가게 만들기
  }

  function first() {
    visu_slide.eq(0).addClass("On"); //첫번째 슬라이드를 나오도록 하기 위해 순서값을 주는 eq선택자로 On class 주기

    slide_Event();
  }

  //veil & txt 나오도록하는 함수
  function slide_Event() {
    const on_slide = $(".visual_wrap>li.On"); //현재 활성화된 슬라이드(On class가 붙은 slide) 저장
    const idx = on_slide.index(); //활성화된 슬라이드의 순서값 저장
    const veil = on_slide.children(".visu_veil"); //활성화된 슬라이드 자식 veil
    const txt_wrap = on_slide.children(".visu_txt_wrap"); //활성화된 슬라이드 자식 text container

    veil.animate(
      {
        width: "44%",
        opacity: "1",
      },
      1000
    );
    //veil이 먼저 나오고 txt가 나올수 있게 delay 걸어주기
    txt_wrap.delay(500).animate(
      {
        opacity: "1",
      },
      1000
    );

    visu_btm_list.eq(idx).addClass("Act"); //현재 활성화된 슬라이드의 순서값과 동일한 index를 가지는 btm_list에 Act class 추가해주기
  }

  visu_right.click(right); //visu_right 클릭하면 right 함수 실행
  visu_left.click(left);
  visu_btm_list.click(bottom);
  stop_Btn.click(stop); //stop버튼 클릭하면 stop 함수 실행 -> slider_stop으로 clearInterval 시켜서 순환 멈춰주기
  play_Btn.click(play);

  //슬라이드 자동으로 넘어갈때 stop_Btn이랑 play_Btn fadeIn/Out 시켜주기
  function play() {
    stop_Btn.fadeIn();
    play_Btn.fadeOut();

    slider_play = setInterval(auto, 6000);
  }

  //슬라이드 멈출때 stop_Btn이랑 play_Btn fadeIn/Out 시켜주기
  function stop() {
    stop_Btn.fadeOut();
    play_Btn.fadeIn();

    //setInterval 멈춰주기
    slider_stop = clearInterval(slider_play);
  }

  //하단버튼 누르면 이동
  function bottom(e) {
    e.preventDefault();

    const idx = $(this).index(); //내가 누른 하단버튼의 idx 저장

    reset();
    visu_slide.eq(idx).addClass("On"); //내가 누른 하단버튼의 idx와 일치하는 index를 가진 slide에 On class 붙여주기

    slide_Event();
  }

  //우측 슬라이드로 이동
  function right(e) {
    e.preventDefault(); //제자리에서 진행되도록(쓸데없는거 다시 불러오지 않게)
    e.stopPropagation(); //상위 컨테이너에 이벤트효과 영향 주지 않도록하기

    const idx = $(".visual_wrap>li.On").index(); //현재 보이는 슬라이드의 index값 저장

    reset(); //새 슬라이드로 넘어가기 전에 현재 슬라이드에서 On, Act class를 제거해주기
    //veil & txt wrap도 reset해주기

    if (idx < 2) {
      //슬라이드 개수보다 작은 idx를 가지면 +1
      visu_slide.eq(idx + 1).addClass("On"); //현재 슬라이드의 index + 1 슬라이드에 On class 추가
    }
    if (idx == 2) {
      //마지막 슬라이드의 경우는 맨 처음으로 돌아가기
      visu_slide.eq(0).addClass("On");
    }

    slide_Event();
  }

  //좌측 슬라이드로 이동
  //우측슬라이드와 조건식만 반대로 만들어주기
  function left(e) {
    e.preventDefault();
    const idx = $(".visual_wrap>li.On").index();

    reset();

    if (idx > 0) {
      //슬라이드 개수보다 큰 idx를 가지면 -1
      visu_slide.eq(idx - 1).addClass("On");
    }
    if (idx == 0) {
      //처음 슬라이드의 경우는 맨 뒤로 돌아가기
      visu_slide.eq(2).addClass("On");
    }

    slide_Event();
  }

  //새 슬라이드 넘어가기 전에 모든 class reset해주기
  function reset() {
    visu_slide.removeClass("On");
    visu_btm_list.removeClass("Act");

    visu_slide.children(".visu_veil").animate(
      {
        width: "0%",
        opacity: "0",
      },
      1000
    );
    visu_slide.children(".visu_txt_wrap").delay(1000).animate(
      {
        opacity: "0",
      },
      1000
    );
  }
});
