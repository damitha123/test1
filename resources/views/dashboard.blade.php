<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>Test</title>
  <base href="<?php echo env('APP_URL') ?>/public/dashboard">
  <!-- CSS only -->

  <link href="<?php echo env('APP_URL') ?>/resources/Bootstrap/bootstrap@5.1.3/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<?php
header("Cache-Control: no-cache, must-revalidate"); //HTTP 1.1
header("Pragma: no-cache"); //HTTP 1.0
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
$html='';
$IndexHtmlFile = fopen(base_path().'/resources/FrontEnd/dist/front-end/index.html', "r") or die("Unable to open html file!");
// Output one line until end-of-file
while(!feof($IndexHtmlFile)) {
  $html .= fgets($IndexHtmlFile);
}
fclose($IndexHtmlFile);
$baseRefTag='<base href="/">';
$positionOfBaseRefTag=strpos($html,$baseRefTag);
$lengthOfBaseRefTag=strlen($baseRefTag);
$headClosingTag='</head>';
$positionOfHeadClosingTag=strpos($html,$headClosingTag);
$inbetweenStuff=substr($html,$positionOfBaseRefTag+$lengthOfBaseRefTag,$positionOfHeadClosingTag-($positionOfBaseRefTag+$lengthOfBaseRefTag));
$lines=explode('>',$inbetweenStuff);
$linksEtc='';
foreach ($lines as $line){
    $linksEtc .= $line . '>';
}
$linksEtc=substr($linksEtc,0,strlen($linksEtc)-1);
$lines=explode('>',$linksEtc);
$count=count($lines);
$index=0;
$lines1=array();
foreach($lines as $line){
    if($index<$count-1){
        $line1=$line.'>';
    }else{
        $line1=$line;
    }
    $index++;
    array_push($lines1,$line1);
}
$lines=array();
foreach ($lines1 as $line1){
    if(strpos($line1,'<link ')>-1){
        $href=' href="';
        $href1=substr($line1,strpos($line1,$href)+strlen($href));
        $href= substr($href1, 0, strpos($href1,'">'));
        if(strpos($href,'http')>-1){
            array_push($lines,$line1);
        }else{
            $line1= str_replace($href, env('APP_URL').'/resources/FrontEnd/dist/front-end/'.$href, $line1);
            array_push($lines,$line1);
        }
        
    }else{
        array_push($lines,$line1);
    }
}
$linksEtc='';
foreach ($lines as $line){
    
    echo $line;
}


?>
    </head>
    <body>
    <app-root></app-root>
    <script src="<?php echo env('APP_URL') ?>/resources/jQuery/jquery-3.6.0.min.js" type="text/javascript"></script>
    <script src="<?php echo env('APP_URL') ?>/resources/jQuery/jquery.alphanum-master/jquery.alphanum.js" type="text/javascript"></script>
    <script src="<?php echo env('APP_URL') ?>/resources/Bootstrap/bootstrap@5.1.3/bootstrap.bundle.min.js" type="text/javascript"></script>
<?php
    $IndexHtmlFile = fopen(base_path().'/resources/FrontEnd/dist/front-end/index.html', "r") or die("Unable to open html file!");
    // Output one line until end-of-file
    while(!feof($IndexHtmlFile)) {
      $html .= fgets($IndexHtmlFile);
    }
    fclose($IndexHtmlFile);
    $ClosingAppRootTag='</app-root>';
    $positionOfClosingAppRootTag=strpos($html,$ClosingAppRootTag);
    $lengthOfClosingAppRootTag=strlen($ClosingAppRootTag);
    $UpperPortion=substr($html,$positionOfClosingAppRootTag+$lengthOfClosingAppRootTag);
    $Scripts=substr($UpperPortion,0,strpos($UpperPortion,'</body>'));
    $Scripts1=explode('</script>',$Scripts);
    foreach($Scripts1 as $Script){
        $Src=' src="';
        $BeginningPortion=substr($Script,strpos($Script,$Src)+strlen($Src));
        $ActualSrc=substr($BeginningPortion,0,strpos($BeginningPortion,'" '));
        $first4=substr($ActualSrc,0,4);
        if($first4=='http'){
            echo $Script.'</script>';
        }else{
            $Script1=str_replace($ActualSrc,env('APP_URL').'/resources/FrontEnd/dist/front-end/'.$ActualSrc,$Script).'</script>';
            echo $Script1;
        }

    }   
    
        
    ?>  
    {{ csrf_field() }}
    <script>
        $(function(){
            $('[data-toggle="tooltip"]').tooltip();
//            let Reloaded=window.localStorage.getItem('Reloaded');
//            if(Reloaded===undefined){
//              window.localStorage.setItem('Reloaded','true');
//              window.location.reload();
//            }else{
//              window.localStorage.removeItem('Reloaded');
//            }

        });
    </script>
    </body>
</html>