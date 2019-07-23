$(document).ready(function() {
  $(".alert").fadeOut(5000, "linear");
  // To slide something leftwards into view,
  // with a delay of 1000 msec
  //    $("div").click(function () {
  //        $(this).show("slide", { direction: "left" }, 1000);
  //  });
  checkAdhere();
  checkSoutien();
  checkForNews();
});

function checkAdhere() {
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  $("#one").submit(function(e) {
    let errorMessage = "";
    let missingFields = "";

    if (
      $("#inputEmail").val() != "" &&
      isEmail($("#inputEmail").val()) === false
    ) {
      errorMessage += "<p>Votre email n'est pas valide</p>";
    }

    if ($("#inputEmail").val() === "") {
      missingFields += "<br>Il vous manque un email";
    }

    if ($("#inputNom").val() === "") {
      missingFields += "<br>Vous devez entrer un nom";
    }

    if ($("#inputPrenom").val() === "") {
      missingFields += "<br>Vous devez entrer un prenom";
    }

    if ($("#inputAddress").val() === "") {
      missingFields += "<br>Vous devez entrer une adresse";
    }

    if ($("#inputCity").val() === "") {
      missingFields += "<br>Vous devez entrer une ville";
    }

    if ($("#inputCountry").val() === "") {
      missingFields += "<br>Vous devez entrer un pays";
    }

    if (missingFields !== "") {
      errorMessage += " Les espaces suivants sont manquants :" + missingFields;
    }

    if (errorMessage !== "") {
      $("#errorMessage").html(
        '<div class="alert alert-danger" role="alert">' +
          errorMessage +
          "</div>"
      );
      e.preventDefault();
    }
  });
}

function checkSoutien() {
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  $("#deux").submit(function(e) {
    let errorMess = "";
    let missingField = "";

    if (
      $("#inputEmail1").val() != "" &&
      isEmail($("#inputEmail1").val()) === false
    ) {
      errorMess += "<p>Votre email n'est pas valide</p>";
    }

    if ($("#inputEmail1").val() === "") {
      missingField += "<br>Il vous manque un email";
    }

    if ($("#inputNom1").val() === "") {
      missingField += "<br>Vous devez entrer un nom";
    }

    if ($("#inputPrenom1").val() === "") {
      missingField += "<br>Vous devez entrer un prenom";
    }

    if ($("#message-text1").val() === "") {
      missingField += "<br>Vous devez entrer un message";
    }

    if (missingField !== "") {
      errorMess += " Les espaces suivants sont manquants :" + missingField;
    }

    if (errorMess !== "") {
      $("#errorMess").html(
        '<div class="alert alert-danger" role="alert">' + errorMess + "</div>"
      );
      e.preventDefault();
    }
  });
}

function checkForNews() {
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  $("#trois").submit(function(e) {
    let errorMedd = "";
    let missing = "";

    if (
      $("#exampleInputEmail1").val() != "" &&
      isEmail($("#exampleInputEmail1").val()) === false
    ) {
      errorMedd += "<p>Votre email n'est pas valide</p>";
    }

    if ($("#exampleInputEmail1").val() === "") {
      missing += "<br>Il vous manque un email";
    }

    if ($("#exampleName").val() === "") {
      missing += "<br>Vous devez entrer un nom";
    }

    if (missing !== "") {
      errorMedd += " Les espaces suivants sont manquants :" + missing;
    }

    if (errorMedd !== "") {
      $("#errorMedd").html(
        '<div class="alert alert-danger" role="alert">' + errorMedd + "</div>"
      );
      e.preventDefault();
    }
  });
}
