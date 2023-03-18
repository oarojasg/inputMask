        //Formato del campo Valor Venta, sólo números y máximo 18 dígitos
        $valorVenta.keydown(function (e) {
            event.preventDefault();
            var reg = /^[1-9][0-9]{0,18}$/;
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

            //Si el stringFinal solo tiene ceros
            var valorConFormato = "";
            if (stringFinal == 0) {
                let cantidadPuntos = Math.floor(stringFinal.length / 3);
                longitudInicial += cantidadPuntos;
                $.each([...Array(cantidadPuntos).keys()], (i) => {
                    var indice = 3 * (i + 1) + i;
                    stringFinal = stringFinal.slice(0, -indice) + "." + stringFinal.slice(-indice);
                });
                valorConFormato = "$ " + stringFinal + ".00";
            }
            else valorConFormato = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(parseFloat(stringFinal));
            $(this).val(valorConFormato.slice(0, -3));
            $(this).css("text-align", "right");

            //Ubicación del cursor en nueva posición
            let posicionCursor = posicionFin + (valorConFormato.length - longitudInicial - 3);
            e.target.setSelectionRange(posicionCursor, posicionCursor);
        });

        //When retrieving value: $txtValorComisionIngresoEgreso.val().replace(/[$.,\s]/g, '');
