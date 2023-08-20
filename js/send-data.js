// Validacion de form.
function isOkAsistencia() {

    // Remuevo mensajes de error anteriores
    $("#error-form").remove();

    // Variables necesarias para la validacion
    var flag = true;
    var err = '';


    // Variables del form para validar.
    var asistenteName = $.trim($("#nombreAsistente").val());
    var asistenteComentarios = $.trim($("#comentariosAsistente").val());


    // Nombre
    if (asistenteName == '') {
        flag = false;
        err = lang_nombreRequerido;
    } else {
        if (asistenteName.length > 20) {
            flag = false;
            err = lang_caracteresNombreAsistencia;
        }
    }

    // Comentarios
    if (asistenteComentarios != '') {
        if (asistenteComentarios.length > 100) {
            flag = false;
            err = lang_caracteresComentariosAsistencia;
        }
    }

    // Si hay error
    if (flag === false) {

        // Imprimo el error
        $('#formAsistencia').after('<span id="error-form">' + err + '</span>');

    }

    // Retorno el estado de la validacion
    return flag;

}
// Enviar asistencia
$('body').on('click', '#sendAsistencia', function (e) {

    e.preventDefault();


    if (isOkAsistencia()) {
        const firebaseConfig = {
            apiKey: "AIzaSyDBeXHJ6Pqllhh6BHF7GANMhlvEYRW82yk",
            authDomain: "invitacion-agus.firebaseapp.com",
            projectId: "invitacion-agus",
            storageBucket: "invitacion-agus.appspot.com",
            messagingSenderId: "730228477168",
            appId: "1:730228477168:web:77a612651f541704520635"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        const db = firebase.firestore();
        // Load and disabled buttom.
        $("#sendAsistencia").text(lang_informandoAsistencia + "...");
        $("#sendAsistencia").prop("disabled", true);

        let name = document.getElementById('nombreAsistente').value;
        let comment = document.getElementById('comentariosAsistente').value;
        let accept = document.querySelector('input[name="asistencia"]:checked').value;
        let before = true;

        db.collection('assistant').doc().set({
            name,
            comment,
            accept,
            before
        }).then( result => {
            $("#sendAsistencia").text(lang_confirmarAsistencia);
            $("#sendAsistencia").prop("disabled", false);
    
    
            // Oculto elementos del form y reseteo
            $('#formAsistencia')[0].reset();
            $('#modalAsistencia .formulario-content, #modalAsistencia .modal-footer, #modalAsistencia h5').hide();
    
            // Acomodo el css para centrar mensaje
            $('#modalAsistencia .modal-body').addClass('fix-height');
    
            // Muestro mensaje de exito
            $('#modalAsistencia .msj-content').html(
                "<h5>" + lang_asistenciaMsjExito_1 + "</h5><p>" + lang_asistenciaMsjExito_2 + "</p>"
            ).show();
    
    
            // Cierro modal y vuelvo a activar form
            setTimeout(function () {
    
                $('#modalAsistencia').modal('hide');
                $('#modalAsistencia .formulario-content, #modalAsistencia .modal-footer, #modalAsistencia h5').show();
                $('#modalAsistencia .msj-content').html('').hide();
                $('#modalAsistencia .modal-body').removeClass('fix-height');
    
            }, 4000);    
        })
        .catch(error => {
            $('#modalAsistencia .msj-content').html('Algo fallo, vuelva a intentar nuevamente');
        });
    }


});