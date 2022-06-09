$(function(){
    let keys = Object.keys(localStorage);
    for(let key of keys) {
        let item = localStorage.getItem(key);
        $("#history").append("<tr><td>"+key+"</td><td>"+item+"</td></tr>");
        $("#order-number").append("<option value='"+key+"'>zamowienie nr " + key +"</option>");
        console.log(key);
    }
    $("#delete-order").click(function () {
        localStorage.removeItem($('#order-number :selected').val());
        location.reload();
    });

    $("#delete-history").click(function () {
        localStorage.clear();
        location.reload();
    })
})