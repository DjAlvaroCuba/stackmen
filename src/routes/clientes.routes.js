import { Router } from 'express'
import pool  from '../database/database.js'

const router = Router();
router.get('/list' , async(req, res) => 
{
    try {
        const [result] = await pool.query('SELECT * FROM CLIENTE');
        res.render('clientes/list' , {clientes:result});

    }
    catch(err) {
        res.status(500).json({message:err.message})
    }
})

router.get('/add',async(req, res) => 
{
    res.render('clientes/add')
});

router.post('/add', async(req,res) => 
{
    try {
        const {nomcli, apecli, nrodnicli,telcli} = req.body; 
        const newCliente = {
            nomcli, apecli, nrodnicli,telcli
        }
        await pool.query('INSERT INTO CLIENTE SET ?' ,[ newCliente]);
        res.redirect('/list');
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
})

export default router;