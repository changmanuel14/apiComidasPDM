const pool = require('./conexion')
const ruteador = app=>{
    //get
    app.get('/categorias', (request, response)=>{
        pool.query('SELECT * FROM CATEGORIAS', ( error, result )=>{
            if(error) throw error
            response.send(result)
        })
    })

    app.get('/users', (request, response)=>{
        pool.query('SELECT * FROM USER', ( error, result )=>{
            if(error) throw error
            response.send(result)
            })
        })

    app.get('/categorias/:id', (request, response)=>{
        let s = 'SELECT a.id, a.descripcion, b.Nombre, c.user, a.fechaCreacion, a.fotografia FROM comida a inner JOIN categorias b on a.id_categoria = b.Id INNER JOIN user c on a.id_usuario = c.id where a.id_categoria = ?'
        //console.log(s)
        pool.query(s, request.params.id,
        (error, result)=>{
            if(error) throw error
            response.send(result)
        } )
    })

    app.post('/categoria', (request, response)=>{
        let b = request.body
        //console.log(b)
        let s = 'INSERT INTO CATEGORIAS (Nombre) values(?)'
        pool.query(s, [b.Nombre], (error, result)=>{
                if(error) throw error
                response.status(201).send(`Categoria agregada con ID: ${result.insertId}`)
        })
    } )

    app.post('/comida', (request, response)=>{
        let today = new Date().toISOString().slice(0, 10)
        let b = request.body
        //console.log(b)
        let s = 'INSERT INTO COMIDA (descripcion, id_categoria, id_usuario, fechaCreacion, fotografia) values(?,?,?,?,?)'
        pool.query(s, [b.descripcion, b.id_categoria, b.id_usuario, today, b.fotografia], (error, result)=>{
                if(error) throw error
                response.status(201).send(`Comida agregada con ID: ${result.insertId}`)
        })
    } )

    app.post('/user', (request, response)=>{
        let b = request.body
        //console.log(b)
        let s = 'INSERT INTO USER (user, pwd) values(?, ?)'
        pool.query(s, [b.user, b.pwd], (error, result)=>{
                if(error) throw error
                response.status(201).send(`Usuario agregado con ID: ${result.insertId}`)
        })
    } )

}

module.exports = ruteador