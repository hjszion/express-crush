const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//Gets all memebers
router.get('/', (req, res) => res.json(members));
//Get Single Member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

//Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),  //create a random id 
        name:req.body.name,
        email:req.body.email,
        status:'active'
    }
    
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:'Please inclucde a name and email!'});
    }

    members.save(newMember);
    members.push(newMember);
    res.json(members);
});

//update Member
//update Single Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name? updMember.name : member.name;
                member.email = updMember.email? updMember.email : member.email;
                
                res.json({msg:'Member updated', member});
            }
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

//delete Member
//update Single Member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({msg:'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

module.exports = router;