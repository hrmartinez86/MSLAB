<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta content="text/html; charset=windows-1252" http-equiv="content-type">
<title>MULTI SYSTEMS</title>
<!--<link rel="icon" type="image/gif" href="favicon.ico">-->
<meta name="GENERATOR" content="CodeCharge Studio 4.2.00.040">
<link rel="stylesheet" type="text/css" href="Styles/INFOLAB/Style_doctype.css">

<script language="JavaScript" type="text/javascript">
//Begin CCS script
//Include Common JSFunctions @1-56D0AF56
</script>
<script language="JavaScript" type="text/javascript" charset="utf-8" src="ClientI18N.php?file=Functions.js&amp;locale={res:CCS_LocaleID}"></script>
<script language="JavaScript" type="text/javascript" charset="utf-8" src="ClientI18N.php?file=DatePicker.js&amp;locale={res:CCS_LocaleID}"></script>
<script language="JavaScript" type="text/javascript">
//End Include Common JSFunctions

//Date Picker Object Definitions @1-2C1716A5

var Citas_DatePicker_Fecha1 = new Object(); 
Citas_DatePicker_Fecha1.format           = "ShortDate";
Citas_DatePicker_Fecha1.style            = "Styles/INFOLAB/Style.css";
Citas_DatePicker_Fecha1.relativePathPart = "";
Citas_DatePicker_Fecha1.themeVersion = "3.0";

var Citas_DatePicker_Fecha_Nac1 = new Object(); 
Citas_DatePicker_Fecha_Nac1.format           = "ShortDate";
Citas_DatePicker_Fecha_Nac1.style            = "Styles/INFOLAB/Style.css";
Citas_DatePicker_Fecha_Nac1.relativePathPart = "";
Citas_DatePicker_Fecha_Nac1.themeVersion = "3.0";

//End Date Picker Object Definitions

//CitasButton_Cancel_OnClick @16-BF128FE6
function CitasButton_Cancel_OnClick()
{
   // disableValidation = true;
}
//End CitasButton_Cancel_OnClick

//bind_events @1-0693DC43
function bind_events() {
    if (functionExists("Header_bind_events")) Header_bind_events();
    addEventHandler("CitasButton_Cancel", "click", CitasButton_Cancel_OnClick);
}
//End bind_events

window.onload = bind_events; //Assign bind_events @1-19F7B649

//End CCS script
</script>

</head>
<body>
<table align="center" border="0" cellspacing="0" cellpadding="0">
<!-- BEGIN Record Citas -->
<tr>
      <td valign="top">
    <?php 
include("Header.html")?>
      </td>
</tr>
 </table>

<br>
<br>
<!-- END Record Citas -->
</body>
</html>
