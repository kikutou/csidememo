/**
 * Created by mamol on 16/07/27.
 */
require('date-utils');
var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;



router.get('/', function (req, res) {
    var mongodb = require('mongodb');
    var server = new mongodb.Server('localhost', 27017);
    var db = mongodb.Db('projectManage', server, {safe: true});

    db.open(function (err, db) {
        if (err){
            throw err
        }else {
            var search = req.query;
            console.log(search);
            var col_demands = db.collection('demands');

            if (search.condition && search.value){

                var condition = search.condition;
                var value = search.value;
                
                var search_data = {};
                search_data[condition] = value;


                col_demands.find(search_data).toArray(function (err, doc) {
                    if (err){
                        throw err
                    }else {
                        if (doc.length == 0){
                            res.render('view')
                        }else {
                            res.render('view', {list: doc})
                        }
                    }
                })
            }else if (search.key){
                col_demands.findOne({key: search.key}, function (err, doc) {
                    if (err){
                        throw err
                    }else{
                        console.log(doc);
                        res.render('modify', {info: doc})
                    }
                })
            }else {
                col_demands.find({}).toArray(function (err, doc) {
                    if (err){
                        throw err
                    }else {
                        if (doc.length == 0){
                            res.render('view')
                        }else {
                            res.render('view', {list: doc})
                        }
                    }
                })
            }
        }
    })
});

router.post('/', function (req, res) {
    var mongodb = require('mongodb');
    var server = new mongodb.Server('localhost', 27017);
    var db = mongodb.Db('projectManage', server, {safe: true});

    db.open(function (err, db) {
        if (err){
            throw err
        }else {
            var modify = req.body;
            modify['_id'] = ObjectId(modify['_id']);
            modify['key'] = modify['project'] +'-'+ modify['key'];
            var col_demands = db.collection('demands');

            col_demands.findOne({_id: modify['_id']}, function (err, doc) {
                if (err){
                    throw err
                }else {
                    if (doc.key != modify.key){
                        col_demands.find({key: modify.key}).toArray(function (err, docs) {
                            if (err){
                                throw err
                            }else {
                                if (docs.length != 0){
                                    console.log('Demand already exist!');
                                    modify['message1'] = 'このキーはもう存在しています、';
                                    modify['message2'] = '詳しい内容を一覧ページに戻って、検索してください';
                                    res.render('management', {msg: modify})
                                }
                            }
                        })
                    }
                }
            });
            col_demands.update(
                {_id: modify['_id']},
                {$set: modify},
                {
                    upsert: true
                },
                function (err, doc) {
                    if (err){
                        throw err
                    }else {
                        res.redirect('/view')
                    }
                }
            )
        }
    })
});

module.exports = router;