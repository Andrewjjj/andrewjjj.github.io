// $(window).load(function(){
//     $(document).scroll(function () {
//         var y = $(this).scrollTop();
//         if (y > 1013) {
//             $('#machine1swap').fadeIn('slow');
//         }
//         else {$('#machine1swap').fadeOut('fast')};

//         if (y > 2119) {
//             $('#machine2swap').fadeIn('slow');
//         }
//         else {$('#machine2swap').fadeOut('fast')};

//         if (y > 3216) {
//             $('#machine3swap').fadeIn({});
//         }
//         else {$('#machine3swap').fadeOut('fast')};
//     });
// });
window.onload = function() {
    document.onscroll = function () {
        var y = window.scrollY;
        var firstImageMax = maxWindowHeight

        canvas.style.opacity = 1 - y / firstImageMax;

        console.log(y)
    }
}

const maxWindowHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight)

// const canvas = document.getElementById("bg-canvas");
// const context = canvas.getContext("2d");

// const img = new Image()
// img.src = 'img/main-bg.jpg'
// canvas.width  = window.innerWidth;
// canvas.height = window.innerHeight;
// img.onload=function(){
//     var hRatio = canvas.width / img.width    ;
//     var vRatio = canvas.height / img.height  ;
//     var ratio  = Math.max ( hRatio, vRatio );
//     context.drawImage(img, 0,0, img.width, img.height, 0,0,img.width*ratio, img.height*ratio); 
// }