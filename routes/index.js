var cklog = require('../util/checklogin');
var up = require('../util/up');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
        res.render('index.html', { title: 'Express' });
    });

router.post('/up', function(req, res){
        var config = {};
        config['douban_user'] = req.body.douban_user;
        config['douban_pw'] = req.body.douban_pw;
        config['lianzhong_user'] = req.body.lianzhong_user;
        config['lianzhong_pw'] = req.body.lianzhong_pw;
        config['content'] = req.body.content;
        config['times'] = req.body.times;
        config['period'] = req.body.period;
        config['url'] = req.body.url;

        var times = eval(req.body.times);
        var obj = setInterval(function(){
            console.log(times);
            --times;
            if (times == 0){
                clearInterval(obj);
            }

            cklog.cklog(global.ck[config.douban_user], config, up.afterLogin);
        }, eval(req.body.period));

        res.json({ok : 'ok'});
    });

module.exports = router;