const authors = require("../models/Authors");
const log = require("../logging");

// Create - skapa en författare i databasen
const create = async (req, res) => {
  try {
    if (req.body.Spara) {
      delete req.body.Spara;
    }

    let author = authors(req.body).save();
    log.info("Här kommer info");
    return res.status(201).send({
      success: true,
      data: {
        author,
      },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      data: err.message,
    });
  }
};

// Delete - ta bort en författare i databasen
const destroy = async (req, res) => {
  try {
    let author = await authors
      .where({ id: req.params.id })
      .fetch({ require: true });

    author = await author.destroy();

    return res.status(200).send({
      success: true,
      data: {
        author,
      },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      data: err.message,
    });
  }
};

// Read - läs ett eller flera kort från databasen
const read = async (req, res) => {
  try {
    let author;

    if (req.params.id) {
      author = await authors
        .where({ id: req.params.id })
        .fetch({ require: false, withRelated: ["showAllTitles"] });
    } else {
      author = await authors.fetchAll({
        withRelated: ["allTitles"],
      });
    }

    if (!author) {
      return res.status(400).send({
        success: true,
        data: {
          author,
        },
      });
    }

    return res.status(200).send({
      success: true,
      data: {
        author,
      },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      data: err.message,
    });
  }
};

// Update - uppdatera ett kort i databasen
const update = async (req, res) => {
  try {
    let author = await authors
      .where({ id: req.params.id })
      .fetch({ require: true });

    author = author.set(req.body).save();

    return res.status(200).send({
      success: true,
      data: {
        author,
      },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      data: err.message,
    });
  }
};

module.exports = {
  read,
  create,
  update,
  destroy,
};
