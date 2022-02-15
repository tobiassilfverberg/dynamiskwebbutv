const pokemonCards = require("../models/pokemonCards");

// Create - skapa ett kort i databasen
const create = async (req, res) => {
  try {
    let card = pokemonCards(req.body).save();

    return res.status(201).send({
      success: true,
      data: {
        card,
      },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      data: err.message,
    });
  }
};

// Delete - ta bort ett kort i databasen
const destroy = async (req, res) => {
  try {
    let card = await pokemonCards
      .where({ id: req.params.id })
      .fetch({ require: true });

    card = await card.destroy();

    return res.status(200).send({
      success: true,
      data: {
        card,
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
    let card;

    if (req.params.id) {
      card = await pokemonCards
        .where({ id: req.params.id })
        .fetch({ require: false });
    } else {
      card = await pokemonCards.fetchAll();
    }

    if (!card) {
      return res.status(400).send({
        success: true,
        data: {
          card,
        },
      });
    }

    return res.status(200).send({
      success: true,
      data: {
        card,
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
    let card = await pokemonCards
      .where({ id: req.params.id })
      .fetch({ require: true });

    card = card.set(req.body).save();

    return res.status(200).send({
      success: true,
      data: {
        card,
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
