//get parameters for region, check after reload
setTimeout(function () {
    var chosenRegion = getParameter("region");
    for (var i in chosenRegion) {
        chosenRegion[i] = decodeURIComponent(chosenRegion[i]);
        chosenRegion[i] = chosenRegion[i].replace("+", " ");
        $("#id_region").append('<option value="' + chosenRegion[i] + '" selected="selected">' + chosenRegion[i] + '</option>')
    }
}, 200);



//get parameters for category, check after reload
$(document).ready(function () {
    var chosenCategories = getParameter("categories");
    for (var i in chosenCategories) {
        $(".filter-categories input").each(function () {
            if (chosenCategories[i] == $(this).val()) {
                $(this).prop("checked", true);
                $(this).closest(".children").show();
                $(this).closest(".main-category").children(".children").show();
                $(this).closest(".main-category").children("i").addClass("opened");
                $(this).siblings("i").addClass("opened");
            }
        });
    }
});

//filter checkboxes reload page init
$(document).ready(function () {
    $('input[type="checkbox"]').each(function (e) {

        if ($(this).prop("checked")) {
            var checked = $(this).prop("checked"),
            container = $(this).parent(),
            siblings = container.siblings();

            container.find('input[type="checkbox"]').prop({
                indeterminate: false,
                checked: checked
            });

            function checkSiblings(el) {

                var parent = el.parent().parent(),
                all = true;

                el.siblings().each(function () {
                    return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
                });

                if (all && checked) {

                    parent.children('input[type="checkbox"]').prop({
                        indeterminate: false,
                        checked: checked
                    });

                    checkSiblings(parent);

                } else if (all && !checked) {

                    parent.children('input[type="checkbox"]').prop("checked", checked);
                    parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
                    checkSiblings(parent);

                } else {

                    el.parents("li").children('input[type="checkbox"]').prop({
                        indeterminate: true,
                        checked: false
                    });

                }

            }

            checkSiblings(container);
        }
    });
    //logic for showing/hiding filter fields
    if ($("#id_country").val()) {
        if ($("#id_country").val().length == 1) {
            $(".filter-region").fadeIn('fast');
            region_update()
        } else if ($("#id_country").val() == null || $("#id_country").val().length != 1) {
            $(".filter-region").fadeOut('fast');
        }
    }
});

//filter checkboxes
$('input[type="checkbox"]').change(function (e) {

    var checked = $(this).prop("checked"),
    container = $(this).parent(),
    siblings = container.siblings();

    container.find('input[type="checkbox"]').prop({
        indeterminate: false,
        checked: checked
    });
    function checkSiblings(el) {

        var parent = el.parent().parent(),
        all = true;

        el.siblings().each(function () {
            return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
        });

        if (all && checked) {

            parent.children('input[type="checkbox"]').prop({
                indeterminate: false,
                checked: checked
            });

            checkSiblings(parent);

        } else if (all && !checked) {

            parent.children('input[type="checkbox"]').prop("checked", checked);
            parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
            checkSiblings(parent);

        } else {

            el.parents("li").children('input[type="checkbox"]').prop({
                indeterminate: true,
                checked: false
            });

        }

    }

    checkSiblings(container);
});

$("#id_country").change(function () {
    if ($(this).val()) {
        if ($("#id_country").val().length == 1) {
            $(".filter-region").fadeIn('fast');
            region_update()
        } else if ($("#id_country").val() == null || $("#id_country").val().length != 1) {
            $(".filter-region").fadeOut('fast');
        }
    } else {
        $(".filter-region").fadeOut('fast');
    }
});
function region_update() {
    var country = $("#id_country").val();
    var paginated_by = 30;
    $("#id_region").html('').select2({
        placeholder: translater('Select a region / region'),
        ajax: {
            url: "/ru/api/geo/regions/",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    all: 1,
                    country: country[0],
                    page: params.page,
                    search: params.term
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                $.map(data.results, function (obj) {
                    obj.text = obj.name;
                    obj.id = obj.name;

                    return obj;
                });

                return {
                    results: data.results,
                    pagination: {
                        more: (params.page * paginated_by) < data.count
                    }
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        }
    });
}

//change submit request for categories
$("#base_filter").submit(function () {
    $(".root > input").each(function () {
        if ($(this).prop("checked") == true) {
            $(this).parent().children(".children").find("input").prop("checked", false);
        }
    })
    $(".child > input").each(function () {
        if ($(this).prop("checked") == true) {
            $(this).parent().children(".children").find("input").prop("checked", false);
        }
    })
    if ($("#id_region").is(":hidden")) {
        $("#id_region option").each(function () {
            $(this).removeAttr("selected")
        });
    }
})

//hide or show children elements on arrow click
$(".input i").click(function () {
    if ($(this).siblings('.children').is(":hidden")) {
        $(this).siblings('.children').slideDown("fast");
        $(this).addClass("opened");
        $(this).siblings('label').children('span.name').css('color', '#333');
    } else {
        $(this).siblings('.children').slideUp("fast");
        $(this).removeClass("opened");
        $(this).siblings('label').children('span.name').css('color', '#95989A');
    }
});


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


function getParameter(variable) {
 var param = [];
 var query = window.location.search.substring(1);
 var vars = query.split("&");
 for (var i = 0; i < vars.length; i++) {
     var pair = vars[i].split("=");
     if (pair[0] == variable) {
         param.push(pair[1]);
     }
 }
 return (param);
}/**
 * Created by nurbek on 8/28/17.
 */
