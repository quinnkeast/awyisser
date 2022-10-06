import { withRouter } from "next/router";
import { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Filter from 'bad-words';
import { badWords } from './badWords.json';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 100%;
	padding: 1.5rem 0;
`;

const TextInput = styled.input`
	border: none;
	font-size: 2.5rem;
	line-height: 1;
	text-transform: lowercase;
	text-align: center;
`;

const BubbleLine = styled.img`
	max-width: 100%;	
`;

const Checkbox = styled.div`
	text-align: center;
	position: relative;
	margin-top: -1rem;
	margin-bottom: 2rem;
	text-transform: lowercase;
	font-size: 1.25rem;
	line-height: 1;

	input[type="checkbox"] {
		opacity: 0;
	}

	input[type="checkbox"] + label::after {
		content: none;
	}

	input[type="checkbox"]:checked + label::after {
		content: "";
	}

	input[type="checkbox"]:focus + label::before {
		outline: rgb(59, 153, 252) auto 5px;
	}

	input[type="checkbox"]:checked + label::before {
		border-color: #6772e5;
	}

	label {
		position: relative;

		&::before,
		&::after {
			position: absolute;
		}

		&::before {
			content: "";
			display: inline-block;
			height: 18px;
			width: 18px;
			border: 2px solid #777;
			top: -1px;
			left: -29px;
			border-radius: 6px;
		}

		&::after {
			content: "";
			display: inline-block;
			height: 5px;
			width: 10px;
			border-left: 2px solid #6772e5;
			border-bottom: 2px solid #6772e5;
			transform: rotate(-45deg);
			left: -24px;
			top: 5px;
		}
	}
`;

const SubmitButton = styled.input`
	background-color: #6772e5;
	color: #fff;
	font-size: 1.25rem;
	line-height: 1;
	text-transform: lowercase;
	border-radius: 6px;
	border: none;
	padding: .5rem 1rem;
	transition: all 50ms ease;
	
	&:disabled {
		opacity: .5;
	}

	&:hover {
		background-color: #7795f8;
		cursor: pointer;
	}
`;

const Bird = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  display: none;
`;

const Counter = styled.p`
	font-size: 1.25rem;
	margin: .5rem 0 0 0;
	
	&.ok {
		color: green;
	}

	&.warn {
		color: red;
	}
`;

const SubmittingContainer = styled.div`
	padding: 6.875rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CopyButton = styled.button`
	background: transparent;
	border: 2px solid transparent;
	font-size: .9rem;
	line-height: 1;
	border-radius: 6px;
	padding: .5rem 1rem;
	transition: all 50ms ease;
	margin: 1rem 0 3rem;
	font-family: arial;
	display: flex;
	align-content: center;
	color: #6772e5;

	&:hover {
		background-color: #eee;
		cursor: pointer;
	}

	&.copied {
		color: green;
	}
`;

const CopyIcon = styled(FontAwesomeIcon)`
	height: 16px;
	margin-right: .25rem;
`;

const RestartButton = styled.button`
	background-color: #6772e5;
	color: #fff;
	font-size: 1rem;
	line-height: 1;
	text-transform: lowercase;
	border-radius: 6px;
	border: none;
	padding: .5rem 1rem;
	transition: all 50ms ease;
	font-weight: 400;

	&:hover {
		background-color: #7795f8;
		cursor: pointer;
	}
`;

const Notice = styled.p`
	font-family: Arial, Helvetica, sans-serif;
	color: #999;
	font-size: .7rem;
	line-height: 1.25;
	text-align: center;
	margin: 0 0 1.5rem;
	letter-spacing: .125px;
`;

const Nope = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(255, 255, 255, .9);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Newman = styled.img`
	margin-bottom: 2rem;
	max-width: 100%;
`;

class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			submitted: false,
			submitting: false,
			error: false,
			value: '',
			sfw: true,
			copied: false,
			image: '',
			profane: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
		this.handleErrors = this.handleErrors.bind(this);
		this.handleCopyImage = this.handleCopyImage.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.name === 'sfw' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		const { 
			value,
			sfw
		} = this.state;

		if (!value) {
			event.preventDefault();
			return;
		}

		let filter = new Filter({ emptyList: true });
		filter.addWords(...badWords);

		if (filter.isProfane(value)) {
			this.setState({ profane: true });
			event.preventDefault();
			return;
		}

		this.setState({
			submitting: true
		});
		fetch('/api/generator', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				value: value,
				sfw: sfw,
			})
		})
			.then(this.handleErrors)
			.then(res => res.json())
			.then(response => {
				this.setState({
					submitting: false,
					submitted: true,
				});
				this.props.router.push({
					pathname: `/comic`,
					query: {image: response.image},
				}, '/comic'); // "as" argument
			})
			.catch(error => {
				this.setState({
					submitting: false,
					submitted: false,
					error: error
				});
			});

		event.preventDefault();
	}

	handleRestart() {
		this.setState({
			submitted: false,
			submitting: false,
			error: false,
			value: '',
			image: '',
			copied: false,
			profane: false,
		});
	}

	handleErrors(response) {
		if (!response.ok) {
			throw Error(response.statusText);
			this.setState({
				submitting: false,
				submitted: false,
				error: response.error
			});
		}
		return response;
	}

	handleCopyImage() {
		this.setState({ copied: true });
	}

	render() {
		const {
			submitted,
			submitting,
			error,
			value,
			sfw,
			copied,
			image,
			profane
		} = this.state;

		return (
			<Container>
				{(!submitted && !submitting) &&
					<FormContainer onSubmit={this.handleSubmit}>
						<TextInput
							name="value"
							type="text"
							value={value}
							placeholder="Aw yiss..."
							onChange={this.handleChange}
							autoFocus={true}
							maxLength={40} />
						<Counter className={value.length <= 20 ? 'ok' : 'warn'}>{value.length} / 40</Counter>
						<BubbleLine src="/bubble-line.png" />
						<Bird src="/bird-bottom.png" />
						<Checkbox>
							<input
								name="sfw"
								type="checkbox"
								checked={sfw}
								id="sfwCheckbox"
								onChange={this.handleChange} />
							<label htmlFor="sfwCheckbox">watch that potty mouth</label>
						</Checkbox>
						<SubmitButton type="submit" value="Make it so" disabled={!value} />
						{profane && <Nope>
							<Newman src="/nope.gif" />
							<RestartButton onClick={this.handleRestart}>I'm sorry, I'll be nice</RestartButton>
						</Nope>}
					</FormContainer>
				}
				{submitting &&
					<SubmittingContainer>
						<img src="/bird-loading.gif" />
					</SubmittingContainer>
				}
			</Container>
		);
	}
}

export default withRouter(Form);