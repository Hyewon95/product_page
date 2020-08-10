$(document).ready(function(){
    var $price=$(".pd_price span").text();
    // console.log("원본 정보 값 : "+$price); // 29,900
    // console.log("원본 정보의 데이터 타입 : "+typeof $price); // string

    var $str_price=$price.replace(",", "");
    // console.log("숫자 정보의 값 : "+$str_price); // 29900
    // console.log("숫자 정보의 데이터 타입 : "+typeof $str_price); // string

    var $num_price=parseFloat($str_price);
    // console.log(typeof $num_price); // number

    /* 
    정규식 표현 /\B(?=(\d{3})+(?!\d))/g
    #1 / ~ /    정규식 표현의 시작과 끝
    #2 \B(1B)   B=Blank;공백처리
    #3 ?=       내부의 정규식 실행문을 조합하여 결과로 도출해라
    #4 \d       d=dimension;0~9까지의 숫자 데이터만을 지정
    #5 \d{3}    좌측자리부터 세자리마다 패턴 구성
    #6 ?!\d     부정형 정방 탐색(!);숫자를 세는 과정에서 역순으로 개수를 센다는 의미
    
    1000000000 => 100 000 000 0
    1000000000 => 1 000 000 000 => 1,000,000,000

    #7 g       g=global;글로벌 정규 표현식
     */

    var $count_num=$(".pd_count_box input").val();
    var $option_val="";
    var $total_price;
    var $total_result="";

    function calc_price(){
        $(".pd_count_box input").val($count_num);
        $option_val=$(".pd_option #sel_opt").val();
        // console.log(typeof $option_val);
        $total_price=$num_price*$count_num+parseFloat($option_val);

        $total_result=$total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // console.log($total_result);
        $(".total_price_num span").text($total_result);

        var $buy_img=$(".pd_img img").attr("src");
        var $buy_title=$(".pd_title h3").text();
        $(".cart_img img").attr("src", $buy_img);
        $(".cart_info h4").text($buy_title);
        $(".cart_price span").text($total_result);

        var $opt_default=$(".pd_option #sel_opt option:selected").attr("value");
        var $opt_txt=$(".pd_option #sel_opt option:selected").text();
        $(".btn_list p span").text($opt_txt);
        if($opt_default==0){
            $(".btn_list").hide();
        }else{
            $(".btn_list").show();
        }

        return false;
    };

    $(".pd_count_box a:first").click(function(){
        if($count_num>1){
            $count_num--;
            calc_price()
        }
    });
    $(".pd_count_box a:last").click(function(){
        $count_num++;
        calc_price()
    });

    $(".pd_option #sel_opt").change(function(){
        calc_price()
    });

    $(".pd_btn li:last input").click(function(){
        $(".dark, .mycart").addClass("active");
        calc_price()
    });

    $(".dark, .close, .cart_btn li:last").click(function(){
        $(".dark, .mycart").removeClass("active");
    });

    















































});