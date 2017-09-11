
// //get parameters for category, check after reload
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

//
// //change submit request for categories
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
    // if ($("#id_region").is(":hidden")) {
    //     $("#id_region option").each(function () {
    //         $(this).removeAttr("selected")
    //     });
    // }
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