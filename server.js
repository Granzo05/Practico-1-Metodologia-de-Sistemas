const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const axios = require('axios');
const fs = require('fs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./client/html-js"));
app.use(cors());

app.get("/", (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "client", "index.html"));
});

app.post('/cargar-producto', async (req, res) => {
	try {
		let categoria = req.body.categoria;
		let nombre = quitarAcentosYEnie(req.body.nombre);
		let precio = quitarAcentosYEnie(req.body.precio);

		const productoData = {
			categoria,
			nombre,
			precio,
		};

		await axios.post('http://localhost:8080/producto', productoData);

		res.status(200).json({ mensaje: 'Producto guardado correctamente' });

	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error al procesar la solicitud' });
	}
});

app.get('/mostrar-productos', async (req, res) => {
	try {
		const response = await axios.get('http://localhost:8080/productos');
		res.json(response.data);
	} catch (error) {
		console.error('Error al enviar la solicitud a la API:', error.message);
		res.status(500).send('Error interno del servidor.');
	}
});


app.get('/pedidos/tipo', async (req, res) => {
	try {
		const tipo = req.query.tipo;
		const response = await axios.get('http://localhost:8080/pedidos/estado/' + tipo);

		res.json(response.data);
	} catch (error) {
		console.error('Error al enviar la solicitud a la API:', error.message);
		res.status(500).send('Error interno del servidor.');
	}
});

app.get('/buscar_producto', async (req, res) => {
	try {
		const nombre = req.query.nombre;
		const response = await axios.get('http://localhost:8080/productos/condicion/' + nombre);

		res.json(response.data);
	} catch (error) {
		console.error('Error al enviar la solicitud a la API:', error.message);
		res.status(500).send('Error interno del servidor.');
	}
});

app.delete('/eliminar_producto', async (req, res) => {
	try {
		const nombre = req.query.nombre;
		const response = await axios.delete('http://localhost:8080/productos/eliminar/' + nombre);

		const basePath = path.join(__dirname, '../', '../', 'client', 'html-js', 'imagenes', nombre.replace(' ', ''));

		if (fs.existsSync(basePath)) {
			// Eliminar todas las imágenes asociadas con el producto
			fs.readdirSync(basePath).forEach(file => {
				const filePath = path.join(basePath, file);
				fs.unlinkSync(filePath); // Eliminar la imagen del servidor de archivos
			});

			// Eliminar la carpeta base del producto
			fs.rmdirSync(basePath);
		}

		res.json(response.data);
	} catch (error) {
		console.error('Error al enviar la solicitud a la API:', error.message);
		res.status(500).send('Error interno del servidor.');
	}
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
	console.log("The server is now running on Port 3000");
});
