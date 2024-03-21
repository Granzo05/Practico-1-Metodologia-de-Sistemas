const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const axios = require('axios');
const fs = require('fs');
let datos = require('./client/js/datos.json');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use(cors());

app.get("/", (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "client", "index-css.html"));
});

app.post('/agregar-producto', async (req, res) => {
	try {
		let categoria = req.body.categoria;
		let nombre = req.body.nombre;
		let precio = req.body.precio;

		const producto = {
			nombre,
			precio,
			categoria,
		};

		datos.push(producto);

		// Guardar los datos modificados de vuelta en el archivo JSON
		fs.writeFileSync('./client/js/datos.json', JSON.stringify(datos, null, 2));

		res.status(200).json({ mensaje: 'Producto guardado correctamente' });

	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error al procesar la solicitud' });
	}
});

app.get('/mostrar-productos', async (req, res) => {
	try {
		// Enviamos el json
		res.json(datos);
	} catch (error) {
		res.status(500).send('Error interno del servidor.');
	}
});

app.put('/actualizar', async (req, res) => {
    try {
        const nombreOriginal = req.body.nombreOriginal;
        const nombreNuevo = req.body.nombreNuevo;
        const precio = req.body.precio;
        const categoria = req.body.categoria;

        // Verificar si el producto existe
        const productoExistente = datos.find(producto => producto.nombre === nombreOriginal);
        if (!productoExistente) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        productoExistente.nombre = nombreNuevo;
        productoExistente.categoria = categoria;
        productoExistente.precio = precio;

        // Guardar los datos modificados de vuelta en el archivo JSON
        fs.writeFileSync('./client/js/datos.json', JSON.stringify(datos, null, 2));

        res.status(200).json({ mensaje: 'Producto editado correctamente' });
    } catch (error) {
        console.error('Error interno del servidor:', error);
        res.status(500).send('Error interno del servidor.');
    }
});


app.delete('/eliminar-producto', async (req, res) => {
    try {
        const nombre = req.query.nombre; 
        console.log(nombre);

        const productoExistenteIndex = datos.findIndex(producto => producto.nombre === nombre);
        if (productoExistenteIndex === -1) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        datos.splice(productoExistenteIndex, 1); 

        fs.writeFileSync('./client/js/datos.json', JSON.stringify(datos, null, 2));

        res.status(200).json({ mensaje: 'Producto eliminado correctamente' });

    } catch (error) {
        console.error('Error interno del servidor:', error);
        res.status(500).send('Error interno del servidor.');
    }
});



const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
	console.log("The server is now running on Port 3000");
});
