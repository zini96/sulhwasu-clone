$(function () {
  const select_language = $(".select_language");
  const search_container = $(".search-container");
  const h_open_Btn = $(".h_open_search");
  const h_close = $(".sch_close");

  // nav
  const gnb = $(".gnb"); //Active
  const gnb_menu_list = $(".nav_d1.d1_Over"); //selector
  const sub_menu = $(".sub_menu"); //On
  const sub_menu_list = $(".sub_menu>ul>li"); //현재 순서값에 Over

  //mobile nav
  const mob_nav_btn = $(".mob_nav_btn");
  const mob_nav = $(".mob_nav ");
  const m_nav_bg = $(".m_nav_bg");
  const mob_btn = $(".m_nav_list_tit");
  const m_sub_menu = $(".m_nav_list li>dl");

  //mobile search
  const main = $("#main");

  //mob_nav
  //mobile nav 열기
  mob_nav_btn.click(function () {
    mob_nav.addClass("left_move");
    m_nav_bg.delay(500).fadeIn();
  });
  //mobile nav 닫기
  m_nav_bg.click(function () {
    $(this).fadeOut(0);
    mob_nav.removeClass("left_move");
  });
  //mob_nav sub열기
  mob_btn.click(function () {
    //class값을 알아내는 변수 저장
    const str = $(this).attr("class"); //현재 누른 새 sub menu의 title이 가진 class값
    const idx = $(".m_nav_list_tit.On"); //On이 붙어있던것 = 기존에 열려있는 sub menu의 title
    console.log(str);

    //한번에 하나의 sub menu만 열리도록 기존에 열려있던 sub menu는 닫아주기
    idx.next(m_sub_menu).slideToggle(); //기존에 열려있던것 다음으로 누른 sub_menu를 slideToggle로 열면서
    idx.toggleClass("On"); //동시에 기존에 열려있던것(이미 class On이 붙어있는)을 Toggle로 닫아주기

    if (str == "m_nav_list_tit On") {
      //현재 On class가 붙어있는 tit를 누른 경우에는 다른 행동 발생 X
    } else {
      $(this).toggleClass("On");
      $(this).next(m_sub_menu).slideToggle();
    }
  });

  //nav
  gnb_menu_list.mouseenter(function () {
    //마우스를 올렸을때 반응하는것 => mouseenter
    const idx = $(this).index(); //현재의 순서값을 이용
    console.log(idx);

    if (idx == 0) {
      sub_menu.removeClass("On");
      sub_menu_list.removeClass("Over");
    } else {
      sub_menu_list.removeClass("Over"); //기본적으로 Over가 없도록 removeClasdd로 reset해주고
      sub_menu.addClass("On");
      sub_menu_list.eq(idx).addClass("Over"); //현재 순서값에만 Over class
      gnb.addClass("Active");
    }
  });

  sub_menu_list.mouseleave(function () {
    setTimeout(pc_menu_reset, 1000); //시간차로 실행시키기
  });

  function pc_menu_reset() {
    //mouseenter 반대로 해주는 기능 fn으로 따로 빼서 setTimeout으로 딜레이주기
    sub_menu_list.removeClass("Over");
    sub_menu.removeClass("On");

    gnb.removeClass("Active");
  }

  select_language.click(function () {
    $(this).toggleClass("show");
  });

  h_open_Btn.click(function () {
    search_container.addClass("show");
    //search 눌렀을때 main에 On class 줘서 blur값 주기
    main.addClass("On");
  });

  h_close.click(function () {
    search_container.removeClass("show");
  });

  //main blur값 없애주면서 search container 없애주기
  main.click(function () {
    search_container.removeClass("show");
    $(this).removeClass("On");
  });
});
