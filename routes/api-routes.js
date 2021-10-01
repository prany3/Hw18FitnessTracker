const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.get("/api/workouts",(req, res) => {
    Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({body, params}, res) => {
    const workout = new Workout(body)
    workout.setTotalDuration();

    Workout.update(
        { _id: params.id },
        { $push: { exercises: body }}
      )
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
    });


module.exports = router;