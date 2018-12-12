$(function() {
    function skillLevel(t, num, index) {
        if (index == 0 || index == 1) {
            $(t).css({
                "background-position": "0 " + (num + 0.6) + "rem"
            })
        }
        if (index == 2 || index == 3) {
            $(t).css({
                "background-position": "0 " + (num + 1.5) + "rem"
            })
        }
        if (index == 4) {
            $(t).css({
                "background-position": "0 " + (num + 1.5) + "rem"
            })
        }
        if (index == 5 || index == 6) {
            $(t).css({
                "background-position": "0 " + (num + 2.2) + "rem"
            })
        }
        if (index == 7) {
            $(t).css({
                "background-position": "0 " + (num + 2.5) + "rem"
            })
        }
    }
    
    $("#wrap").fullpage({
        scrollingSpeed: 1500,
        loopBottom: true,
        lazyLoading: true,
        afterLoad: function(link, index) {
            if (index == 1) {
                $(".item").each(function(index, item) {
                    setTimeout(() => {
                        $(item).addClass("animated fadeIn");
                    }, 1000* (index+1));
                });
            }

            if (index == 2) {
                let num = 2;
                $(".two-container .header").addClass("animated slideInDown").css({
                    "transition": ".5s",
                    "opacity": 1
                });
                $(".skill").each(function (index, item) {
                    setTimeout(() => {
                        if(index < 4) {
                            $(item).addClass("animated slideInLeft");
                        } else {
                            $(item).addClass("animated slideInRight");
                        }
                        $(item).fadeTo(100, 1, function() {
                            if ($(window).width() > 765) {
                                skillLevel(this, 2, index);
                            } else {
                                skillLevel(this, 1, index)
                            }
                        });
                    }, 250 * (index + 1));
                });
            }

            if (index == 3) {
                $(".three-container .header").addClass("animated slideInDown").css({
                    "transition": ".5s",
                    "opacity": 1
                });
                $(".wraper").css({
                    "border-left": "5px solid white"
                })
                $(".exp").each(function (index, item) {
                    setTimeout(() => {
                        $(item).addClass("animated slideInLeft");
                        $(item).fadeTo(1000, 1);
                    }, 250 * (index+1));
                })
            }

            if (index == 4) {
                $(".four-container .header").addClass("animated slideInDown").css({
                    "transition": ".5s",
                    "opacity": 1
                });
                $(".connect").each(function (index, item) {
                    setTimeout(() => {
                        $(item).addClass("animated slideInDown");
                        $(item).fadeTo(1000, 1);
                    }, 500 * (index+1));
                })
            }
        }
    });

    let links = [
        'https://kokota.github.io/resume/img/bg1.jpg',
        'https://kokota.github.io/resume/img/bg2.jpg',
        'https://kokota.github.io/resume/img/bg3.jpg'
    ];
    var count = 0;
    links.forEach(function (src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            console.log('ok');
            if (++count === 3) {
                $(".mask-left").css({
                    "left": -50 + "%"
                })
                $(".mask-right").css({
                    "right": -50 + "%"
                })
                setTimeout(() => {
                    $(".mask").css({
                        "visibility": "hidden"
                    })
                }, 1000);
            }
        }
    })
})