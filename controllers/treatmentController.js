const e = require('express');
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
    res.redirect('/treatments');
  } catch (error) {
    console.error("Error adding treatment:", error);
    res.status(500).render('pages/error/error-500', { title: 'Error' });
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

exports.view_treatment_get = async (req, res) => {
  const { id } = req.params;

  try {
    const treatment = await Treatment.findById(id);
    if (!treatment) {
      req.flash('error', 'Treatment not found');
      return res.redirect('/treatments');
    }
    res.render('pages/treatments/view-treatment', { title: 'View Treatment', treatment });
  } catch (error) {
    console.error("Error fetching treatment:", error);
    req.flash('error', 'Failed to fetch treatment');
    res.redirect('/treatments');
  }
}

exports.edit_treatment_get = async (req, res) => {
  const { id } = req.params;

  try {
    const treatment = await Treatment.findById(id);
    if (!treatment) {
      req.flash('error', 'Treatment not found');
      return res.redirect('/treatments');
    }
    res.render('pages/treatments/edit-treatment', { title: 'Edit Treatment', treatment });
  } catch (error) {
    console.error("Error fetching treatment for edit:", error);
    res.status(500).render('pages/error/error-500', { title: 'Error' });
  }
}

exports.edit_treatment_put = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const treatment = await Treatment.findById(id);
    if (!treatment) {
      req.flash('error', 'Treatment not found');
      return res.redirect('/treatments');
    }
    treatment.name = name || treatment.name;
    treatment.description = description || treatment.description;
    treatment.price = price || treatment.price;
    await treatment.save();
    req.flash('success', 'Treatment updated successfully');
    res.redirect(`/treatments/${id}`);
    } catch (error) {
    console.error("Error updating treatment:", error);
    res.status(500).render('pages/error/error-500', { title: 'Error' });
  }
}

exports.delete_treatment_delete = async (req, res) => {
  const { id } = req.params;

  try {
    const treatment = await Treatment.findByIdAndDelete(id);
    if (!treatment) {
      req.flash('error', 'Treatment not found');
      return res.redirect('/treatments');
    }
    req.flash('success', 'Treatment deleted successfully');
    res.redirect('/treatments');
  } catch (error) {
    console.error("Error deleting treatment:", error);
    res.status(500).render('pages/error/error-500', { title: 'Error' });
  
  }
}
