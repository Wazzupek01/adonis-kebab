class Item {
    constructor(name, price){
        this.name = name;
        this.price = price;
        this.isChecked = false;
    }
}

let items = [];
let checked = 0;

$(function () {
    for (let i = 0; i < 6; i++){
        fetch("./js/kebabs.json")
            .then(response => response.json())
            .then(jsondata => {
                items.push(new Item(jsondata.kebabs[i].kebabName, jsondata.kebabs[i].price));
            });
    }

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
            for (let i = 0; i < 6; i++) {
                order.append(`<div class='item form-switch'><div><img src="../img/kebab.png" alt="produkt ${i}">
                                <label class="form-check-label" for="kebab${i}">${items[i].name}</label></div>
                                <input class="form-check-input" type="checkbox" role="switch" id="kebab${i}"></div>`);
            }
            order.append(`<div id="submit"><input type="submit" value="Do koszyka" class="btn btn-danger" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"/></div>`);
            let checkboxElems = document.querySelectorAll("input[type='checkbox']");
            for (let i = 0; i < checkboxElems.length; i++) {
                checkboxElems[i].addEventListener("click", function (e) {
                    if (e.target.checked) {
                        $("#empty").remove();
                        $(".basket").append(`<li class="k${i}">`+ items[i].name + " " + items[i].price + `zł</li>`);
                        items[i].isChecked = true;
                        console.log(items[i].isChecked);
                        checked++;
                    } else {
                        checked--;
                        items[i].isChecked = false;
                        console.log(items[i].isChecked);
                        let id = ".k" + i;
                        $(id).remove();
                        if(checked < 1) {
                            $(".basket").innerHTML = '<li id="empty">Koszyk jest pusty</li>';
                        }
                    }
                });
            }
        } else {
            order.empty();
        }
    });


    function checkInput(inputID, expression){
        let inputField = document.getElementById(inputID);
        return expression.test(inputField.value);
    }

  $("#place-order").click(function () {
        let submit = true;
        let regexName = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]{2,20}$/;
        let regexPost = /\d{2}-\d{3}/;

        if(!checkInput("name",regexName)){
            submit = false;
            alert("Złe lub brak imienia!");
        }
        if(!checkInput("surname",regexName)){
            submit = false;
            alert("Złe lub brak nazwiska!");
        }
        /*if(!checkInput("street",regexStreet)){
            submit = false;
            alert("Źle podano ulicę!");
        }*/
        if(!checkInput("postnumber",regexPost)){
            submit = false;
            alert("Źle podany kod pocztowy!");
        }
        if(!checkInput("city",regexName)){
            submit = false;
            alert("Złe lub brak imienia!");
        }
        if(checked < 1){
            submit = false;
            alert("Nie wybrano żadnych produktów");
        }

        if(submit){
            let key = Object.keys(localStorage).length + 1;
            let order = "";
            let payment = 0;
            for(let i = 0; i< 6; i++){
                if(items[i].isChecked) {
                    order += items[i].name.toString() + " " + items[i].price.toString() + "\n";
                    payment += parseInt(items[i].price);
                }
            }
            order += "cena końcowa: " + payment +"\n";
            order += "Dane klienta: " + "\n";
            order += $("#name").val() + " " + $("#surname").val() + "\n";
            order += $("#email").val() + "\n";
            order += $("#phone").val() + "\n";
            order += $("#street").val() + "\n";
            order += $("#postnumber").val() + " " + $("#city").val() + "\n";
            alert(order);
            localStorage.setItem(key,order);
        }
    });
})




