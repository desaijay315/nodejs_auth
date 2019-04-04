const express     = require('express');
const router      =  new express.Router()
const User        = require('../models/user')
const {ObjectID}  = require('mongodb')

const auth  = require('../middleware/auth')

router.post('/users', async (req,res) => {
    // res.json(req.body.name);
    const user = new User(req.body);

    try{
        // await user.save()
        // res.status(201).send(user)

        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users/me', auth ,async (req,res)=> {
   res.send(req.user)
})

// router.get('/users/:id', async (req,res) => {
//     const _id =  req.params.id

//     if (!ObjectID.isValid(_id)) {
//         return res.status(404).send();
//     }
//     try{
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user);
//     }catch(e){
//         res.status(500).send()
//     }
// })

router.patch('/users/me',auth ,async (req,res) => {
    console.log(req.body)
    console.log(req.user._id)

    const updates  = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id =  req.user._id

    if(!isValidOperation){
        res.status(400).send({error:'Invalid request'})
    }

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {
        // const user = await User.findById(req.user._id)
        
        updates.forEach((update) => req.user[update] = req.body[update]) 
        await req.user.save()
        //const updateUser = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        // if(!req.user){
        //     return res.status(404).send();
        // }
        res.send(req.user);
    } catch (error) {
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async (req,res) => {
    // const _id = req.params.id

    if (!ObjectID.isValid(req.user._id)) {
        return res.status(404).send();
    }

    try {
        // const deleteuser = await User.findByIdAndDelete(req.user._id)
        // if (!deleteuser) {
        //     return res.status(404).send();
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (error) {
        res.status(400).send()        
    }
})

router.post('/users/logout', auth, async (req, res) => {
    //console.log(req);return false;
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
         return token.token !== req.token 
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


router.post('/users/logoutall', auth, async (req, res) => {
    //console.log(req);return false;
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router