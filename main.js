// PRODUCTOS
const productos = [
    // FRUTAS
    {
        id: "fruta-01",
        titulo: "Banana",
        imagen: "./imagenes/FRUTAS/bananas.jpg",
        categoría: {
            nombre: "frutas",
            id: "fruta"
        },
        precio: 1000
    },
    {
        id: "fruta-02",
        titulo: "Ciruela",
        imagen: "./imagenes/FRUTAS/ciruela mi foto.jpg",
        categoría: {
            nombre: "frutas",
            id: "fruta"
        },
        precio: 1000
    },

    {
        id: "fruta-03",
        titulo: "Durazno",
        imagen: "./imagenes/FRUTAS/durazno mi foto.jpg",
        categoría: {
            nombre: "frutas",
            id: "fruta"
        },
        precio: 1000
    },

    {
        id: "fruta-04",
        titulo: "Frutillas",
        imagen: "./imagenes/FRUTAS/frutillas mi foto.jpg",
        categoría: {
            nombre: "frutas",
            id: "fruta"
        },
        precio: 1000
    },

    {
        id: "fruta-05",
        titulo: "Manzana",
        imagen: "./imagenes/FRUTAS/manzana mi foto.jpg",
        categoría: {
            nombre: "frutas",
            id: "fruta"
        },
        precio: 1000
    },

    {
        id: "fruta-06",
        titulo: "Manzana verde",
        imagen: "./imagenes/FRUTAS/manzana verde.jpg",
        categoría: {
            nombre: "frutas",
            id: "fruta"
        },
        precio: 1000
    },

    {
        id: "fruta-07",
        titulo: "Naranjas",
        imagen: "./imagenes/FRUTAS/naranjas.jpg",
        categoría: {
            nombre: "frutas",
            id: "fruta"
        },
        precio: 1000
    },

    {
        id: "fruta-08",
        titulo: "Pelones",
        imagen: "./imagenes/FRUTAS/pelones mi foto.jpg",
        categoría: {
            nombre: "frutas",
            id: "fruta"
        },
        precio: 1000
    },

    {
        id: "fruta-09",
        titulo: "Uvas",
        imagen: "./imagenes/FRUTAS/uvas mi foto.jpg",
        categoría: {
            nombre: "frutas",
            id: "fruta"
        },
        precio: 1000
    },

    //verduras


    {
        id: "verdura-01",
        titulo: "Papas",
        imagen: "/imagenes/VERDURAS/papas.jpg",
        categoría: {
            nombre: "verduras",
            id: "verdura"
        },
        precio: 1000
    },

    {
        id: "verdura-02",
        titulo: "cebolla",
        imagen: "./imagenes/VERDURAS/cebollas.jpg",
        categoría: {
            nombre: "verduras",
            id: "verdura"
        },
        precio: 1000
    },


]


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero= document.querySelector("#numero");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `<img class= "producto-imagen"src="${producto.imagen}" alt="">
 <div class="producto-detalle">
    <h3 class="producto-titulo"> ${producto.titulo} </h3>
    <p class="producto-precio"> ${producto.precio} </p>
    <button class="producto-agregar" id="${producto.id}"> Agregar </button>
 </div>`;
        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoría.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoría.nombre;

            const productoBoton = productos.filter(producto => producto.categoría.id === e.currentTarget.id);

            cargarProductos(productoBoton);

        } else {
            tituloPrincipal.innerText = "todos los productos;"
            cargarProductos(productos);
        }
    })

});


function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);

    });
}

    let productoEnCarrito=[];

    const productoEnCarritoLS= JSON.parse(localStorage.getItem("productos-en-carrito"));
    if (productoEnCarritoLS){
        productoEnCarrito = productoEnCarritoLS;
        actualizarNumero();
    }
    else{
        productoEnCarrito=[];
    }

    function agregarAlCarrito(e){
        const idBoton = e.currentTarget.id;
        const productoAgregado = productos.find(producto => producto.id === idBoton);
        
       if (productoEnCarrito.some(producto => producto.id === idBoton)){
           const index= productoEnCarrito.findIndex(producto => producto.id === idBoton);
           productoEnCarrito[index].cantidad++;

       }else{
        productoAgregado.cantidad = 1 ;
        productoEnCarrito.push(productoAgregado);
    }

    actualizarNumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));

    }
    function actualizarNumero(){
        let nuevoNumero = productoEnCarrito.reduce((acc, productos) => acc + productos.cantidad ,0);
        numero.innerText = nuevoNumero;
    }
