var ques_box = document.querySelector(".question");
var isClicked;
var howClicked = 0;
var prog = document.querySelector("#prog_bar");
var prog_parsent = document.querySelector("#prog_persent");
var main_cont = document.querySelector("#main_content");
var title =  document.querySelector("#title");
var result = document.querySelector("#result");
var result_name = document.querySelector("#result_name");
var img_area = document.querySelector("#imgArea");
var footer = document.querySelector("#footer");
var li = document.getElementsByTagName('li');
var explain = document.querySelector("#explain");
var ques_number = 17;
var all_checked = 1;
//回答の値を代入
var answers = [];
/*
0ヴィーナス
1ザコシ
2松本
3釈迦
4ユダ
5アマテラス
6アポロン
7アキレス
8浅野
*/
//質問ごとに追加する対象と点を記入
//一質問あたりのパーセンテージを割り振る
//ただし一発アウト系のみ1000000％を使う
const biases = [
    [[8,70],[7,20],[5,10]],//a
    [[1,60],[7,20],[0,20]],//h
    [[0,1000000]],//ji
    [[1,1000000]],//ko
    [[1,70],[2,30]],//kono
    [[4,120]],   //oka
    [[4,120]],   //yoku
    [[7,80],[5,20]],   //undou
    [[6,150]],   //geijyutu
    [[3,60],[8,30],[5,10]],//jibunha   
    [[5,80],[3,20]],   //jibunnhasun
    [[2,60],[1, 20],[5,20]],   //bano
    [[8,40],[6,30],[3,30]],   //jibunhamame
    [[3,80],[7,20]],   //nitai
    [[3, 70],[8,30]],   //yokuga
    [[2,80],[0,20]],//uwasa
    [[0,60],[7,30],[4,10]],//jituha
];
isClicked = Array(ques_number);
//isClickedは得点が1~5
for(let i = 0; i < ques_number; i++){
    isClicked[i] = -1;
}

var queses = ques_box.children;
queses[0].style = "scale : 1.5; opacity : 1.0;";
var lastclicked_num = 0;

function AddNumber(num,point){ 
    if(isClicked[num] == -1){
        howClicked += 1;
        
    }
    isClicked[num] = point;
    prog.value = parseInt(howClicked * 100 / ques_number);
    prog_parsent.innerHTML = prog.value + "%";
    queses[num].style = "scale : 1.0;";
    queses[num].style = "opacity : 0.1;";
    if(num != ques_number -1){
        if(isClicked[num + 1] == -1){
            if((num ) == 3){
                queses[num + 1].style = "opacity : 1.0; scale : 1.5; padding-top: 100px; margin-bottom: 200px;";
            }else{
                queses[num + 1].style = "opacity : 1.0; scale : 1.5;";
            }

            window.scrollTo({
                top : li[num].getBoundingClientRect().top + window.scrollY,
                left : 0,
                behavior : "smooth",
            });
            
        }
    }
}
function Start(){
    title.style = "display: none;";
    main_cont.style = "display: block; margin-top : 200px; animation-name:fadeInAnime; animation-duration:3s; animation-fill-mode:forwards; opacity:0;";
    footer.style = "display: block;";
}

//得点表
var points_result = Array(9);
for(let i = 0; i < points_result.length; i++){
    points_result[i] = 0;
}
var dial = 0;
var point_buffer;
var imges = ["./venus.jpg", "./zakoshi.jpg", "./matsumoto.jpg", "./shaka.jpg", "./yuda.jpg", "./amaterasu.jpg", "./aporon.jpg", "./akiresu.jpg","./apple.jpg"];
var names = ["ヴィーナス","ハリウッド・ザコシショウ","松本人志","釈迦","ユダ","天照大御神","アポロン","アキレス","浅野光彦"];
var sent = [
    //ヴィーナス
    ["ローマ神話の愛と美の女神。<br/>自信家で、手鏡を持ち歩くくらい自分の容姿を美しいと思っている。"],
    //ザコシ
    ["言わずとしれたコメディアン。<br/>誇張モノマネで人々を笑顔にする。"],
    //松本人志
    ["笑いの神。<br/>金髪のマッチョである。"],
    //釈迦
    ["仏教の開祖。<br/>本名はガウタマ・シッダールタ。<br/>殺生を拒み、困っている人を積極的に助ける。"],
    //ユダ
    ["イエス・キリストの弟子の一人。<br/>欲深く、金を得るためにイエス・キリストを売り渡した。"],
    //アマテラス
    ["日本神話に登場する神。<br/>太陽のように明るく、巫女のように優しい性格。"],
    //アポロン
    ["オリンポス十二神の一柱であり、ゼウスの息子。<br/>理性、音楽、予言、医術を司る。<br/>自意識が非情に高く、人間を見下している。"],
    //アキレス
    ["ギリシア神話に登場する大英雄。<br/>叙事詩「イリアス」の主人公であり、足首以外は無敵。強情で短気だが、友情や名誉を重んじる節がある。"],
    //浅野光彦
    ["挨拶とブログの神。<br/>全北野生の頂点に立つ男(校長)である。"]

]
var selected;
var zakoshi_flag = false;

function End(){
    all_checked = 1;
    window.scroll(0,0);
    for(let i = 0; i < isClicked.length; i++){
        if(isClicked[i] == -1){
            all_checked = 0;
            break;
        }
    }
    if(all_checked == 1 || zakoshi_flag){
        main_cont.style = "display: none;";
        footer.style = "display: none;";
        //ここで計算
        for(let i = 0; i < ques_number; i++){
            dial = isClicked[i];
            point_buffer = biases[i];
            for(let j = 0; j < biases[i].length; j++){
                if(point_buffer[j][1] > 100){
                    if(dial == 5){
                        points_result[point_buffer[j][0]] += point_buffer[j][1] * (dial - 1);

                    }
                    points_result[point_buffer[j][0]] += point_buffer[j][1] * (dial - 1) * 1 / 100000;
                    
                }
                points_result[point_buffer[j][0]] += point_buffer[j][1] * (dial - 1);
            }
        }
        console.log(points_result);
        selected = 0;
        for(let i = 0; i < points_result.length; i++){
            if(points_result[selected] < points_result[i]){
                selected = i;
            }
        }
        if(zakoshi_flag){
            selected = 1;
        }
        console.log(selected);
        //生成
        var img = document.createElement("img");
        img.src = imges[selected];
        img.alt = names[selected];
        result_name.innerHTML = names[selected];
        //img.height = 300;
        //img.width = 300;
        img_area.appendChild(img);
        explain.innerHTML = sent[selected];
        explain.style = "font-family : sans-serif; font-weight : 900; font-size : 120%; text-align: center;";
        result.style = "display: block;";
        window.scrollTo({
            top : result_name.getBoundingClientRect().top + window.scrollY - 100,
            left : 0,
            behavior : "smooth",
        });

    }else{
        if(window.confirm("神になるにはまだ早いが、それでも結果を見たいか。")){
            zakoshi_flag = true;
            End();
        }
    }
}
function ReStart(){
    window.location.reload();
}