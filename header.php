<?php
require_once("connection.php");

//&& isset($_POST['nom']) && 
//isset($_POST['prenom']) && isset($_POST['email']) && $_POST['adresse'] && $_POST['ville'] && $_POST['pays']
//&& isset($_POST['commentaire'])
// Protect and encode user input
$success = "";
if (array_key_exists('adherer', $_POST)){
        $gender = "";

        if( isset($_POST['exampleRadios']) && $_POST['exampleRadios'] === 'option1'){
            $gender = 'homme';
        }else if( isset($_POST['exampleRadios']) && $_POST['exampleRadios'] === 'option2'){
            $gender = 'femme';
        }
        
       $name = mysqli_real_escape_string( $link, $_POST['nom']);
       $firstName= mysqli_real_escape_string( $link, $_POST['prenom']);
       $email = mysqli_real_escape_string( $link, $_POST['email']);
       $adresse =mysqli_real_escape_string( $link, $_POST['adresse']);
       $ville = mysqli_real_escape_string( $link, $_POST['ville']);
       $pays =  mysqli_real_escape_string( $link, $_POST['prenom']);
       $comment = mysqli_real_escape_string( $link, $_POST['commentaire']);

       $genre = base64_encode($gender);
       $nom = base64_encode($name);
       $prenom = base64_encode($firstName);
       $mail = base64_encode($email);
       $adress = base64_encode($adresse);
       $city = base64_encode($ville);
       $country = base64_encode($pays);
       $kommentar = base64_encode($comment);
        
        $sql= "INSERT  INTO `adhesion` VALUES ('','$genre','$nom','$prenom','$mail','$adress','$city','$country','$kommentar')";
        $q= mysqli_query($link,$sql);
        if($q){
        //insert was successful
        $success = "<div class='alert alert-success' role='alert'>
        Vous êtes maintenant enregistré comme membre. Félicitation !  
      </div>";
         } else {
        //insert failed
        $success = "<div class='alert alert-danger' role='alert'>
        Il a eu un probleme, réesayez svp
      </div>";
        }
    
  }

        if (array_key_exists('soutenir', $_POST)){
       if(isset($_POST['name']) && isset($_POST['firstName']) && isset($_POST['mail']) && isset($_POST['message']) ){

        if( $_POST['name'] !== '' && $_POST['firstName'] !== '' && $_POST['mail']  !== '' && $_POST['message']  !== '' ){
        $namn =mysqli_real_escape_string( $link, $_POST['name']);
        $stad = mysqli_real_escape_string( $link, $_POST['firstName']);
        $land =  mysqli_real_escape_string( $link, $_POST['mail']);
        $meddelande = mysqli_real_escape_string( $link, $_POST['message']);

        $heter = base64_encode($namn);
        $lever = base64_encode($stad);
        $nation = base64_encode($land);
        $maila = base64_encode($meddelande);
        
        $sql= "INSERT  INTO `soutien` VALUES ('','$heter','$lever','$nation','$maila')";
        $q= mysqli_query($link,$sql);
        if($q){
        //insert was successful
        $success = "<div class='alert alert-success' data-dismiss='alert' aria-label='Close' role='alert'>
       Votre soutien a été envoyé. Merci.
      </div>";
         } else {
        //insert failed
        $success = "<div class='alert alert-success' role='alert'>
        Il a eu un problème, réesayez svp !
      </div>";
        }
      }
        
    }
    
}

  $quer = mysqli_query($link, "SELECT * FROM `adhesion` ORDER BY id DESC LIMIT 1;");
  if(mysqli_num_rows($quer)){

  while($m = mysqli_fetch_array($quer)){
   $name = base64_decode($m['gender']);
  
  //echo($name);
  }
  }

?>


  <?php  echo "
        <nav class='navbar navbar-expand-lg navbar-dark'>
        <a class='navbar-brand' href='index.php'>
        <img src='images/Logo.png' width='60' height='60' />
        </a>
        <button
        class='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavDropdown'
        aria-controls='navbarNavDropdown'
        aria-expanded='false'
        aria-label='Toggle navigation'
        >
        <span class='navbar-toggler-icon'></span>
        </button>
        <div class='collapse navbar-collapse' id='navbarNavDropdown'>
        <ul class='navbar-nav'>
        <li class='nav-item' >
        <a
        class='nav-link'
        href='index.php'>Accueil</a>
        </li>
        <li class='nav-item dropdown'>
        <a
        class= 'nav-link dropdown-toggle'
        href='#'
        id='navbarDropdown'
        role='button'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
        >
        Notre partie
        </a>
        <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
        <a class='dropdown-item' href='missions.php'>Nos missions</a>
        <a class='dropdown-item' href='defis.php'>Nos défis</a>
        </div>
        </li>
        <li class='nav-item dropdown'>
        <a
        class='nav-link dropdown-toggle'
        href='#'
        id='navbarDropdown'
        role='button'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
        >
        IOG
        </a>
        <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
        <a class='dropdown-item' href='bio.php'>Biographie</a>
        <a class='dropdown-item' href='https://www.presidence.dj/discours.php'>Discours</a>
        </div>
        </li>
        
        <li class='nav-item '>
        <a
        class='nav-link '
        href='politik.php'>Vision</a>
        </li>
        </ul>

      
        <div class='topRight'>
        <button
        type='button'
        class='btn btn-outline-success'
        data-toggle='modal'
        data-target='#exampleModal'
        data-whatever=''
        id='adhere'
        >J'adhère</button
        >
        <button
        type='button'
        class='btn btn-success'
        data-toggle='modal'
        data-target='#exampleModal1'
        id='soutiens'
        >Je soutiens</button
        >

        <div
        class='modal fade'
        id='exampleModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
        >
        <div class='modal-dialog' role='document'>
        <div class='modal-content'>
        <div class='modal-header'>
        <h5 class='modal-title' id='exampleModalLabel'
        >J'adhère
        </h5>
        <button
        type='button'
        class='close'
        data-dismiss='modal'
        aria-label='Close'
        >
        <span aria-hidden='true'>&times;</span>
        </button>
        </div>
        <div id='errorMessage'></div>
        <div class='modal-body'>
        <form method='POST' id= 'one'>
        <p>Vous êtes un/e:</p> 
       
        <div class='form-check'>
        <input class='form-check-input' type='radio' name='exampleRadios' id='exampleRadios1' value='option1' checked>
        <label class='form-check-label' for='exampleRadios1'>
          Homme
        </label>
      </div>
      <div class='form-check'>
        <input class='form-check-input' type='radio' name='exampleRadios' id='exampleRadios2' value='option2'>
        <label class='form-check-label' for='exampleRadios2'>
          Femme
        </label>
      </div>
      <br />
     

      <div class='form-row'>
        <div class='form-group col-md-6'>
        <label for='inputNom'>Nom</label>
        <input
        type='text'
        class='form-control'
        id='inputNom'
        placeholder='Nom' name='nom'
        />
        </div>
        <div class='form-group col-md-6'>
        <label for='inputPrenom'>Prénom</label>
        <input
        type='text'
        class='form-control'
        id='inputPrenom'
        placeholder='Prénom' name='prenom'
        />
        </div>
        </div>
        <label for='inputEmail4'>Email</label>
        <div class='form-group'>
        <input
        type='email'
        class='form-control'
        id='inputEmail'
        placeholder='Email' name='email'
        />
        </div>
        <div class='form-group'>
        <label for='inputAddress2'>Adresse</label>
        <input
        type='text'
        class='form-control'
        id='inputAddress'
        placeholder='Votre adresse' name='adresse'
        />
        </div>
        <div class='form-row'>
        <div class='form-group col-md-6'>
        <label for='inputCity'>Ville</label>
        <input
        type='text'
        class='form-control'
        id='inputCity'
        placeholder='Example: Dikhil' name='ville'
        />
        </div>
        <div class='form-group col-md-6'>
        <label for='inputCity'>Pays</label>
        <input
        type='text'
        class='form-control'
        id='inputCountry'
        placeholder='Example: Djibouti' name='pays'
        />
        </div>
        </div>

        <div class='form-group'>
        <label for='message-text' class='col-form-label'
        >Commentaire:</label
        >
        <textarea
        class='form-control'
        id='message-text' name='commentaire'
        ></textarea>
        </div>
        
        </div>

        <div class='modal-footer'>
        <button type='submit' class='btn green' name='adherer' >Adhérer</button
        >
        <button
        type='button'
        class='btn btn-danger'
        data-dismiss='modal'
        >Annuler</button
        >
        </form>
        </div>
        </div>
        </div>
        </div>
        <!-- Modal -->
        <div
        class='modal fade'
        id='exampleModal1'
        tabindex='-1'
        role='dialog'
        aria-labelledby ='exampleModalLabel'
        aria-hidden='true'
        >
        <div class='modal-dialog' role='document'>
        <div class='modal-content'>
        <div class='modal-header'>
        <h5 class='modal-title' id='exampleModalLabel'
        >Envoyer un soutien</h5
        >
        <button
        type='button'
        class='close'
        data-dismiss='modal'
        aria-label='Close'
        >
        <span aria-hidden='true'>&times;</span>
        </button>
        </div>
        <div id='errorMess'></div>
        <div class='modal-body'>
        <form method='POST' id='deux'>
        <div class='form-row'>
        <div class='form-group col-md-6'>
        <label for='inputNom'>Nom</label>
        <input
        type= 'text'
        class='form-control'
        id='inputNom1'
        placeholder='Nom' name= 'name'
        />
        </div>

        <div class='form-group col-md-6'>
        <label for='inputPrenom1'>Prénom</label>
        <input
        type='text'
        class='form-control'
        id='inputPrenom1'
        placeholder='Prénom' name='firstName'
        />
        </div>
        </div>

        <div class='form-group'>
        <label for='inputAddress'>Email</label>
        <input
        type='email'
        class='form-control'
        id='inputEmail1'
        placeholder='Email' name='mail'
        />
        </div>

        <div class='form-group'>
        <label for='message-text' class='col-form-label'
        >Message:</label
        >
        <textarea
        class='form-control'
        id='message-text1' name='message'
        ></textarea>
        </div>

        </div>
        <div class='modal-footer'>
        <button type='submit' class='btn green' name='soutenir' id ='sub'
        
        >Envoyer</button
        >
        <button
        type='button'
        class='btn btn-danger'
        data-dismiss='modal'
        >Annuler</button
        >
        
        </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </nav>


  ";    

  echo $success;


  ?>

