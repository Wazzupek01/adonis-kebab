$(function () {
    window.addEventListener("resize", function() {
        if (window.innerWidth < 520) {
            $("#btn-zamow").addClass("hidden");
            $("#btn-kontakt").addClass("hidden");
        } else if (window.innerWidth < 980 && window.innerWidth >= 520){
            $("#btn-zamow").addClass("btn-sm").removeClass("btn-lg hidden");
            $("#btn-kontakt").addClass("btn-sm").removeClass("btn-lg hidden");
        } else if (window.innerWidth >= 980) {
            $("#btn-zamow").addClass("btn-lg").removeClass("btn-sm");
            $("#btn-kontakt").addClass("btn-lg").removeClass("btn-sm");
        }
    });

})