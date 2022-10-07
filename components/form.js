import { withRouter } from "next/router";
import { Component } from "react";
import classNames from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import Filter from "bad-words";
import badWords from "./badWords.json";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      submitting: false,
      error: false,
      value: "",
      sfw: true,
      copied: false,
      image: "",
      profane: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUserKeyPress = this.handleUserKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.name === "sfw" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleUserKeyPress(event) {
    if (event.key === "Enter") {
      //event.preventDefault();
      this.handleSubmit(event);
    }
  }

  handleSubmit(event) {
    const { value, sfw } = this.state;

    if (!value) {
      event.preventDefault();
      return;
    }

    let filter = new Filter();
    filter.addWords(...badWords);

    if (filter.isProfane(value)) {
      this.setState({ profane: true });
      event.preventDefault();
      return;
    }

    this.setState({
      submitting: true,
    });
    fetch("/api/generator", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: value,
        sfw: sfw,
      }),
    })
      .then(this.handleErrors)
      .then((res) => res.json())
      // Add a minimal delay so that it's a graceful load
      .then(
        (response) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(response);
            }, 2400);
          })
      )
      .then((response) => {
        this.setState({
          submitting: false,
          submitted: true,
        });
        this.props.router.push(
          {
            pathname: `/comic`,
            query: { image: response.image },
          },
          "/comic"
        ); // "as" argument
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          submitted: false,
          error: error,
        });
      });

    event.preventDefault();
  }

  handleRestart() {
    this.setState({
      submitted: false,
      submitting: false,
      error: false,
      value: "",
      image: "",
      copied: false,
      profane: false,
    });
  }

  handleErrors(response) {
    if (!response.ok) {
      this.setState({
        submitting: false,
        submitted: false,
        error: response.error,
      });
      throw Error(response.statusText);
    }
    return response;
  }

  render() {
    const { submitted, submitting, error, value, sfw, profane } = this.state;

    const counterStyle = classNames({
      "text-green-600": value.length <= 20,
      "text-orange-600": value.length > 20,
      "text-red-600": value.length > 32,
      "text-md": true,
      "mt-2": true,
    });

    return (
      <div className="container flex flex-col items-center">
        {!submitted && !submitting && (
          <form
            className="flex flex-col items-center max-w-full my-6"
            onSubmit={this.handleSubmit}
          >
            <TextareaAutosize
              name="value"
              className="b-0 text-4xl md:text-7xl leading-none lowercase text-center ring-0 resize-none focus:outline-0 active:outline-0"
              value={value}
              placeholder="Aw yiss..."
              onChange={this.handleChange}
              onKeyPress={this.handleUserKeyPress}
              autoFocus={true}
              maxLength={40}
            />
            <p className={counterStyle}>{value.length} / 40</p>
            <img
              src="/bubble-line.png"
              className="max-w-full"
              alt="Speech bubble underline"
            />
            <img
              src="/bird-bottom.png"
              className="absolute b-0 l-0 hidden"
              alt=""
            />
            <div className="text-center relative -mt-2 mb-4 lowercase text-md leading-none">
              <input
                name="sfw"
                type="checkbox"
                checked={sfw}
                id="sfwCheckbox"
                className="mr-2 inline-block"
                onChange={this.handleChange}
              />
              <label htmlFor="sfwCheckbox">watch that potty mouth</label>
            </div>
            <button
              className="bg-blue-600 text-white text-xl leading-none lowercase rounded px-3 py-1 cursor-pointer hover:bg-blue-400"
              type="submit"
              disabled={!value}
            >
              Make it so
            </button>
            {profane && (
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/90 bg flex flex-col justify-center items-center">
                <img
                  src="/nope.gif"
                  className="mb-6 max-w-full"
                  alt="Nuh uh uh from Jurassic Park"
                />
                <button
                  className="bg-blue-600 text-white text-xl leading-none lowercase rounded px-3 py-1 cursor-pointer hover:bg-blue-400"
                  onClick={this.handleRestart}
                >
                  I'm sorry, I'll be nice
                </button>
              </div>
            )}
          </form>
        )}
        {submitting && (
          <div className="py-32 flex justify-center items-center">
            <img src="/bird-loading.gif" alt="Loading..." />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Form);
