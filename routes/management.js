/**
 * Created by mamol on 16/07/26.
 */
require('date-utils');
var express = require('express');
var router = express.Router();



router.get('/', function (req, res) {
    var check = req.query;
    
    if (check['project'] && check['code']){

        console.log(check['project']);
        console.log(check['code']);

        var mongodb = require('mongodb');
        var server = new mongodb.Server('localhost', 27017);
        var db = mongodb.Db('projectManage', server, {safe: true});
    
        db.open(function (err, db) {
            if (err){
                throw err
            }else {
                var col_demands = db.collection('demands');
                var result = "";

                var key = check['project'] +"-"+ check['code'];

                col_demands.find({'key': key}).toArray(function (err, doc) {
                    if (err){
                        throw err
                    }else {
                        console.log(doc);
                        if (doc.length == 0){
                            result = true;
                        }else {
                            result = false;
                        }
                        res.send(result)
                    }
                })
            }
        })
    }else {
        res.render('management')
    }
});

router.post('/', function (req, res) {

    var now = new Date();
    var datestr = now.toFormat("YYYY-MM-DD HH:MI:SS");

    var mongodb = require('mongodb');
    var server = new mongodb.Server('localhost', 27017);
    var db = mongodb.Db('projectManage', server, {safe: true});

    db.open(function (err, db) {
        if (err){
            throw err
        }else {
            var demands = req.body;
            var col_demands = db.collection('demands');

            demands['key'] = demands['project'] +'-'+ demands['key'];

            col_demands.find({'key': demands.key}).toArray(function (err, doc) {
                console.log(doc);
                if (err){
                    throw err
                }else if (doc.length != 0){
                    console.log('Demand already exist!');
                    demands['message1'] = 'このキーはもう存在しています、';
                    demands['message2'] = '詳しい内容を一覧ページに戻って、検索してください';
                    res.render('management', {msg: demands})
                }else {
                    demands['datetime'] = datestr;
                    console.log(demands);

                    col_demands.insert(demands, function (err, result) {
                        if (err){
                            throw err
                        }else {
                            console.log(result);
                            res.redirect('/view')
                        }
                    })
                }
            })
        }
    })
});

module.exports = router;