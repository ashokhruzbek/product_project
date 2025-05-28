const pool = require("../config/db");



exports.addProduct = async (req, res) => {
    try {
        const { title, price, description, image } = req.body
        const result = await pool.query(
            `insert into products(title, price, description, image) values($1,$2, $3, $4) returning * `, [title, price, description, image]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Pointer Variable")
    }
}
exports.getProduct = async (req, res) => {
    try {
        const result = await pool.query('select * from products')
        res.json(result.rows)
    } catch (error) {
        console.log(error);
        res.status(500).send('Serverda xatolik')
    }
}

exports.delProduct = async (req, res) => {
    try {
        const id = req.params.id
        const result = await pool.query(`delete from products where id = $1`, [id])
        if (result.rowCount === 0) {
            return res.status(404).json({ message: `Mahsulotingiz mavjud emas` });
        }
        res.status(200).json({ message: `Mahsulotingiz muvaffaqiyatli o'chirildi` })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Serverda xatolik')
    }
}
exports.editProduct = async(req,res)=>{
    try {
        const id = req.params.id;
        const { title, price, description } = req.body;
        const result = await pool.query(
          `update products set title = $1, price = $2, description = $3 where id = $4`, [ title, price, description, id])
          if (result.rowCount === 0) {
            return res.json({ message: `Mahsulotingiz mavjud emas` });
        }
        res.json({ message: `Mahsulotingiz muvaffaqiyatli o'zgartirildi` })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Serverda xatolik')
    }
}

