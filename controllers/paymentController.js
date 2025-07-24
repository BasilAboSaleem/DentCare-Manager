const Payment = require('../models/Payment');
const Visit = require('../models/Visit');


exports.payment_new_get = async (req, res) => {
    const visitId = req.params.visitId;
    try {
        // Fetch the visit details using the visitId
        const visit = await Visit.findById(visitId).populate('patient doctor');
        if (!visit) {
            return res.status(404).render('pages/error/error-404', { title: 'Error', message: 'Visit not found' });
        }

        // Render the payment page with visit details
        res.render('pages/payments/new-payment', { visit });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}