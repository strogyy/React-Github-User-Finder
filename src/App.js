import React, { useState, useEffect } from "react";
import "./App.css";
import gitHubLogo from "./assets/Github.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [inputString, setInputString] = useState("");
  const [searchField, setSearchField] = useState("");
  const [pageInfo, setpageInfo] = useState("Search...");
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);

  console.log(user);
  console.log(repos);

  useEffect(() => {
    const handleApi = async () => {
      if (!(searchField === "")) {
        try {
          const API = await fetch(
            `https://api.github.com/users/${searchField}`
          );
          const API_RES = await API.json();
          console.log(API_RES);
          if (API_RES.message === "Not Found") {
            setpageInfo("Not Found....");
            return;
          }

          setUser([API_RES]);
          const ReposAPI = await API_RES.repos_url;
          console.log(ReposAPI);
          const fetchRepos = await (await fetch(ReposAPI)).json();
          console.log(fetchRepos);
          setRepos(fetchRepos);
        } catch (err) {
          setpageInfo(err);
        }
      }
    };

    handleApi();
  }, [searchField]);

  const formOnSubmitHandler = (e) => {
    e.preventDefault();

    setSearchField(inputString);

    if (inputString !== "") {
      setInputString("");
    }
  };

  const onChangeHandler = (e) => {
    setInputString(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="container">
          <div className="navbar-container">
            <div className="logo"  onClick={() =>
              window.open(`${"http://localhost:3000"}`, "_self")
            }>
              <img src={gitHubLogo} alt="" className="githublogo" />
              <h2>Github Profile Finder</h2>
            </div>
            <form onSubmit={formOnSubmitHandler}>
              <input
                type="search"
                placeholder="Search User..."
                className="input"
                onChange={onChangeHandler}
                value={inputString}
              />
              <button type="submit" className="button" placeholder="Search...">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="container">
          {user.length > 0 ? (
            <div className="main-container">
              <div className="user-container">
                <div className="user-top">
                  <div className="user-top-left">
                    <img
                      src={user[0].avatar_url}
                      alt=""
                      className="useravatar"
                    />
                    <div className="top-left-texts">
                      <h2>{user[0].login}</h2>
                      <div className="bio">
                        {user[0].bio !== null ? (
                          user[0].bio
                        ) : (
                          <React.Fragment></React.Fragment>
                        )}
                      </div>
                      <h4
                        onClick={() =>
                          window.open(`${user[0].html_url}`, "_blank")
                        }
                      >
                        @{user[0].login}
                      </h4>
                    </div>
                  </div>

                  <div className="user-top-right">
                    <p>
                      Since{" "}
                      {user.length > 0 ? (
                        user[0].created_at.slice(0, 10)
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                    </p>
                  </div>
                </div>

                <div className="user-bottom">
                  <div className="detail-container">
                    <div className="detail">
                      <h4>Repos</h4>
                      {user[0].public_repos}
                    </div>
                    <div className="detail">
                      <h4>Followers</h4>
                      {user[0].followers}
                    </div>
                    <div className="detail">
                      <h4>Following</h4>
                      {user[0].following}
                    </div>
                  </div>
                </div>
              </div>

              <div className="repos">
                {repos.map((repo) => {
                  return (
                    <div className="repo" key={repo.id}>
                      <div className="repo-detail">
                        <h2
                          className="repo-name"
                          onClick={() =>
                            window.open(`${repo.html_url}`, "_blank")
                          }
                        >
                          {repo.name}{" "}
                          <FontAwesomeIcon
                            icon={faLink}
                            className="link-icon"
                          />
                        </h2>
                        <div className="repo-alt">
                          <div className="used-langs">
                            <h4
                              className={
                                repo.language === "CSS"
                                  ? "lang-css lang"
                                  : "" || repo.language === "JavaScript"
                                  ? "lang-js lang"
                                  : "" || repo.language === "HTML"
                                  ? "lang-html lang"
                                  : "" || repo.language === "SCSS"
                                  ? "lang-scss lang"
                                  : "" || repo.language === "Python"
                                  ? "lang-typescript lang"
                                  : "" || repo.language === "TypeScript"
                                  ? "lang-typescript lang"
                                  : "" || repo.language === "C#"
                                  ? "lang-CS lang"
                                  : "" || repo.language === "PowerShell"
                                  ? "lang-powershell lang"
                                  : "" || repo.language === "PHP"
                                  ? "lang-php lang"
                                  : "" || repo.language === "Java"
                                  ? "lang-java lang"
                                  : "" || repo.language === "Go"
                                  ? "lang-go lang"
                                  : "" || repo.language === "Dart"
                                  ? "lang-go lang"
                                  : "" || repo.language === null
                                  ? "nonclass"
                                  : "lang"
                              }
                            >
                              {repo.language}
                            </h4>
                          </div>
                          <h4 className="create-date">
                            Created at {repo.created_at.slice(0, 10)}
                          </h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <h1 className="search">{pageInfo}</h1>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
