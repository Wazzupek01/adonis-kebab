$(function () {
    window.addEventListener("resize", function() {
        if (window.innerWidth < 520) {
            $("#btn-order").addClass("hidden");
            $("#btn-contact").addClass("hidden");
        } else if (window.innerWidth < 980 && window.innerWidth >= 520){
            $("#btn-order").addClass("btn-sm").removeClass("btn-lg hidden");
            $("#btn-contact").addClass("btn-sm").removeClass("btn-lg hidden");
        } else if (window.innerWidth >= 980) {
            $("#btn-order").addClass("btn-lg").removeClass("btn-sm");
            $("#btn-contact").addClass("btn-lg").removeClass("btn-sm");
        }
    });

    $("#btn-order").click(function() {
        let order = $("#order");
        if(order.is(":empty")) {
            for (let i = 0; i < 10; i++)
                order.append(`<div class='item'> pozycja ${i+1} <input type='checkbox'><span class='item-checkbox'></span></div>`);
        }
    });
})