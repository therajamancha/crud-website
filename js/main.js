$( document ).ready(function() {
    $(".mobile-menu").click(function(e){
        e.preventDefault();
        $('.portfolio-aside').toggleClass('active');
    });
});