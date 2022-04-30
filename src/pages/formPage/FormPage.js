import './formPage.css';

import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';

import useUpdate from '../../services/useUpdate';
import useUpload from '../../services/useUpload';

import {v4 as uuid} from 'uuid';
import * as yup from 'yup';

import PageHeader from '../../components/pageHeader/PageHeader';

export default function FormPage() {
	const {updateChapters} = useUpdate();
	const {uploadNewCard} = useUpload();

	const status = useSelector((state) => state.program.programListStatus);
	const programList = useSelector((state) => state.program.programList);
	const activeProgram = useSelector((state) => state.program.activeProgram);

	const validSchema = yup.object().shape({
		cardName: yup
			.string('Введите строку')
			.min(2, 'Минимум 2 символа')
			.max(55, 'Максимум 55 символов')
			.required('Обязательное поле*'),
		chapter: yup.string('Выберите программу*').required('Обязательное поле*'),
		cardLink: yup.string('Укажите ссылку*').required('Обязательное поле*'),
	});

	useEffect(() => {
		if (status !== 'idle') {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	const [cardName, setCardName] = useState('');
	const [cardNameErr, setCardNameErr] = useState(null);
	const [chapter, setChapter] = useState('');
	const [chapterErr, setChapterErr] = useState(null);
	const [cardLink, setCardLink] = useState('');
	const [cardLinkErr, setCardLinkErr] = useState(null);
	const [cardDescription, setCardDescription] = useState('');

	const validateField = (id, value, setErr) => {
		validSchema
			.pick([id])
			.validate({[id]: value})
			.then(() => setErr(true))
			.catch((err) => {
				setErr(err.message);
			});
	};

	const validateFunc = {
		cardName: (value = cardName) => validateField(`cardName`, value, setCardNameErr),
		chapter: (value = chapter) => validateField(`chapter`, value, setChapterErr),
		cardLink: (value = cardLink) => validateField(`cardLink`, value, setCardLinkErr),
	};

	const validateAll = () => {
		for (const id in validateFunc) {
			if (Object.hasOwnProperty.call(validateFunc, id)) {
				validateFunc[id]();
			}
		}
	};

	const clearFields = () => {
		setCardName('');
		setCardLink('');
		setCardDescription('');
	};

	const onExSubmit = (e) => {
		e.preventDefault();

		if (cardNameErr !== true || chapterErr !== true || cardLinkErr !== true) {
			validateAll();
			return;
		}

		const newCard = {
			id: uuid(),
			name: cardName,
			link: cardLink,
			timeStamp: Date.now(),
			description: cardDescription,
		};

		clearFields();

		uploadNewCard(newCard, chapter, activeProgram);
	};

	const onChange = (e, setState) => {
		const value = e.target.value;
		const id = e.target.id;

		setState(value);

		validateFunc[id](value);
	};

	const showError = (errState) => {
		if (errState !== true) {
			return errState;
		}
	};

	return (
		<>
			<PageHeader />
			<main>
				<div className='formWrapper'>
					<form className='exForm' onSubmit={onExSubmit}>
						<h3>Добавление карточки</h3>

						<label htmlFor='cardName' className='formInputLabel'>
							Название карточки*
						</label>
						<div className='errorForm'>{showError(cardNameErr)}</div>
						<input
							type='text'
							id='cardName'
							onChange={(e) => onChange(e, setCardName)}
							value={cardName}
							className='formInput'
						/>

						<label htmlFor='chapter' className='formInputLabel'>
							Выберите раздел*
						</label>
						<div className='errorForm'>{showError(chapterErr)}</div>
						<select
							name='chapter'
							id='chapter'
							value={chapter}
							className='exSelectInput'
							onChange={(e) => onChange(e, setChapter)}>
							<option value=''>Выберите программу</option>
							{programList.map((item) => (
								<option value={item.id} key={uuid()}>
									{item.name}
								</option>
							))}
						</select>

						<label htmlFor='cardLink' className='formInputLabel'>
							Укажите ссылку*
						</label>
						<div className='errorForm'>{showError(cardLinkErr)}</div>
						<input
							type='text'
							id='cardLink'
							onChange={(e) => onChange(e, setCardLink)}
							value={cardLink}
							className='formInput'
						/>

						<label htmlFor='cardDescription' className='formInputLabel'>
							Дополнительное описание
						</label>
						<textarea
							name='cardDescription'
							id='cardDescription'
							onChange={(e) => setCardDescription(e.target.value)}
							value={cardDescription}
							className='exDescriptionInput'></textarea>
						<div className='formButWrapper'>
							<button type='submit' className='formBut but'>
								Отправить
							</button>
						</div>
					</form>
				</div>
			</main>
		</>
	);
}
