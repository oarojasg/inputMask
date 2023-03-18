        //Formato del campo Valor Comisión, sólo números y máximo 11 dígitos
        $txtValorComisionIngresoEgreso.keydown(function (e) {
            event.preventDefault();
            var reg = /^[1-9][0-9]{0,10}$/;
            let stringModificado = $(this).val();
            let longitudInicial = stringModificado.length;
            let stringFinal = "";
            let posicionInicio = e.target.selectionStart;
            let posicionFin = e.target.selectionEnd;

            //Modificación del número
            if (event.key == 'Backspace') { //Procedimiento de borrado
                if (posicionInicio == posicionFin && stringModificado.substring(posicionInicio - 1, posicionInicio) == '.')
                    posicionInicio -= 2; // Si el cursor está a la izquierda de '.', borra el número a la derecha de '.'
                stringModificado = stringModificado.slice(0, posicionInicio - (posicionInicio == posicionFin))
                    + stringModificado.slice(posicionFin); //Borra números seleccionados
                stringFinal = stringModificado.replace(/[^0-9-]+/g, "");
            }
            else {//Procedimiento de escritura
                stringModificado = stringModificado.slice(0, posicionInicio).replace(/[^0-9-]+/g, "")
                    + event.key + stringModificado.slice(posicionFin).replace(/[^0-9-]+/g, ""); //Reemplaza números seleccionados
                if (!reg.test(stringModificado)) return false; //Comprueba caracteres numéricos
                stringFinal = stringModificado;
            }

            //Creación del nuevo número
            var valorConFormato = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(parseFloat(stringFinal));
            $(this).val(valorConFormato.slice(0, -3));

            //Ubicación del cursor en nueva posición
            let posicionCursor = posicionFin + (valorConFormato.length - longitudInicial - 3);
            e.target.setSelectionRange(posicionCursor, posicionCursor); 
        });

        //When retrieving value: $txtValorComisionIngresoEgreso.val().replace(/[$.,\s]/g, '');
