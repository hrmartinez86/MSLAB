<?
define( "_PL_OS_SEP", "/" );
define( "_CUR_OS", substr( php_uname( ), 0, 7 ) == "Windows" ? "Win" : "_Nix" );

function checkCurrentOS( $_OS )
{
   if ( strcmp( $_OS, _CUR_OS ) == 0 ) {
       return true;
   }
   return false;
}

function isRelative( $_dir )
{
   if ( checkCurrentOS( "Win" ) ) {
       return ( preg_match( "/^\w+:/", $_dir ) <= 0 );
   }
   else {
       return ( preg_match( "/^\//", $_dir ) <= 0 );
   }
}

function unifyPath( $_path )
{
   if ( checkCurrentOS( "Win" ) ) {
       return str_replace( "\\", _PL_OS_SEP, $_path );
   }
   return $_path;
}

function getRealpath( $_path )
{
   /*
     * This is the starting point of the system root.
     * Left empty for UNIX based and Mac.
     * For Windows this is drive letter and semicolon.
     */
   $__path = $_path;
   if ( isRelative( $_path ) ) {
       $__curdir = unifyPath( realpath( "." ) . _PL_OS_SEP );
       $__path = $__curdir . $__path;
   }
   $__startPoint = "";
   if ( checkCurrentOS( "Win" ) ) {
       list( $__startPoint, $__path ) = explode( ":", $__path, 2 );
       $__startPoint .= ":";
   }
   # From now processing is the same for WIndows and Unix, and hopefully for others.
   $__realparts = array( );
   $__parts = explode( _PL_OS_SEP, $__path );
   for ( $i = 0; $i < count( $__parts ); $i++ ) {
       if ( strlen( $__parts[ $i ] ) == 0 || $__parts[ $i ] == "." ) {
           continue;
       }
       if ( $__parts[ $i ] == ".." ) {
           if ( count( $__realparts ) > 0 ) {
               array_pop( $__realparts );
           }
       }
       else {
           array_push( $__realparts, $__parts[ $i ] );
       }
   }
   return $__startPoint . _PL_OS_SEP . implode( _PL_OS_SEP, $__realparts );
}

$ruta_ = getRealpath("Imagenes") . "/";
return $ruta_;

//echo "getRealpath ../../x: ". getRealpath( "../../x" ) . "<BR>\n";
//echo "getRealpath ./../x: ". getRealpath( "./../x" ) . "<BR>\n";
//echo "getRealpath x: ". getRealpath( "x" ) . "<BR>\n";
//echo "getRealpath /../x: ". getRealpath( "/../x" ) . "<BR>\n";
//echo "getRealpath d:/../../x: ". getRealpath( "d:/../../x" ) . "<BR>\n";
//echo "getRealpath ./../xx/xxx/.////../yyy: ". getRealpath( "./../xx/xxx/.////../yyy" ) . "<BR>\n";

?>