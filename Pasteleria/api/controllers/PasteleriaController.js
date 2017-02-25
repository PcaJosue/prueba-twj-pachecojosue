/**
 * PasteleriaController
 *
 * @description :: Server-side logic for managing pastelerias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	crearPasteleria:function(req,res){
     return res.view();  
    },
   
    create: function(req,res){
      var PasteleriaObj={
          nombre: req.param('nombre'),
          ciudad: req.param('ciudad'),
          correo: req.param('correo')
      }  
        Pasteleria.create(PasteleriaObj,function(err,Pasteleria){
            if(err)
                return res.view('/error');
            res.redirect('/Pasteleria/listarPasteleria')
            
        })
    },
    listarPasteleria:function(req,res){
        
        Pasteleria.find(function Pasteleriafounded(err,pastelerias){
            if(err){
                return res.view('/error');
            }
            res.view({pastelerias:pastelerias})
        });
    },
    editar:function(req,res){
        Pasteleria.findOne(req.param('id'),function PasteleriaFounded(err,pasteleria){
           if(err){return res.redirect('/error')} 
            res.view({Pasteleria:pasteleria});
        });
        
    },
    update:function(req,res){
        var PasteleriaObj={
          nombre: req.param('nombre'),
          ciudad: req.param('ciudad'),
          correo: req.param('correo')
      }  
    Pasteleria.update(req.param('id'),PasteleriaObj,function PasteleriaFounded(err, pasteleria){
       if(err){
           req.session.flash={err:err}
        
        return res.redirect('/Pasteleria/editar/'+req.param('id'));
       }
        res.redirect('/Pasteleria/listarPasteleria')
    });
        
    },
    destroy:function(req,res){
        Pasteleria.destroy(req.param('id'),function PasteleriaDestroyed(err){
           if(err){
               return res.redirect('/error');
           } 
            res.redirect('/Pasteleria/listarPasteleria');
        });
        
    }
};

