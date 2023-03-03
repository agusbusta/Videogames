//<------------------IMPORTACIONES---------------------->

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postGame, getGenres } from '../../redux/actions';
import  style  from './GameCreator.module.css';
import Title from '../Title/Tittle';

//----------------------------------------------------->

//------------COMPONENTE GAME CREATOR------------------>

export default function GameCreateForm() {
	
	const dispatch = useDispatch();
	const history = useHistory();
	const genres = useSelector((state) => state.genres);
	const [errors, setErrors] = useState({});

	const [input, setInput] = useState({
		name: '',
		description: '',
		image: '',
		released: '',
		rating: 0,
		platforms: [],
		genres: [],
	});

	useEffect(() => {
		dispatch(getGenres());
	}, []);

	const validate = (input) => {
		const errors = {};
		const regex = /^[a-zA-Z]+$/;

	  
		if (!input.name.length || !regex.test(input.value)) {
		  errors.name = 'Name is required and should only contain letters from A to Z!';
		}
		if (!input.description.length || !regex.test(input.value)) {
		  errors.description = 'Description is required and should only contain letters from A to Z, numbers from 0 to 9!';
		}
		if (!input.rating.length) {
		  errors.rating = 'Rating is required and should only contain numbers from 0 to 5!';
		}
		if (!input.platforms[0]) {
		  errors.platform = 'Please select at least one platform';
		}
		if (!input.genres[0]) {
		  errors.genres = 'Minimun one Genre is required ';
		}
		return errors;
	  };
	  

	const handleChange = (e) => {

		const property=e.target.name;
        const value=e.target.value;
		if(property!='genres'){
            if(property!='platforms')setInput({...input,[property]:value})
            else{setInput({ ...input, platforms: [value] })}
        }
		else{const index=e.target.selectedIndex+1;
			setInput({...input,genres:input.genres.concat(index)});
			}
		
			setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		); 
		
	};


	const handleSelectGenres = (e) => {
		if (!input.genres.includes(e.target.value)) {
			setInput({
				...input,
				genres: [...input.genres, e.target.value],
			});
			setErrors(
				validate({
					...input,
					genres: [...input.genres, e.target.value],
				})
			);
		} else {
			setInput({
				...input,
			});
		}
	};

	const handleDeleteGenres = (e) => {
		setInput({
			...input,
			genres: input.genres.filter((param) => param !== e),
		});
	};

	

	const handleSubmit = (e) => {
		e.preventDefault();
		const newGame = {
			name: input.name,
			description: input.description,
			image: input.image,
			released: input.released,
			rating: input.rating,
			platforms: input.platforms, 
			genres: input.genres,
			
		};

		dispatch(postGame(newGame));
		
		setInput({
			name: '',
			description: '',
			image: '',
			released: '',
			rating: 0,
			platforms: [],
			genres: [],
		});
		alert('SUCCESSFULLY CREATED VIDEOGAME!!');
		history.push('/home');
	};

	return (
		<>
		<Title />
		<div className={style.allGCCont}>
			<div className={style.gameCreatorContainer}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<h1 className={style.tituloGameC}>CREATE YOUR GAME!</h1>
					<div className={style.formDiv}>
						<label>Videogame Name: </label>
						<input
							className={style.formInput}
							type='text'
							placeholder='videogame'
							value={input.name}
							name='name'
							onChange={(e) => handleChange(e)}
						/>
						{errors.name && <p className={style.formError}>{errors.name}</p>}
					</div>
					<div className={style.formDiv}>
						<label>Description: </label>
						<textarea className={style.formInput}
							type='text'
							placeholder='description'
							value={input.description}
							name='description'
							onChange={(e) => handleChange(e)}
						/>
						{errors.description && <p className={style.formError}>{errors.description}</p>}
					</div>
					<div className={style.formDiv}>
						<label>Image: </label>
						<input
							className={style.formInput}
							type='url'
							placeholder='https://example.com'
							value={input.image}
							name='image'
							onChange={(e) => handleChange(e)}
						/>
						{errors.image && <p className={style.formError}>{errors.image}</p>}
					</div>
					<div className={style.formDiv}>
						<label>Released: </label>
						<input
							className={style.formInput}
							placeholder='released'
							type='date'
							min='1970-01-01'
							max='2026-12-30'
							value={input.released}
							name='released'
							onChange={(e) => handleChange(e)}
						/>
						{errors.released && <p className={style.formError}>{errors.released}</p>}
					</div>
					<div className={style.formDiv}>
						<label>Rating: </label>
						<input
							className={style.formInput}
							type='number'
							step='1'
							min='0'
							max='5'
							name='rating'
							value={input.rating}
							onChange={(e) => handleChange(e)}
						/>
						{errors.rating && <p className={style.formError}>{errors.rating}</p>}
					</div>
					<div className={style.selectPlatforms}>
						<label>Platforms: </label>
						<input
							className={style.formInput}
							type='text'
							placeholder='platforms'
							value={input.platforms}
							name='platforms'
							onChange={(e) => handleChange(e)}
						/>
						{errors.platforms && <p className={style.formError}>{errors.platforms}</p>}
					</div>
					<div className={style.selectGenres}>
						<label>Genres: </label>
						<select onChange={(e) => handleSelectGenres(e)}>
							<option value='all' disabled selected hidden>
								All
							</option>
							{genres?.map((e) => {
								return (
									<option key={e.id} value={e.name}>
										{e.name}
									</option>
								);
							})}
						</select>
						{errors.genres && <span>{errors.genres}</span>}
						<div>
							{input.genres?.map((e) => {
								return (
									<>
										<div className={style.genresSelected}>{e}</div>
										<button onClick={() => handleDeleteGenres(e)}>X</button>
									</>
								);
							})}{' '}
						</div>
					</div>
						<div>
							<input className={style.submitBtn}  type='submit' disabled={ !input.name || !input.description || !input.platforms || !input.rating } name='Send' />
						</div>
					
				</form>
			</div>

		</div>
	</>
	);
}



//----------------------------------------------------->