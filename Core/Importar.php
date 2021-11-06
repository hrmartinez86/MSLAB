<?php 
session_start();
if ($_SESSION['estado']=="ok" ) {
    
} else {

  header("Location: index.php"); 
  echo "<html></html>";
}
include('Librerias/conection.php');  
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../WEB/Styles/Core/Style_doctype.css">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>Importar Archivo</title>
</head>
<body>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <table align="center" border="0" cellspacing="0" cellpadding="0">
    <!-- BEGIN Record Citas -->
    <tr>
      <td valign="top">
        <?php include("Header.html") ?>
      </td>
    </tr>
  </table>
  <div class="container">
    <div class="text-center">
        <h1>Subir archivo Json</h1>
        <form action="">
            <div class="form-group">
                <label for="">Subir archivo</label>
                <center>
                    <input type="file" name="upload" id="upload" onchange="upload_file()" class="form-control" placeholder="" aria-describedby="helpId">
                    <input type="date" name="fecha_orden" id="fecha_orden">
                </center>
            </div>
            <div class="upload-msg"></div>
            <?php 
            // Read the JSON file
        // $json = file_get_contents('C:\xampp\htdocs\MSLAB\WEB\ingreso.json');

        // // Decode the JSON file
        // $json_data = json_decode($json,true);

        // // Display data
        // print_r($json_data);
        ?>
        </form>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
  <script type="text/javascript">
    function upload_file(){
        $(".upload-msg").text("Cargando....")
        var inputJson=document.getElementById('upload')
        var file=inputJson.files[0]
        var data= new FormData()
        data.append('upload',file)

        $.ajax({
            url:'upload.php',
            type:'post',
            data:data,
            contentType:false,
            cache:false,
            processData:false,
            success:function(data){
                $(".upload-msg").html(data)
            }
        })
    }
  </script>
</body>
</html>