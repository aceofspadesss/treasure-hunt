const VICTORY_VALUE = 90;
const CLOSE_VALUE = 100;
const WARM_VALUE = 200;
const terrain = ['forest', 'sand', 'snow', 'treasure'];
const playBtn = $('#start-btn');
const scoretBtn = $('#score-btn');
const mainMenu = $('#go-back');
const cancelBtn = $('#cancel');
const submitBtn = $('#submit');
let counter = 0;
let score = {};


const game = () => {
    const getRandomPosition = () => {
        let leftPosition, topPosition;
        leftPosition = Math.round(Math.random() * $('.game-window').width());
        topPosition = Math.round(Math.random() * $('.game-window').height());
        return {left: leftPosition, top: topPosition};
    }
    
    const treasure = getRandomPosition();
    
    console.log(treasure)
    
    
    $('.game-window').click((event) => {
        const {pageX, pageY} = event;
        const diffX = Math.abs(pageX - treasure.left);
        const diffY = Math.abs(pageY - treasure.top);
        if (diffX <= VICTORY_VALUE && diffY <= VICTORY_VALUE){
            text = "You won"
        } else if(diffX <= CLOSE_VALUE && diffY <= CLOSE_VALUE){
            text = "So close"
        } else if (diffX <= WARM_VALUE && diffY <= WARM_VALUE){
            text = "Warm"
        } else {
            text = "Not even close"
        }

        counter++

        $('#hint').text(text);
        $('#curr-score').text('Score: ' + counter)
        $('<div class="terrain">')
            .css({
                "left": event.pageX - 50 + 'px',
                "top": event.pageY - 90 + 'px',
                })
                .append($(`<img src="./images/textures/${terrain[Math.round(Math.random() * 2)]}.png" class="terrain"/>`))
                .appendTo('.game-window');
        if (text === "You won"){
            $('<div class="terrain">')
                .css({
                    "position": 'absolute',
                    "left": event.pageX - 35 + 'px',
                    "top": event.pageY - 75 + 'px',
                    "width": 30 + 'px',
                    "height": 30 + 'px'
                    })
                    .append($(`<img src="./images/textures/${terrain[3]}.png" />`))
                    .appendTo('.game-window');

            $('.game-window').unbind("click");
            $('<div class="victory">').css("z-index", "10").appendTo('.game-window');
            $('.result-input').css('display', 'block')
        }
    });
}

playBtn.click(() => {
    $('.welcome').css('display', 'none');
    $('.game-window').css('display', 'block');
    $('#hint').css('display', 'block');
    $('.buttons').css('display', 'none');
    $('#curr-score').css('display', 'block');

    game();
});

scoretBtn.click(() => {
    $('.buttons').css('display', 'none');
    $('.score').css('display', 'block');
})

mainMenu.click(() => {
    $('.score').css('display', 'none');
    $('.buttons').css('display', 'block');
    $('.game-window').css('display', 'none');
    $('.welcome').css('display', 'block');
    $('#hint').css('display', 'none').text('Click on the map');
    $('.result-input').css('display', 'none')
    $('#curr-score').css('display', 'none');
    $('#curr-score').text('Score: 0');
    $('.terrain').remove();
    $('.victory').remove();
    counter = 0; 
})

cancelBtn.click(() => {
    $('.game-window').css('display', 'none');
    $('.welcome').css('display', 'block');
    $('#hint').css('display', 'none').text('Click on the map');
    $('.result-input').css('display', 'none')
    $('#curr-score').css('display', 'none');
    $('.buttons').css('display', 'block');
    $('#curr-score').text('Score: 0');
    $('.terrain').remove();
    $('.victory').remove();
    counter = 0; 
})

submitBtn.click(() => {
    $('.top').empty();
    let user = $('#user').val();
    score[user] = counter;
    let keysSorted = Object.keys(score).sort(function(a,b){return score[a]-score[b]});
    let propsSorted = Object.keys(score).sort(function(a,b){return score[a]-score[b]}).map(key => score[key]);
    
    for(i = 0; i < 10; ++i){
        $('<li></li>').addClass('topLi' + i).text(keysSorted[i] + ' - ' + propsSorted[i]).appendTo('.top');

        if (keysSorted[i] == undefined){
            $('.topLi' + i).text('')
        }
    }
    

    $('#hint').css('display', 'none').text('Click on the map');
    $('.result-input').css('display', 'none');
    $('#curr-score').css('display', 'none');
    $('#curr-score').text('Score: 0');
    $('.score').css('display', 'block');
})