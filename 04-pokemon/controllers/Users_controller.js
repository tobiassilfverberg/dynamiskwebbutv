const Users = require("../models/Users");

/*
 * Create - skapa ett kort i databasen
 */
/* const create = async (req, res) => {
  try {
    let user = await new PokemonCards(req.body).save();

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
}; */

/*
 *  Read - läs ett eller flera kort från databasen
 */
const read = async (req, res) => {
  try {
    let user;
    if (req.params.id) {
      user = await Users.where({ id: req.params.id }).fetch({
        require: false,
        withRelated: ["reservations"],
      });
    } else {
      user = await Users.fetchAll({
        withRelated: ["reservations"],
      });
    }

    if (!user) {
      return res.status(400).send({
        success: false,
        data: "Not found",
      });
    }

    return res.status(200).send({
      success: true,
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      data: err.message,
    });
  }
};

/*
 *  UPDATE - Uppdaterat ett kort i databasen
 */
/* const update = async (req, res) => {
  try {
    let card = await PokemonCards.where({ id: req.params.id }).fetch({
      require: true,
    });

    card = await card.set(req.body).save();

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
}; */

/*
 * DESTROY - ta bort ett kort från databasen
 */
/* const destroy = async (req, res) => {
  try {
    let card = await PokemonCards.where({ id: req.params.id }).fetch({
      require: true,
    });
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
}; */

module.exports = {
  read,
  //   create,
  //   update,
  //   destroy,
};
