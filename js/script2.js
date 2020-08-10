$(document).ready(function(){
    // 이미지 패턴=["이미지 파일", "타이틀", "콘텍스트", "가격", "날짜", "좋아요 횟수"];
    var $pd_arr=[
        ["img1.jpg", "거실 인테리어-4", "합리주의 실용 인테리어-4", "55000", "20200802", "23"],
        ["img2.jpg", "거실 인테리어-1", "합리주의 실용 인테리어-1", "150000", "20190602", "57"],
        ["img3.jpg", "침실 인테리어-8", "모더니즘 실용 인테리어-3", "40000", "20180512", "58"],
        ["img4.jpg", "침실 인테리어-2", "심플 실용 인테리어-6", "50000", "20200115", "26"],
        ["img5.jpg", "주방 인테리어-1", "포스트 모더니즘 인테리어-1", "30000", "20191208", "65"],
        ["img6.jpg", "침실 인테리어-6", "포스트 모더니즘 인테리어-8", "60000", "20171123", "33"],
        ["img7.jpg", "서재 인테리어-2", "심플 실용 인테리어-2", "80000", "20190319", "36"],
        ["img8.jpg", "거실 인테리어-5", "모더니즘 실용 인테리어-3", "200000", "20190922", "45"],
        ["img9.jpg", "거실 인테리어-9", "합리주의 실용 인테리어-7", "90000", "20180221", "51"],
        ["img1.jpg", "거실 인테리어-4", "합리주의 실용 인테리어-4", "55000", "20200802", "23"],
        ["img2.jpg", "거실 인테리어-1", "합리주의 실용 인테리어-1", "150000", "20190602", "57"],
        ["img3.jpg", "침실 인테리어-8", "모더니즘 실용 인테리어-3", "40000", "20180512", "58"],
        ["img4.jpg", "침실 인테리어-2", "심플 실용 인테리어-6", "50000", "20200115", "26"],
        ["img5.jpg", "주방 인테리어-1", "포스트 모더니즘 인테리어-1", "30000", "20191208", "65"],
        ["img6.jpg", "침실 인테리어-6", "포스트 모더니즘 인테리어-8", "60000", "20171123", "33"],
    ];

    var $pd_box=`
        <div class="pd_box">
            <div class="pd_photo">
                <img src="img/img3.jpg" alt="이미지-01">
            </div>
            <div class="pd_info">
                <h3 class="pd_title">TITLE</h3>
                <p class="pd_txt">CONTEXT</p>
                <div class="pd_etc">
                    <span class="pd_price">PRICE</span>
                    <span class="pd_date">UPDATE DATE</span>
                </div>
                <p class="fav">LIKE&nbsp;<span>100</span></p>
            </div>
        </div>
    `;

    for(i=0;i<$pd_arr.length;i++){
        $(".pd_frame").append($pd_box);
    }

    function pd_fnc(){
        $(".pd_frame .pd_box").each(function(index){
            $(this).find(".pd_photo img").attr("src", "img/"+$pd_arr[index][0]+"");
            $(this).find(".pd_info .pd_title").text($pd_arr[index][1]);
            $(this).find(".pd_info .pd_txt").text($pd_arr[index][2]);
            $(this).find(".pd_info .pd_price").text($pd_arr[index][3]);
            $(this).find(".pd_info .pd_date").text($pd_arr[index][4]);
            $(this).find(".pd_info .fav span").text($pd_arr[index][5]);
        });
    };
    
    $(".sort_button button").click(function(){
        var $index=$(this).index();
        $(".sort_button button").removeClass("active");
        $(this).addClass("active");
        $(".sort_button .sort_sel option").prop("selected", false);
        $(".sort_button .sort_sel option").eq($index+1).prop("selected", true);
    });

    pd_fnc();

    /* 최신순 버튼 클릭시 */
    $(".date_sort").click(function(){
        // sort() 메서드 : 오름차순 기본값;순차적으로 나열을 시키는 메서드
        $pd_arr.sort(function(a, b){
            return a[4]-b[4]; // 작은 순으로 차례대로 정렬
            // return b[4]-a[4]; // 큰 순으로 차례대로 정렬
        });
        console.log($pd_arr); // 배열의 순서 변경 확인
        $pd_arr.reverse(); // 현재 배열을 역순으로 변경
        console.log($pd_arr);
        pd_fnc();
    });

    /* 저가순 버튼 클릭시 */
    $(".low_sort").click(function(){
        $pd_arr.sort(function(a, b){
            return a[3]-b[3];
        });
        pd_fnc();
    });

    /* 고가순 버튼 클릭시 */
    $(".high_sort").click(function(){
        $pd_arr.sort(function(a, b){
            return b[3]-a[3];
        });
        pd_fnc();
    });

    /* 인기순 버튼 클릭시 */
    $(".fav_sort").click(function(){
        $pd_arr.sort(function(a, b){
            return b[5]-a[5];
        });
        pd_fnc();
    });

    $(".sort_sel").change(function(){
        var $sel_value=$(this).val();
        console.log($sel_value);
        $(".sort_button button").removeClass("active");
        $(".sort_button button[class^='"+$sel_value+"']").addClass("active");
        if($sel_value=="date"){
            $pd_arr.sort(function(a, b){
                return b[4]-a[4];
            });
        }
        if($sel_value=="low"){
            $pd_arr.sort(function(a, b){
                return a[3]-b[3];
            });
        }
        if($sel_value=="high"){
            $pd_arr.sort(function(a, b){
                return b[3]-a[3];
            });
        }
        if($sel_value=="fav"){
            $pd_arr.sort(function(a, b){
                return b[5]-a[5];
            });
        }
        pd_fnc();
    });

    
    // 만약 배열 데이터의 개수가 8개(4의 배수)라면,
    // ex) 8/4=2 몫 : 2, 나머지 : 0 => if문
    // k=0;k<몫;k++ => for문
    // 만약 배열 데이터의 개수가 9개라면,
    // ex) 9/4=2 몫 : 2, 나머지 : 1 => if문
    // k=0;k<=몫;k++ => for문


    var $ea_item=4; // 각 페이지별로 4개의 아이템을 보여줌
    if($pd_arr.length%$ea_item==0){ // 4의 배수
        for(k=0;k<$pd_arr.length/$ea_item;k++){
            $(".pager").append("<li>"+(k+1)+"</li>");
        }
    }else{
        for(k=0;k<=$pd_arr.length/$ea_item;k++){ // k<=parseInt($pd_arr.length/4);로 정수값만 반환하여 작성 가능
            $(".pager").append("<li>"+(k+1)+"</li>");
        }
    }
    $(".pager li").eq(0).addClass("active");
    $(".pd_box").eq($ea_item-1).nextAll().hide();

    // 인덱스 번호로 제어
    /* 
    $(".pager li").click(function(){
        var $pager_index=$(this).index();
        $(".pager li").removeClass("active");
        $(this).addClass("active");
        $(".pd_box").show();
        $(".pd_box").eq($pager_index*$ea_item).prevAll().hide();
        $(".pd_box").eq((($pager_index+1)*$ea_item)-1).nextAll().hide();
    });
     */
    
    // 텍스트 내용으로 제어
    $(".pager li").click(function(){
        var $pager_text=$(this).text();
        $(".pager li").removeClass("active");
        $(this).addClass("active");
        $(".pd_box").show();
        $(".pd_box").eq(($pager_text-1)*$ea_item).prevAll().hide();
        $(".pd_box").eq(($pager_text*$ea_item)-1).nextAll().hide();
    });








































});