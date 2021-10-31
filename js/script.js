
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

const gps = [{ id: 1, nombre: "GPSMAP® 64sx", descripcion: "GPS de mano con sensores de navegación con múltiples sensores", precio: 349, img: "gps64sx.jpg" },
{ id: 2, nombre: "GPSMAP® 65", descripcion: "GPS de mano con sensores de navegación con múltiples sensores", precio: 359, img: "gps65.jpg" },
{ id: 3, nombre: "GPSMAP® 65s", descripcion: "GPS de mano con sensores de navegación con múltiples sensores", precio: 369, img: "gps65s.jpg" },
{ id: 4, nombre: "GPSMAP® 66sr", descripcion: "GPS de mano con sensores de navegación con múltiples sensores", precio: 499, img: "gps66sr.jpg" },
{ id: 5, nombre: "GPSMAP® 923", descripcion: "Sondas SideVü, ClearVü y CHIRP tradicionales con mapa base mundial", precio: 1499, img: "gps923.jpg" },
{ id: 6, nombre: "GPSMAP® 923xsv", descripcion: "Sondas SideVü, ClearVü y CHIRP tradicionales con mapa base mundial", precio: 1699, img: "gps66sr.jpg" },
{ id: 7, nombre: "GPSMAP® 723", descripcion: "Sondas SideVü, ClearVü y CHIRP tradicionales con mapa base mundial", precio: 2899, img: "gps723.jpg" },
{ id: 8, nombre: "GPSMAP® 1223xsv", descripcion: "Sondas SideVü, ClearVü y CHIRP tradicionales con mapa base mundial", precio: 3099, img: "gpsl223xsv.jpg" },]

let validar = true
let validar2 = 0;
let precio = 0;
let banderaCarrito = false;
const carrito = []
let array = []


////////////////////////////////////TODO LO QUE SON LAS CARDS, BOTONES, CARRITO////////////////////////////////////

cardsGps();

function cardsGps() {
    $("#precioTotal").html(`<h3 class="centrar">PRECIO TOTAL: $${precio}</h3>`)
    for (const geps of gps) {
        $("#gps").append(`<center><div data-aos="flip-left"
    data-aos-duration="1000" class="tarjeta tarjeta__hover" style="width: 18rem;">
                                    <div><h3>${geps.nombre}</h3>
                                        <img src="./imagenes/${geps.img}" alt="">
                                        <h3>Precio: $${geps.precio}</h3>
                                        <button class="btn btn-dark" id="btnAgregar${geps.id}">Agregar</button>
                                        <button class="btn btn-dark" id="btnQuitar${geps.id}">Quitar</button>
                                        <div id="cantidad${geps.id}">Cantidad: 0</div>
                                        </div></center>`);
        $(`#btnAgregar${geps.id}`).on('click', function () {
            precio += geps.precio;
            $("#precioTotal").html(`<h3 class="centrar">PRECIO TOTAL: $${precio}</h3>`)
            if (carrito.find(el => el.id == geps.id)) {
                let index = carrito.findIndex(el => el.id == geps.id)
                carrito[index].cantidad = carrito[index].cantidad + 1
                $(`#cantidad${geps.id}`).html(`<p>Cantidad: ${carrito[index].cantidad}</p>`)
            } else {
                carrito.push({
                    id: geps.id,
                    nombre: geps.nombre,
                    precio: geps.precio,
                    cantidad: 1,
                })
                $(`#cantidad${geps.id}`).html(`<p>Cantidad: 1</p>`)
            }
            $("#carrin").html(`<h3></h3>`)
            $("#carrinTitulo").html(`<h1 class="centrar">TU CARRITO</h1>`)
            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].cantidad == 0) {
                } else {
                    $("#carrin").append(`<h3>${carrito[i].cantidad} - ${carrito[i].nombre}</h3>`)
                }
            }
            $(".botonCarrito").animate({
                left: ["+=50", "swing"],
                opacity: [0.25, "linear"]
            },
                200
            );
            $(".botonCarrito").animate({
                left: ["-=50", "swing"],
                opacity: [1, "linear"]
            },
                200
            );
        });

        $(`#btnQuitar${geps.id}`).on('click', function () {
            if (carrito.find(el => el.id == geps.id)) {
                let indexa = carrito.findIndex(el => el.id == geps.id)
                if (carrito[indexa].cantidad > 0) {
                    precio -= geps.precio;
                    $("#precioTotal").html(`<h3 class="centrar">PRECIO TOTAL: $${precio}</h3>`)
                    carrito[indexa].cantidad = carrito[indexa].cantidad - 1
                    $(`#cantidad${geps.id}`).html(`<p>Cantidad: ${carrito[indexa].cantidad}</p>`)
                    $("#carrin").html(`<h3></h3>`)
                    $("#carrinTitulo").html(`<h1 class="centrar">TU CARRITO</h1>`)
                    for (let i = 0; i < carrito.length; i++) {
                        if (carrito[i].cantidad == 0) {
                        } else {
                            $("#carrin").append(`<h3>${carrito[i].cantidad} - ${carrito[i].nombre}</h3>`)
                        }
                    }
                    $(".botonCarrito").animate({
                        left: ["+=50", "swing"],
                        opacity: [0.25, "linear"]
                    },
                        300
                    );
                    $(".botonCarrito").animate({
                        left: ["-=50", "swing"],
                        opacity: [1, "linear"]
                    },
                        300
                    );
                } else {
                    swal({
                        title: "¡Error!",
                        text: "No tienes de ese producto en el carrito",
                        icon: "error",
                        button: "Cerrar",
                    });
                }
            } else {
                swal({
                    title: "¡Error!",
                    text: "No tienes de ese producto en el carrito",
                    icon: "error",
                    button: "Cerrar",
                });
            }
        });

        guardarLocal(geps.id, JSON.stringify(geps));
    }

}


$("#tituloGps").prepend('<h1 class="titulo">TIENDA DE GPS</h1>');
$("#tituloGps").fadeOut("slow", function () {
    $("#tituloGps").fadeIn(1000);
});


////////////////////////////////////TODO LO QUE ES CORREO////////////////////////////////////

function chequearCorreo(emailcito) {
    let simbol = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    let banderaMail = false
    if (!simbol.exec(emailcito)) {
        banderaMail = false
    } else {
        banderaMail = true
    }
    return banderaMail
}

function chequearNombre(nombrecito) {
    let banderaNombre = false
    if (nombrecito == "" || nombrecito.length < 3) {
        banderaNombre = false
    } else {
        banderaNombre = true
    }

    return banderaNombre
}

function botone() {
    let banderaBotonUno = false
    let banderaBotonDos = false
    let emailCar = document.getElementById('emailInput').value
    let nombreCar = document.getElementById('nombreInput').value
    if (chequearCorreo(emailCar)) {
        banderaBotonDos = true
    }
    if (chequearNombre(nombreCar)) {
        banderaBotonUno = true
    }
    if (banderaBotonUno) {
        if (banderaBotonDos) {
            enviarCorreo(emailCar, precio, nombreCar)
            swal({
                title: "¡Email Enviado!",
                text: "Se envio el correo",
                icon: "success",
                button: "Cerrar",
            });
            $("#gps").html("")
            for (let k = 0; k < carrito.length; k++) {
                carrito[k].cantidad = 0
            }
            $("#carrin").html("")
            precio = 0;
            $("#precioTotal").html(`<h3 class="centrar">PRECIO TOTAL: $${precio}</h3>`)
            cardsGps()

        } else {
            swal({
                title: "¡Error al enviar!",
                text: "No se pudo enviar el mail, verifica los datos.",
                icon: "error",
                button: "Cerrar",
            });
        }
    } else {
        swal({
            title: "¡Error al enviar!",
            text: "No se pudo enviar el mail, verifica los datos.",
            icon: "error",
            button: "Cerrar",
        });
    }
}



function enviarCorreo(mailEnviar, precioEnviar, nombreEnviar) {
    let mensajeCarrito = ""
    carrito.forEach(item => {
        mensajeCarrito += `${item.nombre}  -  Precio: $${item.precio}c/u  -  ${item.cantidad} unidades. <br>`
    })
    var infox = {
        service_id: 'service_rwfhgb5',
        template_id: 'template_zd3yerk',
        user_id: 'user_NW5WbWI79uR0f3qq21M6E',
        template_params: {
            namex: 'RepcomGPS',
            mailx: mailEnviar,
            nombrex: nombreEnviar,
            carritox: mensajeCarrito,
            preciox: precioEnviar,
        }
    };

    emailjs.send('service_rwfhgb5', 'template_zd3yerk', infox.template_params)
        .then(function (res) {
        })
}
