<?php
require('connection.php');
$success = '';
if (array_key_exists('abonner', $_POST)){
  
  if( isset($_POST['email']) && $_POST['email'] !== '' && $_POST['name'] && $_POST['name'] !== ''){

    $name = mysqli_real_escape_string( $link, $_POST['name']);
    $email = mysqli_real_escape_string( $link, $_POST['email']);
   
    $nom = base64_encode($name);
    $mail = base64_encode($email);

    $sql= "INSERT  INTO `newsletter` VALUES ('','$mail','$nom')";
    $q= mysqli_query($link,$sql);
    if($q){
    //insert was successful
    $success = "<div class='alert alert-success' role='alert'>
    Vous êtes maintenant abonné à notre Newsletter. Nous avons aussi envoyé un email de bienvenue !  
  </div>";
     } else {
    //insert failed
    $success = "<div class='alert alert-danger' role='alert'>
    Il a eu un problème, réesayez svp !
  </div>";
    }
  

  }
  
}

?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>RPP.dj </title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link
rel="stylesheet"
href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
crossorigin="anonymous"
/>


<link
rel="stylesheet"
href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
crossorigin="anonymous"
/>
<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.min.css">
<link rel="stylesheet" type="text/css" media="screen" href="header.css" />
<link rel="stylesheet" type="text/css" media="screen" href="getNews.css" />
<link rel="stylesheet" type="text/css" media="screen" href="footer.css" />
<link rel="stylesheet" type="text/css" media="screen" href="index.css" />
</head>
<body>


    
      <?php echo $success;  ?>
    <header><?php include('header.php');  ?></header>
   
    <div class="box">

    <div class="bd-example">
   <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
      <img src="images/pic1.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="images/pic.jpg" class="d-block w-100" alt="...">
      </div>

      
      
    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
      </a>
    </div>
    </div>
    </div>

  <div class="checked">
    <h3>Notre politique s'impose à Djibouti </h3> <br>
  <p><i class="fas fa-check"></i> LE RPP s'engage pour la  fin de la faim a Djibouti.</p>
  <p><i class="fas fa-check"></i> Nous voulons un dévelopement généralise dans toutes les régions djiboutiennes.</p>
  <p><i class="fas fa-check"></i> Nous poursuivons une croissance économique constante.</p>
  </div>

    <div class="cercle">

   <a class="rond" href="defis.php">Défis</a>
   <a class="rond" href="bio.php" >IOG</a>
   <a class="rond" href="missions.php" >Missions</a>
    </div>

    <div class="social">
    <h3> Suivez-nous sur les réseaux sociaux ! </h3>

    <br />

    <div class="icon">
    <br />

    <a href="#"><i class="fab fa-twitter-square"></i></a>
    <a href="#"><i class="fab fa-facebook-square"></i></a>
    <a href="#"><i class="fab fa-youtube"></i></a>
    <a href="#"><i class="fas fa-envelope"></i></a>
    </div>
    </div>

    <div>
        <?php include('getNews.php'); ?>
    </div>

    <div class="status">
    <h3>Les Annexes</h3>
    <br />

    <p>Les Annexes sont les instances de base du Parti. Elles constituent les lieux de rencontre des forces vives du RPP et le laboratoire d’idées, de réflexions et d’analyses politiques au sein desquels s’expriment et s’épanouissent les militants.
  Le parti s’appuie et utilise ses Annexes pour entreprendre ses activités et actions politiques.
  Les Annexes tirent leur force de la population au sein de laquelle elles recrutent leurs futurs militants par les actions de sensibilisation et de mobilisation qu’elles mènent constamment en son sein.
  Les Annexes abritent les rencontres des militants et/ou des militants avec la population des quartiers, des villes ou des villages aux fins d’information, d’échanges d’idées et de sensibilisation. Dans ces lieux, les militants définissent les différents objectifs à réaliser.</p>
    <br />
     <a href="missions.php">Lire plus</a> 
    </div>

    <div class="newsletter">
    <p
    >Abonnez-vous pour recevoir notre Newsletter et ne ratez plus les
    actualités du partie.</p
    >
    <hr />

    <form  method='POST' id="trois">
    <?php //echo $fel;   ?>

    <div id="errorMedd"></div>
    <div class="form-group">
    <input
    type="email"
    name="email"
    class="form-control"
    id="exampleInputEmail1"
    aria-describedby="emailHelp"
    placeholder="Entrer votre email "
    />
    </div>
    <div class="form-group">
    <input
    type="text"
    name="name"
    class="form-control"
    id="exampleName"
    placeholder="Entrez votre nom "
    />
    <small id="emailHelp" class="form-text text-muted"
    >On ne partagera jamais votre email avec des tiers.</small
    >
    </div>

    <button type="submit" name="abonner" class="btn ">S'abonner</button>
    </form>
    </div>
    
    </div>

     <?php  include('footer.php'); ?>


   
  



<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script src="jquery-ui-1.12.1/external/jquery/jquery.js"></script>
<script src="jquery-ui-1.12.1/jquery-ui.min.js"></script>
<script src="app.js"></script>
</body>
</html>
