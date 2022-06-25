var express = require('express');
var router = express.Router();
var Crud = require('../models/crudmodel');

router.get('/', (req, res) => {
    res.render("create", {
        viewTitle: "Insert Data"
    });
});

router.post("/insertRecord", (req, res) => {
    var crud = new Crud();
    crud.fname = req.body.fname;
    crud.lname = req.body.lname;
    crud.email = req.body.email;
    crud.contact = req.body.contact;
    crud.job = req.body.job;
    crud.salary = req.body.salary;
    crud.company = req.body.company;
    crud.add = req.body.add;
    crud.save((err, doc) => {
        if (!err)
            res.redirect('/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("create", {
                    viewTitle: "Insert Data",
                    crud: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
});

router.post('/', (req, res) => {
    // console.log(req.body);
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var crud = new Crud();
    crud.fname = req.body.fname;
    crud.lname = req.body.lname;
    crud.email = req.body.email;
    crud.contact = req.body.contact;
    crud.job = req.body.job;
    crud.salary = req.body.salary;
    crud.company = req.body.company;
    crud.add = req.body.add;
    crud.save((err, doc) => {
        if (!err)
            res.redirect('list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle: "Insert Data",
                    crud: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Crud.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle: 'Update Data',
                    crud: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Crud.find((err, doc) => {
        if (doc) {
            // console.log(doc[0].fname);
            res.render("list",  {doc: doc });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fname':
                body['fnameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Crud.findById(req.params.id, (err, doc) => {
        // console.log(doc);
        
        if (!err) {
            res.render("addOrEdit", {
                viewTitle: "Update Data",
                doc: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Crud.findByIdAndRemove(req.params.id, (err, doc) => {
        console.log(doc);
        if (!err) {
            res.redirect('/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;