const express=require('express')
const router=express.Router()
const Employee=require('../models/employee')

router.get('/',(req,res)=>{
    res.render('employee/addOrEdit',{viewTitle:'Insert Employee' })
})

router.post('/insert',(req,res)=>{
    if(req.body._id===''){
        console.log('dsf')
        insertRecord(req,res)
    }else{
        console.log('dsfsd')
        updateRecord(req,res)
    }
})

router.get('/list',(req,res)=>{
    Employee.find((err,docs)=>{
        if(!err){
            res.render('employee/list',{list:docs})
        }
        else{
            console.log('Error:'+err)
        }
    })
})

router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
})

router.get('/update/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});
function updateRecord(req,res){
    console.log(req.body._id)
    console.log(req.body)
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { 
            res.redirect('/list')
        }
    });
}
function insertRecord(req,res){
    var employee=new Employee()
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        console.log(doc)
        if (!err){
            res.redirect('/list')
            //res.render('employee/list',{list:});
        }
    });
}

module.exports=router