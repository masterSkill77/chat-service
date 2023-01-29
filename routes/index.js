const { body, validationResult, param } = require("express-validator");
const messageService = require("./../services/messageService");
var express = require("express");
var router = express.Router();

/* POST a new message. */
router.post(
  "/",
  body("to").isNumeric(),
  body("from").isNumeric(),
  body("content").isString(),
  body("type").isString(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    messageService
      .saveMessage(data.to, data.from, data.content, data.type, data.extension)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((e) => res.status(500).json(e));
  }
);

router.get("/:id", param("id").isNumeric(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id;

  messageService
    .getMessage(id)
    .then((data) => {
      res.json(data);
    })
    .catch((e) => res.status(500).json(e));
});

module.exports = router;
