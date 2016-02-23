var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
  connectionString = process.env.DATABASE_URL + 'ssl';
} else {
  connectionString = 'postgres://localhost:5432/weekend4';
}

router.post('/', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    client.query('INSERT into task (task_name, status) VALUES ($1, $2) RETURNING id',
    [req.body.task, req.body.status],
    function (err, result) {
      done();

      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send({ id : result.rows[0].id });
      }
    })
  })
});

router.get('/:id', function(req, res) {
  var sql = '';
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    var query = client.query('SELECT * FROM task WHERE id = $1', [req.params.id]);

    if (err) {
      console.log(err);
      res.send(false);
    } else {
      query.on('row', function (row) {
        results.push(row);
      });

      query.on('end', function () {
        done();
        res.json(results);
      });
    }
  })
});

router.get('/', function(req, res) {
  var sql = '';
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    var query = client.query('SELECT * FROM task');

    if (err) {
      console.log(err);
      res.send(false);
    } else {
      query.on('row', function (row) {
        results.push(row);
      });

      query.on('end', function () {
        done();
        res.json(results);
      });
    }
  })
});

router.delete('/:id', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    client.query('DELETE FROM task WHERE ID = $1',
      [req.params.id]),
      function (err, result) {
        done();

        if (err) {
          console.log(err);
          res.send(false);
        } else {
          res.send(true);
        }
      }
  })
});

module.exports = router;