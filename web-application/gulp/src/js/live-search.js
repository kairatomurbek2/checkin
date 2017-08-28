$('.categories label .name').each(function () {
    $(this).attr('data-search-term', $(this).text().toLowerCase());
});

$('#live-search-input').on('keyup', function () {
    var searchTerm = $(this).val().toLowerCase();
    $(".children").show();
    $('.categories label .name').each(function () {
        if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
            $(this).parent("label").show();
            $(this).parent().siblings("i").show();
        } else {
            $(this).parent("label").hide();
            $(this).parent().siblings("i").hide();
        }

    });

    if (searchTerm == "") {
        $(".children").hide();
    }
    $(".input i.opened").removeClass("opened");
    $(".input .children:visible").each(function(){
        $(this).siblings("i").addClass('opened');
    });
});



$('.categories li a').each(function () {
    $(this).attr('data-search-term', $(this).text().toLowerCase());
});

$('#liveSearch').on('keyup', function () {
    var searchTerm = $(this).val().toLowerCase();
    $(".children").show();
    $('.categories li a').each(function () {
        if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
            $(this).parent("li").show();
        } else {
            $(this).parent("li").hide();
        }

    });

    if (searchTerm == "") {
        $(".children").hide();
    }
    $(".input i.opened").removeClass("opened");
    $(".input .children:visible").each(function(){
        $(this).siblings("i").addClass('opened');
    });
});