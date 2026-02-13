$(function () {
    var isOverGoogleAdinfo = false;
    $('#div-gpt-ad-1766482883767-0').on('mouseover', function () {
        isOverGoogleAdinfo = true
    });
    $('#div-gpt-ad-1766482883767-0').on('mouseout', function () {
        isOverGoogleAdinfo = false
    });

    $(window).blur(function (e) {
        if (isOverGoogleAdinfo == true) {
            console.log('info_blur');
            dataLayer.push({'event': 'xq-dj01'})
        }

    })
});