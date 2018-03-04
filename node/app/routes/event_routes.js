// routes/event_routes.js
var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
    app.get('/events/:id', function(req, res) {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('events').findOne(details, function(err, item){
        if (err)
        {
            res.send({'error':'An error has occurred'});
        }
        else
        {
            res.send(item);
        }
        });
    });
    app.get('/events/', function(req, res) {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('events').findOne({}, function(err, item){
            if (err)
            {
                res.send({'error':'An error has occurred'});
            }
            else
            {
                res.send(item);
            }
        });
    });

    app.post('/events', function(req, res) {
        const event = { 'Name': req.body.Name,
            'Description': req.body.Description,
            'Address': {'Street': req.body.Street, 'City':req.body.City, 'State':req.body.State, 'Zip':req.body.Zip },
            'Host_id':req.body.Host_id,
            'Privacy': req.body.Privacy
            };
        db.collection('events').insert(event, function(err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/events/:id', function(req, res) {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('events').remove(details, function(err, item) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('event ' + id + ' deleted!');
            }
        });
    });

    app.put('/events/:id', function(req, res) {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const event = { 'Name': req.body.Name,
            'Description': req.body.Description,
            'Address': {'Street': req.body.Street, 'City':req.body.City, 'State':req.body.State, 'Zip':req.body.Zip },
            'Host_id':req.body.Host_id,
            'Privacy': req.body.Privacy
        };
        db.collection('events').update(details, event, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(event);
            }
        });
    });
};