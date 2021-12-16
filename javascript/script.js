// DOM Elements
const form = document.querySelector('.register__form');
const formItems = document.querySelectorAll('.form__item');
const formInputs = document.querySelectorAll('.form__input');

const getElements = function (item) {
	const elements = {
		formInput: item.querySelector('.form__input'),
		errorIcon: item.querySelector('.form__icon'),
		errorText: item.querySelector('.form__warning'),
	};

	return elements;
};

const checkEmail = function (email) {
	return email.includes('@') && email.includes('.');
};

const resetField = function (formInput, errorIcon, errorText) {
	formInput.classList.remove('form__input--error');
	errorIcon.classList.add('form__icon--hidden');
	errorText.classList.add('form__warning--hidden');
};

const checkFields = function (formInput, errorIcon, errorText, e) {
	//Reset Form
	resetField(formInput, errorIcon, errorText);

	// Check First Name, Last Name and Password
	if (formInput.value === '') {
		formInput.placeholder = '';
		formInput.classList.add('form__input--error');
		errorIcon.classList.remove('form__icon--hidden');
		errorText.classList.remove('form__warning--hidden');
	}

	// Check Email
	if (formInput.type === 'email') {
		if (!checkEmail(formInput.value)) {
			formInput.placeholder = 'email@example.com';
		}
	}
};

formItems.forEach(item => {
	const elements = getElements(item);

	elements.formInput.addEventListener(
		'blur',
		checkFields.bind(
			null,
			elements.formInput,
			elements.errorIcon,
			elements.errorText
		)
	);

	elements.formInput.addEventListener(
		'focus',
		resetField.bind(
			null,
			elements.formInput,
			elements.errorIcon,
			elements.errorText
		)
	);
});

const checkForm = function (e) {
	e.preventDefault();

	formItems.forEach(item => {
		const elements = getElements(item);

		checkFields(elements.formInput, elements.errorIcon, elements.errorText);
	});
};

form.addEventListener('submit', checkForm);
