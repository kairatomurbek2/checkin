function load_page(page_url, paginationfield_id, loadbutton_id, pagediv_id, callback) {
    var page = parseInt($(paginationfield_id).val());

    $(loadbutton_id).prop("disabled", true);
    $('#loading')[0].style.display = '';
    $.ajax({
        async: true,
        type: "GET",
        url: page_url,
        data: {page: page},
        error: function () {
            $(loadbutton_id).addClass('hidden');
            callback(false)
        },
        success: function (data) { // check if there is an additional page
            // , disable load button if not
            $('#loading')[0].style.display = 'none';
            $.ajax({
                async: true,
                type: "HEAD",
                url: page_url,
                data: {page: page + 1},
                error: function (data) {
                    $(loadbutton_id).addClass('hidden');
                    callback(false)
                },
                success: function (response) {
                    $(loadbutton_id).text(translater('Show more'));
                    $(paginationfield_id).val(page + 1);
                    $(loadbutton_id).prop("disabled", false);
                    callback(true)
                }
            });
            $(pagediv_id).append(data);
            $('.producers-item-img').height($('.producers-item-img').width());
        }
    });

}