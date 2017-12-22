//=../../../staticfiles/bower_components/jquery/dist/jquery.js
//=../../../staticfiles/bower_components/selectize/dist/js/standalone/selectize.js
//=../../../staticfiles/bower_components/lightgallery/dist/js/lightgallery-all.js
//=../../../staticfiles/bower_components/jquery-bar-rating/jquery.barrating.js
//=../libs/slick/slick.js
//=../libs/jquery.sticky.js
//=../libs/jquery.maskedinput.js
//=../libs/picker.js
//=../libs/picker.date.js
//=../libs/picker.time.js
//=../libs/ru_RU.js

$(function () {
    $('.tabs-stage > div').hide();


    $('.tabs-nav > li:first-child a').addClass('tab-active');
    var url = document.location.href;


    if (url.includes('#')) {
        var splitted_url = url.split('#');
        if (splitted_url[1] == 'tab-1') {
            $('.tabs-nav > li:last-child a').removeClass('tab-active');
            $('.tabs-nav > li:first-child a').addClass('tab-active');
            $('.tab-1').show();
        }
        else if (splitted_url[1] == 'tab-2') {
            $('.tab-2').show();
            $('.tabs-nav > li:last-child a').addClass('tab-active');
            $('.tabs-nav > li:first-child a').removeClass('tab-active');
        }
    }
    else {
        $('.tabs-nav > li:first-child a').addClass('tab-active');
        $('.tab-1').show();
    }


    $('.tabs-nav > li > a').on('click', function (event) {
        $('.tabs-nav > li a').removeClass('tab-active');
        $(this).addClass('tab-active');
        $('.tabs-stage > div').hide(400);
        $($(this).attr('href').replace('#', '.')).show(400);
    });

    var p_link = $('.tab-2 .pagination a');

    p_link.each(function (i, obj) {
        var h_attr = $(obj).attr('href');
        $(obj).attr('href', h_attr + '#tab-2');
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
        $('.registered_person').fadeOut(250);
        $('.book').fadeOut(250);
        $('.sub_menu').slideUp(250);
        $('.review_modal').fadeOut(350);
    });

    $('.modal, .order-modal-wrap').click(function () {
        $('.blur').css('filter', 'none');
    });

    $('#leave_comment').click(function (event) {
        event.stopPropagation();
        event.preventDefault();
        $('.review_modal').fadeIn(350);
        // $('.blur').css('filter', 'blur(5px)');

    });

    $('.log-out').click(function (event) {
        $('.modal').css('display', 'none');
        $('.logout_modal').fadeIn(350);
        $('.blur').css('filter', 'blur(5px)');
    });

    $('.close_modal').click(function (event) {
        $('.review_modal, .order-modal-wrap').css('display', 'none');
        $('.blur').css('filter', 'none');
    });

    $('.s_register, .c_register, .registered_person, .book, .logout_modal > div, .review_form, .order-modal').click(function (event) {
        event.stopPropagation();
    });

    $(".order-modal-wrap").click(function () {
        $(".order-modal-wrap").css("display", "none");
    });

    function preview(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#upload").change(function () {
        preview(this);
    });


    $('#id_categories').selectize({
        sortField: 'text'
    });


    $('.no').click(function (event) {
        $('.logout_modal').fadeOut(250);
        $('.blur').css('filter', 'none');
    });


    var $file = $('.image_preview'),
        $label = $file.next('label'),
        $labelText = $label.find('span');

    // When a new file is selected
    $file.on('change', function (event) {
        var fileName = $file.val().split('\\').pop(),
            tmppath = URL.createObjectURL(event.target.files[0]);
        //Check successfully selection
        if (fileName) {
            $label
                .addClass('file-ok')
                .css('background-image', 'url(' + tmppath + ')');
            // $labelText.text(fileName);
        } else {
            $label.removeClass('file-ok');
            // $labelText.text(labelDefault);
        }
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

    $('#id_company_tags').selectize({
        persist: false,
        createOnBlur: true,
        create: true
    });

    $("#sticker").sticky({
        topSpacing: 0,
        bottomSpacing: '616',
        getWidthFrom: 'base-filter'
    });

    function phone_mask(event) {
        $(".mask").mask("+996(000) 00-00-00");
    }

    phone_mask();

    $('.add-row').click(function (event) {
        phone_mask();
    });

    // $('').click(function (event) {
    //     phone_mask();
    // });


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

    function slick_init(obj) {
        $(obj).slick({
            cssEase: 'ease-in',
            // autoplay: true,
            // autoplaySpeed: 3000,
            variableWidth: true,
            // infinite: false
            slidesToShow: 6,
            slidesToScroll: 1,
            draggable: false,
            responsive: [
                {
                    breakpoint: 420,
                    settings: {
                        centerMode: true,
                        centerPadding: '20px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    }


    if ($('.certificate_slider a').length > 6) {
        slick_init('.certificate_slider');
    }

    $('.favourite').click(function (event) {
        if ($(this).hasClass('fav_active')) {
            $(this).removeClass('fav_active');
        } else {
            $(this).addClass('fav_active');
        }
    });

    $('.s_sex > option:first-of-type').html('Выберите пол');

    // $('.main').perfectScrollbar();

    $('.timepicker').pickatime({
        format: 'HH:i',
        min: [6, 0],
        max: [21, 0],
        interval: 60,
        clear: ''
    });

    // $.fn.hasAttr = function(name) {
    //     return this.attr(name) !== undefined;
    // };

    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };

    function changeValue(key, data, flag) {
        // console.log(data);
        // console.log(key);
        var true_input = $('#true-inputs').find('input#id_' + key);
        var true_value = true_input.val().replace(/[^\d.]/g, '');

        if (flag === "from") {
            if ((true_input.val() !== "") && (true_value.length <= 4)) {
                true_input.val(data + true_input.val());
            }
            else {
                true_input.val("");
                true_input.val(data + " - ");
            }

            // console.log($('input#id_' + key).val());
        } else {
            if ((true_input.val() !== "") && (true_value.length <= 4)) {
                true_input.val(true_input.val() + data);
            } else {
                true_input.val("");
                true_input.val(" - " + data);
            }

            console.log($('input#id_' + key).val());
        }
    }

    var day_key;

    $('.from-time').on('change', function () {
        day_key = $(this).parent('.fieldset__wrapper').parent('.time_limit').parent('.get_time').attr('data-key');
        var that = $(this);
        changeValue(day_key, that.val(), "from");

        if (that.closest('.get_time').hasAttr('data-first')) {
            $(".from-time").not(that).each(function (i, item) {
                if (($(item).closest('.get_time').attr('data-key') !== 'sunday') &&
                    ($(item).closest('.get_time').find('input.day').hasAttr('checked'))) {
                    $(item).val(that.val());
                    var item_key = $(item).closest('.get_time').attr('data-key');
                    changeValue(item_key, that.val(), "from")
                }
            });
        }

    });

    $('.to-time').on('change', function () {
        day_key = $(this).parent('.fieldset__wrapper').parent('.time_limit').parent('.get_time').attr('data-key');
        var that = $(this);
        changeValue(day_key, that.val(), "to");

        if (that.closest('.get_time').hasAttr('data-first')) {
            $(".to-time").not(that).each(function (i, item) {
                if (($(item).closest('.get_time').attr('data-key') !== 'sunday') &&
                    ($(item).closest('.get_time').find('input.day').hasAttr('checked'))) {
                    $(item).val(that.val());
                    var item_key = $(item).closest('.get_time').attr('data-key');
                    changeValue(item_key, that.val(), "to");
                }
            });
        }

    });


    $('.day').on('click', function () {
        var parent = $(this).siblings('.time_limit');
        var parent_key = $(this).parent('.get_time').attr('data-key');
        if ($(this).attr('checked')) {
            $(this).attr('checked', false);
            parent.find('input.from-time').attr("disabled", true)
                .val("");
            parent.find('input.to-time').attr("disabled", true)
                .val("");
            $('#true-inputs').find('input#id_' + parent_key).val("");

        } else {
            $(this).attr('checked', true);
            parent.find('input.from-time').attr("disabled", false)
                .val("");
            parent.find('input.to-time').attr("disabled", false)
                .val("");
        }

        console.log($('input#id_' + parent_key).val());
    });

    $('.datepicker').pickadate({
        monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        selectMonths: true,
        format: 'dd.mm.yy',
        formatSubmit: 'dd.mm.yy'
    });

    $('.star_rating').barrating({
        theme: 'fontawesome-stars',
        showSelectedRating: false
    });

    $(".menu-collapsed").click(function () {
        $(this).toggleClass("menu-expanded");
    });

    var wWidth = $(window).width();
    console.log(wWidth);

    if (wWidth <= 1070) {
        $('.favourite_text').html('');
    }

    if (wWidth <= 400) {
        $('#search-field').attr('placeholder', 'Найти сервис...');
    }

    if (wWidth <= 700) {
        $('#sticker').unstick();
    }

    var touch = $('.hidden_menu');
    var menu = $('.signup-menu');

    $(touch).on('click', function(e){
        e.preventDefault();
        menu.slideToggle();
    });

    $(window).resize(function(){
        var wid = $(window).width();
        if(wid > 760 && menu.is(':hidden')){
            menu.removeAttr('style');
        }

    });


});





























