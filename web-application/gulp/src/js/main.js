//=../../../staticfiles/bower_components/jquery/dist/jquery.js
//=../../../staticfiles/bower_components/selectize/dist/js/standalone/selectize.js
//=../../../staticfiles/bower_components/lightgallery/dist/js/lightgallery-all.js
//=../libs/jquery.sticky.js
//=../libs/jquery.maskedinput.js

$(function () {
    $('.tabs-stage > div').hide();
    $('.tabs-stage > div:nth-child(1)').show();
    $('.tabs-nav > li:first-child a').addClass('tab-active');

    $('.tabs-nav > li > a').on('click', function (event) {
        event.preventDefault();
        $('.tabs-nav > li a').removeClass('tab-active');
        $(this).addClass('tab-active');
        $('.tabs-stage > div').hide(400);
        $($(this).attr('href')).show(400);
    });

    $('.authorised_user > li:last-child').click(function (event) {
        event.stopPropagation();
        var dropBlock = $('.sub_menu');
        if (dropBlock.is(':hidden')) {
            dropBlock.slideDown(250);
        } else {
            dropBlock.slideUp(250);
        }
    });


    $(document).click(function () {
        // $('.filters').slideUp();
        $('.modal').fadeOut(350);
        $('.blur').css('filter', 'none');
        $('.registered_person').fadeOut(250);
        $('.book').fadeOut(250);
        $('.sub_menu').slideUp(250);
    });

    $('#log-in, .r_user').click(function (event) {
        event.stopPropagation();
        $('.modal').css('display', 'none');
        $('.c_modal').fadeIn(350);
        $('.blur').css('filter', 'blur(5px)');
    });

    $('#sign-up, .n_user').click(function (event) {
        event.stopPropagation();
        $('.modal').fadeIn(350);
        $('.c_modal').css('display', 'none');
        $('.logout_modal').css('display', 'none');
        $('.blur').css('filter', 'blur(5px)');
    });

    $('.log-out').click(function (event) {
        $('.modal').css('display', 'none');
        $('.logout_modal').fadeIn(350);
        // $('.logout_modal').css('display', 'none');
        $('.blur').css('filter', 'blur(5px)');
    });

    $('.s_register, .c_register, .registered_person, .book, .logout_modal > div').click(function (event) {
        event.stopPropagation();
    });

    var password = document.getElementById("password")
        , confirm_password = document.getElementById("confirm_password");

    function validatePassword() {
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Пароли не совпадают");
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;


    function preview(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#upload").change(function () {
        preview(this);
    });

    var r_person = $('.registered_person');
    $('.dt li.registered').append(r_person);


    var r_cell = $('.dt li.registered');

    r_cell.each(function (i, obj) {
        $(obj).on('click', function (event) {
            event.stopPropagation();
            $('.book').fadeOut(250);
            $('.registered_person').fadeOut(250);
            $(this).children('.registered_person').fadeIn(250);
        });
    });

    var booking = $('.book');
    $('.dt li.free').append(booking);
    var f_cell = $('.dt li.free');
    f_cell.each(function (i, obj) {
        $(obj).on('click', function (event) {
            event.stopPropagation();
            $('.registered_person').fadeOut(250);
            $('.book').fadeOut(250);
            $(this).children('.book').fadeIn(250);
        });
    });


    $('#id_categories').selectize({
        sortField: 'text'
    });

    $('.add_block > span').click(function (event) {
        $(this).siblings('div').append('<div class="delete_block"><input type="tel" placeholder="Телефон"><span class="delete"></span></div>');

        $('.delete').click(function () {
            $(this).parent('.delete_block').remove();
        });

    });


    $('.no').click(function (event) {
        $('.logout_modal').fadeOut(250);
        $('.blur').css('filter', 'none');
    });


    $('.image-box').click(function (event) {
        var imgg = $(this).children('img');
        $(this).siblings().children("input").trigger('click');

        $(this).siblings().children("input").change(function () {
            var reader = new FileReader();

            reader.onload = function (e) {
                var urll = e.target.result;
                $(imgg).attr('src', urll);
                imgg.parent().css('background', 'transparent');
                imgg.show();
                imgg.siblings('p').hide();

            }
            reader.readAsDataURL(this.files[0]);
        });
    });

    $('#lightgallery').lightGallery({
        thumbnail: false,
        autoplayControls: false,
        share: false
    });

    $('#id_tags').selectize({
        persist: false,
        createOnBlur: true,
        create: true
    });

    $("#sticker").sticky({
        topSpacing: 0,
        bottomSpacing: '616',
        getWidthFrom: 'base-filter'
    });

    $(".mask").mask("+996(000) 00-00-00");

    function check_input(event) {
        var add_file = $('.add_file');

        add_file.each(function (i, obj) {
            $(obj).on('change', function (event) {
                // var value = $(this).val();
                $(this).siblings('span.js-value').text($(obj).val());
            });
        });
    }

    check_input();

    // $('.add_file').change(function(){
    // 	var value = $('.add_file').val();
    // 	$('.js-value').text(value);
    // });


    $('.general_information .add-row').click(function (event) {
        check_input();
    });


    // $('#menu > li > a').on('click', function (event) {
    //     // event.preventDefault();
    //     $('#menu > li > a').removeClass('link_active');
    //     $(this).addClass('link_active');
    // });


});