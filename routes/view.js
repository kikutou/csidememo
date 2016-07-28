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
            var col_demands = db.collection('demands');

            if (search['project'] && search['code']){
                
                var result = "";

                var key = search['project'] +"-"+ search['code'];

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
            }else {
                for (var k in search){
                    if (search[k] == ""){
                        delete search[k]
                    }
                }
                
                var summation = 0;

                col_demands.find({}).toArray(function (err, item) {
                    if (err){
                        throw err
                    }else {
                        item.forEach(function () {
                            summation += 1
                        })
                    }
                });

                if (search.search){
                    delete search.search;
                    var search_info = search;
                    var str = "";

                    if (search['project'] && search['code']){
                        search['key'] = search['project'] +'-'+ search['code'];
                        str = search.code;
                        delete search.code;

                        console.log(search);

                        col_demands.find(search).toArray(function (err, doc) {
                            if (err){
                                throw err
                            }else {
                                search_info['code'] = str;
                                res.render('view', {list: doc, search_info: search_info, summation: summation})
                            }
                        })
                    }else if (!search['project'] && search['code']){

                        console.log(search);

                        str = search.code;

                        delete search.code;


                        col_demands.find({$and: [{key: {$regex: str}}, search]}).toArray(function (err, doc) {
                            if (err){
                                throw err
                            }else {
                                search_info['code'] = str;

                                res.render('view', {list: doc, search_info: search_info, summation: summation})
                            }
                        })
                    }else {

                        console.log(search);

                        col_demands.find(search).toArray(function (err, doc) {
                            if (err){
                                throw err
                            }else {
                                res.render('view', {list: doc, search_info: search_info, summation: summation})
                            }
                        })
                    }

                }else if (search.condition && search.value){

                    var condition = search.condition;
                    var value = search.value;

                    var search_data = {};
                    search_data[condition] = value;


                    col_demands.find(search_data).toArray(function (err, doc) {
                        if (err){
                            throw err
                        }else {
                            if (doc.length == 0){
                                res.render('view', {summation: summation})
                            }else {
                                res.render('view', {list: doc, summation: summation})
                            }
                        }
                    })
                }else if (search.view_key){
                    col_demands.findOne({key: search.view_key}, function (err, doc) {
                        if (err){
                            throw err
                        }else{
                            console.log(doc);
                            res.render('modify', {info: doc})
                        }
                    })
                }else if (search.del_key){
                    col_demands.remove({'key': search.del_key}, function (err, doc) {
                        if (err){
                            throw err
                        }else {
                            res.redirect('/view')
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
                                res.render('view', {list: doc, summation: summation})
                            }
                        }
                    })
                }
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
            console.log(modify['_id']);

            col_demands.findOne({_id: modify['_id']}, function (err, doc) {
                if (err){
                    throw err
                }else {
                    console.log('doc:'+doc);
                    console.log('modify:'+modify);

                    if (doc.key != modify.key){
                        col_demands.find({key: modify.key}).toArray(function (err, docs) {
                            if (err){
                                throw err
                            }else {
                                if (docs.length != 0){
                                    console.log('Demand already exist!');
                                    modify['message1'] = 'このキーはもう存在しています、';
                                    modify['message2'] = '詳しい内容を一覧ページに戻って、検索してください';
                                    res.render('modify', {msg: modify})
                                }else {
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
                            }
                        })
                    }else {
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
                }
            })
        }
    })
});

module.exports = router;