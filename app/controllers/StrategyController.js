var mongoose = require("mongoose");
var Strategy = require("../models/Strategy");

var strategyController = {};

// Show list of Strategies
strategyController.list = function(req, res) {
  Strategy.find({}).exec(function (err, strategies) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/strategies/index", {strategies: strategies});
    }
  });
};

// Show strategy by id
strategyController.show = function(req, res) {
  Strategy.findOne({_id: req.params.id}).exec(function (err, strategy) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/strategies/show", {strategy: strategy});
    }
  });
};

// Create new strategy
strategyController.create = function(req, res) {
  res.render("../views/strategies/create");
};

// Save new strategy
strategyController.save = function(req, res) {
  var strategy = new Strategy(req.body);

  strategy.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/strategies/create");
    } else {
      console.log("Successfully created an strategy.");
      res.redirect("/strategies/show/"+strategy._id);
    }
  });
};

// Edit an strategy
strategyController.edit = function(req, res) {
  Strategy.findOne({_id: req.params.id}).exec(function (err, strategy) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/strategies/edit", {strategy: strategy});
    }
  });
};

// Update an strategy
strategyController.update = function(req, res) {
  Strategy.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, variables: req.body.address, currency: req.body.position, coin: req.body.salary }}, { new: true }, function (err, strategy) {
    if (err) {
      console.log(err);
      res.render("../views/strategies/edit", {strategy: req.body});
    }
    res.redirect("/strategies/show/"+strategy._id);
  });
};

// Delete an strategy
strategyController.delete = function(req, res) {
  Strategy.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Strategy deleted!");
      res.redirect("/strategies");
    }
  });
};

module.exports = strategyController;
