import Button from '../reusable/Button';
import FormInput from '../reusable/FormInput';
import emailjs from 'emailjs-com';
import React,{ useState } from 'react';



const ContactForm = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);

	return (
		<div className="w-full lg:w-1/2">
			<div className="leading-loose">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						emailjs.sendForm('gmail_skobelkinzahar', 'template_sxa3sbh', e.target, 'FvgGjOMVQWUOgL4p5')
							.then((result) => {
								console.log(result.text);
								setIsSubmitted(true);
							}, (error) => {
								console.log(error.text);
							});
					}}
					className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
				>
					<p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
						Свяжитесь со мной
					</p>
					<FormInput
						inputLabel="Полное имя"
						labelFor="name"
						inputType="text"
						inputId="name"
						inputName="name"
						placeholderText="Ваше имя"
						ariaLabelName="Name"
					/>
					<FormInput
						inputLabel="Email"
						labelFor="email"
						inputType="email"
						inputId="email"
						inputName="email"
						placeholderText="Ваш email"
						ariaLabelName="Email"
					/>
					<FormInput
						inputLabel="Тема"
						labelFor="subject"
						inputType="text"
						inputId="subject"
						inputName="subject"
						placeholderText="Тема"
						ariaLabelName="Subject"
					/>

					<div className="mt-6">
						<label
							className="block text-lg text-primary-dark dark:text-primary-light mb-2"
							htmlFor="message"
						>
							Сообщение
						</label>
						<textarea
							className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
							id="message"
							name="message"
							cols="14"
							rows="6"
							aria-label="Message"
						></textarea>
					</div>

					<div className={`font-general-medium w-56 px-4 py-2.5 text-white text-center font-medium tracking-wider ${isSubmitted ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-500 hover:bg-indigo-600'} focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500`}>
						<Button
							title={isSubmitted ? 'Отправлено!' : 'Отправить сообщение'}
							type="submit"
							aria-label={isSubmitted ? 'Sent!' : 'Send Message'}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ContactForm;
