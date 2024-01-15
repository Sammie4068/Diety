const db = require('../../db/index');

class Nutritionist {
  constructor(nutritionistData) {
    this.data = nutritionistData;
  }

  async save() {
    try {
      const result = await db.query('INSERT INTO nutritionist (full_name, date_of_birth, email, mobile_number, gender, passport, id_card, id_number, issued_authority, issued_state, issued_date, expiry_date, address_type, nationality, state, district, block_number, ward_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *',
        [
          this.data.full_name,
          this.data.date_of_birth,
          this.data.email,
          this.data.mobile_number,
          this.data.gender,
          this.data.passport,
          this.data.id_card,
          this.data.id_number,
          this.data.issued_authority,
          this.data.issued_state,
          this.data.issued_date,
          this.data.expiry_date,
          this.data.address_type,
          this.data.nationality,
          this.data.state,
          this.data.district,
          this.data.block_number,
          this.data.ward_number
        ]
      );
  
      return {message: 'Nutritionists Added Successfully!!', data: result.rows[0]};
    } catch (error) {
        console.log(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const nutritionists = await db.query('SELECT * FROM nutritionist');
      console.log(nutritionists);
      return { data: nutritionists.rows[0]};
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const nutritionist = await db.query('SELECT * FROM nutritionist WHERE _id = ?', [id]);
      return nutritionist.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async update() {
    try {
      const result = await db.query('UPDATE nutritionist SET full_name=?, date_of_birth=?, email=?, mobile_number=?, gender=?, passport=?, id_card=?, id_number=?, issued_authority=?, issued_state=?, issued_date=?, expiry_date=?, address_type=?, nationality=?, state=?, district=?, block_number=?, ward_number=? WHERE _id = ?',
        [
          this.data.full_name,
          this.data.date_of_birth,
          this.data.email,
          this.data.mobile_number,
          this.data.gender,
          this.data.passport,
          this.data.id_card,
          this.data.id_number,
          this.data.issued_authority,
          this.data.issued_state,
          this.data.issued_date,
          this.data.expiry_date,
          this.data.address_type,
          this.data.nationality,
          this.data.state,
          this.data.district,
          this.data.block_number,
          this.data.ward_number,
          this.data._id,
        ]
      );
      return result.modifiedCount > 0;
    } catch (error) {
      throw error;
    }
  }

 async deleteById(id) {
    try {
      const result = await db.query('DELETE FROM nutritionist WHERE _id = ?', [id]);
      return result.deletedCount > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Nutritionist;

