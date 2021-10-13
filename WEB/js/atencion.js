function cmbioEdad() {
    var edad=document.getElementById('edad').value;

    var date = new Date();

    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();

    var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);

    var yyyy = date.getFullYear()-edad;

    document.getElementById('Fecha').value=yyyy + "-" + MM + "-" + dd;
}

