$(document).ready(function() {

    function getWidth() {
        return $(window).width();
    }

    function getHeight() {
        var height = $(window).height();
        var width = getWidth();

        if (width > 1680) {
            height = 1050;
        } else if (width > 1440 && width <= 1680) {
            height = 960;
        } else if (width > 1366 && width <= 1440) {
            height = 867;
        } else if (width >= 1280 && width <= 1366) {
            height = 768;
        } else if (width >= 1024 && width < 1280) {
            height = 650;
        } else if  (width > 640 && width <= 800) {
            height = 450;
        } else if (width > 568 && width <= 640) {
            height = 360;
        } else if (width > 414 && width <= 568) {
            height = 320;
        } else if (width > 375 && width <= 414) {
            height = 280;
        } else if (width > 320 && width <= 375) {
            height = 250;
        } else if (width > 300 && width <= 320) {
            height = 200;
        }

        return height;
    }

    var height = getHeight()
    var width =  getWidth();

    $("section").css("height", height);
    $("section").css("background-size", width + "px " + height + "px");

    $(window).resize(function(){
        var height = getHeight();
        var width =  getWidth();

        $("section").css("height", height);
        $("section").css("background-size", width + "px " + height + "px");

        console.log("altura " + height);
        console.log("largura " + width);
        console.log($("section").css("background-size"));
    });

    console.log("altura " + height);
    console.log("largura " + width);
    console.log($("section").css("background-size"));

    function postForm(form){
        var name = $("#id_name");
        name.parent().removeClass("has-error");

        var email = $("#id_email");
        email.parent().removeClass("has-error");

        var message = $("#id_message");
        message.parent().removeClass("has-error");

        $("span.has-error").remove();
        $("div.alert.alert-success").remove();

        $.ajax({
            url: "/contact",
            method: "POST",
            data: {
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                name: name.val(),
                email: email.val(),
                message: message.val()
            },
            success(data){
                if(data.status_code == 422){
                    for(var field in data){
                        var input = $("#id_" + field);
                        input.parent().addClass('has-error');
                        input.parent().append("<span class='has-error'>" + data[field][0] + "</span>");
                    }
                }else if(data.status_code == 200){
                    name.val("");
                    email.val("");
                    message.val("");

                    var html = "<div class='alert alert-success'>"
                    html += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                    html += "<span aria-hidden='true'>&times;</span></button>Mensagem enviada com sucesso.</div>";

                    $("#form-contact").append(html);
                }
            },
            error(data){
                console.log("Erro ao enviar a mensagem.");
            }
        })
    }

    $("#form-contact").submit(function(event){
        event.preventDefault()
        postForm(form);
    });

    $('.scroll').on('click', function(event) {
        event.preventDefault();
        var location_anchor = $(this).attr('href');

        if(location_anchor == '#'){
           location_anchor = 'html';
        }

        $('html, body').animate({
            scrollTop: $(location_anchor).offset().top
        }, 1000);
    });

    $(window).scroll(function() {
        $("section").each(function(){
            var top = $(this).offset().top;
            var scroll = document.body.scrollTop;
            if(scroll >= top){
                $(".navbar-custom li.active").removeClass('active');
                $(".navbar-custom li#item-" +  $(this).attr('id')).addClass("active");
            }
        });
    });

    $(window).scroll(function(){
        var navbar = $(".navbar-custom");
        var height = getHeight();

        if($(window).scrollTop() > height - 60) {
            navbar.css("position", "fixed");
            navbar.css("top", 0);
        } else {
            navbar.css("position", "absolute");
            navbar.css("top", "");
            navbar.css("bottom", 0);
        }
    });

});