<?php
include('connection.php');

    // Scrap for new articles to show

    function scrap(){
    include('simple_html_dom.php');
    $html = file_get_html('http://rtd.dj/actualites/politique');

    foreach($html->find('div.article') as $article) {

    $item['image'] = $article->find('img', 0) ->src;
    $item['title'] = $article->find('h2', 0)->plaintext;
    $item['date']  = $article->find('span[class=published]', 0)->plaintext;
    $item ['text'] = $article->find('div[class=article-introtext]', 0)->plaintext;
    $articl[] = $item;
    $imglink = 'http://rtd.dj'.$item['image'];
    $title =$article->find('h2', 0)->plaintext;
    $date = $article->find('span[class=published]', 0)->plaintext;
    $texte = $article->find('div[class=article-introtext]', 0)->plaintext;

 }

//  Got 5 from the page, take the 3 last published

    $articl =\array_diff_key($articl, ["3" => "xy", "4" => "xy"]);
    //provide db

    include('connection.php'); 

    // function to insert multiple rows

    function insertion ($articl, $link){

    if(is_array($articl)){
        foreach($articl as $row => $value){
        $imag = mysqli_real_escape_string($link, $value['image']);
        $item_img = 'http://rtd.dj'.$imag;
        $item_title = mysqli_real_escape_string($link, $value['title']);
        $item_date = mysqli_real_escape_string($link, $value['date']);
        $item_text= mysqli_real_escape_string($link, $value['text']);
        //echo $item_title.'<br>';

    $sql = "INSERT INTO `actualites` (image, titre, date, texte) VALUES ('".$item_img."', '".$item_title."', '".$item_date."', '".$item_text."')";
    $q = mysqli_query($link , $sql);
    }
    }
   }
   insertion($articl,$link);
}


    scrap();
   
   

   // Get last 3 inserted articles and display 
    $user = mysqli_query($link, "SELECT * FROM `actualites` ORDER BY id DESC LIMIT 3;");

   if(mysqli_num_rows($user) === 3){
       // Create new array of articles
       $arr = [];
    while($m = mysqli_fetch_array($user)){

        $id= $m['id'];
        $img = 'http://rtd.dj'.$m['image'];
        $titre=$m['titre'];
        $datum=$m['date'];
        $text=$m['texte'];

        array_push($arr, $m);
    }

    //Rearrange articles order 
    $first = $arr['2'];
    $second = ($arr['1']);
    $third =($arr['0']);

    // Format and display

    $firstImage = $first['image'];
    $firstDate = $first['date'];
    $firstTitre = $first['titre'];
    $firstTexte =  $first['texte'];

    $secondImage = $second['image'];
    $secondDate =   $second['date'];
    $secondTitre =   $second['titre'];
    $secondTexte  =   $second['texte'];

    $thirdImage =  $third['image'];
    $thirdDate = $third['date'];
    $thirdTitre = $third['titre'];
    $thirdTexte = $third['texte'];
    
    // Empty db except 3 last articles

    $firstID = $first['id'];
    $secID = $second['id'];
    $thirdID = $third['id'];
    $sql = "DELETE FROM actualites WHERE id < '".$firstID."' ";  
    $query = mysqli_query($link, $sql);

   }

?>

<?php

echo "

<div class='news'>
    <h4>Actualités</h4> <hr />

        <div class='text'>
        
        <img src= '$firstImage'>
        <div class='content'>
        <p class='date'><i class='far fa-clock'></i>$firstDate</p>
        <h5>$firstTitre</h5>
        <p class='info'> $firstTexte</p>
        </div>
    
    
        </div>

        <div class='text'>
        
        <img src=' $secondImage'>
        <div class='content'>
        <p class='date'><i class='far fa-clock'></i>$secondDate</p>
        <h5>$secondTitre</h5>
        <p class='info'> $secondTexte</p>
        </div>
    
    
        </div>

        <div class='text'>
        
        <img src='$thirdImage'>
        <div class='content'>
        <p class='date'><i class='far fa-clock'></i>$thirdDate</p>
        <h5>$thirdTitre</h5>
        <p class='info'> $thirdTexte</p>
        </div>
    
        </div>

  <a href='http://rtd.dj/actualites/politique?start=5'> Voir plus d'actualites</a>
    </div>

";


?>



