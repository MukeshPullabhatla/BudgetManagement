const mongoose = require('mongoose');

mongoose.connect(
	'mongodb+srv://mukesh:mukesh@cluster0.0tclz.mongodb.net/BudgetManagement?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
	}
);
