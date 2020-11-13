$(document).ready(() => {
    $('#modal1Close').on('click', () =>{
        $('.modal1').removeClass('opened');
    });


    $('#loginBtn').click(() =>{
        $('.modal1').addClass('opened');
    });

});