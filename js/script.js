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

    $(".btn-order").click(function() {
        let order = $("#order");
        if(order.is(":empty")) {
            for (let i = 0; i < 10; i++)
                order.append(`<div class='item'><div><img src="../img/kebab.png" alt="produkt ${i+1}">
                                kebab ${i+1}</div> <input type='checkbox' name="kebab ${i+1}"></div>`);
            order.append(`<div id="submit"><input type="submit" value="Do koszyka" class="btn btn-danger" /></div>`)
        } else {
            order.empty();
        }
    });
})

