import React, { Component } from "react";
// import botImage from "../../../public/img/bot_3.gif";
import botImage from "./img/bot_3.gif";
import close from "./img/Close-icon.png";
import './chatbot.css'

class ChatBot extends Component {
  constructor(props) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.src =
      "https://cdn.botframework.com/botframework-webchat/latest/webchat.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      chatbotToggler: false,
      botImg: false,
      webBot: document.getElementById("webchat"),
    };
  }

  componentDidMount() {
    this.setState({
      removeCallback: setInterval(() => this.loadScript(), 5000),
    });
  }

  loadScript() {
    if (this.state.webBot === null || this.state.webBot === undefined) {
      this.setState({
        webBot: document.getElementById("webchat"),
      });
    } else {
      clearInterval(this.state.removeCallback);
    }
  }

  toggle() {
    let webBot = document.getElementById("webchat");
    if (this.state.chatbotToggler == true) {
      this.setState({
        chatbotToggler: false,
      });
      webBot.setAttribute("hidden", "true");
    } else {
      this.setState({
        chatbotToggler: true,
      });
      webBot.removeAttribute("hidden");
      window.WebChat.renderWebChat(
        {
          directLine: window.WebChat.createDirectLine({
            token: "lq58f8DOzoc.3ZaKnHFbZ-fBUuL3ZqJZNSV1CeayV8o0Q_11hUTxBrA",

          }),
          //userID: "durairaj.karthik@centurylink.com",
          //userID:"Bernadeth.Dulatre@lumen.com",
        },
        document.getElementById("webchat")
      );
      webBot.setAttribute("style", "position: relative");
      const chatHeader = document.createElement("div");
      chatHeader.setAttribute("class", "ChatHeader");
      chatHeader.innerText = "iDA Chatbot";
      webBot.appendChild(chatHeader);
    }
  }

  render() {
    return (
      <div>
        <nav
          className={
            !this.state.chatbotToggler
              ? "navbar-expand-lg  navbar-dark fixed-bottom chatbot-wrap chat-close"
              : "navbar-expand-lg  navbar-dark fixed-bottom chatbot-wrap chat-open"
          }
        >
          <div
            id="webchat"
            className={
              !this.state.chatbotToggler ? "Before-web-bot" : "web-bot"
            }
          />
        </nav>
        {this.state.webBot === null ||
        this.state.webBot === undefined ? null : (
          <div>
            <a className="navbar-brand">
              <img
                src={!this.state.chatbotToggler ? botImage : close}
                onClick={this.toggle.bind(this)}
                alt="chatbot"
                className={!this.state.chatbotToggler ? "BotImg" : "close-icon"}
              />
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default ChatBot;