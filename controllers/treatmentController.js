const Treatment = require('../models/Treatment');


exports.add_treatment_get = (req, res) => {
  res.render('pages/treatments/add-treatments', { title: 'Add Treatment' });
}

exports.add_treatment_post = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newTreatment = new Treatment({
      name,
      description,
      price
    });

    await newTreatment.save();
    req.flash('success', 'Treatment added successfully');
    res.redirect('/treatments/add');
  } catch (error) {
    console.error("Error adding treatment:", error);
    req.flash('error', 'Failed to add treatment');
    res.redirect('/treatments/add');
  }
}

exports.all_treatments_get = async (req, res) => {
  try {
    const treatments = await Treatment.find();
    res.render('pages/treatments/all-treatments', { 
      title: 'All Treatments', 
      treatments, 
    
    });
  } catch (error) {
    console.error("Error fetching treatments:", error);
    req.flash('error', 'Failed to fetch treatments');
    res.redirect('/treatments/add');
  }
}