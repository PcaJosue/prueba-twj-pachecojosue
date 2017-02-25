/**
 * PastelController
 *
 * @description :: Server-side logic for managing pastels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    
    crearPastel:function(req,res){
	Pasteleria.find().exec(function (error, PasteleriasEncontrados) {
            if (error) return res.redirect('/error');
            return res.view( {
                title: 'Crear Pastel',
                Pastelerias: PasteleriasEncontrados
            });
        });
    },
    create: function(req,res){
      var PastelObj={
          nombre: req.param('nombre'),
          tiempoElaboracion: req.param('tiempoElaboracion'),
          urlfoto: req.param('urlFoto'),
          idPasteleria: req.param('idPasteleria')
      }  
        Pastel.create(PastelObj,function(err,Pastel){
            if(err)
                return res.view('/error');
            res.redirect('/Pastel/listarPastel')
            
        });
    },
    listarPastel:function(req,res){
        
        Pastel.find(function Pastelfounded(err,pasteles){
            if(err){
                return res.view('/error');
            }
            res.view({pasteles:pasteles})
        });
    },
    editar: function (req, res) {
    Pastel.findOne(req.param('id'), function PastelFounded(err, pastel) {
        if (err) {
            return res.redirect('/error')
        }


        Pasteleria.find().exec(function (error, PasteleriasEncontrados) {
            if (error) return res.redirect('/error');


            return res.view({
                pastel: pastel,
                pasteleria: PasteleriasEncontrados

            });
        });
    });
},
    update:function(req,res){
        var PastelObj={
          nombre: req.param('nombre'),
          tiempoElaboracion: req.param('tiempoElaboracion'),
          urlfoto: req.param('urlFoto')
      }  
    Pastel.update(req.param('id'),PastelObj,function PastelFounded(err, pastel){
       if(err){
           req.session.flash={err:err}
        
        return res.redirect('/Pastel/editar/'+req.param('id'));
       }
        res.redirect('/Pastel/listarPastel')
    });
        
    },
    destroy:function(req,res){
        Pastel.destroy(req.param('id'),function PastelDestroyed(err){
           if(err){
               return res.redirect('/error');
           } 
            res.redirect('/Pastel/listarPastel');
        });
        
    }
};

